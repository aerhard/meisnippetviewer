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
  'jquery',
  'vexflow',
  'meitovexflow'
], function ($, VF, m2v, undefined) {
  /**
   * @exports core/overrides
   */

  Vex.Flow.Annotation.prototype.setMeiElement = function (element) {
    this.meiElement = element;
    return this;
  };
  Vex.Flow.Annotation.prototype.getMeiElement = function () {
    return this.meiElement;
  };
  Vex.Flow.Articulation.prototype.setMeiElement = function (element) {
    this.meiElement = element;
    return this;
  };
  Vex.Flow.Articulation.prototype.getMeiElement = function () {
    return this.meiElement;
  };
  Vex.Flow.Syllable.prototype.setMeiElement = function (element) {
    this.meiElement = element;
    return this;
  };
  Vex.Flow.Syllable.prototype.getMeiElement = function () {
    return this.meiElement;
  };


  //  MEI2VF.Converter.prototype.dirToObj = function (elements) {
  //    var me = this, directions = [];
  //    $.each(elements, function () {
  //      directions.push({
  //        text : $(this).text().trim(),
  //        startid : me.getMandatoryAttr(this, 'startid'),
  //        place : me.getMandatoryAttr(this, 'place'),
  //        element : this
  //      });
  //    });
  //    return directions;
  //  };


  MEI2VF.Directives.prototype.createVexFromInfos = function (notes_by_id) {
    var me = this, i, model, note, annot;
    i = me.allModels.length;
    while (i--) {
      model = me.allModels[i];
      note = notes_by_id[model.startid];
      if (note) {

        annot =
        (new VF.Annotation($(model.element).text().replace(/\s+/g, ' ').trim())).setFont(me.font.family, me.font.size, me.font.weight).setMeiElement(model.element);

        // TEMPORARY: set width of modifier to zero so voices with modifiers
        // don't get too much width; remove when the width calculation in
        // VexFlow does distinguish between different y values when
        // calculating the width of tickables
        annot.setWidth(0);
        if (model.atts.place === 'below') {
          note.vexNote.addAnnotation(0, annot.setVerticalJustification(me.BOTTOM));
        } else {
          note.vexNote.addAnnotation(0, annot);
        }
      } else {
        m2v.log('warn', 'Input error', m2v.Util.serializeElement(model.element) + ' could not be rendered because the reference "' + model.startid + '" could not be resolved.');
      }
    }
  };

  MEI2VF.Dynamics.prototype.createVexFromInfos = function (notes_by_id) {
    var me = this, i, model, note, annot;
    i = me.allModels.length;
    while (i--) {
      model = me.allModels[i];
      note = notes_by_id[model.startid];
      if (note) {
        annot =
        (new VF.Annotation($(model.element).text().trim())).setFont(me.font.family, me.font.size, me.font.weight).setMeiElement(model.element);
        if (model.atts.place === 'above') {
          note.vexNote.addAnnotation(0, annot);
        } else {
          note.vexNote.addAnnotation(0, annot.setVerticalJustification(me.BOTTOM));
        }
      } else {
        m2v.log('warn', 'Input error', m2v.Util.serializeElement(model.element) + ' could not be rendered because the reference "' + model.startid + '" could not be resolved.');
      }
    }
  };


  MEI2VF.Fermatas.prototype.addFermataToNote = function (note, place, index) {
    var vexArtic = new VF.Articulation(m2v.tables.fermata[place]);
    vexArtic.setPosition(m2v.tables.positions[place]);
    note.addArticulation(index || 0, vexArtic);
  };

  //  MEI2VF.Converter.prototype.addFermata = function(note, place, index) {
  //  var vexArtic = new VF.Articulation(m2v.tables.fermata[place]);
  //  vexArtic.setPosition(m2v.tables.positions[place]);
  //  vexArtic.setMeiElement(ar);
  //  note.addArticulation(index || 0, vexArtic);
  //  };



  MEI2VF.Converter.prototype.addArticulation = function (note, element) {
    var articCode = m2v.tables.articulations[element.getAttribute('artic')];
    if (articCode) {
      var vexArtic = new VF.Articulation(articCode).setMeiElement(element);
      var place = element.getAttribute('place');
      if (place) {
        vexArtic.setPosition(m2v.tables.positions[place]);
      }
      note.addArticulation(0, vexArtic);
    } else {
      m2v.log('warn', 'unknown @artic', 'The @artic attribute in ' + m2v.Util.serializeElement(element) +
                                        ' is unknown or undefined. Skipping element.');
    }
  };



  MEI2VF.Converter.prototype.processSyllables = function (note, element, staff_n) {
    var me = this, vexSyllable, syl, verse, text_line, verse_n, syls;
    // syl = me.processSyllable(element);
    syls = $(element).find('syl');
    $.each(syls, function (i) {
      syl = {
        text : $(this).text(),
        wordpos : $(this).attr('wordpos'),
        verse_n : $(this).parents('verse').attr('n')
      };
      if (syl) {
        vexSyllable =
        me.createSyllable(syl.text, me.cfg.lyricsFont).setVerticalJustification(me.BOTTOM).setLineSpacing(me.cfg.lyricsFont.spacing);
        vexSyllable.setMeiElement(this);
        note.addAnnotation(0, vexSyllable);

        me.systems[me.currentSystem_n].verses.addSyllable(vexSyllable, syl.wordpos, syl.verse_n, staff_n);
      }
    });
  };


  VF.Articulation.prototype.draw = function () {
    var Modifier = Vex.Flow.Modifier;
    var L = function () {
    };
    if (!this.context) throw new Vex.RERR("NoContext", "Can't draw Articulation without a context.");
    if (!(this.note && (this.index !== null))) {
      throw new Vex.RERR("NoAttachedNote", "Can't draw Articulation without a note and index.");
    }

    var stem_direction = this.note.getStemDirection();
    var stave = this.note.getStave();

    var is_on_head = (this.position === Modifier.Position.ABOVE && stem_direction === Vex.Flow.StaveNote.STEM_DOWN) ||
                     (this.position === Modifier.Position.BELOW && stem_direction === Vex.Flow.StaveNote.STEM_UP);

    var needsLineAdjustment = function (articulation, note_line, line_spacing) {
      var offset_direction = (articulation.position === Modifier.Position.ABOVE) ? 1 : -1;
      var duration = articulation.getNote().getDuration();

      if (!is_on_head && duration !== "w" && duration !== "1") {
        // Add stem length, inless it's on a whole note
        note_line += offset_direction * 3.5;
      }

      var articulation_line = note_line + (offset_direction * line_spacing);

      if (articulation_line >= 1 && articulation_line <= 5 && articulation_line % 1 === 0) {
        return true;
      }

      return false;
    };

    // Articulations are centered over/under the note head.
    var start = this.note.getModifierStartXY(this.position, this.index);
    var glyph_y = start.y;
    var shiftY = 0;
    var line_spacing = 1;
    var spacing = stave.getSpacingBetweenLines();
    var is_tabnote = this.note.getCategory() === 'tabnotes';
    var stem_ext = this.note.getStem().getExtents();

    var top = stem_ext.topY;
    var bottom = stem_ext.baseY;

    if (stem_direction === Vex.Flow.StaveNote.STEM_DOWN) {
      top = stem_ext.baseY;
      bottom = stem_ext.topY;
    }

    // TabNotes don't have stems attached to them. Tab stems are rendered
    // outside the stave.
    if (is_tabnote) {
      if (this.note.hasStem()) {
        if (stem_direction === Vex.Flow.StaveNote.STEM_UP) {
          bottom = stave.getYForBottomText(this.text_line - 2);
        } else if (stem_direction === Vex.Flow.StaveNote.STEM_DOWN) {
          top = stave.getYForTopText(this.text_line - 1.5);
        }
      } else { // Without a stem
        top = stave.getYForTopText(this.text_line - 1);
        bottom = stave.getYForBottomText(this.text_line - 2);
      }
    }

    var is_above = (this.position === Modifier.Position.ABOVE) ? true : false;
    var note_line = this.note.getLineNumber(is_above);

    // Beamed stems are longer than quarter note stems.
    if (!is_on_head && this.note.beam) line_spacing += 0.5;

    // If articulation will overlap a line, reposition it.
    if (needsLineAdjustment(this, note_line, line_spacing)) line_spacing += 0.5;

    var glyph_y_between_lines;
    if (this.position === Modifier.Position.ABOVE) {
      shiftY = this.articulation.shift_up;
      glyph_y_between_lines = (top - 7) - (spacing * (this.text_line + line_spacing));

      if (this.articulation.between_lines) {
        glyph_y = glyph_y_between_lines;
      } else {
        glyph_y = Math.min(stave.getYForTopText(this.text_line) - 3, glyph_y_between_lines);
      }
    } else {
      shiftY = this.articulation.shift_down - 10;

      glyph_y_between_lines = bottom + 10 + spacing * (this.text_line + line_spacing);
      if (this.articulation.between_lines) {
        glyph_y = glyph_y_between_lines;
      } else {
        glyph_y = Math.max(stave.getYForBottomText(this.text_line), glyph_y_between_lines);
      }
    }

    var glyph_x = start.x + this.articulation.shift_right;
    glyph_y += shiftY + this.y_shift;

    L("Rendering articulation: ", this.articulation, glyph_x, glyph_y);
    Vex.Flow.renderGlyph(this.context, glyph_x, glyph_y, this.render_options.font_scale, this.articulation.code);

    // ### START ADDITION
    this.x = glyph_x;
    this.y = glyph_y;
    // ### END ADDITION

  };


  Vex.Flow.Annotation.prototype.draw = function () {
    if (!this.context) throw new Vex.RERR("NoContext", "Can't draw text annotation without a context.");
    if (!this.note) throw new Vex.RERR("NoNoteForAnnotation", "Can't draw text annotation without an attached note.");

    // START ADDITION
    var Annotation = Vex.Flow.Annotation;
    var Modifier = Vex.Flow.Modifier;
    var L = function () {
    };
    // END ADDITION


    var start = this.note.getModifierStartXY(Modifier.Position.ABOVE, this.index);

    // We're changing context parameters. Save current state.
    this.context.save();
    this.context.setFont(this.font.family, this.font.size, this.font.weight);
    var text_width = this.context.measureText(this.text).width;

    // Estimate text height to be the same as the width of an 'm'.
    //
    // This is a hack to work around the inability to measure text height
    // in HTML5 Canvas (and SVG).
    var text_height = this.context.measureText("m").width;
    var x, y;

    if (this.justification == Annotation.Justify.LEFT) {
      x = start.x;
    } else if (this.justification == Annotation.Justify.RIGHT) {
      x = start.x - text_width;
    } else if (this.justification == Annotation.Justify.CENTER) {
      x = start.x - text_width / 2;
    } else /* CENTER_STEM */ {
      x = this.note.getStemX() - text_width / 2;
    }

    var stem_ext, spacing;
    var has_stem = this.note.hasStem();
    var stave = this.note.getStave();

    // The position of the text varies based on whether or not the note
    // has a stem.
    if (has_stem) {
      stem_ext = this.note.getStem().getExtents();
      spacing = stave.getSpacingBetweenLines();
    }

    // START ADDITION
    var PADDING = 5;
    // END ADDITION

    if (this.vert_justification == Annotation.VerticalJustify.BOTTOM) {

      y = stave.getYForBottomText(this.text_line);
      if (has_stem) {

        // START MODIFICATION
        var stem_base = (this.note.getStemDirection() === 1 ? stem_ext.baseY + 2 * PADDING : stem_ext.topY + PADDING);
        // END MODIFICATION

        y = Math.max(y, stem_base + (spacing * (this.text_line + 2)));
      }
    } else if (this.vert_justification == Annotation.VerticalJustify.CENTER) {
      var yt = this.note.getYForTopText(this.text_line) - 1;
      var yb = stave.getYForBottomText(this.text_line);
      y = yt + ( yb - yt ) / 2 + text_height / 2;
    } else if (this.vert_justification == Annotation.VerticalJustify.TOP) {
      y = Math.min(stave.getYForTopText(this.text_line), this.note.getYs()[0] - 10);
      if (has_stem) {
        y = Math.min(y, (stem_ext.topY - 5) - (spacing * this.text_line));
      }
    } else /* CENTER_STEM */{
      var extents = this.note.getStemExtents();
      y = extents.topY + (extents.baseY - extents.topY) / 2 + text_height / 2;
    }


    // START ADDITION
    this.x = x;
    this.y = y;
    this.text_height = text_height;
    this.text_width = text_width;
    // END ADDITION


    L("Rendering annotation: ", this.text, x, y);
    this.context.fillText(this.text, x, y);
    this.context.restore();
  };


});