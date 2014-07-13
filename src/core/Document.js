define([
  'meitovexflow'
], function (m2v, undefined) {


  /**
   * @class MSV.Document
   * @singleton
   */
  var Document = {

    /**
     * initializes an xml document; if a string is passed, it gets parsed
     *
     * @param {String|XMLDocument} xmlDoc the input string / input XML document
     * object. If you pass a document object, be sure that it is an XMLDocument, not
     * an HTMLDocument.
     * @return {XMLDocument} the xml document to be rendered
     */
    initXmlDoc : function (xmlDoc) {
      return (typeof xmlDoc === 'string') ? this.parseXML(xmlDoc) : (xmlDoc[0] || xmlDoc);
    },

    parseXML : function (str) {
      var xmlDoc, parser;
      if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(str, "text/xml");
      } else // Internet Explorer
      {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(str);
      }
      return xmlDoc;
    },

    /**
     * checks if descendants of the provided element have xml:ids; adds xml:ids
     * if they are missing
     * @param {Element} element
     */
    ascertainDescendantIds : function (element, prefix) {
      var i, items = element.getElementsByTagName("*");
      for (i = items.length; i--;) {
        if (!items[i].hasAttribute('xml:id')) {
          items[i].setAttribute('xml:id', prefix + i);
        }
      }
    },

    /**
     * Gets the MEI page config from a scoreDef element.
     * @param {Element} scoreDef The scoreDef element.
     * @return {Object} the config object
     */
    getMEIPageConfig : function (scoreDef) {
      var obj = m2v.Util.attsToObj(scoreDef);
      var convert = function (input) {
        return (isNaN(input) || input.length === 0) ? undefined : +input;
      };
      return {
        page_scale : parseInt(obj['page.scale'], 10) / 100 || undefined,
        page_height : convert(obj['page.height']),
        page_width : convert(obj['page.width']),
        page_margin_top : convert(obj['page.topmar']),
        page_margin_left : convert(obj['page.leftmar']),
        page_margin_right : convert(obj['page.rightmar'])
      };
    }
  };

  return Document;

});
