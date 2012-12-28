ju1ius.namespace('Zenino', function()
{

var ALLOWED_EXTS = ['b9', '9', '#9', '11', '#11', 'b13', '13'],
    NINTHS =      ['b9', '9', '#9'],
    ELEVENTHS =   ['11', '#11'],
    THIRTEENTHS = ['b13', '13'];

var Chords = {

  CHORD_EXTENSIONS: {
    '9th':  NINTHS,
    '11th': ELEVENTHS,
    '13th': THIRTEENTHS
  },
  SHORTHANDS: {
    /* TRIADS */
    'M'    :'majorTriad',
    'Maj'  :'majorTriad',
    'maj'  :'majorTriad',
    ''     :'majorTriad',
    'm'    :'minorTriad',
    'min'  :'minorTriad',
    '-'    :'minorTriad',
    'dim'  :'diminishedTriad',
    'o'    :'diminishedTriad',
    'aug'  :'augmentedTriad',
    '+'    :'augmentedTriad',
    'sus4' :'sus4Triad',
    'sus'  :'sus4Triad',
    'sus2' :'sus2Triad',

    /* SEVENTHS */
    'm7'      : 'minorSeventh',
    'min7'    : 'minorSeventh',
    '-7'      : 'minorSeventh',
    'maj7'    : 'majorSeventh',
    'Maj7'    : 'majorSeventh',
    'Δ'      : 'majorSeventh',
    'M7'      : 'majorSeventh',
    'dom7'    : 'dominantSeventh',
    '7'       : 'dominantSeventh',
    'm7b5'    : 'halfDiminished',
    'min7b5'  : 'halfDiminished',
    '-7b5'    : 'halfDiminished',
    'ø'       : 'halfDiminished',
    'dim7'    : 'diminishedSeventh',
    'o7'      : 'diminishedSeventh',
    'oMaj7'   : 'diminishedMajorSeventh',
    'oΔ'   : 'diminishedMajorSeventh',
    'oM7'     : 'diminishedMajorSeventh',
    'mM7'     : 'minorMajorSeventh',
    'minMaj7' : 'minorMajorSeventh',
    '-Δ'   : 'minorMajorSeventh',

    /* AUGMENTED SEVENTHS */
    '7#5'       : 'augmentedDominantSeventh',
    '7+'        : 'augmentedDominantSeventh',
    'M7#5'      : 'augmentedMajorSeventh',
    'M7+'       : 'augmentedMajorSeventh',
    'Maj7#5'    : 'augmentedMajorSeventh',
    'Maj7+'     : 'augmentedMajorSeventh',
    'Δ#5'      : 'augmentedMajorSeventh',
    'Δ+'       : 'augmentedMajorSeventh',
    'mM7+'      : 'augmentedMinorMajorSeventh',
    'mM7#5'     : 'augmentedMinorMajorSeventh',
    'minMaj7+'  : 'augmentedMinorMajorSeventh',
    'minMaj7#5' : 'augmentedMinorMajorSeventh',
    '-M7#5'     : 'augmentedMinorMajorSeventh',
    '-Maj7#5'   : 'augmentedMinorMajorSeventh',
    '-Δ#5'   : 'augmentedMinorMajorSeventh',
    '-Δ+'   : 'augmentedMinorMajorSeventh',

    /* SUSPENDED CHORDS */
    '7sus4'		: 'dominantSeventhSus4',
    '7sus'		: 'dominantSeventhSus4',
    'sus4b5'	: 'dominantSeventhSus4B5',
    'susb5'		: 'dominantSeventhSus4B5',
    'sus4b9'	: 'dominantSeventhSus4B9',
    'susb9'		: 'dominantSeventhSus4B9',

    /* SIXTHS */
    'm6'   : 'minorSixth',
    'min6' : 'minorSixth',
    '-6'   : 'minorSixth',
    'maj6' : 'majorSixth',
    'M6'   : 'majorSixth',
    'Maj6' : 'majorSixth',
    '6'    : 'majorSixth',

    /* NINTHS */
    '9'     :'dominantNinth',
    'maj9'  :'majorNinth',
    'Maj9'  :'majorNinth',
    'M9'    :'majorNinth',
    'Δ9'    :'majorNinth',
    'm9'    :'minorNinth',
    'min9'  :'minorNinth',
    '-9'    :'minorNinth',
    'mM79'    :'minorMajorSeventhNinth',
    'minMaj79'  :'minorMajorSeventhNinth',
    '-Δ9'    :'minorMajorSeventhNinth',

    /* ELEVENTHS   */
    '7#11': 'dominantSeventhAugmentedEleventh',
    'Maj7#11': 'majorSeventhAugmentedEleventh',
    'Δ#11': 'majorSeventhAugmentedEleventh',
    'M7#11': 'majorSeventhAugmentedEleventh',
    'm11'   :'minorEleventh',
    'min11' :'minorEleventh',
    '-11'   :'minorEleventh',

    /* THIRTEENTHS */
    'maj13' :'majorThirteenth',
    'Maj13' :'majorThirteenth',
    'M13'   :'majorThirteenth',
    'Δ13'   :'majorThirteenth',
    'min13' :'minorThirteenth',
    'm13'   :'minorThirteenth',
    '-13'   :'minorThirteenth',
    '13'    :'dominantThirteenth',

    /* ALTERED CHORDS */
    'Maj7+4'   :'majorSeventhAugmentedFourth',
    'M7+4'   :'majorSeventhAugmentedFourth',
    'Δ+4'   :'majorSeventhAugmentedFourth',
    'Maj7b5'   :'majorSeventhB5',
    'M7b5'   :'majorSeventhB5',
    'Δb5'   :'majorSeventhB5',
    '7b5'   :'dominantSeventhB5',
    '7alt'  :'dominantAltered'
  },


  /**
   * FINDERS
   **/
  fromShortHand: function(root, chord_name)
  {
    if(!Zenino.Notes.isValidNote(root)) {
      throw new NoteFormatError(note); 
    }
    var chord = [], exts = [],
        parts, name, method,
        i, l, ext;
    // First we cut the extensions from the basic chord
    if(chord_name.indexOf('/') !== -1) {
      parts = chord_name.split('/');
      chord_name = parts[0];
      exts = parts.slice(1);
    }
    // Then we return the basic chord
    method = Chords.SHORTHANDS[chord_name];
    if (!method) {
      throw new Zenino.InvalidChordShorthandError(chord_name);
    }
    chord = Chords[method](root);
    // and build the extensions
    for(i = 0, l = exts.length; i < l; i++) {
      ext = exts[i];
      switch(ext) {
        case 'b9':
          chord = Zenino.Array.pad(chord, 5, '');
          chord[4] = Zenino.Intervals.minorSecond(root);
          break;
        case '9':
          chord = Zenino.Array.pad(chord, 5, '');
          chord[4] = Zenino.Intervals.majorSecond(root);
          break;
        case '#9':
          chord = Zenino.Array.pad(chord, 5, '');
          chord[4] = Zenino.Intervals.augmentedSecond(root);
          break;
        case '11':
          chord = Zenino.Array.pad(chord, 6, '');
          chord[5] = Zenino.Intervals.perfectFourth(root);
          break;
        case '#11':
          chord = Zenino.Array.pad(chord, 6, '');
          chord[5] = Zenino.Intervals.augmentedFourth(root);
          break;
        case 'b13':
          chord = Zenino.Array.pad(chord, 7, '');
          chord[6] = Zenino.Intervals.minorSixth(root);
          break;
        case '13':
          chord = Zenino.Array.pad(chord, 7, '');
          chord[6] = Zenino.Intervals.majorSixth(root);
          break;
      }
    }
    return chord;
  },

  isValidExt: function(ext) {
    return -1 !== ALLOWED_EXTS.indexOf(ext);
  },

  /*
   * INVERSIONS
   */

  invert: function(chord, times)
  {
    times = Number(times) || 1;
    return Zenino.Array.rotate(chord, times);
  },
  drop2: function(chord)
  {
    var l = chord.length,
        chord = Zenino.Array.clone(chord),
        drop2;
    if(l >= 3) {
      drop2 = chord.splice(l - 2, 1);
      chord.unshift(drop2);
    }
    return chord;
  },
  drop3: function(chord)
  {
    var l = chord.length,
        chord = Zenino.Array.clone(chord);
    if(l >= 4) {
      drop3 = chord.splice(len - 3, 1);
      chord.unshift(drop3);
    }
    return chord;
  },
  drop24: function(chord)
  {
    var l = chord.length,
        chord = Zenino.Array.clone(chord),
        drop2, drop4;
    if(count(chord) >= 4) {
      drop2 = chord.splice(len - 2, 1);
      drop4 = chord.splice(len - 4, 1);
      chord.unshift(drop2, drop4);
    }
    return chord;
  },

  extend: function(chord, exts)
  {
    chord = Zenino.Array.clone(chord);
    var i, l, ext;
    for(i =0, l = exts.length; i < l; i++) {
      ext = exts[i];
      if (NINTH.indexOf(ext) !== -1) {
        chord.push(Zenino.Intervals.fromShortHand(chord[0], ext));
      } else if (ELEVENTHS.indexOf(ext) !== -1) {
        chord.push(Zenino.Intervals.fromShortHand(chord[0], ext));
      } else if (THIRTEENTHS.indexOf(ext) !== -1) {
        chord.push(Zenino.Intervals.fromShortHand(chord[0], ext));
      }
    }
    return chord;
  },

  /****************************************************************************
  * --------------------------------------------------- TRIADS ------------------------------------------------- *
  ****************************************************************************/
/*
  * DIATONIC
*/

  /**
   * Returns the triad on note in key as an array
   **/
  triad: function(note, key)
  {
    return [
      note,
      Zenino.Intervals.third(note, key),
      Zenino.Intervals.fifth(note, key)
    ];
  },

  /**
   * Returns all the triads in key. Implemented using a cache.
   **/
  triads: Zenino.Function.cached(function(key)
  {
    var notes = Zenino.Diatonics.getNotes(key),
        res = [], i, l;
    for(i = 0, l = notes.length; i < l; i++) {
      res.push(Chords.triad(notes[i], key));
    }
    return res;
  }, Zenino.Array.clone),

  /**
   * ABSOLUTE
   **/

  majorTriad: function(note)
  {
    return [
      note,
      Zenino.Intervals.majorThird(note),
      Zenino.Intervals.perfectFifth(note)
    ];
  },
  minorTriad: function(note)
  {
    return [
      note,
      Zenino.Intervals.minorThird(note),
      Zenino.Intervals.perfectFifth(note)
    ];
  },
  diminishedTriad: function(note)
  {
    return [
      note,
      Zenino.Intervals.minorThird(note),
      Zenino.Intervals.diminishedFifth(note)
    ];
  },
  augmentedTriad: function(note)
  {
    return [
      note,
      Zenino.Intervals.majorThird(note),
      Zenino.Intervals.augmentedFifth(note)
    ];
  },
  sus2Triad: function(note)
  {
    return [
      note,
      Zenino.Intervals.majorSecond(note),
      Zenino.Intervals.perfectFifth(note)
    ];
  },
  sus4Triad: function(note)
  {
    return [
      note,
      Zenino.Intervals.perfectFourth(note),
      Zenino.Intervals.perfectFifth(note)
    ];
  },

  /****************************************************************************
  * -------------------------------------------------- TETRADS ------------------------------------------------- *
  ****************************************************************************/
  /**
   * RELATIVE
   **/

  /**
   * Returns the seventh chord on note in key.
   **/
  seventh: function(note, key)
  {
    var t = Chords.triad(note, key);
    t.push(Zenino.Intervals.seventh(note, key));
    return t;
  },
  /**
   * Returns all the sevenths chords in key in an array
   **/
  sevenths: Zenino.Function.cached(function(key)
  {
    var notes = Zenino.Diatonics.getNotes(key),
        res = [], i, l;
    for(i = 0, l = notes.length; i < l; i++) {
      res.push(Chords.seventh(notes[i], key));
    }
    return res;
  }, Zenino.Array.clone),

  /**
   * ABSOLUTE
   **/

  /* MAJOR */
  majorSeventh: function(note)
  {
    var t = Chords.majorTriad(note);
    t.push(Zenino.Intervals.majorSeventh(note));
    return t;
  },
  majorSixth: function(note)
  {
    var t = Chords.majorTriad(note);
    t.push(Zenino.Intervals.majorSixth(note));
    return t;
  },
  augmentedMajorSeventh: function(note)
  {
    var t = Chords.augmentedTriad(note);
    t.push(Zenino.Intervals.majorSeventh(note));
    return t;
  },
  majorSeventhB5: function(note)
  {
    var t = Chords.majorSeventh(note);
    t[2] = Zenino.Notes.diminish(t[2]);
    return t;
  },
  majorSeventhAugmentedFourth: function(note)
  {
    var t = Chords.majorSeventh(note);
    t[2] = Zenino.Intervals.augmentedFourth(note);
    return t;
  },

  /* DOMINANT 7 */
  dominantSeventh: function(note)
  {
    var t = Chords.majorTriad(note);
    t.push(Zenino.Intervals.minorSeventh(note));
    return t;
  },
  augmentedDominantSeventh: function(note)
  {
    var t = Chords.augmentedTriad(note);
    t.push(Zenino.Intervals.minorSeventh(note));
    return t;
  },
  dominantSeventhB5: function(note)
  {
    var t = Chords.dominantSeventh(note);
    t[2] = Zenino.Notes.diminish(t[2]);
    return t;
  },
  /* MINOR */
  minorMajorSeventh: function(note)
  {
    var t = Chords.minorTriad(note);
    t.push(Zenino.Intervals.majorSeventh(note));
    return t;
  },
  minorSixth: function(note)
  {
    var t = Chords.minorTriad(note);
    t.push(Zenino.Intervals.majorSixth(note));
    return t;
  },
  augmentedMinorMajorSeventh: function(note)
  {
    var t = Chords.minorMajorSeventh(note);
    t[2] = Zenino.Notes.augment(t[2]);
    return t;
  },
  minorSeventh: function(note)
  {
    var t = Chords.minorTriad(note);
    t.push(Zenino.Intervals.minorSeventh(note));
    return t;
  },
  /* DIMINISHED */
  halfDiminished: function(note)
  {
    var t = Chords.diminishedTriad(note);
    t.push(Zenino.Intervals.minorSeventh(note));
    return t;
  },
  diminishedSeventh: function(note)
  {
    var t = Chords.diminishedTriad(note);
    t.push(Zenino.Intervals.diminishedSeventh(note));
    return t;
  },
  diminishedMajorSeventh: function(note)
  {
    var t = Chords.diminishedTriad(note);
    t.push(Zenino.Intervals.majorSeventh(note));
    return t;
  },
  /* SUS */
  dominantSeventhSus4: function(note)
  {
    var t = Chords.sus4Triad(note);
    t.push(Zenino.Intervals.minorSeventh(note));
    return t;
  },
  dominantSeventhSus4B5: function(note)
  {
    var t = Chords.dominantSeventhSus4(note);
    t[2] = Zenino.Notes.diminish(t[2]);
    return t;
  },




  /****************************************************************************
  * ----------------------------------------------- EXTENSIONS ----------------------------------------------- *
  ****************************************************************************/

  majorNinth: function(note)
  {
    var t = Chords.majorSeventh(note);
    t.push(Zenino.Intervals.majorSecond(note));
    return t;
  },
  dominantNinth: function(note)
  {
    var t = Chords.dominantSeventh(note);
    t.push(Zenino.Intervals.majorSecond(note));
    return t;
  },
  minorNinth: function(note)
  {
    var t = Chords.minorSeventh(note);
    t.push(Zenino.Intervals.majorSecond(note));
    return t;
  },
  minorMajorSeventhNinth: function(note)
  {
    var t = Chords.minorMajorSeventh(note);
    t.push(Zenino.Intervals.majorSecond(note));
    return t;
  },
  dominantSeventhSus4B9: function(note)
  {
    var t = Chords.dominantSeventhSus4(note);
    t.push(Zenino.Intervals.minorSecond(note));
    return t;
  },
  dominantSeventhAugmentedEleventh: function(note)
  {
    var t = Chords.dominantNinth(note);
    t.push(Zenino.Intervals.augmentedFourth(note));
    return t;
  },

  majorSeventhAugmentedEleventh: function(note)
  {
    var t = Chords.majorNinth(note);
    t.push(Zenino.Intervals.augmentedFourth(note));
    return t;
  },

  minorEleventh: function(note)
  {
    var t = Chords.minorSeventh(note);
    t.push(
      Zenino.Intervals.majorSecond(note),
      Zenino.Intervals.perfectFourth(note)
    );
    return t;
  },

  dominantThirteenth: function(note)
  {
    var t = Chords.dominantSeventh(note);
    t.push(
      Zenino.Intervals.majorSecond(note),
      //Zenino.Intervals.augmentedFourth(note),
      Zenino.Intervals.majorSixth(note)
    );
    return t;
  },
  minorThirteenth: function(note)
  {
    var t = Chords.minorSeventh(note);
    t.push(
      Zenino.Intervals.majorSecond(note),
      Zenino.Intervals.perfectFourth(note),
      Zenino.Intervals.majorSixth(note)
    );
    return t;
  },

  dominantAltered: function(note)
  {
    var t = Chords.dominantSeventh(note);
    t.push(
      Zenino.Intervals.augmentedSecond(note),
      //Zenino.Intervals.augmentedFourth(note),
      Zenino.Intervals.minorSixth(note)
    );
    return t;
  },


};

// Shortcuts

// triads
Chords.maj = Chords.majorTriad;
Chords.min = Chords.minorTriad;
Chords.dim = Chords.o = Chords.diminishedTriad;
Chords.aug = Chords['+'] = Chords.augmentedTriad;
Chords.sus2 = Chords.sus2Triad;
Chords.sus4 = Chords.sus4Triad;

// tetrads
Chords.Maj7 = Chords.majorSeventh;
Chords.Maj6 = Chords.majorSixth;
Chords.Maj7x5 = Chords.majorSeventh;
Chords.Maj7b5 = Chords.majorSeventhB5;
Chords.Maj7x4 = Chords.majorSeventhAugmentedFourth;

Chords.dom7 = Chords['7'] = Chords.dominantSeventh;
Chords.dom7x5 = Chords['7#5'] = Chords.augmentedDominantSeventh;
Chords.dom7b5 = Chords['7b5'] = Chords.dominantSeventhB5;
Chords.dom7sus4 = Chords['7sus4'] = Chords.dominantSeventhSus4;
Chords.sus4b5 = Chords['7sus4b5'] = Chords.dominantSeventhSus4B5;

Chords.minMaj7 = Chords.minorMajorSeventh;
Chords.min6 = Chords.minorSixth;
Chords.minMaj7x5 = Chords['minMaj7b5'] = Chords.augmentedMinorMajorSeventh;
Chords.min7 = Chords.minorSeventh;

Chords.min7b5 = Chords.halfDiminished;
Chords.o7 = Chords.dim7 = Chords.diminishedSeventh;
Chords.oMaj7 = Chords.dimMaj7 = Chords.diminishedMajorSeventh;

// Ninth
Chords.dom9 = Chords.dominantNinth;
Chords.sus4b9 = Chords.dominantSeventhSus4B9;
Chords.maj9 = Chords.majorNinth;
Chords.min9 = Chords.minorNinth;

// Eleventh
Chords.min11 = Chords.minorEleventh;
Chords.Maj7x11 = Chords.majorSeventhAugmentedEleventh;
Chords.dom7x11 = Chords.dominantSeventhAugmentedEleventh;

// Thirteenth
Chords.dom13 = Chords.dominantThirteenth;
Chords.maj13 = Chords.majorThirteenth;
Chords.min13 = Chords.minorThirteenth;
Chords.alt = Chords.dominantAltered

return {
  Chords: Chords
};

});
