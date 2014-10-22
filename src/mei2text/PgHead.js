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
  'common/Util',
  'msv/mei2text/Text'
], function ($, VF, Util, Text, undefined) {
  /**
   * @exports mei2text/PgHead
   */

  /**
   * @class MEI2TEXT.PgHead
   * @private
   *
   * @constructor
   */
  var PgHead = function (element, scale) {
    this.init(element, scale);
  };

  PgHead.prototype = {

    init : function (scale) {
      var me = this;

      me.scale = scale;
      me.defaultFontSize = 12;
      me.lineHeight = 1.3;

      // TODO treat rend[@align]s like floating HTML divs
      /**
       * Contains the MSV.Text objects ordered by line number. Each descendant text node
       * of the pgHead element is stored in its own Text object
       * @type {Text[][]}
       */
      me.textsByLine = [
        []
      ];
      me.line_n = 0;

      /**
       * Current coordinates
       * @type {{x: *, y: *, w: *}}
       */
      me.currentCoords = {};

    },

    processElement : function (element) {
      var me  = this;
      me.htmlToArray(element, {
        fontsize : me.defaultFontSize,
        fontweight : '',
        fontstyle : '',
        fontfamily : 'Times'
      });
      me.calculateHeight();
    },

    calculateHeight : function () {
      var me = this, maxFontSizeInLine, i, j, k, l, textLine, text, totalHeight = 0;
      for (i = 0, j = me.textsByLine.length; i < j; i++) {
        textLine = me.textsByLine[i];
        maxFontSizeInLine = 0;
        for (k = 0, l = textLine.length; k < l; k++) {
          text = textLine[k];
          text.h = text.atts.fontsize * 2;
          maxFontSizeInLine = Math.max(text.h, maxFontSizeInLine);
        }
        totalHeight += maxFontSizeInLine * me.lineHeight;
      }
      me.height = totalHeight;
    },

    setStartXY : function (x, y) {
      this.currentCoords.x = x;
      this.currentCoords.y = y;
    },

    setWidth : function (width) {
      this.currentCoords.w = width;
    },

    getLowestY : function () {
      return this.currentCoords.y + this.height;
    },

    getTextsByLine : function () {
      return this.textsByLine;
    },

    htmlToArray : function (element, opts) {
      var me = this, atts, defaults, text, i, j, childNodes, nodeMatch;

      childNodes = element.childNodes;

      for (i = 0, j = childNodes.length; i < j; i++) {

        if (childNodes[i].nodeName === '#text') {
          text = childNodes[i].textContent.replace(/([\n|\r]+\s*)/g, ' ');
          if (text) {
            // MSV.Text always expects an element as the first argument; we pass
            // the parent element of the current text node. If the parent
            // element contains more than one child, a nodeMatch parameter is
            // added; this way, the text node in concern can laber be addressed
            // unambiguously by evaluating element and nodeMatch.
            nodeMatch = (j === 1) ? null : {type : 'child', value : i};
            me.textsByLine[me.line_n].push(new Text(element, opts, true, text, nodeMatch));
          }
        } else {
          switch (childNodes[i].localName) {
            case undefined :
              break;
            case 'lb' :
              me.breakLine();
              break;
            case 'title' :
              atts = Util.attsToObj(childNodes[i]);
              defaults = {
                halign : 'center'
              };
              me.htmlToArray(childNodes[i], $.extend({}, opts, defaults, atts));
              me.breakLine();
              break;
            default :
              atts = Util.attsToObj(childNodes[i]);
              me.htmlToArray(childNodes[i], $.extend({}, opts, atts));
              // FIXME handle line breaks differently
              if (atts.halign == 'center') {
                me.breakLine();
              }

          }
        }
      }
    },

    breakLine : function () {
      var me = this;
      me.line_n += 1;
      me.textsByLine[me.line_n] = [];
    },

    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    draw : function () {
      var me = this, leftTexts, centerTexts, rightTexts, maxFontSizeInLine, i, j, k, l, textLine, text;

      var currentCoords = {
        x : me.currentCoords.x,
        y : me.currentCoords.y,
        w : me.currentCoords.w
      };

      for (i = 0, j = me.textsByLine.length; i < j; i++) {
        textLine = me.textsByLine[i];
        leftTexts = [];
        centerTexts = [];
        rightTexts = [];
        maxFontSizeInLine = 0;

        for (k = 0, l = textLine.length; k < l; k++) {
          text = textLine[k];
          text.setContext(me.ctx).preProcess(me.scale);
          text.setTextAlign('left');
          switch (text.atts.halign) {
            case 'center' :
              centerTexts.push(text);
              break;
            case 'right' :
              rightTexts.push(text);
              break;
            default :
              leftTexts.push(text);
          }
        }

        maxFontSizeInLine =
        Math.max(me.drawCenterTexts(centerTexts, currentCoords), me.drawRightAlignedTexts(rightTexts, currentCoords), me.drawLeftAlignedTexts(leftTexts, currentCoords));

        currentCoords.y += maxFontSizeInLine * me.lineHeight;

      }
    },

    drawCenterTexts : function (centerTexts, currentCoords) {
      var me = this, maxFontSize, totalTextWidth = 0, i;

      i = centerTexts.length;
      while (i--) {
        totalTextWidth += centerTexts[i].w;
      }

      maxFontSize = me.drawLeftAlignedTexts(centerTexts, {
        x : currentCoords.x + (currentCoords.w / 2) - (totalTextWidth / 2),
        y : currentCoords.y,
        w : currentCoords.w
      }, me.ctx);
      return maxFontSize;
    },

    drawRightAlignedTexts : function (rightTexts, currentCoords) {
      var maxH = 0, offsetX = 0, obj, i;
      i = rightTexts.length;
      while (i--) {
        obj = rightTexts[i];
        offsetX += obj.w;
        obj.setX(currentCoords.x + currentCoords.w - offsetX);
        obj.setY(currentCoords.y + obj.h);
        obj.draw();
        maxH = Math.max(obj.h, maxH);
      }
      return maxH;
    },

    drawLeftAlignedTexts : function (leftTexts, currentCoords) {
      var maxH = 0, offsetX = 0;
      $.each(leftTexts, function (i, obj) {
        obj.setX(currentCoords.x + offsetX);
        obj.setY(currentCoords.y + obj.h);
        obj.draw();
        offsetX += obj.w;
        maxH = Math.max(obj.h, maxH);
      });
      return maxH;
    }

  };

  return PgHead;

});
