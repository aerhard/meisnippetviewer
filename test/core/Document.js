define(['msv/core/Document'], function (Document) {

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
