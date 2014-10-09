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
  'meilib/MeiLib',
  'mei2vf/Converter',
  'msv/core/Document',
  'common/RuntimeError',
  'msv/core/UI',
  'msv/areas/AreaHelper',
  'msv/mei2text/AnchoredTexts',
  'msv/mei2text/MeasureNumbers',
  'msv/mei2text/PgHead',
  'msv/pre/PreProcessor'
], function ($, VF, MeiLib, Converter, Document, RuntimeError, UI, AreaHelper, AnchoredTexts, MeasureNumbers, PgHead, PreProcessor) {
  /**
   * @exports core/Viewer
   */

  /**
   * @class MSV.Viewer
   *
   * @constructor
   * @param {Object} config For a full list, see the config options of the
   * Viewer object as well as the converter options at {@link MEI2VF.Converter
     * MEI2VF.Converter}
   */
  var Viewer = function (config) {
    this.init(config);
  };

  Viewer.prototype = {

    defaults : {
      /**
       * @cfg {Number} pageScale The page scale (set 1 for 100%, 0.5 for 50%
       * etc.)
       */
      pageScale : 1,
      /**
       * @cfg {Number} pageHeight The height of the page. Null for auto height
       */
      pageHeight : null,
      /**
       * @cfg {Number} pageWidth The width of the page. Null for auth width
       */
      pageWidth : null,
      /**
       * @cfg {Boolean} autoMeasureNumbers Specifies if measure numbers should
       * automatically be added to each system start
       */
      autoMeasureNumbers : false,
      /**
       * @cfg {Object} measureNumberFont The measure number font
       * @cfg {String} measureNumberFont.family the font family
       * @cfg {Number} measureNumberFont.size the font size
       * @cfg {String} measureNumberFont.weight the font weight
       */
      measureNumberFont : {
        family : 'Times',
        size : 14,
        weight : 'Italic'
      },
      /**
       * @cfg {Object} anchoredTextFont The anchored text font
       * @cfg {String} anchoredTextFont.family the font family
       * @cfg {Number} anchoredTextFont.size the font size
       * @cfg {String} anchoredTextFont.weight the font weight
       */
      anchoredTextFont : {
        family : 'Times',
        size : 22,
        weight : ''
      },
      /**
       * @cfg (Boolean) useMeiLib Specifies if the MeiLib library should be used to pre-process the input XML document. Necessary when there are variants in the MEI document.
       */
      useMeiLib : false,
      /**
       * @cfg (Boolean) processPgHead Specifies if pgHead elemements should be rendered
       */
      processPgHead : true,
      /**
       * @cfg (Object[]) preProcess XML document pre-processing options. Set falsy if pre-processing should be skipped completely.
       */
      preProcess : [
        'resolveSameAs',
        'resolveCopyOf',
        [
          'addXmlIdPrefix',
          'M2V'
        ],
        'processDefs'
      ],
      /**
       * @cfg {Object[]} layers The canvas layers. (optional)
       *
       * Can be either a subclass of {@link AbstractAreaCollection} like
       * {@link DefaultAreaCollection} or, to specify the layer to contain
       * the VexFlow output, an object with the property `type` with the value `vex`.
       * The first layer will be the bottom-most, the last one the top-most.
       * If no VexFlow layer is specified, a VexFlow Layer gets added automatically
       * as the top-most layer.
       */
      layers : []
    },

    init : function (config) {
      var me = this, xmlDoc, firstScoreDef, meiDoc, layers;

      if (!config) {
        throw new RuntimeError('No config passed to Viewer.');
      }

      if (!config.data) {
        throw new RuntimeError('No XML document passed to Viewer.');
      }

      xmlDoc = Document.initXmlDoc(config.data);

      firstScoreDef = xmlDoc.getElementsByTagName('scoreDef')[0];
      if (!firstScoreDef) {
        throw new RuntimeError('No <scoreDef> found in config.data.');
      }

      me.cfg = $.extend(true, {}, me.defaults, Document.getMEIPageConfig(firstScoreDef), config);

      if (me.cfg.preProcess) {
        PreProcessor.process(xmlDoc, me.cfg.preProcess);
      }

      me.UI = new UI();
      layers = me.UI.createLayers(me.cfg);

      if (me.cfg.useMeiLib) {
        meiDoc = new MeiLib.MeiDoc(xmlDoc);
        //        meiDoc.initSectionView();
        me.convertMEI(meiDoc.sectionview_score, layers[me.UI.vexLayerIndex].ctx);
      } else {
        me.convertMEI(xmlDoc, layers[me.UI.vexLayerIndex].ctx);
      }



      var height, width;

      // if height is specified don't return the calculated height to get same behavior as width
      if (me.cfg.pageHeight) {
        height = me.cfg.pageHeight;
      } else {
        height = me.converter.pageInfo.getCalculatedHeight();
      }
      if (me.converter.pageInfo.hasCalculatedWidth()) {
        width = me.converter.pageInfo.getCalculatedWidth();
      } else {
        width = me.cfg.pageWidth;
      }

      me.UI.setSize(height, width, me.cfg.pageScale);

      if (me.pgHead) {
        me.pgHead.setWidth(me.converter.pageInfo.getPrintSpace().width);
        me.pgHead.setContext(layers[me.UI.vexLayerIndex].ctx).draw();
      }

      me.drawMEI(layers[me.UI.vexLayerIndex].ctx);

      me.areaHelper = new AreaHelper(me);
      me.areaHelper.setAreas(meiDoc, layers);

      me.registerMouseHandlers(me.UI, layers);
    },

    registerMouseHandlers : function (UI, layers) {
      var i, layer;
      i = layers.length;
      while (i--) {
        layer = layers[i];
        if (layer.type === 'highlighter') {
          if (layer.clickHandler) {
            UI.registerMouseClickHandler(layer);
          }
          if (layer.highlightMode === 'hover' || (layer.mouseEnterHandler && layer.mouseLeaveHandler)) {
            UI.registerMouseMoveHandler(layer);
          }
        }
      }
      UI.listenMouseClick();
      UI.listenMouseMove();
    },

    convertMEI : function (xmlDoc, vexCtx) {
      var me = this, pgHeadLowestY;
      /**
       * @property {MEI2VF.Converter} converter the MEI2VF converter
       */
      me.converter = new Converter(me.cfg);

      me.anchoredTexts = new AnchoredTexts(me.cfg.anchoredTextFont);
      me.converter.processAnchoredText = function (element, stave, stave_n, layerDir, staveInfo) {
        me.anchoredTexts.addText(element, stave, stave_n, layerDir, staveInfo);
      };


      var headEl = xmlDoc.getElementsByTagName('pgHead')[0];

      if (me.cfg.processPgHead && headEl) {

        var printSpace = me.converter.pageInfo.getPrintSpace();

        me.pgHead = new PgHead(headEl, {
          x : printSpace.left,
          y : me.converter.pageInfo.pageTopMar,
          w : printSpace.width
        }, me.cfg.pageScale);

        me.pgHead.preFormat(vexCtx);

        pgHeadLowestY = me.pgHead.getLowestY();

        if (pgHeadLowestY) {
          // round the y value in order to prevent blurred staff lines on the canvas
          printSpace.top = Math.ceil(pgHeadLowestY / me.cfg.pageScale);
        }
      }

      me.converter.process(xmlDoc);
      me.converter.format(vexCtx);



      if (me.cfg.autoMeasureNumbers) {
        me.measureNumbers = new MeasureNumbers(me.cfg.measureNumberFont);
        me.measureNumbers.addToSystemStarts(me.converter.getSystems());
      }
    },

    drawMEI : function (ctx) {
      var me = this;
      me.converter.draw(ctx);
      me.anchoredTexts.setContext(ctx).draw();
    }

  };

  return Viewer;

});