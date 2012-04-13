ju1ius.namespace('Zenino', function()
{

/**
 * Module for dealing with keys.
 *
 * This module provides a simple interface for dealing with keys.
 **/

var DIATONICS = Zenino.Core.DIATONICS,
  FIFTHS = Zenino.Core.FIFTHS,
  FIFTHS_R = Zenino.Array.clone(FIFTHS).reverse(),
  SHARP_ORDER = ['F#','C#','G#','D#','A#','E#','B#'],
  FLAT_ORDER =  ['Bb','Eb','Ab','Db','Gb','Cb','Fb'];

    // caches notes in key (keyname => Array)
var _key_cache = {},
    // caches key signatures (keyname => int)
    _key_sign_cache = {},
    // caches key accidentals (keyname => Array)
    _key_sign_acc_cache = {},
    // cache for relative minor
    maj_min_cache = { 'C': 'A' },
    // cache for relative major
    min_maj_cache = { 'A': 'C' };


var Keys = {

  /**
   * Return True if key is in a recognized format. False if not.
   **/
  isValidKey: function(key)
  {
    var note = key[0], alts = key.slice(1);
    return Notes.isValidNote(note.toUpperCase() + alts);
  },

  /**
   * returns the relative major of a note
   **/
  relativeMajor: function(note)
  {
    if(_min_maj_cache.hasOwnProperty(note)) {
      return _min_maj_cache[note];
    }
    var base_note = note[0],
    base_index = DIATONICS.indexOf(base_note.toUpperCase()),
    min_base_index = (base_index + 2) % 7,
    min_base_note = DIATONICS[min_base_index];
    min = Zenino.Intervals.augmentOrDiminishUntilTheIntervalIsRight(
      note, min_base_note, 3
    );
    _min_maj_cache[note] = min;
    return min;
  },

  /**
   * returns the relative minor of a note
   **/
  relativeMinor: function(note)
  {
    if(_maj_min_cache.hasOwnProperty(note))
      return _maj_min_cache[note];

    var base_note = note[0],
    base_index = DIATONICS.indexOf(base_note),
    maj_base_index = (base_index + 5) % 7,
    maj_base_note = DIATONICS[maj_base_index];
    maj = Zenino.Intervals.augmentOrDiminishUntilTheIntervalIsRight(
      note, maj_base_note, 9
    );
    _maj_min_cache[note] = maj;
    return maj;
  },

  /**
   * Return the key corrisponding to accidentals.
   *
   * Return an array containing the major key corrensponding to the
   * accidentals put as input, and his relative minor; negative numbers for
   * flats, positive numbers for sharps.
   **/
  getKey: function(signature)
  {
    signature = Number(signature) || 0;
    if(signature == 0) {
      return ['C', 'a'];
    }
    var accidentals = Keys.getAccidentalsFromSignature(signature);
    if(signature > 0) {
      // The last sharp is the leading tone
      var maj = Zenino.Intervals.minorSecond(
        accidentals.pop()
      );
      var min = Keys.relativeMinor(maj);
      return [maj, min];
    } else {
      // the last flat is the tonic
      var l = accidentals.length;
      if(l == 1) {
        return ['F', 'd'];
      }
      var maj = accidentals[l-2],
      min = Keys.relativeMinor(maj);
      return [maj, min];
    }
  },

  /**
   * Return the key signature.
   * 
   * 0 for C or a, negative numbers for flat key signatures, positive numbers
   * for sharp key signatures.
   **/
  getKeySignature: function(key)
  {
    key = key || 'C';
    if(_key_sign_cache.hasOwnProperty(key)) {
      return _key_sign_cache[key];
    }
    if(!Keys.isValidKey(key)) {
      throw new KeyFormatError(key);
    }
    var base_note = key[0];
    if(Zenino.String.islower(base_note)) {
      key = Keys.relativeMajor(key);
      base_note = key[0];
    }
    var key_len = key.length,
    fifths_index = FIFTHS.indexOf(base_note),
    signature = fifths_index - 1;
    /**
     * we find the signature based on the cycle of fifths:
     * index:      0 1 2 3 4 5 6
     * fifths:     F C G D A E B
     * signature: -1 0 1 2 3 4 5
     * Then we add 7 for each # and substract 7 for each b
     **/
    if(key_len > 1) {
      for(var i = 1, l = key_len; i < l; ++i) {
        var alt = key[i];
        if(alt == '#') signature += 7;
        else if(alt == 'b') signature -= 7;
      }
    }
    _key_sign_cache[key] = signature;
    return signature;
  },

  /**
   * Return the list of accidentals present into the key signature.
   **/
  getKeySignatureAccidentals: function(key)
  {
    key = key || 'C';
    return Keys.getAccidentalsFromSignature(
      Keys.getKeySignature(key)
    );
  },

  getAccidentalsFromSignature: function(signature)
  {
    if(_key_sign_acc_cache.hasOwnProperty(key)) {
      return _key_sign_acc_cache[key].slice(0); // quick cloning
    }

    var accidentals = [];
    if(signature !== 0) {
      var order = signature > 0 ? SHARP_ORDER : FLAT_ORDER,
      symbol = signature > 0 ? '#' : 'b';
      signature = Math.abs(signature);
      accidentals = order.slice(0, signature);
      if(signature > 7) {
        for(var i = 7; i < signature; ++i) {
          accidentals[i % 7] += symbol;
        }
      }
    }
    _key_sign_acc_cache[key] = accidentals;
    return accidentals;
  },

  /**
   * Return an ordered list of the notes in this natural key.
   * 
   * Examples:
   * >>> Zenino.Keys.getNotes('F')
   * ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']
   * >>> Zenino.Keys.getNotes('c')
   * ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']
   **/
  getNotes: function(key)
  {
    key = key || 'C';
    if(_key_cache.hasOwnProperty(key)) {
      return _key_cache[key].slice(0);
    }
    if(!Keys.isValidKey(key)) {
      throw new KeyFormatError(key);
    }
    var raw_tonic_index = DIATONICS.indexOf(key[0].toUpperCase()),
    notes = Zenino.Array.rotate(DIATONICS, raw_tonic_index),
    altered_notes = [], symbol = '',
    signature = Keys.getKeySignature(key),
    accidentals = Keys.getAccidentalsFromSignature(signature);

    for(var i = 0, l = accidentals.length; i < l; ++i) {
      altered_notes.push(accidentals[i][0]);
    }
    if(signature < 0) {
      symbol = 'b';
    } else if(signature > 0) {
      symbol = '#';
    }
    for(var i = 0, l = notes.length; i < l; ++i) {
      var note = notes[i];
      if(altered_notes.indexOf(note) !== -1) {
        notes[i] += symbol;
      }
    }
    _key_cache[key] = notes;
    return notes;
  },

};


var Key = function(key)
{
	this.key = key;
	if(Zenino.String.islower(key[0])) {
		this.mode = 'minor';
	} else {
		this.mode = 'major';
	}
	this.name = this.key + " " + this.mode;
	this.signature = Keys.getKeySignature(this.key);
}
Key.prototype.equals = function(other)
{ 
	return this.key == other.key;
}


return {
  Keys: Keys,
  Key: Key
};

});
