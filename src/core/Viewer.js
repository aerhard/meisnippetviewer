define([
  'jquery',
  'vexflow',
  'meitovexflow',
  'core/Document',
  'core/RuntimeError',
  'core/UI',
  'areas/AreaHelper',
  'mei2text/AnchoredTexts',
  'mei2text/MeasureNumbers',
  'mei2text/PgHead'
], function ($, VF, m2v, Document, RuntimeError, UI, AreaHelper, AnchoredTexts, MeasureNumbers, PgHead, undefined) {

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
       * @cfg {Number} page_scale The page scale (set 1 for 100%, 0.5 for 50%
       * etc.)
       */
      page_scale : 1,
      /**
       * @cfg {Number} page_height The height of the page.
       */
      page_height : 350,
      /**
       * @cfg {Number} page_width The width of the page.
       */
      page_width : 800,
      /**
       * @cfg {Boolean} autoMeasureNumbers Specifies if measure numbers should
       * automatically be added to each system start
       */
      autoMeasureNumbers : false,
      /**
       * @cfg {Object} measureNumberFont The staff font (used for barlines)
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
       * @cfg {Object} staff Staff options (For details, see the comments in VexFlow's `stave.js`)
       */
      staff : {
        fill_style : "#000000"
      },
      /**
       * @cfg (Boolean) useMeiLib Specifies if the MeiLib library should be used.
       * Set this only to false if there are no variants in the MEI document.
       */
      useMeiLib : true,
      /**
       * @cfg {Boolean} checkXmlIds If set to false, the check run for missing
       * xml:ids will be skipped. Xml:ids are necessary for the
       * viewer to work: Set this option only to `false` if you are sure that
       * no xml:ids are missing in the input file.
       */
      checkXmlIds : true,
      /**
       * @cfg {String} xmlIdPrefix The prefix of the xml:ids added by the
       * viewer. Needs only to be changed if {@link #checkXmlIds} is `true` and
       * the processed MEI document contains xml:ids starting with `M2V`.
       */
      xmlIdPrefix : 'M2V',
      /**
       * @cfg {Object[]} layers The canvas layers. (optional)
       *
       * Can be either a subclass of {@link MSV.AreaCollection} like
       * {@link MSV.DefaultAreaCollection} or, to specify the layer to contain
       * the VexFlow output, an object with the property `type` with the value `vex`.
       * The first layer will be the bottom-most, the last one the top-most.
       * If no VexFlow layer is specified, a VexFlow Layer gets added automatically
       * as the top-most layer.
       */
      layers : []
    },

    init : function (config) {
      var me = this, xmlDoc, firstScoreDef, cfg, canvas, ctx, meiDoc, layers;

      if (!config) {
        throw new RuntimeError('NoConfig', 'No config passed to Viewer.');
      }

      if (!config.xmlDoc) {
        throw new RuntimeError('MissingData', 'No XML document passed to Viewer.');
      }

      xmlDoc = Document.initXmlDoc(config.xmlDoc);

      window.xx = xmlDoc;

      firstScoreDef = xmlDoc.getElementsByTagName('scoreDef')[0];
      if (!firstScoreDef) {
        throw new RuntimeError('BadMEIFile', 'No <scoreDef> found in config.data.');
      }

      me.cfg = $.extend(true, {}, me.defaults, Document.getMEIPageConfig(firstScoreDef), config);

      if (me.cfg.checkXmlIds) {
        Document.ascertainDescendantIds(xmlDoc, me.cfg.xmlIdPrefix);
      }

      if (me.cfg.useMeiLib) {
        meiDoc = new MeiLib.MeiDoc(xmlDoc);
        meiDoc.initSectionView();
        me.convertMEI(meiDoc.sectionview_score);
      } else {
        me.convertMEI(xmlDoc);
      }

      me.UI = new UI();
      layers = me.UI.createLayers(me.cfg);

      me.drawMEI(layers[me.UI.vexLayerIndex].ctx);

      me.areaHelper = new AreaHelper(me);
      me.areaHelper.setAreas(meiDoc, layers);

      me.registerMouseHandlers(me.UI, layers);
    },

    registerMouseHandlers : function (UI, layers) {
      var me = this, i, layer;
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
      var me = this;
      /**
       * @property {MEI2VF.Converter} converter the MEI2VF converter
       */
      me.converter = new m2v.Converter(me.cfg);
      me.anchoredTexts = new AnchoredTexts(me.cfg.anchoredTextFont);

      // TODO add behaviour: when no top coords are specified, make beginning
      // of music relative to pgHead

      var headEl = xmlDoc.getElementsByTagName('pgHead')[0];

      if (headEl) {
        me.pgHead = new PgHead(headEl, {
          x : me.converter.printSpace.left,
          y : 200,
          w : me.converter.printSpace.width
        });
      }

      me.converter.process(xmlDoc);

      if (me.cfg.autoMeasureNumbers) {
        me.measureNumbers = new MeasureNumbers(me.cfg.measureNumberFont);
        me.measureNumbers.addToSystemStarts(me.converter.getSystems());
      }

      me.allVexMeasureStaffs = me.converter.getAllVexMeasureStaffs();

      var anchoredTextEls = xmlDoc.getElementsByTagName('anchoredText');
      for (var i=0, j = anchoredTextEls.length; i<j;i++){
        me.anchoredTexts.addText(anchoredTextEls[i]);
      }

    },

    drawMEI : function (ctx) {
      var me = this;
      me.converter.draw(ctx);
      if (me.pgHead) me.pgHead.setContext(ctx).draw();
      me.anchoredTexts.setContext(ctx).draw(me.allVexMeasureStaffs);
    }

  };

  return Viewer;

});