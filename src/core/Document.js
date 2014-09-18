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
  'm2v/core/Util'
], function (Util, undefined) {
  /**
   * @exports core/Document
   */

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
     * Gets the MEI page config from a scoreDef element.
     * @param {Element} scoreDef The scoreDef element.
     * @return {Object} the config object
     */
    getMEIPageConfig : function (scoreDef) {
      var obj = Util.attsToObj(scoreDef);
      var convert = function (input) {
        return (isNaN(input) || input.length === 0) ? undefined : +input;
      };
      return {
        pageScale : parseInt(obj['page.scale'], 10) / 100 || undefined,
        pageHeight : convert(obj['page.height']),
        pageWidth : convert(obj['page.width']),
        pageTopMar : convert(obj['page.topmar']),
        pageLeftMar : convert(obj['page.leftmar']),
        pageRightMar : convert(obj['page.rightmar'])
      };
    }
  };

  return Document;

});
