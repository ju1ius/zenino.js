ju1ius.namespace('Zenino', function()
{
  
var MODES = Zenino.Core.MODES,
    MODE_NAMES = Zenino.Core.MODE_NAMES;

var Scales = {

  /**
   * Determines the kind of scale.
   * does not deal with enharmonics on exotic modes
   * for example: #2 <> b3 , etc
   **/
  determine: function(scale)
  {
    var tonic = scale.shift(),
        comp_base = '1',
        i, l, degree, name, props;
    for(i =0, l = scale.length; i < l; i++) {
      degree = scale[i];
      comp_base += Zenino.Intervals.determine(tonic, degree);
    }
    for(i = 0, l = MODE_NAMES.length; i < l; i++) {
      name = MODE_NAMES[i];
      props = MODES[name];
      if(comp_base === props['uid']) {
        return Zenino.Object.merge({tonic: tonic, name: name}, props);
      }
    }
    return {};
  },

  /***************************************************************************
  * ------------------------------------------------ MAJOR MODES ------------------------------------------- *
  ****************************************************************************/

  /**
   * Returns the major scale starting on note.
   **/
  major: function(note)
  {
    // ensure major notation
    note = note[0].toUpperCase() + note.substr(1);
    return Zenino.Keys.getNotes(note);
  },
  /**
   * Returns the ionian mode scale starting on note.
   **/
  ionian: function(note)
  {
    return Scales.major(note);
  },
  /**
   * Returns the ionian mode scale starting on note.
   **/
  dorian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(i, 1);
  },
  /**
   * Returns the phrygian mode scale starting on note.
   **/
  phrygian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.minorSixth(note));
    return Zenino.Array.rotate(i, 2);
  },
  /**
   * Returns the lydian mode scale starting on note.
   **/
  lydian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(i, 3);
  },
  /**
   * Returns the mixolydian mode scale starting on note.
   **/
  mixolydian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(i, 4);
  },
  /**
   * Returns the aeolian mode scale starting on note.
   **/
  aeolian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.minorThird(note));
    return Zenino.Array.rotate(i, 5);
  },
  /**
   * Returns the locrian mode scale starting on note.
   **/
  locrian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(i, 6);
  },

  /***************************************************************************
  * --------------------------------------- HARMONIC MAJOR MODES -------------------------------------- *
  ***************************************************************************/

  /**
   * Returns the harmonic major scale starting on note.
   **/
  harmonicMajor: function(note)
  {
    var maj = Scales.ionian(note);
    maj[5] = Zenino.Notes.diminish(maj[5]);
    return maj;
  },
  harmonicMajor_2: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  },
  harmonicMajor_3: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.minorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  },
  harmonicMajor_4: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  },
  harmonicMajor_5: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(rel, 4);
  },
  harmonicMajor_6: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.majorThird(note));
    return Zenino.Array.rotate(rel, 5);
  },
  harmonicMajor_7: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 6);
  },
  /**
   * SHORTCUTS
   **/
  locrianN2N6:    function(note) { return Scales.harmonicMajor_2(note); },
  dorianB5:    function(note) { return Scales.harmonicMajor_2(note); },
  superLocrianN5:    function(note) { return Scales.harmonicMajor_3(note); },
  melodicMinorX4: function(note) { return Scales.harmonicMajor_4(note); },
  mixolydianB2:   function(note) { return Scales.harmonicMajor_5(note); },
  lydianX2X5:     function(note) { return Scales.harmonicMajor_6(note); },
  lydianX5X2:     function(note) { return Scales.harmonicMajor_6(note); },
  locrianBB7:     function(note) { return Scales.harmonicMajor_7(note); },

  /***************************************************************************
  * ----------------------------- IONIAN#2 MODES --------------------------- *
  ***************************************************************************/

  ionianX2: function(note)
  {
    var maj = Scales.ionian(note);
    maj[1] = Zenino.Notes.augment(maj[1]);
    return maj;
  },
  superLocrianBB3BB7: function(note)
  {
    var rel = Scales.ionianX2(Zenino.Intervals.diminishedSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  },
  phrygianN7: function(note)
  {
    var rel = Scales.ionianX2(Zenino.Intervals.minorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  },
  lydianX6: function(note)
  {
    var rel = Scales.ionianX2(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  },
  mixolydianX5: function(note)
  {
    var rel = Scales.ionianX2(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(rel, 4);
  },
  aeolianX4: function(note)
  {
    var rel = Scales.ionianX2(Zenino.Intervals.minorThird(note));
    return Zenino.Array.rotate(rel, 5);
  },
  locrianMajor: function(note)
  {
    var rel = Scales.ionianX2(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 6);
  },

  /***************************************************************************
  * --------------------------------------------- MINOR MODES --------------------------------------------- *
  ***************************************************************************/

  /**
   * Returns the natural minor scale starting on note.
   **/
  naturalMinor: function(note) { return Scales.aeolian(note); },

  /***************************************************************************
  * --------------------------------------- HARMONIC MINOR MODES -------------------------------------- *
  ***************************************************************************/

  /**
   * Returns the harmonic minor scale starting on note.
   **/
  harmonicMinor: function(note)
  {
    var nat = Scales.naturalMinor(note);
    nat[6] = Zenino.Notes.augment(nat[6]);
    return nat;
  },
  harmonicMinor_2: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  },
  harmonicMinor_3: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.majorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  },
  harmonicMinor_4: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  },
  harmonicMinor_5: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(rel, 4);
  },
  harmonicMinor_6: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.majorThird(note));
    return Zenino.Array.rotate(rel, 5);
  },
  harmonicMinor_7: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 6);
  },
  /**
   * SHORTCUTS
   **/
  locrianN6:        function(note) { return Scales.harmonicMinor_2(note); },
  ionianX5:         function(note) { return Scales.harmonicMinor_3(note); },
  dorianX4:         function(note) { return Scales.harmonicMinor_4(note); },
  phrygianMajor:    function(note) { return Scales.harmonicMinor_5(note); },
  lydianX2:         function(note) { return Scales.harmonicMinor_6(note); },
  superLocrianBB7:  function(note) { return Scales.harmonicMinor_7(note); },

  /***************************************************************************
  * --------------------------------------- MELODIC MINOR MODES ---------------------------------------- *
  ***************************************************************************/

  /**
   * Returns the locrian mode scale starting on note.
   **/
  melodicMinor: function(note)
  {
    var har = Scales.ionian(note);
    har[2] = Zenino.Notes.diminish(har[2]);
    return har;
  },
  //
  melodicMinor_2: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  },
  melodicMinor_3: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.majorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  },
  melodicMinor_4: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  },
  melodicMinor_5: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(rel, 4);
  },
  melodicMinor_6: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.minorThird(note));
    return Zenino.Array.rotate(rel, 5);
  },
  melodicMinor_7: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 6);
  },
  /**
   * SHORTCUTS
   **/
  dorianB2:     function(note) { return Scales.melodicMinor_2(note); },
  phrygianN6:   function(note) { return Scales.melodicMinor_2(note); },
  lydianX5:     function(note) { return Scales.melodicMinor_3(note); },
  lydianB7:     function(note) { return Scales.melodicMinor_4(note); },
  bartok:       function(note) { return Scales.melodicMinor_4(note); },
  mixolydianB6: function(note) { return Scales.melodicMinor_5(note); },
  locrianN2:    function(note) { return Scales.melodicMinor_6(note); },
  superLocrian: function(note) { return Scales.melodicMinor_7(note); },
  altered:      function(note) { return Scales.melodicMinor_7(note); },


  /***************************************************************************
  * ------------------------- MELODIC MINOR #5 MODES ----------------------- *
  ***************************************************************************/

  melodicMinorX5: function(note)
  {
    var har = Scales.ionian(note);
    har[2] = Zenino.Notes.diminish(har[2]);
    har[4] = Zenino.Notes.augment(har[4]);
    return har;
  },
  phrygianN6X4: function(note)
  {
    var rel  = Scales.melodicMinorX5(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  },
  // 1 2 #3 #4 #5 6 7
  lydianX5X3: function(note)
  {
    var rel  = Scales.melodicMinorX5(Zenino.Intervals.majorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  },
  lydianB7X2: function(note)
  {
    var rel  = Scales.melodicMinorX5(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  },
  // 1 b2 b3 b4 b5 bb6 bb7
  superLocrianBB6BB7: function(note)
  {
    var rel  = Scales.melodicMinorX5(Zenino.Intervals.diminishedFourth(note));
    return Zenino.Array.rotate(rel, 4);
  },
  locrianN2N7: function(note)
  {
    var rel  = Scales.melodicMinorX5(Zenino.Intervals.minorThird(note));
    return Zenino.Array.rotate(rel, 5);
  },
  // 1 b2 b3 b4 b5 6 b7
  superLocrianN6: function(note)
  {
    var rel  = Scales.melodicMinorX5(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 6);
  },

  /***************************************************************************
  * --------------------------------------- DOUBLE HARMONIC MODES ------------------------------------- *
  ***************************************************************************/

  doubleHarmonic: function(note)
  {
    return [
      note,
      Zenino.Intervals.minorSecond(note),
      Zenino.Intervals.majorThird(note),
      Zenino.Intervals.perfectFourth(note),
      Zenino.Intervals.perfectFifth(note),
      Zenino.Intervals.minorSixth(note),
      Zenino.Intervals.majorSeventh(note),
    ];
  },
  doubleHarmonic_2: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.majorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  },
  doubleHarmonic_3: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.minorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  },
  doubleHarmonic_4: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  },
  doubleHarmonic_5: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(rel, 4);
  },
  doubleHarmonic_6: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.majorThird(note));
    return Zenino.Array.rotate(rel, 5);
  },
  doubleHarmonic_7: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 6);
  },
  /**
   * SHORTCUTS
   **/
  lydianX2X6:         function(note) { return Scales.doubleHarmonic_2(note); },
  superLocrianN5BB7:  function(note) { return Scales.doubleHarmonic_3(note); },
  hungarianMinor:     function(note) { return Scales.doubleHarmonic_4(note); },
  oriental:           function(note) { return Scales.doubleHarmonic_5(note); },
  ionianX2X5:         function(note) { return Scales.doubleHarmonic_6(note); },
  locrianBB3BB7:      function(note) { return Scales.doubleHarmonic_7(note); },

  /***************************************************************************
  * ------------------- ARABIAN (mixolydian b5 b6) MODES ------------------- *
  ***************************************************************************/

  arabian: function(note)
  {
    var base = Scales.mixolydianB6(note);
    base[4] = Zenino.Notes.diminish(base[4]);
    return base;
  },
  superLocrianN2: function(note)
  {
    var rel = Scales.arabian(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  },
  // 1 b2 bb3 b4 b5 b6 b7
  superLocrianBB3: function(note)
  {
    var rel = Scales.arabian(Zenino.Intervals.minorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  },
  phrygianN6N7: function(note)
  {
    var rel = Scales.arabian(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  },
  ionianX2X5X6: function(note)
  {
    var rel = Scales.arabian(Zenino.Intervals.augmentedFourth(note));
    return Zenino.Array.rotate(rel, 4);
  },
  lydianB7X5: function(note)
  {
    var rel = Scales.arabian(Zenino.Intervals.majorThird(note));
    return Zenino.Array.rotate(rel, 5);
  },
  lydianB7B6: function(note)
  {
    var rel = Scales.arabian(Zenino.Intervals.majorSecond(note));
    return Zenino.Array.rotate(rel, 6);
  },

  mixolydianB5B6: function(note) { return Scales.arabian(note); },

  /***************************************************************************
  * ------------------ PERSIAN (locrian major N7) MODES -------------------- *
  ***************************************************************************/
  
  // locrianMajorN7 or locrianN3N7
  persian: function(note)
  {
    var scale = Scales.locrianMajor(note);
    scale[6] = Zenino.Notes.augment(scale[6]);
    return scale;
  },
  // persian2
  ionianX2X6: function(note)
  {
    var rel = Scales.persian(Zenino.Intervals.majorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  },
  // persian4, harmonicMinorX4B2
  phrygianX4N7: function(note)
  {
    var rel = Scales.persian(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  },

  /***************************************************************************
  * ------------------------------ EXOTIC MODES ---------------------------- *
  ***************************************************************************/

  /**
   * Returns the whole tone scale starting on note.
   **/
  wholeTone: function(note)
  {
    return [
      note,
      Zenino.Intervals.majorSecond(note),
      Zenino.Intervals.majorThird(note),
      Zenino.Intervals.augmentedFourth(note),
      Zenino.Intervals.augmentedFifth(note),
      Zenino.Intervals.minorSeventh(note)
    ];
  },

  /**
   * Returns the diminished scale starting on note.
   **/
  diminished: function(note)
  {
    return [
      note,
      Zenino.Intervals.majorSecond(note),
      Zenino.Intervals.minorThird(note),
      Zenino.Intervals.perfectFourth(note),
      Zenino.Intervals.diminishedFifth(note),
      Zenino.Intervals.minorSixth(note),
      Zenino.Intervals.diminishedSeventh(note),
      Zenino.Intervals.majorSeventh(note)
    ];
  },
  diminished_2: function(note)
  {
    return [
      note,
      Zenino.Intervals.minorSecond(note),
      Zenino.Intervals.augmentedSecond(note),
      Zenino.Intervals.majorThird(note),
      Zenino.Intervals.augmentedFourth(note),
      Zenino.Intervals.perfectFifth(note),
      Zenino.Intervals.majorSixth(note),
      Zenino.Intervals.minorSeventh(note),
    ];
  },
  bertha: function(note) { return Scales.diminished_2(note); },

  /**
   * Returns the augmented scale starting on note.
   **/
  augmented: function(note)
  {
    return [
      note,
      Zenino.Intervals.augmentedSecond(note),
      Zenino.Intervals.majorThird(note),
      Zenino.Intervals.perfectFifth(note),
      Zenino.Intervals.minorSixth(note),
      Zenino.Intervals.majorSeventh(note)
    ];
  },
  augmented_2: function(note)
  {
    return [
      note,
      Zenino.Intervals.minorSecond(note),
      Zenino.Intervals.majorThird(note),
      Zenino.Intervals.perfectFourth(note),
      Zenino.Intervals.augmentedFifth(note),
      Zenino.Intervals.majorSixth(note)
    ];
  },

};

return {
  Scales: Scales
};

});