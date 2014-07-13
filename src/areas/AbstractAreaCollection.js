define([
  'core/RuntimeError',
], function (RuntimeError, undefined) {

  /**
   * @class MSV.AbstractAreaCollection
   */
  var AbstractAreaCollection = function (config) {

  };

  AbstractAreaCollection.prototype = {

    setElement : function (element) {
      throw new RuntimeError('AbstractAreaCollection', 'No override for setElement() provided.');
    },

    setContext : function (ctx) {
      throw new RuntimeError('AbstractAreaCollection', 'No override for setContext() provided.');
    },

    setScale : function (scale) {
      throw new RuntimeError('AbstractAreaCollection', 'No override for setScale() provided.');
    },

    addAreas : function (areas) {
      throw new RuntimeError('AbstractAreaCollection', 'No override for addAreas() provided.');
    },

    initHighlights : function () {
      throw new RuntimeError('AbstractAreaCollection', 'No override for initHighlights() provided.');
    },

    removeHighlight : function () {
      throw new RuntimeError('AbstractAreaCollection', 'No override for removeHighlight() provided.');
    },

    onClick : function (mousePos, topCanvas, e) {
      throw new RuntimeError('AbstractAreaCollection', 'No override for onClick() provided.');
    },

    onMouseMove : function (mousePos, topCanvas, e) {
      throw new RuntimeError('AbstractAreaCollection', 'No override for onMouseMove() provided.');
    }

  };

  return AbstractAreaCollection;

});
