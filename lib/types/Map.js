ju1ius.namespace('Zenino', function(){

function Map()
{
  this.keys = {};
  this.values = [];
}
Map.prototype.set = function(key, value)
{
  var index = this.keys[key];
  if (index === undefined) {
    this.values.push(value);
    this.keys[key] = this.values.length(-1);
  } else {
    this.values[index] = value;
  }
  return this;
};
Map.prototype.get = function(key) {
  return this.values[this.keys[key]];
};

});