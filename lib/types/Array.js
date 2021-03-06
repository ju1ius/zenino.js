ju1ius.namespace('Zenino', function()
{

function cloneOf(item)
{
  if (item instanceof Array) {
    return zArray.clone(item);
  } else if (typeof item === 'object') {
    return Zenino.Object.clone(item);
  }
  return item;
}


var zArray = {

  clone: function(original)
  {
    var l = original.length,
        clone = new Array(l);
    while (l--) clone[l] = cloneOf(original[l]);
    return clone;
  },
  shallowClone: function(original)
  {
    return original.slice(0);
  },
  cycle: function(input, callback, bind)
  {
    callback = bind ? callback.bind(bind) : callback;
    var len = input.length,
        i = 0,
        count = 0,
        cond = true;
    while(cond){
        i = count % len;
        count++;
        cond = callback(input[i], i, Math.floor(count/len), count, input);
    }
  },
  /**
   * Rotates the array elements to the left or right and returns the own array.
   *
   * vector array to be rotated
   * rotateBy specifies how many positions the array should be rotated by.
   *          negative values rotate to the left and positive ones to the right
   **/
  rotate: function(input, rotation)
  {
    var a = zArray.clone(input),
        p = -rotation,
        l = a.length,
        i, x,
    p = (Math.abs(p) >= l && (p %= l), p < 0 && (p += l), p);
    for(; p; p = (Math.ceil(l / p) - 1) * p - l + (l = p)) {
      for(i = l; i > p; x = a[--i], a[i] = a[i - p], a[i - p] = x);      
    }
    return a;
    //return a.slice(p).concat(a.slice(0,p));
  },

  pad: function(a, pad_size, pad_value)
  {
    var tail_length = Math.abs(pad_size) - a.length;
    a = zArray.clone(a);
    if(tail_length <= 0) { 
      return a;
    }
    var tail = [], subtail = [pad_value]; 
    while(tail_length > 0) { 
      if(tail_length % 2) { 
        tail = tail.concat(subtail); 
      } 
      subtail = subtail.concat(subtail); 
      tail_length >>= 1; 
    }
    return pad_size < 0 ? tail.concat(a) : a.concat(tail); 
  }
  /**
   * Even quicker function is possible!
   *
  pad: function(a, pad_size, pad_value) {
    var tail_length = Math.abs(pad_size) - a.length;
    a = Zenino.Array.clone(a);
    if(tail_length <= 0) {
      return a;
    }
    var tail = [];
    var subtail = [pad_value];
    for( ; ; ) {
      if(tail_length % 2) {
        tail = tail.concat(subtail);
      }
      if(tail_length >>= 1) {
        subtail = subtail.concat(subtail);
      } else {
        break;
      }
    }
    return pad_size < 0 ? tail.concat(a) : a.concat(tail);
  }
  */

};

/*
Array.prototype.rotate = function(p) {
  p = -p;
  for(var l = this.length, p = (Math.abs(p) >= l && (p %= l), p < 0 && (p += l), p), i, x; p; p = (Math.ceil(l / p) - 1) * p - l + (l = p))
    for(i = l; i > p; x = this[--i], this[i] = this[i - p], this[i - p] = x);
  return this;
}
*/

return {
  Array: zArray
};

});
