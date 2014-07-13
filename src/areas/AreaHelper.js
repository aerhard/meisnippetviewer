define([
  'core/RuntimeError'
], function (RuntimeError, undefined) {

  /**
   * @class MSV.AreaHelper
   */
  var AreaHelper = function (viewer) {
    this.viewer = viewer;
  };

  AreaHelper.prototype = {

    setAreas : function (meiDoc, layers) {
      var me = this, i, j, k, areas, areaCollection;

      me.measureAreas = [];
      //      me.layerAreas = [];
      me.barlineAreas = [];
      me.measureModifierAreas = [];
      me.noteAreas = [];
      me.variantAreas = [];
      me.anchoredTextAreas = [];
      me.pgHeadAreas = [];

      var hTypes = {
        measures : [],
        //        layers:[],
        variants : [],
        notes : [],
        barlines : [],
        measure_modifiers : [],
        anchoredTexts : [],
        pgHead : []
      };

      var hType

      i = layers.length;
      while (i--) {
        areaCollection = layers[i];
        if (areaCollection.type === 'highlighter') {
          j = areaCollection.content.length;
          while (j--) {
            hType = hTypes[areaCollection.content[j]];
            if (hType) {
              hType.push(areaCollection);
            } else {
              throw new RuntimeError('Configuration Error', 'Area type "' + areaCollection.content[j] +
                                                            '" is not supported');
            }
          }
        }
      }

      i = hTypes['measures'].length;
      j = hTypes['barlines'].length;
      k = hTypes['measure_modifiers'].length;
      if (i > 0 || j > 0 || k > 0) {
        me.calculateMeasureAreas(me.viewer.allVexMeasureStaffs);
        while (i--) {
          hTypes['measures'][i].addAreas(me.measureAreas);
        }
        while (j--) {
          hTypes['barlines'][j].addAreas(me.barlineAreas);
        }
        while (k--) {
          hTypes['measure_modifiers'][k].addAreas(me.measureModifierAreas);
        }
      }

      //      i = hTypes['layers'].length;
      //      if (i > 0) {
      //        me.calculateLayerAreas(XXX);
      //        while (i--) {
      //          hTypes['layers'][i].addAreas(me.layerAreas);
      //        }
      //      }

      i = hTypes['notes'].length;
      if (i > 0) {
        me.calculateNoteAreas(me.viewer.converter.getNotes());
        while (i--) {
          hTypes['notes'][i].addAreas(me.noteAreas);
        }
      }

      i = hTypes['anchoredTexts'].length;
      if (i > 0) {
        me.calculateAnchoredTextAreas(me.viewer.anchoredTexts.getAll());
        while (i--) {
          hTypes['anchoredTexts'][i].addAreas(me.anchoredTextAreas);
        }
      }

      i = hTypes['pgHead'].length;
      if (i > 0 && me.viewer.pgHead) {
        me.calculatePgHeadAreas(me.viewer.pgHead.getTextsByLine());
        while (i--) {
          hTypes['pgHead'][i].addAreas(me.pgHeadAreas);
        }
      }

      i = hTypes['variants'].length;
      if (i > 0) {
        me.getVariantCoordinates(meiDoc);
        while (i--) {
          hTypes['variants'][i].addAreas(me.variantAreas);
        }
      }

      i = layers.length;
      while (i--) {
        if (layers[i].type === 'highlighter') {
          layers[i].initHighlights();
        }
      }

    },

    calculateMeasureAreas : function (staffs) {
      var me = this, i, j, k, l, staff, x, y, w, y1;
      var STAFF_BOTTOM_OFFSET = 20;

      for (i = 0, j = staffs.length; i < j; i += 1) {
        if (staffs[i]) {
          for (k = 0, l = staffs[i].length; k < l; k += 1) {
            staff = staffs[i][k];
            if (staff) {
              x = staff.x;
              y = staff.y;
              w = staff.width;
              y1 = staff.getBottomY() - STAFF_BOTTOM_OFFSET;
              me.measureAreas.push({
                ctx : {
                  x : x,
                  y : y,
                  w : w,
                  h : y1 - y,
                  x1 : x + w,
                  y1 : y1
                },
                measureN : i,
                staffN : k
              });
              me.calculateBarlineAreas(staff, y, y1 - y);
              me.calculateStaffModifierAreas(staff, y, y1 - y);
            }
          }
        }
      }

    },

    calculateBarlineAreas : function (staff) {
      var me = this, staffY, staffH;

      staffY = staff.getYForLine(0) - 5;
      staffH = staff.getYForLine(4) - staffY + 10;

      if (staff.modifiers[0].barline !== 7) {
        me.barlineAreas.push(me.createNoteAreaObj(staff.modifiers[0].x - 8, staffY, 16, staffH, null, 1));
      }
      if (staff.modifiers[1].barline !== 7) {
        me.barlineAreas.push(me.createNoteAreaObj(staff.modifiers[1].x - 8, staffY, 16, staffH, null, 1));
      }
    },

    calculateStaffModifierAreas : function (staff, y, h) {
      var me = this, modifiers = staff.modifiers, i, j, category, x, w;
      j = modifiers.length;

      if (staff.modifiers.length > 2) {
        x = staff.glyph_start_x - 4;
        w = staff.start_x - staff.glyph_start_x + 8;
        me.measureModifierAreas.push(me.createNoteAreaObj(x, y, w, h, null, i));
      }

      // var lastX = staff.x;
      // var shift;
      //
      // window.x = staff;
      // for ( i = 2; i < j; i += 1) {
      //
      // console.log(modifiers[i]);
      //
      // if (modifiers[i]) {
      // shift = staff.getModifierXShift(0);
      // //
      // me.noteAreas.push(me.createNoteAreaObj(lastX, staffY, shift - lastX,
      // staffH, null, 1));
      // lastX = shift;
      //
      // }
      //
      // // console.log(modifiers[i]);
      // // console.log(me.createNoteAreaObj(x, y, w, h,
      // // modifiers[i].getMeiElement(), i));
      // }
    },

    calculateNoteAreas : function (notes) {
      var me = this, i, j, k, l, note, box, x, y, w, h, metrics, meiElement;
      for (i in notes) {
        note = notes[i].vexNote;
        meiElement = notes[i].meiNote;
        box = note.getBoundingBox();
        x = note.getAbsoluteX() - 10;
        y = box.y - 10;
        w = 30;
        h = box.h + 20;
        me.noteAreas.push(me.createNoteAreaObj(x, y, w, h, meiElement, i));
        me.calculateNoteModifierAreas(note);
      }
    },

    createNoteAreaObj : function (x, y, w, h, meiElement, xmlid) {
      return {
        ctx : {
          x : x,
          y : y,
          w : w,
          h : h,
          x1 : x + w,
          y1 : y + h
        },
        meiElement : meiElement,
        xmlid : xmlid
      };
    },

    calculateAnchoredTextAreas : function (texts) {
      var me = this;
      i = texts.length;
      while (i--) {
        me.anchoredTextAreas.push(texts[i].getArea());
      }
    },

    calculatePgHeadAreas : function (textsByLine) {
      var me = this, i, j, texts;
      j = textsByLine.length;
      while (j--) {
        texts = textsByLine[j];
        i = texts.length;
        while (i--) {
          me.pgHeadAreas.push(texts[i].getArea());
        }
      }
    },


    calculateNoteModifierAreas : function (note) {
      var me = this, modifiers = note.modifiers, i, category, x, y, w, h, areas = [];
      i = modifiers.length;
      while (i--) {
        category = modifiers[i].getCategory();
        switch (category) {
          case 'annotations':
            x = modifiers[i].x - 6;
            y = modifiers[i].y - 20;
            w = modifiers[i].text_width + 12;
            h = 30;
            me.noteAreas.push(me.createNoteAreaObj(x, y, w, h, modifiers[i].getMeiElement(), i));
            break;
          case 'articulations':
            w = modifiers[i].width + 8;
            h = w;
            x = modifiers[i].x - w / 2 - modifiers[i].articulation.shift_right;
            y = modifiers[i].y - h / 2 - modifiers[i].articulation.shift_down;
            me.noteAreas.push(me.createNoteAreaObj(x, y, w, h, modifiers[i].getMeiElement(), i));
            break;
          case 'dots':
          case 'accidentals':
          default:
            // console.log('not processed: ' + category);
            break;
        }
      }
    },

    calculateNoteModifierArea : function () {

    },

    calculateNoteArea : function (notes, xmlid) {
      var me = this, i, j, k, l, note, box, x, y, w, h;

      note = notes[xmlid].vexNote;
      box = note.getBoundingBox();

      x = note.getAbsoluteX() - 10;
      y = box.y - 10;
      w = 30;
      h = box.h + 20;
      return {
        ctx : {
          x : x,
          y : y,
          w : w,
          h : h,
          x1 : x + w,
          y1 : y + h
        },
        xmlid : xmlid
      };
    },

    /**
     * Calculates an area which contains all of the specified areas.
     * @param {Object[]} areas
     * @returns {{ctx: {x: number, y: number, x1: number, y1: number}, xmlids: Array}}
     */
    getSurroundingArea : function (areas) {
      var i = areas.length, ctx, xmlids = [];
      ctx = {
        x : 10000,
        y : 10000,
        x1 : 0,
        y1 : 0
      };
      while (i--) {
        xmlids.push(areas[i].xmlid);
        ctx.x = Math.min(ctx.x, areas[i].ctx.x);
        ctx.y = Math.min(ctx.y, areas[i].ctx.y);
        ctx.x1 = Math.max(ctx.x1, areas[i].ctx.x1);
        ctx.y1 = Math.max(ctx.y1, areas[i].ctx.y1);
      }
      ctx.w = ctx.x1 - ctx.x;
      ctx.h = ctx.y1 - ctx.y;
      return {
        ctx : ctx,
        xmlids : xmlids
      }
    },

    getVariantCoordinates : function (meiDoc) {
      var me = this, i, j, grp, area, areas, variantIdGrps;

      variantIdGrps = [];

      for (i in meiDoc.ALTs) {
        variantIdGrps.push({
          alt : meiDoc.ALTs[i],
          grp : me.getVariantIds(meiDoc.ALTs[i])
        });
      }

      i = variantIdGrps.length;
      while (i--) {
        grp = variantIdGrps[i].grp;
        areas = [];

        for (j in grp) {
          area = me.getIdCoordinates(j, grp[j]);
          if (area) {
            areas.push(area);
          }
        }
        var surroundingArea = me.getSurroundingArea(areas);
        surroundingArea.alt = variantIdGrps[i].alt;
        me.variantAreas.push(surroundingArea);
      }
    },


    // TODO is it necessary to attach ids to syllables etc or not!?
    getVariantIds : function (ALT) {
      var i, j, alt, id, idgroups = [], ids, defaultItem;
      defaultItem = ALT.getDefaultItem();
      ids = {};

      if (defaultItem) {
        alt = defaultItem.elem;
      } else {
        for (var alt in meiDoc.ALTs[i].altitems) {
          alt = meiDoc.ALTs[i].altitems[alt].elem;
          break;
        }
      }
      var elements = alt.getElementsByTagName('*');
      for (i = 0, j = elements.length; i < j; i += 1) {
        id = elements[i].getAttribute('xml:id');
        if (id) {
          ids[id] = elements[i].localName;
        }
      }
      return ids;
    },

    getIdCoordinates : function (xmlid, localName) {
      var me = this, area;
      switch (localName) {
        case 'note':
          return me.calculateNoteArea(me.viewer.converter.getNotes(), xmlid);
        case 'rest':
          return me.calculateNoteArea(me.viewer.converter.getNotes(), xmlid);
        case 'mRest':
          return me.calculateNoteArea(me.viewer.converter.getNotes(), xmlid);
        case 'syl':

        default:
          return;
      }
    }
  };

  return AreaHelper;

});
