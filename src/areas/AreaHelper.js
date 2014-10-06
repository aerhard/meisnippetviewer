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
  'vexflow',
  'common/Logger'
], function (VF, Logger, undefined) {
  /**
   * @exports areas/AreaHelper
   */

  var AreaHelper = function (viewer) {
    this.viewer = viewer;
  };

  AreaHelper.prototype = {

    setAreas : function (meiDoc, areaCollections) {

      var me = this, i, j, k;

      me.measureAreas = [];
      //      me.layerAreas = [];
      me.barlineAreas = [];
      me.measureModifierAreas = [];
      me.noteAreas = [];
      me.variantAreas = [];
      me.anchoredTextAreas = [];
      me.pgHeadAreas = [];

      var areaCollectionsByCategory = me.groupByContentCategory(areaCollections);

      i = areaCollectionsByCategory['measures'].length;
      j = areaCollectionsByCategory['barlines'].length;
      k = areaCollectionsByCategory['measure_modifiers'].length;
      if (i > 0 || j > 0 || k > 0) {
        me.calculateMeasureAreas();
        while (i--) {
          areaCollectionsByCategory['measures'][i].addAreas(me.measureAreas);
        }
        while (j--) {
          areaCollectionsByCategory['barlines'][j].addAreas(me.barlineAreas);
        }
        while (k--) {
          areaCollectionsByCategory['measure_modifiers'][k].addAreas(me.measureModifierAreas);
        }
      }

      me.extractAndAddAreas (areaCollectionsByCategory['notes'], me.noteAreas, function(){
        me.calculateNoteAreas();
      });
      me.extractAndAddAreas (areaCollectionsByCategory['anchoredTexts'], me.anchoredTextAreas, function(){
        me.calculateAnchoredTextAreas();
      });
      me.extractAndAddAreas (areaCollectionsByCategory['pgHead'], me.pgHeadAreas, function(){
          me.calculatePgHeadAreas();
      });
      me.extractAndAddAreas (areaCollectionsByCategory['variants'], me.variantAreas, function(){
        me.getVariantCoordinates(meiDoc);
      });

      me.initHighlights(areaCollections);

    },

    /**
     * creates an object with all the area content categories; each of them holds the area collections
     * to which that content category has been assigned
     * @param {AbstractAreaCollection[]} areaCollections
     * @returns {Object}
     */
    groupByContentCategory : function (areaCollections) {
      var areaCollection, i, j, category;
      var areaCategories = {
        measures : [],
        //        layers:[],
        variants : [],
        notes : [],
        barlines : [],
        measure_modifiers : [],
        anchoredTexts : [],
        pgHead : []
      };
      i = areaCollections.length;
      while (i--) {
        areaCollection = areaCollections[i];
        if (areaCollection.type === 'highlighter') {
          j = areaCollection.content.length;
          while (j--) {
            category = areaCategories[areaCollection.content[j]];
            if (category) {
              category.push(areaCollection);
            } else {
              Logger.warn('Configuration error', 'Unknown area type "' + areaCollection.content[j] + '".');
            }
          }
        }
      }
      return areaCategories;
    },

    extractAndAddAreas : function (areaCollectionGroup, result, extractFn) {
      var i = areaCollectionGroup.length;
      if (i > 0) {
        extractFn();
        while (i--) {
          areaCollectionGroup[i].addAreas(result);
        }
      }
    },

    initHighlights : function (areaCollections) {
      var i = areaCollections.length;
      while (i--) {
        if (areaCollections[i].type === 'highlighter') {
          areaCollections[i].initHighlights();
        }
      }
    },

    calculateMeasureAreas : function () {
      var systems = me.viewer.converter.getSystems();
      var me = this, i, j, k, l, m, n, stave, x, y, w, y1, measures, staves;
      var STAFF_BOTTOM_OFFSET = 20;

      for (i = 0, j = systems.length; i < j; i += 1) {
        if (systems[i]) {
          measures = systems[i].getMeasures();
          for (k = 0, l = measures.length; k < l; k += 1) {
            staves = measures[k].getStaves();
            for (m = 0, n = staves.length; m < n; m++) {
              stave = staves[m];
              if (stave) {
                x = stave.x;
                y = stave.y;
                w = stave.width;
                y1 = stave.getBottomY() - STAFF_BOTTOM_OFFSET;
                me.measureAreas.push({
                  x : x,
                  y : y,
                  w : w,
                  h : y1 - y,
                  x1 : x + w,
                  y1 : y1,
                  measureN : measures[k].n,
                  staveN : m
                });

                var staveY = stave.getYForLine(0) - 5;
                var staveH = stave.getYForLine(4) - staveY + 10;
                me.calculateBarlineAreas(stave, staveY, staveH, measures[k].getMeiElement());
                me.calculateStaveModifierAreas(stave, staveY, staveH);
              }
            }
          }
        }
      }
    },

    calculateBarlineAreas : function (stave, staveY, staveH, meiElement) {
      var me = this;

      if (stave.modifiers[0].barline !== 7) {
        me.barlineAreas.push(me.createNoteAreaObj('barline', stave.modifiers[0].x -
                                                             8, staveY, 16, staveH, meiElement, 1));
      }
      if (stave.modifiers[1].barline !== 7) {
        me.barlineAreas.push(me.createNoteAreaObj('barline', stave.modifiers[1].x -
                                                             8, staveY, 16, staveH, meiElement, 1));
      }
    },

    calculateStaveModifierAreas : function (stave, y, h) {
      var me = this, modifiers = stave.modifiers, i, j, category, x, w;
      j = stave.glyphs.length;
      x = stave.getGlyphStartX();
      var glyph, glyphXW = [], glyphXWindex = 0;

      var codes = {
        v18 : 'meiKeySpecElement',
        v44 : 'meiKeySpecElement',
        v83 : 'meiClefElement',
        v79 : 'meiClefElement',
        vad : 'meiClefElement',
        v59 : 'meiClefElement',
        v8 : 'meiClefElement'
      };

      for (var i = 0; i < j; i++) {
        glyph = stave.glyphs[i];
        w = glyph.getMetrics().width;
        if (glyph.code) {
          me.measureModifierAreas.push(me.createNoteAreaObj('stave-modifier', x, y - 15, w, h +
                                                                                            30, stave[codes[glyph.code] ||
                                                                                                      'meiTimeSpecElement'], i));
        }
        x += w;
      }

      j = stave.end_glyphs.length;
      x = stave.getGlyphEndX();
      var glyph;
      for (i = 0; i < j; i++) {
        glyph = stave.end_glyphs[i];
        if (glyph.code) {
          w = glyph.getMetrics().width;
          x -= w;
          me.measureModifierAreas.push(me.createNoteAreaObj('stave-modifier', x, y - 15, w, h +
                                                                                            30, stave.meiEndClefElement, i));
        }
      }
    },

    calculateNoteAreas : function () {
      var notes = me.viewer.converter.getNotes();
      var me = this, i, j, k, l, note, box, x, y, w, h, metrics, meiElement;
      for (i in notes) {
        note = notes[i].vexNote;
        meiElement = notes[i].meiNote;
        box = note.getBoundingBox();
        x = note.getAbsoluteX() - 10;
        y = box.y - 10;
        w = 30;
        h = box.h + 20;
        me.noteAreas.push(me.createNoteAreaObj('note', x, y, w, h, meiElement, i));
        me.calculateNoteModifierAreas(note);
      }
    },

    createNoteAreaObj : function (type, x, y, w, h, meiElement, xmlid) {
      return {
        type : type,
        x : x,
        y : y,
        w : w,
        h : h,
        x1 : x + w,
        y1 : y + h,
        meiElement : meiElement,
        xmlid : xmlid
      };
    },

    calculateAnchoredTextAreas : function () {
      var texts = me.viewer.anchoredTexts.getAll();
      var me = this;
      i = texts.length;
      while (i--) {
        me.anchoredTextAreas.push(texts[i].getArea());
      }
    },

    calculatePgHeadAreas : function () {
      var me = this, i, j, texts;
      if (me.viewer.pgHead) {
        var textsByLine = me.viewer.pgHead.getTextsByLine();
        j = textsByLine.length;
        while (j--) {
          texts = textsByLine[j];
          i = texts.length;
          while (i--) {
            me.pgHeadAreas.push(texts[i].getArea());
          }
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
            me.noteAreas.push(me.createNoteAreaObj('note-modifier', x, y, w, h, modifiers[i].getMeiElement(), i));
            break;
          case 'articulations':
            w = modifiers[i].width + 8;
            h = w;
            x = modifiers[i].x - w / 2 - modifiers[i].articulation.shift_right;
            y = modifiers[i].y - h / 2 - modifiers[i].articulation.shift_down;
            me.noteAreas.push(me.createNoteAreaObj('note-modifier', x, y, w, h, modifiers[i].getMeiElement(), i));
            break;
          case 'ornaments':
            w = modifiers[i].width + 8;
            h = w;
            x = modifiers[i].x - w / 2 - modifiers[i].ornament.shift_right;
            y = modifiers[i].y - modifiers[i].ornament.shift_down;
            me.noteAreas.push(me.createNoteAreaObj('note-modifier', x, y, w, h, modifiers[i].getMeiElement(), i));
            break;
          case 'gracenotegroups':
            var clef = modifiers[i].grace_notes[0];
            // make shure it's a ClefNote:
            if (clef.clef_obj) {
              x = clef.getAbsoluteX() - 30;
              y = note.stave.getYForLine(0) - 20;
              w = 30;
              h = note.stave.getYForLine(4) - y + 20;
              me.noteAreas.push(me.createNoteAreaObj('note-modifier', x, y, w, h, clef.getMeiElement(), i));
            }
            break;
          case 'dots':
          case 'accidentals':
          default:
            //console.log('not processed: ' + category);
            break;
        }
      }
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
        x : x,
        y : y,
        w : w,
        h : h,
        x1 : x + w,
        y1 : y + h,
        xmlid : xmlid
      };
    },

    /**
     * Calculates an area which contains all of the specified areas.
     * @param {Object[]} areas
     * @returns {Object}
     */
    getSurroundingArea : function (areas) {
      var i = areas.length, surroundingArea, xmlids = [];
      surroundingArea = {
        x : 10000,
        y : 10000,
        x1 : 0,
        y1 : 0
      };
      while (i--) {
        xmlids.push(areas[i].xmlid);
        surroundingArea.x = Math.min(surroundingArea.x, areas[i].x);
        surroundingArea.y = Math.min(surroundingArea.y, areas[i].y);
        surroundingArea.x1 = Math.max(surroundingArea.x1, areas[i].x1);
        surroundingArea.y1 = Math.max(surroundingArea.y1, areas[i].y1);
      }
      surroundingArea.w = surroundingArea.x1 - surroundingArea.x;
      surroundingArea.h = surroundingArea.y1 - surroundingArea.y;

      surroundingArea.xmlids = xmlids;

      return surroundingArea;
    },

    getVariantCoordinates : function (meiDoc) {
      var me = this, i, j, appObject, idsInAlternative, area, areas, surroundingArea;

      // loop through all meilib app objects
      for (i in meiDoc.ALTs) {
        appObject = meiDoc.ALTs[i];
        idsInAlternative = me.getIdsInAlternative(meiDoc, appObject);
        areas = [];
        for (j in idsInAlternative) {
          area = me.getIdCoordinates(j, idsInAlternative[j]);
          if (area) {
            area.alt = appObject;
            //            areas.push(area);

            me.variantAreas.push(area);
          }
        }
        //        surroundingArea = me.getSurroundingArea(areas);
        //        surroundingArea.alt = appObject;
        //        me.variantAreas.push(surroundingArea);
      }
    },


    getIdsInAlternative : function (meiDoc, appObject, selectedSource) {
      var i, j, selectedAlternElement, id, descendantIds = {}, defaultAltern;

      defaultAltern = appObject.getDefaultItem();

      if (defaultAltern) {
        // if specified, select the default alternative ...
        selectedAlternElement = defaultAltern.elem;
      }

      var descendantElements = selectedAlternElement.getElementsByTagName('*');
      for (i = 0, j = descendantElements.length; i < j; i += 1) {
        id = descendantElements[i].getAttribute('xml:id');
        if (id) {
          descendantIds[id] = descendantElements[i].localName;
        }
      }
      return descendantIds;
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
