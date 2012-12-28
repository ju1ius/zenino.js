ju1ius.namespace('Zenino', function()
{

function zRangeError(n, start, end)
{
  this.name = "RangeError";
  this.message = "Number "+n+" not in range ["+start+", "+end+"]";
  this.stack = Error().stack;
}
zRangeError.prototype = RangeError.prototype;
zRangeError.prototype.constructor = zRangeError;

function NoteNotInKeyError(n, key)
{
  this.name = "NoteNotInKeyError";
  this.message = "Note "+n+" not in key of "+key;
  this.stack = Error().stack;
}
NoteNotInKeyError.prototype = Error.prototype;
NoteNotInKeyError.prototype.constructor = NoteNotInKeyError;


function FormatError(msg)
{
  this.name = 'FormatError';
  this.message = msg;
  this.stack = Error().stack;
}
FormatError.prototype = Error.prototype;
FormatError.prototype.constructor = FormatError;

function InvalidAccidentalError(acc)
{
  this.name = "InvalidAccidentalError";
  this.message = '"'+ acc + '"' + "is not a valid accidental";
};
Zenino.Class.extend(FormatError, InvalidAccidentalError);

function NoteFormatError(note)
{
  this.name = "NoteFormatError";
  this.message = '"'+ note + '"' + "is not a valid note";
  NoteFormatError.__super__.constructor.call(this, this.message);
};
Zenino.Class.extend(FormatError, NoteFormatError);

function KeyFormatError(key)
{
  this.name = "KeyFormatError";
  this.message = '"'+ key + '"' + "is not a valid key";
};
Zenino.Class.extend(FormatError, KeyFormatError);

function InvalidChordShorthandError(value)
{
  this.name = "InvalidChordShorthandError";
  this.message = '"'+ value + '"' + "is not a valid chord shorthand";
};
Zenino.Class.extend(FormatError, InvalidChordShorthandError);


return {
  RangeError: zRangeError,
  NoteNotInKeyError: NoteNotInKeyError,
  FormatError: FormatError,
  InvalidAccidentalError: InvalidAccidentalError,
  NoteFormatError: NoteFormatError,
  KeyFormatError: KeyFormatError,
  InvalidChordShorthandError: InvalidChordShorthandError
};

});
