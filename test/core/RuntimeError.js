define(['core/RuntimeError'], function (RuntimeError) {

  describe("RuntimeError", function () {

    it("is defined", function () {
      expect(RuntimeError).toBeDefined();
    });

    it("returns error code and message in toString method", function () {

      var r = new RuntimeError('code', 'message');

      expect(r.toString()).toEqual('MSV.RuntimeError, code "code": message');
    });

  });

});
