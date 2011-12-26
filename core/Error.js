NoteFormatError = function(note)
{
  this.name = "NoteFormatError";
  this.message = '"'+ note + '"' + "is not a valid note";
}
NoteFormatError.prototype = new Error();
NoteFormatError.prototype.constructor = NoteFormatError;

KeyError = function(key)
{
  this.name = "KeyError";
  this.message = '"'+ key + '"' + "is not a valid key";
}
KeyError.prototype = new Error();
KeyError.prototype.constructor = KeyError;
