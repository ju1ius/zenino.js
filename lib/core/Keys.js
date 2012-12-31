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
    FLAT_ORDER =  ['Bb','Eb','Ab','Db','Gb','Cb','Fb'],
    VALID_KEY_RX = /^[A-Ga-g][#b]*$/;

function normalizeKey(key)
{
  return key[0].toUpperCase() + key.substr(1);
}

var Keys = {

  /**
   * Return True if key is in a recognized format. False if not.
   **/
  isValidKey: function(key)
  {
    return VALID_KEY_RX.test(key);
  },

  /**
   * returns the relative major of a note
   **/
  relativeMajor: Zenino.Function.cached(function(note)
  {
    // normalize note name
    var normalized = normalizeKey(note),
        base_note = normalized[0],
        base_index = DIATONICS.indexOf(base_note),
        min_base_index = (base_index + 2) % 7,
        min_base_note = DIATONICS[min_base_index],
        min = Zenino.Intervals.augmentOrDiminishUntilTheIntervalIsRight(
          normalized, min_base_note, 3
        );
    return min;
  }),

  /**
   * returns the relative minor of a note
   **/
  relativeMinor: Zenino.Function.cached(function(note)
  {
    var base_note = note[0],
        base_index = DIATONICS.indexOf(base_note),
        maj_base_index = (base_index + 5) % 7,
        maj_base_note = DIATONICS[maj_base_index],
        maj = Zenino.Intervals.augmentOrDiminishUntilTheIntervalIsRight(
          note, maj_base_note, 9
        );
    return maj;
  }),

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
    if(signature === 0) {
      return ['C', 'a'];
    }
    var accidentals = Keys.getAccidentalsFromSignature(signature)
        maj, min, l;
    if(signature > 0) {
      // The last sharp is the leading tone
      maj = Zenino.Intervals.minorSecond(
        accidentals.pop()
      );
      min = Keys.relativeMinor(maj);
    } else {
      // the last flat is the tonic
      l = accidentals.length;
      if(l === 1) {
        return ['F', 'd'];
      }
      maj = accidentals[l-2];
      min = Keys.relativeMinor(maj);
    }
    return [maj, min];
  },

  /**
   * Return the list of accidentals present into the key signature.
   **/
  getAccidentals: function(key)
  {
    key = key || 'C';
    return Keys.getAccidentalsFromSignature(
      Keys.getKeySignature(key)
    );
  },
  /**
   * Return the key signature.
   * 
   * 0 for C or a, negative numbers for flat key signatures, positive numbers
   * for sharp key signatures.
   **/
  getKeySignature: Zenino.Function.cached(function(key)
  {
    key = key || 'C';
    if(!Keys.isValidKey(key)) {
      throw new KeyFormatError(key);
    }
    var base_note = key[0],
        fifths_index, signature,
        key_len, i, alt;
    if(Zenino.String.islower(base_note)) {
      key = Keys.relativeMajor(key);
      base_note = key[0];
    }
    /**
     * we find the signature based on the cycle of fifths:
     * index:      0 1 2 3 4 5 6
     * fifths:     F C G D A E B
     * signature: -1 0 1 2 3 4 5
     * Then we add 7 for each # and substract 7 for each b
     **/
    fifths_index = FIFTHS.indexOf(base_note);
    signature = fifths_index - 1;
    key_len = key.length;
    if(key_len > 1) {
      for(i = 1, l = key_len; i < l; ++i) {
        alt = key[i];
        if(alt === '#') {
          signature += 7;
        } else if(alt === 'b') {
          signature -= 7;
        }
      }
    }
    return signature;
  }),

  getAccidentalsFromSignature: Zenino.Function.cached(function(signature)
  {
    var accidentals = [],
        order, symbol, i;
    if (0 === signature) return accidentals;
    
    order = signature > 0 ? SHARP_ORDER : FLAT_ORDER;
    symbol = signature > 0 ? '#' : 'b';
    signature = Math.abs(signature);
    accidentals = order.slice(0, signature);
    if(signature > 7) {
      for(i = 7; i < signature; ++i) {
        accidentals[i % 7] += symbol;
      }
    }
    return accidentals;
  }, Zenino.Array.shallowClone),

  /**
   * Return an ordered list of the notes in this natural key.
   * 
   * Examples:
   * >>> Zenino.Keys.getNotes('F')
   * ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']
   * >>> Zenino.Keys.getNotes('c')
   * ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']
   **/
  getNotes: Zenino.Function.cached(function(key)
  {
    key = key || 'C';
    if(!Keys.isValidKey(key)) {
      throw new KeyFormatError(key);
    }
    var raw_tonic_index = DIATONICS.indexOf(key[0].toUpperCase()),
        notes = Zenino.Array.rotate(DIATONICS, raw_tonic_index),
        altered_notes = {},
        accidentals = Keys.getAccidentals(key),
        accidental,
        i, l, note;
    // we store the accidentals in a map, ex Bbb => {B:'bb',E:'bb',A:'b',D:'b',G:'b',C:'b',F:'b'}
    for(i = 0, l = accidentals.length; i < l; ++i) {
      accidental = accidentals[i];
      altered_notes[accidental[0]] = accidental.substr(1);
    }
    for(i = 0, l = notes.length; i < l; ++i) {
      note = notes[i];
      accidental = altered_notes[note];
      if(accidental !== undefined) {
        notes[i] += accidental;
      }
    }
    return notes;
  }, Zenino.Array.shallowClone)

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
	return this.key === other.key;
};


return {
  Keys: Keys,
  Key: Key
};

});
