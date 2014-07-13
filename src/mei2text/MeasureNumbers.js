define([
], function (undefined) {

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
        if (systems[i]) {
          measure = systems[i].getMeasure(0);
          n = measure.getN();
          if (n > 1) {
            measure.getFirstDefinedStaff().setMeasure(n).font = me.font;
          }
        }
      }
    }
  };

  return MeasureNumbers;

});
