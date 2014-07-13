define(['core/Logger'], function (Logger) {

  describe("Logger", function () {

    it("is defined", function () {
      expect(Logger).toBeDefined();
    });

    it("logs when logging is enabled", function () {
      spyOn(Vex, 'L');
      Logger.setEnabled(true);
      expect(Logger.enabled).toEqual(true);
      Logger.log('a', 'b');
      expect(Vex.L).toHaveBeenCalledWith('MEISnippetViewer', { 0 : 'a', 1 : 'b' });
    });

    it("doesn't log when logging is disabled", function () {
      spyOn(Vex, 'L');
      Logger.setEnabled(false);
      expect(Logger.enabled).toEqual(false);
      Logger.log('a', 'b');
      expect(Vex.L).not.toHaveBeenCalled();
    });

  });

});


