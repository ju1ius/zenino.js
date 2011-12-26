(function(){

Zenino.Array = {};

/**
 * Rotates the array elements to the left or right and returns the own array.
 *
 * vector array to be rotated
 * rotateBy specifies how many positions the array should be rotated by.
 *          negative values rotate to the left and positive ones to the right
 **/
Zenino.Array.rotate = function(a, p) {
  return a.slice(p).concat(a.slice(0,p));
};

/*
Array.prototype.rotate = function(p) {
  p = -p;
  for(var l = this.length, p = (Math.abs(p) >= l && (p %= l), p < 0 && (p += l), p), i, x; p; p = (Math.ceil(l / p) - 1) * p - l + (l = p))
    for(i = l; i > p; x = this[--i], this[i] = this[i - p], this[i - p] = x);
  return this;
}
*/

})();
