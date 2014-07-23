define([
  'jquery',
  'vexflow',
  'core/Logger',
  'core/RuntimeError'
], function ($, VF, Logger, RuntimeError, undefined) {

  /**
   * @class MSV.UI
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

    createLayers : function (cfg) {
      var me = this, h, w, canvases = '', element, ctx, i, j, div, layers, hasVexLayer = false, canvasTemplate;

      me.scale = cfg.page_scale;

      // unwrap target if it's a jQuery object
      var target = cfg.target[0] || cfg.target;

      layers = cfg.layers;
      h = cfg.page_height * cfg.page_scale;
      w = cfg.page_width * cfg.page_scale;
      j = layers.length;

      while (j--) {
        if (layers[j].type === 'vex') hasVexLayer = true;
      }

      // add VexFlow layer if no VexFlow layer has been specified
      if (!hasVexLayer) {
        Logger.log('UI.createLayers()', 'No VexFlow layer specified. Adding it.');
        layers.push({
          type : 'vex'
        });
      }

      var div = me.createOuterDiv(w);
      div.appendChild(innerDiv = me.createInnerDiv(w, h));

      for (var i = 0, j = layers.length; i < j; i++) {
        element = me.createCanvas(w, h);
        innerDiv.appendChild(element);

        if (layers[i].type === 'vex') {
          me.vexLayerIndex = i;
          ctx = me.createVexContext(element, cfg.backend);
          layers[i].element = element;
          layers[i].ctx = ctx;
        } else if (layers[i].type === 'highlighter') {
          ctx = element.getContext('2d');
          layers[i].setElement(element);
          layers[i].setContext(ctx);
          layers[i].setScale(cfg.page_scale);
        } else {
          throw new RuntimeError('Configuration Error', 'Layer type "' + layers[i].type + '" not valid.');
        }
        me.scaleContext(ctx, cfg);
      }

      target.appendChild(div);

      /**
       * @property {Object} topCanvas the top canvas containing the regular
       * MEI2VF output to which the mouse listeners get added.
       */
      me.topCanvas = layers[layers.length - 1].element;
      return layers;
    },

    /**
     * Creates a single canvas element
     * @param w
     * @param h
     * @returns {HTMLElement}
     */
    createCanvas : function (w, h) {
      var canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.style.position = 'absolute';
      canvas.style.background = 'transparent';
      return canvas;
    },

    /**
     * Creates the outer div wrapper for the canvases
     * @param w
     * @returns {HTMLElement}
     */
    createOuterDiv : function (w) {
      var div = document.createElement('div');
      div.className = "outer-container";
      div.style.marginLeft = (w / 2) + 'px';
      div.style.marginRight = (w / 2) + 'px';
      return div;
    },

    /**
     * Creates the inner div wrapper for the canvases
     * @param w
     * @param h
     * @returns {HTMLElement}
     */
    createInnerDiv : function (w, h) {
      var innerDiv = document.createElement('div');
      innerDiv.className = "inner-container";
      innerDiv.style.position = "relative";
      innerDiv.style.width = "100%";
      innerDiv.style.margin = "auto";
      innerDiv.style.height = h + 'px';
      innerDiv.style.left = (-w / 2) + 'px';
      return innerDiv;
    },

    createVexContext : function (canvas, backend) {
      return new VF.Renderer(canvas, backend || VF.Renderer.Backends.CANVAS).getContext();
    },

    scaleContext : function (ctx, cfg) {
      var me = this, paper, w, h;
      if (+cfg.backend === VF.Renderer.Backends.RAPHAEL) {
        paper = ctx.paper;
        h = cfg.page_height;
        w = cfg.page_width;
        paper.setSize(w * scale, h * scale);
        paper.setViewBox(0, 0, w, h);
      } else {
        ctx.scale(me.scale, me.scale);
      }
    },

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
    }

  };

  return UI;

});
