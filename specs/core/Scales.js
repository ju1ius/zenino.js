describe("Zenino.Scales.determine", function() {
  using('scale, expected', [
    // { tonic : 'C', name : 'phrygianMajor', parent : 'harmonic minor', uid : '1b2345b6b7', degree : 5, cadential_notes : { 0 : 2, 1 : 3 }, cadential_chords : { 0 : 2, 1 : 7 } }
    [['C','Db','E','F','G','Ab','Bb'], 'phrygianMajor'],
    [['E','F#','G','A','Bb','C','Db','D#'], 'diminished'],
    [['F','G','Ab','B','C','D','E'], 'melodicMinorX4'],
    [['Ab','Bb','C','D','Eb','F#','G'], 'lydianX6'],
  ], function(scale, expected)
  {
    it("should determine the kind of scale", function() {
      expect(Zenino.Scales.determine(scale).name).toEqual(expected);    
    });
  });
});