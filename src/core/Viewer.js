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
  'common/Util',
  'meilib/MeiLib',
  'msv/core/ExtendedConverter',
  'msv/core/Document',
  'common/RuntimeError',
  'msv/core/UI',
  'msv/areas/AreaHelper',
  'msv/pre/PreProcessor'
], function (Util, MeiLib, ExtendedConverter, Document, RuntimeError, UI, AreaHelper, PreProcessor) {
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
    if (config) {
      this.init(config);
    }
  };

  Viewer.prototype = {

    defaults : {
      /**
       * @cfg (Boolean) useMeiLib Specifies if the MeiLib library should be used to pre-process the input XML document. Necessary when there are variants in the MEI document.
       */
      useMeiLib : false,
      /**
       * @cfg (Object[]) preProcess XML document pre-processing options. Set falsy if pre-processing should be skipped completely.
       */
      preProcess : [
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
        throw new RuntimeError('No config passed to init function.');
      }

      if (!config.data) {
        throw new RuntimeError('No XML document passed to init function.');
      }

      xmlDoc = Document.initXmlDoc(config.data);

      firstScoreDef = xmlDoc.getElementsByTagName('scoreDef')[0];
      if (!firstScoreDef) {
        throw new RuntimeError('No <scoreDef> found in config.data.');
      }

      me.cfg = Util.extend({}, me.defaults, Document.getMEIPageConfig(firstScoreDef), config);

      if (me.cfg.preProcess) {
        PreProcessor.process(xmlDoc, me.cfg.preProcess);
      }

      me.converter = new ExtendedConverter(me.cfg);
      me.UI = new UI();

      // TODO improve
      me.UI.redraw = function() {
        me.converter.draw(this.layers[this.vexLayerIndex].ctx);
//        me.converter.draw(this.layers[this.vexLayerIndex].ctx, Math.round((1/this.scale)*2)/2);
//        me.converter.draw(this.layers[this.vexLayerIndex].ctx, Math.floor(1/this.scale) || 1);
      };


      me.converter.reset();
      if (me.cfg.useMeiLib) {
        meiDoc = new MeiLib.MeiDoc(xmlDoc);
        me.converter.process(meiDoc.sectionview_score);
      } else {
        me.converter.process(xmlDoc);
      }

      layers = me.UI.createLayers(me.cfg, me.converter.cfg.pageScale);

//      layers = me.UI.createLayers(me.cfg, 1);

      me.converter.format(layers[me.UI.vexLayerIndex].ctx);

      var height = me.converter.cfg.pageHeight || me.converter.pageInfo.getCalculatedHeight();
      var width = me.converter.cfg.pageWidth || me.converter.pageInfo.getCalculatedWidth();

//            me.UI.setSize(400, 800, 1);
      me.UI.setSize(height, width, me.converter.cfg.pageScale);

      me.converter.draw(layers[me.UI.vexLayerIndex].ctx);
//      me.UI.zoom(-4)

      me.areaHelper = new AreaHelper(me);
      me.areaHelper.setAreas(meiDoc, layers);

      me.UI.registerMouseHandlers();
    },

    zoom : function (scale) {
      var me = this;
//      me.UI.zoom(scale);


      me.converter.cfg.pageScale += scale;

      var height = me.converter.cfg.pageHeight || me.converter.pageInfo.getCalculatedHeight();
      var width = me.converter.cfg.pageWidth || me.converter.pageInfo.getCalculatedWidth();
      me.UI.setSize(height, width, me.converter.cfg.pageScale);

      me.converter.draw(me.UI.layers[me.UI.vexLayerIndex].ctx);

    }

  };

  return Viewer;

});