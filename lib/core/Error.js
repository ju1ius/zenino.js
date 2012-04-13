ju1ius.namespace('Zenino', function()
{

var FormatError = function(msg)
{
	this.name = "FormatError";
	this.message = msg;
};
FormatError.prototype = new Error();
FormatError.prototype.constructor = FormatError;


var NoteFormatError = function(note)
{
  this.name = "NoteFormatError";
  this.message = '"'+ note + '"' + "is not a valid note";
};
NoteFormatError.prototype = new FormatError();
NoteFormatError.prototype.constructor = NoteFormatError;


var KeyFormatError = function(key)
{
  this.name = "KeyFormatError";
  this.message = '"'+ key + '"' + "is not a valid key";
};
KeyFormatError.prototype = new FormatError();
KeyFormatError.prototype.constructor = KeyFormatError;


return {
  FormatError: FormatError,
  NoteFormatError: NoteFormatError,
  KeyFormatError: KeyFormatError
};

});
