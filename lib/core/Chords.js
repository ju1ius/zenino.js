ju1ius.namespace('Zenino', function()
{

// A cache for composed triads
var triadsCache = {};
// A cache for composed sevenths
var seventhsCache = {};

var allowed_exts = ['b9', '9', '#9', '11', '#11', 'b13', '13'];

var NINTHS =      ['b9', '9', '#9'];
var	ELEVENTHS =   ['11', '#11'];
var	THIRTEENTHS = ['b13', '13'];


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
    'M7'      : 'majorSeventh',
    'dom7'    : 'dominantSeventh',
    '7'       : 'domi}antSeventh',
    'm7b5'    : 'halfDiminished',
    'min7b5'  : 'halfDiminished',
    '-7b5'    : 'halfDiminished',
    'ø'       : 'halfDiminished',
    'dim7'    : 'diminishedSeventh',
    'o7'      : 'diminishedSeventh',
    'oMaj7'   : 'diminishedMajorSeventh',
    'oM7'     : 'diminishedMajorSeventh',
    'm/M7'    : 'minorMajorSeventh',
    'mM7'     : 'minorMajorSeventh',
    'minMaj7' : 'minorMajorSeventh',
    '-Maj7'   : 'minorMajorSeventh',

    /* AUGMENTED SEVENTHS */
    '7#5'       : 'augmentedDominantSeventh',
    '7+'        : 'augmentedDominantSeventh',
    '7+5'       : 'augmentedDominantSeventh',
    'M7#5'      : 'augmentedMajorSeventh',
    'M7+'       : 'augmentedMajorSeventh',
    'M7+5'      : 'augmentedMajorSeventh',
    'Maj7#5'    : 'augmentedMajorSeventh',
    'Maj7+'     : 'augmentedMajorSeventh',
    'Maj7+5'    : 'augmentedMajorSeventh',
    'mM7+'      : 'augmentedMinorMajorSeventh',
    'mM7#5'     : 'augmentedMinorMajorSeventh',
    'minMaj7+'  : 'augmentedMinorMajorSeventh',
    'minMaj7#5' : 'augmentedMinorMajorSeventh',
    '-M7#5'     : 'augmentedMinorMajorSeventh',
    '-Maj7#5'   : 'augmentedMinorMajorSeventh',

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
    'm9'    :'minorNinth',
    'min9'  :'minorNinth',
    '-9'    :'minorNinth',

    /* ELEVENTHS   */
    'm11'   :'minorEleventh',
    'min11' :'minorEleventh',
    '-11'   :'mminorEleventh',

    /* THIRTEENTHS */
    'maj13' :'majorThirteenth',
    'Maj13' :'majorThirteenth',
    'M13'   :'majorThirteenth',
    'min13' :'minorThirteenth',
    'm13'   :'minorThirteenth',
    '-13'   :'minorThirteenth',
    '13'    :'dominantThirteenth',

    /* ALTERED CHORDS */
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
    var chord = [], exts = [];
    // First we cut the extensions from the basic chord
    if(chord_name.indexOf('/') !== -1) {
      var parts = chord_name.split('/');
      chord_name = parts[0];
      exts = parts.slice(1);
    }
    // Then we return the basic chord
    for(var name in Chords.SHORTHANDS) {
      if(name === chord_name) {
        var method = Chords.SHORTHANDS[name]
        chord = Chords[method](root);
        break;
      }
    }
    // and build the extensions
    for(var i = 0, l = exts.length; i < l; i++) {
      var ext = exts[i];
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
    return allowed_exts.indexOf(ext) !== -1;
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
        chord = Zenino.Array.clone(chord);
    if(l >= 3) {
      var drop2 = chord.splice(l - 2, 1);
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
        chord = Zenino.Array.clone(chord);
    if(count(chord) >= 4) {
      var drop2 = chord.splice(len - 2, 1);
      var drop4 = chord.splice(len - 4, 1);
      chord.unshift(drop2, drop4);
    }
    return chord;
  },

  extend: function(chord, exts)
  {
    chord = Zenino.Array.clone(chord);
    for(var i =0, l = exts.length; i < l; i++) {
      var ext = exts[i];
      if(NINTH.indexOf(ext) !== -1) {
        chord.push(Zenino.Intervals.fromShortHand(chord[0], ext));
        continue;
      }
      if(ELEVENTHS.indexOf(ext) !== -1) {
        chord.push(Zenino.Intervals.fromShortHand(chord[0], ext));
        continue;
      }
      if(THIRTEENTHS.indexOf(ext) !== -1) {
        chord.push(Zenino.Intervals.fromShortHand(chord[0], ext));
        continue;
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
  triads: function(key)
  {
    if(triadsCache.hasOwnProperty(key)) {
      return triadsCache[key];      
    }
    var notes = Zenino.Diatonics.getNotes(key),
        res = [];
    for(var i = 0, l = notes.length; i < l; i++) {
      res.push(Chords.triad(notes[i], key));
    }
    triadsCache[key] = res;
    return res;
  },

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
/*
  * SHORTCUTS
*/
  maj:  function(note) { return Chords.majorTriad(note); },
  min:  function(note) { return Chords.minorTriad(note); },
  dim:  function(note) { return Chords.diminishedTriad(note); },
  o:    function(note) { return Chords.diminishedTriad(note); },
  aug:  function(note) { return Chords.augmentedTriad(note); },
  sus2: function(note) { return Chords.sus2Triad(note); },
  sus4: function(note) { return Chords.sus4Triad(note); },

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
  sevenths: function(key)
  {
    if(seventhsCache.hasOwnProperty(key)) {
      return seventhsCache[key];      
    }
    var notes = Zenino.Diatonics.getNotes(key),
        res = [];
    for(var i = 0, l = notes.length; i < l; i++) {
      res.push(Chords.seventh(notes[i], key));
    }
    seventhsCache[key] = res;
    return res;
  },

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

/**
 * SHORTCUTS
 **/
  Maj7:       function(note) { return Chords.majorSeventh(note); },
  Maj6:       function(note) { return Chords.majorSixth(note); },
  Maj7x5:     function(note) { return Chords.majorSeventh(note); },
  Maj7b5:     function(note) { return Chords.majorSeventhB5(note); },
  Maj7x4:     function(note) { return Chords.majorSeventhB5(note); },

  dom7:       function(note) { return Chords.dominantSeventh(note); },
  dom7x5:     function(note) { return Chords.augmentedDominantSeventh(note); },
  dom7b5:     function(note) { return Chords.augmentedDominantSeventh(note); },
  dom7sus4:   function(note) { return Chords.dominantSeventhSus4(note); },
  sus4b5:     function(note) { return Chords.dominantSeventhSus4B5(note); },

  minMaj7:    function(note) { return Chords.minorMajorSeventh(note); },
  min6:       function(note) { return Chords.minorSixth(note); },
  minMaj7x5:  function(note) { return Chords.augmentedMinorMajorSeventh(note); },
  min7:       function(note) { return Chords.minorSeventh(note); },

  min7b5:     function(note) { return Chords.halfDiminished(note); },
  o7:         function(note) { return Chords.diminishedSeventh(note); },
  oMaj7:      function(note) { return Chords.diminishedMajorSeventh(note); },



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
  dominantSeventhSus4B9: function(note)
  {
    var t = Chords.dominantSeventhSus4(note);
    t.push(Zenino.Intervals.minorSecond(note));
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

/*
  * SHORTCUTS 
*/
  dom9:   function(note) { return Chords.dominantNinth(note); },
  sus4b9: function(note) { return Chords.dominantSeventhSus4B9(note); },
  maj9:   function(note) { return Chords.majorNinth(note); },
  min9:   function(note) { return Chords.minorNinth(note); },
  min11:  function(note) { return Chords.minorEleventh(note); },
  dom13:  function(note) { return Chords.dominantThirteenth(note); },
  maj13:  function(note) { return Chords.majorThirteenth(note); },
  min13:  function(note) { return Chords.minorThirteenth(note); },
  alt:    function(note) { return Chords.dominantAltered(note); }

};


return {
  Chords: Chords
};

});
