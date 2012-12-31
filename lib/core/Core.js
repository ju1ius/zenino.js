ju1ius = {};

(function(global_scope){

ju1ius.namespace = function(path, publics)
{
	var parts = path.split('.'),
      ns = global_scope,
      i, l, current,
      member;
	for(i = 0, l = parts.length; i < l; i++) {
		current = parts[i];
		ns[current] = ns[current] || {};
		ns = ns[current];
	}
	if(typeof publics === 'function') {
		publics = publics(ns);
	}
	for(member in publics) {
		ns[member] = publics[member];
	}
};

})(this);


ju1ius.namespace('Zenino', function()
{

var Core = {

  DIATONICS:    ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  FIFTHS:       ['F', 'C', 'G', 'D', 'A', 'E', 'B'],
  SHARP_ORDER:  ['F#','C#','G#','D#','A#','E#','B#'],
  FLAT_ORDER:   ['Bb','Eb','Ab','Db','Gb','Cb','Fb'],
  NOTES: {
    C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11
  },
  CHROMATICS: [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ],
  CHROMATICS_SHARP: [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ],
  CHROMATICS_FLAT: [
    'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
  ],

  MODES: {
    // ====================================== MAJOR MODES =======================================
    ionian: {
      parent: 'ionian',
      uid: '1234567',
      degree: 1,
      chords: [
        'Maj13',
        'min13',
        'min11/b9/b13',
        'Maj9/#11/13',
        '13',
        'min11/b13',
        'min7b5/b9/11/b13'
      ],
      cadential_notes: [3, 7],
      cadential_chords: [5],
      aliases: ['ionian', 'major']
    },
    ionian_2: {
      parent: 'ionian',
      uid: '12b3456b7',
      degree: 2,
      cadential_notes: [6],
      cadential_chords: [2, 4, 7],
      aliases: ['dorian']
    },
    ionian_3: {
      parent: 'ionian',
      uid: '1b2b345b6b7',
      degree: 3,
      cadential_notes: [2],
      cadential_chords: [2, 3, 7],
      aliases: ['phrygian']
    },
    ionian_4: {
      parent: 'ionian',
      uid: '123#4567',
      degree: 4,
      cadential_notes: [4],
      cadential_chords: [2, 5, 7],
      aliases: ['lydian']
    },
    ionian_5: {
      parent: 'ionian',
      uid: '123456b7',
      degree: 5,
      cadential_notes: [7],
      cadential_chords: [5, 7],
      aliases: ['mixolydian']
    },
    ionian_6: {
      parent: 'ionian',
      uid: '12b345b6b7',
      degree: 6,
      cadential_notes: [6],
      cadential_chords: [4, 6, 7],
      aliases: ['aeolian', 'naturalMinor']
    },
    ionian_7: {
      parent: 'ionian',
      uid: '1b2b34b5b6b7',
      degree: 7,
      cadential_notes: [2, 5],
      cadential_chords: [2, 3, 5, 7],
      aliases: ['locrian']
    },
     // =============================== MELODIC MINOR MODES ================================
    melodicMinor: {
      parent: 'melodicMinor',
      uid: '12b34567',
      degree: 1,
      chords: [
        'minMaj7/9/11/13',
        'min13/b9',
        'Maj7#5/9/#11/13',
        '13/#11',
        '9/b13',
        'min7b5/9/11/b13',
        '7#5/#9/b13'
      ],
      cadential_notes: [3, 7],
      cadential_chords: [5, 7],
      aliases: ['melodicMinor']
    },
    melodicMinor_2: {
      parent: 'melodicMinor',
      uid: '1b2b3456b7',
      degree: 2,
      cadential_notes: [2, 6],
      cadential_chords: [2, 7],
      aliases: ['phrygianN6', 'dorianB2']
    },
    melodicMinor_3: {
      parent: 'melodicMinor',
      uid: '123#4#567',
      degree: 3,
      cadential_notes: [4, 5],
      cadential_chords: [2, 7],
      aliases: ['lydianX5']
    },
    melodicMinor_4: {
      parent: 'melodicMinor',
      uid: '123#456b7',
      degree: 4,
      cadential_notes: [4, 7],
      cadential_chords: [2, 5, 7],
      aliases: ['lydianB7', 'bartok']
    },
    melodicMinor_5: {
      parent: 'melodicMinor',
      uid: '12345b6b7',
      degree: 5,
      cadential_notes: [6, 7],
      cadential_chords: [4, 6, 7],
      aliases: ['mixolydianB6']
    },
    melodicMinor_6: {
      parent: 'melodicMinor',
      uid: '12b34b5b6b7',
      degree: 6,
      cadential_notes: [2, 5],
      cadential_chords: [3, 5, 7],
      aliases: ['locrianN2']
    },
    melodicMinor_7: {
      parent: 'melodicMinor',
      uid: '1b2b3b4b5b6b7',
      degree: 7,
      cadential_notes: [2, 4, 5],
      cadential_chords: [2, 5],
      aliases: ['superLocrian', 'altered', 'diminishedWholeTone']
    },
    // ============================== HARMONIC MINOR MODES ===============================
    harmonicMinor: {
      parent: 'harmonicMinor',
      uid: '12b345b67',
      degree: 1,
      chords: [
        'minMaj7/9/11/b13',
        'min7b5/b9/11/b13',
        'Maj7#5/9/13',
        'min13/#11',
        '7/b9/b13',
        'Maj13/#9/#11',
        'dim7',
      ],
      cadential_notes: [3, 6, 7],
      cadential_chords: [5, 7]
    },
    harmonicMinor_2: {
      parent: 'harmonicMinor',
      uid: '1b2b34b56b7',
      degree: 2,
      cadential_notes: [2, 5, 6],
      cadential_chords: [2, 5, 7],
      aliases: ['locrianN6']
    },
    harmonicMinor_3: {
      parent: 'harmonicMinor',
      uid: '1234#567',
      degree: 3,
      cadential_notes: [5],
      cadential_chords: [1],
      aliases: ['ionianX5']
    },
    harmonicMinor_4: {
      parent: 'harmonicMinor',
      uid: '12b3#456b7',
      degree: 4,
      cadential_notes: [4, 6],
      cadential_chords: [2, 7],
      aliases: ['dorianX4']
    },
    harmonicMinor_5: {
      parent: 'harmonicMinor',
      uid: '1b2345b6b7',
      degree: 5,
      cadential_notes: [2, 3],
      cadential_chords: [2, 7],
      aliases: ['phrygianMajor']
    },
    harmonicMinor_6: {
      parent: 'harmonicMinor',
      uid: '1#23#4567',
      degree: 6,
      cadential_notes: [2, 4],
      cadential_chords: [5, 7],
      aliases: ['lydianX2']
    },
    harmonicMinor_7: {
      parent: 'harmonicMinor',
      uid: '1b2b3b4b5b6bb7',
      degree: 7,
      cadential_notes: [2, 4, 5, 7],
      cadential_chords: [5],
      aliases: ['superLocrianBB7']
    },
    // ============================= HARMONIC MAJOR MODES ================================
    harmonicMajor: {
      parent: 'harmonicMajor',
      uid: '12345b67',
      degree: 1,
      chords: [						
        'Maj9/b13',
        'min7b5/9/11/13',
        'min7/b9/b13',
        'minMaj7/9/#11/13',
        '13/b9',
        'Maj7#5/#9/#11/13',
        'dim7/b9/11/b13',
      ],
      cadential_notes: [3, 6, 7],
      cadential_chords: [5, 7],
      aliases: ['harmonicMajor']
    },
    harmonicMajor_2: {
      parent: 'harmonicMajor',
      uid: '12b34b56b7',
      degree: 2,
      cadential_notes: [2, 5, 6],
      cadential_chords: [2, 7],
      aliases: ['dorianB5', 'locrianN2N6']
    },
    harmonicMajor_3: {
      parent: 'harmonicMajor',
      uid: '1b2b3b45b6b7',
      degree: 3,
      cadential_notes: [4, 5],
      cadential_chords: [2, 4, 6],
      aliases: ['superLocrianN5']
    },
    harmonicMajor_4: {
      parent: 'harmonicMajor',
      uid: '12b3#4567',
      degree: 4,
      cadential_notes: [3, 4],
      cadential_chords: [2, 5, 7],
      aliases: ['melodicMinorX4']
    },
    harmonicMajor_5: {
      parent: 'harmonicMajor',
      uid: '1b23456b7',
      degree: 5,
      cadential_notes: [2, 7],
      cadential_chords: [2, 7],
      aliases: ['mixolydianB2']
    },
    harmonicMajor_6: {
      parent: 'harmonicMajor',
      uid: '1#23#4#567',
      degree: 6,
      cadential_notes: [2, 5, 4],
      cadential_chords: [5],
      aliases: ['lydianX5X2', 'lydianX2X5']
    },
    harmonicMajor_7: {
      parent: 'harmonicMajor',
      uid: '1b2b34b5b6bb7',
      degree: 7,
      cadential_notes: [5, 7],
      cadential_chords: [5],
      aliases: ['locrianBB7']
    },
    // ============================= DOUBLE HARMONIC MODES =============================
    doubleHarmonic: {
      parent: 'doubleHarmonic',
      uid: '1b2345b67',
      degree: 1,
      chords: [						
        'Maj7/b13',
        'Maj7/#9/#11',
        'min6',
        'minMaj7/9/#11/b13',
        '7b5/b9/13',
        'Maj7#5/#9/13',
        'NC'
      ],
      cadential_notes: [2, 3, 7],
      cadential_chords: [2],
      aliases: ['doubleHarmonic', 'phrygianMajorN7', 'harmonicMajorB2']
    },
    doubleHarmonic_2: {
      parent: 'doubleHarmonic',
      uid: '1#23#45#67',
      degree: 2,
      cadential_notes: [2, 4, 6],
      cadential_chords: [2, 7],
      aliases: ['lydianX2X6']
    },
    doubleHarmonic_3: {
      parent: 'doubleHarmonic',
      uid: '1b2b3b45b6bb7',
      degree: 3,
      cadential_notes: [4, 5, 7],
      cadential_chords: [3, 6, 7],
      aliases: ['superLocrianN5BB7']
    },
    doubleHarmonic_4: {
      parent: 'doubleHarmonic',
      uid: '12b3#45b67',
      degree: 4,
      cadential_notes: [4, 6],
      cadential_chords: [7],
      aliases: ['hungarianMinor']
    },
    doubleHarmonic_5: {
      parent: 'doubleHarmonic',
      uid: '1b234b567',
      degree: 5,
      cadential_notes: [3, 5],
      cadential_chords: [6],
      aliases: ['oriental']
    },
    doubleHarmonic_6: {
      parent: 'doubleHarmonic',
      uid: '1#234#567',
      degree: 6,
      cadential_notes: [2, 5],
      cadential_chords: [3, 5, 7],
      aliases: ['ionianX2X5']
    },
    doubleHarmonic_7: {
      parent: 'doubleHarmonic',
      uid: '1b2bb34b5b6bb7',
      degree: 7,
      cadential_notes: [3, 5, 7],
      cadential_chords: [3, 5],
      aliases: ['locrianBB3BB7']
    },
    // =============================== IONIAN #2 MODES ===================================
    ionianX2: {
      parent: 'ionianX2',
      uid: '1#234567',
      degree: 1,
      aliases: ['ionianX2']
    },
    ionianX2_2: {
      parent: 'ionianX2',
      uid: '1b2bb3b4b5b6bb7',
      degree: 2,
      aliases: ['superLocrianBB3BB7']
    },
    ionianX2_3: {
      parent: 'ionianX2',
      uid: '1b2b345b67',
      degree: 3,
      aliases: ['phrygianN7']
    },
    ionianX2_4: {
      parent: 'ionianX2',
      uid: '123#45#67',
      degree: 4,
      aliases: ['lydianX6']
    },
    ionianX2_5: {
      parent: 'ionianX2',
      uid: '1234#56b7',
      degree: 5,
      aliases: ['mixolydianX5']
    },
    ionianX2_6: {
      parent: 'ionianX2',
      uid: '12b3#45b6b7',
      degree: 6,
      aliases: ['aeolianX4']
    },
    ionianX2_7: {
      parent: 'ionianX2',
      uid: '1b234b5b6b7',
      degree: 7,
      aliases: ['locrianMajor']
    },
    // ============================= MELODIC MINOR #5 MODES ==============================
    melodicMinorX5: {
      parent: 'melodicMinorX5',
      uid: '12b34#567',
      degree: 1,
      aliases: ['melodicMinorX5']
    },
    melodicMinorX5_2: {
      parent: 'melodicMinorX5',
      uid: '1b2b3#456b7',
      degree: 2,
      aliases: ['phrygianN6X4']
    },
    melodicMinorX5_3: {
      parent: 'melodicMinorX5',
      uid: '12#3#4#567',
      degree: 3,
      aliases: ['lydianX5X3', 'lydianX3X5']
    },
    melodicMinorX5_4: {
      parent: 'melodicMinorX5',
      uid: '1#23#456b7',
      degree: 4,
      aliases: ['lydianB7X2', 'lydianX2B7']
    },
    melodicMinorX5_5: {
      parent: 'melodicMinorX5',
      uid: '1b2b3b4b5bb6bb7',
      degree: 5,
      aliases: ['superLocrianBB6BB7', 'superLocrianBB7BB6']
    },
    melodicMinorX5_6: {
      parent: 'melodicMinorX5',
      uid: '12b34b5b67',
      degree: 6,
      aliases: ['locrianN2N7', 'locrianN7N2']
    },
    melodicMinorX5_7: {
      parent: 'melodicMinorX5',
      uid: '1b2b3b4b56b7',
      degree: 7,
      aliases: ['superLocrianN6']
    },
    // ================================== ARABIAN MODES ====================================
    arabian: {
      parent: 'arabian',
      uid: '1234b5b6b7',
      degree: 1,
      aliases: ['arabian', 'mixolydianB5B6', 'mixolydianB6B5']
    },
    arabian_2: {
      parent: 'arabian',
      uid: '12b3b4b5b6b7',
      degree: 2,
      aliases: ['superLocrianN2']
    },
    arabian_3: {
      parent: 'arabian',
      uid: '1b2bb3b4b5b6b7',
      degree: 3,
      aliases: ['superLocrianBB3']
    },
    arabian_4: {
      parent: 'arabian',
      uid: '1b2b34567',
      degree: 4,
      aliases: ['phrygianN6N7', 'phrygianN7N6']
    },
    arabian_5: {
      parent: 'arabian',
      uid: '1#234#5#67',
      degree: 5,
      aliases: ['ionianX2X5X6']
    },
    arabian_6: {
      parent: 'arabian',
      uid: '123#4#56b7',
      degree: 6,
      aliases: ['lydianB7X5', 'lydianX5B7']
    },
    arabian_7: {
      parent: 'arabian',
      uid: '123#45b6b7',
      degree: 7,
      aliases: ['lydianB7B6', 'lydianB6B7']
    },
    // ================================= PERSIAN MODES ==================================
    persian: {
      parent: 'persian',
      uid: '1b234b5b67',
      degree: 1,
      aliases: ['persian', 'locrianMajorN7', 'locrianN7N3', 'locrianN3N7']
    },
    persian_2: {
      parent: 'persian',
      uid: '1#2345#67',
      degree: 2,
      aliases: ['ionianX2X6', 'ionianX6X2']
    },
    persian_4: {
      parent: 'persian',
      uid: '1b2b3#45b67',
      degree: 4,
      aliases: ['phrygianX4N7', 'phrygianN7X4']
    },
    // ============================== NON HEPTATONIC MODES ================================
    augmented: {
      parent: 'augmented',
      uid: '1#235b67',
      degree: 1,
      aliases: ['augmented']
    },
    augmented_2: {
      parent: 'augmented_2',
      uid: '1b234#56',
      degree: 2,
      aliases: ['augmented_2']
    },
    diminished: {
      parent: 'diminished',
      uid: '12b34b5b6bb77',
      degree: 1,
      aliases: ['diminished']
    },
    diminished_2: {
      parent: 'diminished_2',
      uid: '1b2#23#456b7',
      degree: 2,
      aliases: ['diminished_2', 'bertha']
    },
    wholeTone: {
      parent: 'wholeTone',
      uid: '123#4#5b7',
      degree: 1,
      aliases: ['wholeTone']
    }
  }
};


var mode_names = [],
    name, mode, uid,
    brilliance,
    i, l, chr;

for(name in Core.MODES) {
  mode_names.push(name);
  mode = Core.MODES[name];
  mode.name = name;
  uid = mode.uid;
  // compute brilliance
  brilliance = 0;
  for (i = 0, l = uid.length; i < l; i++) {
    chr = uid[i];
    if ('#' === chr) {
      brilliance++;
    } else if ('b' === chr) {
      brilliance--;
    }
  }
  mode.brilliance = brilliance;
}

Core.MODE_NAMES = mode_names;
Core.MODE_NAMES_BY_BRILLIANCE = (function()
{
  var tmp = [], name, mode;
  for (name in Core.MODES) {
    mode = Core.MODES[name];
    tmp.push({name: name, brilliance: mode.brilliance});
  }
  return tmp.sort(function(prev, next) {
    var brilliance_a = prev.brilliance,
        brilliance_b = next.brilliance;
    if (brilliance_a < brilliance_b) {
      return -1;
    } else if (brilliance_a > brilliance_b) {
      return 1;
    }
    return 0;
  }).map(function(item) {
    return item.name;
  });
}());

return {
  Core: Core
};

});