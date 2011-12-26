(function(){

function in_range(i)
{
  return i >= 0 && i <= 11;  
}

var Note = {
  
	/**
	 * Converts integers in the range of 0-11 to notes in the form of C or C# (no Cb).
	 * You can use int_to_note in diatonic_key to
	 * do theoretically correct conversions that bear the key in mind.
	 * Throws a !RangeError exception if the note_int is not in range(0,12).
	 **/
	intToNote: function(int)
	{
		if(!in_range(int)) throw new RangeError(int, '(0..11)');
		return Zenino.Core.CHROMATICS[int];
	},
	
	/**
	 * Converts notes in the form of C, C#, Cb, C##, etc... to
	 * an integer in the range of 0-11.
	 * Throws an !NoteFormatError exception if the note format is not recognised.
	 **/
	noteToInt: function(note)
	{
		if(!Note.isValidNote(note)) throw new NoteFormatError(note);			
		
		var val = Zenino.Core.NOTES[note[0]],
	      alts = Note.getAccidentals(note);
		// Check for '#' and 'b' postfixes
		for(var i =0, l = alts.length; i < l; i++)
		{
      var alt = alts[i];
			if(alt == 'b') val--;
			else if (alt == '#') val++;
		}
		return Zenino.Math.mod(val, 12);
	},
	
	/**
	 * Test whether note1 and note2 are enharmonic, ie. they sound the same
	 **/
	isEnharmonic: function(note1, note2)
	{
		return Note.noteToInt(note1) == Note.noteToInt(note2);
	},
	
	/**
	 *  Removes redundant #'s and b's from the given note. 
	 *  For example: C##b becomes C#, Eb##b becomes E, etc...
	 **/
	removeRedundantAccidentals: function(note)
	{
    if(!Note.isValidNote(note)) throw new NoteFormatError(note);
		if(note.length < 2) return note;
		
		var val = 0,
		  alts = Note.getAccidentals(note),
		  result = note[0];

		for(var i =0, l = alts.length; i < l; i++) {
      var alt = alts[i];
			if(alt == 'b') val--;
			else if (alt == '#') val++;
		}
		while(val > 0) {
			result = Note.augment(result);
			val--;
		}
		while(val < 0) {
			result = Note.diminish(result);
			val++;
		}
		return result;
	},
	
	augment: function(note)
	{
		if(note.substr(-1) !== 'b')
			return note + '#';
		else
			return note.substr(0, -1);
	},
	diminish: function(note)
	{
		if(note.substr(-1) !== '#')
			return note + 'b';
		else
			return note.substr(0, -1);
	},
	
	/**
	 * returns the relative major of a note
	 **/
	toMajor: function(note)
	{
		return Zenino.Tools.Interval.minorThird(note);
	},
	/**
	 * returns the relative minor of a note
	 **/
	toMinor : function(note)
	{
		return Zenino.Tools.Interval.majorSixth(note);
	},

	/**
	 * Returns true if note is in a recognised format. False if not
	 **/
  isValidNote: function(name)
  {
    if(!Zenino.Core.NOTES.hasOwnProperty(name[0])) return false;
    var alts = Note.getAccidentals(name);
    for(var i = 0, l = alts.length; i < l; i++) {
      alt = alts[i];
      if(alt !== 'b' && alt !== '#') return false;
    }
    return true;
  },

  getAccidentals: function(note)
  {
    if(note.length > 1) return note.substr(1).split('');
    return [];
  }

}

Zenino.Tools.Note = Note;

})();
