define([
  'vexflow',
  'meitovexflow',
  'areas/AbstractAreaCollection'
], function (VF, m2v, AbstractAreaCollection, undefined) {

  /**
   * @class MSV.DefaultAreaCollection
   */
  var DefaultAreaCollection = function (config) {
    this.init(config);
  };

  Vex.Inherit(DefaultAreaCollection, AbstractAreaCollection, {

    type : 'highlighter',

    /**
     * @property {Object} emptyArea An area in which all dimensions are set to
     * zero.
     */
    emptyArea : {
      ctx : {
        x : 0,
        y : 0,
        w : 0,
        h : 0
      }
    },

    init : function (config) {
      var me = this;
      me.ctx = config.ctx;

      me.content = config.content;

      me.highlightMode = config.highlightMode;

      me.fillStyle = config.fillStyle || 'rgba(100, 100, 0, 0.5)';

      me.clickHandler = config.clickHandler;
      me.mouseEnterHandler = config.mouseEnterHandler;
      me.mouseLeaveHandler = config.mouseLeaveHandler;

      me.currentHighlight = me.emptyArea;
      return me;
    },

    setElement : function (element) {
      this.element = element;
    },

    setContext : function (ctx) {
      var me = this;
      me.ctx = ctx;
      me.ctx.fillStyle = me.fillStyle;
    },

    setScale : function (scale) {
      this.scale = scale;
    },

    getAreas : function () {
      return this.areas;
    },

    addAreas : function (areas) {
      if (this.areas) {
        Array.prototype.push.apply(this.areas, areas);
      } else {
        this.areas = areas;
      }
    },

    initHighlights : function () {
      var me = this;
      if (me.highlightMode === 'static') {
        me.highlightAll();
      } else if (me.highlightMode === 'hover') {
        me.highlightOnHover = true;
      }
    },

    removeHighlight : function () {
      var me = this,
          factor = 1 / me.scale;
      // select a rectangle larger than the highlight in order to remove
      // additional pixels created due to anti-aliasing, too; the smaller
      // the scaling, the bigger these artifacts are proportionally
      me.ctx.clearRect(
          me.currentHighlight.ctx.x - factor,
          me.currentHighlight.ctx.y - factor,
          me.currentHighlight.ctx.w + 2 * factor,
          me.currentHighlight.ctx.h + 2 * factor);
    },

    highlightAll : function () {
      var me = this, i;
      i = me.areas.length;
      while (i--) {
        me.setHighlight(me.areas[i]);
      }
    },

    onClick : function (mousePos, topCanvas, e) {
      var me = this, area;
      area = me.getAreaFromPoint(mousePos);
      if (area) {
        return me.clickHandler(area, topCanvas, e);
      }
      return true;
    },

    onMouseMove : function (mousePos, topCanvas, e) {
      var me = this, area;
      area = me.getAreaFromPoint(mousePos);
      if (area) {
        if (me.currentHighlight !== area) {
          if (me.highlightOnHover) {
            me.removeHighlight();
            me.setHighlight(area);
          }
          if (me.mouseEnterHandler) {
            me.mouseEnterHandler(area, topCanvas, e);
          }
        }
      } else {
        if (me.currentHighlight !== me.emptyArea) {
          if (me.highlightOnHover) {
            me.removeHighlight();
            me.currentHighlight = me.emptyArea;
          }
          if (me.mouseLeaveHandler) {
            me.mouseLeaveHandler(null, topCanvas, e);
          }
        }
      }
    },

    /**
     * Highlights an area.
     * @param {Object} area The area to highlight.
     */
    setHighlight : function (area) {
      var me = this, M = Math;
      me.roundRect(me.ctx,
        area.ctx.x,
        area.ctx.y,
        area.ctx.w,
        area.ctx.h,
        5, true, false);
      me.currentHighlight = area;
    },

    // From http://js-bits.blogspot.de/2010/07/canvas-rounded-corner-rectangles.html
    /**
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x The top left x coordinate
     * @param {Number} y The top left y coordinate
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     * @param {Number} radius The corner radius. Defaults to 5;
     * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
     * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
     */
    roundRect : function (ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke == "undefined") {
        stroke = true;
      }
      if (typeof radius === "undefined") {
        radius = 5;
      }
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (stroke) {
        ctx.stroke();
      }
      if (fill) {
        ctx.fill();
      }
    },

    /**
     * Checks if a point is in one of the highlighter areas.
     * @param {Object} point The point
     * @param {Number} point.x The x coordinate
     * @param {Number} point.y The y coordinate
     * @return {Object|null} The last area the point is in or null if the point
     * is in none of the highlighter's areas.
     */
    getAreaFromPoint : function (point) {
      var me = this, areas, i, inArea = false;
      areas = me.areas;
      i = areas.length;
      while (i--) {
        if (me.isPointInRect(point, areas[i].ctx)) {
          return areas[i];
        }
      }
      return null;
    },

    /**
     * Checks if a point is in a rectangle
     * @param {Object} point the coordinates of a point
     * @param {Object} point.x the x coordinate
     * @param {Object} point.y the y coordinate
     * @param {Object} rect the coordinates of the rectangle
     * @param {Object} rect.x the left x coordinate
     * @param {Object} rect.y the top y coordinate
     * @param {Object} rect.x1 the right x coordinate
     * @param {Object} rect.y1 the bottom y coordinate
     * @return {Boolean} True if the mouse is within the rectangle, otherwise
     * false.
     */
    isPointInRect : function (point, rect) {
      return !(point.x < rect.x || point.x > rect.x1 || point.y < rect.y || point.y > rect.y1);
    }
  });

  return DefaultAreaCollection;

});
