define(['core/Document'], function (Document) {

  describe("Document", function () {

    it("is defined", function () {
      expect(Document).toBeDefined();
    });


    describe("parseXML()", function () {
      it("parses a string to an XMLDocument", function () {
        var xmlDoc = Document.parseXML('<xml><a></a></xml>');
        expect(xmlDoc instanceof XMLDocument).toEqual(true);
      });
    });

    describe("ascertainDescendantIds()", function () {
      var xmlDoc = Document.parseXML('<xml><a xml:id="keepit"><b/><b/> </a></xml>');
      Document.ascertainDescendantIds(xmlDoc, 'a');
      var allElementsLength = $(xmlDoc).find('*').length;

      it("adds missing xml:ids", function () {
        expect($(xmlDoc).find(':not([xml\\:id])').length).toEqual(0);
        expect($(xmlDoc).find('[xml\\:id]').length).toEqual(allElementsLength);
      });

      it("doesn't overwrite existing xml:ids", function () {
        expect(xmlDoc.getElementsByTagName('a')[0].getAttribute('xml:id')).toEqual('keepit');
      });
    });

    describe("getMEIPageConfig()", function () {

      var getXML = function (str) {
        return Document.parseXML('<scoreDef page.scale="' + str +
                                 '%" page.height="' + str +
                                 '" page.width="' + str +
                                 '" page.topmar="' + str +
                                 '" page.leftmar="' + str +
                                 '" page.rightmar="' + str +
                                 '"/>');
      };

      it("returns numbers when input is parsable as number", function () {
        var xmlDoc = getXML('10');
        var obj = Document.getMEIPageConfig(xmlDoc.activeElement);
        expect(obj['pageScale']).toEqual(0.1);
        expect(obj['pageHeight']).toEqual(10);
        expect(obj['pageWidth']).toEqual(10);
        expect(obj['pageTopMar']).toEqual(10);
        expect(obj['pageLeftMar']).toEqual(10);
        expect(obj['pageRightMar']).toEqual(10);
      });

      it("returns undefined values for NaN strings", function () {
        var xmlDoc = getXML('XXX');
        var obj = Document.getMEIPageConfig(xmlDoc.activeElement);
        expect(obj['pageScale']).toBeUndefined();
        expect(obj['pageHeight']).toBeUndefined();
        expect(obj['pageWidth']).toBeUndefined();
        expect(obj['pageTopMar']).toBeUndefined();
        expect(obj['pageLeftMar']).toBeUndefined();
        expect(obj['pageRightMar']).toBeUndefined();
      });

      it("returns undefined values for empty strings", function () {
        var xmlDoc = getXML('');
        var obj = Document.getMEIPageConfig(xmlDoc.activeElement);
        expect(obj['pageScale']).toBeUndefined();
        expect(obj['pageHeight']).toBeUndefined();
        expect(obj['pageWidth']).toBeUndefined();
        expect(obj['pageTopMar']).toBeUndefined();
        expect(obj['pageLeftMar']).toBeUndefined();
        expect(obj['pageRightMar']).toBeUndefined();
      });

      it("returns undefined values for missing attributes", function () {
        var xmlDoc = Document.parseXML('<scoreDef/>');
        var obj = Document.getMEIPageConfig(xmlDoc.activeElement);
        expect(obj['pageScale']).toBeUndefined();
        expect(obj['pageHeight']).toBeUndefined();
        expect(obj['pageWidth']).toBeUndefined();
        expect(obj['pageTopMar']).toBeUndefined();
        expect(obj['pageLeftMar']).toBeUndefined();
        expect(obj['pageRightMar']).toBeUndefined();
      });


    });


  });




});
