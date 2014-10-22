/*
 * (C) Copyright 2014 Alexander Erhard (http://alexandererhard.com/).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
define([
  'vexflow'
], function (VF) {
  /**
   * @exports mei2text/MeasureNumbers
   */

  /**
   * @class MEI2TEXT.MeasureNumbers
   * @private
   *
   * @constructor
   */
  var MeasureNumbers = function (font) {
    this.font = font;
  };

  MeasureNumbers.prototype = {

    addToSystemStarts : function (systems) {
      var me = this, i, measure, stave, volta, n;
      i = systems.length;
      while (i--) {
        measure = systems[i].getMeasure(0);
        stave = measure.getFirstDefinedStave();
        if (measure && stave) {
          n = measure.getNAttr();

          // don't render measure numbers 0 and 1
          if (parseInt(n, 10) > 1) {
            volta = me.getStaveVolta(stave.modifiers);
            if (volta) volta.setShiftY(volta.y_shift - me.font.size);

            stave.setMeasure(n).font = me.font;
          }
        }
      }
    },

    getStaveVolta : function (staveModifiers) {
      var i, j;
      for (i=2,j=staveModifiers.length;i<j;i++) {
        if (staveModifiers[i] instanceof VF.Volta) {
          return staveModifiers[i];
        }
      }
    }
  };

  return MeasureNumbers;

});
