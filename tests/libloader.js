(function(global){

var loadScript = (global.postMessage && global.importScripts)
  ? global.importScripts
  : function(path)
  {
    document.write('<script src="'+path+'" ></script>');
  };

function loadPackage (pkg, path) {
  var scripts = pkg.scripts,
      subpackages = pkg.packages;
  if (!scripts) return;
  scripts.forEach(function(script){
    loadScript(path + '/' + script + '.js');
  });
  if (!subpackages) return;
  for (var sub in subpackages) {
    loadPackage(subpackages[sub], path + '/' + sub);
  }
}

var LIB = {
  scripts: ['core/Core'],
  packages: {
    types: {
      scripts: ['Object', 'Class', 'Function', 'Array', 'String', 'Math']
    },
    core: {
      scripts: ['Error', 'Notes', 'Keys', 'Intervals', 'Scales', 'Chords']
    },
  }
};

function loadLib(base_path)
{
  loadPackage(LIB, base_path);
}

global.loadZenino = loadLib;

}(this));
