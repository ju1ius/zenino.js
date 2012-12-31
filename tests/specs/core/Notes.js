describe('Zenino.Notes.intToNote', function()
{
  it("should convert integers to notes with sharp accidentals", function()
  {
    Zenino.Core.CHROMATICS_SHARP.forEach(function(note, idx)
    {
      expect(Zenino.Notes.intToNote(idx, '#')).toEqual(note);
    });
  });
  it("should convert integers to notes with flat accidentals", function()
  {
    Zenino.Core.CHROMATICS_FLAT.forEach(function(note, idx)
    {
      expect(Zenino.Notes.intToNote(idx, 'b')).toEqual(note);
    });
  });
  it("should throw when integer is not in range 0...11", function()
  {
    expect(function(){ Zenino.Notes.intToNote(12) }).toThrow(new Zenino.RangeError(12, 0, 11));
    expect(function(){ Zenino.Notes.intToNote(-1) }).toThrow(new Zenino.RangeError(-1, 0, 11));
  });
  it("should throw when accidental is not valid", function()
  {
    expect(function(){ Zenino.Notes.intToNote(10, 'foo') }).toThrow(new Zenino.InvalidAccidentalError('foo'));
  });
});

describe('Zenino.Notes.noteToInt', function()
{
  using('notes', [
    ['F#', 6], ['F##', 7], ['B', 11], ['B#', 0], ['Bbb', 9],
    ['C####', 4], ['Bbbbbb', 6]
  ], function(value, expected) {
    it("should convert notes in string representation to integer in range [0..11]", function()
    {
      expect(Zenino.Notes.noteToInt(value)).toEqual(expected);
    });
  });
});

describe('Zenino.Notes.isEnharmonic', function()
{
  using('note, other, result', [
    ['F#', 'Gb', true], ['F##', 'Abb', true], ['B', 'C', false], ['B#', 'C', true], ['Bbb', 'G##', true],
    ['C####', 'E', true], ['Bbbbbb', 'F#', true]
  ], function(note, other, result) {
    it("should tell whether two notes are enharmonic", function()
    {
      expect(Zenino.Notes.isEnharmonic(note, other)).toBe(result);
    });
  });
});

describe('Zenino.Notes.augment', function()
{
  using('note, result', [
    ['F#', 'F##'], ['G', 'G#'], ['Bb', 'B'], ['B', 'B#'], ['Bbb', 'Bb']
  ], function(note, result) {
    it("should augment a note", function()
    {
      expect(Zenino.Notes.augment(note)).toEqual(result);
    });
  });
});
describe('Zenino.Notes.diminish', function()
{
  using('note, result', [
    ['F#', 'F'], ['G', 'Gb'], ['Bb', 'Bbb'], ['B#', 'B'], ['B##', 'B#']
  ], function(note, result) {
    it("should diminish a note", function()
    {
      expect(Zenino.Notes.diminish(note)).toEqual(result);
    });
  });
});

describe('Zenino.Notes.reduceAccidentals', function()
{
  using('note, result', [
    ['F#', 'F#'], ['G##', 'A'], ['Gbb', 'F'], ['B##', 'C#'], ['Bbbb', 'Ab']
  ], function(note, result) {
    it("should reduce any extra accidentals to proper notes", function()
    {
      expect(Zenino.Notes.reduceAccidentals(note)).toEqual(result);
    });
  });
});

describe('Zenino.Notes.removeRedundantAccidentals', function()
{
  using('note, result', [
    ['F#', 'F#'], ['G##b', 'G#'], ['Gbb', 'Gbb'], ['Bbb#', 'Bb'], ['Bbbb###', 'B']
  ], function(note, result) {
    it("should remove redundant #'s and b's from the given note", function()
    {
      expect(Zenino.Notes.removeRedundantAccidentals(note)).toEqual(result);
    });
  });
});