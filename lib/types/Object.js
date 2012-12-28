ju1ius.namespace('Zenino', function()
{

function cloneOf(item)
{
  if (item instanceof Array) {
    return Zenino.Array.clone(item);
  } else if (typeof item === 'object') {
    return zObject.clone(item);
  }
  return item;
}

function mergeOne(source, key, current)
{
  switch (typeof current){
    case 'object':
      if (typeof source[key] === 'object') {
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
}


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
    var clone = {}, key;
    for (key in object) clone[key] = cloneOf(object[key]);
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

});
