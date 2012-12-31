ju1ius.namespace('Zenino', function() {

/**
 * This implementation uses Zenino.Core.MODES data to generate the
 * scale methods, via the Function constructor
 **/
var SPLIT_UID_RX = /[#b]*[1-7]/g,
    MODES_INFOS = {};

var parent_modes = (function(){
  var results = {}, name, mode_infos;
  for (name in Zenino.Core.MODES) {
    mode_infos = Zenino.Core.MODES[name];
    if (!mode_infos.parent || mode_infos.parent === name) {
      results[name] = mode_infos;
    }
  }
  return results;
}());

function isParentMode(mode_infos)
{
  return !mode_infos.parent || mode_infos.parent === mode_infos.name;
}
function splitModeUid(uid)
{
  return uid.match(SPLIT_UID_RX);
}

// var intervals = {
//   2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth',
//   6: 'Sixth', 7: 'Seventh'
// };

var INTERVALS = {
  2: ['Second','Seventh'],
  3: ['Third','Sixth'],
  4: ['Fourth','Fifth'],
  5: ['Fifth','Fourth'],
  6: ['Sixth','Third'],
  7: ['Seventh','Second']
};
/**
 * Converts an interval shorthand into a method name for use with Zenino.intervals,
 * intervalShorthandToMethod('bb7') => diminishedSeventh
 * intervalShorthandToMethod('bb7', true) => augmentedSecond
 **/
function intervalShorthandToMethod(interval, down)
{
  var parts = /([#b]*)([1-7])/.exec(interval),
      alts = parts[1],
      base_interval = parts[2],
      quality;
  switch (base_interval) {
    case '2':
    case '3':
    case '6':
    case '7':
      if ('' === alts) quality = down ? 'minor' : 'major';
      else if ('b' === alts) quality = down ? 'major' : 'minor';
      else if ('bb' === alts) quality = down ? 'augmented' : 'diminished';
      else if ('#' === alts) quality = down ? 'diminished' : 'augmented';
      break;
    case '4':
    case '5':
      if ('' === alts) quality = 'perfect';
      else if ('b' === alts) quality = down ? 'augmented' : 'diminished';
      else if ('#' === alts) quality = down ? 'diminished' : 'augmented';
      break;
  }
  // console.log(interval, quality + INTERVALS[base_interval][(down ? 1 : 0)])
  return quality + INTERVALS[base_interval][(down ? 1 : 0)];
}
/*
function makeParentModeMethod(mode_infos)
{
  var intervals = splitModeUid(mode_infos.uid),
      notes_tpl = ['note'],
      intervalMethod,
      i, l;
  for (i = 1, l = intervals.length; i < l; i++) {
    intervalMethod = intervalShorthandToMethod(intervals[i]);
    // notes_tpl.push('Zenino.Intervals.fromShortHand(note,"'+intervals[i]+'")');
    notes_tpl.push('Zenino.Intervals.'+intervalMethod+'(note)');
  }
  return Zenino.Function.cached(
    new Function('note', 'return ['+notes_tpl.join(',')+'];'),
    Zenino.Array.shallowClone
  );
}*/
function makeParentModeMethod(mode_infos)
{
  var intervals = splitModeUid(mode_infos.uid),
      methods = [], num_methods,
      i, l;
  for (i = 1, l = intervals.length; i < l; i++) {
    methods.push(intervalShorthandToMethod(intervals[i]));
  }
  num_methods = methods.length;
  var fn = function(note)
  {
    var notes = [note], i;
    for (i = 0; i < num_methods; i++) {
      notes.push(Zenino.Intervals[methods[i]](note));
    }
    return notes;
  };
  return fn;
  return Zenino.Function.cached(fn, Zenino.Array.shallowClone);
}
/*
var childModeTemplate = Zenino.String.template(
  'var rel = Zenino.ScalesAlt.<#=parent#>(Zenino.Intervals.<#=interval#>(note));' +
  //'Zenino.Intervals.fromShortHand(note,"<#=interval#>", true)' +
  'return Zenino.Array.rotate(rel, <#=degree#>);'
);
function makeChildModeMethod(parent, degree, interval)
{
  var method = intervalShorthandToMethod(interval, true),
      body = childModeTemplate({
        parent: parent,
        degree: degree,
        interval: method
      });
  return Zenino.Function.cached(
    new Function('note', body),
    Zenino.Array.shallowClone
  );
}
*/
function makeChildModeMethod(parent, degree, interval)
{
  var method = intervalShorthandToMethod(interval, true);
  var fn = function(note) {
    var rel = ScalesAlt[parent](Zenino.Intervals[method](note));
    return Zenino.Array.rotate(rel, degree);
  };
  // return fn;
  return Zenino.Function.cached(fn, Zenino.Array.shallowClone);
}

function makeModesMethods(context)
{
  var name, parent_name, child_name,
      mode_infos,
      intervals;
  for (name in Zenino.Core.MODES) {
    mode_infos = Zenino.Core.MODES[name];
    if (isParentMode(mode_infos)) {
      // If it's a parent mode, get is interval fingerprint,
      intervals = splitModeUid(mode_infos.uid);
      // and generate the corresponding method
      context[name] = makeParentModeMethod(mode_infos);
      // now generate the rotations of the parent mode
      // each mode is named after it's parent name and it's own degree
      // i.e ionian_3 for phrygian, melodicMinor_5 for lydianB7, etc...
      for (var i = 1, l = intervals.length; i < l; i++) {
        child_name = name + '_' + (i + 1);
        context[child_name] = makeChildModeMethod(name, i, intervals[i]);
      }
    }
  }
}
function makeAliases(context)
{
  var name, mode_infos;
  for (name in Zenino.Core.MODES) {
    mode_infos = Zenino.Core.MODES[name];
    if (mode_infos.aliases) {
      mode_infos.aliases.forEach(function(alias){
        context[alias] = context[name];
      });
    }
  }
}

function addModeInfos(mode_infos)
{
  MODES_INFOS[mode_infos.name] = mode_infos;
  if(mode_infos.aliases) {
    mode_infos.aliases.forEach(function(alias){
      MODES_INFOS[alias] = mode_infos;
      ScalesAlt[alias] = ScalesAlt[mode_infos.name];
    });    
  }
  // add also to MODES_BY_UID, MODES_NAMES, etc...
}
function addChildModeInfos(mode_infos, parent_infos)
{
  var notes = ScalesAlt[mode_infos.name]('C'),
      root = notes[0],
      uid = '';
  notes.forEach(function(note){
    uid += Zenino.Intervals.determine(root, note);
  });
  mode_infos.parent = parent_infos.name;
  mode_infos.uid = uid;
  mode_infos.semitones = uidToSemitones(uid);
  addModeInfos(mode_infos);
}

function uidToSemitones(uid)
{
  var interval_shorthands = splitModeUid(uid),
      // first convert intervals shorthands to semitones from the root
      // '12b3456b7' => [0,2,3,5,7,9,10]
      interval_semitones = interval_shorthands.map(Zenino.Intervals.shorthandToSemitones),
      semitones_sequence = [],
      previous = 12, current, i;
  // then go through the semitones backward starting from 12 (octave)
  // and get the difference between previous and current
  for (i = interval_semitones.length - 1; i >= 0; i--) {
    current = interval_semitones[i];
    semitones_sequence[i] = previous - current;
    previous = current;
  }
  return semitones_sequence;
}

function semitonesToUid(semitones)
{
    
}

function addMode(mode_infos)
{
  if (!mode_infos.name || !mode_infos.uid || !mode_infos.degree) {
    throw new Error("Mode object must have uid, name and degree properties");
  }
  var name = mode_infos.name,
      intervals, child_name;
  if (isParentMode(mode_infos)) {
    // If it's a parent mode, get is interval fingerprint,
    intervals = splitModeUid(mode_infos.uid);
    mode_infos.semitones = uidToSemitones(mode_infos.uid);
    // and generate the corresponding method
    ScalesAlt[name] = makeParentModeMethod(mode_infos);
    addModeInfos(mode_infos);
    // now generate the rotations of the parent mode
    // each mode is named after it's parent name and it's own degree
    // i.e ionian_3 for phrygian, melodicMinor_5 for lydianB7, etc...
    for (var i = 1, l = intervals.length; i < l; i++) {
      child_name = name + '_' + (i + 1);
      ScalesAlt[child_name] = makeChildModeMethod(name, i, intervals[i]);
      addChildModeInfos({name: child_name, degree: i+1}, mode_infos);
    }
  } else {
    var parent_infos = MODES_INFOS[mode_infos.parent];
    if (!parent_infos) {
      throw new Error("Parent mode: "+mode_infos.parent+" does not exist.");
    }
    addChildModeInfos(mode_infos, parent_infos);
  }
}

var MODES_BY_UID = (function()
{
  var name, mode_infos, result = {};
  for (name in Zenino.Core.MODES) {
    mode_infos = Zenino.Core.MODES[name];
    result[mode_infos.uid] = mode_infos;
  }
  return result;
}());

var ScalesAlt = {
  /**
   * Determines the kind of scale.
   * does not deal with enharmonics on exotic modes
   * for example: #2 <> b3 , etc
   **/
  determine: function(scale)
  {
    var tonic = scale.shift(),
        fingerprint = '1',
        i, l, degree, mode_infos;
    for(i =0, l = scale.length; i < l; i++) {
      degree = scale[i];
      fingerprint += Zenino.Intervals.determine(tonic, degree);
    }
    mode_infos = MODES_BY_UID[fingerprint];
    if (mode_infos !== undefined) {
      return Zenino.Object.merge({tonic: tonic}, mode_infos);
    }
    return {};
  },
  uidToSemitones: uidToSemitones
};
//makeModesMethods(ScalesAlt);
//makeAliases(ScalesAlt);

for (var name in Zenino.Core.MODES) {
  var infos = Zenino.Core.MODES[name];
  infos.name = name;
  addMode(infos);
}

return {
  MODES_INFOS: MODES_INFOS,
  ScalesAlt: ScalesAlt
};

});