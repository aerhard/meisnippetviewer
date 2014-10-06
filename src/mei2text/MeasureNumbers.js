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
], function (undefined) {
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
      var me = this, i, measure, n;
      i = systems.length;
      while (i--) {
        measure = systems[i].getMeasure(0);
        n = measure.getNAttr();
        if (parseInt(n, 10) > 1) {
          measure.getFirstDefinedStave().setMeasure(n).font = me.font;
        }
      }
    }
  };

  return MeasureNumbers;

});
