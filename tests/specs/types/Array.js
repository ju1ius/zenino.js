describe("Zenino.Array.rotate", function()
{
  using('array/rotation/expected', [
    [ [1,2,3,4,5], 2, [3,4,5,1,2] ],
    [ [1,2,3,4,5], 5, [1,2,3,4,5] ],
    [ [1,2,3,4,5], 7, [3,4,5,1,2] ],
  ], function(input, rotation, expected) {
    it("should rotate an array to the right", function()
    {
      expect(Zenino.Array.rotate(input, rotation)).toEqual(expected);
    });
  });
  using('array/rotation/expected', [
    [ [1,2,3,4,5], -2, [4,5,1,2,3] ],
    [ [1,2,3,4,5], -5, [1,2,3,4,5] ],
    [ [1,2,3,4,5], -7, [4,5,1,2,3] ],
  ], function(input, rotation, expected) {
    it("should rotate an array to the left", function()
    {
      expect(Zenino.Array.rotate(input, rotation)).toEqual(expected);
    });
  });
});

describe('Zenino.Array.pad', function()
{
  it("should pad an array with the specified value", function()
  {
    expect(Zenino.Array.pad([], 3, 'haye')).toEqual(['haye', 'haye', 'haye']);
    expect(Zenino.Array.pad([1,2,3], 6, 0)).toEqual([1,2,3,0,0,0]);
  });
  it("should return the same array if pad_size is < to array's length", function()
  {
    expect(Zenino.Array.pad([1,2,3], 2, 0)).toEqual([1,2,3]);
  });
});