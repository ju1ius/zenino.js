ju1ius.namespace('Zenino', function()
{

var camelcase_re = /(^\b|[A-Z]+)[a-z0-9]*/g,
    islower_re = /^[a-z]+$/,
    isupper_re = /^[A-Z]+$/;



var zString = {

  repeat: function(str, times)
  {
    return new Array(times+1).join(str);
  },

  contains: function(needle, haystack, ignorecase)
  {
    if(ignorecase) {
      needle = needle.toLowerCase();
      haystack = haystack.toLowerCase();
    }
    return haystack.indexOf(needle) !== 1;
  },

  splitCamelCase: function(str)
  {
    return str.match(camelcase_re);
  },

  islower: function(str)
  {
    return islower_re.test(str);
  },

  isupper: function(str)
  {
    return isupper_re.test(str);
  },

  template: function(tpl)
  {
    var b = "var p=[];"
          + "p.push('"
          + tpl.replace(/[\r\t\n]/g," ").replace(/'(?=[^#]*#>)/g,"\t")
              .split("'").join("\\'").split("\t").join("'")
              .replace(/<#=(.+?)#>/g,"',data['$1'],'").split("<#")
              .join("');").split("#>").join("p.push('")
          + "');return p.join('');";
    return new Function("data", b);
  }

};

// only run when the substr function is broken
if ('ab'.substr(-1) !== 'b') {  
  /** 
   *  Get the substring of a string 
   *  @param  {integer}  start   where to start the substring 
   *  @param  {integer}  length  how many characters to return 
   *  @return {string} 
   */  
  String.prototype.substr = (function(substr)
  {  
    return function(start, length)
    {  
      // did we get a negative start, calculate how much it is from the beginning of the string  
      if (start < 0) {
        start = this.length + start;
      } 
      // call the original function  
      return substr.call(this, start, length);  
    };
  }(String.prototype.substr));

}  

return {
  String: zString
}

});
