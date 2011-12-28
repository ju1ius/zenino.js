FormatError = function(msg)
{
	this.name = "FormatError";
	this.message = msg;
}
FormatError.prototype = new Error();
FormatError.prototype.constructor = FormatError;


NoteFormatError = function(note)
{
  this.name = "NoteFormatError";
  this.message = '"'+ note + '"' + "is not a valid note";
}
NoteFormatError.prototype = new FormatError();
NoteFormatError.prototype.constructor = NoteFormatError;


KeyFormatError = function(key)
{
  this.name = "KeyFormatError";
  this.message = '"'+ key + '"' + "is not a valid key";
}
KeyFormatError.prototype = new FormatError();
KeyFormatError.prototype.constructor = KeyFormatError;
