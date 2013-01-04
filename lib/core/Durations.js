ju1ius.namespace('Zenino', function ()
{
"use strict";

var BASE_VALUES = [0.25, 0.5, 1, 2, 4, 8, 16, 32, 64, 128];

var Durations = {
  WHOLE: 1,
  HALF: 2,
  QUARTER: 4,
  EIGHTH: 8,
  SIXTEENTH: 16,
  THIRTY_SECOND: 32,
  SIXTY_FOURTH: 64,
  HUNDRED_TWENTY_EIGHTH: 128,
  /**
   * Return the value of the two combined.
   **/
  add: function(value1, value2)
  {
    return 1 / (1 / value1 + 1 / value2);
  },
  /**
   * Return the note value for value1 minus value2.
   *
   * There are no exceptions for producing negative values,
   * which can be useful for taking differences.
   **/
  subtract: function(value1, value2)
  {
    return 1 / (1 / value1 - 1 / value2);
  },
  /**
   * Return the dotted note value.
   *
   * A dot adds half the duration of the note.
   * A second dot adds half of what was added before, etc.
   * So a dotted eighth note has the length of three sixteenth notes.
   * An eighth note with two dots has the length of
   * seven thirty second notes.
   *
   **/
  dotted: function(value, n)
  {
    return (0.5 * value) / (1 - Math.pow(0.5, n + 1));
  },
  /**
   * Return a tuplet.
   *
   * A tuplet can be written as a ratio.
   * For example: 5:4 means that you play 5 notes in the duration of 4 (a quintuplet),
   * 3:2 means that you play 3 notes in the duration of 2 (a triplet), etc.
   * This function calculates the note value when playing in ratio1:ratio2.
   **/
  tuplet: function(value, ratio1, ratio2)
  {
    return (ratio1 * value) / ratio2;
  },
  /**
   * Return the triplet note value. (3:2)
   *
   * A triplet divides the base value above into three parts.
   * So a triplet eighth note is a third of a quarter note.
   **/
  triplet: function(value)
  {
    return Durations.tuplet(value, 3, 2);
  },
  /**
   * Return the quintuplet note value. (5:4)
   *
   * A quintuplet divides the base value two above into five parts.
   * So a quintuplet eighth note is a fifth of a half note.
   **/
  quintuplet: function(value)
  {
    return Durations.tuplet(value, 5, 4);
  },
  /**
   * Return the septuplet note value. (7/4)
   **/
  septuplet: function(value)
  {
    return Durations.tuplet(value, 7, 4);
  },
  /**
   * Analyse the value and return a tuple containing the parts it's made of.
   *
   * The tuple respectively consists of the base note value,
   * the number of dots, and the ratio (see tuplet).
   * 
   * This function recognizes all the base values, triplets, quintuplets,
   * septuplets and up to four dots. The values are matched on range.
   **/
  determine: function(value)
  {
    var i = -2,
        j, l, v, scaled, d, x;
    for (j = 0, l = BASE_VALUES.length; j < l; j++) {
      v = BASE_VALUES[j];
      if (value === v) {
        return [value, 0, 1, 1];
      }
      if (value < v) {
        break;
      }
      i++;
    }
    scaled = value / Math.pow(2, i);
    // base value
    if (scaled >= 0.9375) {
      return [BASE_VALUES[i], 0, 1, 1];
    }
    // septuplet: scaled = 0.875
    if (scaled >= 0.8125) {
      return [BASE_VALUES[i+1], 0, 7, 4];
    }
    // triplet: scaled = 0.75
    if (scaled >= 17/24) {
      return [BASE_VALUES[i+1], 0, 3, 2];
    }
    // dooted note (one dot): scaled = 2/3
    if (scaled >= 31/48) {
      return [v, 1, 1, 1];
    }
    // quintuplet: scaled = 0.625
    if (scaled >= 67/112) {
      return [BASE_VALUES[i+1], 0, 5, 4];
    }
    d = 3;
    for (x = 2; x < 5; x++) {
      d += Math.pow(2, x);
      if (scaled === Math.pow(2, x) / d) {
        return [v, x, 1, 1];
      }
    }
    return[BASE_VALUES[i+1], 0, 1, 1];
  }
};

return {
  Durations: Durations
};

});
