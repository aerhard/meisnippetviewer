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
  'jquery',
  'vexflow',
  'common/Util'
], function ($, VF, Util, undefined) {
  /**
   * @exports mei2text/Text
   */

  var Text = function (meiElement, opts, overrideOpts, customText, meiNodeMatch) {
    this.init(meiElement, opts, overrideOpts, customText, meiNodeMatch);
  };

  Text.prototype = {

    init : function (meiElement, opts, overrideOpts, customText, meiNodeMatch) {
      var me = this, atts;

      me.meiElement = meiElement;
      me.meiNodeMatch = meiNodeMatch;
      atts = (overrideOpts) ? opts : $.extend({}, opts, Util.attsToObj(meiElement));
      me.x = +atts.x;
      me.y = +atts.y;

      me.h = +atts.fontsize;
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

    setContainer : function (container) {
      this.container = container;
    },

    getContainer : function () {
      return this.container;
    },

    setTextAlign : function (textAlign) {
      this.textAlign = textAlign;
    },

    getArea : function () {
      var me = this;

      return {
        x : me.x - 6,
        y : me.y - me.h,
        w : me.w + 12,
        h : me.h + 8,
        x1 : me.x + me.w + 6,
        y1 : me.y + 8,
        meiElement : me.meiElement,
        meiNodeMatch : me.meiNodeMatch,
        xmlid : null
      };
    },

    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    preProcess : function (scale) {
      var me = this, ctx = me.ctx, atts = me.atts;

      scale = scale || 1;
      me.h = atts.fontsize / scale;

      this.font = atts.fontstyle + ' ' + atts.fontweight + ' ' + (me.h) + 'px ' + atts.fontfamily;
      ctx.font = this.font;
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