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
        expect(obj['page_scale']).toEqual(0.1);
        expect(obj['page_height']).toEqual(10);
        expect(obj['page_width']).toEqual(10);
        expect(obj['page_margin_top']).toEqual(10);
        expect(obj['page_margin_left']).toEqual(10);
        expect(obj['page_margin_right']).toEqual(10);
      });

      it("returns undefined values for NaN strings", function () {
        var xmlDoc = getXML('XXX');
        var obj = Document.getMEIPageConfig(xmlDoc.activeElement);
        expect(obj['page_scale']).toBeUndefined();
        expect(obj['page_height']).toBeUndefined();
        expect(obj['page_width']).toBeUndefined();
        expect(obj['page_margin_top']).toBeUndefined();
        expect(obj['page_margin_left']).toBeUndefined();
        expect(obj['page_margin_right']).toBeUndefined();
      });

      it("returns undefined values for empty strings", function () {
        var xmlDoc = getXML('');
        var obj = Document.getMEIPageConfig(xmlDoc.activeElement);
        expect(obj['page_scale']).toBeUndefined();
        expect(obj['page_height']).toBeUndefined();
        expect(obj['page_width']).toBeUndefined();
        expect(obj['page_margin_top']).toBeUndefined();
        expect(obj['page_margin_left']).toBeUndefined();
        expect(obj['page_margin_right']).toBeUndefined();
      });

      it("returns undefined values for missing attributes", function () {
        var xmlDoc = Document.parseXML('<scoreDef/>');
        var obj = Document.getMEIPageConfig(xmlDoc.activeElement);
        expect(obj['page_scale']).toBeUndefined();
        expect(obj['page_height']).toBeUndefined();
        expect(obj['page_width']).toBeUndefined();
        expect(obj['page_margin_top']).toBeUndefined();
        expect(obj['page_margin_left']).toBeUndefined();
        expect(obj['page_margin_right']).toBeUndefined();
      });


    });


  });




});
