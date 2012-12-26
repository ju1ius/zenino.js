ju1ius.namespace('Zenino', function()
{

function zRangeError(n, start, end)
{
  this.name = "RangeError";
  this.message = "Number "+n+" not in range ["+start+", "+end+"]";
}
zRangeError.prototype = new RangeError();
zRangeError.prototype.constructor = zRangeError;


function FormatError(msg)
{
	this.name = "FormatError";
	this.message = msg;
}
FormatError.prototype = new Error();
FormatError.prototype.constructor = FormatError;

function InvalidAccidentalError(acc)
{
  this.name = "InvalidAccidentalError";
  this.message = '"'+ acc + '"' + "is not a valid accidental";
};
InvalidAccidentalError.prototype = new FormatError();
InvalidAccidentalError.prototype.constructor = InvalidAccidentalError;

function NoteFormatError(note)
{
  this.name = "NoteFormatError";
  this.message = '"'+ note + '"' + "is not a valid note";
};
NoteFormatError.prototype = new FormatError();
NoteFormatError.prototype.constructor = NoteFormatError;


function KeyFormatError(key)
{
  this.name = "KeyFormatError";
  this.message = '"'+ key + '"' + "is not a valid key";
};
KeyFormatError.prototype = new FormatError();
KeyFormatError.prototype.constructor = KeyFormatError;


return {
  RangeError: zRangeError,
  FormatError: FormatError,
  InvalidAccidentalError: InvalidAccidentalError,
  NoteFormatError: NoteFormatError,
  KeyFormatError: KeyFormatError
};

});
