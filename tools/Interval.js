(function(){

// [shorthand, interval function up, interval function down]
var SHORTHAND_LOOKUP = [
  ['1',  'majorUnison',   'majorUnison'],
  ['2',  'majorSecond',   'minorSeventh'],
  ['3',  'majorThird',    'minorSixth'],
  ['4',  'perfectFourth', 'perfectFifth'],
  ['5',  'perfectFifth',  'perfectFourth'],
  ['6',  'majorSixth',    'minorThird'],
  ['7',  'majorSeventh',  'minorSecond'],
  ['9',  'majorSecond',   'minorSeventh'],
  ['11', 'perfectFourth', 'perfectFifth'],
  ['13', 'majorSixth',    'minorThird']
];

// [name, shorthand_name, half notes]  for major version of this interval
var FIFTH_STEPS = [
	['unison',  '1', 0],
	['fifth',   '5', 7],
	['second',  '2', 2],
	['sixth',   '6', 9],
	['third',   '3', 4],
	['seventh', '7', 11],
	['fourth',  '4', 5]
];

var MAJ_INTERVALS = [0, 2, 4, 5, 7, 8, 11];

// Private function to count the value of accidentals
function getVal(note)
{
	var r = 0,
			alts = Zenino.Tools.Note.getAccidentals(note);
	for(var i = 0, l = alts.length; i < l; i++) {
		var alt = alts[i];
		if(alt == 'b') r--;
		else if(alt == '#') r++;
	}
	return r;
}

var Interval = {

	/**
	 * Diatonic intervals.
	 * Needs a note and a key.
	 **/

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
		return Zenino.Tools.Diatonic.interval(key, note, 1);
	},
	third: function(note, key)
	{
		return Zenino.Tools.Diatonic.interval(key, note, 2);
	},
	fourth: function(note, key)
	{
		return Zenino.Tools.Diatonic.interval(key, note, 3);
	},
	fifth: function(note, key)
	{
		return Zenino.Tools.Diatonic.interval(key, note, 4);
	},
	sixth: function(note, key)
	{
		return Zenino.Tools.Diatonic.interval(key, note, 5);
	},
	seventh: function(note, key)
	{
		return Zenino.Tools.Diatonic.interval(key, note, 6);
	},

	/**
	 * ABSOLUTE INTERVALS
	 **/

	minorUnison: function(note)
	{
		return Zenino.Tools.Note.diminish(note);
	},
	majorUnison: function(note)
	{
		return note;
	},
	augmentedUnison: function(note)
	{
		return Zenino.Tools.Note.augment(note);
	},

	minorSecond: function(note)
	{
		sec = Interval.second(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, sec, 1);
	},
	majorSecond: function(note)
	{
		sec = Interval.second(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, sec, 2);
	},
	augmentedSecond: function(note)
	{
		sec = Interval.second(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, sec, 3);
	},
	
	diminishedThird: function(note)
	{
		trd = Interval.third(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, trd, 2);
	},
	minorThird: function(note)
	{
		trd = Interval.third(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, trd, 3);
	},
	majorThird: function(note)
	{
		trd = Interval.third(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, trd, 4);
	},
	augmentedThird: function(note)
	{
		trd = Interval.third(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, trd, 5);
	},
	
	diminishedFourth: function(note)
	{
		frt = Interval.fourth(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, frt, 4);
	},
	perfectFourth: function(note)
	{
		frt = Interval.fourth(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, frt, 5);
	},
	augmentedFourth: function(note)
	{
		frt = Interval.fourth(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, frt, 6);
	},
	
	diminishedFifth: function(note)
	{
		fif = Interval.fifth(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, fif, 6);
	},
	perfectFifth: function(note)
	{
		fif = Interval.fifth(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, fif, 7);
	},
	augmentedFifth: function(note)
	{
		fif = Interval.fifth(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, fif, 8);
	},
	
	diminishedSixth: function(note)
	{
		sth = Interval.sixth(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 7);
	},
	minorSixth: function(note)
	{
		sth = Interval.sixth(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 8);
	},
	majorSixth: function(note)
	{
		sth = Interval.sixth(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 9);
	},
	diminishedSeventh: function(note)
	{
		sth = Interval.seventh(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 9);
	},
	minorSeventh: function(note)
	{
		sth = Interval.seventh(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 10);
	},
	majorSeventh: function(note)
	{
		sth = Interval.seventh(note[0], 'C');
		return Interval.augmentOrDiminishUntilTheIntervalIsRight(note, sth, 11);
	},
	
	minorNinth: function(note){ return Interval.minorSecond(note); },
	majorNinth: function(note){ return Interval.majorSecond(note); },
	augmentedNinth: function(note){ return Interval.augmentedSecond(note); },
	perfectEleventh: function(note){ return Interval.perfectFourth(note); },
	augmentedEleventh: function(note){ return Interval.augmentedFourth(note); },
	minorThirteenth: function(note){ return Interval.minorSixth(note); },
	majorThirteenth: function(note){ return Interval.majorSixth(note); },
	
	/**
	 * Gets the note an interval (in semitones) away from the given note.
	 * This will produce mostly theoretical sound results, but you should 
	 * use the minor and major functions to work around the corner cases.
	 **/
	getInterval: function(note, interval, key)
	{
		key = key || 'C';
		var intervals = [],
				key_notes = Zenino.Tools.Diatonic.getNotes(key),
				l = key_notes.length;
		// 7 = MAJ_INTERVALS.length
		for(var i = 0; i < 7; i++) {
			intervals.push( (Zenino.Tools.Note.noteToInt(key) + MAJ_INTERVALS[i]) % 12 );
		}

		for(var i = 0; i < l; i++) {
			var kn = key_notes[i],
					result;
			if(kn[0] == note[0]) {
				result = (intervals[key_notes.indexOf(kn)] + interval) % 12;
				var idx = intervals.indexOf(result),
						accidentals = Zenino.Tools.Note.getAccidentals(note).join('');
        if( idx !== -1) {
          return key_notes[idx] + accidentals;
        } else {
          return Zenino.Tools.Note.diminish(
            key_notes[intervals.indexOf((result + 1) % 12)] + accidentals
          );
        }
			}
		}
	},
	
	/**
	 * Returns an integer in the range of 0-11,
	 * determining the half steps between note1 and note2
	 **/
	measure: function(note1, note2)
	{
		res = Zenino.Tools.Note.noteToInt(note2) - Zenino.Tools.Note.noteToInt(note1);
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
		if(note1[0] == note2[0]) {
			var x = getVal(note1),
					y = getVal(note2);
			if(x == y) 						return '1';
			else if (x < y) 			return '#1';
			else if (x - y == 1) 	return 'b1';
			else 									return 'bb1';
		}
		// Other intervals
		var n1 = Zenino.Core.FIFTHS.indexOf(note1[0]),
				n2 = Zenino.Core.FIFTHS.indexOf(note2[0]),
				number_of_fifth_steps = n2 - n1;
		if(n2 < n1) {
			// 7 =  Zenino.Core.FIFTHS.length
			number_of_fifth_steps = 7 - n1 + n2;		
		}
		// Count half steps between note1 and note2
		var half_steps = Interval.measure(note1, note2);
		// Get the proper list from the number of fifth steps
		var current = FIFTH_STEPS[number_of_fifth_steps];
		// maj = number of major steps for this interval
		var maj = current[2];
		if(maj == half_steps) {
			// if maj is equal to the half steps between note1 and note2
			// the interval is major or perfect
			return current[1];
		} else if(maj + 1 <= half_steps) {
			// if maj + 1 is equal to half_steps, the interval is augmented.
			return Zenino.String.repeat('#', half_steps - maj) + current[1];
		} else if(maj - 1 == half_steps) {
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
	fromShortHand: function(note, interval, up)
	{
		if(typeof up === 'undefined') up = true;
		// warning should be a valid note.
		if(!Zenino.Tools.Note.isValidNote(note)) return false;
		// Looking up last character in interval in SHORTHAND_LOOKUP
		// and calling that function.
		var val = false;
		for(var i = 0, l = SHORTHAND_LOOKUP.length; i++;) {
			var shorthand = SHORTHAND_LOOKUP[i];
			if(shorthand[0] == interval.substr(-1)) {
				val = up ? Interval[shorthand[1]](note) : Interval[shorthand[2]](note);
			}
		}
		// warning Last character in interval should be 1-7
		if(val == false) return false;
		// Collect accidentals
		var int_array = interval.split('');
		for(var i = 0, l = int_array.length; i < l; i++) {
			var char = int_array[i];
			if(char == '#') {
				val = up ? Zenino.Tools.Note.augment(val)
					: Zenino.Tools.Note.diminish(val);
			} else if(char == 'b') {
				val = up ? Zenino.Tools.Note.diminish(val)
					: Zenino.Tools.Note.augment(val);
			} else {
				return val;
			}
		}
	},
	
	/**
	 * A helper function for the minor and major functions.
	 * 
	 **/
	augmentOrDiminishUntilTheIntervalIsRight: function(note1, note2, interval)
	{
		var cur = Interval.measure(note1, note2);
		while(cur !== interval) {
			if(cur > interval)
				note2 = Zenino.Tools.Note.diminish(note2);
			else if(cur < interval)
				note2 = Zenino.Tools.Note.augment(note2);
			cur = Interval.measure(note1, note2);
		}
		// We are practically done right now, but we need to be able to create
		// the minor seventh of Cb and get Bbb instead of B######### as the result
		var val = 0,
				alts = Zenino.Tools.Note.getAccidentals(note2);
		for(var i = 0, l = alts.length; i < l; i++) {
			var alt = alts[i];
			if (alt == '#') val++;
			else if (alt == 'b') val--;
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
		var result = note2[0];
		while(val > 0) {
			result = Zenino.Tools.Note.augment(result);
			val--;
		}
		while(val < 0) {
			result = Zenino.Tools.Note.diminish(result);
			val++;
		}
		return result;
	}

};

Zenino.Tools.Interval = Interval;

})();
