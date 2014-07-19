var Inspector = function () {
  this.init();
};

Inspector.prototype = {

  init : function () {
    var me = this;

    me.handlers = {

      onEnterMeasure : function (measureArea, element, e) {
        $('#measureinfo').text('M. ' + measureArea.measureN + '-' + measureArea.staffN);
      },

      onLeaveMeasure : function (measureArea, element, e) {
        $('#measureinfo').text('');
      },

      onEnterNote : function (noteArea, element, e) {
        if (noteArea.meiElement) {
          info =
          '<div class="tt-code">' + me.processAreaInfo(noteArea) + '</div>' + me.getXPathString(noteArea.meiElement);
        } else {
          info = '(no MEI element provided)';
          console.log('no mei element provided. parameters:');
          console.log(arguments);
        }

        var elementOffset = $(element).offset();
        // note: "this.scale" refers to the scale property in the AreaCollection object
        me.tooltip.enterNote(info, elementOffset.left + (noteArea.ctx.x * this.scale), elementOffset.top +
                                                                                       (noteArea.ctx.y1 * this.scale) +
                                                                                       20);
      },

      onLeaveNote : function (noteArea, element, e) {
        me.tooltip.leaveNote();
      },

      onVariantClick : function (area, element, e) {
        alert('OK');
        // return false to stop the event from bubbling to other layers
        return false;
      },

      onEnterVariant : function (area, element, e) {
        var info, elementOffset;
        element.style.cursor = 'pointer';
        info = (area.alt.elem) ? me.getElementInfo(area.alt.elem) : '(no MEI element provided)';
        console.log('no mei element provided. parameters:');
        console.log(arguments);
        elementOffset = $(element).offset();
        me.tooltip.enterVariant(info, elementOffset.left + (area.ctx.x * this.scale), elementOffset.top +
                                                                                      (area.ctx.y1 * this.scale) + 20);
      },

      onLeaveVariant : function (area, element, e) {
        element.style.cursor = 'default';
        me.tooltip.leaveVariant();
      }

    };

    me.tooltip = {
      noteTooltipActive : false,
      variantTooltipActive : false,

      element : $('#tooltip'),

      leaveVariant : function () {
        this.variantTooltipActive = false;
        this.hide();
      },

      leaveNote : function () {
        this.noteTooltipActive = false;
        this.hide();
      },

      enterVariant : function () {
        this.variantTooltipActive = true;
        this.show.apply(this, arguments);
      },

      enterNote : function () {
        this.noteTooltipActive = true;
        this.show.apply(this, arguments);
      },

      hide : function () {
        if (!this.noteTooltipActive && !this.variantTooltipActive) {
          this.element.css('left', '-1000px')
        }
      },

      show : function (html, x, y) {
        this.element.html(html);
        this.element.css({
          'left' : Math.min(x, $(window).width() - 400) + 'px',
          'top' : y + 'px'
        });
      }
    };
    me.tooltip.hide();
  },

  render : function (docName, options) {
    var me = this, options = options || {};

    console.time('m');
    MSV.Logger.setEnabled(true);
    var mei2vf = new MSV.Viewer({
      xmlDoc : loadXMLDoc(docName),
      target : $('#tests').append('<h3>' + docName + '</h3>'),
      autoStaveConnectorLine : options.autoStaveConnectorLine || false,
      autoMeasureNumbers : true,
      page_height: options.page_height,
      labelMode : 'full',
      staff : {
        fill_style : '#000'
      },

      layers : [
        new MSV.DefaultAreaCollection({
          content : ['measures'],
          //highlightMode : 'hover',
          mouseEnterHandler : me.handlers.onEnterMeasure,
          mouseLeaveHandler : me.handlers.onLeaveMeasure
        }),
        new MSV.DefaultAreaCollection({
          content : [
            'notes',
            'barlines',
            'measure_modifiers',
            'anchoredTexts',
            'pgHead'
          ],
          highlightMode : 'hover',
          mouseEnterHandler : me.handlers.onEnterNote,
          mouseLeaveHandler : me.handlers.onLeaveNote
        }),
        new MSV.DefaultAreaCollection({
          content : ['variants'],
          highlightMode : 'static',
          fillStyle : 'rgba(255, 0, 0, 0.7)',
          clickHandler : me.handlers.onVariantClick,
          mouseEnterHandler : me.handlers.onEnterVariant,
          mouseLeaveHandler : me.handlers.onLeaveVariant
        }),
        {
          type : 'vex'
        }
      ]
    });
    console.timeEnd('m');
  },

  processAreaInfo : function (area) {
    var me = this, element, nodeMatch;
    element = area.meiElement;
    nodeMatch = area.meiNodeMatch;
    if (nodeMatch) {
      switch (nodeMatch.type) {
        case 'child':
          var text = $.trim(element.childNodes[nodeMatch.value].nodeValue);
          if (text.length === 0) text = '<span class="ace_comment">[space-only]</span>';
          return '<span class="xml-text">' + text + '</span>';
      }
    }
    return me.getElementInfo(element);
  },

  getElementInfo : function (element) {
    var me = this, appendix, childNodes, i, j;

    childNodes = element.childNodes;
    j = childNodes.length;
    if (j > 0) {
      appendix = '&gt;';
      for (i = 0; i < j; i++) {
        if (childNodes[i].nodeName === '#text') {
          appendix += '<span class="xml-text">' + $.trim(childNodes[i].nodeValue) + '</span>';
        } else if (childNodes[i].localName) {
          appendix += '<div style="margin-left:2em">' + me.getElementInfo(childNodes[i]) + '</div>';
        }
      }
      ;
      appendix += '&lt;/<span class="xml-element-name">' + element.localName + '</span>&gt;';
    } else {
      appendix = '/&gt;';
    }
    return '<span class="xml-element-tag">&lt;<span class="xml-element-name">' + element.localName + '</span> ' +
           me.attsToString(element) + appendix + '</span><br/>';
  },

  getXPathString : function (element) {
    var me = this, elements = [me.getXPathElementInfo(element)];
    while (( element = element.parentElement)) { elements.push(me.getXPathElementInfo(element))}
    ;
    return '<div class="tt-xpath">' + elements.reverse().join('/') + '</div>';
  },

  getXPathElementInfo : function (element) {
    var nString, parent, i;
    if (element.hasAttribute('n')) {
      return element.localName + '[n=' + element.getAttribute('n') + ']';
    }
    return element.localName;
  },

  attsToString : function (element) {
    var result = '', i, j, atts, att;
    if (element.hasAttributes()) {
      atts = element.attributes;
      for (i = 0, j = atts.length; i < j; i += 1) {
        att = atts.item(i);
        result += ' <span class="xml-attr-name">' + att.nodeName + '="<span class="xml-attr-value">' + att.nodeValue +
                  '</span>"</span>';
      }
    }
    return result;
  }

};
