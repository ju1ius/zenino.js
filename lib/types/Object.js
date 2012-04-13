ju1ius.namespace('Zenino', function()
{

var cloneOf = function(item)
{
  switch (typeof item) {
    case 'array': return Zenino.Array.clone(item);
    case 'object': return zObject.clone(item);
    default: return item;
  }
};

var mergeOne = function(source, key, current)
{
  switch (typeof current){
    case 'object':
      if (typeof source[key] == 'object') {
        zObject.merge(source[key], current);
      } else {
        source[key] = zObject.clone(current);
      }
      break;
    case 'array':
      source[key] = Zenino.Array.clone(current);
      break;
    default:
      source[key] = current;
      break;
  }
  return source;
};


zObject = {

  merge: function(source, k, v)
  {
    if (typeof k == 'string') {
      return mergeOne(source, k, v);
    }
    for (var i = 1, l = arguments.length; i < l; i++) {
      var object = arguments[i];
      for (var key in object) mergeOne(source, key, object[key]);
    }
    return source;
  },

  clone: function(object)
  {
    var clone = {};
    for (var key in object) clone[key] = cloneOf(object[key]);
    return clone;
  },

  append: function(original)
  {
    for (var i = 1, l = arguments.length; i < l; i++) {
      var extended = arguments[i] || {};
      for (var key in extended) {
        original[key] = extended[key];
      }
    }
    return original;
  }

};


return {
  Object: zObject
};

})();
