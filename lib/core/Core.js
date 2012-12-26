ju1ius = {};

(function(global_scope){

ju1ius.namespace = function(path, publics)
{
	var parts = path.split('.');
	var ns = global_scope;
	for(var i = 0, l = parts.length; i < l; i++) {
		var current = parts[i];
		ns[current] = ns[current] || {};
		ns = ns[current];
	}
	if(typeof publics === 'function') {
		publics = publics(ns);
	}
	for(var member in publics) {
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
    'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11
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
    'ionian' : {
      'parent' : 'ionian',
      'uid' : '1234567',
      'degree' : 1,
      'chords' : [
        'Maj13',
        'min13',
        'min11/b9/b13',
        'Maj9/#11/13',
        '13',
        'min11/b13',
        'ø/b9/11/b13'
      ],
      'cadential_notes' : [3, 7],
      'cadential_chords' : [5]
    },
    'dorian' : {
      'parent' : 'ionian',
      'uid' : '12b3456b7',
      'degree' : 2,
      'cadential_notes' : [6],
      'cadential_chords' : [2, 4, 7]
    },
    'phrygian' : {
      'parent' : 'ionian',
      'uid' : '1b2b345b6b7',
      'degree' : 3,
      'cadential_notes' : [2],
      'cadential_chords' : [2, 3, 7]
    },
    'lydian' : {
      'parent' : 'ionian',
      'uid' : '123#4567',
      'degree' : 4,
      'cadential_notes' : [4],
      'cadential_chords' : [2, 5, 7]
    },
    'mixolydian' : {
      'parent' : 'ionian',
      'uid' : '123456b7',
      'degree' : 5,
      'cadential_notes' : [7],
      'cadential_chords' : [5, 7]
    },
    'aeolian' : {
      'parent' : 'ionian',
      'uid' : '12b345b6b7',
      'degree' : 6,
      'cadential_notes' : [6],
      'cadential_chords' : [4, 6, 7]
    },
    'locrian' : {
      'parent' : 'ionian',
      'uid' : '1b2b34b5b6b7',
      'degree' : 7,
      'cadential_notes' : [2, 5],
      'cadential_chords' : [2, 3, 5, 7]
    },
     // =============================== MELODIC MINOR MODES ================================
    'melodicMinor' : {
      'parent' : 'melodic minor',
      'uid' : '12b34567',
      'degree' : 1,
      'chords' : [
        'minMaj7/9/11/13',
        'min13/b9',
        'Maj7#5/9/#11/13',
        '13/#11',
        '9/b13',
        'ø/9/11/b13',
        '7#5/#9/b13'
      ],
      'cadential_notes' : [3, 7],
      'cadential_chords' : [5, 7]
    },
    'phrygianN6' : {
      'parent' : 'melodic minor',
      'uid' : '1b2b3456b7',
      'degree' : 2,
      'cadential_notes' : [2, 6],
      'cadential_chords' : [2, 7]
    },
    'lydianX5' : {
      'parent' : 'melodic minor',
      'uid' : '123#4#567',
      'degree' : 3,
      'cadential_notes' : [4, 5],
      'cadential_chords' : [2, 7]
    },
    'lydianB7' : {
      'parent' : 'melodic minor',
      'uid' : '123#456b7',
      'degree' : 4,
      'cadential_notes' : [4, 7],
      'cadential_chords' : [2, 5, 7]
    },
    'mixolydianB6' : {
      'parent' : 'melodic minor',
      'uid' : '12345b6b7',
      'degree' : 5,
      'cadential_notes' : [6, 7],
      'cadential_chords' : [4, 6, 7]
    },
    'locrianN2' : {
      'parent' : 'melodic minor',
      'uid' : '12b34b5b6b7',
      'degree' : 6,
      'cadential_notes' : [2, 5],
      'cadential_chords' : [3, 5, 7]
    },
    'superLocrian' : {
      'parent' : 'melodic minor',
      'uid' : '1b2b3b4b5b6b7',
      'degree' : 7,
      'cadential_notes' : [2, 4, 5],
      'cadential_chords' : [2, 5]
    },
    // ============================== HARMONIC MINOR MODES ===============================
    'harmonicMinor' : {
      'parent' : 'harmonic minor',
      'uid' : '12b345b67',
      'degree' : 1,
      'chords' : [
        'minMaj7/9/11/b13',
        'ø/b9/11/b13',
        'Maj7#5/9/13',
        'min13/#11',
        '7/b9/b13',
        'Maj13/#9/#11',
        'dim7',
      ],
      'cadential_notes' : [3, 6, 7],
      'cadential_chords' : [5, 7]
    },
    'locrianN6' : {
      'parent' : 'harmonic minor',
      'uid' : '1b2b34b56b7',
      'degree' : 2,
      'cadential_notes' : [2, 5, 6],
      'cadential_chords' : [2, 5, 7]
    },
    'ionianX5' : {
      'parent' : 'harmonic minor',
      'uid' : '1234#567',
      'degree' : 3,
      'cadential_notes' : [5],
      'cadential_chords' : [1]
    },
    'dorianX4' : {
      'parent' : 'harmonic minor',
      'uid' : '12b3#456b7',
      'degree' : 4,
      'cadential_notes' : [4, 6],
      'cadential_chords' : [2, 7]
    },
    'phrygianMajor' : {
      'parent' : 'harmonic minor',
      'uid' : '1b2345b6b7',
      'degree' : 5,
      'cadential_notes' : [2, 3],
      'cadential_chords' : [2, 7]
    },
    'lydianX2' : {
      'parent' : 'harmonic minor',
      'uid' : '1#23#4567',
      'degree' : 6,
      'cadential_notes' : [2, 4],
      'cadential_chords' : [5, 7]
    },
    'superLocrianBB7' : {
      'parent' : 'harmonic minor',
      'uid' : '1b2b3b4b5b6bb7',
      'degree' : 7,
      'cadential_notes' : [2, 4, 5, 7],
      'cadential_chords' : [5]
    },
    // ============================= HARMONIC MAJOR MODES ================================
    'harmonicMajor' : {
      'parent' : 'harmonic major',
      'uid' : '12345b67',
      'degree' : 1,
      'chords' : [						
        'Maj9/b13',
        'ø/9/11/13',
        'min7/b9/b13',
        'minMaj7/9/#11/13',
        '13/b9',
        'Maj7#5/#9/#11/13',
        'dim7/b9/11/b13',
      ],
      'cadential_notes' : [3, 6, 7],
      'cadential_chords' : [5, 7]
    },
    'dorianB5' : {
      'parent' : 'harmonic major',
      'uid' : '12b34b56b7',
      'degree' : 2,
      'cadential_notes' : [2, 5, 6],
      'cadential_chords' : [2, 7]
    },
    'superLocrianN5' : {
      'parent' : 'harmonic major',
      'uid' : '1b2b3b45b6b7',
      'degree' : 2,
      'cadential_notes' : [4, 5],
      'cadential_chords' : [2, 4, 6]
    },
    'melodicMinorX4' : {
      'parent' : 'harmonic major',
      'uid' : '12b3#4567',
      'degree' : 4,
      'cadential_notes' : [3, 4],
      'cadential_chords' : [2, 5, 7]
    },
    'mixolydianB2' : {
      'parent' : 'harmonic major',
      'uid' : '1b23456b7',
      'degree' : 5,
      'cadential_notes' : [2, 7],
      'cadential_chords' : [2, 7]
    },
    'lydianX5X2' : {
      'parent' : 'harmonic major',
      'uid' : '1#23#4#567',
      'degree' : 6,
      'cadential_notes' : [2, 5, 4],
      'cadential_chords' : [5]
    },
    'locrianBB7' : {
      'parent' : 'harmonic major',
      'uid' : '1b2b34b5b6bb7',
      'degree' : 7,
      'cadential_notes' : [5, 7],
      'cadential_chords' : [5]
    },
    // ============================= DOUBLE HARMONIC MODES =============================
    'doubleHarmonic' : {
      'parent' : 'double harmonic',
      'uid' : '1b2345b67',
      'degree' : 1,
      'chords' : [						
        'Maj7/b13',
        'Maj7/#9/#11',
        'min6',
        'minMaj7/9/#11/b13',
        '7b5/b9/13',
        'Maj7#5/#9/13',
        'NC'
      ],
      'cadential_notes' : [2, 3, 7],
      'cadential_chords' : [2]
    },
    'lydianX2X6' : {
      'parent' : 'double harmonic',
      'uid' : '1#23#45#67',
      'degree' : 2,
      'cadential_notes' : [2, 4, 6],
      'cadential_chords' : [2, 7]
    },
    'superLocrianN5BB7' : {
      'parent' : 'double harmonic',
      'uid' : '1b2b3b45b6bb7',
      'degree' : 3,
      'cadential_notes' : [4, 5, 7],
      'cadential_chords' : [3, 6, 7]
    },
    'hungarianMinor' : {
      'parent' : 'double harmonic',
      'uid' : '12b3#45b67',
      'degree' : 4,
      'cadential_notes' : [4, 6],
      'cadential_chords' : [7]
    },
    'oriental' : {
      'parent' : 'double harmonic',
      'uid' : '1b234b567',
      'degree' : 5,
      'cadential_notes' : [3, 5],
      'cadential_chords' : [6]
    },
    'ionianX2X5' : {
      'parent' : 'double harmonic',
      'uid' : '1#234#567',
      'degree' : 6,
      'cadential_notes' : [2, 5],
      'cadential_chords' : [3, 5, 7]
    },
    'locrianBB3BB7' : {
      'parent' : 'double harmonic',
      'uid' : '1b2bb34b5b6bb7',
      'degree' : 7,
      'cadential_notes' : [3, 5, 7],
      'cadential_chords' : [3, 5]
    },
    // =============================== IONIAN #2 MODES ===================================
    'ionianX2' : {
      'parent' : 'ionian #2',
      'uid' : '1#234567',
      'degree' : 1,
    },
    'phrygianN7' : {
      'parent' : 'ionian #2',
      'uid' : '1b2b345b67',
      'degree' : 3,
    },
    'lydianX6' : {
      'parent' : 'ionian #2',
      'uid' : '123#45#67',
      'degree' : 4,
    },
    'mixolydianX5' : {
      'parent' : 'ionian #2',
      'uid' : '1234#56b7',
      'degree' : 5,
    },
    'aeolianX4' : {
      'parent' : 'ionian #2',
      'uid' : '12b3#45b6b7',
      'degree' : 6,
    },
    'locrianMajor' : {
      'parent' : 'ionian #2',
      'uid' : '1b234b5b6b7',
      'degree' : 7,
    },
    // ============================= MELODIC MINOR #5 MODES ==============================
    'melodicMinorX5' : {
      'parent' : 'melodic minor #5',
      'uid' : '12b34#567',
      'degree' : 1,
    },
    'phrygianN6X4' : {
      'parent' : 'melodic minor #5',
      'uid' : '1b2b3#456b7',
      'degree' : 2,
    },
    'lydianB7X2' : {
      'parent' : 'melodic minor #5',
      'uid' : '1#23#456b7',
      'degree' : 4,
    },
    'locrianN2N7' : {
      'parent' : 'melodic minor #5',
      'uid' : '12b34b5b67',
      'degree' : 6,
    },
    // ================================== ARABIAN MODES ====================================
    'arabian' : {
      'parent' : 'arabian',
      'uid' : '1234b5b6b7',
      'degree' : 1,
    },
    'superLocrianN2' : {
      'parent' : 'arabian',
      'uid' : '12b3b4b5b6b7',
      'degree' : 2,
    },
    'phrygianN6N7' : {
      'parent' : 'arabian',
      'uid' : '1b2b34567',
      'degree' : 4,
    },
    'ionianX2X5X6' : {
      'parent' : 'arabian',
      'uid' : '1#234#5#67',
      'degree' : 5,
    },
    'lydianB7X5' : {
      'parent' : 'arabian',
      'uid' : '123#4#56b7',
      'degree' : 6,
    },
    'lydianB7B6' : {
      'parent' : 'arabian',
      'uid' : '123#45b6b7',
      'degree' : 7,
    },
    // ================================= PERSIAN MODES ==================================
    'persian' : {
      'parent' : 'persian',
      'uid' : '1b234b5b67',
      'degree' : 1,
    },
    'ionianX2X6' : {
      'parent' : 'persian',
      'uid' : '1#2345#67',
      'degree' : 2,
    },
    'phrygianX4N7' : {
      'parent' : 'persian',
      'uid' : '1b234b5b67',
      'degree' : 4,
    },
    // ============================== NON HEPTATONIC MODES ================================
    'augmented' : {
      'parent' : 'augmented',
      'uid' : '1#235b67',
      'degree' : 1,
    },
    'augmented2' : {
      'parent' : 'augmented',
      'uid' : '1b234#56',
      'degree' : 2,
    },
    'diminished' : {
      'parent' : 'diminished',
      'uid' : '12b34b5b6bb77',
      'degree' : 1,
    },
    'diminished2' : {
      'parent' : 'diminished',
      'uid' : '1b2#23#456b7',
      'degree' : 2,
    },
    'wholeTone' : {
      'parent' : 'diminished',
      'uid' : '123#4#5b7',
      'degree' : 1,
    }
  }
};


var modeNames = [], name;
for(name in Core.MODES) {
  modeNames.push(name);
}
Core.MODE_NAMES = modeNames;


return {
  Core: Core
}

});