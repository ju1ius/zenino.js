(function(){

Zenino.Math = {};

/**
 * Fixes javascript negative numbers modulus
 *
 * -1 % 12 returns -1
 * Zenino.Math.mod(-1, 12) returns 11
 *
 * @returns int
 **/
Zenino.Math.mod = function(a, b)
{
  return a < 0 ? ((a % b) + b) % b : a % b;
}

})();