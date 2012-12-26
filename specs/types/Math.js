
describe("Zenino.Math.mod", function()
{
  using('number, expected', [
    [8, 8], [20, 8], [7, 7], [19, 7],
    [12, 0], [24, 0],
    [-8, 4], [-20, 4], [-7, 5], [-19, 5],
    [-12, 0], [-24, 0]
  ], function(input, expected) {
    it("should correctly handle negative numbers modulus of 12", function()
    {
      expect(Zenino.Math.mod(input, 12)).toEqual(expected);
    });
  });
});
