ju1ius.namespace('Zenino', function()
{

var zFunc = {
  
  cached: function(fn, callback, keygen)
  {
    var cache = {};
    return function(input) {
      var key = keygen ? keygen.apply(this, arguments) : input,
          fromCache = cache[key],
          result;
      if (fromCache === undefined) {
        result = fn.apply(this, arguments);
        cache[key] = callback ? callback(result) : result;
        return result;
      }
      return callback ? callback(fromCache) : fromCache;
    };
  }

};

return {
  Function: zFunc
};

});


