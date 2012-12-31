ju1ius.namespace('Zenino', function()
{

// [shorthand, interval function up, interval function down]
var SHORTHAND_LOOKUP = {
  '1':  {method: {up: 'majorUnison',   down: 'majorUnison'},    semitones: 0 },
  '2':  {method: {up: 'majorSecond',   down: 'minorSeventh'},   semitones: 2 },
  '3':  {method: {up: 'majorThird',    down: 'minorSixth'},     semitones: 4 },
  '4':  {method: {up: 'perfectFourth', down: 'perfectFifth'},   semitones: 5 },
  '5':  {method: {up: 'perfectFifth',  down: 'perfectFourth'},  semitones: 7 },
  '6':  {method: {up: 'majorSixth',    down: 'minorThird'},     semitones: 9 },
  '7':  {method: {up: 'majorSeventh',  down: 'minorSecond'},    semitones: 11},
  '9':  {method: {up: 'majorSecond',   down: 'minorSeventh'},   semitones: 2 },
  '11': {method: {up: 'perfectFourth', down: 'perfectFifth'},   semitones: 5 },
  '13': {method: {up: 'majorSixth',    down: 'minorThird'},     semitones: 9 }
},

// [name, shorthand_name, half notes]  for major version of this interval
FIFTH_STEPS = [
	['unison',  '1', 0],
	['fifth',   '5', 7],
	['second',  '2', 2],
	['sixth',   '6', 9],
	['third',   '3', 4],
	['seventh', '7', 11],
	['fourth',  '4', 5]
],

MAJ_INTERVALS = [0, 2, 4, 5, 7, 8, 11];

// Private function to count the value of accidentals
function getVal(note)
{
  var r = 0,
      alts = Zenino.Notes.getAccidentals(note);
  for(var i = 0, l = alts.length; i < l; i++) {
    var alt = alts[i];
    if(alt === 'b') r--;
    else if(alt === '#') r++;
  }
  return r;
}

var Intervals = {

  /**
   * Diatonic intervals.
   * Needs a note and a key.
   **/

 /**
  * Returns the note found at the interval starting from $start_note in the given key.
  * For example interval('C', 'D', 1) will return 'E'.
  * @throws Zenino.NoteFormatError if the start_note is not a valid note.
  * @throws Zenino.NoteNotInKeyError if start_note does'nt belong to key.
  **/
  interval: function (key, start_note, interval)
  {
    if( !Zenino.Notes.isValidNote(start_note) ) {
      throw new Zenino.NoteFormatError(start_note);
    }
    var notes_in_key = Zenino.Keys.getNotes(key),
        index = null,
        i, l, note;
    for(i = 0, l = notes_in_key.length; i < l; i++) {
      note = notes_in_key[i];
      if (note[0] === start_note[0]) {
      //if (note === start_note) {
        index = i;
        break;
      }
    }
    if(index === null) {
      throw new Zenino.NoteNotInKeyError(start_note, key);      
    }
    return notes_in_key[Zenino.Math.mod(index + interval, 7)];
  },

  /**
   * One of the most useless methods ever written,
   * which returns the unison of a note.
   * The key is not at all important, but is here for  consistency reasons only. 
   **/
  unison: function (note, key) {
    return note;
  },

  /**
   * Take the diatonic second of note in key.
   * Examples: 
   * 	second("E", "C")  => 'F'
   * 	second("E", "D")  => 'F#'
   * Raises a !KeyError if the `note` is not found in the `key`
   **/
  second: function(note, key)
  {
    return Intervals.interval(key, note, 1);
  },
  third: function(note, key)
  {
    return Intervals.interval(key, note, 2);
  },
  fourth: function(note, key)
  {
    return Intervals.interval(key, note, 3);
  },
  fifth: function(note, key)
  {
    return Intervals.interval(key, note, 4);
  },
  sixth: function(note, key)
  {
    return Intervals.interval(key, note, 5);
  },
  seventh: function(note, key)
  {
    return Intervals.interval(key, note, 6);
  },

  /**
   * ABSOLUTE INTERVALS
   **/

  minorUnison: function(note)
  {
    return Zenino.Notes.diminish(note);
  },
  majorUnison: function(note)
  {
    return note;
  },
  augmentedUnison: function(note)
  {
    return Zenino.Notes.augment(note);
  },

  diminishedSecond: function(note)
  {
    var sec = Intervals.second(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sec, 0);
  },
  minorSecond: function(note)
  {
    var sec = Intervals.second(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sec, 1);
  },
  majorSecond: function(note)
  {
    var sec = Intervals.second(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sec, 2);
  },
  augmentedSecond: function(note)
  {
    var sec = Intervals.second(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sec, 3);
  },

  diminishedThird: function(note)
  {
    var trd = Intervals.third(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, trd, 2);
  },
  minorThird: function(note)
  {
    var trd = Intervals.third(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, trd, 3);
  },
  majorThird: function(note)
  {
    var trd = Intervals.third(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, trd, 4);
  },
  augmentedThird: function(note)
  {
    var trd = Intervals.third(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, trd, 5);
  },

  diminishedFourth: function(note)
  {
    var frt = Intervals.fourth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, frt, 4);
  },
  perfectFourth: function(note)
  {
    var frt = Intervals.fourth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, frt, 5);
  },
  augmentedFourth: function(note)
  {
    var frt = Intervals.fourth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, frt, 6);
  },

  diminishedFifth: function(note)
  {
    var fif = Intervals.fifth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, fif, 6);
  },
  perfectFifth: function(note)
  {
    var fif = Intervals.fifth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, fif, 7);
  },
  augmentedFifth: function(note)
  {
    var fif = Intervals.fifth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, fif, 8);
  },

  diminishedSixth: function(note)
  {
    var sth = Intervals.sixth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 7);
  },
  minorSixth: function(note)
  {
    var sth = Intervals.sixth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 8);
  },
  majorSixth: function(note)
  {
    var sth = Intervals.sixth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 9);
  },
  augmentedSixth: function(note)
  {
    var sth = Intervals.sixth(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 10);
  },

  diminishedSeventh: function(note)
  {
    var sth = Intervals.seventh(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 9);
  },
  minorSeventh: function(note)
  {
    var sth = Intervals.seventh(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 10);
  },
  majorSeventh: function(note)
  {
    var sth = Intervals.seventh(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 11);
  },
  augmentedSeventh: function(note)
  {
    var sth = Intervals.seventh(note[0], 'C');
    return Intervals.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 12);
  },

  /**
   * Gets the note an interval (in semitones) away from the given note.
   * This will produce mostly theoretical sound results, but you should 
   * use the minor and major functions to work around the corner cases.
   **/
  getInterval: function(note, interval, key)
  {
    key = key || 'C';
    var intervals = [],
        key_notes = Zenino.Keys.getNotes(key),
        key_note, result, idx, accidentals,
        i, l = key_notes.length;
    // 7 = MAJ_INTERVALS.length
    for(i = 0; i < 7; i++) {
      intervals.push( (Zenino.Notes.noteToInt(key) + MAJ_INTERVALS[i]) % 12 );
    }

    for(i = 0; i < l; i++) {
      key_note = key_notes[i];
      if(key_note[0] === note[0]) {
        result = (intervals[key_notes.indexOf(key_note)] + interval) % 12;
        idx = intervals.indexOf(result);
        accidentals = Zenino.Notes.getAccidentals(note).join('');
        if( idx !== -1) {
          return key_notes[idx] + accidentals;
        }
        return Zenino.Notes.diminish(
          key_notes[intervals.indexOf((result + 1) % 12)] + accidentals
        );
      }
    }
  },

  /**
   * Returns an integer in the range of 0-11,
   * determining the half steps between note1 and note2
   **/
  measure: function(note1, note2)
  {
    var res = Zenino.Notes.noteToInt(note2) - Zenino.Notes.noteToInt(note1);
    return (res < 0) ? 12 - (res * -1) : res;
  },

  /**
   * Invert an interval represented as `[note1, note2]`.
   **/
  invert: function(interval)
  {
    return interval.reverse();
  },

  /**
   * Names the interval between note1 and note2.
   * Example:
   *	determine("C", "E")  => '3'
   *	determine("C", "Eb")  => 'b3'
   *	determine("C", "Ab")  => 'b6'
   *	determine("C", "Fb")  => 'b4'
   * This works for all intervals.
   **/
  determine: function(note1, note2)
  {
    //  Corner case for unisons ('A' and 'Ab', for instance)
    if(note1[0] === note2[0]) {
      var x = getVal(note1),
          y = getVal(note2);
      if(x === y) {
        return '1';
      } else if (x < y) {
        return '#1';
      } else if (x - y === 1) {
        return 'b1';
      }
      return 'bb1';
    }
    // Other intervals
    var n1 = Zenino.Core.FIFTHS.indexOf(note1[0]),
        n2 = Zenino.Core.FIFTHS.indexOf(note2[0]),
        number_of_fifth_steps = n2 - n1,
        half_steps, current, maj;
    if(n2 < n1) {
      // 7 =  Zenino.Core.FIFTHS.length
      number_of_fifth_steps = 7 - n1 + n2;		
    }
    // Count half steps between note1 and note2
    half_steps = Intervals.measure(note1, note2);
    // Get the proper list from the number of fifth steps
    current = FIFTH_STEPS[number_of_fifth_steps];
    // maj = number of major steps for this interval
    maj = current[2];
    if(maj === half_steps) {
      // if maj is equal to the half steps between note1 and note2
      // the interval is major or perfect
      return current[1];
    } else if(maj + 1 <= half_steps) {
      // if maj + 1 is equal to half_steps, the interval is augmented.
      return Zenino.String.repeat('#', half_steps - maj) + current[1];
    } else if(maj - 1 === half_steps) {
      // etc.
      return 'b' + current[1];
    } else if(maj - 2 >= half_steps) {
      return Zenino.String.repeat('b', maj - half_steps) + current[1];
    }
  },

  /**
   * Returns the note on interval up or down.
   * Example:
   *	from_shorthand('A', 'b3') => 'C'
   **/
  fromShortHand: function(note, interval, down)
  {
    down = down || false;
    // warning should be a valid note.
    if(!Zenino.Notes.isValidNote(note)) {
      throw new Zenino.NoteFormatError(note);
    }
    // Looking up last character in interval in SHORTHAND_LOOKUP
    // and calling that function.
    var val = false,
        base_interval = interval.substr(-1),
        lookup = SHORTHAND_LOOKUP[base_interval],
        i, l, char;
    // warning Last character in interval should be 1-7
    if(!methods) {
      throw new Zenino.FormatError("Invalid interval shorthand "+interval);
    }
    val = Intervals[lookup.method[down ? 'down': 'up']](note);
    // Collect accidentals
    for(i = 0, l = interval.length; i < l; i++) {
      char = interval[i];
      if(char === '#') {
        val = down ? Zenino.Notes.diminish(val) : Zenino.Notes.augment(val);
      } else if(char === 'b') {
        val = down ? Zenino.Notes.augment(val) : Zenino.Notes.diminish(val);
      } else {
        return val;
      }
    }
  },

  /**
   * Given an interval shorthand in the form 'b2', '#4', 'bb7', etc...,
   * returns the corresponding number of semitones
   **/
  shorthandToSemitones: function(shorthand)
  {
    var base_interval = shorthand.substr(-1),
        value = SHORTHAND_LOOKUP[base_interval].semitones,
        i, l, chr;
    for(i = 0, l = shorthand.length; i < l; i++) {
      chr = shorthand[i];
      if(chr === '#') {
        value++;
      } else if(chr === 'b') {
        value--;
      } else {
        return value;
      }
    }
  },

  /**
   * A helper function for the minor and major functions.
   * 
   **/
  augmentOrDiminishUntilTheIntervalIsRight: function(note1, note2, interval)
  {
    var cur = Intervals.measure(note1, note2),
        val = 0,
        i, l, alt,
        result;
    while(cur !== interval) {
      if(cur > interval)
        note2 = Zenino.Notes.diminish(note2);
      else if(cur < interval)
        note2 = Zenino.Notes.augment(note2);
      cur = Intervals.measure(note1, note2);
    }
    // We are practically done right now, but we need to be able to create
    // the minor seventh of Cb and get Bbb instead of B######### as the result
    val = 0;
    for(i = 1, l = note2.length; i < l; i++) {
      alt = note2[i];
      if (alt === '#') val++;
      else if (alt === 'b') val--;
    }
    // These are some checks to see if we have generated too much #'s
    // or too much b's. In these cases we need to convert #'s to b's
    // and vice versa. 
    if(val > 6) {
      val = val % 12;
      val = -12 + val;
    } else if(val < -6) {
      val = val % -12;
      val = 12 + val;
    }
    // Rebuild the note
    result = note2[0];
    while(val > 0) {
      result = Zenino.Notes.augment(result);
      val--;
    }
    while(val < 0) {
      result = Zenino.Notes.diminish(result);
      val++;
    }
    return result;
  }

};

Intervals.minorNinth = Intervals.minorSecond;
Intervals.majorNinth = Intervals.majorSecond;
Intervals.augmentedNinth = Intervals.augmentedSecond;
Intervals.diminishedEleventh = Intervals.diminishedFourth;
Intervals.perfectEleventh = Intervals.perfectFourth;
Intervals.augmentedEleventh = Intervals.augmentedFourth;
Intervals.minorThirteenth = Intervals.minorSixth;
Intervals.majorThirteenth = Intervals.majorSixth;
Intervals.augmentedThirteenth = Intervals.augmentedSixth;

return {
  Intervals: Intervals
};

});
