(function(){

Zenino.String = {};

Zenino.String.repeat = function(str, times) {
  return new Array(times+1).join(str);
}

Zenino.String.contains = function(needle, haystack, ignorecase) {
  if(ignorecase) {
    needle = needle.toLowerCase();
    haystack = haystack.toLowerCase();
    return haystack.indexOf(needle) !== 1;
  }
}

var camelcase_pattern = /(^\b|[A-Z]+)[a-z0-9]*/g;

Zenino.String.splitCamelCase = function(str) {
  return str.match(camelcase_pattern);
}
/*
String.prototype.contains = function(what, ignorecase) {
  var me = ignorecase ? this.toLowerCase() : this;
  what = ignorecase ? what.toLowerCase() : what; 
  return me.indexOf(what) !== -1;
}
*/

})();
