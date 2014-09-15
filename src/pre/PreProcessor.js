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
  'core/Logger'
], function (Logger, undefined) {
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
          Logger.log('warn', 'Config error', 'Pre-processing option "' + fnName + '" doesn\'t exist.');
        }
      }
    },

    /**
     * checks if descendants of the provided element have xml:ids; adds xml:ids
     * if they are missing
     * @param {Element} options The pre-processing options
     */
    addXmlIdPrefix : function (element, option) {
      var i, items = element.getElementsByTagName("*"), prefix = option[1];
      for (i = items.length; i--;) {
        if (!items[i].hasAttribute('xml:id')) {
          items[i].setAttribute('xml:id', prefix + i);
        }
      }
    },

    removePbs : function (element) {
      var i, items = element.getElementsByTagName("pb");
      for (i = items.length; i--;) {
        items[i].parentNode.removeChild(items[i]);
      }
    },

    /**
     * supported: up to 7 flats and 7 sharps
     * @param element
     */
    processDefs : function (element) {
      var me = this, i, keys;
      keys = {
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
        var i, keySig, n, acc, found;
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