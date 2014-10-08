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
  'msv/mei2text/Text'
], function ($, VF, Text) {
  /**
   * @exports mei2text/AnchoredTexts
   */

  /**
   * @class MEI2TEXT.AnchoredTexts
   * @private
   *
   * @constructor
   */
  var AnchoredTexts = function (font) {
    var me = this;

    me.font = font;

    me.allTexts = [];
  };

  AnchoredTexts.prototype = {

    getAll : function () {
      return this.allTexts;
    },

    /**
     * Creates a model object from an element and adds it to {@link #allTexts}
     * @param {Element} element
     * @stave {Stave}
     */
    addText : function (element, stave) {
      var me = this;
      var text = new Text(element, {
        fontfamily : me.font.family,
        fontweight : me.font.weight,
        fontsize : me.font.size,
        fontstyle : ''
      });
      text.setContainer (stave);
      me.allTexts.push(text);
    },

    /**
     * Gets an element's first ancestor with the specified localName
     * @param {Element} element the start element
     * @param {String} localName the localName of the ancestor
     * @returns {Element}
     */
    getAncestor : function (element, localName) {
      while (( element = element.parentElement) && (element.localName !== localName)) {}
      return element;
    },

    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    draw : function () {
      var me = this, stave, ctx = me.ctx;
      $.each(me.allTexts, function () {

        if (!this.y) {
          stave = this.getContainer();
          this.setY(stave.getYForLine(3) - 4 + (+this.atts.vo * stave.getSpacingBetweenLines() / 2 || 0));
        }
        if (!this.x) {
          if (!stave) {
            stave = this.getContainer();
          }
          this.setX(stave.getGlyphStartX() + (+this.atts.ho * stave.getSpacingBetweenLines() / 2 || 0));
        }

        this.setContext(ctx).preProcess().draw();

      });
    }
  };

  return AnchoredTexts;

});
