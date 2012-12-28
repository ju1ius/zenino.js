ju1ius.namespace('Zenino', function()
{

// Shortcuts
var CHROMATICS_SHARP = Zenino.Core.CHROMATICS_SHARP,
    CHROMATICS_FLAT =  Zenino.Core.CHROMATICS_FLAT,
    NOTES = Zenino.Core.NOTES,
    DIATONICS = Zenino.Core.DIATONICS,
    //
    VALID_NOTE_RX = /^[A-Ga-g][#b]*$/;

// Utilities
function in_range(i)
{
  return i >= 0 && i <= 11;
}

/**
 * Basic module for notes.
 *
 * This module is the foundation of the music theory package.
 * It handles conversions from integers to notes and vice versa and thus
 * enables simple calculations.
 **/
var Notes = {
  
  /**
   * Converts integers in the range of 0-11 to notes in the form of C or C# or Db.
   * Throws a !RangeError exception if the note_int is not in range[0,11].
   **/
  intToNote: function(int, accidentals)
  {
    if(!in_range(int)) {
      throw new Zenino.RangeError(int, 0, 11);
    }
    accidentals = accidentals || '#';
    if(accidentals === '#') {
      return CHROMATICS_SHARP[int];
    } else if (accidentals === 'b') {
      return CHROMATICS_FLAT[int];
    }
    throw new Zenino.InvalidAccidentalError(accidentals);
  },

  /**
   * Converts notes in the form of C, C#, Cb, C##, etc... to
   * an integer in the range of 0-11.
   * Throws an !NoteFormatError exception if the note format is not recognised.
   **/
  noteToInt: function(note)
  {
    if(!Notes.isValidNote(note)) {
      throw new Zenino.NoteFormatError(note);
    }
    var val = NOTES[note[0]];
    // Check for '#' and 'b' postfixes
    for(var i = 1, l = note.length; i < l; i++)
    {
      var alt = note[i];
      if(alt === 'b') {
        val--;
      } else if (alt === '#') {
        val++;
      }
    }
    return Zenino.Math.mod(val, 12);
  },

  /**
   * Test whether note1 and note2 are enharmonic, ie. they sound the same
   **/
  isEnharmonic: function(note1, note2)
  {
    return Notes.noteToInt(note1) === Notes.noteToInt(note2);
  },

  /**
   * Reduce any extra accidentals to proper notes.
   *
   * For example C#### becomes E
   **/
  reduceAccidentals: function(note)
  {
    var ref = Notes.noteToInt(note[0]),
    val = ref;
    for(var i = 1, l = note.length; i < l; i++) {
      var alt = note[i];
      if(alt === 'b') {
        val--;
      } else if(alt === '#') {
        val++;
      } else {
        throw new Zenino.NoteFormatError(note);
      }
    }
    if(val >= ref) {
      return Notes.intToNote(val % 12);
    }
    return Notes.intToNote(val % 12, 'b')
  },

  /**
   *  Removes redundant #'s and b's from the given note. 
   *  For example: C##b becomes C#, Eb##b becomes E, etc...
   **/
  removeRedundantAccidentals: function(note)
  {
    if(!Notes.isValidNote(note)) {
      throw new Zenino.NoteFormatError(note);
    }
    if(note.length < 2) {
      return note;
    }
    var val = 0, result = note[0];

    for(var i = 1, l = note.length; i < l; i++) {
      var alt = note[i];
      if(alt === 'b') {
        val--;
      } else if (alt === '#') {
        val++;
      }
    }
    while(val > 0) {
      result = Notes.augment(result);
      val--;
    }
    while(val < 0) {
      result = Notes.diminish(result);
      val++;
    }
    return result;
  },

  augment: function(note)
  {
    if(note.substr(-1) !== 'b') {
      return note + '#';
    } else {
      return note.slice(0, -1);
    }
  },
  diminish: function(note)
  {
    if(note.substr(-1) !== '#') {
      return note + 'b';
    } else {
      return note.slice(0, -1);
    }
  },

  /**
   * Returns true if note is in a recognised format. False if not
   **/
  isValidNote: function(name)
  {
    return VALID_NOTE_RX.test(name);
  },

  getAccidentals: function(note)
  {
    if(note.length > 1) {
      return note.substr(1).split('');
    }
    return [];
  }

};

return {
  Notes: Notes
}

});
