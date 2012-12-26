ju1ius.namespace('Zenino', function()
{
  
var MODES = Zenino.Core.MODES;

var Scales = {

  /**
   * Determines the kind of scale.
   * does not deal with enharmonics on exotic modes
   * for example: #2 <> b3 , etc
   **/
  determine: function(scale)
  {
    var tonic = scale.shift(),
    comp_base = '1';
    for(var i =0, l = scale.length; i < l; i++) {
      var degree = scale[i];
      comp_base += Zenino.Intervals.determine(tonic, degree);
    }
    for(var name in MODES) {
      var props = MODES[name];
      if(comp_base == props['uid']) {
        return Zenino.Object.merge( { 'tonic': tonic, 'name': name }, props );
      }
    }
    return [];
  }

  /***************************************************************************
  * ------------------------------------------------ MAJOR MODES ------------------------------------------- *
  ****************************************************************************/

  /**
   * Returns the major scale starting on note.
   **/
  major: function(note)
  {
    // ensure major notation
    note = note[0].toUpperCase() + note.slice(1);
    return Zenino.Keys.getNotes(note);
  }
  /**
   * Returns the ionian mode scale starting on note.
   **/
  ionian: function(note)
  {
    return Scales.major(note);
  }
  /**
   * Returns the ionian mode scale starting on note.
   **/
  dorian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(i, 1);
  }
  /**
   * Returns the phrygian mode scale starting on note.
   **/
  phrygian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.minorSixth(note));
    return Zenino.Array.rotate(i, 2);
  }
  /**
   * Returns the lydian mode scale starting on note.
   **/
  lydian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(i, 3);
  }
  /**
   * Returns the myxolydian mode scale starting on note.
   **/
  myxolydian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(i, 4);
  }
  /**
   * Returns the aeolian mode scale starting on note.
   **/
  aeolian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.minorThird(note));
    return Zenino.Array.rotate(i, 5);
  }
  /**
   * Returns the locrian mode scale starting on note.
   **/
  locrian: function(note)
  {
    var i = Scales.ionian(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(i, 6);
  }

  /***************************************************************************
  * --------------------------------------- HARMONIC MAJOR MODES -------------------------------------- *
  ***************************************************************************/

  /**
   * Returns the harmonic major scale starting on note.
   **/
  harmonicMajor: function(note)
  {
    var maj = Scales.ionian(note);
    maj[6] = Zenino.Notes.diminish(maj[6]);
    return maj;
  }
  harmonicMajor2: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  }
  harmonicMajor3: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.minorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  }
  harmonicMajor4: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  }
  harmonicMajor5: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(rel, 4);
  }
  harmonicMajor6: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.majorThird(note));
    return Zenino.Array.rotate(rel, 4);
  }
  harmonicMajor7: function(note)
  {
    var rel = Scales.harmonicMajor(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 5);
  }
  /**
   * SHORTCUTS
   **/
  locrianN2N6:    function(note) { return Scales.harmonicMajor2(note); }
  locrianN5:      function(note) { return Scales.harmonicMajor3(note); }
  melodicMinorX4: function(note) { return Scales.harmonicMajor4(note); }
  mixolydianB2:   function(note) { return Scales.harmonicMajor5(note); }
  lydianX2X5:     function(note) { return Scales.harmonicMajor6(note); }
  locrianBB7:     function(note) { return Scales.harmonicMajor7(note); }


  /***************************************************************************
  * --------------------------------------------- MINOR MODES --------------------------------------------- *
  ***************************************************************************/

  /**
   * Returns the natural minor scale starting on note.
   **/
  naturalMinor: function(note) { return Scales.aeolian(note); }

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
  }
  harmonicMinor2: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  }
  harmonicMinor3: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.majorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  }
  harmonicMinor4: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  }
  harmonicMinor5: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(rel, 4);
  }
  harmonicMinor6: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.majorThird(note));
    return Zenino.Array.rotate(rel, 4);
  }
  harmonicMinor7: function(note)
  {
    var rel = Scales.harmonicMinor(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 5);
  }
  /**
   * SHORTCUTS
   **/
  locrianN6:        function(note) { return Scales.harmonicMinor2(note); }
  ionianX5:         function(note) { return Scales.harmonicMinor3(note); }
  dorianX4:         function(note) { return Scales.harmonicMinor4(note); }
  phrygianMajor:    function(note) { return Scales.harmonicMinor5(note); }
  lydianX2:         function(note) { return Scales.harmonicMinor6(note); }
  superLocrianBB7:  function(note) { return Scales.harmonicMinor7(note); }

  /***************************************************************************
  * --------------------------------------- MELODIC MINOR MODES ---------------------------------------- *
  ***************************************************************************/

  /**
   * Returns the locrian mode scale starting on note.
   **/
  melodicMinor: function(note)
  {
    var har = Scales.harmonicMinor(note);
    har[5] = Zenino.Notes.augment(har[5]);
    return har;
  }
  //
  melodicMinor2: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.minorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  }
  melodicMinor3: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.majorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  }
  melodicMinor4: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  }
  melodicMinor5: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(rel, 4);
  }
  melodicMinor6: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.minorThird(note));
    return Zenino.Array.rotate(rel, 4);
  }
  melodicMinor7: function(note)
  {
    var rel = Scales.melodicMinor(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 5);
  }
  /**
   * SHORTCUTS
   **/
  dorianB2:     function(note) { return Scales.melodicMinor2(note); }
  phrygianN6:   function(note) { return Scales.melodicMinor2(note); }
  lydianX5:     function(note) { return Scales.melodicMinor3(note); }
  lydianB7:     function(note) { return Scales.melodicMinor4(note); }
  bartok:       function(note) { return Scales.melodicMinor4(note); }
  mixolydianB6: function(note) { return Scales.melodicMinor5(note); }
  locrianN2:    function(note) { return Scales.melodicMinor6(note); }
  superLocrian: function(note) { return Scales.melodicMinor7(note); }
  altered:      function(note) { return Scales.melodicMinor7(note); }


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
  }
  doubleHarmonic2: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.majorSeventh(note));
    return Zenino.Array.rotate(rel, 1);
  }
  doubleHarmonic3: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.minorSixth(note));
    return Zenino.Array.rotate(rel, 2);
  }
  doubleHarmonic4: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.perfectFifth(note));
    return Zenino.Array.rotate(rel, 3);
  }
  doubleHarmonic5: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.perfectFourth(note));
    return Zenino.Array.rotate(rel, 4);
  }
  doubleHarmonic6: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.majorThird(note));
    return Zenino.Array.rotate(rel, 4);
  }
  doubleHarmonic7: function(note)
  {
    var rel = Scales.doubleHarmonic(Zenino.Intervals.minorSecond(note));
    return Zenino.Array.rotate(rel, 5);
  }
  /**
   * SHORTCUTS
   **/
  lydianX2X6:         function(note) { return Scales.doubleHarmonic2(note); }
  superLocrianN5BB7:  function(note) { return Scales.doubleHarmonic3(note); }
  hungarianMinor:     function(note) { return Scales.doubleHarmonic4(note); }
  dh4:                function(note) { return Scales.doubleHarmonic4(note); }
  oriental:           function(note) { return Scales.doubleHarmonic5(note); }
  dh5:                function(note) { return Scales.doubleHarmonic5(note); }
  ionianX2X5:         function(note) { return Scales.doubleHarmonic6(note); }
  locrianBB3BB7:      function(note) { return Scales.doubleHarmonic7(note); }

  /***************************************************************************
  * ----------------------------------------------- EXOTIC MODES ------------------------------------------- *
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
  }

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
  }
  diminished2: function(note)
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
  }
  bertha: function(note) { return Scales.diminished2(note); }

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
  }
  augmented2: function(note)
  {
    return [
      note,
      Zenino.Intervals.minorSecond(note),
      Zenino.Intervals.majorThird(note),
      Zenino.Intervals.perfectFourth(note),
      Zenino.Intervals.perfectFifth(note),
      Zenino.Intervals.minorSixth(note),
      Zenino.Intervals.diminishedSeventh(note),
    ];
  }

}


return {
  Scales: Scales
};

});
