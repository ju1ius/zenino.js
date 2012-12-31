describe("Zenino.Intervals.interval", function()
{
  using('key, start_note, interval, expected', [
    ['C', 'C', 3, 'F'],
    ['C', 'G', 3, 'C'],
    ['C', 'F', 3, 'B'],
    ['C', 'G', 7, 'G'],
    ['C', 'G', 8, 'A'], // intervals greater than octave
    ['C', 'G', -2, 'E'], // negative intervals
    ['C', 'B', -3, 'F'],
    ['C', 'C', -3, 'G'],
    ['C', 'E', -8, 'D'], // negative intervals greater than octave
    ['a', 'E', 2, 'G'], // minor keys
    ['e', 'C', 3, 'F#'],
    ['ab', 'Cb', 3, 'Fb'],
    ['bb', 'Eb', 1, 'F'],
  ], function(key, start_note, interval, expected)
  {
    it("should return the note found at 'interval' starting from 'start_note' in the given 'key'.", function()
    {
      expect(Zenino.Intervals.interval(key, start_note, interval)).toEqual(expected);
    });
  });
});

describe("Zenino.Intervals.fromShorthand", function()
{
  using('note, interval, down, expected', [
    ['C', 'b2', false, 'Db'],
    ['F#', 'b3', false, 'A'],
    ['Bb', 'bb5', false, 'Fbb'],
    ['D#', '#5', false, 'A##'],
    ['Eb', '#5', true, 'Abb'],
    ['G', 'b3', true, 'E'],
    ['F#', '5', true, 'B'],
  ], function(note, interval, down, expected)
  {
    it("should return the note found at 'interval' starting from 'note' up or down.", function()
    {
      expect(Zenino.Intervals.fromShortHand(note, interval, down)).toEqual(expected);
    });
  });
});

describe("Zenino.Intervals.determine", function()
{
  using('note1, note2, expected', [
    ['C', 'E', '3'],
    ['C', 'Eb', 'b3'],
    ['C', 'E#', '#3'],
    ['Ab', 'Cb', 'b3'],
    ['F#', 'Eb', 'bb7'],
    ['Db', 'Bbb', 'b6'],
  ], function(note1, note2, expected)
  {
    it("should name the interval between two notes", function()
    {
      expect(Zenino.Intervals.determine(note1, note2)).toEqual(expected);
    });
  });
});