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

      layers = cfg.layers;

      h = cfg.page_height * cfg.page_scale;

      w = cfg.page_width * cfg.page_scale;
      j = layers.length;

      canvasTemplate =
      '<canvas width="' + w + '" height="' + h + '" style="position:absolute;background-color:transparent;"></canvas>';

      while (j--) {
        if (layers[j].type === 'vex') hasVexLayer = true;
        canvases += canvasTemplate;
      }

      // add VexFlow layer if no VexFlow layer has been specified
      if (!hasVexLayer) {
        Logger.log('UI.createLayers()', 'No VexFlow layer specified. Adding it.');
        layers.push({
          type : 'vex'
        });
        canvases += canvasTemplate;
      }

      div = $('<div class="outer-container" style="margin-left:' + (w / 2) + 'px;margin-right:' + (w / 2) +
              'px;"><div class="inner-container" style="position:relative;width:100%;margin:auto;height:' + h +
              'px;left:-' + (w / 2) + 'px">' + canvases + '</div></div>').appendTo(cfg.target).get(0);

      var canvasElements = div.getElementsByTagName('canvas');

      j = layers.length;
      while (j--) {
        element = canvasElements[j];

        if (layers[j].type === 'vex') {
          me.vexLayerIndex = j;
          ctx = me.createVexContext(element, cfg.backend);
          layers[j].element = element;
          layers[j].ctx = ctx;
        } else if (layers[j].type === 'highlighter') {
          ctx = element.getContext('2d');
          layers[j].setElement(element);
          layers[j].setContext(ctx);
          layers[j].setScale(cfg.page_scale);
        } else {
          throw new RuntimeError('Configuration Error', 'Layer type "' + layers[j].type + '" not valid.');
        }
        me.scaleContext(ctx, cfg);
      }

      /**
       * @property {Object} topCanvas the top canvas containing the regular
       * MEI2VF output to which the mouse listeners get added.
       */
      me.topCanvas = layers[layers.length - 1].element;
      return layers;
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

      $(me.topCanvas).mousemove(function (e) {
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
