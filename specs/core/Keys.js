describe("Zenino.Keys.getNotes", function()
{
  using('', [
    ['C', ['C','D','E','F','G','A','B']],
    ['F#', ['F#','G#','A#','B','C#','D#','E#']],
    ['F', ['F','G','A','Bb','C','D','E']],
    ['a', ['A','B','C','D','E','F','G']],
    ['a', ['A','B','C','D','E','F','G']],
    ['G', ['G','A','B','C','D','E','F#']],
    ['e', ['E','F#','G','A','B','C','D']]
  ], function(key, expected)
  {
    it("should return the notes in the specified key", function()
    {
      expect(Zenino.Keys.getNotes(key)).toEqual(expected);
    });
  });  
});