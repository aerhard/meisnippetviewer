define([
  'msv/core/Document',
  'msv/pre/PreProcessor'
], function (Document, PreProcessor) {

  describe("PreProcessor", function () {

    it("is defined", function () {
      expect(Document).toBeDefined();
    });


    describe("addXmlIdPrefix()", function () {
      var xmlDoc = Document.parseXML('<xml><a xml:id="keepit"><b/><b/> </a></xml>');
      PreProcessor.addXmlIdPrefix(xmlDoc, [null, 'a']);
      var allElementsLength = $(xmlDoc).find('*').length;

      it("adds missing xml:ids", function () {
        expect($(xmlDoc).find(':not([xml\\:id])').length).toEqual(0);
        expect($(xmlDoc).find('[xml\\:id]').length).toEqual(allElementsLength);
      });

      it("doesn't overwrite existing xml:ids", function () {
        expect(xmlDoc.getElementsByTagName('a')[0].getAttribute('xml:id')).toEqual('keepit');
      });
    });


  });




});
