define([
  'jquery',
  'vexflow',
  'meitovexflow',
  'mei2text/Text'
], function ($, VF, m2v, Text, undefined) {

  /**
   * @class MEI2TEXT.PgHead
   * @private
   *
   * @constructor
   */
  var PgHead = function (element, coords) {
    this.init(element, coords);
  };

  PgHead.prototype = {

    init : function (element, coords) {
      var me = this;
      me.defaultFontSize = 25;
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

      me.htmlToArray(element, {
        fontsize : me.defaultFontSize,
        fontweight : '',
        fontstyle : '',
        fontfamily : 'Times'
      });

      /**
       * @property {Number} x The x coordinate of the page head area
       */
      me.x = coords.x;
      /**
       * @property {Number} y The y coordinate of the page head area
       */
      me.y = coords.y;
      /**
       * @property {Number} w The width of the page head area
       */
      me.w = coords.w;

      /**
       * Current coordinates
       * @type {{x: *, y: *, w: *}}
       */
      me.currentCoords = coords;

    },

    getTextsByLine : function () {
      return this.textsByLine;
    },


    htmlToArray : function (element, opts) {
      var me = this, atts, defaults, text, i, j, childNodes, nodeMatch;

      childNodes = element.childNodes;

      for (i = 0, j = childNodes.length; i < j; i++) {

        if (childNodes[i].nodeName === '#text') {
          text = childNodes[i].textContent.replace(/([\n|\r]+\s*)/g, '');
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
              atts = m2v.Util.attsToObj(childNodes[i]);
              defaults = {
                halign : 'center',
                fontsize : (atts.type === 'sub') ? 35 : 50,
                fontweight : 'Bold'
              };
              me.htmlToArray(childNodes[i], $.extend({}, opts, defaults, atts));
              me.breakLine();
              break;
            default :
              me.htmlToArray(childNodes[i], $.extend({}, opts, m2v.Util.attsToObj(childNodes[i])));
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
      var me = this, leftTexts, centerTexts, rightTexts, maxFontSizeInLine, i;

      currentCoords = me.currentCoords;

      var processTextLine = function () {
        leftTexts = [];
        centerTexts = [];
        rightTexts = [];
        maxFontSizeInLine = 0;
        $.each(this, function () {
          this.setContext(me.ctx).preProcess();
          this.setTextAlign('left');
          switch (this.atts.halign) {
            case 'center' :
              centerTexts.push(this);
              break;
            case 'right' :
              rightTexts.push(this);
              break;
            default :
              leftTexts.push(this);
          }
        });

        maxFontSizeInLine =
        Math.max(me.drawCenterTexts(centerTexts, currentCoords), me.drawRightAlignedTexts(rightTexts, currentCoords), me.drawLeftAlignedTexts(leftTexts, currentCoords));

        currentCoords.y += maxFontSizeInLine * me.lineHeight;
      };

      $.each(me.textsByLine, processTextLine);
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
      var me = this, maxH = 0, offsetX = 0, obj, i;
      i = rightTexts.length;
      while (i--) {
        obj = rightTexts[i];
        offsetX += obj.w;
        obj.setX(currentCoords.x + currentCoords.w - offsetX);
        obj.setY(currentCoords.y);
        obj.draw();
        maxH = Math.max(obj.h, maxH);
      }
      return maxH;
    },

    drawLeftAlignedTexts : function (leftTexts, currentCoords) {
      var me = this, maxH = 0, offsetX = 0;
      $.each(leftTexts, function (i, obj) {
        obj.setX(currentCoords.x + offsetX);
        obj.setY(currentCoords.y);
        obj.draw();
        offsetX += obj.w;
        maxH = Math.max(obj.h, maxH);
      });
      return maxH;
    }

  };

  return PgHead;

});
