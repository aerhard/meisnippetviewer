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
  'vexflow',
  'mei2vf/Converter',
  'mei2vf/stave/Stave',
  'msv/mei2text/AnchoredTexts',
  'msv/mei2text/MeasureNumbers',
  'msv/mei2text/PgHead'
], function (VF, Converter, Stave, AnchoredTexts, MeasureNumbers, PgHead) {

  var ExtendedConverter = function (config) {
    this.init();

    if (config) {
      this.initConfig(config);
    }
  };

  Vex.Inherit(ExtendedConverter, Converter, {

    init : function () {
      var me = this, defaults = me.defaults;
      /**
       * @cfg {Number} pageScale The page scale (set 1 for 100%, 0.5 for 50%
       * etc.)
       */
      defaults.pageScale = 1;
      /**
       * @cfg {Number} pageHeight The height of the page. Null for auto height
       */
      defaults.pageHeight = null;
      /**
       * @cfg {Boolean} autoMeasureNumbers Specifies if measure numbers should
       * automatically be added to each system start
       */
      defaults.autoMeasureNumbers = false;
      /**
       * @cfg {Object} measureNumberFont The measure number font
       * @cfg {String} measureNumberFont.family the font family
       * @cfg {Number} measureNumberFont.size the font size
       * @cfg {String} measureNumberFont.weight the font weight
       */
      defaults.measureNumberFont = {
        family : 'Times', size : 14, weight : 'Italic'
      };
      /**
       * @cfg {Object} anchoredTextFont The anchored text font
       * @cfg {String} anchoredTextFont.family the font family
       * @cfg {Number} anchoredTextFont.size the font size
       * @cfg {String} anchoredTextFont.weight the font weight
       */
      defaults.anchoredTextFont = {
        family : 'Times', size : 22, weight : ''
      };
      /**
       * @cfg (Boolean) processPgHead Specifies if pgHead elemements should be rendered
       */
      defaults.processPgHead = true;
      /**
       * @cfg (Object[]) preProcess XML document pre-processing options. Set falsy if pre-processing should be skipped completely.
       */

      Stave.prototype.lineColor = '#000000';
    },


    initConfig : function (cfg) {
      var me = this, pgHeadLowestY;
      ExtendedConverter.superclass.initConfig.call(me, cfg);

      if (me.cfg.processPgHead) {

        me.systemInfo.processPgHead = function (element) {
          if (!me.pgHead) {
            var printSpace = me.pageInfo.getPrintSpace();
            me.pgHead = new PgHead(me.cfg.pageScale);
            me.pgHead.processElement(element);
            me.pgHead.setStartXY(printSpace.left, me.pageInfo.pageTopMar + 90); // increase top padding for header
            pgHeadLowestY = me.pgHead.getLowestY();
            if (pgHeadLowestY) {
              // round the y value in order to prevent blurred staff lines on the canvas
              printSpace.top = Math.ceil(pgHeadLowestY) + 30;
            }
          }
        };

        me.systemInfo.processPgFoot = function (element) {
          if (!me.pgFoot) {
            me.pgFoot = new PgHead(me.cfg.pageScale);
            me.pgFoot.processElement(element);
          }
        };

      }
    },

    process : function (xmlDoc) {
      var me = this;
      ExtendedConverter.superclass.process.call(me, xmlDoc);
      if (me.cfg.autoMeasureNumbers) {
        me.measureNumbers.addToSystemStarts(me.getSystems());
      }
    },

    format: function (ctx) {
      var me = this, printSpace = me.pageInfo.getPrintSpace();
      ExtendedConverter.superclass.format.call(me, ctx);
      if (me.pgHead) {
        me.pgHead.setWidth(printSpace.width);
      }
      if (me.pgFoot) {
        me.pgFoot.setStartXY(printSpace.left, me.pageInfo.getLowestY() + 80);
        me.pageInfo.setLowestY(me.pgFoot.getLowestY() + me.pageInfo.pageBottomMar);
        me.pgFoot.setWidth(printSpace.width);
      }
    },

    reset : function () {
      var me = this;
      ExtendedConverter.superclass.reset.call(me);
      me.measureNumbers = new MeasureNumbers(me.cfg.measureNumberFont);
      me.anchoredTexts = new AnchoredTexts(me.cfg.anchoredTextFont);
    },

    processAnchoredText : function (element, stave, stave_n, layerDir, staveInfo) {
      this.anchoredTexts.addText(element, stave, stave_n, layerDir, staveInfo);
    },


    draw : function (ctx) {
      var me = this;

      ExtendedConverter.superclass.draw.call(me, ctx);
      if (me.pgHead) {
        me.pgHead.setContext(ctx).draw();
      }
      if (me.pgFoot) {
        me.pgFoot.setContext(ctx).draw();
      }
      me.anchoredTexts.setContext(ctx).draw();
    }

  });


  return ExtendedConverter;

});