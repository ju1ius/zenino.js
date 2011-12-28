
describe("Zenino.Math.mod", function()
{
  it("should correctly handle negative numbers modulus", function()
  {
    var data = [
      // [input, expected]
      [8, 8], [20, 8], [7, 7], [19, 7],
      [12, 0], [24, 0],
      [-8, 4], [-20, 4], [-7, 5], [-19, 5],
      [-12, 0], [-24, 0]
    ];
    for(var i = 0, l = data.length; i < l; ++i) {
      var params = data[i],
          input = params[0], expected = params[1],
          result = Zenino.Math.mod(data[i][0], 12);
      expect(result).toEqual(expected);
    }
  });  
});
