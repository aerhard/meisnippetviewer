define([
  'jquery',
  'vexflow',
  'meitovexflow'
], function ($, VF, m2v, undefined) {

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


  MEI2VF.Directives.prototype.createVexFromInfos = function(notes_by_id) {
    var me = this, i, model, note, annot;
    i = me.allModels.length;
    while (i--) {
      model = me.allModels[i];
      note = notes_by_id[model.startid];
      if (note) {
        annot = (new VF.Annotation($(model.element).text().trim())).setFont(me.font.family, me.font.size, me.font.weight).setMeiElement(model.element);

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
        throw new m2v.RUNTIME_ERROR('MEI2VF.RERR.createVexFromInfos', "The reference in the directive could not be resolved.");
      }
    }
  };

  MEI2VF.Dynamics.prototype.createVexFromInfos = function(notes_by_id) {
    var me = this, i, model, note, annot;
    i = me.allModels.length;
    while (i--) {
      model = me.allModels[i];
      note = notes_by_id[model.startid];
      if (note) {
        annot = (new VF.Annotation($(model.element).text().trim())).setFont(me.font.family, me.font.size, me.font.weight).setMeiElement(model.element);
        if (model.atts.place === 'above') {
          note.vexNote.addAnnotation(0, annot);
        } else {
          note.vexNote.addAnnotation(0, annot.setVerticalJustification(me.BOTTOM));
        }
      } else {
        throw new m2v.RUNTIME_ERROR('MEI2VF.RERR.createVexFromInfos', "The reference in the directive could not be resolved.");
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



  MEI2VF.Converter.prototype.addArticulation = function (note, ar) {
    var vexArtic = new VF.Articulation(m2v.tables.articulations[ar.getAttribute('artic')]).setMeiElement(ar);
    var place = ar.getAttribute('place');
    if (place) {
      vexArtic.setPosition(m2v.tables.positions[place]);
    }
    note.addArticulation(0, vexArtic);
  };


//  MEI2VF.Converter.prototype.processSyllables = function (note, element, staff_n) {
//    var me = this, annot, syl;
//    syl = me.processSyllable(element);
//    if (syl) {
//      annot =
//      me.createAnnot(syl.text, me.cfg.lyricsFont).setMeiElement(syl.element).setVerticalJustification(me.BOTTOM);
//      note.addAnnotation(0, annot);
//      if (syl.wordpos) {
//        me.hyphenation.addSyllable(annot, syl.wordpos, staff_n);
//      }
//    }
//  };



  MEI2VF.Converter.prototype.processSyllables = function(note, element, staff_n) {
    var me = this, annot, syl, verse, text_line, verse_n, syls;
    // syl = me.processSyllable(element);
    syls = $(element).find('syl');
    $.each(syls, function(i) {
      syl = {
        text : $(this).text(),
        wordpos : $(this).attr('wordpos'),
        verse_n : $(this).parents('verse').attr('n'),
      };
      if (syl) {
        annot = me.createAnnot(syl.text, me.cfg.lyricsFont).
          setMeiElement(syl.element).
          setVerticalJustification(me.BOTTOM).
          setLineSpacing(me.cfg.lyricsFont.spacing);
        note.addAnnotation(0, annot);
        me.verses.addSyllable(annot, syl.wordpos, syl.verse_n, staff_n)
        if (syl.wordpos) {
          me.hyphenation.addSyllable(annot, syl.wordpos, staff_n);
        }
      }
    });
  };

//  MEI2VF.Converter.prototype.processSyllable = function (mei_note) {
//    var syl = mei_note.getElementsByTagName('syl')[0];
//    if (syl) {
//      return {
//        text : $(syl).text(),
//        wordpos : syl.getAttribute('wordpos'),
//        element : syl
//      };
//    }
//  };

  MEI2VF.Converter.prototype.processSyllable = function(mei_note) {
    var syl = $(mei_note).find('syl')[0];
    if (syl) {
      return {
        text : $(syl).text(),
        wordpos : $(syl).attr('wordpos'),
        verse_n : $(syl).parents('verse').attr('n'),
        element : syl
      };
    }
  };




  VF.Articulation.prototype.draw = function() {
    var Modifier = Vex.Flow.Modifier;
    var L = function() {};
    if (!this.context) throw new Vex.RERR("NoContext",
      "Can't draw Articulation without a context.");
    if (!(this.note && (this.index !== null))) throw new Vex.RERR("NoAttachedNote",
      "Can't draw Articulation without a note and index.");

    var stem_direction = this.note.getStemDirection();
    var stave = this.note.getStave();

    var is_on_head = (this.position === Modifier.Position.ABOVE &&
                      stem_direction === Vex.Flow.StaveNote.STEM_DOWN) ||
                     (this.position === Modifier.Position.BELOW &&
                      stem_direction === Vex.Flow.StaveNote.STEM_UP);

    var needsLineAdjustment = function(articulation, note_line, line_spacing) {
      var offset_direction = (articulation.position === Modifier.Position.ABOVE) ? 1 : -1;
      var duration = articulation.getNote().getDuration();

      if(!is_on_head && duration !== "w" && duration !== "1"){
        // Add stem length, inless it's on a whole note
        note_line += offset_direction * 3.5;
      }

      var articulation_line = note_line + (offset_direction * line_spacing);

      if(articulation_line >= 1 &&
         articulation_line <= 5 &&
         articulation_line % 1 === 0){
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
      if (this.note.hasStem()){
        if (stem_direction === Vex.Flow.StaveNote.STEM_UP) {
          bottom = stave.getYForBottomText(this.text_line - 2);
        } else if (stem_direction === Vex.Flow.StaveNote.STEM_DOWN ) {
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

      if (this.articulation.between_lines)
        glyph_y = glyph_y_between_lines;
      else
        glyph_y = Math.min(stave.getYForTopText(this.text_line) - 3, glyph_y_between_lines);
    } else {
      shiftY = this.articulation.shift_down - 10;

      glyph_y_between_lines = bottom + 10 + spacing * (this.text_line + line_spacing);
      if (this.articulation.between_lines)
        glyph_y = glyph_y_between_lines;
      else
        glyph_y = Math.max(stave.getYForBottomText(this.text_line), glyph_y_between_lines);
    }

    var glyph_x = start.x + this.articulation.shift_right;
    glyph_y += shiftY + this.y_shift;

    L("Rendering articulation: ", this.articulation, glyph_x, glyph_y);
    Vex.Flow.renderGlyph(this.context, glyph_x, glyph_y,
      this.render_options.font_scale, this.articulation.code);

    // ### START ADDITION
    this.x = glyph_x;
    this.y = glyph_y;
    // ### END ADDITION

  };

















  // ### modifications for center aligned mRests by Silverwolf90
  // ### (remove when his pull request is merged in VexFlow!)

  VF.TickContext.prototype.init = function() {
    this.currentTick = new Vex.Flow.Fraction(0, 1);
    this.maxTicks = new Vex.Flow.Fraction(0, 1);
    this.minTicks = null;
    this.width = 0;
    this.padding = 3;     // padding on each side (width += padding * 2)
    this.pixelsUsed = 0;
    this.x = 0;
    this.tickables = [];   // Notes, tabs, chords, lyrics.
    this.notePx = 0;       // width of widest note in this context
    this.extraLeftPx = 0;  // Extra left pixels for modifers & displace notes
    this.extraRightPx = 0; // Extra right pixels for modifers & displace notes

    // ### START ADDITION
    this.align_center = false;
    // ### END ADDITION

    this.tContexts = [];   // Parent array of tick contexts

    // Ignore this tick context for formatting and justification
    this.ignore_ticks = true;
    this.preFormatted = false;
    this.postFormatted = false;
    this.context = null; // Rendering context
  };

  // ### START ADDITION
  VF.TickContext.prototype.getCenterAlignedTickables = function() {
    return this.tickables.filter(function(tickable) {
      return tickable.isCenterAligned();
    });
  };
  // ### END ADDITION

  VF.Tickable.prototype.init = function() {
    this.intrinsicTicks = 0;
    this.tickMultiplier = new Vex.Flow.Fraction(1, 1);
    this.ticks = new Vex.Flow.Fraction(0, 1);
    this.width = 0;
    this.x_shift = 0; // Shift from tick context
    this.voice = null;
    this.tickContext = null;
    this.modifierContext = null;
    this.modifiers = [];
    this.preFormatted = false;
    this.postFormatted = false;
    this.tuplet = null;
    // ### START ADDITION
    this.align_center = false;
    // ### END ADDITION

    // This flag tells the formatter to ignore this tickable during
    // formatting and justification. It is set by tickables such as BarNote.
    this.ignore_ticks = false;
    this.context = null;
  };

  // ### START ADDITION
  VF.Tickable.prototype.isCenterAligned = function() { return this.align_center; };
  VF.Tickable.prototype.setCenterAlignment = function(align_center) {
    this.align_center = align_center;
    return this;
  };
  VF.Tickable.prototype.setDuration = function(duration) {
    var ticks = duration.numerator * (Vex.Flow.RESOLUTION / duration.denominator);
    this.ticks = this.tickMultiplier.clone().multiply(ticks);
    this.intrinsicTicks = this.ticks.value();
  };
  // ### END ADDITION

  VF.Note.prototype.init = function(note_struct) {
    VF.Note.superclass.init.call(this);

    if (!note_struct) {
      throw new Vex.RuntimeError("BadArguments",
          "Note must have valid initialization data to identify " +
          "duration and type.");
    }

    // Parse `note_struct` and get note properties.
    var initData = Vex.Flow.parseNoteData(note_struct);
    if (!initData) {
      throw new Vex.RuntimeError("BadArguments",
          "Invalid note initialization object: " + JSON.stringify(note_struct));
    }

    // Set note properties from parameters.
    this.duration = initData.duration;
    this.dots = initData.dots;
    this.noteType = initData.type;

    // ### START MODIFICATION
    if (note_struct.duration_override) {
      // Custom duration
      this.setDuration(note_struct.duration_override);
    } else {
      // Default duration
      this.setIntrinsicTicks(initData.ticks);
    }
    // ### END MODIFICATION

    this.modifiers = [];

    // Get the glyph code for this note from the font.
    this.glyph = Vex.Flow.durationToGlyph(this.duration, this.noteType);

    if (this.positions &&
        (typeof(this.positions) != "object" || !this.positions.length)) {
      throw new Vex.RuntimeError(
        "BadArguments", "Note keys must be array type.");
    }

    // Note to play for audio players.
    this.playNote = null;

    // Positioning contexts used by the Formatter.
    this.tickContext = null;    // The current tick context.
    this.modifierContext = null;
    this.ignore_ticks = false;

    // Positioning variables
    this.width = 0;             // Width in pixels calculated after preFormat
    this.extraLeftPx = 0;       // Extra room on left for offset note head
    this.extraRightPx = 0;      // Extra room on right for offset note head
    this.x_shift = 0;           // X shift from tick context X
    this.left_modPx = 0;        // Max width of left modifiers
    this.right_modPx = 0;       // Max width of right modifiers
    this.voice = null;          // The voice that this note is in
    this.preFormatted = false;  // Is this note preFormatted?
    this.ys = [];               // list of y coordinates for each note
    // we need to hold on to these for ties and beams.

    // ### START ADDITION
    if (note_struct.align_center) {
      this.setCenterAlignment(note_struct.align_center);
    }
    // ### END ADDITION

    // The render surface.
    this.context = null;
    this.stave = null;
    this.render_options = {
      annotation_spacing: 5,
      stave_padding: 12
    };
  };


  VF.Formatter.prototype.preFormat = function(justifyWidth, rendering_context, voices, stave) {
    // Initialize context maps.
    var contexts = this.tContexts;
    var contextList = contexts.list;
    var contextMap = contexts.map;

    // If voices and a stave were provided, set the Stave for each voice
    // and preFormat to apply Y values to the notes;
    if (voices && stave) {
      voices.forEach(function(voice) {
        voice.setStave(stave);
        voice.preFormat();
      });
    }

    // Figure out how many pixels to allocate per tick.
    if (!justifyWidth) {
      justifyWidth = 0;
      this.pixelsPerTick = 0;
    } else {
      this.pixelsPerTick = justifyWidth / (this.totalTicks.value() * contexts.resolutionMultiplier);
    }

    // Now distribute the ticks to each tick context, and assign them their
    // own X positions.
    var x = 0;

    // ### START ADDITION
    var center_x = justifyWidth / 2;
    // ### END ADDITION

    var white_space = 0; // White space to right of previous note
    var tick_space = 0;  // Pixels from prev note x-pos to curent note x-pos
    var prev_tick = 0;
    var prev_width = 0;
    var lastMetrics = null;
    var initial_justify_width = justifyWidth;
    this.minTotalWidth = 0;

    var i, tick, context;

    // Pass 1: Give each note maximum width requested by context.
    for (i = 0; i < contextList.length; ++i) {
      tick = contextList[i];
      context = contextMap[tick];
      if (rendering_context) context.setContext(rendering_context);

      // Make sure that all tickables in this context have calculated their
      // space requirements.
      context.preFormat();

      var thisMetrics = context.getMetrics();
      var width = context.getWidth();
      this.minTotalWidth += width;
      var min_x = 0;
      var pixels_used = width;

      // Calculate space between last note and next note.
      tick_space = Math.min((tick - prev_tick) * this.pixelsPerTick, pixels_used);

      // Shift next note up `tick_space` pixels.
      var set_x = x + tick_space;

      // Calculate the minimum next note position to allow for right modifiers.
      if (lastMetrics != null) {
        min_x = x + prev_width - lastMetrics.extraLeftPx;
      }

      // Determine the space required for the previous tick.
      // The `shouldIgnoreTicks` bool is true for elements in the stave
      // that don't consume ticks (bar lines, key and time signatures, etc.)
      set_x = context.shouldIgnoreTicks() ?
              (min_x + context.getWidth()) : Math.max(set_x, min_x);

      if (context.shouldIgnoreTicks() && justifyWidth) {
        // This note stole room... recalculate with new justification width.
        justifyWidth -= context.getWidth();
        this.pixelsPerTick = justifyWidth /
                             (this.totalTicks.value() * contexts.resolutionMultiplier);
      }

      // Determine pixels needed for left modifiers.
      var left_px = thisMetrics.extraLeftPx;

      // Determine white space to right of previous tick (from right modifiers.)
      if (lastMetrics != null) {
        white_space = (set_x - x) - (prev_width -
                                     lastMetrics.extraLeftPx);
      }

      // Deduct pixels from white space quota.
      if (i > 0) {
        if (white_space > 0) {
          if (white_space >= left_px) {
            // Have enough white space for left modifiers - no offset needed.
            left_px = 0;
          } else {
            // Decrease left modifier offset by amount of white space.
            left_px -= white_space;
          }
        }
      }

      // Adjust the tick x position with the left modifier offset.
      set_x += left_px;

      // Set the `x` value for the context, which sets the `x` value for all
      // tickables in this context.
      context.setX(set_x);
      context.setPixelsUsed(pixels_used);  // ??? Remove this if nothing breaks

      lastMetrics = thisMetrics;
      prev_width = width;
      prev_tick = tick;
      x = set_x;
    }

    this.hasMinTotalWidth = true;
    if (justifyWidth > 0) {
      // Pass 2: Take leftover width, and distribute it to proportionately to
      // all notes.
      var remaining_x = initial_justify_width - (x + prev_width);
      var leftover_pixels_per_tick = remaining_x / (this.totalTicks.value() * contexts.resolutionMultiplier);
      var accumulated_space = 0;
      prev_tick = 0;

      for (i = 0; i < contextList.length; ++i) {
        tick = contextList[i];
        context = contextMap[tick];
        tick_space = (tick - prev_tick) * leftover_pixels_per_tick;
        accumulated_space = accumulated_space + tick_space;
        context.setX(context.getX() + accumulated_space);
        prev_tick = tick;

        // ### START ADDITION
        // Move center aligned tickables to middle
        var centeredTickables = context.getCenterAlignedTickables();
        centeredTickables.forEach(function(tickable) {
          // tickable.x_shift = center_x - context.getX();
          tickable.x_shift = (justifyWidth - tickable.getWidth()) / 2;
        });
        // ### END ADDITION
      }
    }
  };


});

