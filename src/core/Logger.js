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
  'm2v/core/Logger'
], function (M2VLogger, undefined) {
  /**
   * @exports core/Logger
   */

  var Logger = {

    /**
     * @property {Object} logLevels specifies the active log levels. Use {@link setLevel} to change
     * the values.
     * @private
     */
    logLevels : {
      error : true,
      warn : true,
      info : true
    },

    /**
     * @method setLogging sets the logging level. Values:
     *
     * - 'off': no logging
     * - 'debug' status messages
     * - 'info' unsupported elements
     * - 'warn' wrong encodings
     * - 'error' errors
     * @param {String} value
     */
    setLevel : function (value) {
      var me = this, i, j, levels;
      levels = [
        'error',
        'warn',
        'info',
        'debug'
      ];
      me.logLevels = {};
      if (value === 'off') return;
      for (i = 0, j = levels.length; i < j; i += 1) {
        me.logLevels[levels[i]] = true;
        if (levels[i] === value) return;
      }
      // set same logging level for mei2vf
      M2VLogger.setLogging(value);
    },

    /**
     * @method log the logging function. Logs the arguments to the window
     * console if the log level is listed in {@link logLevels}
     * @private
     */
    log : function (level, category) {
      if (this.logLevels[level] === true) {
        var line = Array.prototype.slice.call(arguments, 2).join(" ");
        window.console[level]('MEISnippetViewer (' + category + "): " + line);
      }
    }
  };

  return Logger;

});