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
  'common/Logger',
  'common/Util'
], function (Logger, Util) {
  /**
   * @exports mei2text/PreProcessor
   */

  var PreProcessor = {

    process : function (element, options) {
      var me = this, i, fnName;
      for (i = 0; i < options.length; i += 1) {
        fnName = (typeof options[i] === 'string') ? options[i] : options[i][0];
        if (typeof me[fnName] === 'function') {
          me[fnName](element, options[i]);
        } else {
          Logger.warn('Config error', 'Pre-processing option "' + fnName + '" doesn\'t exist.');
        }
      }
    },

    resolveSameAs : function (element) {
      this.copyElements(element, 'sameas');
    },

    resolveCopyOf : function (element) {
      this.copyElements(element, 'copyof');
    },


    copyElements : function (element, attName) {
      var i, items = element.querySelectorAll('[' + attName + ']'), target, id, item, clone, cloneDescendants, j;
      for (i = items.length; i--;) {
        item = items[i];
        id = item.getAttribute(attName).substring(1);
        target = element.querySelector('[*|id=' + id + ']');
        if (target) {
          clone = target.cloneNode(true);
          clone.setAttribute(attName, '#' + id);
          clone.removeAttribute('xml:id');

          cloneDescendants = clone.querySelectorAll('[*|id]');
          for (j = cloneDescendants.length; j--;) {
            cloneDescendants[j].removeAttribute('xml:id');
          }

          item.parentNode.insertBefore(clone, item.nextSibling);
          item.parentNode.removeChild(item);
        } else {
          Logger.warn('Reference error', 'Target "'+id+'" specified in ' + Util.serializeElement(item) + ' could not be found.');
        }
      }
    },

    /**
     * checks if descendants of the provided element have xml:ids; adds xml:ids
     * if they are missing
     * @param {Element} element
     * @param {Object} option The pre-processing option
     */
    addXmlIdPrefix : function (element, option) {
      var i, items = element.getElementsByTagName("*"), prefix = option[1];
      for (i = items.length; i--;) {
        if (!items[i].hasAttribute('xml:id')) {
          items[i].setAttribute('xml:id', prefix + i);
        }
      }
    },

    /**
     * supported: up to 7 flats / sharps
     * @param element
     */
    processDefs : function (element) {
      var keys = {
        s : [
          'c',
          'g',
          'd',
          'a',
          'e',
          'b',
          [
            'f',
            's'
          ],
          [
            'c',
            's'
          ]
        ],
        f : [
          'c',
          'f',
          [
            'b',
            'f'
          ],
          [
            'e',
            'f'
          ],
          [
            'a',
            'f'
          ],
          [
            'd',
            'f'
          ],
          [
            'g',
            'f'
          ],
          [
            'c',
            'f'
          ]
        ]
      };

      var process = function (items, keys) {
        var i, keySig, n, acc, found, key;
        for (i = items.length; i--;) {
          if (items[i].hasAttribute('key.sig')) {
            keySig = items[i].getAttribute('key.sig');
            n = +keySig.substring(0, 1);
            acc = keySig.substring(1);
            key = keys[acc];

            items[i].setAttribute('key.mode', 'major');
            found = (key) ? key[n] : null;
            if (found) {
              if (typeof found === 'string') {
                items[i].setAttribute('key.pname', found);
              } else {
                items[i].setAttribute('key.pname', found[0]);
                items[i].setAttribute('key.accid', found[1]);
              }
            } else {
              items[i].setAttribute('key.pname', 'c');
            }
          }
        }
      };
      process(element.getElementsByTagName('staffDef'), keys);
      process(element.getElementsByTagName('scoreDef'), keys);
    }

  };

  return PreProcessor;

});