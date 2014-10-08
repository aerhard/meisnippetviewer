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
  'common/RuntimeError'
], function (RuntimeError) {
  /**
   * @exports areas/AbstractAreaCollection
   */

  /**
   * @class MSV.AbstractAreaCollection
   */
  var AbstractAreaCollection = function (config) {

  };

  AbstractAreaCollection.prototype = {

    setElement : function (element) {
      throw new RuntimeError('No override for setElement() provided.');
    },

    setContext : function (ctx) {
      throw new RuntimeError('No override for setContext() provided.');
    },

    setScale : function (scale) {
      throw new RuntimeError('No override for setScale() provided.');
    },

    addAreas : function (areas) {
      throw new RuntimeError('No override for addAreas() provided.');
    },

    initHighlights : function () {
      throw new RuntimeError('No override for initHighlights() provided.');
    },

    removeHighlight : function () {
      throw new RuntimeError('No override for removeHighlight() provided.');
    },

    onClick : function (mousePos, topCanvas, e) {
      throw new RuntimeError('No override for onClick() provided.');
    },

    onMouseMove : function (mousePos, topCanvas, e) {
      throw new RuntimeError('No override for onMouseMove() provided.');
    }

  };

  return AbstractAreaCollection;

});
