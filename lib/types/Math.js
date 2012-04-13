ju1ius.namespace('Zenino', function()
{

var zMath = {

  /**
   * Fixes javascript negative numbers modulus
   *
   * -1 % 12 returns -1
   * Zenino.Math.mod(-1, 12) returns 11
   *
   * @returns int
   **/
  mod: function(a, b)
  {
    return a < 0 ? ((a % b) + b) % b : a % b;
  }

};


return {
  Math: zMath
};

})();
