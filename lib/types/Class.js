ju1ius.namespace('Zenino', function()
{

var Class = {
  extend: function(parent, child, methods)
  {
    for (var key in parent) {
      if (Object.prototype.hasOwnProperty.call(parent, key)) {
        child[key] = parent[key];
      }
    }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  }
};

return {
  Class: Class
};
  
});
