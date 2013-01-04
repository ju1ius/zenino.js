
function getPermutation(n, base, divisors)
{
  var result = [],
      curArray,
      i, l;
  for (i = 0, l = base.length; i < l; i++) {
    curArray = base[i];
    result.push(curArray[Math.floor(n / divisors[i]) % curArray.length]);
  }
  return result;
}


function getPermutations(perm_base)
{
  var numPerms, divisors, i, perms;
  numPerms = perm_base.reduce(function(prev, next)
  {
    return prev * next.length;
  }, 1);

  // Pre-calculate divisors
  divisors = [];
  for (i = perm_base.length - 1; i >= 0; i--) {
    divisors[i] = divisors[i + 1] ? divisors[i + 1] * perm_base[i + 1].length : 1;
  }

  perms = [];
  for (i = 0; i < numPerms; i++) {
    perms.push(getPermutation(i, perm_base, divisors));
  }
  return perms;
}

function unique(arr)
{
  var output = [],
      i = 0, l = arr.length,
      item;
  for (; i < l; i++) {
    item = arr[i];
    if (-1 === output.indexOf(item)) {
      output.push(item);
    }
  }
  return output;
}

function isValidScale(scale)
{
  var semitones = scale.map(Zenino.Intervals.shorthandToSemitones),
      unique_intervals = unique(semitones);
  if (unique_intervals.length === 7) {
    for (var i = 0; i < 7; i++) {
      if (i > 0) {
        var prev = unique_intervals[i-1],
            intv = unique_intervals[i];
        if (intv <= prev || intv === 12) {
          return false
        }
      }
    }
    return true;
  }
  return false;
}

function getValidScales()
{
  var possible_intervals = [
    ['1'],
    ['2','b2','#2','##2'],
    ['3','b3','bb3','#3','##3'],
    ['4','#4','b4','bb4','##4'],
    ['5','b5','#5','bb5','##5'],
    ['6','b6','bb6','#6'],
    ['7','b7','bb7']
  ],
  possible_scales = getPermutations(possible_intervals),
  valid_scales = possible_scales.filter(isValidScale);
  return valid_scales;
}

function array_compare(a, b)
{
  var i = a.length,
      j = b.length;
  if (i !== j) return false;
  while (i--) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function isRotationOf(first, other)
{
  var o_len = other.length;
  while(o_len--) {
    if (array_compare(first, Zenino.Array.rotate(other, o_len))) return true;  
  }
  return false;
}

function intervalsToSemitones(intervals)
{
  var semitones_sequence = [],
      previous = 12, current, i;
  // then go through the semitones backward starting from 12 (octave)
  // and get the difference between previous and current
  for (i = intervals.length - 1; i >= 0; i--) {
    current = intervals[i];
    semitones_sequence[i] = previous - current;
    previous = current;
  }
  return semitones_sequence;
}

function countAlterations(uid)
{
  var count = 0, i, l;
  for (i = 0, l = uid.length; i < l; i++) {
    if (uid[i] === '#' || uid[i] === 'b') count++;
  }
  return count;
}
function countSemitones(semitones)
{
  var count = 0, i, l;
  for (i = 0, l = semitones.length; i < l; i++) {
    if (1 === semitones[i]) count++;
  }
  return count;
}

function getParent(mode_infos, parents)
{
  var i, l, parent;
  for (i = 0, l = parents.length; i < l; i++) {
    parent = parents[i];
    if (isRotationOf(mode_infos.semitones, parent.semitones)) {
      return parent;
    }
  }
  return false;
}

function getModeInfos(scale)
{
  var intervals_from_root = scale.map(Zenino.Intervals.shorthandToSemitones),
      semitones_sequence = intervalsToSemitones(intervals_from_root),
      num_semitones = countSemitones(semitones_sequence),
      uid = scale.join(''),
      alteration_count = countAlterations(uid),
      zmode = Zenino.Core.MODES_BY_UID[uid],
      name = zmode ? zmode.name : '';
  
  return {
    name: name,
    intervals: scales,
    absolute_intervals: intervals_from_root,
    semitones: semitones_sequence,
    num_semitones: num_semitones,
    alteration_count: alteration_count,
    uid: uid,
    children: []
  };
}

function getAllParents()
{
  var modes = getValidScales(),
      parents = [],
      i, l, mode,
      mode_infos, parent;
  for (i = 0, l = modes.length; i < l; i++) {
    mode = modes[i];
    mode_infos = getModeInfos(mode);
    parent = getParent(mode_infos, parents);
    if (parent) {
      parent.children.push(mode_infos);
    } else {
      parents.push(mode_infos);
    }
  }
  /**
   * Now we should correct parent/child relationships based on either:
   * * Zenino.Core.MODES information
   * * an algorithmically defined solution like alteration count, brilliance, etc
   **/
  return parents;
}
