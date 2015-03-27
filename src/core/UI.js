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
  'common/Logger',
  'common/RuntimeError'
], function ($, VF, Logger, RuntimeError) {
  /**
   * @exports core/UI
   */

  /**
   * @class UI
   */
  var UI = function () {
    this.init();
  };

  UI.prototype = {

    init : function () {
      var me = this;
      me.mouseClickHandlers = [];
      me.mouseMoveHandlers = [];
      me.vexLayerIndex = null;
    },

    setSize : function (height, width, scale) {

      var me = this, i, j, scaledHeight, scaledWidth, canvas;

      me.scale = scale;

      scaledHeight = height * scale;
      scaledWidth = width * scale;

      me.outerDiv.style.marginLeft = (scaledWidth / 2) + 'px';
      me.outerDiv.style.marginRight = (scaledWidth / 2) + 'px';

      me.innerDiv.style.height = scaledHeight + 'px';
      me.innerDiv.style.left = (-scaledWidth / 2) + 'px';

      j = me.layers.length;
      for (i = 0; i < j; i++) {

          canvas = me.layers[i].element;

          if (canvas.localName === 'canvas') {

              canvas.width = scaledWidth;
              canvas.height = scaledHeight;
              if (typeof me.layers[i].setContext === 'function') {
                  var ctx = canvas.getContext('2d');
                  me.layers[i].setContext(ctx);
                  me.layers[i].setScale(scale);
              }
              me.layers[i].ctx.scale(scale, scale);

          } else {
              var svgElement = me.layers[i].ctx.svg;
              me.layers[i].ctx.resize(scaledWidth, scaledHeight);
              me.layers[i].ctx.scale(scale, scale);
          }

      }
    },

    zoom : function (scale, drawFn, scope) {
      var me = this, canvas, ctx, i, j;

      for (i = 0, j = me.layers.length; i < j; i++) {
        canvas = me.layers[i].element;
        ctx = me.layers[i].ctx;
        ctx.scale(scale, scale);
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      me.scale *=scale;

      if (scope && typeof drawFn === 'function') {
        drawFn.call(scope, me.layers[me.vexLayerIndex].ctx);
      }


      //  var scaleFactor = 1.1;
      //  var zoom = function(clicks){
      //    var pt = ctx.transformedPoint(lastX,lastY);
      //    ctx.translate(pt.x,pt.y);
      //    var factor = Math.pow(scaleFactor,clicks);
      //    ctx.scale(factor,factor);
      //    ctx.translate(-pt.x,-pt.y);
      //    redraw();
      //  }

    },


    createLayers : function (cfg, scale) {
      var me = this, element, ctx, i, j, layers, hasVexLayer = false;

      me.scale = scale;

      // unwrap target if it's a jQuery object
      var target = cfg.target[0] || cfg.target;

      layers = cfg.layers;
      j = layers.length;

      while (j--) {
        if (layers[j].type === 'vex') hasVexLayer = true;
      }

      // add VexFlow layer if no VexFlow layer has been specified
      if (!hasVexLayer) {
        Logger.debug('UI.createLayers()', 'No VexFlow layer specified. Adding it.');
        layers.push({
          type : 'vex'
        });
      }

      me.outerDiv = me.createOuterDiv();
      me.outerDiv.appendChild(me.innerDiv = me.createInnerDiv());

      for (i = 0, j = layers.length; i < j; i++) {

        if (layers[i].type === 'vex') {
            element = me.createCanvas((cfg.backend === VF.Renderer.Backends.CANVAS) ? 'canvas':'div');
            me.innerDiv.appendChild(element);
          me.vexLayerIndex = i;
          ctx = me.createVexContext(element, cfg.backend);
          layers[i].element = element;
          layers[i].ctx = ctx;
        } else if (layers[i].type === 'highlighter') {
            element = me.createCanvas('canvas');
            me.innerDiv.appendChild(element);
          layers[i].setElement(element);
        } else {
          throw new RuntimeError('Layer type "' + layers[i].type + '" not valid.');
        }
      }

      target.appendChild(me.outerDiv);

      /**
       * @property {Object} topCanvas the top canvas containing the regular
       * MEI2VF output to which the mouse listeners get added.
       */
      me.topCanvas = layers[layers.length - 1].element;
      me.layers = layers;
      return layers;
    },

    /**
     * Creates a single canvas element or element container
     * @param {String} elementName the name of the element to create; 'canvas' for
     * HTML5 canvases, 'div' for a SVG canvas container
     * @returns {HTMLElement}
     */
    createCanvas : function (elementName) {
      var canvas = document.createElement(elementName);
      canvas.style.position = 'absolute';
      canvas.style.background = 'transparent';
      return canvas;
    },

    /**
     * Creates the outer div wrapper for the canvases
     * @returns {HTMLElement}
     */
    createOuterDiv : function () {
      var div = document.createElement('div');
      div.className = "outer-container";
      return div;
    },

    /**
     * Creates the inner div wrapper for the canvases
     * @returns {HTMLElement}
     */
    createInnerDiv : function () {
      var innerDiv = document.createElement('div');
      innerDiv.className = "inner-container";
      innerDiv.style.position = "relative";
      innerDiv.style.width = "100%";
      innerDiv.style.margin = "auto";
      return innerDiv;
    },

    createVexContext : function (canvas, backend) {
      return new VF.Renderer(canvas, backend || VF.Renderer.Backends.SVG).getContext();
    },

    //    scaleContext : function (ctx, cfg) {
    //      var me = this, paper, w, h;
    //      if (+cfg.backend === VF.Renderer.Backends.RAPHAEL) {
    //        //        paper = ctx.paper;
    //        //        h = cfg.pageHeight;
    //        //        w = cfg.pageWidth;
    //        //        paper.setSize(w * scale, h * scale);
    //        //        paper.setViewBox(0, 0, w, h);
    //      } else {
    //        ctx.scale(me.scale, me.scale);
    //      }
    //    },

    registerMouseClickHandler : function (handler) {
      var me = this;
      me.mouseClickHandlers.push(handler);
    },

    registerMouseMoveHandler : function (handler) {
      var me = this;
      me.mouseMoveHandlers.push(handler);
    },

    listenMouseClick : function () {
      var me = this;
      $(me.topCanvas).on('click', function (e) {
        var offset, mousePos, i;
        offset = $(this).offset();
        mousePos = {
          x : (e.pageX - offset.left) / me.scale,
          y : (e.pageY - offset.top) / me.scale
        };
        i = me.mouseClickHandlers.length;
        while (i--) {
          // if onClick returns false, events will not bubble up to the following layers
          if (me.mouseClickHandlers[i].onClick(mousePos, me.topCanvas, e) === false) {
            return;
          }
        }
      });
    },

    listenMouseMove : function () {
      var me = this;
      me.topCanvas.onmouseleave = function (e) {
        var i = me.mouseMoveHandlers.length;
        while (i--) {
          me.mouseMoveHandlers[i].removeHighlight();
          if (me.mouseMoveHandlers[i].mouseLeaveHandler) {
            me.mouseMoveHandlers[i].mouseLeaveHandler(null, me.topCanvas, e);
          }
        }
      };

      me.topCanvas.addEventListener('mousemove', function (e) {
        var offset, mousePos, i;
        offset = $(this).offset();
        mousePos = {
          x : (e.pageX - offset.left) / me.scale,
          y : (e.pageY - offset.top) / me.scale
        };
        i = me.mouseMoveHandlers.length;
        while (i--) {
          // if onMouseMove returns false, events will not bubble up to the following layers
          if (me.mouseMoveHandlers[i].onMouseMove(mousePos, me.topCanvas, e) === false) {
            return;
          }
        }
      });
    },

    registerMouseHandlers : function () {
      var i, layer, me = this, layers = me.layers;
      i = layers.length;
      while (i--) {
        layer = layers[i];
        if (layer.type === 'highlighter') {
          if (layer.clickHandler) {
            me.registerMouseClickHandler(layer);
          }
          if (layer.highlightMode === 'hover' || (layer.mouseEnterHandler && layer.mouseLeaveHandler)) {
            me.registerMouseMoveHandler(layer);
          }
        }
      }
      me.listenMouseClick();
      me.listenMouseMove();
    }

  };

  return UI;

});
