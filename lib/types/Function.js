ju1ius.namespace('Zenino', function()
{

var zFunc = {
  
  cached: function(fn, callback)
  {
    var cache = {};
    return function(input) {
      var output;
      if(cache.hasOwnProperty(input)) {
        return callback ? callback(cache[input]) : cache[input];
      }
      output = fn.apply(null, arguments);
      cache[input] = output;
      return output;
    }
  }

};

return {
  Function: zFunc
};

});