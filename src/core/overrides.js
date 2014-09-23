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
  'mei2vf/vexflow-overrides',
  'mei2vf/eventpointer/Directives',
  'mei2vf/eventpointer/Dynamics',
  'mei2vf/eventpointer/Fermatas',
  'mei2vf/core/Converter',
  'mei2vf/core/Logger',
  'mei2vf/core/Util',
  'mei2vf/core/tables',
  'mei2vf/stave/Stave'
], function ($, VF, overrides, Directives, Dynamics, Fermatas, Converter, Logger, Util, Tables, Stave, undefined) {

  Stave.prototype.lineColor = '#000000';


  /**
   * @exports core/overrides
   */


  VF.Articulation.prototype.draw = function () {
    var Modifier = VF.Modifier;
    var L = function () {
    };
    if (!this.context) throw new Vex.RERR("NoContext", "Can't draw Articulation without a context.");
    if (!(this.note && (this.index !== null))) {
      throw new Vex.RERR("NoAttachedNote", "Can't draw Articulation without a note and index.");
    }

    var stem_direction = this.note.getStemDirection();
    var stave = this.note.getStave();

    var is_on_head = (this.position === Modifier.Position.ABOVE && stem_direction === VF.StaveNote.STEM_DOWN) ||
                     (this.position === Modifier.Position.BELOW && stem_direction === VF.StaveNote.STEM_UP);

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

    if (stem_direction === VF.StaveNote.STEM_DOWN) {
      top = stem_ext.baseY;
      bottom = stem_ext.topY;
    }

    // TabNotes don't have stems attached to them. Tab stems are rendered
    // outside the stave.
    if (is_tabnote) {
      if (this.note.hasStem()) {
        if (stem_direction === VF.StaveNote.STEM_UP) {
          bottom = stave.getYForBottomText(this.text_line - 2);
        } else if (stem_direction === VF.StaveNote.STEM_DOWN) {
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
    VF.renderGlyph(this.context, glyph_x, glyph_y, this.render_options.font_scale, this.articulation.code);

    // ### START ADDITION
    this.x = glyph_x;
    this.y = glyph_y;
    // ### END ADDITION

  };


});