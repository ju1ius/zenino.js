describe('Zenino.String.splitCamelCase', function()
{
  it("should split camelCased strings", function()
  {
    expect(Zenino.String.splitCamelCase('fooBarBaz')).toEqual(['foo', 'Bar', 'Baz']);
    expect(Zenino.String.splitCamelCase('foo, Bar += Baz')).toEqual(['foo', 'Bar', 'Baz']);
  });
});