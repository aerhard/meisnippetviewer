define([
  'jquery',
  'vexflow',
  'meitovexflow'
], function ($, VF, m2v, undefined) {

  var Text = function (meiElement, opts, overrideOpts, customText, meiNodeMatch) {
    this.init(meiElement, opts, overrideOpts, customText, meiNodeMatch);
  };

  Text.prototype = {

    init : function (meiElement, opts, overrideOpts, customText, meiNodeMatch) {
      var me = this, atts;
      me.meiElement = meiElement;
      me.meiNodeMatch = meiNodeMatch;
      atts = (overrideOpts) ? opts : $.extend({}, opts, m2v.Util.attsToObj(meiElement));
      me.x = +atts.x;
      me.y = +atts.y;
      me.textAlign = atts.halign || 'left';
      me.text = (customText === undefined) ? $(meiElement).text() : customText;
      me.atts = atts;
    },

    setX : function (x) {
      this.x = x;
    },

    setY : function (y) {
      this.y = y;
    },

    setTextAlign :function (textAlign) {
    this.textAlign = textAlign;
  },

    getArea : function () {
      var me = this;

      return {
        ctx : {
          x : me.x - 6,
          y : me.y - me.h,
          w : me.w + 12,
          h : me.h + 8,
          x1 : me.x + me.w + 6,
          y1 : me.y + 8
        },
        meiElement : me.meiElement,
        meiNodeMatch : me.meiNodeMatch,
        xmlid : null
      };
    },

    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    preProcess : function () {
      var me = this, ctx = me.ctx, atts = me.atts;
      this.font =
        atts.fontstyle + ' ' + atts.fontweight + ' ' + atts.fontsize + 'px ' + atts.fontfamily;
      ctx.font = this.font;
      me.h = atts.fontsize;
      me.w = ctx.measureText(me.text).width;
      return this;
    },

    draw : function () {
      var me = this;
      me.ctx.textAlign = me.textAlign;
      me.ctx.font = me.font;
      me.ctx.fillText(me.text, me.x, me.y);
    }

  };

  return Text;


});