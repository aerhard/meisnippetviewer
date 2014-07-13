define(function (undefined) {

  var Logger = {

    /**
     * @property {Boolean} enabled specifies if logging is enabled or disabled.
     * Defaults to false.
     * @private
     */
    enabled : false,

    /**
     * @method setEnabled enables or disables MEI2VF logging
     * @param {Boolean} value
     */
    setEnabled : function (value) {
      this.enabled = value;
    },

    /**
     * @method log Passes the function arguments to VexFlow's log method Vex.L
     * if {@link #enabled} is `true`
     * @private
     */
    log : function () {
      if (this.enabled) {
        Vex.L("MEISnippetViewer", arguments);
      }
    }

  };

  return Logger;

});