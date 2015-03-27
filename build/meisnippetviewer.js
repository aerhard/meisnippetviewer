(function($, undefined) {var MEI2VF = {}, m2v=MEI2VF;/*
 * Mei Snippet Viewer
 * Copyright © 2014 Alexander Erhard (http://alexandererhard.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License.  You may
 * obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.  See the License for the specific language governing
 * permissions and limitations under the License.
 */

/*
 * MEItoVexFlow
 *
 * Author: Richard Lewis
 * Contributors: Zoltan Komives, Raffaele Viglianti
 *
 * See README for details of this library
 *
 * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License.  You may
 * obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.  See the License for the specific language governing
 * permissions and limitations under the License.
 */

/*
 * Vex Flow - A JavaScript library for rendering music notation.
 *   Copyright (c) 2010 Mohit Muthanna Cheppudira
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
;/**
 * VexFlow 1.2.27 built on 2015-02-28.
 * Copyright (c) 2010 Mohit Muthanna Cheppudira <mohit@muthanna.com>
 *
 * http://www.vexflow.com  http://github.com/0xfe/vexflow
 */

function sanitizeDuration(a){var b=Vex.Flow.durationAliases[a];if(void 0!==b&&(a=b),void 0===Vex.Flow.durationToTicks.durations[a])throw new Vex.RERR("BadArguments","The provided duration is not valid");return a}if("undefined"==typeof Vex&&(Vex=function(){}),Vex.L=function(a,b){if(b){var c=Array.prototype.slice.call(b).join(" ");window.console.log(a+": "+c)}},Vex.RuntimeError=function(a,b){this.code=a,this.message=b},Vex.RuntimeError.prototype.toString=function(){return"RuntimeError: "+this.message},Vex.RERR=Vex.RuntimeError,Vex.Merge=function(a,b){for(var c in b)a[c]=b[c];return a},Vex.Min=function(a,b){return a>b?b:a},Vex.Max=function(a,b){return a>b?a:b},Vex.RoundN=function(a,b){return a%b>=b/2?parseInt(a/b,10)*b+b:parseInt(a/b,10)*b},Vex.MidLine=function(a,b){var c=b+(a-b)/2;return c%2>0&&(c=Vex.RoundN(10*c,5)/10),c},Vex.SortAndUnique=function(a,b,c){if(a.length>1){var d,e=[];a.sort(b);for(var f=0;f<a.length;++f)0!==f&&c(a[f],d)||e.push(a[f]),d=a[f];return e}return a},Vex.Contains=function(a,b){for(var c=a.length;c--;)if(a[c]===b)return!0;return!1},Vex.getCanvasContext=function(a){if(!a)throw new Vex.RERR("BadArgument","Invalid canvas selector: "+a);var b=document.getElementById(a);if(!b||!b.getContext)throw new Vex.RERR("UnsupportedBrowserError","This browser does not support HTML5 Canvas");return b.getContext("2d")},Vex.drawDot=function(a,b,c,d){var e=d||"#f55";a.save(),a.fillStyle=e,a.beginPath(),a.arc(b,c,3,0,2*Math.PI,!0),a.closePath(),a.fill(),a.restore()},Vex.BM=function(a,b){var c=(new Date).getTime();b();var d=(new Date).getTime()-c;Vex.L(a+d+"ms")},Vex.Inherit=function(){var a=function(){};return function(b,c,d){return a.prototype=c.prototype,b.prototype=new a,b.superclass=c.prototype,b.prototype.constructor=b,Vex.Merge(b.prototype,d),b}}(),"function"==typeof require)try{module.exports=Vex}catch(e){}else"function"==typeof define&&define.amd?define("Vex",[],function(){return Vex}):(this||window).Vex=Vex;"undefined"==typeof Vex.Flow&&(Vex.Flow={RESOLUTION:16384,IsKerned:!0}),Vex.Flow.Fraction=function(){function a(a,b){this.set(a,b)}return a.GCD=function(a,b){if("number"!=typeof a||"number"!=typeof b)throw new Vex.RERR("BadArgument","Invalid numbers: "+a+", "+b);for(var c;0!==b;)c=b,b=a%b,a=c;return a},a.LCM=function(b,c){return b*c/a.GCD(b,c)},a.LCMM=function(b){if(0===b.length)return 0;if(1==b.length)return b[0];if(2==b.length)return Vex.Flow.Fraction.LCM(b[0],b[1]);var c=b[0];return b.shift(),a.LCM(c,Vex.Flow.Fraction.LCMM(b))},a.prototype={set:function(a,b){return this.numerator=void 0===a?1:a,this.denominator=void 0===b?1:b,this},value:function(){return this.numerator/this.denominator},simplify:function(){var a=this.numerator,b=this.denominator,c=Vex.Flow.Fraction.GCD(a,b);return a/=c,b/=c,0>b&&(b=-b,a=-a),this.set(a,b)},add:function(a,b){var c,d;a instanceof Vex.Flow.Fraction?(c=a.numerator,d=a.denominator):(c=void 0!==a?a:0,d=void 0!==b?b:1);var e=Vex.Flow.Fraction.LCM(this.denominator,d),f=e/this.denominator,g=e/d,h=this.numerator*f+c*g;return this.set(h,e)},subtract:function(a,b){var c,d;a instanceof Vex.Flow.Fraction?(c=a.numerator,d=a.denominator):(c=void 0!==a?a:0,d=void 0!==b?b:1);var e=Vex.Flow.Fraction.LCM(this.denominator,d),f=e/this.denominator,g=e/d,h=this.numerator*f-c*g;return this.set(h,e)},multiply:function(a,b){var c,d;return a instanceof Vex.Flow.Fraction?(c=a.numerator,d=a.denominator):(c=void 0!==a?a:1,d=void 0!==b?b:1),this.set(this.numerator*c,this.denominator*d)},divide:function(a,b){var c,d;return a instanceof Vex.Flow.Fraction?(c=a.numerator,d=a.denominator):(c=void 0!==a?a:1,d=void 0!==b?b:1),this.set(this.numerator*d,this.denominator*c)},equals:function(a){var b=Vex.Flow.Fraction.__compareA.copy(a).simplify(),c=Vex.Flow.Fraction.__compareB.copy(this).simplify();return b.numerator===c.numerator&&b.denominator===c.denominator},greaterThan:function(a){var b=Vex.Flow.Fraction.__compareB.copy(this);return b.subtract(a),b.numerator>0},greaterThanEquals:function(a){var b=Vex.Flow.Fraction.__compareB.copy(this);return b.subtract(a),b.numerator>=0},lessThan:function(a){return!this.greaterThanEquals(a)},lessThanEquals:function(a){return!this.greaterThan(a)},clone:function(){return new Vex.Flow.Fraction(this.numerator,this.denominator)},copy:function(a){return this.set(a.numerator,a.denominator)},quotient:function(){return Math.floor(this.numerator/this.denominator)},fraction:function(){return this.numerator%this.denominator},abs:function(){return this.denominator=Math.abs(this.denominator),this.numerator=Math.abs(this.numerator),this},toString:function(){return this.numerator+"/"+this.denominator},toSimplifiedString:function(){return Vex.Flow.Fraction.__tmp.copy(this).simplify().toString()},toMixedString:function(){var a="",b=this.quotient(),c=Vex.Flow.Fraction.__tmp.copy(this);return 0>b?c.abs().fraction():c.fraction(),0!==b?(a+=b,0!==c.numerator&&(a+=" "+c.toSimplifiedString())):a=0===c.numerator?"0":c.toSimplifiedString(),a},parse:function(a){var b=a.split("/"),c=parseInt(b[0],10),d=b[1]?parseInt(b[1],10):1;return this.set(c,d)}},a.__compareA=new a,a.__compareB=new a,a.__tmp=new a,a}(),Vex.Flow.STEM_WIDTH=1.5,Vex.Flow.STEM_HEIGHT=32,Vex.Flow.STAVE_LINE_THICKNESS=1,Vex.Flow.clefProperties=function(a){if(!a)throw new Vex.RERR("BadArgument","Invalid clef: "+a);var b=Vex.Flow.clefProperties.values[a];if(!b)throw new Vex.RERR("BadArgument","Invalid clef: "+a);return b},Vex.Flow.clefProperties.values={treble:{line_shift:0},bass:{line_shift:6},tenor:{line_shift:4},alto:{line_shift:3},soprano:{line_shift:1},percussion:{line_shift:0},"mezzo-soprano":{line_shift:2},"baritone-c":{line_shift:5},"baritone-f":{line_shift:5},subbass:{line_shift:7},french:{line_shift:-1}},Vex.Flow.keyProperties=function(a,b,c){void 0===b&&(b="treble");var d={octave_shift:0};"object"==typeof c&&Vex.Merge(d,c);var e=a.split("/");if(e.length<2)throw new Vex.RERR("BadArguments","Key must have note + octave and an optional glyph: "+a);var f=e[0].toUpperCase(),g=Vex.Flow.keyProperties.note_values[f];if(!g)throw new Vex.RERR("BadArguments","Invalid key name: "+f);g.octave&&(e[1]=g.octave);var h=parseInt(e[1]);h+=-1*d.octave_shift;var i=7*h-28,j=(i+g.index)/2;j+=Vex.Flow.clefProperties(b).line_shift;var k=0;0>=j&&2*j%2===0&&(k=1),j>=6&&2*j%2===0&&(k=-1);var l="undefined"!=typeof g.int_val?12*h+g.int_val:null,m=g.code,n=g.shift_right;if(e.length>2&&e[2]){var o=e[2].toUpperCase(),p=Vex.Flow.keyProperties.note_glyph[o];p&&(m=p.code,n=p.shift_right)}return{key:f,octave:h,line:j,int_value:l,accidental:g.accidental,code:m,stroke:k,shift_right:n,displaced:!1}},Vex.Flow.keyProperties.note_values={C:{index:0,int_val:0,accidental:null},CN:{index:0,int_val:0,accidental:"n"},"C#":{index:0,int_val:1,accidental:"#"},"C##":{index:0,int_val:2,accidental:"##"},CB:{index:0,int_val:-1,accidental:"b"},CBB:{index:0,int_val:-2,accidental:"bb"},D:{index:1,int_val:2,accidental:null},DN:{index:1,int_val:2,accidental:"n"},"D#":{index:1,int_val:3,accidental:"#"},"D##":{index:1,int_val:4,accidental:"##"},DB:{index:1,int_val:1,accidental:"b"},DBB:{index:1,int_val:0,accidental:"bb"},E:{index:2,int_val:4,accidental:null},EN:{index:2,int_val:4,accidental:"n"},"E#":{index:2,int_val:5,accidental:"#"},"E##":{index:2,int_val:6,accidental:"##"},EB:{index:2,int_val:3,accidental:"b"},EBB:{index:2,int_val:2,accidental:"bb"},F:{index:3,int_val:5,accidental:null},FN:{index:3,int_val:5,accidental:"n"},"F#":{index:3,int_val:6,accidental:"#"},"F##":{index:3,int_val:7,accidental:"##"},FB:{index:3,int_val:4,accidental:"b"},FBB:{index:3,int_val:3,accidental:"bb"},G:{index:4,int_val:7,accidental:null},GN:{index:4,int_val:7,accidental:"n"},"G#":{index:4,int_val:8,accidental:"#"},"G##":{index:4,int_val:9,accidental:"##"},GB:{index:4,int_val:6,accidental:"b"},GBB:{index:4,int_val:5,accidental:"bb"},A:{index:5,int_val:9,accidental:null},AN:{index:5,int_val:9,accidental:"n"},"A#":{index:5,int_val:10,accidental:"#"},"A##":{index:5,int_val:11,accidental:"##"},AB:{index:5,int_val:8,accidental:"b"},ABB:{index:5,int_val:7,accidental:"bb"},B:{index:6,int_val:11,accidental:null},BN:{index:6,int_val:11,accidental:"n"},"B#":{index:6,int_val:12,accidental:"#"},"B##":{index:6,int_val:13,accidental:"##"},BB:{index:6,int_val:10,accidental:"b"},BBB:{index:6,int_val:9,accidental:"bb"},R:{index:6,int_val:9,rest:!0},X:{index:6,accidental:"",octave:4,code:"v3e",shift_right:5.5}},Vex.Flow.keyProperties.note_glyph={D0:{code:"v27",shift_right:-.5},D1:{code:"v2d",shift_right:-.5},D2:{code:"v22",shift_right:-.5},D3:{code:"v70",shift_right:-.5},T0:{code:"v49",shift_right:-2},T1:{code:"v93",shift_right:.5},T2:{code:"v40",shift_right:.5},T3:{code:"v7d",shift_right:.5},X0:{code:"v92",shift_right:-2},X1:{code:"v95",shift_right:-.5},X2:{code:"v7f",shift_right:.5},X3:{code:"v3b",shift_right:-2}},Vex.Flow.integerToNote=function(a){if("undefined"==typeof a)throw new Vex.RERR("BadArguments","Undefined integer for integerToNote");if(-2>a)throw new Vex.RERR("BadArguments","integerToNote requires integer > -2: "+a);var b=Vex.Flow.integerToNote.table[a];if(!b)throw new Vex.RERR("BadArguments","Unknown note value for integer: "+a);return b},Vex.Flow.integerToNote.table={0:"C",1:"C#",2:"D",3:"D#",4:"E",5:"F",6:"F#",7:"G",8:"G#",9:"A",10:"A#",11:"B"},Vex.Flow.tabToGlyph=function(a){var b=null,c=0,d=0;return"X"==a.toString().toUpperCase()?(b="v7f",c=7,d=-4.5):c=Vex.Flow.textWidth(a.toString()),{text:a,code:b,width:c,shift_y:d}},Vex.Flow.textWidth=function(a){return 6*a.toString().length},Vex.Flow.articulationCodes=function(a){return Vex.Flow.articulationCodes.articulations[a]},Vex.Flow.articulationCodes.articulations={"a.":{code:"v23",width:4,shift_right:-2,shift_up:8,shift_down:0,between_lines:!0},av:{code:"v28",width:4,shift_right:0,shift_up:11,shift_down:5,between_lines:!0},"a>":{code:"v42",width:10,shift_right:5,shift_up:8,shift_down:1,between_lines:!0},"a-":{code:"v25",width:9,shift_right:-4,shift_up:17,shift_down:10,between_lines:!0},"a^":{code:"va",width:8,shift_right:0,shift_up:-4,shift_down:-2,between_lines:!1},"a+":{code:"v8b",width:9,shift_right:-4,shift_up:12,shift_down:12,between_lines:!1},ao:{code:"v94",width:8,shift_right:0,shift_up:-4,shift_down:6,between_lines:!1},ah:{code:"vb9",width:7,shift_right:0,shift_up:-4,shift_down:4,between_lines:!1},"a@a":{code:"v43",width:25,shift_right:0,shift_up:8,shift_down:10,between_lines:!1},"a@u":{code:"v5b",width:25,shift_right:0,shift_up:0,shift_down:-4,between_lines:!1},"a|":{code:"v75",width:8,shift_right:0,shift_up:8,shift_down:10,between_lines:!1},am:{code:"v97",width:13,shift_right:0,shift_up:10,shift_down:12,between_lines:!1},"a,":{code:"vb3",width:6,shift_right:8,shift_up:-4,shift_down:4,between_lines:!1}},Vex.Flow.accidentalCodes=function(a){return Vex.Flow.accidentalCodes.accidentals[a]},Vex.Flow.accidentalCodes.accidentals={"#":{code:"v18",width:10,gracenote_width:4.5,shift_right:0,shift_down:0},"##":{code:"v7f",width:13,gracenote_width:6,shift_right:-1,shift_down:0},b:{code:"v44",width:8,gracenote_width:4.5,shift_right:0,shift_down:0},bb:{code:"v26",width:14,gracenote_width:8,shift_right:-3,shift_down:0},n:{code:"v4e",width:8,gracenote_width:4.5,shift_right:0,shift_down:0},"{":{code:"v9c",width:5,shift_right:2,shift_down:0},"}":{code:"v84",width:5,shift_right:0,shift_down:0},db:{code:"v9e",width:16,shift_right:0,shift_down:0},d:{code:"vab",width:10,shift_right:0,shift_down:0},bbs:{code:"v90",width:13,shift_right:0,shift_down:0},"++":{code:"v51",width:13,shift_right:0,shift_down:0},"+":{code:"v78",width:8,shift_right:0,shift_down:0}},Vex.Flow.accidentalColumnsTable={1:{a:[1],b:[1]},2:{a:[1,2]},3:{a:[1,3,2],b:[1,2,1],second_on_bottom:[1,2,3]},4:{a:[1,3,4,2],b:[1,2,3,1],spaced_out_tetrachord:[1,2,1,2]},5:{a:[1,3,5,4,2],b:[1,2,4,3,1],spaced_out_pentachord:[1,2,3,2,1],very_spaced_out_pentachord:[1,2,1,2,1]},6:{a:[1,3,5,6,4,2],b:[1,2,4,5,3,1],spaced_out_hexachord:[1,3,2,1,3,2],very_spaced_out_hexachord:[1,2,1,2,1,2]}},Vex.Flow.ornamentCodes=function(a){return Vex.Flow.ornamentCodes.ornaments[a]},Vex.Flow.ornamentCodes.ornaments={mordent:{code:"v1e",shift_right:1,shift_up:0,shift_down:5,width:14},mordent_inverted:{code:"v45",shift_right:1,shift_up:0,shift_down:5,width:14},turn:{code:"v72",shift_right:1,shift_up:0,shift_down:5,width:20},turn_inverted:{code:"v33",shift_right:1,shift_up:0,shift_down:6,width:20},tr:{code:"v1f",shift_right:0,shift_up:5,shift_down:15,width:10},upprall:{code:"v60",shift_right:1,shift_up:-3,shift_down:6,width:20},downprall:{code:"vb4",shift_right:1,shift_up:-3,shift_down:6,width:20},prallup:{code:"v6d",shift_right:1,shift_up:-3,shift_down:6,width:20},pralldown:{code:"v2c",shift_right:1,shift_up:-3,shift_down:6,width:20},upmordent:{code:"v29",shift_right:1,shift_up:-3,shift_down:6,width:20},downmordent:{code:"v68",shift_right:1,shift_up:-3,shift_down:6,width:20},lineprall:{code:"v20",shift_right:1,shift_up:-3,shift_down:6,width:20},prallprall:{code:"v86",shift_right:1,shift_up:-3,shift_down:6,width:20}},Vex.Flow.keySignature=function(a){var b=Vex.Flow.keySignature.keySpecs[a];if(!b)throw new Vex.RERR("BadKeySignature","Bad key signature spec: '"+a+"'");if(!b.acc)return[];for(var c=Vex.Flow.keySignature.accidentalList(b.acc),d=[],e=0;e<b.num;++e){var f=c[e];d.push({type:b.acc,line:f})}return d},Vex.Flow.keySignature.keySpecs={C:{acc:null,num:0},Am:{acc:null,num:0},F:{acc:"b",num:1},Dm:{acc:"b",num:1},Bb:{acc:"b",num:2},Gm:{acc:"b",num:2},Eb:{acc:"b",num:3},Cm:{acc:"b",num:3},Ab:{acc:"b",num:4},Fm:{acc:"b",num:4},Db:{acc:"b",num:5},Bbm:{acc:"b",num:5},Gb:{acc:"b",num:6},Ebm:{acc:"b",num:6},Cb:{acc:"b",num:7},Abm:{acc:"b",num:7},G:{acc:"#",num:1},Em:{acc:"#",num:1},D:{acc:"#",num:2},Bm:{acc:"#",num:2},A:{acc:"#",num:3},"F#m":{acc:"#",num:3},E:{acc:"#",num:4},"C#m":{acc:"#",num:4},B:{acc:"#",num:5},"G#m":{acc:"#",num:5},"F#":{acc:"#",num:6},"D#m":{acc:"#",num:6},"C#":{acc:"#",num:7},"A#m":{acc:"#",num:7}},Vex.Flow.unicode={sharp:String.fromCharCode(parseInt("266F",16)),flat:String.fromCharCode(parseInt("266D",16)),natural:String.fromCharCode(parseInt("266E",16)),triangle:String.fromCharCode(parseInt("25B3",16)),"o-with-slash":String.fromCharCode(parseInt("00F8",16)),degrees:String.fromCharCode(parseInt("00B0",16)),circle:String.fromCharCode(parseInt("25CB",16))},Vex.Flow.keySignature.accidentalList=function(a){return"b"==a?[2,.5,2.5,1,3,1.5,3.5]:"#"==a?[0,1.5,-.5,1,2.5,.5,2]:void 0},Vex.Flow.parseNoteDurationString=function(a){if("string"!=typeof a)return null;var b=/(\d*\/?\d+|[a-z])(d*)([nrhms]|$)/,c=b.exec(a);if(!c)return null;var d=c[1],e=c[2].length,f=c[3];return 0===f.length&&(f="n"),{duration:d,dots:e,type:f}},Vex.Flow.parseNoteData=function(a){var b=a.duration,c=Vex.Flow.parseNoteDurationString(b);if(!c)return null;var d=Vex.Flow.durationToTicks(c.duration);if(null==d)return null;var e=a.type;if(e){if("n"!==e&&"r"!==e&&"h"!==e&&"m"!==e&&"s"!==e)return null}else e=c.type,e||(e="n");var f=0;if(f=a.dots?a.dots:c.dots,"number"!=typeof f)return null;for(var g=d,h=0;f>h;h++){if(1>=g)return null;g/=2,d+=g}return{duration:c.duration,type:e,dots:f,ticks:d}},Vex.Flow.durationToFraction=function(a){return(new Vex.Flow.Fraction).parse(sanitizeDuration(a))},Vex.Flow.durationToNumber=function(a){return Vex.Flow.durationToFraction(a).value()},Vex.Flow.durationToTicks=function(a){a=sanitizeDuration(a);var b=Vex.Flow.durationToTicks.durations[a];return void 0===b?null:b},Vex.Flow.durationToTicks.durations={"1/2":2*Vex.Flow.RESOLUTION,1:Vex.Flow.RESOLUTION/1,2:Vex.Flow.RESOLUTION/2,4:Vex.Flow.RESOLUTION/4,8:Vex.Flow.RESOLUTION/8,16:Vex.Flow.RESOLUTION/16,32:Vex.Flow.RESOLUTION/32,64:Vex.Flow.RESOLUTION/64,128:Vex.Flow.RESOLUTION/128,256:Vex.Flow.RESOLUTION/256},Vex.Flow.durationAliases={w:"1",h:"2",q:"4",b:"256"},Vex.Flow.durationToGlyph=function(a,b){var c=Vex.Flow.durationAliases[a];void 0!==c&&(a=c);var d=Vex.Flow.durationToGlyph.duration_codes[a];if(void 0===d)return null;b||(b="n");var e=d.type[b];return void 0===e?null:Vex.Merge(Vex.Merge({},d.common),e)},Vex.Flow.durationToGlyph.duration_codes={"1/2":{common:{head_width:22,stem:!1,stem_offset:0,flag:!1,stem_up_extension:-Vex.Flow.STEM_HEIGHT,stem_down_extension:-Vex.Flow.STEM_HEIGHT,gracenote_stem_up_extension:-Vex.Flow.STEM_HEIGHT,gracenote_stem_down_extension:-Vex.Flow.STEM_HEIGHT,tabnote_stem_up_extension:-Vex.Flow.STEM_HEIGHT,tabnote_stem_down_extension:-Vex.Flow.STEM_HEIGHT,dot_shiftY:0,line_above:0,line_below:0},type:{n:{code_head:"v53"},h:{code_head:"v59"},m:{code_head:"vf",stem_offset:0},r:{code_head:"v31",head_width:24,rest:!0,position:"B/5",dot_shiftY:.5},s:{head_width:15,position:"B/4"}}},1:{common:{head_width:16,stem:!1,stem_offset:0,flag:!1,stem_up_extension:-Vex.Flow.STEM_HEIGHT,stem_down_extension:-Vex.Flow.STEM_HEIGHT,gracenote_stem_up_extension:-Vex.Flow.STEM_HEIGHT,gracenote_stem_down_extension:-Vex.Flow.STEM_HEIGHT,tabnote_stem_up_extension:-Vex.Flow.STEM_HEIGHT,tabnote_stem_down_extension:-Vex.Flow.STEM_HEIGHT,dot_shiftY:0,line_above:0,line_below:0},type:{n:{code_head:"v1d"},h:{code_head:"v46"},m:{code_head:"v92",stem_offset:-3},r:{code_head:"v5c",head_width:12,rest:!0,position:"D/5",dot_shiftY:.5},s:{head_width:15,position:"B/4"}}},2:{common:{head_width:10,stem:!0,stem_offset:0,flag:!1,stem_up_extension:0,stem_down_extension:0,gracenote_stem_up_extension:-14,gracenote_stem_down_extension:-14,tabnote_stem_up_extension:0,tabnote_stem_down_extension:0,dot_shiftY:0,line_above:0,line_below:0},type:{n:{code_head:"v81"},h:{code_head:"v2d"},m:{code_head:"v95",stem_offset:-3},r:{code_head:"vc",head_width:12,stem:!1,rest:!0,position:"B/4",dot_shiftY:-.5},s:{head_width:15,position:"B/4"}}},4:{common:{head_width:10,stem:!0,stem_offset:0,flag:!1,stem_up_extension:0,stem_down_extension:0,gracenote_stem_up_extension:-14,gracenote_stem_down_extension:-14,tabnote_stem_up_extension:0,tabnote_stem_down_extension:0,dot_shiftY:0,line_above:0,line_below:0},type:{n:{code_head:"vb"},h:{code_head:"v22"},m:{code_head:"v3e",stem_offset:-3},r:{code_head:"v7c",head_width:8,stem:!1,rest:!0,position:"B/4",dot_shiftY:-.5,line_above:1.5,line_below:1.5},s:{head_width:15,position:"B/4"}}},8:{common:{head_width:10,stem:!0,stem_offset:0,flag:!0,beam_count:1,code_flag_upstem:"v54",code_flag_downstem:"v9a",stem_up_extension:0,stem_down_extension:0,gracenote_stem_up_extension:-14,gracenote_stem_down_extension:-14,tabnote_stem_up_extension:0,tabnote_stem_down_extension:0,dot_shiftY:0,line_above:0,line_below:0},type:{n:{code_head:"vb"},h:{code_head:"v22"},m:{code_head:"v3e"},r:{code_head:"va5",stem:!1,flag:!1,rest:!0,position:"B/4",dot_shiftY:-.5,line_above:1,line_below:1},s:{head_width:15,position:"B/4"}}},16:{common:{beam_count:2,head_width:10,stem:!0,stem_offset:0,flag:!0,code_flag_upstem:"v3f",code_flag_downstem:"v8f",stem_up_extension:4,stem_down_extension:0,gracenote_stem_up_extension:-14,gracenote_stem_down_extension:-14,tabnote_stem_up_extension:0,tabnote_stem_down_extension:0,dot_shiftY:0,line_above:0,line_below:0},type:{n:{code_head:"vb"},h:{code_head:"v22"},m:{code_head:"v3e"},r:{code_head:"v3c",head_width:13,stem:!1,flag:!1,rest:!0,position:"B/4",dot_shiftY:-.5,line_above:1,line_below:2},s:{head_width:15,position:"B/4"}}},32:{common:{beam_count:3,head_width:10,stem:!0,stem_offset:0,flag:!0,code_flag_upstem:"v47",code_flag_downstem:"v2a",stem_up_extension:13,stem_down_extension:9,gracenote_stem_up_extension:-12,gracenote_stem_down_extension:-12,tabnote_stem_up_extension:9,tabnote_stem_down_extension:5,dot_shiftY:0,line_above:0,line_below:0},type:{n:{code_head:"vb"},h:{code_head:"v22"},m:{code_head:"v3e"},r:{code_head:"v55",head_width:16,stem:!1,flag:!1,rest:!0,position:"B/4",dot_shiftY:-1.5,line_above:2,line_below:2},s:{head_width:15,position:"B/4"}}},64:{common:{beam_count:4,head_width:10,stem:!0,stem_offset:0,flag:!0,code_flag_upstem:"va9",code_flag_downstem:"v58",stem_up_extension:17,stem_down_extension:13,gracenote_stem_up_extension:-10,gracenote_stem_down_extension:-10,tabnote_stem_up_extension:13,tabnote_stem_down_extension:9,dot_shiftY:0,line_above:0,line_below:0},type:{n:{code_head:"vb"},h:{code_head:"v22"},m:{code_head:"v3e"},r:{code_head:"v38",head_width:18,stem:!1,flag:!1,rest:!0,position:"B/4",dot_shiftY:-1.5,line_above:2,line_below:3},s:{head_width:15,position:"B/4"}}},128:{common:{beam_count:5,head_width:10,stem:!0,stem_offset:0,flag:!0,code_flag_upstem:"v9b",code_flag_downstem:"v30",stem_up_extension:26,stem_down_extension:22,gracenote_stem_up_extension:-8,gracenote_stem_down_extension:-8,tabnote_stem_up_extension:22,tabnote_stem_down_extension:18,dot_shiftY:0,line_above:0,line_below:0},type:{n:{code_head:"vb"},h:{code_head:"v22"},m:{code_head:"v3e"},r:{code_head:"vaa",head_width:20,stem:!1,flag:!1,rest:!0,position:"B/4",dot_shiftY:1.5,line_above:3,line_below:3},s:{head_width:15,position:"B/4"}}}},Vex.Flow.TIME4_4={num_beats:4,beat_value:4,resolution:Vex.Flow.RESOLUTION},Vex.Flow.Font={glyphs:{v0:{x_min:0,x_max:514.5,ha:525,o:"m 236 648 b 246 648 238 648 242 648 b 288 646 261 648 283 648 b 472 513 364 634 428 587 b 514 347 502 464 514 413 b 462 163 514 272 499 217 b 257 44 409 83 333 44 b 50 163 181 44 103 83 b 0 347 14 217 0 272 b 40 513 0 413 12 464 b 236 648 87 591 155 638 m 277 614 b 253 616 273 616 261 616 b 242 616 247 616 243 616 b 170 499 193 609 181 589 b 159 348 163 446 159 398 b 166 222 159 308 161 266 b 201 91 174 138 183 106 b 257 76 215 81 235 76 b 311 91 277 76 299 81 b 347 222 330 106 338 138 b 353 348 352 266 353 308 b 344 499 353 398 351 446 b 277 614 333 587 322 606 m 257 -1 l 258 -1 l 255 -1 l 257 -1 m 257 673 l 258 673 l 255 673 l 257 673 "},v1:{x_min:-1.359375,x_max:344.359375,ha:351,o:"m 126 637 l 129 638 l 198 638 l 266 638 l 269 635 b 274 631 272 634 273 632 l 277 627 l 277 395 b 279 156 277 230 277 161 b 329 88 281 123 295 106 b 344 69 341 81 344 79 b 337 55 344 62 343 59 l 333 54 l 197 54 l 61 54 l 58 55 b 50 69 53 59 50 62 b 65 88 50 79 53 81 b 80 97 72 91 74 93 b 117 156 103 113 112 129 b 117 345 117 161 117 222 l 117 528 l 100 503 l 38 406 b 14 383 24 384 23 383 b -1 398 5 383 -1 390 b 4 415 -1 403 1 409 b 16 437 5 416 10 426 l 72 539 l 100 596 b 121 632 119 631 119 631 b 126 637 122 634 125 635 m 171 -1 l 172 -1 l 170 -1 l 171 -1 m 171 673 l 172 673 l 170 673 l 171 673 "},v2:{x_min:-1.359375,x_max:458.6875,ha:468,o:"m 197 648 b 216 648 201 648 208 648 b 258 646 232 648 253 648 b 419 546 333 637 393 599 b 432 489 428 528 432 509 b 356 342 432 440 405 384 b 235 278 322 313 288 295 b 69 170 166 256 107 217 b 69 169 69 170 69 169 b 69 169 69 169 69 169 b 74 173 69 169 72 170 b 209 222 112 204 163 222 b 310 195 247 222 274 215 b 371 179 332 184 352 179 b 396 181 379 179 387 179 b 428 202 409 184 423 194 b 442 212 431 209 436 212 b 458 197 450 212 458 206 b 441 148 458 190 449 165 b 299 44 409 84 353 44 b 288 45 295 44 292 44 b 250 61 274 45 268 49 b 122 99 212 86 164 99 b 73 91 104 99 88 97 b 28 63 53 84 34 72 b 14 54 25 56 20 54 b 1 62 9 54 4 56 l -1 65 l -1 79 b 0 99 -1 91 0 95 b 2 113 1 102 2 108 b 164 309 20 197 81 272 b 285 470 232 341 277 398 b 287 487 287 476 287 481 b 171 595 287 551 239 595 b 155 595 166 595 160 595 b 142 592 145 594 142 594 b 145 589 142 592 142 591 b 179 527 168 576 179 551 b 132 455 179 496 163 467 b 104 451 122 452 112 451 b 27 530 62 451 27 487 b 29 555 27 538 27 546 b 197 648 44 601 115 639 m 228 -1 l 230 -1 l 227 -1 l 228 -1 m 228 673 l 230 673 l 227 673 l 228 673 "},v3:{x_min:-1.359375,x_max:409.6875,ha:418,o:"m 174 648 b 191 648 176 648 183 648 b 225 648 204 648 220 648 b 402 523 317 638 389 588 b 404 503 404 517 404 510 b 402 484 404 495 404 488 b 264 373 389 437 334 394 b 257 370 259 371 257 371 b 257 370 257 370 257 370 b 264 369 258 370 261 369 b 409 202 359 334 409 267 b 318 72 409 152 381 104 b 200 43 281 52 240 43 b 23 113 134 43 69 68 b 0 169 6 129 0 149 b 77 249 0 210 29 249 l 77 249 b 152 174 125 249 152 212 b 103 102 152 145 137 116 b 103 102 103 102 103 102 b 147 94 103 101 132 95 b 153 94 149 94 151 94 b 265 206 219 94 265 141 b 264 226 265 213 265 219 b 147 355 253 299 204 353 b 126 371 133 356 126 362 b 147 388 126 383 132 388 b 254 474 196 391 238 424 b 259 502 258 484 259 494 b 182 592 259 544 228 582 b 156 595 175 595 166 595 b 115 592 142 595 129 594 l 111 591 l 115 588 b 152 524 141 574 152 549 b 92 449 152 491 130 458 b 76 448 87 448 81 448 b -1 530 32 448 -1 488 b 20 581 -1 548 5 566 b 174 648 55 619 108 641 m 204 -1 l 205 -1 l 202 -1 l 204 -1 m 204 673 l 205 673 l 202 673 l 204 673 "},v4:{x_min:0,x_max:468.21875,ha:478,o:"m 174 637 b 232 638 175 638 189 638 b 277 638 245 638 259 638 l 378 638 l 381 635 b 389 623 386 632 389 627 b 382 609 389 617 386 613 b 366 589 381 606 372 598 l 313 528 l 245 451 l 209 410 l 155 348 l 84 267 b 59 240 72 252 59 240 b 59 240 59 240 59 240 b 151 238 59 238 68 238 l 242 238 l 242 303 b 243 371 242 369 242 370 b 289 426 245 374 254 385 l 303 441 l 317 456 l 338 483 l 360 506 l 371 520 b 386 527 375 526 381 527 b 400 519 392 527 397 524 b 401 440 401 516 401 514 b 401 377 401 423 401 402 l 401 238 l 426 238 b 453 237 449 238 450 238 b 465 217 461 234 465 226 b 460 202 465 212 464 206 b 426 197 454 197 453 197 l 401 197 l 401 180 b 451 88 402 129 412 109 b 468 69 465 81 468 79 b 461 55 468 62 466 59 l 458 54 l 321 54 l 185 54 l 182 55 b 175 69 176 59 175 62 b 191 88 175 79 176 81 b 240 180 230 109 240 129 l 240 197 l 125 197 b 73 195 104 195 87 195 b 8 197 10 195 9 197 b 0 212 2 199 0 205 b 0 212 0 212 0 212 b 20 242 0 219 0 219 b 163 610 104 344 163 492 b 174 637 163 628 166 634 m 234 -1 l 235 -1 l 232 -1 l 234 -1 m 234 673 l 235 673 l 232 673 l 234 673 "},v5:{x_min:0,x_max:409.6875,ha:418,o:"m 47 637 b 53 638 49 638 50 638 b 69 634 55 638 61 637 b 210 610 114 619 161 610 b 363 634 259 610 311 619 b 382 638 372 637 378 638 b 392 634 386 638 389 637 b 397 623 396 630 397 627 b 393 610 397 620 396 616 b 298 505 368 552 338 520 b 212 494 277 498 246 494 b 65 517 163 494 106 502 b 61 517 62 517 61 517 b 61 517 61 517 61 517 b 51 408 61 517 51 412 b 51 408 51 408 51 408 b 51 408 51 408 51 408 b 61 412 53 408 55 409 b 125 434 80 421 103 430 b 185 441 145 440 166 441 b 409 244 310 441 409 353 b 401 191 409 227 406 209 b 197 43 375 105 287 43 b 159 47 183 43 171 44 b 23 123 112 56 61 86 b 0 180 6 140 0 159 b 76 260 0 220 31 260 b 92 259 81 260 87 259 b 152 183 132 251 152 216 b 100 112 152 152 134 122 b 95 111 98 112 95 111 b 95 111 95 111 95 111 b 129 98 95 109 119 101 b 148 97 136 97 141 97 b 264 235 206 97 261 158 b 265 248 265 240 265 244 b 210 398 265 312 243 373 b 179 408 201 406 194 408 b 174 408 178 408 176 408 b 53 369 130 408 88 394 b 34 359 39 359 38 359 b 17 374 24 359 17 365 b 39 628 17 384 38 625 b 47 637 40 631 43 635 m 204 -1 l 205 -1 l 202 -1 l 204 -1 m 204 673 l 205 673 l 202 673 l 204 673 "},v6:{x_min:0,x_max:475.03125,ha:485,o:"m 255 648 b 274 648 259 648 266 648 b 314 646 288 648 307 648 b 450 555 374 637 438 594 b 454 530 453 546 454 538 b 375 451 454 485 416 451 b 328 467 359 451 343 455 b 300 526 310 483 300 503 b 352 598 300 557 319 589 b 356 599 355 598 356 599 b 352 602 356 599 355 601 b 288 616 330 612 308 616 b 210 584 257 616 230 605 b 164 433 189 559 174 508 b 160 374 163 415 160 381 b 160 374 160 374 160 374 b 160 374 160 374 160 374 b 168 377 160 374 164 376 b 258 395 200 390 228 395 b 366 367 294 395 328 387 b 475 223 436 333 475 283 b 472 197 475 215 473 206 b 349 65 462 141 419 95 b 259 43 317 51 288 43 b 167 69 230 43 200 52 b 4 290 80 113 20 195 b 0 349 1 309 0 328 b 20 467 0 391 6 433 b 255 648 58 563 155 637 m 269 363 b 257 363 265 363 261 363 b 210 345 236 363 220 356 b 186 226 196 324 186 272 b 187 198 186 216 186 206 b 213 95 191 151 202 112 b 257 76 221 83 238 76 b 270 77 261 76 266 76 b 321 156 299 81 310 99 b 329 229 326 183 329 206 b 321 301 329 252 326 274 b 269 363 311 342 298 359 m 236 -1 l 238 -1 l 235 -1 l 236 -1 m 236 673 l 238 673 l 235 673 l 236 673 "},v7:{x_min:0,x_max:442.359375,ha:451,o:"m 147 648 b 166 649 153 649 160 649 b 313 598 217 649 273 630 b 340 587 323 588 328 587 l 341 587 b 412 628 367 587 390 601 b 427 638 416 635 421 638 b 439 632 431 638 435 637 b 442 623 441 630 442 628 b 430 569 442 616 439 603 b 352 369 408 492 377 410 b 300 259 325 324 313 298 b 273 84 283 205 273 140 b 265 55 273 65 272 59 l 261 54 l 181 54 l 99 54 l 96 55 b 91 61 95 56 92 59 l 89 63 l 89 77 b 147 263 89 133 111 202 b 261 401 176 313 212 355 b 378 541 315 449 349 489 l 382 548 l 375 544 b 240 495 333 512 285 495 b 129 535 198 495 160 509 b 84 560 108 552 95 560 b 76 559 81 560 78 560 b 31 487 59 555 43 530 b 14 470 27 473 24 470 b 1 477 8 470 4 471 l 0 480 l 0 553 l 0 627 l 1 630 b 16 638 4 635 9 638 b 23 635 17 638 20 637 b 49 626 36 626 39 626 b 96 638 59 626 80 630 b 104 639 99 638 102 639 b 117 644 107 641 112 642 b 147 648 125 645 137 648 m 220 -1 l 221 -1 l 219 -1 l 220 -1 m 220 673 l 221 673 l 219 673 l 220 673 "},v8:{x_min:0,x_max:488.640625,ha:499,o:"m 217 648 b 245 649 225 648 235 649 b 453 516 343 649 430 595 b 458 478 455 503 458 491 b 412 370 458 440 441 398 b 411 369 412 369 411 369 b 415 365 411 367 412 367 b 488 231 462 331 488 281 b 472 165 488 208 483 186 b 243 43 434 86 338 43 b 63 104 178 43 112 62 b 0 233 20 140 0 186 b 73 365 0 283 24 331 l 77 369 l 72 374 b 29 476 42 406 29 441 b 217 648 29 557 103 635 m 258 605 b 242 606 253 605 247 606 b 157 552 198 606 157 580 b 160 541 157 548 159 544 b 319 413 176 503 242 452 l 337 403 l 338 406 b 359 476 352 428 359 452 b 258 605 359 537 318 595 m 138 326 b 130 330 134 328 130 330 b 130 330 130 330 130 330 b 107 305 127 330 112 313 b 84 231 91 281 84 256 b 243 86 84 156 151 86 b 249 87 245 86 246 87 b 347 156 303 88 347 120 b 344 172 347 162 345 167 b 156 319 325 227 257 281 b 138 326 151 322 144 324 m 243 -1 l 245 -1 l 242 -1 l 243 -1 m 243 673 l 245 673 l 242 673 l 243 673 "},v9:{x_min:0,x_max:475.03125,ha:485,o:"m 191 646 b 212 649 198 648 205 649 b 255 644 227 649 243 646 b 458 448 348 616 428 539 b 475 342 469 415 475 378 b 460 244 475 308 469 274 b 193 44 421 124 303 44 b 91 69 157 44 122 51 b 19 161 43 97 19 126 b 21 181 19 167 20 174 b 98 241 32 220 65 241 b 170 186 129 241 160 223 b 172 166 171 179 172 173 b 121 94 172 134 152 102 b 117 93 118 94 117 93 b 121 90 117 93 118 91 b 185 76 142 80 164 76 b 270 119 220 76 251 91 b 308 259 287 145 300 194 b 313 317 310 277 313 310 b 313 317 313 317 313 317 b 313 317 313 317 313 317 b 304 315 313 317 308 316 b 216 295 273 302 245 295 b 145 308 193 295 170 299 b 19 398 88 327 42 360 b 0 469 5 420 0 444 b 24 551 0 496 8 526 b 191 646 54 596 125 637 m 227 614 b 215 616 224 616 220 616 b 202 614 210 616 206 616 b 152 535 174 610 163 592 b 144 463 147 509 144 485 b 152 391 144 440 147 417 b 216 328 163 344 179 328 b 280 391 253 328 269 344 b 288 463 285 417 288 440 b 280 535 288 485 285 509 b 227 614 269 594 258 610 m 236 -1 l 238 -1 l 235 -1 l 236 -1 m 236 673 l 238 673 l 235 673 l 236 673 "},va:{x_min:-149.71875,x_max:148.359375,ha:151,o:"m -8 -1 b -1 0 -5 -1 -4 0 b 16 -11 5 0 13 -4 b 83 -186 17 -12 47 -90 l 148 -358 l 148 -363 b 127 -385 148 -376 138 -385 b 112 -378 122 -385 118 -383 b 54 -226 110 -374 114 -385 b 0 -81 24 -147 0 -81 b -55 -226 -1 -81 -25 -147 b -114 -378 -115 -385 -111 -374 b -129 -385 -119 -383 -123 -385 b -149 -363 -140 -385 -149 -376 l -149 -358 l -84 -186 b -19 -11 -49 -90 -19 -12 b -8 -1 -17 -8 -12 -4 "},vb:{x_min:0,x_max:428.75,ha:438,o:"m 262 186 b 273 186 266 186 272 186 b 274 186 273 186 274 186 b 285 186 274 186 280 186 b 428 48 375 181 428 122 b 386 -68 428 12 416 -29 b 155 -187 329 -145 236 -187 b 12 -111 92 -187 38 -162 b 0 -51 4 -91 0 -72 b 262 186 0 58 122 179 "},vc:{x_min:0,x_max:447.8125,ha:457,o:"m 0 86 l 0 173 l 223 173 l 447 173 l 447 86 l 447 0 l 223 0 l 0 0 l 0 86 "},vf:{x_min:0,x_max:370.21875,ha:378,o:"m 0 0 l 0 277 l 61 277 l 122 277 l 122 0 l 122 -278 l 61 -278 l 0 -278 l 0 0 m 246 -1 l 246 277 l 308 277 l 370 277 l 370 -1 l 370 -278 l 308 -278 l 246 -278 l 246 -1 "},v10:{x_min:0,x_max:559.421875,ha:571,o:"m 5 127 b 14 127 6 127 9 127 b 51 126 25 127 43 127 b 175 98 93 122 138 112 l 186 94 b 279 51 210 86 255 65 b 285 47 280 51 283 48 b 319 27 291 44 311 31 l 326 22 b 359 0 332 19 352 4 l 367 -6 b 371 -9 368 -6 370 -8 l 379 -15 b 387 -22 383 -18 386 -20 l 398 -30 l 411 -40 l 417 -47 l 427 -55 l 434 -61 b 441 -66 436 -62 439 -65 l 446 -72 l 453 -77 l 462 -87 b 558 -188 490 -113 549 -176 b 559 -195 559 -191 559 -194 b 548 -205 559 -201 555 -205 b 541 -204 547 -205 544 -205 b 534 -198 539 -201 536 -199 l 525 -191 b 481 -162 518 -187 490 -167 b 472 -155 477 -159 472 -156 b 468 -152 470 -155 469 -154 b 461 -149 466 -152 464 -151 b 428 -130 454 -145 441 -137 b 371 -99 413 -122 372 -99 b 363 -95 371 -99 367 -98 b 353 -91 357 -94 353 -91 b 348 -90 353 -91 352 -91 b 332 -81 343 -87 341 -86 b 27 -12 230 -37 127 -13 b 0 -5 4 -11 2 -11 b 0 58 0 -2 0 27 b 0 122 0 88 0 120 b 5 127 1 124 4 126 "},v11:{x_min:-155.171875,x_max:153.8125,ha:157,o:"m -137 353 b -130 353 -136 353 -133 353 b -112 349 -125 353 -119 352 b -100 342 -110 347 -104 344 b 0 317 -69 326 -35 317 b 111 349 38 317 76 328 b 129 353 117 352 123 353 b 153 327 142 353 153 344 b 144 302 153 320 153 317 b 27 6 93 226 50 113 b 21 -13 24 -11 24 -11 b 0 -26 17 -22 8 -26 b -24 -12 -9 -26 -19 -22 b -28 5 -24 -9 -27 -2 b -145 302 -53 117 -95 224 b -155 327 -155 317 -155 320 b -137 353 -155 340 -148 349 "},v18:{x_min:0,x_max:323.9375,ha:331,o:"m 217 535 b 225 537 220 537 221 537 b 245 524 235 537 242 533 l 246 521 l 247 390 l 247 258 l 273 265 b 306 270 288 269 299 270 b 322 259 315 270 319 267 b 323 208 323 256 323 233 b 322 158 323 184 323 159 b 288 140 318 148 315 147 b 247 130 254 131 247 130 b 247 65 247 130 247 104 b 247 20 247 51 247 36 l 247 -88 l 273 -81 b 306 -76 289 -77 299 -76 b 318 -81 311 -76 315 -77 b 323 -123 323 -87 323 -86 l 323 -138 l 323 -154 b 318 -195 323 -191 323 -190 b 269 -210 314 -199 315 -199 b 249 -216 259 -213 250 -216 l 247 -216 l 247 -349 l 246 -483 l 245 -487 b 225 -499 242 -495 234 -499 b 206 -487 219 -499 210 -495 l 205 -483 l 205 -355 l 205 -227 l 204 -227 l 181 -233 l 138 -244 b 117 -249 127 -247 117 -249 b 115 -385 115 -249 115 -256 l 115 -523 l 114 -526 b 95 -538 110 -534 102 -538 b 74 -526 87 -538 78 -534 l 73 -523 l 73 -391 b 72 -260 73 -269 73 -260 b 72 -260 72 -260 72 -260 b 19 -273 61 -263 23 -273 b 0 -260 10 -273 4 -267 b 0 -209 0 -256 0 -256 l 0 -162 l 1 -158 b 61 -134 5 -148 5 -148 l 73 -131 l 73 -22 b 72 86 73 79 73 86 b 72 86 72 86 72 86 b 19 74 61 83 23 74 b 0 86 10 74 4 79 b 0 137 0 90 0 90 l 0 184 l 1 188 b 61 212 5 198 5 198 l 73 215 l 73 348 l 73 481 l 74 485 b 95 498 78 492 87 498 b 103 495 98 498 100 496 b 114 485 107 494 111 489 l 115 481 l 115 353 l 115 226 l 121 226 b 159 235 123 227 141 231 l 198 247 l 205 248 l 205 384 l 205 521 l 206 524 b 217 535 209 528 212 533 m 205 9 b 205 119 205 70 205 119 l 205 119 b 182 113 204 119 194 116 l 138 102 b 117 97 127 99 117 97 b 115 -12 115 97 115 91 l 115 -122 l 121 -120 b 159 -111 123 -119 141 -115 l 198 -101 l 205 -98 l 205 9 "},v1b:{x_min:0,x_max:559.421875,ha:571,o:"m 544 204 b 548 204 545 204 547 204 b 559 194 555 204 559 199 b 559 190 559 192 559 191 b 530 156 559 188 556 184 b 462 86 510 134 481 104 b 453 76 458 81 454 77 l 446 70 l 441 65 b 434 59 439 63 436 61 l 427 54 b 409 37 426 51 416 44 b 392 23 398 29 394 26 b 387 19 389 22 387 20 b 379 13 386 19 383 16 l 371 8 l 367 5 l 359 -1 l 337 -16 b 285 -48 319 -29 298 -41 l 279 -52 b 186 -95 255 -66 210 -87 l 175 -99 b 23 -129 127 -117 68 -129 b 17 -129 20 -129 19 -129 b 1 -123 2 -129 2 -129 b 0 -49 0 -122 0 -83 b 0 4 0 -22 0 1 b 27 11 2 9 4 9 b 185 31 78 12 145 20 b 198 34 186 31 193 33 b 314 73 234 44 277 58 b 349 88 328 79 340 84 b 353 90 352 90 353 90 b 363 94 353 90 357 93 b 371 98 367 97 371 98 b 428 129 372 98 413 120 b 461 148 441 136 454 144 b 468 151 464 149 466 151 b 472 154 469 152 470 154 b 481 161 473 155 477 158 b 525 190 490 166 518 186 l 534 197 b 540 201 536 198 539 199 b 544 204 541 202 544 204 "},v1d:{x_min:0,x_max:619.3125,ha:632,o:"m 274 184 b 307 186 285 186 296 186 b 616 22 465 186 597 116 b 619 -1 617 13 619 5 b 308 -187 619 -104 483 -187 b 0 -1 133 -187 0 -102 b 5 36 0 11 1 23 b 274 184 29 115 141 176 m 289 161 b 272 162 284 162 277 162 b 171 41 209 162 171 108 b 205 -73 171 5 182 -34 b 345 -163 243 -133 298 -163 b 436 -98 385 -163 420 -142 b 446 -43 443 -80 446 -62 b 289 161 446 47 377 147 "},v1e:{x_min:-402.890625,x_max:401.53125,ha:410,o:"m -219 173 b -213 174 -217 174 -215 174 b -202 173 -209 174 -205 173 b -114 86 -200 172 -179 151 b -28 0 -66 37 -28 0 b 40 84 -28 0 2 37 b 117 174 111 173 110 172 b 122 174 118 174 119 174 b 132 173 125 174 129 173 b 295 11 134 172 171 134 l 307 -1 l 336 34 b 374 76 366 72 368 74 b 381 77 375 77 378 77 b 401 56 392 77 401 68 b 400 48 401 54 401 51 b 223 -172 397 41 230 -166 b 210 -176 220 -174 215 -176 b 201 -174 206 -176 204 -176 b 112 -87 198 -173 178 -152 b 27 0 65 -38 27 0 b -42 -86 27 0 -4 -38 b -118 -174 -112 -174 -111 -173 b -123 -176 -119 -176 -121 -176 b -133 -174 -126 -176 -130 -174 b -296 -12 -136 -173 -172 -137 l -308 0 l -337 -34 b -375 -77 -367 -73 -370 -76 b -382 -79 -377 -79 -379 -79 b -402 -58 -393 -79 -402 -69 b -401 -49 -402 -55 -402 -52 b -224 172 -398 -43 -228 167 b -219 173 -223 172 -220 173 "},v1f:{x_min:-340.28125,x_max:338.921875,ha:346,o:"m -32 520 b -29 521 -31 520 -31 521 b -23 519 -27 521 -24 520 b -20 513 -21 517 -20 516 b -21 506 -20 512 -20 509 b -31 474 -23 502 -27 488 l -53 402 l -66 352 l -68 349 l -57 349 b -32 351 -51 349 -40 351 b 123 370 19 352 74 359 b 137 371 127 370 133 371 b 170 356 152 371 164 366 b 171 355 170 355 170 355 b 216 366 174 355 183 358 b 280 378 268 377 266 377 b 287 378 283 378 284 378 b 332 349 307 378 322 369 b 338 319 336 341 338 330 b 332 301 338 310 336 302 b 242 280 329 299 246 280 b 242 280 242 280 242 280 b 235 288 236 280 235 283 b 235 292 235 290 235 291 b 236 302 236 297 236 299 b 220 337 236 316 230 330 l 216 340 l 210 335 b 159 276 189 322 172 301 b 118 149 152 265 156 274 b 81 34 84 36 85 36 b -8 13 78 33 -4 13 b -8 13 -8 13 -8 13 b -14 20 -12 15 -14 15 b -8 44 -14 24 -12 31 b -2 66 -5 55 -2 65 b -2 66 -2 66 -2 66 l -2 66 b -43 41 -2 66 -21 55 b -114 4 -98 8 -98 8 b -144 0 -123 0 -134 0 b -242 99 -197 0 -242 43 b -242 109 -242 102 -242 105 b -212 219 -240 122 -242 116 b -185 312 -197 270 -185 312 l -185 312 b -189 312 -185 312 -186 312 b -259 312 -200 312 -227 312 b -321 310 -291 312 -310 310 b -334 312 -330 310 -334 312 b -340 319 -338 313 -340 316 b -336 326 -340 322 -338 324 b -291 337 -334 326 -314 331 l -247 347 l -210 348 b -172 348 -190 348 -172 348 b -168 363 -172 348 -171 355 b -145 442 -151 424 -145 441 b -133 452 -144 444 -140 446 l -77 489 b -32 520 -53 506 -32 520 m 57 334 b 53 335 55 335 54 335 b 44 334 50 335 49 335 b -70 316 8 326 -28 320 b -78 309 -78 316 -78 316 b -108 202 -80 305 -88 274 b -141 81 -136 112 -141 93 b -140 74 -141 79 -141 77 b -117 49 -137 59 -127 49 b -107 52 -114 49 -110 51 b 16 127 -106 54 14 126 b 42 217 16 127 42 215 b 49 241 42 222 44 229 b 73 320 53 251 73 317 b 57 334 73 327 65 333 "},v20:{x_min:-571.671875,x_max:570.3125,ha:582,o:"m -559 351 b -551 352 -556 352 -553 352 b -530 338 -543 352 -533 348 b -529 169 -530 337 -529 291 l -529 1 l -507 27 l -441 112 b -382 174 -394 169 -390 174 b -378 174 -381 174 -379 174 b -281 86 -370 174 -375 179 b -196 0 -234 37 -196 0 b -126 84 -196 0 -164 37 b -50 174 -55 173 -57 172 b -44 174 -49 174 -47 174 b -35 173 -42 174 -38 173 b 53 86 -32 172 -12 151 b 138 0 100 37 138 0 b 208 84 140 0 170 37 b 284 174 279 173 279 172 b 289 174 285 174 288 174 b 300 173 294 174 298 173 b 462 11 303 172 340 134 l 475 -1 l 503 34 b 541 76 534 72 536 74 b 548 77 544 77 545 77 b 570 56 560 77 570 68 b 567 48 570 54 568 51 b 392 -172 564 41 397 -166 b 378 -176 387 -174 382 -176 b 368 -174 375 -176 371 -176 b 280 -87 367 -173 347 -152 b 194 0 234 -38 194 0 b 126 -86 194 0 163 -38 b 49 -174 54 -174 55 -173 b 44 -176 47 -176 46 -176 b 34 -174 40 -176 36 -174 b -54 -87 31 -173 10 -152 b -140 0 -102 -38 -140 0 b -209 -86 -140 0 -171 -38 b -285 -174 -280 -174 -279 -173 b -291 -176 -287 -176 -288 -176 b -300 -174 -294 -176 -298 -174 b -464 -11 -303 -173 -374 -102 l -476 0 l -506 -37 b -539 -76 -528 -65 -537 -74 b -551 -80 -543 -79 -547 -80 b -570 -68 -558 -80 -566 -76 l -571 -65 l -571 136 b -570 340 -571 331 -571 337 b -559 351 -568 344 -564 348 "},v22:{x_min:0,x_max:432.828125,ha:442,o:"m 209 186 b 213 187 210 187 212 187 b 216 187 215 187 216 187 b 224 174 216 186 220 180 b 420 -1 269 105 338 43 b 432 -12 431 -8 432 -9 b 421 -23 432 -15 432 -16 b 228 -180 345 -70 264 -137 b 219 -188 221 -188 221 -188 l 219 -188 b 208 -177 215 -188 215 -188 b 10 1 163 -106 93 -44 b 0 11 0 6 0 8 b 10 22 0 13 0 15 b 202 179 87 69 167 136 b 209 186 206 183 209 186 "},v23:{x_min:0,x_max:133.390625,ha:136,o:"m 54 66 b 65 68 58 68 61 68 b 122 37 88 68 110 56 b 133 -1 130 26 133 12 b 104 -58 133 -23 123 -44 b 66 -69 92 -65 78 -69 b 10 -38 44 -69 23 -58 b 0 -1 2 -27 0 -13 b 54 66 0 30 20 61 "},v25:{x_min:0,x_max:318.5,ha:325,o:"m 20 376 b 167 377 23 377 96 377 b 296 376 231 377 294 377 b 318 347 311 371 318 359 b 296 316 318 333 311 320 b 159 315 294 315 227 315 b 21 316 91 315 24 315 b 0 345 6 320 0 333 b 20 376 0 359 6 371 "},v26:{x_min:-21.78125,x_max:483.1875,ha:493,o:"m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 383 20 616 20 616 l 20 148 l 21 151 b 140 199 59 183 102 199 b 206 179 164 199 187 192 l 210 176 l 210 396 l 210 617 l 212 621 b 231 632 216 628 223 632 b 250 620 239 632 247 628 b 251 383 251 616 251 616 l 251 148 l 254 151 b 370 199 291 183 332 199 b 415 191 385 199 400 197 b 483 84 458 176 483 134 b 461 0 483 58 476 29 b 332 -142 439 -40 411 -72 l 255 -215 b 231 -229 240 -229 239 -229 b 216 -223 224 -229 220 -227 b 210 -158 210 -217 210 -223 b 210 -120 210 -148 210 -136 l 210 -29 l 205 -34 b 100 -142 182 -65 159 -88 l 23 -215 b -1 -229 9 -229 6 -229 b -20 -216 -9 -229 -17 -224 l -21 -212 l -21 201 l -21 616 l -20 620 b -8 631 -17 624 -13 630 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 m 341 131 b 328 133 337 133 332 133 b 322 133 326 133 323 133 b 257 87 296 129 273 113 l 251 80 l 251 -37 l 251 -156 l 255 -152 b 375 81 328 -72 375 20 l 375 83 b 341 131 375 113 367 126 "},v27:{x_min:0,x_max:432.828125,ha:442,o:"m 208 184 b 213 187 209 186 212 187 b 224 176 217 187 221 183 b 245 147 225 172 235 159 b 419 -1 288 90 347 38 b 431 -8 424 -4 431 -8 b 432 -12 432 -9 432 -11 b 430 -18 432 -13 432 -16 b 364 -61 424 -20 383 -47 b 225 -183 307 -102 250 -152 b 223 -187 224 -184 223 -187 b 220 -188 221 -188 220 -188 b 208 -176 216 -188 210 -184 b 187 -148 205 -173 197 -159 b 12 0 144 -90 84 -38 b 0 11 4 5 0 8 b 16 24 0 13 4 18 b 183 158 83 69 141 115 b 208 184 194 169 198 173 m 183 105 b 176 113 181 109 176 113 b 172 109 176 113 175 112 b 92 45 149 90 117 62 l 88 41 l 102 31 b 247 -105 160 -6 210 -55 l 254 -115 l 257 -112 l 269 -102 b 340 -45 287 -87 319 -61 l 344 -43 l 330 -33 b 183 105 272 6 221 54 "},v28:{x_min:-73.5,x_max:72.140625,ha:74,o:"m -72 252 l -73 254 l 0 254 l 72 254 l 70 252 b 0 -1 70 248 0 -1 b -72 252 -1 -1 -72 248 "},v29:{x_min:-590.71875,x_max:589.359375,ha:601,o:"m 175 273 b 182 274 178 273 181 274 b 202 262 190 274 198 269 b 204 158 204 259 204 259 l 204 56 l 250 112 b 303 174 296 172 298 172 b 308 174 304 174 307 174 b 318 173 313 174 317 173 b 481 11 322 172 357 134 l 494 -1 l 522 34 b 560 76 553 72 555 74 b 567 77 563 77 564 77 b 589 56 579 77 589 68 b 586 48 589 54 588 51 b 411 -172 583 41 416 -166 b 397 -176 406 -174 401 -176 b 387 -174 393 -176 390 -176 b 299 -87 386 -173 366 -152 b 213 0 253 -38 213 0 b 208 -6 213 0 210 -2 l 204 -12 l 204 -147 b 204 -210 204 -173 204 -194 b 198 -292 204 -297 204 -287 b 183 -299 194 -297 189 -299 b 164 -287 175 -299 167 -295 b 163 -174 163 -284 163 -284 l 161 -63 l 119 -117 b 65 -176 76 -170 73 -176 b 61 -176 63 -176 62 -176 b -35 -87 51 -174 57 -180 b -121 0 -83 -38 -121 0 b -190 -86 -122 0 -152 -38 b -266 -174 -261 -174 -259 -173 b -272 -176 -268 -176 -270 -176 b -281 -174 -276 -176 -280 -174 b -371 -86 -284 -173 -304 -152 b -457 0 -417 -38 -457 0 l -457 0 b -477 -26 -457 0 -470 -16 b -548 -227 -524 -88 -548 -161 b -536 -303 -548 -254 -544 -280 b -533 -317 -534 -309 -533 -313 b -553 -338 -533 -330 -541 -338 b -577 -315 -566 -338 -571 -333 b -590 -227 -586 -287 -590 -258 b -518 -9 -590 -154 -564 -77 b -465 56 -509 2 -504 8 l -402 134 b -363 174 -374 170 -371 174 b -359 174 -362 174 -360 174 b -262 86 -351 174 -356 179 b -176 0 -216 37 -176 0 b -107 84 -176 0 -145 37 b -31 174 -36 173 -38 172 b -25 174 -29 174 -28 174 b -16 173 -23 174 -19 173 b 147 11 -13 172 35 123 l 157 -1 l 160 1 l 163 4 l 163 130 b 164 260 163 256 163 258 b 175 273 166 266 170 270 "},v2a:{x_min:-21.78125,x_max:366.140625,ha:374,o:"m 276 1378 b 284 1379 279 1379 281 1379 b 306 1360 292 1379 298 1374 b 352 1247 326 1326 343 1286 b 366 1139 362 1213 366 1175 b 347 1009 366 1093 359 1049 l 344 1002 l 347 992 b 352 971 348 986 351 977 b 366 863 362 936 366 899 b 347 732 366 818 359 773 l 344 725 l 347 716 b 352 695 348 710 351 700 b 366 588 362 659 366 623 b 223 262 366 464 314 345 b 189 233 212 252 212 252 b 35 76 126 183 73 129 b -1 16 20 56 2 27 b -19 4 -4 9 -12 4 l -21 4 l -21 137 l -21 270 l -17 270 b 186 344 59 281 134 308 b 319 606 270 399 319 499 b 317 650 319 620 319 635 l 315 659 l 314 655 b 223 537 288 607 258 570 b 189 509 212 528 212 528 b 35 352 126 459 73 405 b -1 292 20 333 2 303 b -19 280 -4 285 -12 280 l -21 280 l -21 413 l -21 546 l -17 546 b 186 620 59 557 134 584 b 319 882 270 675 319 775 b 317 925 319 896 319 911 l 315 935 l 314 931 b 223 813 288 884 258 846 b 189 785 212 805 212 805 b 35 628 126 735 73 681 b -1 569 20 609 2 580 b -19 556 -4 562 -12 556 l -21 556 l -21 689 l -21 823 l -17 823 b 202 907 68 835 152 867 b 319 1157 280 968 319 1061 b 270 1338 319 1218 303 1281 b 262 1358 264 1349 262 1353 b 262 1364 262 1360 262 1363 b 276 1378 265 1371 269 1376 "},v2c:{x_min:-597.53125,x_max:596.171875,ha:608,o:"m -413 173 b -408 174 -412 174 -409 174 b -397 173 -404 174 -400 173 b -308 86 -394 172 -374 151 b -223 0 -261 37 -223 0 b -153 84 -223 0 -191 37 b -77 174 -83 173 -84 172 b -72 174 -76 174 -74 174 b -62 173 -68 174 -63 173 b 25 86 -59 172 -39 151 b 112 0 73 37 111 0 b 181 84 112 0 144 37 b 257 174 251 173 251 172 b 262 174 258 174 261 174 b 273 173 266 174 270 173 b 436 9 276 172 347 101 l 447 -1 l 477 36 b 522 79 511 79 513 79 l 522 79 b 552 51 533 79 539 73 b 596 -112 582 6 596 -51 b 567 -262 596 -161 586 -213 b 539 -322 558 -287 544 -316 b 524 -327 534 -326 529 -327 b 504 -315 515 -327 507 -323 b 503 -308 503 -312 503 -309 b 511 -285 503 -302 504 -297 b 555 -113 540 -227 555 -169 b 544 -34 555 -86 551 -59 b 522 19 540 -16 530 8 l 521 22 l 481 -26 l 405 -122 b 353 -176 366 -172 362 -176 b 349 -176 352 -176 351 -176 b 253 -87 341 -176 347 -180 b 167 0 206 -38 167 0 b 99 -86 167 0 136 -38 b 21 -174 27 -174 28 -173 b 17 -176 20 -176 19 -176 b 6 -174 13 -176 9 -174 b -81 -87 4 -173 -14 -152 b -167 0 -129 -38 -167 0 b -236 -86 -167 0 -198 -38 b -313 -174 -307 -174 -306 -173 b -318 -176 -314 -176 -315 -176 b -328 -174 -321 -176 -325 -174 b -491 -12 -330 -173 -367 -137 l -503 0 l -530 -34 b -570 -77 -562 -73 -564 -76 b -577 -79 -571 -79 -574 -79 b -597 -58 -588 -79 -597 -69 b -596 -49 -597 -55 -597 -52 b -417 172 -593 -43 -423 167 b -413 173 -417 172 -415 173 "},v2d:{x_min:0,x_max:438.28125,ha:447,o:"m 212 190 b 219 191 213 191 216 191 b 236 176 225 191 228 190 b 419 18 277 105 341 49 b 436 5 431 13 434 11 b 438 -1 438 4 438 1 b 424 -16 438 -8 432 -13 b 356 -49 409 -20 379 -36 b 234 -180 306 -83 258 -133 b 219 -192 230 -188 224 -192 b 200 -176 213 -192 206 -187 b 9 -15 157 -102 89 -45 b 0 0 2 -12 0 -6 b 16 18 0 9 2 12 b 200 176 93 48 159 104 b 212 190 205 186 208 188 m 239 113 b 236 117 238 116 238 117 b 230 108 235 117 234 115 b 92 -15 196 58 140 8 b 88 -18 91 -16 88 -18 b 92 -20 88 -18 91 -19 b 198 -116 130 -43 166 -74 b 200 -117 200 -117 200 -117 b 201 -117 200 -117 201 -117 b 264 -43 212 -98 242 -62 b 345 15 288 -19 321 4 b 348 18 347 16 348 16 b 344 20 348 18 347 19 b 239 113 307 41 266 79 "},v2f:{x_min:-1.359375,x_max:680.5625,ha:694,o:"m 597 1042 b 604 1042 600 1042 602 1042 b 642 1002 627 1042 642 1022 b 619 966 642 988 635 974 b 439 927 574 942 503 927 l 426 927 l 426 921 b 430 838 428 893 430 866 b 345 480 430 696 398 560 b 179 391 307 423 249 391 b 156 392 171 391 164 392 b 138 394 149 394 142 394 b 103 434 115 396 103 416 b 129 471 103 451 111 466 b 141 474 133 473 137 474 b 172 459 153 474 164 469 b 181 455 175 456 176 455 b 187 456 182 455 185 455 b 253 520 212 460 234 483 b 315 836 294 605 315 714 b 311 928 315 867 314 898 b 302 945 310 943 311 942 b 245 953 283 950 262 953 b 130 891 193 953 149 931 b 84 860 119 870 102 860 b 36 905 61 860 39 877 b 36 910 36 907 36 909 b 80 970 36 931 50 949 b 249 1017 125 1000 187 1017 b 322 1009 273 1017 299 1014 l 341 1003 b 436 991 372 995 406 991 b 577 1031 495 991 545 1004 b 597 1042 583 1038 590 1041 m 416 360 b 424 360 419 360 421 360 b 481 309 454 360 479 338 b 503 145 484 280 495 199 b 585 -185 525 16 555 -106 b 630 -245 596 -213 613 -237 l 634 -247 l 638 -245 b 647 -244 641 -245 645 -244 b 680 -278 666 -244 680 -262 b 664 -308 680 -290 675 -301 b 638 -312 658 -310 650 -312 b 613 -309 631 -312 623 -310 b 477 -201 555 -303 502 -260 b 417 -2 460 -159 434 -72 b 416 5 417 1 416 5 b 416 5 416 5 416 5 b 411 -5 415 5 413 0 b 359 -97 397 -33 377 -70 b 353 -106 355 -102 353 -105 b 359 -112 353 -108 355 -109 b 409 -130 375 -123 390 -129 b 426 -134 420 -130 421 -131 b 431 -147 428 -137 431 -141 b 420 -162 431 -152 427 -159 b 382 -169 409 -166 396 -169 b 323 -155 363 -169 341 -165 l 317 -152 l 314 -155 b 62 -303 240 -240 148 -295 b 36 -305 55 -305 44 -305 b 23 -303 29 -305 24 -305 b -1 -273 6 -299 -1 -287 b 31 -240 -1 -256 10 -240 b 36 -240 32 -240 34 -240 b 42 -241 38 -241 39 -241 b 134 -204 63 -241 99 -226 b 367 288 265 -115 357 81 b 375 330 368 313 370 320 b 416 360 383 347 400 358 m 360 -359 b 379 -359 363 -359 371 -359 b 424 -360 396 -359 416 -359 b 646 -502 536 -373 624 -430 b 649 -527 649 -510 649 -519 b 530 -673 649 -578 604 -635 l 521 -677 l 529 -681 b 653 -811 592 -714 637 -762 b 660 -853 658 -827 660 -839 b 645 -911 660 -873 656 -892 b 426 -1021 608 -981 519 -1021 b 283 -989 377 -1021 328 -1011 b 235 -949 249 -972 239 -964 b 234 -936 234 -946 234 -941 b 234 -928 234 -934 234 -931 l 235 -925 l 234 -927 l 225 -934 b 87 -982 186 -966 138 -982 b 80 -982 85 -982 83 -982 b 55 -981 70 -981 58 -981 b 17 -943 32 -981 17 -964 b 54 -904 17 -921 35 -904 b 78 -914 62 -904 72 -909 l 83 -918 l 88 -918 b 190 -831 122 -918 166 -881 b 269 -506 242 -727 269 -612 b 268 -462 269 -492 269 -477 b 266 -449 266 -458 266 -452 b 265 -444 266 -445 266 -444 b 257 -446 264 -444 261 -445 b 132 -545 196 -470 152 -505 b 88 -573 122 -563 104 -573 b 39 -523 63 -573 39 -553 b 63 -476 39 -505 44 -494 b 360 -359 136 -408 235 -369 m 419 -424 b 393 -423 411 -423 406 -423 l 375 -423 l 377 -426 b 379 -439 377 -427 378 -434 b 383 -510 382 -463 383 -487 b 314 -811 383 -609 360 -710 b 266 -893 296 -850 285 -870 b 264 -898 265 -896 264 -898 l 264 -898 b 264 -898 264 -898 264 -898 b 268 -898 264 -898 266 -898 b 273 -898 270 -898 272 -898 b 300 -909 283 -898 291 -900 b 426 -957 340 -941 385 -957 b 476 -949 443 -957 460 -954 b 547 -853 522 -931 547 -893 b 485 -745 547 -816 526 -775 b 397 -707 460 -727 432 -714 b 366 -675 375 -703 366 -692 b 396 -642 366 -657 377 -645 b 530 -557 455 -637 511 -601 b 536 -527 534 -548 536 -537 b 419 -424 536 -480 490 -437 "},v30:{x_min:-21.78125,x_max:367.5,ha:375,o:"m 276 1900 b 284 1901 279 1900 281 1901 b 306 1883 291 1901 298 1896 b 367 1686 347 1825 367 1757 b 343 1558 367 1643 359 1600 l 338 1549 l 343 1537 b 367 1411 359 1497 367 1454 b 343 1282 367 1367 359 1324 l 338 1272 l 343 1261 b 367 1135 359 1221 367 1178 b 343 1007 367 1090 359 1047 l 338 996 l 343 985 b 367 859 359 945 367 902 b 343 731 367 814 359 771 l 338 720 l 343 709 b 367 582 359 667 367 626 b 289 362 367 503 340 426 b 239 312 276 345 259 330 b 29 77 152 237 76 152 b -1 18 14 54 2 30 b -19 4 -4 11 -12 4 l -21 4 l -21 133 l -20 260 l -13 262 b 98 299 17 269 62 284 b 111 305 103 302 110 305 b 167 334 123 310 156 327 b 319 595 264 391 319 491 b 313 659 319 616 318 638 b 310 667 311 664 311 667 b 307 663 310 667 308 666 b 240 588 289 637 269 614 b 16 331 141 505 62 413 b -1 294 8 316 1 302 b -19 280 -4 287 -12 280 l -21 280 l -21 408 l -20 537 l -13 538 b 98 576 17 545 62 560 b 111 581 103 578 110 581 b 167 610 123 587 156 603 b 319 871 264 667 319 767 b 313 935 319 892 318 913 b 310 942 311 941 311 942 b 307 939 310 942 308 941 b 240 864 289 913 269 889 b 16 607 141 781 62 689 b -1 570 8 592 1 578 b -19 556 -4 563 -12 556 l -21 556 l -21 684 l -20 813 l -13 814 b 98 852 17 821 62 836 b 111 857 103 855 110 857 b 167 886 123 863 156 880 b 319 1147 264 943 319 1043 b 313 1211 319 1168 318 1189 b 310 1218 311 1217 311 1218 b 307 1215 310 1218 308 1217 b 240 1140 289 1188 269 1165 b 16 884 141 1057 62 966 b -1 846 8 868 1 855 b -19 832 -4 839 -12 832 l -21 832 l -21 960 l -20 1089 l -13 1090 b 98 1128 17 1097 62 1111 b 111 1134 103 1131 110 1134 b 167 1163 123 1139 156 1156 b 319 1424 264 1220 319 1320 b 313 1486 319 1444 318 1465 b 310 1494 311 1493 311 1494 b 307 1492 310 1494 308 1493 b 240 1417 289 1464 269 1442 b 16 1160 141 1333 62 1242 b -1 1121 8 1145 1 1131 b -19 1109 -4 1115 -12 1109 l -21 1109 l -21 1236 l -20 1365 l -13 1367 b 98 1404 17 1374 62 1388 b 111 1410 103 1407 110 1410 b 250 1508 172 1437 215 1467 b 319 1701 296 1564 319 1633 b 270 1859 319 1757 303 1814 b 262 1882 265 1868 262 1875 b 276 1900 262 1890 266 1896 "},v31:{x_min:0,x_max:386.5625,ha:394,o:"m 0 173 l 0 347 l 193 347 l 386 347 l 386 173 l 386 0 l 193 0 l 0 0 l 0 173 "},v33:{x_min:-423.3125,x_max:421.9375,ha:431,o:"m -10 276 b -2 277 -8 277 -5 277 b 17 265 5 277 13 273 b 19 163 19 260 19 260 l 19 68 l 39 45 b 277 -95 122 -34 200 -81 b 289 -97 281 -97 285 -97 b 378 0 332 -97 371 -54 b 378 11 378 4 378 6 b 302 83 378 55 345 83 b 242 66 283 83 262 77 b 208 56 231 59 219 56 b 148 120 175 56 148 81 b 200 186 148 151 164 172 b 261 198 220 194 240 198 b 420 45 341 198 411 137 b 421 22 421 37 421 29 b 257 -198 421 -86 347 -188 b 242 -198 251 -198 247 -198 b 20 -105 181 -198 95 -163 l 19 -104 l 19 -183 b 19 -216 19 -195 19 -206 b 12 -273 19 -272 17 -267 b -2 -278 8 -277 2 -278 b -21 -266 -10 -278 -19 -274 b -23 -165 -23 -263 -23 -262 l -23 -69 l -44 -47 b -250 86 -117 23 -183 66 b -295 94 -270 93 -284 94 b -315 91 -302 94 -308 94 b -381 5 -356 81 -381 43 b -355 -56 -381 -16 -372 -40 b -299 -81 -338 -73 -319 -81 b -246 -68 -283 -81 -265 -77 b -212 -58 -234 -61 -223 -58 b -168 -77 -196 -58 -179 -65 b -151 -122 -156 -90 -151 -105 b -179 -174 -151 -141 -160 -162 b -239 -195 -194 -184 -217 -192 b -257 -197 -245 -195 -250 -197 b -423 -5 -349 -197 -423 -113 b -423 0 -423 -4 -423 -1 b -277 194 -420 97 -362 173 b -247 197 -268 197 -258 197 b -24 104 -185 197 -100 162 l -23 102 l -23 181 b -21 265 -23 260 -23 260 b -10 276 -20 269 -14 274 "},v34:{x_min:0,x_max:622.03125,ha:635,o:"m 398 417 b 406 419 401 419 404 419 b 427 398 417 419 427 409 b 427 391 427 395 427 392 b 34 -274 424 385 38 -272 b 20 -280 29 -278 25 -280 b 0 -259 9 -280 0 -270 b 0 -252 0 -256 0 -254 b 393 413 2 -247 389 410 b 398 417 394 415 397 416 m 592 417 b 600 419 594 419 597 419 b 622 398 611 419 622 409 b 620 391 622 395 620 392 b 227 -274 617 385 231 -272 b 213 -280 223 -278 219 -280 b 193 -259 202 -280 193 -270 b 194 -252 193 -256 193 -254 b 586 413 196 -247 582 410 b 592 417 588 415 590 416 "},v36:{x_min:-1.359375,x_max:1064.390625,ha:1086,o:"m 296 692 b 314 694 302 694 307 694 b 386 685 337 694 366 689 b 548 498 480 660 548 580 b 548 481 548 492 548 487 b 455 395 541 426 499 395 b 370 462 420 395 383 417 b 362 496 364 477 362 488 b 377 514 362 509 367 514 b 393 501 386 514 390 510 b 432 474 397 484 413 474 b 470 487 445 474 458 478 b 491 530 484 496 491 510 b 490 544 491 534 491 539 b 333 660 479 606 411 657 l 323 662 l 315 646 b 269 524 285 591 269 556 b 321 431 269 492 287 466 b 349 395 338 413 343 408 b 363 342 359 378 363 362 b 359 312 363 333 362 322 b 285 158 348 266 318 206 b 281 152 283 155 281 152 b 281 152 281 152 281 152 b 287 154 283 152 284 152 b 318 155 298 154 308 155 b 461 98 371 155 419 136 l 464 97 l 483 112 b 503 129 494 120 503 127 b 504 130 503 129 504 129 b 503 138 504 131 503 134 b 500 180 500 152 500 166 b 553 326 500 238 518 288 b 604 366 560 331 592 358 b 649 381 617 376 632 381 b 696 362 665 381 681 374 b 724 302 714 347 724 324 b 695 238 724 278 714 255 b 660 210 691 234 662 212 b 579 148 658 209 582 151 b 579 148 579 148 579 148 b 596 106 579 144 589 119 b 622 77 604 88 609 83 b 657 69 632 72 645 69 b 748 112 688 69 721 84 b 755 123 754 117 755 120 b 755 127 755 124 755 126 b 751 165 752 137 751 151 b 758 219 751 183 754 202 b 894 387 774 290 820 347 b 896 390 896 388 896 388 b 891 398 896 391 895 392 b 622 560 827 477 730 535 b 600 580 605 564 600 569 b 617 596 600 591 607 596 b 628 595 622 596 624 596 b 1057 248 846 552 1020 412 b 1064 191 1061 229 1064 209 b 922 0 1064 94 1005 9 b 902 -1 916 -1 909 -1 b 774 76 847 -1 800 26 b 769 83 770 81 770 83 b 769 81 769 83 769 83 b 627 -1 733 29 677 -1 b 548 27 597 -1 570 8 b 515 88 537 37 525 61 l 513 95 l 510 93 l 453 45 b 390 0 396 0 396 0 b 390 0 390 0 390 0 b 374 15 381 0 377 4 b 268 105 359 69 314 105 b 250 104 262 105 257 105 l 243 102 l 234 90 b 155 1 201 49 159 2 b 147 -1 152 0 149 -1 b 130 15 138 -1 130 6 b 132 20 130 18 132 19 b 136 31 133 22 134 27 b 220 131 149 74 178 109 b 231 137 225 134 230 136 b 302 278 280 202 302 244 b 265 335 302 299 295 309 b 209 442 234 363 213 402 b 209 455 209 446 209 451 b 279 648 209 502 232 564 l 285 659 l 283 659 b 176 627 238 653 210 645 b 57 477 111 594 66 538 b 55 459 55 471 55 464 b 72 409 55 437 61 415 b 93 403 78 405 87 403 b 152 467 123 403 151 431 b 168 488 153 483 157 488 b 185 462 181 488 185 483 l 185 460 b 137 344 183 409 168 369 b 78 322 119 328 98 322 b 13 360 50 322 25 335 b -1 426 4 380 -1 402 b 89 610 -1 488 32 559 b 296 692 147 659 210 685 m 926 348 b 921 353 924 351 922 353 b 914 348 920 353 918 351 b 823 167 857 306 823 237 b 828 124 823 154 826 138 b 890 31 837 79 862 40 b 896 31 892 31 894 31 b 956 104 916 31 940 59 b 970 191 965 129 970 159 b 966 241 970 208 969 224 b 926 348 959 277 945 313 m 627 326 b 619 326 624 326 622 326 b 598 316 611 326 604 323 b 568 215 579 288 568 255 b 568 208 568 213 568 210 b 571 183 570 195 570 184 l 571 183 b 594 201 571 183 582 191 l 634 231 b 660 259 653 247 656 248 b 664 278 662 266 664 272 b 627 326 664 299 649 320 "},v38:{x_min:-1.359375,x_max:651.96875,ha:665,o:"m 389 644 b 405 645 394 645 400 645 b 504 566 450 645 492 613 b 507 541 506 557 507 549 b 480 471 507 514 498 489 l 477 467 l 483 470 b 609 591 539 485 586 531 b 613 601 611 595 613 599 b 631 609 619 607 624 609 b 651 588 641 609 651 602 b 200 -946 651 584 204 -941 b 182 -957 197 -953 190 -957 b 163 -945 174 -957 166 -953 b 161 -939 161 -942 161 -942 b 217 -743 161 -931 170 -904 b 272 -555 247 -639 272 -555 b 272 -555 272 -555 272 -555 b 264 -560 272 -555 268 -557 b 140 -603 227 -589 182 -603 b 36 -567 102 -603 65 -592 b -1 -487 12 -548 -1 -517 b 17 -427 -1 -466 5 -445 b 103 -380 38 -395 70 -380 b 191 -433 137 -380 172 -398 b 205 -484 201 -448 205 -466 b 178 -553 205 -509 196 -535 l 175 -557 l 182 -555 b 307 -435 236 -539 284 -494 b 372 -213 308 -430 372 -215 b 372 -213 372 -213 372 -213 b 364 -219 372 -213 368 -216 b 240 -262 328 -247 283 -262 b 137 -226 202 -262 166 -249 b 99 -145 112 -206 99 -176 b 118 -84 99 -124 106 -104 b 204 -38 138 -54 171 -38 b 292 -91 238 -38 273 -56 b 306 -141 302 -106 306 -124 b 279 -212 306 -167 296 -194 l 276 -215 l 281 -213 b 408 -93 336 -198 385 -151 b 473 129 409 -88 473 127 b 473 129 473 129 473 129 b 465 122 473 129 469 126 b 341 80 428 94 383 80 b 236 115 303 80 266 91 b 200 195 213 136 200 165 b 217 256 200 217 206 238 b 304 303 239 287 272 303 b 393 249 338 303 374 285 b 406 199 402 234 406 217 b 379 129 406 173 397 148 l 377 126 l 382 127 b 509 248 436 142 485 190 b 574 470 510 254 574 469 b 574 470 574 470 574 470 b 566 464 574 470 570 467 b 442 421 529 435 484 421 b 337 458 404 421 367 433 b 300 537 313 478 300 508 b 389 644 300 585 334 635 "},v3b:{x_min:0,x_max:484.5625,ha:494,o:"m 228 245 b 239 247 234 247 239 247 b 243 247 240 247 242 247 b 303 238 257 247 287 242 b 484 -2 417 208 484 104 b 412 -177 484 -65 461 -127 b 243 -248 363 -226 303 -248 b 6 -63 138 -248 36 -180 b 0 -1 1 -41 0 -20 b 228 245 0 127 98 240 m 255 181 b 240 183 247 183 245 183 b 232 181 238 183 235 183 b 142 152 200 180 168 170 l 138 149 l 190 97 l 242 44 l 294 97 l 345 149 l 340 152 b 255 181 315 169 284 180 m 147 -54 l 197 -1 l 147 51 l 95 104 l 91 99 b 62 -1 72 70 62 34 b 66 -43 62 -15 63 -29 b 91 -101 72 -63 80 -84 l 95 -106 l 147 -54 m 393 99 b 389 104 390 102 389 104 b 337 51 389 104 366 80 l 285 -1 l 337 -54 l 389 -106 l 393 -101 b 421 -1 412 -72 421 -36 b 393 99 421 34 412 69 m 294 -98 b 242 -45 265 -69 242 -45 b 190 -98 242 -45 219 -69 l 138 -151 l 142 -154 b 242 -184 172 -174 206 -184 b 340 -154 276 -184 311 -174 l 345 -151 l 294 -98 "},v3c:{x_min:0,x_max:450.53125,ha:460,o:"m 189 302 b 204 303 193 302 198 303 b 303 224 250 303 292 270 b 306 199 304 216 306 208 b 279 129 306 173 296 147 l 276 126 l 281 127 b 408 249 337 142 385 190 b 412 259 409 254 412 258 b 430 267 417 265 423 267 b 450 247 441 267 450 259 b 200 -605 450 242 204 -599 b 182 -616 197 -612 190 -616 b 163 -602 174 -616 166 -610 b 161 -598 161 -601 161 -601 b 217 -402 161 -589 170 -562 b 272 -213 247 -298 272 -213 b 272 -213 272 -213 272 -213 b 264 -219 272 -213 268 -216 b 140 -262 227 -247 182 -262 b 36 -226 102 -262 65 -249 b 0 -145 12 -206 0 -176 b 17 -84 0 -124 5 -104 b 103 -38 38 -54 70 -38 b 191 -91 137 -38 172 -56 b 205 -141 201 -106 205 -124 b 178 -212 205 -167 196 -194 l 175 -215 l 182 -213 b 307 -93 236 -198 284 -151 b 372 129 308 -88 372 127 b 372 129 372 129 372 129 b 364 122 372 129 368 126 b 240 80 328 94 283 80 b 137 115 202 80 166 91 b 99 194 111 136 99 165 b 189 302 99 244 133 292 "},v3e:{x_min:0,x_max:406.96875,ha:415,o:"m 21 183 b 28 183 24 183 25 183 b 42 181 34 183 39 183 b 127 108 47 179 47 179 b 202 41 168 72 202 41 b 279 108 204 41 238 72 b 357 177 321 145 356 176 b 375 183 363 181 370 183 b 406 151 392 183 406 169 b 404 137 406 147 405 141 b 322 62 401 131 398 129 b 251 0 284 27 251 0 b 322 -63 251 -1 284 -29 b 404 -138 398 -130 401 -133 b 406 -152 405 -142 406 -148 b 375 -184 406 -170 392 -184 b 357 -179 370 -184 363 -183 b 279 -109 356 -177 321 -147 b 202 -43 238 -73 204 -43 b 127 -109 202 -43 168 -73 b 49 -179 85 -147 50 -177 b 31 -184 43 -183 36 -184 b 0 -152 13 -184 0 -170 b 2 -138 0 -148 0 -142 b 83 -63 5 -133 8 -130 b 155 0 122 -29 155 -1 b 83 62 155 0 122 27 b 8 129 43 97 10 127 b 0 151 2 136 0 144 b 21 183 0 165 8 177 "},v3f:{x_min:-24.5,x_max:317.140625,ha:324,o:"m -24 -147 l -24 -5 l -20 -5 b -1 -19 -12 -5 -4 -11 b 58 -123 6 -43 31 -86 b 196 -278 93 -173 134 -219 b 317 -570 274 -356 317 -460 b 294 -713 317 -617 308 -666 l 289 -724 l 294 -735 b 317 -873 308 -780 317 -827 b 235 -1132 317 -963 288 -1054 b 209 -1165 228 -1140 224 -1146 b 189 -1177 204 -1172 196 -1177 b 171 -1164 182 -1177 175 -1172 b 168 -1154 170 -1161 168 -1159 b 181 -1132 168 -1149 172 -1142 b 269 -891 238 -1064 269 -975 b 269 -881 269 -886 269 -884 b 262 -814 269 -857 265 -827 b 258 -800 261 -811 259 -806 b 142 -628 240 -731 198 -667 b -8 -589 112 -606 47 -589 b -20 -589 -13 -589 -19 -589 l -24 -589 l -24 -449 l -24 -308 l -20 -308 b -1 -322 -12 -308 -4 -313 b 58 -424 6 -345 31 -388 b 194 -580 93 -476 136 -523 b 259 -660 221 -606 245 -635 b 261 -663 259 -662 261 -663 b 264 -656 262 -663 262 -660 b 269 -587 268 -632 269 -610 b 264 -521 269 -566 268 -544 b 262 -512 264 -517 262 -513 b 258 -498 261 -509 259 -503 b 142 -326 240 -428 198 -365 b -8 -287 112 -303 47 -288 b -20 -287 -13 -287 -19 -287 l -24 -287 l -24 -147 "},v40:{x_min:-1.359375,x_max:436.921875,ha:446,o:"m 213 205 b 217 205 215 205 216 205 b 234 194 224 205 234 199 b 236 187 234 194 235 190 l 245 167 l 261 129 l 270 106 b 355 -61 294 54 329 -13 b 420 -163 381 -105 402 -138 b 436 -188 435 -184 436 -184 b 436 -191 436 -190 436 -190 b 421 -206 436 -201 431 -206 l 421 -206 l 416 -206 l 405 -201 b 217 -158 347 -172 283 -158 b 31 -201 153 -158 88 -172 l 20 -206 l 14 -206 l 14 -206 b 0 -191 5 -206 0 -201 b -1 -188 0 -190 -1 -190 b 14 -163 -1 -186 0 -184 b 95 -34 36 -136 72 -77 b 166 106 119 8 148 68 l 175 129 l 183 148 l 200 188 b 213 205 205 199 208 202 "},v41:{x_min:-1.359375,x_max:556.6875,ha:568,o:"m 294 322 b 318 323 299 322 308 323 b 360 320 334 323 352 322 b 526 217 430 310 490 273 b 543 166 537 202 543 184 b 447 70 543 117 503 70 b 445 70 447 70 446 70 b 359 159 394 72 359 113 b 368 201 359 173 362 187 b 442 245 382 229 412 245 b 455 244 446 245 451 245 b 460 244 458 244 460 244 b 460 244 460 244 460 244 b 454 248 460 244 458 245 b 325 291 417 276 372 291 b 285 287 313 291 299 290 b 144 -2 183 269 144 190 b 281 -290 144 -208 179 -280 b 304 -291 289 -291 298 -291 b 524 -105 412 -291 506 -212 b 541 -84 526 -88 530 -84 b 556 -101 551 -84 556 -90 b 549 -138 556 -111 553 -122 b 334 -322 521 -237 435 -310 b 302 -324 323 -323 313 -324 b 13 -101 172 -324 54 -234 b -1 -1 4 -68 -1 -34 b 294 322 -1 161 121 303 "},v42:{x_min:-348.4375,x_max:24.5,ha:25,o:"m -330 155 b -322 156 -329 156 -326 156 b -315 156 -319 156 -317 156 b -298 147 -311 155 -308 154 b -19 30 -224 98 -122 55 l 2 26 b 24 -1 17 22 24 13 b 2 -27 24 -15 17 -23 l -19 -31 b -298 -148 -122 -56 -224 -99 b -322 -158 -313 -158 -315 -158 b -348 -131 -338 -158 -348 -145 b -344 -117 -348 -127 -347 -122 b -328 -104 -341 -112 -338 -111 b -127 -8 -269 -65 -202 -33 b -106 0 -115 -4 -106 -1 b -127 6 -106 0 -115 2 b -328 102 -202 31 -269 63 b -344 116 -338 109 -341 111 b -348 130 -347 120 -348 124 b -330 155 -348 141 -341 152 "},v43:{x_min:-442.359375,x_max:441,ha:450,o:"m -31 487 b -1 488 -21 488 -10 488 b 434 104 216 488 397 330 b 441 27 438 79 441 47 b 439 12 441 20 439 15 b 419 0 435 4 427 0 b 404 5 413 0 408 1 b 398 30 400 11 398 13 b 0 351 390 213 213 351 b -59 348 -20 351 -39 349 b -400 30 -251 324 -393 191 b -405 5 -400 13 -401 11 b -420 0 -409 1 -415 0 b -441 12 -428 0 -436 4 b -442 27 -441 15 -442 20 b -435 104 -442 47 -439 79 b -31 487 -401 316 -235 474 m -13 131 b -1 133 -9 133 -5 133 b 51 105 19 133 39 123 b 61 70 58 95 61 83 b 51 34 61 58 58 45 b -1 6 39 16 19 6 b -46 27 -17 6 -34 13 b -62 69 -57 38 -62 54 b -13 131 -62 98 -44 124 "},v44:{x_min:-21.78125,x_max:251.8125,ha:257,o:"m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 383 20 616 20 616 l 20 148 l 21 151 b 137 199 59 183 99 199 b 182 191 152 199 167 197 b 251 84 227 176 251 134 b 228 0 251 58 243 29 b 100 -142 206 -40 178 -72 l 23 -215 b 0 -229 9 -229 6 -229 b -20 -216 -9 -229 -17 -224 l -21 -212 l -21 201 l -21 616 l -20 620 b -8 631 -17 624 -13 630 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 "},v45:{x_min:-402.890625,x_max:401.53125,ha:410,o:"m -10 273 b -4 274 -9 273 -6 274 b 16 262 4 274 12 269 b 17 158 17 259 17 259 l 17 56 l 62 112 b 117 174 110 172 110 172 b 122 174 118 174 119 174 b 132 173 125 174 129 173 b 295 11 134 172 171 134 l 307 -1 l 336 34 b 374 76 366 72 368 74 b 381 77 375 77 378 77 b 401 56 392 77 401 68 b 400 48 401 54 401 51 b 223 -172 397 41 230 -166 b 210 -176 220 -174 215 -176 b 201 -174 206 -176 204 -176 b 112 -87 198 -173 178 -152 b 27 0 65 -38 27 0 b 21 -6 27 0 24 -2 l 17 -12 l 17 -147 b 17 -210 17 -173 17 -194 b 10 -292 17 -297 16 -287 b -2 -299 6 -297 2 -299 b -21 -287 -10 -299 -19 -295 b -24 -174 -23 -284 -23 -284 l -24 -63 l -66 -117 b -121 -176 -110 -170 -114 -176 b -125 -176 -122 -176 -123 -176 b -296 -12 -134 -174 -125 -184 l -308 0 l -337 -34 b -375 -77 -367 -73 -370 -76 b -382 -79 -377 -79 -379 -79 b -402 -58 -393 -79 -402 -69 b -401 -49 -402 -55 -402 -52 b -224 170 -398 -43 -231 165 b -212 174 -221 173 -216 174 b -202 173 -208 174 -205 174 b -39 11 -200 172 -151 122 l -28 -1 l -25 1 l -24 4 l -24 130 b -23 260 -24 256 -24 258 b -10 273 -20 266 -16 270 "},v46:{x_min:0,x_max:627.46875,ha:640,o:"m 306 190 b 314 191 308 191 311 191 b 326 184 318 191 322 190 l 336 173 b 510 52 377 127 442 80 b 515 49 513 51 515 49 b 611 16 537 40 579 24 b 627 0 624 13 627 9 b 607 -18 627 -11 624 -13 b 330 -181 490 -49 389 -109 b 314 -192 323 -190 319 -192 b 306 -191 311 -192 308 -192 b 294 -177 302 -188 302 -188 b 257 -140 287 -170 265 -148 b 19 -18 193 -84 114 -44 b 0 0 2 -13 0 -11 b 16 16 0 9 2 13 b 110 49 47 24 89 40 b 117 52 111 49 114 51 b 145 65 126 56 130 58 b 281 163 200 93 245 124 b 300 186 288 170 291 174 b 306 190 300 187 303 188 m 317 137 b 313 142 315 141 314 142 b 308 137 313 142 311 141 b 161 4 276 84 220 33 b 155 0 159 1 155 0 b 163 -4 155 0 159 -2 b 308 -138 220 -34 276 -84 b 313 -142 311 -141 313 -142 b 317 -138 314 -142 315 -141 b 464 -4 351 -84 406 -34 b 470 0 468 -2 470 0 b 464 4 470 0 468 1 b 317 137 406 33 351 84 "},v47:{x_min:-24.5,x_max:315.78125,ha:322,o:"m -24 -145 l -24 -5 l -20 -5 b 1 -26 -10 -5 -6 -9 b 175 -241 31 -86 96 -166 b 314 -548 259 -323 304 -420 b 315 -589 315 -555 315 -571 b 314 -630 315 -606 315 -623 b 298 -730 311 -664 306 -699 l 295 -742 l 296 -748 b 314 -850 304 -778 311 -813 b 315 -892 315 -857 315 -874 b 314 -932 315 -909 315 -925 b 298 -1032 311 -967 306 -1002 l 295 -1045 l 296 -1050 b 314 -1153 304 -1081 311 -1115 b 315 -1193 315 -1160 315 -1177 b 314 -1235 315 -1211 315 -1228 b 217 -1526 306 -1338 270 -1444 b 201 -1533 213 -1532 208 -1533 b 182 -1522 193 -1533 185 -1529 b 179 -1514 181 -1518 179 -1517 b 189 -1489 179 -1508 182 -1501 b 266 -1217 240 -1403 266 -1308 b 262 -1156 266 -1196 265 -1177 b 110 -907 247 -1043 190 -950 b 0 -889 87 -895 50 -889 l -1 -889 l -24 -889 l -24 -749 l -24 -610 l -20 -610 b 1 -631 -10 -610 -6 -614 b 175 -846 31 -691 96 -771 b 259 -956 213 -884 236 -914 b 265 -966 262 -961 264 -966 b 265 -966 265 -966 265 -966 b 265 -953 265 -964 265 -959 b 266 -920 266 -943 266 -932 b 262 -853 266 -898 265 -873 b 110 -605 247 -741 190 -648 b 0 -587 87 -592 50 -587 l -1 -587 l -24 -587 l -24 -448 l -24 -308 l -20 -308 b 1 -328 -10 -308 -6 -312 b 175 -544 31 -388 96 -469 b 259 -655 213 -581 236 -612 b 265 -663 262 -659 264 -663 b 265 -663 265 -663 265 -663 b 265 -650 265 -663 265 -657 b 266 -617 266 -641 266 -630 b 262 -551 266 -595 265 -570 b 110 -303 247 -438 190 -345 b 0 -284 87 -290 50 -284 l -1 -284 l -24 -284 l -24 -145 "},v49:{x_min:0,x_max:630.203125,ha:643,o:"m 308 204 b 314 205 310 205 313 205 b 326 201 319 205 323 204 b 355 154 328 199 338 180 b 401 83 362 142 392 95 l 409 72 b 431 41 412 66 424 49 b 619 -174 498 -51 570 -134 b 630 -192 626 -180 630 -186 b 626 -202 630 -195 628 -199 b 616 -206 623 -205 620 -206 b 552 -188 608 -206 592 -202 b 310 -155 488 -169 392 -155 b 268 -156 295 -155 281 -155 b 77 -188 197 -161 126 -173 b 13 -206 35 -202 20 -206 b 9 -206 12 -206 10 -206 b 0 -191 2 -202 0 -197 b 8 -176 0 -186 2 -180 b 204 49 58 -136 138 -43 l 220 72 l 227 83 b 295 188 245 108 281 166 b 308 204 299 197 304 202 m 315 147 b 314 147 315 147 314 147 b 314 147 314 147 314 147 b 306 129 314 145 310 138 l 296 105 b 281 72 292 97 284 77 l 274 56 b 181 -123 247 -4 212 -72 l 174 -134 l 176 -133 b 314 -123 215 -127 272 -123 b 451 -133 356 -123 413 -127 l 454 -134 l 449 -123 b 353 56 417 -72 381 -4 l 347 72 b 332 105 344 77 336 97 l 322 129 b 315 147 318 138 315 145 "},v4a:{x_min:70.78125,x_max:378.390625,ha:315,o:"m 246 373 b 254 373 249 373 251 373 b 372 324 303 373 360 351 b 378 302 377 317 378 309 b 338 251 378 278 362 255 b 328 249 334 249 332 249 b 283 294 303 249 283 270 b 288 315 283 301 284 308 b 289 319 289 317 289 319 b 289 319 289 319 289 319 b 283 320 289 320 287 320 b 270 322 279 322 274 322 b 206 288 242 322 215 308 b 206 283 206 287 206 285 b 257 223 206 267 230 238 b 284 206 272 213 277 210 b 351 90 328 173 351 130 b 340 47 351 74 348 59 b 205 -30 314 -2 264 -30 b 182 -29 198 -30 190 -30 b 84 15 147 -24 103 -5 b 70 48 74 24 70 36 b 108 99 70 70 85 94 b 121 102 112 101 117 102 b 167 56 147 102 167 80 b 159 31 167 48 164 40 l 156 26 l 157 26 b 190 20 167 22 178 20 b 220 26 201 20 212 22 b 258 65 243 34 258 51 b 257 70 258 66 258 69 b 204 126 249 94 234 109 b 114 258 148 158 114 209 b 125 302 114 273 118 288 b 246 373 147 342 193 370 "},v4b:{x_min:0,x_max:503.609375,ha:514,o:"m 274 430 b 277 430 276 430 277 430 b 310 394 296 430 310 415 b 308 383 310 391 308 387 b 306 367 307 381 307 374 b 236 120 298 305 272 210 b 40 -273 189 -5 125 -134 b 20 -287 35 -283 27 -287 b 5 -281 14 -287 9 -285 b 0 -267 1 -277 0 -273 b 9 -242 0 -262 2 -255 b 246 395 137 -12 232 242 b 274 430 249 416 257 427 m 468 430 b 472 430 469 430 470 430 b 503 394 490 430 503 415 b 502 383 503 391 503 387 b 499 367 502 381 500 374 b 431 120 491 305 465 210 b 234 -273 382 -5 318 -134 b 213 -287 228 -283 220 -287 b 198 -281 208 -287 202 -285 b 193 -267 194 -277 193 -273 b 202 -242 193 -262 196 -255 b 439 395 330 -12 426 242 b 468 430 442 416 451 427 "},v4d:{x_min:-311.6875,x_max:310.328125,ha:317,o:"m -9 388 b -2 390 -8 390 -5 390 b 5 388 1 390 4 390 b 19 378 10 387 16 383 b 23 333 23 371 23 371 b 24 298 23 299 24 298 b 81 276 34 298 65 285 b 213 91 145 240 190 177 b 224 24 217 76 224 36 b 257 24 224 24 235 24 b 299 19 292 24 292 24 b 310 -1 306 15 310 6 b 299 -23 310 -11 306 -19 b 257 -27 292 -27 292 -27 b 224 -29 235 -27 224 -29 b 213 -95 224 -40 217 -80 b 81 -280 190 -181 145 -244 b 24 -301 65 -290 34 -301 b 23 -335 24 -301 23 -303 l 23 -340 b 17 -381 23 -374 23 -374 b -1 -391 13 -388 5 -391 b -21 -381 -9 -391 -17 -388 b -27 -340 -27 -374 -27 -374 l -27 -335 b -28 -301 -27 -303 -27 -301 b -85 -280 -38 -301 -69 -290 b -217 -95 -149 -244 -194 -181 b -228 -29 -221 -80 -228 -40 b -259 -27 -228 -29 -238 -27 b -300 -23 -294 -27 -294 -27 b -311 -2 -307 -19 -311 -11 b -294 23 -311 8 -304 19 b -259 24 -291 23 -284 24 b -228 24 -239 24 -228 24 b -217 91 -228 36 -221 76 b -85 276 -194 177 -149 240 b -28 298 -69 285 -38 298 b -27 333 -27 298 -27 299 b -27 371 -27 362 -27 369 b -9 388 -24 378 -17 385 m -27 136 b -28 247 -27 197 -28 247 b -61 216 -31 247 -53 226 b -123 33 -95 172 -121 98 l -125 24 l -76 24 l -27 24 l -27 136 m 29 242 b 24 247 27 245 24 247 b 23 136 24 247 23 197 l 23 24 l 72 24 l 121 24 l 119 33 b 29 242 115 116 77 206 m -27 -140 l -27 -27 l -76 -27 l -125 -27 l -123 -36 b -61 -220 -121 -102 -95 -176 b -28 -251 -53 -230 -31 -251 b -27 -140 -28 -251 -27 -201 m 119 -36 l 121 -27 l 72 -27 l 23 -27 l 23 -140 b 24 -251 23 -201 24 -251 b 57 -220 27 -251 49 -230 b 119 -36 91 -176 117 -102 "},v4e:{x_min:0,x_max:239.5625,ha:244,o:"m 10 460 b 20 462 13 462 14 462 b 39 449 28 462 35 458 l 40 446 l 40 326 b 40 205 40 259 40 205 b 127 227 40 205 80 215 b 220 249 196 244 213 249 b 227 247 224 249 225 248 b 238 237 231 245 235 241 l 239 233 l 239 -106 l 239 -448 l 238 -451 b 219 -463 234 -459 225 -463 b 198 -451 210 -463 202 -459 l 197 -448 l 197 -324 b 197 -201 197 -248 197 -201 b 110 -223 196 -201 157 -210 b 17 -245 42 -240 24 -245 b 10 -242 13 -245 13 -244 b 0 -233 6 -241 2 -237 l 0 -230 l 0 108 l 0 446 l 0 449 b 10 460 2 453 6 458 m 197 22 b 197 70 197 41 197 58 b 196 116 197 113 197 116 l 196 116 b 118 97 196 116 160 106 l 40 77 l 40 -18 b 40 -112 40 -69 40 -112 l 119 -93 l 197 -73 l 197 22 "},v51:{x_min:-1.359375,x_max:455.96875,ha:465,o:"m 352 541 b 357 542 353 542 355 542 b 377 530 364 542 372 537 l 378 526 l 378 394 l 379 262 l 404 266 b 436 270 420 269 430 270 b 450 265 443 270 446 269 b 455 220 455 259 455 260 l 455 208 l 455 161 l 454 156 b 411 140 449 147 447 147 b 378 133 393 137 379 134 b 378 68 378 133 378 106 b 378 22 378 54 378 38 l 379 -87 l 404 -83 b 436 -79 420 -80 430 -79 b 450 -84 443 -79 446 -80 b 455 -129 455 -90 455 -88 l 455 -141 l 455 -188 l 454 -192 b 413 -209 449 -202 447 -202 b 382 -215 398 -212 383 -215 l 378 -215 l 378 -345 l 378 -380 b 375 -485 378 -484 378 -480 b 357 -494 371 -491 364 -494 b 340 -485 351 -494 344 -491 b 336 -383 337 -480 336 -484 l 336 -349 l 336 -223 l 334 -223 b 291 -231 334 -223 314 -227 l 247 -240 l 247 -371 l 246 -503 l 245 -506 b 225 -519 242 -514 234 -519 b 206 -506 219 -519 210 -514 l 205 -503 l 205 -376 l 205 -248 l 160 -256 l 115 -265 l 115 -396 l 115 -527 l 114 -531 b 95 -544 110 -539 102 -544 b 76 -531 87 -544 78 -539 l 73 -527 l 73 -399 b 73 -273 73 -330 73 -273 b 49 -277 73 -273 61 -274 b 17 -281 32 -280 24 -281 b 4 -276 10 -281 8 -280 b -1 -234 0 -269 -1 -272 b 0 -219 -1 -229 0 -224 l 0 -170 l 1 -167 b 10 -158 2 -163 6 -159 b 49 -149 13 -156 16 -155 l 73 -145 l 73 -34 b 73 76 73 26 73 76 b 49 72 73 76 61 74 b 17 68 32 69 24 68 b 4 73 10 68 8 69 b -1 115 0 80 -1 77 b 0 130 -1 120 0 124 l 0 179 l 1 181 b 10 191 2 186 6 190 b 49 199 13 192 16 194 l 73 204 l 73 338 b 73 374 73 352 73 365 b 77 483 73 484 73 477 b 95 492 81 489 88 492 b 111 483 100 492 107 489 b 115 378 115 477 115 483 l 115 342 b 117 212 115 223 115 212 b 204 229 117 212 200 227 l 205 229 l 205 365 l 205 502 l 206 505 b 225 517 210 513 219 517 b 245 505 234 517 242 513 l 246 502 l 247 369 l 247 237 l 249 237 b 336 254 253 238 336 254 b 337 390 336 254 337 302 l 337 526 l 338 530 b 352 541 341 535 347 539 m 336 15 b 336 126 336 102 336 126 l 336 126 b 291 117 336 126 315 122 l 247 109 l 247 -1 l 247 -112 l 249 -112 b 336 -95 253 -111 336 -95 b 336 15 336 -95 336 -56 m 205 -120 b 205 -55 205 -120 205 -93 b 205 -9 205 -41 205 -24 l 205 101 l 160 93 l 115 84 l 115 -26 b 115 -83 115 -49 115 -69 b 117 -137 115 -133 115 -137 b 205 -120 118 -137 204 -120 "},v52:{x_min:-10.890625,x_max:298.078125,ha:294,o:"m 138 473 b 142 474 140 473 141 474 b 164 459 148 474 153 470 b 191 402 183 442 191 423 b 181 353 191 388 187 371 b 178 349 179 352 178 349 b 179 348 178 348 179 348 b 185 349 181 348 182 348 b 255 376 210 355 234 363 b 272 381 264 381 266 381 b 298 355 287 381 298 370 b 288 330 298 348 298 345 b 171 34 238 254 194 141 b 166 13 168 16 168 16 b 144 1 161 5 152 1 b 121 15 134 1 125 5 b 115 33 119 18 117 24 b 0 330 91 145 49 252 b -10 355 -9 345 -10 348 b 13 381 -10 371 0 381 b 31 376 19 381 25 380 b 132 345 61 358 103 345 l 136 345 l 137 355 b 145 378 138 359 142 370 b 152 415 149 394 152 405 b 137 452 152 427 148 438 b 133 464 134 458 133 460 b 138 473 133 467 134 470 "},v53:{x_min:0,x_max:902.421875,ha:921,o:"m 17 240 b 24 241 19 241 21 241 b 32 240 28 241 31 241 b 46 229 38 238 43 234 b 50 88 50 223 50 237 b 50 -1 50 63 50 34 b 50 -90 50 -36 50 -65 b 46 -231 50 -238 50 -224 b 25 -242 42 -238 34 -242 b 0 -224 14 -242 4 -235 b 0 2 0 -222 0 -108 b 0 223 0 112 0 220 b 17 240 2 230 9 237 m 110 240 b 118 241 111 241 114 241 b 126 240 121 241 123 241 b 142 223 133 237 140 230 b 144 123 144 220 144 205 b 144 29 144 45 144 29 b 144 29 144 29 144 29 b 393 183 166 106 264 167 b 450 186 412 184 431 186 b 756 29 600 186 732 120 b 756 29 756 29 756 29 b 758 123 758 29 758 45 b 760 227 758 226 758 223 b 784 241 766 237 774 241 b 804 229 792 241 800 237 b 809 88 808 223 809 237 l 809 -1 l 809 -90 b 804 -231 809 -238 808 -224 b 784 -242 800 -238 792 -242 b 762 -231 775 -242 766 -238 b 758 -124 756 -224 758 -231 b 756 -30 758 -47 758 -30 b 756 -30 756 -30 756 -30 b 509 -184 736 -108 637 -169 b 450 -187 488 -187 469 -187 b 144 -30 300 -187 168 -122 b 144 -30 144 -30 144 -30 b 144 -124 144 -30 144 -47 b 140 -231 144 -231 144 -224 b 118 -242 134 -238 126 -242 b 92 -224 107 -242 96 -235 b 92 2 92 -222 92 -108 b 92 223 92 112 92 220 b 110 240 95 230 102 237 m 432 161 b 413 162 426 162 420 162 b 313 41 351 162 313 109 b 347 -73 313 5 323 -34 b 487 -163 385 -133 439 -163 b 578 -97 526 -163 562 -142 b 588 -43 585 -80 588 -62 b 432 161 588 47 518 147 m 868 240 b 876 241 869 241 872 241 b 884 240 879 241 882 241 b 898 229 890 238 894 234 b 902 88 902 223 902 237 l 902 -1 l 902 -90 b 898 -231 902 -238 902 -224 b 876 -242 892 -238 884 -242 b 852 -224 865 -242 854 -235 b 850 2 850 -222 850 -108 b 852 223 850 112 850 220 b 868 240 853 230 860 237 "},v54:{x_min:-24.5,x_max:317.140625,ha:324,o:"m -24 -161 l -24 -5 l -20 -5 b 0 -24 -9 -5 -2 -12 b 171 -315 21 -124 84 -233 b 317 -660 268 -406 317 -531 b 187 -1014 317 -782 274 -909 b 161 -1034 172 -1034 171 -1034 b 141 -1013 149 -1034 141 -1025 b 152 -991 141 -1004 142 -1002 b 266 -682 228 -899 266 -788 b 174 -430 266 -588 236 -498 b -23 -317 136 -388 66 -348 b -24 -161 -23 -316 -24 -285 "},v55:{x_min:0,x_max:551.25,ha:563,o:"m 289 644 b 304 645 294 645 299 645 b 404 566 349 645 392 613 b 406 541 405 557 406 549 b 379 471 406 514 397 489 l 377 467 l 382 470 b 509 591 438 485 485 531 b 513 601 510 595 513 599 b 530 609 518 607 524 609 b 551 588 540 609 551 602 b 200 -605 551 584 204 -599 b 182 -616 197 -612 190 -616 b 163 -602 174 -616 166 -610 b 161 -598 161 -601 161 -601 b 217 -402 161 -589 170 -562 b 272 -213 247 -298 272 -213 b 272 -213 272 -213 272 -213 b 264 -219 272 -213 268 -216 b 140 -262 227 -247 182 -262 b 36 -226 102 -262 65 -249 b 0 -145 12 -206 0 -176 b 17 -84 0 -124 5 -104 b 103 -38 38 -54 70 -38 b 191 -91 137 -38 172 -56 b 205 -141 201 -106 205 -124 b 178 -212 205 -167 196 -194 l 175 -215 l 182 -213 b 307 -93 236 -198 284 -151 b 372 129 308 -88 372 127 b 372 129 372 129 372 129 b 364 122 372 129 368 126 b 240 80 328 94 283 80 b 137 115 202 80 166 91 b 99 195 112 136 99 165 b 118 256 99 217 106 238 b 204 303 138 287 171 303 b 292 249 238 303 273 285 b 306 199 302 234 306 217 b 279 129 306 173 296 148 l 276 126 l 281 127 b 408 248 336 142 385 190 b 473 470 409 254 473 469 b 473 470 473 470 473 470 b 465 464 473 470 469 467 b 341 421 428 435 383 421 b 236 458 303 421 266 433 b 200 537 212 478 200 508 b 289 644 200 585 234 635 "},v58:{x_min:-21.78125,x_max:367.5,ha:375,o:"m 259 1553 b 265 1553 261 1553 264 1553 b 288 1540 272 1553 277 1550 b 367 1351 340 1493 367 1424 b 336 1221 367 1308 357 1263 l 332 1211 l 333 1208 b 367 1077 356 1170 367 1124 b 336 945 367 1032 357 986 l 332 935 l 333 932 b 367 800 356 893 367 848 b 336 669 367 756 357 710 l 332 659 l 333 656 b 367 523 356 617 367 571 b 345 412 367 485 360 446 b 231 273 322 356 284 310 b -1 19 121 195 27 93 b -17 4 -4 11 -10 5 l -21 4 l -21 134 l -21 265 l -17 265 b 133 291 20 265 96 278 b 318 537 245 328 318 433 b 307 603 318 559 315 582 b 303 614 304 612 304 614 b 298 609 302 614 300 613 b 231 549 281 589 258 567 b -1 295 121 471 27 369 b -17 280 -4 287 -10 281 l -21 280 l -21 410 l -21 541 l -17 541 b 133 567 20 541 96 555 b 318 813 245 605 318 709 b 307 880 318 835 315 859 b 303 891 304 888 304 891 b 298 885 302 891 300 888 b 231 825 281 866 258 843 b -1 571 121 748 27 645 b -17 556 -4 563 -10 557 l -21 556 l -21 687 l -21 817 l -17 817 b 133 843 20 817 96 830 b 318 1089 245 881 318 985 b 307 1156 318 1111 315 1134 b 303 1167 304 1164 304 1167 b 298 1161 302 1167 300 1164 b 231 1102 281 1140 258 1120 b -1 848 121 1024 27 921 b -17 832 -4 839 -10 834 l -21 832 l -21 963 l -21 1093 l -17 1093 b 114 1113 12 1093 78 1103 b 313 1314 215 1142 289 1218 b 318 1364 317 1331 318 1347 b 255 1511 318 1422 295 1478 b 243 1532 247 1519 243 1525 b 259 1553 243 1540 250 1550 "},v59:{x_min:0,x_max:464.140625,ha:474,o:"m 0 0 l 0 347 l 76 347 l 153 347 l 153 0 l 153 -348 l 76 -348 l 0 -348 l 0 0 m 308 -1 l 308 347 l 386 347 l 464 347 l 464 -1 l 464 -348 l 386 -348 l 308 -348 l 308 -1 "},v5a:{x_min:-171.5,x_max:170.140625,ha:174,o:"m -6 566 b 0 567 -5 567 -2 567 b 14 556 6 567 12 563 b 92 285 14 555 50 433 b 170 13 166 33 170 19 b 168 13 170 13 170 13 b 161 1 168 8 167 4 l 159 0 l 122 0 l 84 0 l 81 1 b 21 195 76 5 78 -5 b -32 381 -8 297 -32 381 b -87 197 -32 381 -57 298 b -141 8 -115 94 -140 9 b -155 0 -142 2 -149 0 b -171 15 -163 0 -171 5 b -14 556 -171 18 -24 528 b -6 566 -14 560 -10 564 "},v5b:{x_min:-441,x_max:439.640625,ha:449,o:"m -428 -2 b -421 0 -427 -1 -424 0 b -406 -6 -416 0 -409 -2 b -400 -31 -401 -12 -400 -15 b -1 -352 -392 -215 -215 -352 b 58 -349 19 -352 38 -351 b 398 -31 250 -326 392 -192 b 404 -6 398 -15 400 -12 b 419 -1 408 -2 413 -1 b 439 -13 427 -1 435 -5 b 439 -29 439 -16 439 -22 b 434 -105 439 -48 438 -80 b 0 -489 397 -333 213 -489 b -68 -484 -23 -489 -44 -488 b -441 -36 -280 -452 -436 -263 b -441 -30 -441 -34 -441 -31 b -428 -2 -441 -11 -439 -5 m -13 -9 b -1 -8 -9 -8 -5 -8 b 50 -36 19 -8 39 -19 b 61 -72 57 -47 61 -59 b 50 -106 61 -84 57 -97 b -1 -134 39 -124 19 -134 b -46 -115 -17 -134 -34 -129 b -62 -72 -57 -102 -62 -87 b -13 -9 -62 -44 -44 -16 "},v5c:{x_min:0,x_max:447.8125,ha:457,o:"m 0 -87 l 0 0 l 223 0 l 447 0 l 447 -87 l 447 -174 l 223 -174 l 0 -174 l 0 -87 "},v5d:{x_min:-1.359375,x_max:592.078125,ha:604,o:"m 280 692 b 295 694 283 692 289 694 b 310 692 300 694 307 692 b 357 630 340 684 357 657 b 336 580 357 612 351 594 b 311 538 321 566 311 549 b 352 492 311 512 330 492 b 366 495 357 492 362 492 b 397 553 390 503 397 517 b 415 603 397 576 402 591 b 460 623 427 617 443 623 b 509 599 479 623 498 614 b 522 559 518 587 522 573 b 494 506 522 538 513 519 b 451 495 481 498 473 496 b 415 488 432 495 426 494 b 394 449 404 483 394 464 b 394 448 394 448 394 448 l 394 440 l 397 433 b 428 409 404 420 413 413 b 438 408 431 408 435 408 b 479 431 450 408 462 415 b 528 455 495 448 510 455 b 548 452 534 455 541 453 b 592 391 577 442 592 416 b 549 331 592 365 577 340 b 528 327 541 328 534 327 b 479 351 510 327 495 335 b 438 374 464 367 450 374 b 417 369 431 374 424 373 b 394 333 402 360 394 348 b 400 312 394 326 396 319 b 451 287 408 294 420 288 b 513 258 484 285 499 278 b 522 223 519 247 522 234 b 461 159 522 190 496 159 b 449 161 457 159 453 159 b 397 229 416 167 397 191 b 366 288 397 265 390 278 b 352 290 362 290 357 290 b 315 262 336 290 321 280 b 311 245 313 256 311 251 b 334 204 311 233 318 220 b 355 170 348 190 351 184 b 357 152 356 166 357 159 b 355 136 357 147 356 140 b 295 88 345 104 321 88 b 232 152 264 88 232 112 b 255 204 232 174 238 186 b 279 244 273 222 279 231 l 279 245 b 238 290 279 270 259 290 b 224 288 234 290 228 290 b 193 229 200 278 193 265 b 141 161 193 191 174 167 b 129 159 137 159 133 159 b 68 223 93 159 68 190 b 77 258 68 234 70 247 b 138 287 91 278 106 285 b 185 302 166 287 175 291 b 196 333 193 312 196 323 b 174 369 196 347 187 360 b 152 374 166 373 159 374 b 111 351 140 374 126 367 b 62 327 95 335 80 327 b 51 328 58 327 54 327 b -1 391 16 334 -1 363 b 53 455 -1 420 17 449 b 62 455 57 455 59 455 b 111 431 80 455 95 448 b 152 408 127 415 140 408 b 161 409 155 408 159 408 b 193 433 176 413 186 420 l 196 440 l 196 448 b 196 451 196 449 196 449 b 190 471 196 459 194 463 b 137 495 182 489 167 495 l 134 495 l 134 495 b 68 560 95 495 68 521 b 129 623 68 596 95 623 b 144 621 134 623 138 623 b 193 553 175 614 193 589 b 224 495 193 517 200 503 b 238 492 228 492 234 492 b 279 538 259 492 279 512 b 254 580 279 549 269 566 b 232 630 239 594 232 612 b 280 692 232 657 250 684 m 307 456 b 295 458 303 458 299 458 b 230 391 258 458 230 426 b 236 360 230 381 231 371 b 295 324 249 337 272 324 b 353 360 318 324 341 337 b 360 391 357 370 360 381 b 307 456 360 421 340 451 "},v60:{x_min:-590.71875,x_max:589.359375,ha:601,o:"m -367 173 b -362 174 -366 174 -364 174 b -351 173 -357 174 -353 173 b -262 86 -348 172 -328 151 b -176 0 -216 37 -176 0 b -107 84 -176 0 -145 37 b -31 174 -36 173 -38 172 b -25 174 -29 174 -28 174 b -16 173 -23 174 -19 173 b 72 86 -13 172 6 151 b 157 0 119 37 157 0 b 227 84 159 0 189 37 b 303 174 298 173 296 172 b 308 174 304 174 307 174 b 318 173 313 174 317 173 b 481 11 322 172 357 134 l 494 -1 l 522 34 b 560 76 553 72 555 74 b 567 77 563 77 564 77 b 589 56 579 77 589 68 b 586 48 589 54 588 51 b 411 -172 583 41 416 -166 b 397 -176 406 -174 401 -176 b 387 -174 393 -176 390 -176 b 299 -87 386 -173 366 -152 b 213 0 253 -38 213 0 b 144 -86 213 0 182 -38 b 68 -174 73 -174 74 -173 b 62 -176 66 -176 65 -176 b 53 -174 59 -176 55 -174 b -35 -87 50 -173 29 -152 b -121 0 -83 -38 -121 0 b -190 -86 -122 0 -152 -38 b -266 -174 -261 -174 -259 -173 b -272 -176 -268 -176 -270 -176 b -281 -174 -276 -176 -280 -174 b -371 -86 -284 -173 -304 -152 b -457 0 -417 -38 -457 0 l -457 0 b -477 -26 -457 0 -470 -16 b -548 -227 -524 -88 -548 -161 b -536 -303 -548 -254 -544 -280 b -533 -317 -534 -309 -533 -313 b -553 -338 -533 -330 -541 -338 b -577 -315 -566 -338 -571 -333 b -590 -227 -586 -287 -590 -258 b -518 -9 -590 -154 -564 -77 b -465 56 -509 2 -504 8 l -402 134 b -367 173 -375 169 -372 172 "},v62:{x_min:46.28125,x_max:669.671875,ha:563,o:"m 183 376 b 189 376 185 376 187 376 b 212 374 197 376 208 376 b 265 337 234 369 253 355 b 274 317 268 331 273 320 b 274 316 274 317 274 316 b 280 323 276 316 276 319 b 311 358 288 337 299 348 b 319 366 315 360 318 365 b 356 376 326 373 340 376 b 382 371 364 376 374 374 b 428 337 400 366 417 352 b 436 317 431 331 436 320 b 438 316 436 317 436 316 b 442 323 438 316 439 319 b 475 358 451 337 462 348 b 483 366 477 360 481 365 b 518 376 488 373 503 376 b 544 373 528 376 536 376 b 604 285 579 360 604 326 b 597 249 604 273 601 258 b 543 63 596 247 544 70 b 541 54 543 61 541 55 b 540 44 540 51 540 47 b 552 23 540 33 545 23 b 552 23 552 23 552 23 b 647 126 586 29 627 72 b 658 138 651 136 653 138 b 660 138 660 138 660 138 b 669 129 666 137 669 136 b 654 88 669 122 665 109 b 562 -12 631 43 602 9 l 549 -19 b 521 -27 540 -24 530 -27 b 447 30 490 -27 458 -4 b 443 58 445 38 443 48 b 450 93 443 72 446 84 b 504 278 453 97 504 272 b 507 288 506 283 506 287 b 509 298 507 292 509 295 b 491 326 509 310 502 320 b 487 327 490 327 488 327 b 479 324 484 327 483 326 b 441 270 462 316 443 288 b 435 249 441 265 436 254 b 398 127 434 248 419 195 b 362 4 379 61 362 5 b 328 -1 359 -1 362 -1 b 314 -1 323 -1 319 -1 b 302 -1 310 -1 306 -1 b 266 4 266 -1 269 -1 b 265 6 265 5 265 5 b 303 144 265 13 272 34 b 343 278 325 216 343 276 b 344 288 343 281 344 285 b 345 298 345 291 345 295 b 330 326 345 310 340 320 b 323 327 328 327 325 327 b 317 324 322 327 321 326 b 279 270 300 316 281 288 b 273 249 279 265 274 254 b 236 127 272 248 255 195 b 200 4 216 61 200 5 b 164 -1 197 -1 198 -1 b 151 -1 161 -1 156 -1 b 140 -1 147 -1 142 -1 b 103 4 104 -1 106 -1 b 103 6 103 5 103 5 b 141 144 103 13 108 34 b 181 278 161 216 179 276 b 182 288 181 281 181 285 b 183 298 182 291 183 295 b 168 324 183 310 178 320 b 160 327 166 326 163 327 b 141 320 156 327 151 324 b 69 230 112 305 85 272 b 57 215 65 217 62 215 b 55 215 57 215 55 215 b 46 224 49 215 46 217 b 59 260 46 231 50 242 b 151 363 81 306 112 341 b 161 369 155 365 160 367 b 183 376 166 371 174 374 "},v68:{x_min:-597.53125,x_max:596.171875,ha:608,o:"m -533 324 b -525 327 -530 326 -528 327 b -504 305 -514 327 -504 317 b -504 305 -504 305 -504 305 b -513 284 -504 299 -504 299 b -556 112 -541 226 -556 167 b -545 33 -556 84 -552 58 b -524 -20 -541 15 -532 -9 l -522 -23 l -491 15 l -413 111 b -355 174 -367 169 -363 174 b -351 174 -353 174 -352 174 b -254 86 -343 174 -348 179 b -168 -1 -208 37 -168 -1 b -100 84 -168 -1 -137 37 b -23 173 -28 173 -29 172 b -19 174 -21 174 -20 174 b -8 173 -14 174 -10 173 b 155 11 -5 172 43 123 l 166 -1 l 168 1 l 170 4 l 170 130 b 171 260 170 256 170 258 b 191 274 175 269 183 274 b 205 267 196 274 201 272 b 212 158 212 262 210 273 l 212 56 l 257 112 b 311 173 304 172 304 172 b 317 174 313 174 314 174 b 326 173 319 174 323 173 b 490 11 329 172 366 134 l 502 -1 l 530 34 b 568 76 560 72 563 74 b 575 77 570 77 573 77 b 596 56 586 77 596 68 b 594 48 596 54 596 51 b 417 -172 592 41 424 -166 b 405 -176 415 -174 409 -176 b 396 -174 401 -176 398 -176 b 307 -87 393 -173 372 -152 b 221 -1 259 -38 221 -1 b 216 -6 221 -1 219 -2 l 212 -12 l 212 -147 b 212 -210 212 -173 212 -194 b 205 -292 212 -297 210 -287 b 191 -299 201 -297 196 -299 b 172 -287 183 -299 175 -295 b 170 -174 171 -284 171 -284 l 170 -63 l 127 -117 b 73 -176 84 -170 80 -176 b 68 -176 72 -176 70 -176 b -27 -87 59 -174 65 -180 b -114 0 -74 -38 -112 0 b -182 -86 -114 0 -145 -38 b -258 -174 -253 -174 -253 -173 b -264 -176 -259 -176 -262 -176 b -274 -174 -268 -176 -272 -174 b -438 -11 -277 -173 -348 -102 l -449 0 l -479 -37 b -524 -80 -513 -80 -514 -80 l -524 -80 b -553 -52 -534 -80 -540 -74 b -597 109 -583 -8 -597 48 b -560 280 -597 165 -585 224 b -533 324 -548 310 -540 322 "},v6c:{x_min:-1.359375,x_max:193.28125,ha:197,o:"m 78 233 b 87 233 81 233 84 233 b 187 140 132 233 174 195 b 193 102 190 127 193 115 b 43 -113 193 22 136 -62 b 27 -119 36 -116 31 -119 b 19 -108 21 -119 19 -115 b 29 -97 19 -102 20 -101 b 102 13 73 -72 102 -27 b 92 51 102 26 98 40 l 91 54 l 84 54 b 8 104 53 54 21 74 b -1 142 1 116 -1 130 b 78 233 -1 187 31 227 "},v6d:{x_min:-590.71875,x_max:589.359375,ha:601,o:"m 544 335 b 553 337 548 337 551 337 b 575 313 563 337 570 330 b 589 226 583 285 589 256 b 517 8 589 152 563 76 b 464 -58 507 -4 503 -9 l 401 -136 b 362 -176 372 -172 370 -176 b 357 -176 360 -176 359 -176 b 261 -87 349 -174 355 -180 b 175 0 215 -38 175 0 b 106 -86 175 0 144 -38 b 29 -174 35 -174 36 -173 b 24 -176 28 -176 27 -176 b 14 -174 21 -176 17 -174 b -73 -87 12 -173 -8 -152 b -159 0 -121 -38 -159 0 b -228 -86 -160 0 -190 -38 b -304 -174 -299 -174 -298 -173 b -310 -176 -306 -176 -308 -176 b -319 -174 -314 -176 -318 -174 b -483 -12 -323 -173 -359 -137 l -495 0 l -524 -34 b -562 -77 -553 -73 -556 -76 b -568 -79 -564 -79 -566 -79 b -590 -58 -581 -79 -590 -69 b -588 -49 -590 -55 -589 -52 b -412 170 -585 -43 -417 165 b -398 174 -408 173 -402 174 b -389 173 -394 174 -392 174 b -300 86 -387 172 -366 151 b -215 -1 -254 37 -215 -1 b -145 84 -215 -1 -183 37 b -69 173 -74 173 -76 172 b -63 174 -68 174 -66 174 b -54 173 -61 174 -57 173 b 34 86 -51 172 -31 151 b 119 -1 81 37 119 -1 b 189 84 121 -1 151 37 b 265 173 259 173 258 172 b 270 174 266 174 269 174 b 280 173 274 174 279 173 b 370 84 283 172 303 151 b 455 -1 416 37 455 -1 l 455 -1 b 476 24 455 -1 469 15 b 547 226 522 87 547 159 b 534 302 547 252 543 278 b 532 317 533 308 532 313 b 544 335 532 326 536 333 "},v6f:{x_min:-80.3125,x_max:78.9375,ha:81,o:"m 63 191 b 69 192 65 192 66 192 b 77 188 72 192 76 191 b 78 183 78 187 78 186 b 74 158 78 179 77 172 l 66 115 b 9 -161 49 30 10 -158 b -10 -187 6 -172 -1 -181 b -34 -194 -17 -191 -25 -194 b -80 -147 -58 -194 -80 -174 b -80 -141 -80 -144 -80 -142 b 9 70 -80 -134 -73 -117 l 49 163 b 63 191 59 188 61 190 "},v70:{x_min:0,x_max:436.921875,ha:446,o:"m 213 190 b 217 191 215 191 216 191 b 231 184 223 191 228 188 b 249 154 240 167 246 159 b 419 18 292 91 348 45 b 436 -1 435 11 436 8 b 424 -16 436 -9 434 -13 b 308 -87 394 -26 340 -59 b 231 -186 276 -117 257 -142 b 219 -192 228 -191 225 -192 b 198 -174 209 -192 208 -191 b 47 -33 161 -113 110 -63 b 10 -16 34 -26 17 -19 b 0 -1 2 -13 0 -9 b 17 18 0 8 1 11 b 198 173 95 48 156 101 b 213 190 206 187 208 188 "},v72:{x_min:-423.3125,x_max:421.9375,ha:431,o:"m -262 197 b -247 197 -257 197 -253 197 b -118 162 -210 197 -163 184 b 40 45 -61 134 -13 98 b 277 -95 119 -33 200 -81 b 289 -97 281 -97 285 -97 b 378 0 332 -97 371 -55 b 378 11 378 4 378 6 b 302 83 378 55 345 83 b 242 66 283 83 262 77 b 208 56 231 59 219 56 b 148 120 175 56 148 81 b 201 186 148 151 164 172 b 261 198 220 194 240 198 b 420 45 341 198 411 136 b 421 22 421 37 421 29 b 245 -199 421 -93 338 -199 b 238 -198 243 -199 240 -199 b -44 -47 148 -194 50 -141 b -250 86 -114 22 -183 66 b -295 94 -270 91 -283 94 b -315 91 -302 94 -307 94 b -381 4 -356 81 -381 43 b -355 -56 -381 -18 -372 -40 b -298 -81 -338 -73 -319 -81 b -246 -68 -283 -81 -265 -77 b -212 -58 -234 -61 -223 -58 b -178 -69 -200 -58 -189 -62 b -151 -122 -160 -81 -151 -101 b -171 -167 -151 -138 -157 -155 b -239 -195 -185 -181 -213 -192 b -257 -197 -245 -197 -250 -197 b -423 -5 -352 -197 -423 -109 b -412 65 -423 16 -419 40 b -262 197 -389 137 -329 188 "},v74:{x_min:-206.890625,x_max:428.75,ha:438,o:"m 389 -351 b 394 -351 390 -351 393 -351 b 428 -385 413 -351 428 -367 b 428 -394 428 -388 428 -391 b 394 -428 426 -406 421 -410 l 332 -473 l 269 -516 l 205 -560 l 141 -603 l 77 -648 l 13 -692 l -50 -737 l -114 -780 l -145 -802 b -171 -813 -157 -810 -163 -813 b -175 -813 -172 -813 -174 -813 b -206 -777 -194 -811 -206 -795 b -202 -760 -206 -771 -205 -766 b -87 -675 -197 -752 -206 -757 l -34 -639 l 83 -557 l 145 -514 l 209 -470 l 272 -427 b 389 -351 375 -356 381 -352 "},v75:{x_min:-149.71875,x_max:148.359375,ha:151,o:"m -137 381 b -130 383 -134 383 -133 383 b -111 371 -122 383 -114 378 b -55 224 -110 370 -85 305 b 0 80 -25 145 -1 80 b 54 224 0 80 24 145 b 112 377 114 384 110 373 b 127 384 118 381 122 384 b 148 362 138 384 148 374 l 148 356 l 83 183 b 16 9 47 88 17 11 b -1 0 12 2 5 0 b -14 5 -5 0 -10 1 b -84 183 -19 9 -13 -6 l -149 356 l -149 362 b -137 381 -149 371 -145 378 "},v78:{x_min:0,x_max:193.28125,ha:197,o:"m 85 514 b 95 517 88 517 89 517 b 114 505 103 517 110 513 l 115 502 l 115 376 b 115 249 115 306 115 249 b 141 258 117 249 127 252 l 167 266 l 172 266 b 190 254 181 265 187 262 l 193 251 l 193 202 l 193 188 b 187 147 193 149 191 152 b 147 130 183 142 182 141 l 115 119 l 115 9 b 115 -99 115 -51 115 -99 b 141 -91 115 -99 127 -95 b 171 -81 166 -81 167 -81 l 171 -81 b 191 -94 181 -81 189 -87 b 193 -142 191 -97 193 -120 b 191 -195 193 -167 191 -194 b 125 -227 187 -205 187 -204 l 115 -230 l 115 -366 l 115 -503 l 114 -506 b 95 -519 110 -514 102 -519 b 74 -506 87 -519 78 -514 l 73 -503 l 73 -374 b 73 -245 73 -260 73 -245 b 73 -245 73 -245 73 -245 b 55 -252 72 -245 63 -249 l 32 -260 b 19 -263 27 -262 23 -263 b 4 -256 13 -263 8 -260 b 0 -215 0 -251 0 -254 b 0 -199 0 -210 0 -206 l 0 -152 l 1 -149 b 8 -140 2 -145 5 -141 b 42 -127 9 -140 24 -133 l 73 -116 l 73 -5 b 73 23 73 4 73 15 b 73 105 73 70 73 105 b 49 97 73 105 61 101 b 17 88 32 91 23 88 b 4 95 10 88 8 91 b 0 137 0 101 0 98 b 0 151 0 141 0 145 l 0 199 l 1 202 b 43 224 5 212 5 212 l 73 234 l 73 367 l 73 502 l 74 505 b 85 514 77 509 81 513 "},v79:{x_min:-1.359375,x_max:899.703125,ha:918,o:"m 307 349 b 332 351 315 351 323 351 b 443 340 367 351 408 347 b 741 47 607 306 720 195 b 744 0 743 31 744 16 b 660 -303 744 -90 713 -206 b 28 -755 534 -531 304 -695 b 14 -756 23 -755 19 -756 b -1 -741 4 -756 -1 -750 b 21 -720 -1 -731 1 -728 b 567 -56 337 -601 548 -344 b 568 -11 568 -41 568 -24 b 442 285 568 129 525 233 b 325 319 406 308 367 319 b 93 177 232 319 137 266 b 84 154 91 170 84 155 b 84 154 84 154 84 154 b 88 156 84 154 85 155 b 159 177 110 170 134 177 b 257 134 194 177 231 162 b 294 41 281 108 294 73 b 171 -97 294 -24 246 -90 b 156 -98 166 -97 161 -98 b 6 74 73 -98 6 -22 b 6 80 6 76 6 79 b 307 349 10 223 141 340 m 839 215 b 845 216 841 216 842 216 b 862 213 852 216 860 215 b 899 163 887 206 899 184 b 872 117 899 145 890 127 b 847 111 865 112 856 111 b 808 130 833 111 818 117 b 796 162 800 140 796 151 b 839 215 796 187 812 212 m 839 -112 b 845 -112 841 -112 842 -112 b 862 -115 852 -112 860 -113 b 899 -165 887 -122 899 -144 b 872 -210 899 -183 890 -201 b 847 -217 865 -215 856 -217 b 808 -198 833 -217 818 -210 b 796 -165 800 -188 796 -177 b 839 -112 796 -140 812 -116 "},v7c:{x_min:0,x_max:300.8125,ha:307,o:"m 49 505 b 53 506 50 505 51 506 b 70 496 58 506 62 503 b 81 485 73 492 78 488 l 96 473 l 111 459 l 122 449 l 134 438 l 182 396 l 255 330 b 292 291 292 298 292 298 l 292 290 l 292 284 l 283 270 b 209 36 234 197 209 113 b 288 -170 209 -44 235 -119 b 299 -184 295 -179 299 -181 b 300 -191 300 -187 300 -188 b 285 -206 300 -199 294 -206 b 280 -206 283 -206 281 -206 b 247 -201 270 -202 259 -201 b 176 -222 223 -201 197 -208 b 114 -340 136 -249 114 -292 b 172 -471 114 -384 134 -433 b 185 -492 182 -481 185 -487 b 181 -502 185 -496 183 -499 b 171 -508 176 -505 174 -508 b 152 -498 166 -508 160 -503 b 0 -284 65 -428 12 -352 b 0 -260 0 -278 0 -270 b 1 -238 0 -252 0 -242 b 148 -140 16 -177 73 -140 b 209 -148 167 -140 189 -142 b 215 -149 212 -148 215 -149 b 215 -149 215 -149 215 -149 l 215 -149 b 201 -136 215 -148 209 -142 l 157 -97 l 96 -41 b 17 34 21 24 17 29 b 17 37 17 36 17 36 b 17 38 17 37 17 38 b 25 56 17 44 17 44 b 110 298 81 131 110 219 b 46 474 110 367 88 431 b 38 491 40 480 38 487 b 49 505 38 498 42 502 "},v7d:{x_min:-1.359375,x_max:436.921875,ha:446,o:"m 213 205 b 217 205 215 205 216 205 b 234 194 224 205 234 199 b 236 187 234 194 235 190 l 245 167 l 261 129 l 270 106 b 355 -61 294 54 329 -13 b 420 -163 381 -105 402 -138 b 436 -188 435 -184 436 -184 b 436 -191 436 -190 436 -190 b 421 -206 436 -201 431 -206 l 421 -206 l 416 -206 l 405 -201 b 217 -158 347 -172 283 -158 b 31 -201 153 -158 88 -172 l 20 -206 l 14 -206 l 14 -206 b 0 -191 5 -206 0 -201 b -1 -188 0 -190 -1 -190 b 14 -163 -1 -186 0 -184 b 95 -34 36 -136 72 -77 b 166 106 119 8 148 68 l 175 129 l 183 148 l 200 188 b 213 205 205 199 208 202 "},v7f:{x_min:0,x_max:367.5,ha:375,o:"m 0 124 l 0 187 l 61 187 l 122 187 l 122 138 l 122 91 l 153 61 l 183 30 l 213 61 l 243 91 l 243 138 l 243 187 l 306 187 l 367 187 l 367 124 l 367 61 l 321 61 l 274 61 l 243 30 l 213 0 l 243 -31 l 274 -62 l 321 -62 l 367 -62 l 367 -124 l 367 -188 l 306 -188 l 243 -188 l 243 -140 l 243 -93 l 213 -62 l 183 -31 l 153 -62 l 122 -93 l 122 -140 l 122 -188 l 61 -188 l 0 -188 l 0 -124 l 0 -62 l 46 -62 l 92 -62 l 123 -31 l 153 0 l 123 30 l 92 61 l 46 61 l 0 61 l 0 124 "},v80:{x_min:29.9375,x_max:420.578125,ha:371,o:"m 115 345 b 221 347 117 345 166 347 b 411 345 306 347 409 345 b 420 330 416 342 420 335 b 415 319 420 326 419 321 b 178 118 397 303 179 118 b 178 117 178 118 178 117 b 181 117 178 117 178 117 b 189 117 182 117 185 117 b 193 117 190 117 191 117 b 247 98 215 117 232 111 b 296 75 266 83 280 76 b 302 75 299 75 300 75 b 322 91 311 75 315 79 b 322 91 322 91 322 91 b 322 91 322 91 322 91 b 319 91 322 91 321 91 b 313 90 318 90 315 90 b 283 107 300 90 288 97 b 277 126 279 114 277 121 b 319 167 277 149 295 167 b 319 167 319 167 319 167 b 362 118 347 167 362 147 b 355 82 362 108 359 96 b 311 33 349 65 340 55 b 224 1 284 12 253 1 b 194 5 213 1 204 2 b 168 18 183 8 178 11 b 110 36 151 30 130 36 b 57 15 88 36 68 29 b 47 11 54 12 51 11 b 31 20 40 11 34 13 b 29 26 31 22 29 25 b 68 66 29 36 39 45 b 285 250 73 71 281 248 b 285 250 285 250 285 250 b 231 252 285 252 261 252 b 137 250 190 252 141 250 b 93 227 122 248 110 241 b 78 220 88 222 83 220 b 66 227 74 220 70 222 b 63 234 65 229 63 231 b 85 291 63 241 69 252 b 115 345 108 342 108 344 "},v81:{x_min:0,x_max:428.75,ha:438,o:"m 262 186 b 273 186 266 186 272 186 b 274 186 273 186 274 186 b 285 186 274 186 280 186 b 428 48 375 181 428 122 b 386 -68 428 12 416 -29 b 155 -187 329 -145 236 -187 b 12 -111 92 -187 38 -162 b 0 -51 4 -91 0 -72 b 262 186 0 58 122 179 m 366 131 b 352 134 362 133 357 134 b 219 81 321 134 269 115 b 47 -111 126 23 50 -62 b 47 -112 47 -111 47 -112 b 77 -136 47 -129 58 -136 b 264 -45 118 -136 194 -101 b 382 109 336 12 382 76 b 366 131 382 120 377 129 "},v83:{x_min:-1.359375,x_max:847.96875,ha:865,o:"m 488 1499 b 495 1500 490 1500 492 1500 b 541 1465 507 1500 521 1490 b 679 1078 622 1372 679 1210 b 677 1050 679 1068 677 1060 b 477 642 668 893 604 764 l 443 609 l 431 596 l 431 592 l 438 562 l 449 508 l 460 458 b 481 355 475 390 481 355 b 481 355 481 355 481 355 b 490 356 481 355 485 355 b 528 358 495 356 511 358 b 558 356 540 358 552 356 b 839 95 699 338 808 237 b 847 22 845 72 847 47 b 631 -303 847 -113 766 -242 b 620 -309 623 -308 620 -309 l 620 -310 b 631 -359 620 -310 626 -333 l 646 -435 l 660 -496 b 672 -588 668 -535 672 -563 b 664 -653 672 -610 669 -630 b 383 -875 630 -792 509 -875 b 201 -810 321 -875 257 -855 b 129 -680 151 -768 129 -730 b 274 -530 129 -592 200 -530 b 351 -553 300 -530 326 -538 b 412 -669 393 -582 412 -626 b 287 -805 412 -735 366 -800 l 279 -805 l 285 -809 b 383 -830 318 -823 351 -830 b 586 -718 464 -830 540 -789 b 626 -584 612 -678 626 -631 b 619 -528 626 -566 623 -548 b 612 -495 619 -526 616 -510 b 577 -324 590 -387 577 -324 b 577 -324 577 -324 577 -324 b 568 -326 575 -324 571 -324 b 528 -334 558 -328 537 -333 b 465 -338 506 -337 485 -338 b 24 -11 269 -338 87 -206 b -1 145 8 41 -1 93 b 96 442 -1 249 32 351 b 322 714 166 541 236 626 l 352 745 l 345 782 l 332 843 l 315 921 b 303 984 310 950 304 978 b 295 1082 298 1017 295 1049 b 413 1426 295 1208 336 1329 b 488 1499 436 1456 477 1496 m 549 1301 b 541 1301 547 1301 544 1301 b 411 1207 500 1301 447 1263 b 355 1004 374 1152 355 1079 b 359 942 355 984 356 963 b 371 881 362 927 363 917 l 385 818 b 392 782 389 799 392 784 l 392 782 b 434 828 393 782 424 816 b 607 1165 534 941 594 1060 b 608 1193 608 1175 608 1183 b 597 1270 608 1224 604 1254 b 549 1301 589 1286 571 1299 m 398 528 b 393 555 396 542 393 553 b 392 555 393 555 393 555 b 317 470 390 555 347 505 b 190 298 266 408 212 334 b 127 70 148 227 127 148 b 155 -77 127 19 137 -30 b 468 -303 209 -216 333 -303 b 519 -299 484 -303 502 -302 b 568 -284 541 -295 568 -287 l 568 -284 b 563 -263 568 -284 566 -274 l 534 -120 l 511 -13 l 496 61 l 480 133 b 469 187 472 176 469 187 b 468 188 469 187 469 188 b 416 162 462 188 430 172 b 337 13 364 126 337 69 b 413 -124 337 -40 363 -93 b 428 -144 424 -131 428 -137 b 428 -149 428 -145 428 -148 b 409 -166 426 -161 419 -166 b 394 -162 405 -166 400 -165 b 240 77 302 -122 240 -27 l 240 77 b 430 342 240 197 315 301 l 436 344 l 426 394 l 398 528 m 548 194 b 526 195 540 195 532 195 b 519 195 524 195 521 195 l 514 195 l 518 177 l 539 79 l 552 15 l 566 -48 l 594 -187 l 605 -240 b 612 -266 609 -254 611 -266 b 612 -266 612 -266 612 -266 b 641 -248 613 -266 630 -256 b 744 -98 692 -212 730 -156 b 751 -40 749 -79 751 -59 b 548 194 751 76 665 181 "},v84:{x_min:25.859375,x_max:164.6875,ha:168,o:"m 34 369 b 40 370 35 370 38 370 b 59 353 49 370 50 367 b 164 40 122 254 155 158 b 164 0 164 33 164 16 b 164 -40 164 -16 164 -34 b 59 -353 155 -158 122 -254 b 40 -371 53 -366 47 -371 b 34 -370 38 -371 36 -370 b 25 -358 28 -367 25 -363 b 31 -337 25 -352 27 -347 b 92 0 72 -234 92 -117 b 31 335 92 116 72 233 b 25 356 27 345 25 352 b 34 369 25 363 28 366 "},v86:{x_min:-571.671875,x_max:570.3125,ha:582,o:"m -386 173 b -381 174 -385 174 -383 174 b -370 173 -377 174 -372 173 b -281 86 -367 172 -347 151 b -196 0 -235 37 -196 0 b -126 84 -196 0 -164 37 b -50 174 -55 173 -57 172 b -44 174 -49 174 -47 174 b -35 173 -42 174 -38 173 b 53 86 -32 172 -12 151 b 138 0 100 37 138 0 b 208 84 140 0 170 37 b 284 174 279 173 277 172 b 289 174 285 174 288 174 b 299 173 294 174 298 173 b 462 11 303 172 338 134 l 475 -1 l 503 34 b 541 76 534 72 536 74 b 548 77 544 77 545 77 b 570 56 560 77 570 68 b 567 48 570 54 568 51 b 392 -172 564 41 397 -166 b 378 -176 387 -174 382 -176 b 368 -174 374 -176 371 -176 b 280 -87 367 -173 345 -152 b 194 0 234 -38 194 0 b 125 -86 194 0 163 -38 b 49 -174 54 -174 55 -173 b 43 -176 47 -176 46 -176 b 34 -174 40 -176 36 -174 b -54 -87 31 -173 10 -152 b -140 0 -102 -38 -140 0 b -209 -86 -141 0 -171 -38 b -285 -174 -280 -174 -279 -173 b -291 -176 -287 -176 -289 -176 b -300 -174 -295 -176 -299 -174 b -464 -12 -304 -173 -340 -137 l -476 0 l -504 -34 b -543 -77 -534 -73 -537 -76 b -549 -79 -545 -79 -547 -79 b -571 -58 -562 -79 -571 -69 b -568 -49 -571 -55 -570 -52 b -392 172 -566 -43 -396 167 b -386 173 -390 172 -387 173 "},v8a:{x_min:-170.140625,x_max:168.78125,ha:172,o:"m -160 567 b -122 567 -159 567 -149 567 l -87 567 l -84 566 b -74 553 -78 563 -77 560 b -20 366 -73 551 -49 466 b 31 186 8 267 31 186 b 85 371 31 186 55 269 b 140 559 114 473 138 557 b 153 567 141 564 148 567 b 168 559 159 567 166 564 b 168 555 168 557 168 557 b 92 281 168 548 159 513 b 14 13 50 134 14 13 b 0 0 14 6 6 0 b -17 15 -8 0 -17 8 b -93 283 -17 15 -51 136 b -170 552 -166 533 -170 548 b -170 553 -170 552 -170 552 b -160 567 -170 560 -167 564 "},v8b:{x_min:0,x_max:319.859375,ha:326,o:"m 149 508 b 159 509 152 509 155 509 b 186 494 170 509 181 503 b 190 440 190 487 190 488 l 190 430 l 190 377 l 242 377 l 251 377 b 303 373 298 377 296 377 b 319 345 314 367 319 356 b 304 319 319 335 314 324 b 250 315 296 315 299 315 l 242 315 l 190 315 l 190 262 l 190 252 b 186 198 190 204 190 205 b 159 183 179 188 170 183 b 132 198 148 183 138 188 b 127 252 127 205 127 204 l 127 262 l 127 315 l 76 315 l 68 315 b 14 319 20 315 21 315 b 0 347 4 324 0 335 b 14 373 0 356 4 367 b 68 377 21 377 20 377 l 76 377 l 127 377 l 127 430 l 127 440 b 132 494 127 488 127 487 b 149 508 136 501 142 505 "},v8c:{x_min:-330.75,x_max:329.390625,ha:336,o:"m -133 483 b -117 484 -127 484 -122 484 b 31 373 -51 484 9 440 b 35 348 34 365 35 356 b -25 285 35 313 10 285 b -87 331 -55 285 -76 302 b -167 402 -100 376 -133 402 b -191 398 -175 402 -183 401 b -227 341 -215 388 -227 369 b -225 320 -227 334 -227 327 b -13 74 -209 230 -125 133 b 6 65 -4 70 5 66 l 9 63 l 10 65 b 117 231 12 68 40 112 l 189 341 l 242 424 b 268 460 262 456 264 458 b 283 464 273 463 277 464 b 308 438 296 464 308 453 l 308 437 b 287 396 308 430 308 428 l 95 98 l 59 43 l 58 41 l 65 37 b 253 -156 151 -8 217 -77 b 281 -285 272 -199 281 -244 b 148 -481 281 -381 231 -463 b 115 -485 137 -484 126 -485 b -32 -376 51 -485 -9 -442 b -36 -349 -35 -366 -36 -358 b 25 -287 -36 -315 -12 -287 b 85 -333 54 -287 74 -302 b 166 -403 99 -377 133 -403 b 190 -399 174 -403 182 -402 b 225 -342 215 -390 225 -370 b 224 -322 225 -335 225 -328 b 12 -76 208 -231 125 -134 b -8 -66 2 -72 -6 -68 l -10 -65 l -12 -66 b -118 -231 -13 -68 -42 -113 l -190 -342 l -243 -426 b -269 -462 -264 -458 -265 -458 b -284 -466 -274 -464 -279 -466 b -310 -440 -298 -466 -310 -455 l -310 -438 b -288 -398 -310 -430 -308 -430 l -96 -99 l -59 -44 l -59 -43 l -66 -38 b -281 284 -198 33 -281 158 l -281 284 b -133 483 -281 392 -220 474 m 254 177 b 266 179 258 177 262 179 b 319 149 287 179 307 167 b 329 115 326 140 329 127 b 319 79 329 102 326 90 b 268 51 307 61 287 51 b 221 72 250 51 234 58 b 205 115 210 84 205 99 b 254 177 205 142 223 170 m -281 -54 b -269 -52 -277 -52 -273 -52 b -223 -73 -253 -52 -235 -59 b -206 -116 -212 -84 -206 -101 b -216 -151 -206 -129 -209 -141 b -269 -179 -228 -170 -249 -179 b -314 -159 -285 -179 -302 -173 b -330 -116 -325 -147 -330 -131 b -281 -54 -330 -88 -313 -61 "},v8f:{x_min:-21.78125,x_max:362.0625,ha:369,o:"m 302 1031 b 308 1032 304 1032 307 1032 b 330 1016 318 1032 325 1027 b 362 867 351 970 362 920 b 340 738 362 824 353 780 l 336 727 l 340 717 b 362 591 355 677 362 634 b 257 323 362 496 325 401 b 204 272 243 306 227 290 b 20 56 129 206 66 133 b -1 18 12 44 0 22 b -19 4 -4 9 -12 4 l -21 4 l -21 140 l -21 276 l -12 277 b 167 333 61 288 127 309 b 319 598 262 388 319 491 b 311 664 319 620 317 642 l 310 673 l 304 664 b 204 548 279 620 250 587 b 20 333 129 483 66 409 b -1 292 12 320 0 298 b -19 280 -4 285 -12 280 l -21 280 l -21 416 l -21 552 l -12 553 b 167 609 61 564 127 585 b 319 874 264 666 319 770 b 294 992 319 914 311 954 b 288 1011 288 1004 288 1007 b 302 1031 288 1021 294 1028 "},v90:{x_min:-171.5,x_max:483.1875,ha:493,o:"m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 495 20 616 20 616 b 20 373 20 427 20 373 b 115 410 20 373 63 390 l 210 448 l 210 531 b 212 620 210 614 210 616 b 231 632 215 628 223 632 b 246 627 236 632 242 631 b 251 541 251 620 251 628 l 251 463 l 315 489 b 387 514 368 509 381 514 b 393 513 390 514 392 514 b 406 494 402 510 406 502 b 397 476 406 487 404 480 b 323 446 396 474 363 462 l 251 417 l 251 283 l 251 148 l 254 151 b 370 199 291 183 332 199 b 415 191 385 199 400 197 b 483 84 458 176 483 134 b 461 0 483 58 476 29 b 332 -142 439 -40 411 -72 l 255 -215 b 231 -229 240 -229 239 -229 b 216 -223 224 -229 220 -227 b 210 -158 210 -217 210 -223 b 210 -120 210 -148 210 -136 l 210 -29 l 205 -34 b 100 -142 182 -65 159 -88 l 23 -215 b -1 -229 9 -229 6 -229 b -19 -217 -9 -229 -16 -224 l -20 -215 l -21 48 l -21 310 l -83 287 b -152 262 -133 266 -145 262 b -157 263 -153 262 -155 262 b -171 283 -166 266 -171 274 b -161 301 -171 290 -167 297 b -91 328 -160 302 -129 315 l -21 356 l -21 487 l -20 617 l -19 621 b -8 631 -17 626 -12 630 m 210 288 b 210 401 210 351 210 401 b 114 365 209 401 167 384 l 20 327 l 20 238 l 20 148 l 21 151 b 140 199 59 183 102 199 b 206 180 164 199 187 192 l 209 177 b 209 177 209 177 209 177 b 210 288 210 177 210 199 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 m 341 131 b 328 133 337 133 332 133 b 322 133 326 133 323 133 b 257 87 296 129 273 113 l 251 80 l 251 -37 l 251 -156 l 255 -152 b 375 81 328 -72 375 20 l 375 83 b 341 131 375 113 367 126 "},v92:{x_min:0,x_max:598.890625,ha:611,o:"m 62 181 b 77 183 66 183 72 183 b 91 181 83 183 88 183 b 202 131 100 180 106 177 l 299 87 l 394 131 b 517 183 499 181 502 183 b 519 183 517 183 518 183 b 598 104 567 183 598 144 b 577 49 598 84 592 65 b 518 15 567 38 563 37 b 484 0 499 6 484 0 b 518 -16 484 -1 499 -8 b 577 -51 563 -38 567 -40 b 598 -105 592 -66 598 -86 b 519 -184 598 -145 567 -184 b 517 -184 518 -184 517 -184 b 394 -133 502 -184 499 -183 l 299 -88 l 202 -133 b 81 -184 99 -183 95 -184 b 77 -184 80 -184 78 -184 b 0 -105 29 -184 0 -145 b 20 -51 0 -86 5 -66 b 80 -16 29 -40 34 -38 b 114 -1 98 -8 114 -1 b 80 15 114 0 98 6 b 20 49 34 37 29 38 b 0 104 6 65 0 84 b 62 181 0 140 23 174 m 88 134 b 74 136 85 134 80 136 b 68 134 72 136 69 136 b 46 104 54 130 46 117 b 55 81 46 95 49 88 b 149 34 59 76 53 80 b 224 -1 190 15 224 0 b 144 -38 224 -1 187 -18 b 54 -84 59 -79 58 -79 b 46 -105 49 -90 46 -98 b 76 -137 46 -122 58 -137 b 78 -137 77 -137 77 -137 b 194 -86 87 -137 76 -141 b 298 -36 250 -58 298 -36 b 298 -36 298 -36 298 -36 b 402 -84 299 -36 345 -58 b 518 -137 522 -141 510 -137 b 521 -137 519 -137 519 -137 b 551 -105 539 -137 551 -122 b 541 -83 551 -98 548 -90 b 447 -36 537 -77 544 -81 b 374 -1 406 -16 374 -1 b 447 34 374 0 406 15 b 541 81 544 80 537 76 b 551 104 548 88 551 97 b 521 136 551 120 539 136 b 518 136 519 136 519 136 b 517 136 518 136 517 136 l 517 136 b 402 83 511 136 511 136 b 298 34 345 56 299 34 b 298 34 298 34 298 34 b 194 84 298 34 250 56 b 88 134 137 111 89 133 "},v93:{x_min:0,x_max:438.28125,ha:447,o:"m 212 205 b 219 205 213 205 216 205 b 239 183 228 205 231 204 b 421 -163 298 40 363 -83 b 438 -191 434 -180 438 -186 b 436 -197 438 -192 438 -195 b 424 -206 434 -204 431 -206 b 406 -201 420 -206 415 -205 b 216 -156 347 -172 281 -156 b 23 -205 148 -156 80 -173 b 14 -206 20 -206 17 -206 b 0 -191 6 -206 0 -201 b 6 -176 0 -187 1 -183 b 202 192 63 -104 142 45 b 212 205 205 199 208 202 m 264 48 l 249 81 l 243 94 l 242 91 b 89 -126 208 36 137 -66 b 81 -138 85 -133 81 -138 b 81 -138 81 -138 81 -138 b 81 -138 81 -138 81 -138 b 95 -133 81 -138 87 -136 b 280 -94 156 -108 221 -94 b 334 -98 299 -94 317 -95 b 343 -99 338 -99 343 -99 b 343 -99 343 -99 343 -99 b 338 -94 343 -99 341 -97 b 264 48 318 -58 287 1 "},v94:{x_min:-149.71875,x_max:148.359375,ha:151,o:"m -9 215 b 0 217 -6 217 -4 217 b 19 205 8 217 14 213 b 20 142 20 202 20 201 l 20 84 l 23 84 b 144 -27 81 74 129 30 b 148 -66 147 -40 148 -54 b 36 -213 148 -134 103 -197 b 0 -219 24 -217 12 -219 b -145 -104 -68 -219 -129 -173 b -149 -68 -148 -91 -149 -79 b -24 84 -149 6 -98 74 l -21 84 l -21 142 b -19 205 -20 201 -20 202 b -9 215 -17 209 -13 213 m -21 -15 b -23 41 -21 37 -21 41 b -23 41 -23 41 -23 41 b -76 11 -35 40 -62 26 b -108 -65 -98 -11 -108 -38 b -1 -176 -108 -122 -65 -176 b 107 -65 63 -176 107 -122 b 74 11 107 -38 96 -11 b 20 41 61 26 32 41 b 20 -15 20 41 20 15 b 19 -74 20 -72 20 -72 b 0 -87 14 -83 6 -87 b -19 -74 -8 -87 -16 -83 b -21 -15 -20 -72 -20 -72 "},v95:{x_min:0,x_max:406.96875,ha:415,o:"m 55 181 b 70 183 61 183 66 183 b 111 170 85 183 99 179 b 160 130 115 167 137 149 l 202 95 l 245 130 b 319 181 299 176 302 179 b 334 183 325 183 330 183 b 406 109 375 183 406 148 b 401 81 406 99 405 91 b 348 24 394 65 390 59 b 318 -1 332 11 318 0 b 348 -26 318 -1 332 -12 b 401 -83 390 -61 394 -66 b 406 -111 405 -93 406 -101 b 334 -184 406 -149 375 -184 b 319 -183 330 -184 325 -184 b 245 -131 302 -180 299 -177 l 202 -97 l 160 -131 b 85 -183 107 -177 103 -180 b 70 -184 80 -184 76 -184 b 0 -111 31 -184 0 -149 b 4 -83 0 -101 1 -93 b 58 -26 10 -66 16 -61 b 88 -1 74 -12 88 -1 b 58 24 88 0 74 11 b 10 69 23 54 17 59 b 0 109 2 81 0 95 b 55 181 0 142 21 173 m 83 133 b 72 136 78 136 76 136 b 57 131 66 136 61 134 b 46 109 49 126 46 117 b 50 93 46 104 47 98 b 107 45 51 91 77 70 b 160 0 137 20 160 0 b 107 -47 160 -1 137 -22 b 50 -94 77 -72 51 -93 b 46 -111 47 -99 46 -105 b 59 -134 46 -120 50 -130 b 72 -137 62 -136 68 -137 b 83 -136 76 -137 80 -136 b 144 -84 84 -134 107 -116 b 202 -36 176 -58 202 -36 b 261 -84 202 -36 230 -58 b 323 -136 299 -116 321 -134 b 334 -137 326 -136 330 -137 b 345 -134 338 -137 343 -136 b 360 -111 355 -130 360 -120 b 355 -94 360 -105 359 -99 b 299 -47 353 -93 329 -72 b 245 0 269 -22 245 -1 b 299 45 245 0 269 20 b 355 93 329 70 353 91 b 360 109 359 98 360 104 b 345 133 360 119 355 129 b 334 136 343 134 338 136 b 323 134 330 136 326 134 b 261 83 321 133 299 115 b 202 34 230 56 202 34 b 144 83 202 34 176 56 b 83 133 106 115 84 133 "},v97:{x_min:-228.671875,x_max:227.3125,ha:232,o:"m -217 487 l -213 488 l 0 488 l 212 488 l 216 487 b 225 476 220 484 224 480 l 227 473 l 227 244 l 227 15 l 225 12 b 206 0 223 4 215 0 b 197 1 204 0 200 0 b 187 12 193 4 189 6 l 186 15 l 186 138 l 186 262 l -1 262 l -187 262 l -187 138 l -187 15 l -189 12 b -208 0 -193 4 -200 0 b -227 12 -216 0 -223 4 l -228 15 l -228 244 l -228 473 l -227 476 b -217 487 -225 480 -221 484 "},v9a:{x_min:-21.78125,x_max:367.5,ha:375,o:"m 230 1031 b 238 1032 232 1032 235 1032 b 259 1014 245 1032 251 1027 b 367 662 330 906 367 782 b 364 602 367 641 367 621 b 232 317 352 488 304 384 b 57 120 155 245 103 187 b -1 18 31 84 6 40 b -19 4 -4 11 -12 4 l -21 4 l -21 159 l -21 315 l -16 315 b 96 335 10 315 62 324 b 315 695 227 380 315 527 b 313 738 315 709 314 724 b 224 991 304 825 273 916 b 216 1013 219 999 216 1007 b 230 1031 216 1021 220 1028 "},v9b:{x_min:-24.5,x_max:313.0625,ha:319,o:"m -24 -133 l -24 -5 l -20 -5 b -1 -19 -12 -5 -4 -11 b 142 -213 13 -61 74 -144 b 258 -376 196 -269 230 -315 b 313 -605 295 -449 313 -528 b 292 -742 313 -652 306 -699 b 288 -752 289 -748 288 -752 b 288 -752 288 -752 288 -752 b 292 -764 289 -753 291 -757 b 313 -907 306 -811 313 -860 b 292 -1045 313 -954 306 -1002 b 288 -1054 289 -1050 288 -1054 b 288 -1054 288 -1054 288 -1054 b 292 -1067 289 -1054 291 -1060 b 313 -1210 306 -1113 313 -1161 b 292 -1346 313 -1257 306 -1304 b 288 -1357 289 -1353 288 -1357 b 288 -1357 288 -1357 288 -1357 b 292 -1368 289 -1357 291 -1363 b 313 -1512 306 -1415 313 -1464 b 292 -1648 313 -1560 306 -1605 b 288 -1660 289 -1654 288 -1660 b 288 -1660 288 -1660 288 -1660 b 292 -1671 289 -1660 291 -1665 b 313 -1814 306 -1719 313 -1766 b 250 -2040 313 -1897 291 -1977 b 232 -2062 238 -2057 236 -2059 b 221 -2065 230 -2063 225 -2065 b 200 -2045 210 -2065 201 -2057 b 200 -2043 200 -2044 200 -2044 b 208 -2026 200 -2037 202 -2034 b 269 -1826 249 -1966 269 -1897 b 153 -1544 269 -1726 230 -1625 b -9 -1472 115 -1506 58 -1481 b -21 -1471 -14 -1471 -19 -1471 l -24 -1471 l -24 -1343 l -24 -1215 l -20 -1215 b -1 -1229 -12 -1215 -4 -1221 b 142 -1424 13 -1270 74 -1353 b 257 -1582 196 -1478 228 -1524 b 264 -1594 261 -1589 264 -1594 l 264 -1594 b 265 -1582 264 -1594 264 -1589 b 270 -1525 268 -1562 270 -1544 b 153 -1243 270 -1424 228 -1321 b -9 -1170 115 -1203 58 -1178 b -21 -1168 -14 -1170 -19 -1168 l -24 -1168 l -24 -1041 l -24 -913 l -20 -913 b -1 -927 -12 -913 -4 -918 b 142 -1121 13 -967 74 -1050 b 257 -1281 196 -1175 228 -1221 b 264 -1292 261 -1286 264 -1292 l 264 -1292 b 265 -1279 264 -1292 264 -1286 b 270 -1222 268 -1261 270 -1242 b 153 -941 270 -1121 228 -1018 b -9 -867 115 -900 58 -875 b -21 -866 -14 -867 -19 -866 l -24 -866 l -24 -738 l -24 -610 l -20 -610 b -1 -624 -12 -610 -4 -616 b 142 -818 13 -664 74 -749 b 257 -978 196 -873 228 -918 b 264 -989 261 -984 264 -989 l 264 -989 b 265 -977 264 -989 264 -984 b 270 -920 268 -959 270 -939 b 153 -638 270 -818 228 -716 b -9 -564 115 -598 58 -573 b -21 -563 -14 -564 -19 -563 l -24 -563 l -24 -435 l -24 -308 l -20 -308 b -1 -322 -12 -308 -4 -313 b 142 -516 13 -363 74 -446 b 257 -675 196 -571 228 -616 b 264 -687 261 -681 264 -687 l 264 -687 b 265 -674 264 -687 264 -681 b 270 -617 268 -656 270 -637 b 153 -335 270 -516 228 -413 b -9 -262 115 -295 58 -270 b -21 -260 -14 -262 -19 -260 l -24 -260 l -24 -133 "},v9c:{x_min:-166.0625,x_max:-25.859375,ha:0,o:"m -49 369 b -42 370 -46 369 -44 370 b -27 360 -36 370 -29 366 b -25 355 -27 359 -25 358 b -32 335 -25 351 -28 347 b -92 52 -66 248 -87 159 b -93 -1 -93 43 -93 20 b -92 -54 -93 -23 -93 -45 b -32 -337 -85 -162 -66 -251 b -25 -355 -27 -349 -25 -352 b -42 -371 -25 -365 -32 -371 b -61 -353 -50 -371 -51 -369 b -163 -63 -119 -262 -153 -165 b -166 -1 -166 -37 -166 -31 b -163 62 -166 30 -166 36 b -61 352 -153 163 -119 260 b -49 369 -54 365 -51 366 "},v9e:{x_min:0,x_max:607.0625,ha:619,o:"m 243 631 b 250 632 246 632 249 632 b 270 620 259 632 268 628 l 272 616 l 272 201 l 272 -212 l 270 -216 b 251 -229 268 -224 259 -229 b 227 -215 243 -229 240 -229 l 151 -142 b 32 -16 81 -80 53 -49 b 0 84 9 18 0 52 b 111 199 0 149 42 199 b 137 197 119 199 127 198 b 228 151 168 191 197 177 l 231 148 l 231 383 b 232 620 231 616 231 616 b 243 631 234 624 238 630 m 168 131 b 152 133 163 133 157 133 b 107 102 130 133 111 120 b 106 86 107 97 106 91 b 111 41 106 73 108 56 b 227 -152 125 -13 171 -90 l 231 -156 l 231 -37 l 231 80 l 225 87 b 168 131 210 111 190 126 m 347 631 b 353 632 348 632 351 632 b 374 620 363 632 371 628 b 375 383 375 616 375 616 l 375 148 l 377 151 b 492 199 415 183 454 199 b 537 191 507 199 522 197 b 607 84 582 176 607 134 b 583 0 607 58 598 29 b 455 -142 562 -40 533 -72 l 378 -215 b 355 -229 364 -229 362 -229 b 334 -216 345 -229 337 -224 l 333 -212 l 333 201 l 333 616 l 334 620 b 347 631 337 624 341 630 m 465 131 b 451 133 461 133 455 133 b 445 133 449 133 446 133 b 379 87 419 129 396 113 l 375 80 l 375 -37 l 375 -156 l 378 -152 b 499 81 451 -72 499 20 l 499 83 b 465 131 499 113 490 126 "},va3:{x_min:58.53125,x_max:228.671875,ha:294,o:"m 138 371 b 142 373 140 371 141 373 b 178 342 149 373 156 366 b 228 251 217 297 228 278 b 228 244 228 248 228 247 b 176 147 227 212 212 184 b 123 73 152 122 132 93 b 121 62 122 70 121 66 b 145 13 121 48 129 31 b 153 -2 151 6 153 1 b 149 -9 153 -5 152 -6 b 144 -11 148 -11 145 -11 b 129 -1 140 -11 136 -8 b 61 87 89 37 68 68 b 58 113 59 95 58 105 b 110 215 58 144 74 177 b 163 287 134 240 155 269 b 166 299 166 291 166 295 b 141 348 166 313 157 330 b 133 360 134 356 133 358 b 133 363 133 362 133 362 b 138 371 133 367 136 370 "},va5:{x_min:0,x_max:349.8125,ha:357,o:"m 88 302 b 103 303 93 302 98 303 b 202 224 149 303 191 270 b 205 199 204 216 205 208 b 178 129 205 173 196 147 l 175 126 l 182 127 b 307 249 236 142 284 190 b 313 259 308 254 311 258 b 329 267 317 265 323 267 b 349 247 340 267 349 259 b 201 -263 349 242 204 -258 b 182 -273 197 -270 190 -273 b 163 -260 174 -273 166 -269 b 161 -256 161 -259 161 -258 b 217 -59 161 -248 170 -220 b 272 129 247 43 272 127 b 272 129 272 129 272 129 b 264 122 272 129 268 126 b 140 80 227 94 183 80 b 36 115 102 80 65 91 b 0 194 10 136 0 165 b 88 302 0 244 32 292 "},va9:{x_min:-24.5,x_max:314.421875,ha:321,o:"m -24 -145 l -24 -5 l -20 -5 b 0 -23 -9 -5 -2 -12 b 27 -87 4 -38 14 -66 b 138 -220 53 -136 88 -177 b 235 -328 179 -255 208 -288 b 314 -592 287 -409 314 -501 b 292 -732 314 -639 307 -687 l 289 -742 l 294 -756 b 314 -896 307 -802 314 -849 b 292 -1035 314 -943 307 -991 l 289 -1045 l 294 -1057 b 314 -1197 307 -1104 314 -1152 b 292 -1338 314 -1246 307 -1292 l 289 -1347 l 294 -1360 b 314 -1500 307 -1407 314 -1454 b 273 -1689 314 -1565 300 -1628 b 250 -1712 265 -1710 261 -1712 b 228 -1691 236 -1712 228 -1704 l 228 -1685 l 234 -1675 b 270 -1507 258 -1621 270 -1564 b 98 -1193 270 -1381 209 -1261 b 40 -1174 76 -1179 58 -1174 b -10 -1189 24 -1174 8 -1178 b -20 -1192 -14 -1192 -16 -1192 l -24 -1192 l -24 -1052 l -24 -913 l -20 -913 b 0 -931 -9 -913 -2 -920 b 27 -995 4 -946 14 -974 b 138 -1128 53 -1043 88 -1085 b 257 -1275 190 -1172 228 -1220 b 262 -1283 259 -1279 262 -1283 l 262 -1283 b 269 -1249 264 -1282 268 -1260 b 270 -1206 270 -1233 270 -1220 b 98 -891 270 -1075 206 -957 b 40 -871 76 -877 58 -871 b -10 -886 24 -871 8 -875 b -20 -889 -14 -889 -16 -889 l -24 -889 l -24 -749 l -24 -610 l -20 -610 b 0 -628 -9 -610 -2 -617 b 27 -692 4 -644 14 -671 b 138 -825 53 -741 88 -782 b 257 -973 190 -870 228 -917 b 262 -981 259 -977 262 -981 l 262 -981 b 269 -946 264 -979 268 -957 b 270 -903 270 -931 270 -917 b 98 -588 270 -774 206 -655 b 40 -569 76 -574 58 -569 b -10 -584 24 -569 8 -574 b -20 -587 -14 -587 -16 -587 l -24 -587 l -24 -448 l -24 -308 l -20 -308 b 0 -326 -9 -308 -2 -315 b 27 -390 4 -341 14 -369 b 138 -523 53 -438 88 -480 b 257 -670 190 -567 228 -614 b 262 -678 259 -674 262 -678 b 262 -678 262 -678 262 -678 b 269 -644 264 -677 268 -656 b 270 -601 270 -628 270 -614 b 98 -285 270 -471 206 -352 b 40 -266 76 -273 58 -266 b -10 -281 24 -266 8 -272 b -20 -284 -14 -284 -16 -284 l -24 -284 l -24 -145 "},vaa:{x_min:-1.359375,x_max:752.703125,ha:768,o:"m 490 985 b 504 986 495 986 500 986 b 604 907 551 986 593 954 b 607 884 607 900 607 892 b 581 813 607 857 597 831 l 578 810 l 583 811 b 710 932 638 827 687 873 b 714 943 711 936 713 942 b 730 952 720 949 725 952 b 752 931 741 952 752 943 b 200 -946 752 927 204 -941 b 182 -957 197 -953 190 -957 b 163 -945 174 -957 166 -953 b 161 -939 161 -942 161 -942 b 217 -743 161 -931 170 -904 b 272 -555 247 -639 272 -555 b 272 -555 272 -555 272 -555 b 264 -560 272 -555 268 -557 b 140 -603 227 -589 182 -603 b 36 -567 102 -603 65 -592 b -1 -487 12 -548 -1 -517 b 17 -427 -1 -466 5 -445 b 103 -380 38 -395 70 -380 b 191 -433 137 -380 172 -398 b 205 -484 201 -448 205 -466 b 178 -553 205 -509 196 -535 l 175 -557 l 182 -555 b 307 -435 236 -539 284 -494 b 372 -213 308 -430 372 -215 b 372 -213 372 -213 372 -213 b 364 -219 372 -213 368 -216 b 240 -262 328 -247 283 -262 b 137 -226 202 -262 166 -249 b 99 -145 112 -206 99 -176 b 118 -84 99 -124 106 -104 b 204 -38 138 -54 171 -38 b 292 -91 238 -38 273 -56 b 306 -141 302 -106 306 -124 b 279 -212 306 -167 296 -194 l 276 -215 l 281 -213 b 408 -93 336 -198 385 -151 b 473 129 409 -88 473 127 b 473 129 473 129 473 129 b 465 122 473 129 469 126 b 341 80 428 94 383 80 b 236 115 303 80 266 91 b 200 195 213 136 200 165 b 217 256 200 217 206 238 b 304 303 239 287 272 303 b 393 249 338 303 374 285 b 406 199 402 234 406 217 b 379 129 406 173 397 148 l 377 126 l 382 127 b 509 248 436 142 485 190 b 574 470 510 254 574 469 b 574 470 574 470 574 470 b 566 464 574 470 570 467 b 442 421 529 435 484 421 b 337 458 404 421 367 433 b 300 538 314 477 300 508 b 318 598 300 559 306 580 b 404 645 340 630 372 645 b 494 592 439 645 475 627 b 507 541 502 577 507 559 b 480 471 507 516 498 489 l 477 467 l 483 470 b 608 589 537 485 586 531 b 675 811 611 595 675 810 b 675 811 675 811 675 811 b 666 806 675 811 671 809 b 543 763 628 777 585 763 b 438 799 504 763 468 775 b 401 878 412 820 401 849 b 490 985 401 928 434 977 "},vab:{x_min:0,x_max:272.21875,ha:278,o:"m 243 631 b 250 632 246 632 249 632 b 270 620 259 632 268 628 l 272 616 l 272 201 l 272 -212 l 270 -216 b 251 -229 268 -224 259 -229 b 227 -215 243 -229 240 -229 l 151 -142 b 32 -16 81 -80 53 -49 b 0 84 9 18 0 52 b 111 199 0 149 42 199 b 137 197 119 199 127 198 b 228 151 168 191 197 177 l 231 148 l 231 383 b 232 620 231 616 231 616 b 243 631 234 624 238 630 m 168 131 b 152 133 163 133 157 133 b 107 102 130 133 111 120 b 106 86 107 97 106 91 b 111 41 106 73 108 56 b 227 -152 125 -13 171 -90 l 231 -156 l 231 -37 l 231 80 l 225 87 b 168 131 210 111 190 126 "},vad:{x_min:0,x_max:873.828125,ha:892,o:"m 0 0 l 0 703 l 81 703 l 164 703 l 164 0 l 164 -705 l 81 -705 l 0 -705 l 0 0 m 225 0 l 225 703 l 246 703 l 268 703 l 268 366 l 268 30 l 274 36 b 314 79 284 44 302 63 b 413 302 357 137 392 213 b 432 327 419 324 421 327 b 449 306 443 327 447 322 b 611 115 457 195 529 115 b 651 122 624 115 638 117 b 728 316 705 140 724 188 b 729 388 728 342 729 366 b 671 635 729 533 711 602 b 581 662 649 652 616 662 b 477 637 545 662 510 653 l 475 635 l 477 634 b 503 627 488 632 495 631 b 545 556 532 612 545 584 b 491 480 545 524 526 491 b 465 474 481 476 473 474 b 379 563 417 474 379 516 b 389 602 379 576 382 588 b 541 691 409 641 479 681 b 582 694 555 692 568 694 b 865 462 714 694 834 598 b 873 392 871 440 873 416 b 865 317 873 367 871 341 b 639 84 839 194 748 101 b 612 83 630 83 620 83 b 511 116 577 83 543 94 b 504 120 509 119 506 120 b 504 120 504 120 504 120 b 469 59 504 120 488 93 l 432 -1 l 469 -61 b 504 -122 488 -94 504 -122 b 504 -122 504 -122 504 -122 b 511 -117 506 -122 509 -120 b 612 -84 543 -95 577 -84 b 665 -91 630 -84 647 -87 b 869 -338 771 -122 850 -216 b 873 -392 872 -356 873 -374 b 798 -595 873 -469 847 -539 b 581 -695 741 -662 660 -695 b 406 -626 517 -695 454 -671 b 381 -563 389 -607 381 -585 b 465 -477 381 -519 413 -477 b 545 -559 514 -477 545 -519 b 503 -628 545 -587 532 -613 b 477 -635 495 -632 488 -634 l 475 -637 l 477 -638 b 581 -663 510 -655 545 -663 b 671 -637 616 -663 649 -653 b 729 -391 711 -603 729 -534 b 728 -317 729 -367 728 -344 b 623 -117 722 -173 698 -124 b 611 -116 619 -116 615 -116 b 449 -308 528 -116 457 -198 b 432 -328 447 -323 443 -328 b 413 -303 421 -328 419 -326 b 314 -80 392 -215 357 -138 b 274 -37 302 -65 284 -45 l 268 -31 l 268 -367 l 268 -705 l 246 -705 l 225 -705 l 225 0 "},vb1:{x_min:78.9375,x_max:485.921875,ha:417,o:"m 362 378 b 378 380 367 380 372 380 b 472 348 415 380 453 367 b 485 315 481 338 485 327 b 462 273 485 298 477 281 b 439 267 454 269 446 267 b 398 290 424 267 409 274 b 344 319 385 309 364 319 b 281 269 315 319 289 301 b 279 262 280 266 279 262 b 276 256 279 260 277 258 b 274 249 276 254 274 251 b 238 127 273 248 257 192 b 201 4 217 61 201 5 b 166 -1 198 -1 200 -1 b 153 -1 163 -1 157 -1 b 141 -1 148 -1 144 -1 b 104 4 106 -1 107 -1 b 104 6 104 5 104 5 b 142 144 104 13 110 34 b 182 278 164 219 181 276 b 183 288 182 281 182 285 b 185 302 185 292 185 298 b 164 330 185 317 176 328 b 159 330 163 330 161 330 b 102 302 140 330 119 320 b 91 294 95 295 93 294 b 88 294 91 294 89 294 b 78 303 83 294 78 298 b 81 312 78 306 78 309 b 200 373 106 347 160 373 b 215 371 205 373 209 371 b 266 335 235 367 254 353 b 269 331 268 333 269 331 b 269 331 269 331 269 331 b 273 335 269 331 270 334 b 362 378 298 359 330 376 "},vb3:{x_min:0,x_max:227.3125,ha:232,o:"m 91 213 b 100 215 93 215 96 215 b 227 58 167 215 224 144 b 227 52 227 56 227 54 b 61 -201 227 -43 164 -138 b 29 -216 44 -212 36 -216 b 23 -210 27 -216 24 -213 b 21 -205 21 -208 21 -206 b 34 -192 21 -201 25 -197 b 122 -55 89 -161 122 -106 b 104 6 122 -33 117 -12 l 103 9 l 96 9 b 4 79 57 9 17 38 b 0 112 1 90 0 101 b 91 213 0 163 36 209 "},vb4:{x_min:-597.53125,x_max:596.171875,ha:608,o:"m -533 324 b -525 327 -530 326 -528 327 b -504 305 -514 327 -504 317 b -504 305 -504 305 -504 305 b -513 284 -504 299 -504 299 b -556 112 -541 226 -556 167 b -545 33 -556 84 -552 58 b -524 -20 -541 15 -532 -9 l -522 -23 l -491 15 l -413 111 b -355 174 -367 169 -363 174 b -351 174 -353 174 -352 174 b -254 86 -343 174 -348 179 b -168 -1 -208 37 -168 -1 b -100 84 -168 -1 -137 37 b -23 173 -28 173 -29 172 b -19 174 -21 174 -20 174 b -8 173 -14 174 -10 173 b 80 86 -5 172 13 151 b 166 -1 127 37 166 -1 b 235 84 166 -1 197 37 b 311 173 306 173 304 172 b 317 174 313 174 314 174 b 326 173 319 174 323 173 b 490 11 329 172 366 134 l 502 -1 l 530 34 b 568 76 560 72 563 74 b 575 77 570 77 573 77 b 596 56 586 77 596 68 b 594 48 596 54 596 51 b 417 -172 592 41 424 -166 b 405 -176 415 -174 409 -176 b 396 -174 401 -176 398 -176 b 307 -87 393 -173 372 -152 b 221 -1 259 -38 221 -1 b 152 -86 221 -1 190 -38 b 76 -176 81 -174 83 -173 b 70 -176 74 -176 73 -176 b 61 -174 66 -176 62 -174 b -27 -87 58 -173 38 -152 b -114 -1 -74 -38 -112 -1 b -182 -86 -114 -1 -145 -38 b -258 -176 -253 -174 -253 -173 b -264 -176 -259 -176 -262 -176 b -274 -174 -268 -176 -272 -174 b -438 -11 -277 -173 -348 -102 l -449 0 l -479 -37 b -524 -80 -513 -80 -514 -80 l -524 -80 b -553 -52 -534 -80 -540 -74 b -597 109 -583 -8 -597 48 b -560 280 -597 165 -585 224 b -533 324 -548 310 -540 322 "},vb6:{x_min:0,x_max:556.6875,ha:568,o:"m 289 545 b 298 546 292 545 295 546 b 318 533 306 546 315 541 b 319 428 319 530 319 528 l 319 327 l 334 327 b 526 223 412 326 485 285 b 543 172 537 206 543 190 b 447 76 543 122 503 76 b 445 76 446 76 446 76 b 359 165 394 77 359 119 b 368 205 359 179 362 192 b 441 251 382 233 412 251 b 455 249 446 251 451 251 b 460 248 458 249 460 248 b 460 248 460 248 460 248 b 454 254 460 249 458 251 b 334 295 419 280 378 294 l 319 295 l 319 4 l 319 -287 l 321 -285 b 328 -285 322 -285 325 -285 b 524 -99 424 -277 507 -198 b 541 -79 526 -84 530 -79 b 556 -97 551 -79 556 -84 b 548 -133 556 -105 553 -117 b 334 -317 521 -233 434 -306 b 322 -319 329 -317 323 -317 l 319 -319 l 319 -424 b 319 -471 319 -444 319 -459 b 313 -541 319 -544 318 -535 b 298 -548 308 -545 303 -548 b 279 -534 289 -548 281 -542 b 277 -424 277 -531 277 -530 l 277 -317 l 273 -317 b 13 -95 153 -305 51 -217 b 0 2 4 -62 0 -29 b 182 295 0 126 66 238 b 274 324 210 309 249 320 l 277 324 l 277 427 b 279 533 277 528 277 530 b 289 545 281 538 285 542 m 277 2 b 277 291 277 161 277 291 b 268 288 277 291 273 290 b 144 1 179 265 144 184 b 276 -284 144 -199 175 -267 l 277 -285 l 277 2 "},vb9:{x_min:-122.5,x_max:121.140625,ha:124,o:"m -16 145 b 0 147 -10 147 -5 147 b 121 -1 66 147 121 77 b 114 -49 121 -16 118 -33 b -1 -148 95 -112 47 -148 b -85 -106 -31 -148 -61 -134 b -122 -1 -110 -76 -122 -38 b -16 145 -122 68 -81 134 m 12 111 b 0 113 8 113 4 113 b -68 22 -29 113 -61 73 b -70 0 -69 15 -70 6 b -13 -113 -70 -49 -47 -98 b -1 -115 -9 -115 -5 -115 b 63 -40 24 -115 53 -83 b 68 -1 66 -27 68 -15 b 12 111 68 48 46 97 "},vba:{x_min:-118.421875,x_max:597.53125,ha:381,o:"m 460 574 b 464 574 461 574 462 574 b 488 574 470 574 481 574 b 500 573 491 574 498 574 b 594 503 543 570 588 538 b 597 488 596 498 597 494 b 528 417 597 449 564 417 b 502 423 519 417 510 419 b 465 481 477 434 465 458 b 488 528 465 499 472 516 b 490 530 490 530 490 530 b 490 530 490 530 490 530 b 468 517 488 530 475 523 b 349 340 419 485 377 420 b 347 330 348 334 347 330 b 383 328 347 328 363 328 b 428 326 423 328 424 328 b 442 302 438 320 442 312 b 430 281 442 294 438 285 b 385 276 424 277 426 276 l 377 276 l 332 276 l 330 269 b 178 -117 303 126 250 -9 b 1 -249 129 -194 69 -237 b -20 -251 -6 -251 -13 -251 b -114 -187 -65 -251 -100 -227 b -118 -156 -117 -177 -118 -166 b -51 -84 -118 -116 -91 -84 b -31 -87 -46 -84 -39 -86 b 16 -152 0 -95 16 -124 b -12 -205 16 -173 8 -194 b -16 -208 -14 -206 -16 -208 b -14 -208 -16 -208 -14 -208 b -9 -206 -14 -208 -12 -208 b 74 -124 23 -197 54 -166 b 172 224 98 -79 125 22 b 185 276 178 252 183 274 b 185 276 185 276 185 276 b 141 276 185 276 181 276 b 91 280 96 276 96 276 b 77 302 83 285 77 294 b 91 326 77 312 83 320 b 148 328 95 328 96 328 l 198 330 l 202 341 b 460 574 249 473 351 566 "},vbf:{x_min:-53.078125,x_max:513.140625,ha:485,o:"m 185 383 b 196 384 187 383 191 384 b 277 334 230 384 259 365 b 288 301 281 324 288 306 b 288 297 288 298 288 297 b 294 302 289 297 291 299 b 394 370 323 338 367 367 b 404 371 398 370 401 371 b 510 272 453 371 498 328 b 513 237 513 262 513 251 b 507 172 513 217 511 192 b 326 -34 487 59 412 -26 b 314 -36 322 -36 318 -36 b 274 -24 298 -36 283 -31 l 265 -16 b 224 44 246 -1 232 20 b 223 49 224 47 223 49 b 223 49 223 49 223 49 b 149 -197 221 48 149 -194 b 149 -198 149 -197 149 -198 b 170 -210 149 -202 155 -205 b 187 -215 174 -210 175 -212 b 204 -231 201 -219 204 -222 b 197 -245 204 -240 202 -242 l 194 -248 l 76 -248 l -42 -248 l -46 -245 b -53 -231 -51 -242 -53 -240 b -35 -215 -53 -222 -49 -217 b -13 -210 -21 -212 -20 -212 b -6 -208 -10 -209 -8 -208 b 0 -206 -6 -208 -2 -206 b 25 -188 13 -201 21 -195 b 163 280 28 -183 163 276 b 166 291 163 283 164 287 b 167 302 167 295 167 299 b 155 324 167 315 161 324 b 155 324 155 324 155 324 b 65 230 125 322 85 280 b 53 215 61 217 58 215 b 51 215 53 215 51 215 b 42 224 46 215 42 217 b 57 263 42 231 47 244 b 140 360 77 305 104 337 b 152 370 144 365 149 369 b 185 383 157 376 172 381 m 374 306 b 366 308 371 308 368 308 b 300 273 348 308 321 294 b 284 254 288 262 287 259 b 280 242 283 249 281 245 b 257 169 279 240 270 213 l 236 98 l 236 93 b 251 48 238 77 243 61 b 279 27 258 37 272 27 b 281 27 279 27 280 27 b 291 31 281 27 287 30 b 396 170 334 52 378 109 b 406 247 402 197 406 224 b 401 277 406 259 405 270 b 374 306 397 290 383 303 "},vc3:{x_min:-10.890625,x_max:299.4375,ha:294,o:"m 136 460 b 142 462 137 462 140 462 b 166 449 152 462 161 456 b 171 428 168 446 168 445 b 288 131 194 322 238 209 b 298 115 295 120 296 117 b 299 106 298 112 299 109 b 273 81 299 91 287 81 b 255 86 268 81 261 83 b 155 116 225 104 183 116 l 152 116 l 149 108 b 141 83 148 102 144 91 b 134 48 137 69 134 58 b 149 9 134 34 140 24 b 153 -1 152 5 153 1 b 149 -9 153 -5 152 -6 b 144 -11 148 -11 147 -11 b 122 2 138 -11 133 -6 b 95 61 104 20 95 38 b 107 108 95 74 99 90 b 108 113 107 111 108 112 b 107 113 108 113 108 113 b 102 113 106 113 104 113 b 31 86 76 108 53 98 b 14 80 24 81 20 80 b -10 106 0 80 -10 91 b 0 131 -10 115 -9 116 b 115 430 49 209 91 317 b 136 460 119 451 123 456 "}},cssFontWeight:"normal",ascender:1903,underlinePosition:-125,cssFontStyle:"normal",boundingBox:{yMin:-2065.375,xMin:-695.53125,yMax:1901.578125,xMax:1159.671875},resolution:1e3,descender:-2066,familyName:"VexFlow-18",lineHeight:4093,underlineThickness:50},Vex.Flow.renderGlyph=function(a,b,c,d,e,f){var g=72*d/(100*Vex.Flow.Font.resolution),h=Vex.Flow.Glyph.loadMetrics(Vex.Flow.Font,e,!f);
Vex.Flow.Glyph.renderOutline(a,h.outline,g,b,c)},Vex.Flow.Glyph=function(){function a(a,b,c){this.code=a,this.point=b,this.context=null,this.options={cache:!0,font:Vex.Flow.Font},this.width=null,this.metrics=null,this.x_shift=0,this.y_shift=0,c?this.setOptions(c):this.reset()}return a.prototype={setOptions:function(a){Vex.Merge(this.options,a),this.reset()},setStave:function(a){return this.stave=a,this},setXShift:function(a){return this.x_shift=a,this},setYShift:function(a){return this.y_shift=a,this},setContext:function(a){return this.context=a,this},getContext:function(){return this.context},reset:function(){this.metrics=Vex.Flow.Glyph.loadMetrics(this.options.font,this.code,this.options.cache),this.scale=72*this.point/(100*this.options.font.resolution)},setWidth:function(a){return this.width=a,this},getMetrics:function(){if(!this.metrics)throw new Vex.RuntimeError("BadGlyph","Glyph "+this.code+" is not initialized.");return{x_min:this.metrics.x_min*this.scale,x_max:this.metrics.x_max*this.scale,width:this.width||(this.metrics.x_max-this.metrics.x_min)*this.scale,height:this.metrics.ha*this.scale}},render:function(b,c,d){if(!this.metrics)throw new Vex.RuntimeError("BadGlyph","Glyph "+this.code+" is not initialized.");var e=this.metrics.outline,f=this.scale;a.renderOutline(b,e,f,c,d)},renderToStave:function(b){if(!this.metrics)throw new Vex.RuntimeError("BadGlyph","Glyph "+this.code+" is not initialized.");if(!this.stave)throw new Vex.RuntimeError("GlyphError","No valid stave");if(!this.context)throw new Vex.RERR("GlyphError","No valid context");var c=this.metrics.outline,d=this.scale;a.renderOutline(this.context,c,d,b+this.x_shift,this.stave.getYForGlyphs()+this.y_shift)}},a.loadMetrics=function(a,b,c){var d=a.glyphs[b];if(!d)throw new Vex.RuntimeError("BadGlyph","Glyph "+b+" does not exist in font.");var e,f=d.x_min,g=d.x_max,h=d.ha;if(d.o)return c?d.cached_outline?e=d.cached_outline:(e=d.o.split(" "),d.cached_outline=e):(d.cached_outline&&delete d.cached_outline,e=d.o.split(" ")),{x_min:f,x_max:g,ha:h,outline:e};throw new Vex.RuntimeError("BadGlyph","Glyph "+this.code+" has no outline defined.")},a.renderOutline=function(a,b,c,d,e){var f=b.length;a.beginPath(),a.moveTo(d,e);for(var g=0;f>g;){var h=b[g++];switch(h){case"m":a.moveTo(d+b[g++]*c,e+b[g++]*-c);break;case"l":a.lineTo(d+b[g++]*c,e+b[g++]*-c);break;case"q":var i=d+b[g++]*c,j=e+b[g++]*-c;a.quadraticCurveTo(d+b[g++]*c,e+b[g++]*-c,i,j);break;case"b":var k=d+b[g++]*c,l=e+b[g++]*-c;a.bezierCurveTo(d+b[g++]*c,e+b[g++]*-c,d+b[g++]*c,e+b[g++]*-c,k,l)}}a.fill()},a}(),Vex.Flow.Stave=function(){function a(a,b,c,d){arguments.length>0&&this.init(a,b,c,d)}var b=Vex.Flow.STAVE_LINE_THICKNESS>1?Vex.Flow.STAVE_LINE_THICKNESS:0;return a.prototype={init:function(a,b,c,d){this.x=a,this.y=b,this.width=c,this.glyph_start_x=a+5,this.glyph_end_x=a+c,this.start_x=this.glyph_start_x,this.end_x=this.glyph_end_x,this.context=null,this.glyphs=[],this.end_glyphs=[],this.modifiers=[],this.measure=0,this.clef="treble",this.font={family:"sans-serif",size:8,weight:""},this.options={vertical_bar_width:10,glyph_spacing_px:10,num_lines:5,fill_style:"#999999",spacing_between_lines_px:10,space_above_staff_ln:4,space_below_staff_ln:4,top_text_position:1},this.bounds={x:this.x,y:this.y,w:this.width,h:0},Vex.Merge(this.options,d),this.resetLines(),this.modifiers.push(new Vex.Flow.Barline(Vex.Flow.Barline.type.SINGLE,this.x)),this.modifiers.push(new Vex.Flow.Barline(Vex.Flow.Barline.type.SINGLE,this.x+this.width))},resetLines:function(){this.options.line_config=[];for(var a=0;a<this.options.num_lines;a++)this.options.line_config.push({visible:!0});this.height=(this.options.num_lines+this.options.space_above_staff_ln)*this.options.spacing_between_lines_px,this.options.bottom_text_position=this.options.num_lines+1},setNoteStartX:function(a){return this.start_x=a,this},getNoteStartX:function(){var a=this.start_x;return this.modifiers[0].barline==Vex.Flow.Barline.type.REPEAT_BEGIN&&this.modifiers.length>2&&(a+=20),a},getNoteEndX:function(){return this.end_x},getTieStartX:function(){return this.start_x},getTieEndX:function(){return this.x+this.width},setContext:function(a){return this.context=a,this},getContext:function(){return this.context},getX:function(){return this.x},getNumLines:function(){return this.options.num_lines},setNumLines:function(a){return this.options.num_lines=parseInt(a,10),this.resetLines(),this},setY:function(a){return this.y=a,this},setWidth:function(a){return this.width=a,this.glyph_end_x=this.x+a,this.end_x=this.glyph_end_x,this},getWidth:function(){return this.width},setMeasure:function(a){return this.measure=a,this},setBegBarType:function(a){return(a==Vex.Flow.Barline.type.SINGLE||a==Vex.Flow.Barline.type.REPEAT_BEGIN||a==Vex.Flow.Barline.type.NONE)&&(this.modifiers[0]=new Vex.Flow.Barline(a,this.x)),this},setEndBarType:function(a){return a!=Vex.Flow.Barline.type.REPEAT_BEGIN&&(this.modifiers[1]=new Vex.Flow.Barline(a,this.x+this.width)),this},getModifierXShift:function(a){"undefined"==typeof a&&(a=this.glyphs.length-1),"number"!=typeof a&&new Vex.RERR("InvalidIndex","Must be of number type");for(var b=this.glyph_start_x,c=0,d=0;a+1>d;++d){var e=this.glyphs[d];b+=e.getMetrics().width,c+=e.getMetrics().width}return c>0&&(c+=this.options.vertical_bar_width+10),c},setRepetitionTypeLeft:function(a,b){return this.modifiers.push(new Vex.Flow.Repetition(a,this.x,b)),this},setRepetitionTypeRight:function(a,b){return this.modifiers.push(new Vex.Flow.Repetition(a,this.x,b)),this},setVoltaType:function(a,b,c){return this.modifiers.push(new Vex.Flow.Volta(a,b,this.x,c)),this},setSection:function(a,b){return this.modifiers.push(new Vex.Flow.StaveSection(a,this.x,b)),this},setTempo:function(a,b){return this.modifiers.push(new Vex.Flow.StaveTempo(a,this.x,b)),this},setText:function(a,b,c){return this.modifiers.push(new Vex.Flow.StaveText(a,b,c)),this},getHeight:function(){return this.height},getSpacingBetweenLines:function(){return this.options.spacing_between_lines_px},getBoundingBox:function(){return new Vex.Flow.BoundingBox(this.x,this.y,this.width,this.getBottomY()-this.y)},getBottomY:function(){var a=this.options,b=a.spacing_between_lines_px,c=this.getYForLine(a.num_lines)+a.space_below_staff_ln*b;return c},getBottomLineY:function(){return this.getYForLine(this.options.num_lines)},getYForLine:function(a){var c=this.options,d=c.spacing_between_lines_px,e=c.space_above_staff_ln,f=this.y+(a*d+e*d)-b/2;return f},getYForTopText:function(a){var b=a||0;return this.getYForLine(-b-this.options.top_text_position)},getYForBottomText:function(a){var b=a||0;return this.getYForLine(this.options.bottom_text_position+b)},getYForNote:function(a){var b=this.options,c=b.spacing_between_lines_px,d=b.space_above_staff_ln,e=this.y+d*c+5*c-a*c;return e},getYForGlyphs:function(){return this.getYForLine(3)},addGlyph:function(a){return a.setStave(this),this.glyphs.push(a),this.start_x+=a.getMetrics().width,this},addEndGlyph:function(a){return a.setStave(this),this.end_glyphs.push(a),this.end_x-=a.getMetrics().width,this},addModifier:function(a){return this.modifiers.push(a),a.addToStave(this,0===this.glyphs.length),this},addEndModifier:function(a){return this.modifiers.push(a),a.addToStaveEnd(this,0===this.end_glyphs.length),this},addKeySignature:function(a){return this.addModifier(new Vex.Flow.KeySignature(a)),this},addClef:function(a,b,c){return this.clef=a,this.addModifier(new Vex.Flow.Clef(a,b,c)),this},addEndClef:function(a,b,c){return this.addEndModifier(new Vex.Flow.Clef(a,b,c)),this},addTimeSignature:function(a,b){return this.addModifier(new Vex.Flow.TimeSignature(a,b)),this},addEndTimeSignature:function(a,b){this.addEndModifier(new Vex.Flow.TimeSignature(a,b))},addTrebleGlyph:function(){return this.clef="treble",this.addGlyph(new Vex.Flow.Glyph("v83",40)),this},draw:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");for(var a,b,c=this.options.num_lines,d=this.width,e=this.x,f=0;c>f;f++)a=this.getYForLine(f),this.context.save(),this.context.setFillStyle(this.options.fill_style),this.context.setStrokeStyle(this.options.fill_style),this.options.line_config[f].visible&&this.context.fillRect(e,a,d,Vex.Flow.STAVE_LINE_THICKNESS),this.context.restore();e=this.glyph_start_x;for(var g=0;g<this.glyphs.length;++g)b=this.glyphs[g],b.getContext()||b.setContext(this.context),b.renderToStave(e),e+=b.getMetrics().width;for(e=this.glyph_end_x,g=0;g<this.end_glyphs.length;++g)b=this.end_glyphs[g],b.getContext()||b.setContext(this.context),e-=b.getMetrics().width,b.renderToStave(e);for(g=0;g<this.modifiers.length;g++)"function"==typeof this.modifiers[g].draw&&this.modifiers[g].draw(this,this.getModifierXShift());if(this.measure>0){this.context.save(),this.context.setFont(this.font.family,this.font.size,this.font.weight);var h=this.context.measureText(""+this.measure).width;a=this.getYForTopText(0)+3,this.context.fillText(""+this.measure,this.x-h/2,a),this.context.restore()}return this},drawVertical:function(a,b){this.drawVerticalFixed(this.x+a,b)},drawVerticalFixed:function(a,b){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");var c=this.getYForLine(0),d=this.getYForLine(this.options.num_lines-1);b&&this.context.fillRect(a-3,c,1,d-c+1),this.context.fillRect(a,c,1,d-c+1)},drawVerticalBar:function(a){this.drawVerticalBarFixed(this.x+a,!1)},drawVerticalBarFixed:function(a){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");var b=this.getYForLine(0),c=this.getYForLine(this.options.num_lines-1);this.context.fillRect(a,b,1,c-b+1)},getConfigForLines:function(){return this.options.line_config},setConfigForLine:function(a,b){if(a>=this.options.num_lines||0>a)throw new Vex.RERR("StaveConfigError","The line number must be within the range of the number of lines in the Stave.");if(!b.hasOwnProperty("visible"))throw new Vex.RERR("StaveConfigError","The line configuration object is missing the 'visible' property.");if("boolean"!=typeof b.visible)throw new Vex.RERR("StaveConfigError","The line configuration objects 'visible' property must be true or false.");return this.options.line_config[a]=b,this},setConfigForLines:function(a){if(a.length!==this.options.num_lines)throw new Vex.RERR("StaveConfigError","The length of the lines configuration array must match the number of lines in the Stave");for(var b in a)a[b]||(a[b]=this.options.line_config[b]),Vex.Merge(this.options.line_config[b],a[b]);return this.options.line_config=a,this}},a}(),Vex.Flow.StaveConnector=function(){function a(a,b){this.init(a,b)}function b(b,c,d,e,f){if(c!==a.type.BOLD_DOUBLE_LEFT&&c!==a.type.BOLD_DOUBLE_RIGHT)throw Vex.RERR("InvalidConnector","A REPEAT_BEGIN or REPEAT_END type must be provided.");var g=3,h=3.5,i=2;c===a.type.BOLD_DOUBLE_RIGHT&&(g=-5,h=3),b.fillRect(d+g,e,1,f-e),b.fillRect(d-i,e,h,f-e)}return a.type={SINGLE_RIGHT:0,SINGLE_LEFT:1,SINGLE:1,DOUBLE:2,BRACE:3,BRACKET:4,BOLD_DOUBLE_LEFT:5,BOLD_DOUBLE_RIGHT:6,THIN_DOUBLE:7},a.prototype={init:function(b,c){this.thickness=Vex.Flow.STAVE_LINE_THICKNESS,this.width=3,this.top_stave=b,this.bottom_stave=c,this.type=a.type.DOUBLE,this.x_shift=0},setContext:function(a){return this.ctx=a,this},setType:function(b){return b>=a.type.SINGLE_RIGHT&&b<=a.type.THIN_DOUBLE&&(this.type=b),this},setText:function(a,b){return this.text=a,this.text_options={shift_x:0,shift_y:0},Vex.Merge(this.text_options,b),this.font={family:"times",size:16,weight:"normal"},this},setFont:function(a){Vex.Merge(this.font,a)},setXShift:function(a){if("number"!=typeof a)throw Vex.RERR("InvalidType","x_shift must be a Number");return this.x_shift=a,this},draw:function(){if(!this.ctx)throw new Vex.RERR("NoContext","Can't draw without a context.");var c=this.top_stave.getYForLine(0),d=this.bottom_stave.getYForLine(this.bottom_stave.getNumLines()-1)+this.thickness,e=this.width,f=this.top_stave.getX(),g=this.type===a.type.SINGLE_RIGHT||this.type===a.type.BOLD_DOUBLE_RIGHT||this.type===a.type.THIN_DOUBLE;g&&(f=this.top_stave.getX()+this.top_stave.width);var h=d-c;switch(this.type){case a.type.SINGLE:e=1;break;case a.type.SINGLE_LEFT:e=1;break;case a.type.SINGLE_RIGHT:e=1;break;case a.type.DOUBLE:f-=this.width+2;break;case a.type.BRACE:e=12;var i=this.top_stave.getX()-2,j=c,k=i,l=d,m=i-e,n=j+h/2,o=m-.9*e,p=j+.2*h,q=i+1.1*e,r=n-.135*h,s=q,t=n+.135*h,u=o,v=l-.2*h,w=m-e,x=v,y=i+.4*e,z=n+.135*h,A=y,B=n-.135*h,C=w,D=p;this.ctx.beginPath(),this.ctx.moveTo(i,j),this.ctx.bezierCurveTo(o,p,q,r,m,n),this.ctx.bezierCurveTo(s,t,u,v,k,l),this.ctx.bezierCurveTo(w,x,y,z,m,n),this.ctx.bezierCurveTo(A,B,C,D,i,j),this.ctx.fill(),this.ctx.stroke();break;case a.type.BRACKET:c-=4,d+=4,h=d-c,Vex.Flow.renderGlyph(this.ctx,f-5,c-3,40,"v1b",!0),Vex.Flow.renderGlyph(this.ctx,f-5,d+3,40,"v10",!0),f-=this.width+2;break;case a.type.BOLD_DOUBLE_LEFT:b(this.ctx,this.type,f+this.x_shift,c,d);break;case a.type.BOLD_DOUBLE_RIGHT:b(this.ctx,this.type,f,c,d);break;case a.type.THIN_DOUBLE:e=1}if(this.type!==a.type.BRACE&&this.type!==a.type.BOLD_DOUBLE_LEFT&&this.type!==a.type.BOLD_DOUBLE_RIGHT&&this.ctx.fillRect(f,c,e,h),this.type===a.type.THIN_DOUBLE&&this.ctx.fillRect(f-3,c,e,h),void 0!==this.text){this.ctx.save(),this.ctx.lineWidth=2,this.ctx.setFont(this.font.family,this.font.size,this.font.weight);var E=this.ctx.measureText(""+this.text).width,F=this.top_stave.getX()-E-24+this.text_options.shift_x,G=(this.top_stave.getYForLine(0)+this.bottom_stave.getBottomLineY())/2+this.text_options.shift_y;this.ctx.fillText(""+this.text,F,G+4),this.ctx.restore()}}},a}(),Vex.Flow.TabStave=function(){function a(a,b,c,d){arguments.length>0&&this.init(a,b,c,d)}return Vex.Inherit(a,Vex.Flow.Stave,{init:function(b,c,d,e){var f={spacing_between_lines_px:13,num_lines:6,top_text_position:1};Vex.Merge(f,e),a.superclass.init.call(this,b,c,d,f)},getYForGlyphs:function(){return this.getYForLine(2.5)},addTabGlyph:function(){var a,b;switch(this.options.num_lines){case 8:a=55,b=14;break;case 7:a=47,b=8;break;case 6:a=40,b=1;break;case 5:a=30,b=-6;break;case 4:a=23,b=-12}var c=new Vex.Flow.Glyph("v2f",a);return c.y_shift=b,this.addGlyph(c),this}}),a}(),Vex.Flow.TickContext=function(){function a(){this.init()}return a.prototype={init:function(){this.currentTick=new Vex.Flow.Fraction(0,1),this.maxTicks=new Vex.Flow.Fraction(0,1),this.minTicks=null,this.width=0,this.padding=3,this.pixelsUsed=0,this.x=0,this.tickables=[],this.notePx=0,this.extraLeftPx=0,this.extraRightPx=0,this.align_center=!1,this.tContexts=[],this.ignore_ticks=!0,this.preFormatted=!1,this.postFormatted=!1,this.context=null},setContext:function(a){return this.context=a,this},getContext:function(){return this.context},shouldIgnoreTicks:function(){return this.ignore_ticks},getWidth:function(){return this.width+2*this.padding},getX:function(){return this.x},setX:function(a){return this.x=a,this},getPixelsUsed:function(){return this.pixelsUsed},setPixelsUsed:function(a){return this.pixelsUsed=a,this},setPadding:function(a){return this.padding=a,this},getMaxTicks:function(){return this.maxTicks},getMinTicks:function(){return this.minTicks},getTickables:function(){return this.tickables},getCenterAlignedTickables:function(){return this.tickables.filter(function(a){return a.isCenterAligned()})},getMetrics:function(){return{width:this.width,notePx:this.notePx,extraLeftPx:this.extraLeftPx,extraRightPx:this.extraRightPx}},getCurrentTick:function(){return this.currentTick},setCurrentTick:function(a){this.currentTick=a,this.preFormatted=!1},getExtraPx:function(){for(var a=0,b=0,c=0,d=0,e=0;e<this.tickables.length;e++){c=Math.max(this.tickables[e].extraLeftPx,c),d=Math.max(this.tickables[e].extraRightPx,d);var f=this.tickables[e].modifierContext;f&&null!=f&&(a=Math.max(a,f.state.left_shift),b=Math.max(b,f.state.right_shift))}return{left:a,right:b,extraLeft:c,extraRight:d}},addTickable:function(a){if(!a)throw new Vex.RERR("BadArgument","Invalid tickable added.");if(!a.shouldIgnoreTicks()){this.ignore_ticks=!1;var b=a.getTicks();b.greaterThan(this.maxTicks)&&(this.maxTicks=b.clone()),null==this.minTicks?this.minTicks=b.clone():b.lessThan(this.minTicks)&&(this.minTicks=b.clone())}return a.setTickContext(this),this.tickables.push(a),this.preFormatted=!1,this},preFormat:function(){if(!this.preFormatted){for(var a=0;a<this.tickables.length;++a){var b=this.tickables[a];b.preFormat();var c=b.getMetrics();this.extraLeftPx=Math.max(this.extraLeftPx,c.extraLeftPx+c.modLeftPx),this.extraRightPx=Math.max(this.extraRightPx,c.extraRightPx+c.modRightPx),this.notePx=Math.max(this.notePx,c.noteWidth),this.width=this.notePx+this.extraLeftPx+this.extraRightPx}return this}},postFormat:function(){return this.postFormatted?this:(this.postFormatted=!0,this)}},a.getNextContext=function(a){var b=a.tContexts,c=b.indexOf(a);return b[c+1]},a}(),Vex.Flow.Tickable=function(){function a(){this.init()}return a.prototype={init:function(){this.intrinsicTicks=0,this.tickMultiplier=new Vex.Flow.Fraction(1,1),this.ticks=new Vex.Flow.Fraction(0,1),this.width=0,this.x_shift=0,this.voice=null,this.tickContext=null,this.modifierContext=null,this.modifiers=[],this.preFormatted=!1,this.postFormatted=!1,this.tuplet=null,this.align_center=!1,this.align_center=!1,this.center_x_shift=0,this.ignore_ticks=!1,this.context=null},setContext:function(a){this.context=a},getBoundingBox:function(){return null},getTicks:function(){return this.ticks},shouldIgnoreTicks:function(){return this.ignore_ticks},getWidth:function(){return this.width},setXShift:function(a){this.x_shift=a},getCenterXShift:function(){return this.isCenterAligned()?this.center_x_shift:0},isCenterAligned:function(){return this.align_center},setCenterAlignment:function(a){return this.align_center=a,this},getVoice:function(){if(!this.voice)throw new Vex.RERR("NoVoice","Tickable has no voice.");return this.voice},setVoice:function(a){this.voice=a},getTuplet:function(){return this.tuplet},setTuplet:function(a){var b,c;return this.tuplet&&(b=this.tuplet.getNoteCount(),c=this.tuplet.getBeatsOccupied(),this.applyTickMultiplier(b,c)),a&&(b=a.getNoteCount(),c=a.getBeatsOccupied(),this.applyTickMultiplier(c,b)),this.tuplet=a,this},addToModifierContext:function(a){this.modifierContext=a,this.preFormatted=!1},addModifier:function(a){return this.modifiers.push(a),this.preFormatted=!1,this},setTickContext:function(a){this.tickContext=a,this.preFormatted=!1},preFormat:function(){this.preFormatted||(this.width=0,this.modifierContext&&(this.modifierContext.preFormat(),this.width+=this.modifierContext.getWidth()))},postFormat:function(){return this.postFormatted?void 0:(this.postFormatted=!0,this)},getIntrinsicTicks:function(){return this.intrinsicTicks},setIntrinsicTicks:function(a){this.intrinsicTicks=a,this.ticks=this.tickMultiplier.clone().multiply(this.intrinsicTicks)},getTickMultiplier:function(){return this.tickMultiplier},applyTickMultiplier:function(a,b){this.tickMultiplier.multiply(a,b),this.ticks=this.tickMultiplier.clone().multiply(this.intrinsicTicks)},setDuration:function(a){var b=a.numerator*(Vex.Flow.RESOLUTION/a.denominator);this.ticks=this.tickMultiplier.clone().multiply(b),this.intrinsicTicks=this.ticks.value()}},a}(),Vex.Flow.Note=function(){function a(a){arguments.length>0&&this.init(a)}return a.CATEGORY="note",Vex.Inherit(a,Vex.Flow.Tickable,{init:function(b){if(a.superclass.init.call(this),!b)throw new Vex.RuntimeError("BadArguments","Note must have valid initialization data to identify duration and type.");var c=Vex.Flow.parseNoteData(b);if(!c)throw new Vex.RuntimeError("BadArguments","Invalid note initialization object: "+JSON.stringify(b));if(this.duration=c.duration,this.dots=c.dots,this.noteType=c.type,b.duration_override?this.setDuration(b.duration_override):this.setIntrinsicTicks(c.ticks),this.modifiers=[],this.glyph=Vex.Flow.durationToGlyph(this.duration,this.noteType),this.positions&&("object"!=typeof this.positions||!this.positions.length))throw new Vex.RuntimeError("BadArguments","Note keys must be array type.");this.playNote=null,this.tickContext=null,this.modifierContext=null,this.ignore_ticks=!1,this.width=0,this.extraLeftPx=0,this.extraRightPx=0,this.x_shift=0,this.left_modPx=0,this.right_modPx=0,this.voice=null,this.preFormatted=!1,this.ys=[],b.align_center&&this.setCenterAlignment(b.align_center),b.align_center&&this.setCenterAlignment(b.align_center),this.context=null,this.stave=null,this.render_options={annotation_spacing:5,stave_padding:12}},getPlayNote:function(){return this.playNote},setPlayNote:function(a){return this.playNote=a,this},isRest:function(){return!1},addStroke:function(a,b){return b.setNote(this),b.setIndex(a),this.modifiers.push(b),this.setPreFormatted(!1),this},getStave:function(){return this.stave},setStave:function(a){return this.stave=a,this.setYs([a.getYForLine(0)]),this.context=this.stave.context,this},getCategory:function(){return this.constructor.CATEGORY},setContext:function(a){return this.context=a,this},getExtraLeftPx:function(){return this.extraLeftPx},getExtraRightPx:function(){return this.extraRightPx},setExtraLeftPx:function(a){return this.extraLeftPx=a,this},setExtraRightPx:function(a){return this.extraRightPx=a,this},shouldIgnoreTicks:function(){return this.ignore_ticks},getLineNumber:function(){return 0},getLineForRest:function(){return 0},getGlyph:function(){return this.glyph},setYs:function(a){return this.ys=a,this},getYs:function(){if(0===this.ys.length)throw new Vex.RERR("NoYValues","No Y-values calculated for this note.");return this.ys},getYForTopText:function(a){if(!this.stave)throw new Vex.RERR("NoStave","No stave attached to this note.");return this.stave.getYForTopText(a)},getBoundingBox:function(){return null},getVoice:function(){if(!this.voice)throw new Vex.RERR("NoVoice","Note has no voice.");return this.voice},setVoice:function(a){return this.voice=a,this.preFormatted=!1,this},getTickContext:function(){return this.tickContext},setTickContext:function(a){return this.tickContext=a,this.preFormatted=!1,this},getDuration:function(){return this.duration},isDotted:function(){return this.dots>0},hasStem:function(){return!1},getDots:function(){return this.dots},getNoteType:function(){return this.noteType},setBeam:function(){return this},setModifierContext:function(a){return this.modifierContext=a,this},addModifier:function(a,b){return a.setNote(this),a.setIndex(b||0),this.modifiers.push(a),this.setPreFormatted(!1),this},getModifierStartXY:function(){if(!this.preFormatted)throw new Vex.RERR("UnformattedNote","Can't call GetModifierStartXY on an unformatted note");return{x:this.getAbsoluteX(),y:this.ys[0]}},getMetrics:function(){if(!this.preFormatted)throw new Vex.RERR("UnformattedNote","Can't call getMetrics on an unformatted note.");var a=0,b=0;null!=this.modifierContext&&(a=this.modifierContext.state.left_shift,b=this.modifierContext.state.right_shift);var c=this.getWidth();return{width:c,noteWidth:c-a-b-this.extraLeftPx-this.extraRightPx,left_shift:this.x_shift,modLeftPx:a,modRightPx:b,extraLeftPx:this.extraLeftPx,extraRightPx:this.extraRightPx}},setWidth:function(a){this.width=a},getWidth:function(){if(!this.preFormatted)throw new Vex.RERR("UnformattedNote","Can't call GetWidth on an unformatted note.");return this.width+(this.modifierContext?this.modifierContext.getWidth():0)},setXShift:function(a){return this.x_shift=a,this},getX:function(){if(!this.tickContext)throw new Vex.RERR("NoTickContext","Note needs a TickContext assigned for an X-Value");return this.tickContext.getX()+this.x_shift},getAbsoluteX:function(){if(!this.tickContext)throw new Vex.RERR("NoTickContext","Note needs a TickContext assigned for an X-Value");var a=this.tickContext.getX();return this.stave&&(a+=this.stave.getNoteStartX()+this.render_options.stave_padding),this.isCenterAligned()&&(a+=this.getCenterXShift()),a},setPreFormatted:function(a){if(this.preFormatted=a,this.preFormatted){var b=this.tickContext.getExtraPx();this.left_modPx=Math.max(this.left_modPx,b.left),this.right_modPx=Math.max(this.right_modPx,b.right)}}}),a}(),Vex.Flow.NoteHead=function(){function a(){c.DEBUG&&Vex.L("Vex.Flow.NoteHead",arguments)}function b(a,b,c,d,e){var f=15+Vex.Flow.STEM_WIDTH/2;a.save(),a.setLineWidth(Vex.Flow.STEM_WIDTH);var g=!1;if(Vex.Flow.durationToNumber(b)>2&&(g=!0),g||(c-=Vex.Flow.STEM_WIDTH/2*e),a.beginPath(),a.moveTo(c,d+11),a.lineTo(c,d+1),a.lineTo(c+f,d-10),a.lineTo(c+f,d),a.lineTo(c,d+11),a.closePath(),g?a.fill():a.stroke(),Vex.Flow.durationToFraction(b).equals(.5))for(var h=[-3,-1,f+1,f+3],i=0;i<h.length;i++)a.beginPath(),a.moveTo(c+h[i],d-10),a.lineTo(c+h[i],d+11),a.stroke();a.restore()}var c=function(a){arguments.length>0&&this.init(a)};return Vex.Inherit(c,Vex.Flow.Note,{init:function(a){if(c.superclass.init.call(this,a),this.index=a.index,this.x=a.x||0,this.y=a.y||0,this.note_type=a.note_type,this.duration=a.duration,this.displaced=a.displaced||!1,this.stem_direction=a.stem_direction||Vex.Flow.StaveNote.STEM_UP,this.line=a.line,this.glyph=Vex.Flow.durationToGlyph(this.duration,this.note_type),!this.glyph)throw new Vex.RuntimeError("BadArguments","No glyph found for duration '"+this.duration+"' and type '"+this.note_type+"'");this.glyph_code=this.glyph.code_head,this.x_shift=a.x_shift,a.custom_glyph_code&&(this.custom_glyph=!0,this.glyph_code=a.custom_glyph_code),this.context=null,this.style=a.style,this.slashed=a.slashed,Vex.Merge(this.render_options,{glyph_font_scale:35,stroke_px:3}),a.glyph_font_scale&&(this.render_options.glyph_font_scale=a.glyph_font_scale),this.setWidth(this.glyph.head_width)},getCategory:function(){return"notehead"},setContext:function(a){return this.context=a,this},getWidth:function(){return this.width},isDisplaced:function(){return this.displaced===!0},getStyle:function(){return this.style},setStyle:function(a){return this.style=a,this},getGlyph:function(){return this.glyph},setX:function(a){return this.x=a,this},getY:function(){return this.y},setY:function(a){return this.y=a,this},getLine:function(){return this.line},setLine:function(a){return this.line=a,this},getAbsoluteX:function(){var a=c.superclass.getAbsoluteX,b=this.preFormatted?a.call(this):this.x;return b+(this.displaced?this.width*this.stem_direction:0)},getBoundingBox:function(){if(!this.preFormatted)throw new Vex.RERR("UnformattedNote","Can't call getBoundingBox on an unformatted note.");var a=this.stave.getSpacingBetweenLines(),b=a/2,c=this.y-b;return new Vex.Flow.BoundingBox(this.getAbsoluteX(),c,this.width,a)},applyStyle:function(a){var b=this.getStyle();return b.shadowColor&&a.setShadowColor(b.shadowColor),b.shadowBlur&&a.setShadowBlur(b.shadowBlur),b.fillStyle&&a.setFillStyle(b.fillStyle),b.strokeStyle&&a.setStrokeStyle(b.strokeStyle),this},setStave:function(a){var b=this.getLine();return this.stave=a,this.setY(a.getYForNote(b)),this.context=this.stave.context,this},preFormat:function(){if(this.preFormatted)return this;var a=this.getGlyph(),b=a.head_width+this.extraLeftPx+this.extraRightPx;return this.setWidth(b),this.setPreFormatted(!0),this},draw:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");var c=this.context,d=this.getAbsoluteX(),e=this.y;a("Drawing note head '",this.note_type,this.duration,"' at",d,e);var f=this.stem_direction,g=this.render_options.glyph_font_scale,h=this.line;if(0>=h||h>=6){var i=e,j=Math.floor(h);0>h&&j-h==-.5?i-=5:h>6&&j-h==-.5&&(i+=5),"r"!=this.note_type&&c.fillRect(d-this.render_options.stroke_px,i,this.getGlyph().head_width+2*this.render_options.stroke_px,1)}"s"==this.note_type?b(c,this.duration,d,e,f):this.style?(c.save(),this.applyStyle(c),Vex.Flow.renderGlyph(c,d,e,g,this.glyph_code),c.restore()):Vex.Flow.renderGlyph(c,d,e,g,this.glyph_code)}}),c}(),Vex.Flow.Stem=function(){function a(){b.DEBUG&&Vex.L("Vex.Flow.Stem",arguments)}var b=function(a){arguments.length>0&&this.init(a)};return b.UP=1,b.DOWN=-1,b.WIDTH=Vex.Flow.STEM_WIDTH,b.HEIGHT=Vex.Flow.STEM_HEIGHT,b.prototype={init:function(a){this.x_begin=a.x_begin||0,this.x_end=a.x_end||0,this.y_top=a.y_top||0,this.y_bottom=a.y_bottom||0,this.y_extend=a.y_extend||0,this.stem_extension=a.stem_extension||0,this.stem_direction=a.stem_direction||0,this.hide=!1},setNoteHeadXBounds:function(a,b){return this.x_begin=a,this.x_end=b,this},setDirection:function(a){this.stem_direction=a},setExtension:function(a){this.stem_extension=a},setYBounds:function(a,b){this.y_top=a,this.y_bottom=b},getCategory:function(){return"stem"},setContext:function(a){return this.context=a,this},getHeight:function(){return(this.y_bottom-this.y_top)*this.stem_direction+(b.HEIGHT+this.stem_extension)*this.stem_direction},getBoundingBox:function(){throw new Vex.RERR("NotImplemented","getBoundingBox() not implemented.")},getExtents:function(){for(var a=[this.y_top,this.y_bottom],c=this.y_top,d=this.y_bottom,e=b.HEIGHT+this.stem_extension,f=0;f<a.length;++f){var g=a[f]+e*-this.stem_direction;this.stem_direction==b.DOWN?(c=c>g?c:g,d=d<a[f]?d:a[f]):(c=g>c?c:g,d=d>a[f]?d:a[f])}return{topY:c,baseY:d}},setStyle:function(a){return this.style=a,this},getStyle:function(){return this.style},applyStyle:function(a){var b=this.getStyle();return b&&(b.shadowColor&&a.setShadowColor(b.shadowColor),b.shadowBlur&&a.setShadowBlur(b.shadowBlur),b.strokeStyle&&a.setStrokeStyle(b.strokeStyle)),this},draw:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");if(!this.hide){var c,d,e=this.context,f=this.stem_direction;f==b.DOWN?(c=this.x_begin+b.WIDTH/2,d=this.y_top+2):(c=this.x_end+b.WIDTH/2,d=this.y_bottom-2),d+=this.y_extend*f,a("Rendering stem - ","Top Y: ",this.y_top,"Bottom Y: ",this.y_bottom),e.save(),this.applyStyle(e),e.beginPath(),e.setLineWidth(b.WIDTH),e.moveTo(c,d),e.lineTo(c,d-this.getHeight()),e.stroke(),e.restore()}}},b}(),Vex.Flow.StemmableNote=function(){function a(){b.DEBUG&&Vex.L("Vex.Flow.StemmableNote",arguments)}var b=function(a){arguments.length>0&&this.init(a)},c=Vex.Flow.Stem;return Vex.Inherit(b,Vex.Flow.Note,{init:function(a){b.superclass.init.call(this,a),this.stem=null,this.stem_extension_override=null,this.beam=null},getStem:function(){return this.stem},setStem:function(a){return this.stem=a,this},buildStem:function(){var a=new c;return this.setStem(a),this},getStemLength:function(){return c.HEIGHT+this.getStemExtension()},getBeamCount:function(){var a=this.getGlyph();return a?a.beam_count:0},getStemMinumumLength:function(){var a=Vex.Flow.durationToFraction(this.duration),b=a.value()<=1?0:20;switch(this.duration){case"8":null==this.beam&&(b=35);break;case"16":b=null==this.beam?35:25;break;case"32":b=null==this.beam?45:35;break;case"64":b=null==this.beam?50:40;break;case"128":b=null==this.beam?55:45}return b},getStemDirection:function(){return this.stem_direction},setStemDirection:function(a){if(a||(a=c.UP),a!=c.UP&&a!=c.DOWN)throw new Vex.RERR("BadArgument","Invalid stem direction: "+a);return this.stem_direction=a,this.stem&&(this.stem.setDirection(a),this.stem.setExtension(this.getStemExtension())),this.beam=null,this.preFormatted&&this.preFormat(),this},getStemX:function(){var a=this.getAbsoluteX()+this.x_shift,b=this.getAbsoluteX()+this.x_shift+this.glyph.head_width,d=this.stem_direction==c.DOWN?a:b;return d-=c.WIDTH/2*this.stem_direction},getCenterGlyphX:function(){return this.getAbsoluteX()+this.x_shift+this.glyph.head_width/2},getStemExtension:function(){var a=this.getGlyph();return null!=this.stem_extension_override?this.stem_extension_override:a?1===this.getStemDirection()?a.stem_up_extension:a.stem_down_extension:0},setStemLength:function(a){return this.stem_extension_override=a-c.HEIGHT,this},getStemExtents:function(){if(!this.ys||0===this.ys.length)throw new Vex.RERR("NoYValues","Can't get top stem Y when note has no Y values.");for(var b=this.ys[0],d=this.ys[0],e=c.HEIGHT+this.getStemExtension(),f=0;f<this.ys.length;++f){var g=this.ys[f]+e*-this.stem_direction;this.stem_direction==c.DOWN?(b=b>g?b:g,d=d<this.ys[f]?d:this.ys[f]):(b=g>b?b:g,d=d>this.ys[f]?d:this.ys[f]),("s"==this.noteType||"x"==this.noteType)&&(b-=7*this.stem_direction,d-=7*this.stem_direction)
}return a("Stem extents: ",b,d),{topY:b,baseY:d}},setBeam:function(a){return this.beam=a,this},getYForTopText:function(a){var b=this.getStemExtents();return this.hasStem()?Vex.Min(this.stave.getYForTopText(a),b.topY-this.render_options.annotation_spacing*(a+1)):this.stave.getYForTopText(a)},getYForBottomText:function(a){var b=this.getStemExtents();return this.hasStem()?Vex.Max(this.stave.getYForTopText(a),b.baseY+this.render_options.annotation_spacing*a):this.stave.getYForBottomText(a)},postFormat:function(){return this.beam&&this.beam.postFormat(),this.postFormatted=!0,this},drawStem:function(a){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");this.setStem(new c(a)),this.stem.setContext(this.context).draw()}}),b}(),Vex.Flow.StaveNote=function(){function a(){b.DEBUG&&Vex.L("Vex.Flow.StaveNote",arguments)}var b=function(a){arguments.length>0&&this.init(a)};b.CATEGORY="stavenotes";var c=Vex.Flow.Stem,d=Vex.Flow.NoteHead;b.STEM_UP=c.UP,b.STEM_DOWN=c.DOWN;var e=function(a,b,c){var d=(b.isrest?0:1)*c;a.line+=d,a.max_line+=d,a.min_line+=d,a.note.setKeyLine(0,a.note.getKeyLine(0)+d)},f=function(a,b,c){var d=a.line-Vex.MidLine(b.min_line,c.max_line);a.note.setKeyLine(0,a.note.getKeyLine(0)-d),a.line-=d,a.max_line-=d,a.min_line-=d};return b.format=function(a,c){if(!a||a.length<2)return!1;if(null!=a[0].getStave())return b.formatByY(a,c);for(var d=[],g=0;g<a.length;g++){var h,i=a[g].getKeyProps(),j=i[0].line,k=i[i.length-1].line,l=a[g].getStemDirection(),m=a[g].getStemLength()/10,n=a[g].getStemMinumumLength()/10;a[g].isRest()?(h=j+a[g].glyph.line_above,k=j-a[g].glyph.line_below):(h=1==l?i[i.length-1].line+m:i[i.length-1].line,k=1==l?i[0].line:i[0].line-m),d.push({line:i[0].line,max_line:h,min_line:k,isrest:a[g].isRest(),stem_dir:l,stem_max:m,stem_min:n,voice_shift:a[g].getVoiceShiftWidth(),is_displaced:a[g].isDisplaced(),note:a[g]})}var o=d.length,p=d[0],q=o>2?d[1]:null,r=o>2?d[2]:d[1];2==o&&-1==p.stem_dir&&1==r.stem_dir&&(p=d[1],r=d[0]);var s,t=Math.max(p.voice_shift,r.voice_shift),u=0;if(2==o){var v=p.stem_dir==r.stem_dir?0:.5;return p.stem_dir==r.stem_dir&&p.min_line<=r.max_line&&(p.isrest||(s=Math.abs(p.line-(r.max_line+.5)),s=Math.max(s,p.stem_min),p.min_line=p.line-s,p.note.setStemLength(10*s))),p.min_line<=r.max_line+v&&(p.isrest?e(p,r,1):r.isrest?e(r,p,-1):(u=t,p.stem_dir==r.stem_dir?p.note.setXShift(u+3):r.note.setXShift(u))),!0}if(null!=q&&q.min_line<r.max_line+.5&&(q.isrest||(s=Math.abs(q.line-(r.max_line+.5)),s=Math.max(s,q.stem_min),q.min_line=q.line-s,q.note.setStemLength(10*s))),q.isrest&&!p.isrest&&!r.isrest&&(p.min_line<=q.max_line||q.min_line<=r.max_line)){var w=q.max_line-q.min_line,x=p.min_line-r.max_line;return x>w?f(q,p,r):(u=t+3,q.note.setXShift(u)),!0}return p.isrest&&q.isrest&&r.isrest?(e(p,q,1),e(r,q,-1),!0):(q.isrest&&p.isrest&&q.min_line<=r.max_line&&e(q,r,1),q.isrest&&r.isrest&&p.min_line<=q.max_line&&e(q,p,-1),p.isrest&&p.min_line<=q.max_line&&e(p,q,1),r.isrest&&q.min_line<=r.max_line&&e(r,q,-1),(!p.isrest&&!q.isrest&&p.min_line<=q.max_line+.5||!q.isrest&&!r.isrest&&q.min_line<=r.max_line)&&(u=t+3,q.note.setXShift(u)),!0)},b.formatByY=function(a,b){var c,d=!0;for(c=0;c<a.length;c++)d=d&&null!=a[c].getStave();if(!d)throw new Vex.RERR("Stave Missing","All notes must have a stave - Vex.Flow.ModifierContext.formatMultiVoice!");var e=0;for(c=0;c<a.length-1;c++){var f=a[c],g=a[c+1];f.getStemDirection()==Vex.Flow.StaveNote.STEM_DOWN&&(f=a[c+1],g=a[c]);var h=f.getKeyProps(),i=g.getKeyProps(),j=f.getStave().getYForLine(h[0].line),k=g.getStave().getYForLine(i[i.length-1].line),l=f.getStave().options.spacing_between_lines_px;Math.abs(j-k)==l/2&&(e=f.getVoiceShiftWidth(),g.setXShift(e))}b.right_shift+=e},b.postFormat=function(a){return a?(a.forEach(function(a){a.postFormat()}),!0):!1},Vex.Inherit(b,Vex.Flow.StemmableNote,{init:function(a){if(b.superclass.init.call(this,a),this.keys=a.keys,this.clef=a.clef,this.octave_shift=a.octave_shift,this.beam=null,this.glyph=Vex.Flow.durationToGlyph(this.duration,this.noteType),!this.glyph)throw new Vex.RuntimeError("BadArguments","Invalid note initialization data (No glyph found): "+JSON.stringify(a));this.displaced=!1,this.dot_shiftY=0,this.keyProps=[],this.use_default_head_x=!1,this.note_heads=[],this.modifiers=[],Vex.Merge(this.render_options,{glyph_font_scale:35,stroke_px:3}),this.calculateKeyProps(),this.buildStem(),a.auto_stem?this.autoStem():this.setStemDirection(a.stem_direction),this.buildNoteHeads(),this.calcExtraPx()},buildStem:function(){var a=this.getGlyph(),b=0;("v95"==a.code_head||"v3e"==a.code_head)&&(b=-4);var d=new c({y_extend:b});this.isRest()&&(d.hide=!0),this.setStem(d)},buildNoteHeads:function(){var a=this.getStemDirection(),b=this.getKeys(),e=null,f=null,g=!1,h=0,i=b.length,j=1;a===c.DOWN&&(h=b.length-1,i=-1,j=-1);for(var k=h;k!=i;k+=j){var l=this.keyProps[k],m=l.line;null===e?e=m:(f=Math.abs(e-m),0===f||.5===f?g=!g:(g=!1,this.use_default_head_x=!0)),e=m;var n=new d({duration:this.duration,note_type:this.noteType,displaced:g,stem_direction:a,custom_glyph_code:l.code,glyph_font_scale:this.render_options.glyph_font_scale,x_shift:l.shift_right,line:l.line});this.note_heads[k]=n}},autoStem:function(){var a;this.min_line=this.keyProps[0].line,this.max_line=this.keyProps[this.keyProps.length-1].line;var b=(this.min_line+this.max_line)/2;a=3>b?1:-1,this.setStemDirection(a)},calculateKeyProps:function(){for(var a=null,b=0;b<this.keys.length;++b){var c=this.keys[b];this.glyph.rest&&(this.glyph.position=c);var d={octave_shift:this.octave_shift||0},e=Vex.Flow.keyProperties(c,this.clef,d);if(!e)throw new Vex.RuntimeError("BadArguments","Invalid key for note properties: "+c);"R"===e.key&&(e.line="1"===this.duration||"w"===this.duration?4:3);var f=e.line;null===a?a=f:.5==Math.abs(a-f)&&(this.displaced=!0,e.displaced=!0,this.keyProps.length>0&&(this.keyProps[b-1].displaced=!0)),a=f,this.keyProps.push(e)}this.keyProps.sort(function(a,b){return a.line-b.line})},getBoundingBox:function(){if(!this.preFormatted)throw new Vex.RERR("UnformattedNote","Can't call getBoundingBox on an unformatted note.");var a=this.getMetrics(),b=a.width,c=this.getAbsoluteX()-a.modLeftPx-a.extraLeftPx,d=0,e=0,f=this.getStave().getSpacingBetweenLines()/2,g=2*f;if(this.isRest()){var h=this.ys[0],i=Vex.Flow.durationToFraction(this.duration);i.equals(1)||i.equals(2)?(d=h-f,e=h+f):(d=h-this.glyph.line_above*g,e=h+this.glyph.line_below*g)}else if(this.glyph.stem){var j=this.getStemExtents();j.baseY+=f*this.stem_direction,d=Vex.Min(j.topY,j.baseY),e=Vex.Max(j.topY,j.baseY)}else{d=null,e=null;for(var k=0;k<this.ys.length;++k){var l=this.ys[k];0===k?(d=l,e=l):(d=Vex.Min(l,d),e=Vex.Max(l,e)),d-=f,e+=f}}return new Vex.Flow.BoundingBox(c,d,b,e-d)},getLineNumber:function(a){if(!this.keyProps.length)throw new Vex.RERR("NoKeyProps","Can't get bottom note line, because note is not initialized properly.");for(var b=this.keyProps[0].line,c=0;c<this.keyProps.length;c++){var d=this.keyProps[c].line;a?d>b&&(b=d):b>d&&(b=d)}return b},isRest:function(){return this.glyph.rest},isChord:function(){return!this.isRest()&&this.keys.length>1},hasStem:function(){return this.glyph.stem},getYForTopText:function(a){var b=this.getStemExtents();return Vex.Min(this.stave.getYForTopText(a),b.topY-this.render_options.annotation_spacing*(a+1))},getYForBottomText:function(a){var b=this.getStemExtents();return Vex.Max(this.stave.getYForTopText(a),b.baseY+this.render_options.annotation_spacing*a)},setStave:function(a){var b=Vex.Flow.StaveNote.superclass;b.setStave.call(this,a);var c=this.note_heads.map(function(b){return b.setStave(a),b.getY()});this.setYs(c);var d=this.getNoteHeadBounds();return this.beam||this.stem.setYBounds(d.y_top,d.y_bottom),this},getKeys:function(){return this.keys},getKeyProps:function(){return this.keyProps},isDisplaced:function(){return this.displaced},setNoteDisplaced:function(a){return this.displaced=a,this},getTieRightX:function(){var a=this.getAbsoluteX();return a+=this.glyph.head_width+this.x_shift+this.extraRightPx,this.modifierContext&&(a+=this.modifierContext.getExtraRightPx()),a},getTieLeftX:function(){var a=this.getAbsoluteX();return a+=this.x_shift-this.extraLeftPx},getLineForRest:function(){var a=this.keyProps[0].line;if(this.keyProps.length>1){var b=this.keyProps[this.keyProps.length-1].line,c=Vex.Max(a,b),d=Vex.Min(a,b);a=Vex.MidLine(c,d)}return a},getModifierStartXY:function(a,b){if(!this.preFormatted)throw new Vex.RERR("UnformattedNote","Can't call GetModifierStartXY on an unformatted note");if(0===this.ys.length)throw new Vex.RERR("NoYValues","No Y-Values calculated for this note.");var c=0;return a==Vex.Flow.Modifier.Position.LEFT?c=-2:a==Vex.Flow.Modifier.Position.RIGHT?c=this.glyph.head_width+this.x_shift+2:(a==Vex.Flow.Modifier.Position.BELOW||a==Vex.Flow.Modifier.Position.ABOVE)&&(c=this.glyph.head_width/2),{x:this.getAbsoluteX()+c,y:this.ys[b]}},setStyle:function(a){this.note_heads.forEach(function(b){b.setStyle(a)},this),this.stem.setStyle(a)},setKeyStyle:function(a,b){return this.note_heads[a].setStyle(b),this},setKeyLine:function(a,b){return this.keyProps[a].line=b,this.note_heads[a].setLine(b),this},getKeyLine:function(a){return this.keyProps[a].line},addToModifierContext:function(a){this.setModifierContext(a);for(var b=0;b<this.modifiers.length;++b)this.modifierContext.addModifier(this.modifiers[b]);return this.modifierContext.addModifier(this),this.setPreFormatted(!1),this},addModifier:function(a,b){return b.setNote(this),b.setIndex(a),this.modifiers.push(b),this.setPreFormatted(!1),this},addAccidental:function(a,b){return this.addModifier(a,b)},addArticulation:function(a,b){return this.addModifier(a,b)},addAnnotation:function(a,b){return this.addModifier(a,b)},addDot:function(a){var b=new Vex.Flow.Dot;return b.setDotShiftY(this.glyph.dot_shiftY),this.dots++,this.addModifier(a,b)},addDotToAll:function(){for(var a=0;a<this.keys.length;++a)this.addDot(a);return this},getAccidentals:function(){return this.modifierContext.getModifiers("accidentals")},getDots:function(){return this.modifierContext.getModifiers("dots")},getVoiceShiftWidth:function(){return this.glyph.head_width*(this.displaced?2:1)},calcExtraPx:function(){this.setExtraLeftPx(this.displaced&&-1==this.stem_direction?this.glyph.head_width:0),this.setExtraRightPx(this.displaced&&1==this.stem_direction?this.glyph.head_width:0)},preFormat:function(){if(!this.preFormatted){this.modifierContext&&this.modifierContext.preFormat();var a=this.glyph.head_width+this.extraLeftPx+this.extraRightPx;this.glyph.flag&&null===this.beam&&1==this.stem_direction&&(a+=this.glyph.head_width),this.setWidth(a),this.setPreFormatted(!0)}},getNoteHeadBounds:function(){var a=null,b=null,c=this.stave.getNumLines(),d=1;return this.note_heads.forEach(function(e){var f=e.getLine(),g=e.getY();(null===a||a>g)&&(a=g),(null===b||g>b)&&(b=g),c=f>c?f:c,d=d>f?f:d},this),{y_top:a,y_bottom:b,highest_line:c,lowest_line:d}},getNoteHeadBeginX:function(){return this.getAbsoluteX()+this.x_shift},getNoteHeadEndX:function(){var a=this.getNoteHeadBeginX();return a+this.glyph.head_width-Vex.Flow.STEM_WIDTH/2},drawLedgerLines:function(){function a(a){h.use_default_head_x===!0&&(g=h.getAbsoluteX()+h.x_shift);var b=g-h.render_options.stroke_px,d=g+h.glyph.head_width-g+2*h.render_options.stroke_px;c.fillRect(b,a,d,1)}if(!this.isRest()){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");var b,c=this.context,d=this.getNoteHeadBounds(),e=d.highest_line,f=d.lowest_line,g=this.note_heads[0].getAbsoluteX(),h=this;for(b=6;e>=b;++b)a(this.stave.getYForNote(b));for(b=0;b>=f;--b)a(this.stave.getYForNote(b))}},drawModifiers:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");for(var a=this.context,b=0;b<this.modifiers.length;b++){var c=this.modifiers[b],d=this.note_heads[c.getIndex()],e=d.getStyle();e&&(a.save(),d.applyStyle(a)),c.setContext(a),c.draw(),e&&a.restore()}},drawFlag:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");var a=this.context,b=this.getGlyph(),d=null===this.beam,e=this.getNoteHeadBounds(),f=this.getNoteHeadBeginX(),g=this.getNoteHeadEndX();if(b.flag&&d){var h,i,j,k=this.stem.getHeight();this.getStemDirection()===c.DOWN?(h=f+1,i=e.y_top-k+2,j=b.code_flag_downstem):(h=g+1,i=e.y_bottom-k-2,j=b.code_flag_upstem),Vex.Flow.renderGlyph(a,h,i,this.render_options.glyph_font_scale,j)}},drawNoteHeads:function(){this.note_heads.forEach(function(a){a.setContext(this.context).draw()},this)},drawStem:function(a){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");a&&this.setStem(new c(a)),this.stem.setContext(this.context).draw()},draw:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");if(!this.stave)throw new Vex.RERR("NoStave","Can't draw without a stave.");if(0===this.ys.length)throw new Vex.RERR("NoYValues","Can't draw note without Y values.");var b=this.getNoteHeadBeginX(),c=this.getNoteHeadEndX(),d=this.hasStem()&&!this.beam;this.note_heads.forEach(function(a){a.setX(b)},this),this.stem.setNoteHeadXBounds(b,c),a("Rendering ",this.isChord()?"chord :":"note :",this.keys),this.drawLedgerLines(),d&&this.drawStem(),this.drawNoteHeads(),this.drawFlag(),this.drawModifiers()}}),b}(),Vex.Flow.TabNote=function(){function a(a,b){arguments.length>0&&this.init(a,b)}function b(a,b){for(var c=[],d=[],e=1;a>=e;e++){var f=b.indexOf(e)>-1;f?(c.push(d),d=[]):d.push(e)}return d.length>0&&c.push(d),c}function c(a,b,c,d){var e=1!==d,f=-1!==d,g=c.getSpacingBetweenLines(),h=c.getNumLines(),i=[];return b.forEach(function(b){var j=b.indexOf(h)>-1,k=b.indexOf(1)>-1;if(!(e&&k||f&&j)){1===b.length&&b.push(b[0]);var l=[];b.forEach(function(b,e,f){var i=1===b,j=b===h,k=c.getYForLine(b-1);0!==e||i?e!==f.length-1||j||(k+=g/2-1):k-=g/2-1,l.push(k),1===d&&i?l.push(a-2):-1===d&&j&&l.push(a+2)}),i.push(l.sort(function(a,b){return a-b}))}}),i}var d=Vex.Flow.Stem;return Vex.Inherit(a,Vex.Flow.StemmableNote,{init:function(a,b){var c=Vex.Flow.TabNote.superclass;if(c.init.call(this,a),this.ghost=!1,this.positions=a.positions,Vex.Merge(this.render_options,{glyph_font_scale:30,draw_stem:b,draw_dots:b,draw_stem_through_stave:!1}),this.glyph=Vex.Flow.durationToGlyph(this.duration,this.noteType),!this.glyph)throw new Vex.RuntimeError("BadArguments","Invalid note initialization data (No glyph found): "+JSON.stringify(a));this.buildStem(),this.setStemDirection(a.stem_direction?a.stem_direction:d.UP),this.ghost=!1,this.updateWidth()},getCategory:function(){return"tabnotes"},setGhost:function(a){return this.ghost=a,this.updateWidth(),this},hasStem:function(){return this.render_options.draw_stem},getStemExtension:function(){var a=this.getGlyph();return null!=this.stem_extension_override?this.stem_extension_override:a?1===this.getStemDirection()?a.tabnote_stem_up_extension:a.tabnote_stem_down_extension:0},addDot:function(){var a=new Vex.Flow.Dot;return this.dots++,this.addModifier(a,0)},updateWidth:function(){this.glyphs=[],this.width=0;for(var a=0;a<this.positions.length;++a){var b=this.positions[a].fret;this.ghost&&(b="("+b+")");var c=Vex.Flow.tabToGlyph(b);this.glyphs.push(c),this.width=c.width>this.width?c.width:this.width}},setStave:function(a){var b=Vex.Flow.TabNote.superclass;b.setStave.call(this,a),this.context=a.context,this.width=0;var c;if(this.context)for(c=0;c<this.glyphs.length;++c){var d=""+this.glyphs[c].text;"X"!=d.toUpperCase()&&(this.glyphs[c].width=this.context.measureText(d).width),this.width=this.glyphs[c].width>this.width?this.glyphs[c].width:this.width}var e=[];for(c=0;c<this.positions.length;++c){var f=this.positions[c].str;e.push(this.stave.getYForLine(f-1))}return this.setYs(e)},getPositions:function(){return this.positions},addToModifierContext:function(a){this.setModifierContext(a);for(var b=0;b<this.modifiers.length;++b)this.modifierContext.addModifier(this.modifiers[b]);return this.modifierContext.addModifier(this),this.preFormatted=!1,this},getTieRightX:function(){var a=this.getAbsoluteX(),b=this.glyph.head_width;return a+=b/2,a+=-this.width/2+this.width+2},getTieLeftX:function(){var a=this.getAbsoluteX(),b=this.glyph.head_width;return a+=b/2,a-=this.width/2+2},getModifierStartXY:function(a,b){if(!this.preFormatted)throw new Vex.RERR("UnformattedNote","Can't call GetModifierStartXY on an unformatted note");if(0===this.ys.length)throw new Vex.RERR("NoYValues","No Y-Values calculated for this note.");var c=0;if(a==Vex.Flow.Modifier.Position.LEFT)c=-2;else if(a==Vex.Flow.Modifier.Position.RIGHT)c=this.width+2;else if(a==Vex.Flow.Modifier.Position.BELOW||a==Vex.Flow.Modifier.Position.ABOVE){var d=this.glyph.head_width;c=d/2}return{x:this.getAbsoluteX()+c,y:this.ys[b]}},getLineForRest:function(){return this.positions[0].str},preFormat:function(){this.preFormatted||(this.modifierContext&&this.modifierContext.preFormat(),this.setPreFormatted(!0))},getStemX:function(){return this.getCenterGlyphX()},getStemY:function(){var a=this.stave.getNumLines(),b=-.5,c=a-.5,e=d.UP===this.stem_direction?b:c;return this.stave.getYForLine(e)},getStemExtents:function(){var a=this.getStemY(),b=a+d.HEIGHT*-this.stem_direction;return{topY:b,baseY:a}},drawFlag:function(){var a=null==this.beam&&this.render_options.draw_stem,b=null==this.beam&&a;if(this.glyph.flag&&b){var c,e=this.getStemX()+1,f=this.getStemY()-this.stem.getHeight();c=this.stem_direction==d.DOWN?this.glyph.code_flag_downstem:this.glyph.code_flag_upstem,Vex.Flow.renderGlyph(this.context,e,f,this.render_options.glyph_font_scale,c)}},drawModifiers:function(){this.modifiers.forEach(function(a){("dots"!==a.getCategory()||this.render_options.draw_dots)&&(a.setContext(this.context),a.draw())},this)},drawStemThrough:function(){var a=this.getStemX(),e=this.getStemY(),f=this.context,g=this.render_options.draw_stem_through_stave,h=this.render_options.draw_stem;if(h&&g){var i=this.stave.getNumLines(),j=this.positions.map(function(a){return a.str}),k=b(i,j),l=c(e,k,this.getStave(),this.getStemDirection());this.beam&&1!==this.getStemDirection()||(a+=d.WIDTH/2),f.save(),f.setLineWidth(d.WIDTH),l.forEach(function(b){f.beginPath(),f.moveTo(a,b[0]),f.lineTo(a,b[b.length-1]),f.stroke(),f.closePath()}),f.restore()}},drawPositions:function(){for(var a,b=this.context,c=this.getAbsoluteX(),d=this.ys,e=0;e<this.positions.length;++e){a=d[e];var f=this.glyphs[e],g=this.glyph.head_width,h=c+g/2-f.width/2;if(b.clearRect(h-2,a-3,f.width+4,6),f.code)Vex.Flow.renderGlyph(b,h,a+5+f.shift_y,this.render_options.glyph_font_scale,f.code);else{var i=f.text.toString();b.fillText(i,h,a+5)}}},draw:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");if(!this.stave)throw new Vex.RERR("NoStave","Can't draw without a stave.");if(0===this.ys.length)throw new Vex.RERR("NoYValues","Can't draw note without Y values.");var a=null==this.beam&&this.render_options.draw_stem;this.drawPositions(),this.drawStemThrough();var b=this.getStemX(),c=this.getStemY();a&&this.drawStem({x_begin:b,x_end:b,y_top:c,y_bottom:c,y_extend:0,stem_extension:this.getStemExtension(),stem_direction:this.stem_direction}),this.drawFlag(),this.drawModifiers()}}),a}(),Vex.Flow.GhostNote=function(){function a(a){arguments.length>0&&this.init(a)}return Vex.Inherit(a,Vex.Flow.StemmableNote,{init:function(b){if(!b)throw new Vex.RuntimeError("BadArguments","Ghost note must have valid initialization data to identify duration.");var c;if("string"==typeof b)c={duration:b};else{if("object"!=typeof b)throw new Vex.RuntimeError("BadArguments","Ghost note must have valid initialization data to identify duration.");c=b}a.superclass.init.call(this,c),this.setWidth(0)},isRest:function(){return!0},setStave:function(b){a.superclass.setStave.call(this,b)},addToModifierContext:function(){return this},preFormat:function(){return this.setPreFormatted(!0),this},draw:function(){if(!this.stave)throw new Vex.RERR("NoStave","Can't draw without a stave.");for(var a=0;a<this.modifiers.length;++a){var b=this.modifiers[a];b.setContext(this.context),b.draw()}}}),a}(),Vex.Flow.ClefNote=function(){function a(a,b,c){this.init(a,b,c)}return Vex.Inherit(a,Vex.Flow.Note,{init:function(b,c,d){a.superclass.init.call(this,{duration:"b"}),this.setClef(b,c,d),this.ignore_ticks=!0},setClef:function(a,b,c){return this.clef_obj=new Vex.Flow.Clef(a,b,c),this.clef=this.clef_obj.clef,this.glyph=new Vex.Flow.Glyph(this.clef.code,this.clef.point),this.setWidth(this.glyph.getMetrics().width),this},getClef:function(){return this.clef},setStave:function(a){var b=Vex.Flow.ClefNote.superclass;b.setStave.call(this,a)},getBoundingBox:function(){return new Vex.Flow.BoundingBox(0,0,0,0)},addToModifierContext:function(){return this},getCategory:function(){return"clefnote"},preFormat:function(){return this.setPreFormatted(!0),this},draw:function(){if(!this.stave)throw new Vex.RERR("NoStave","Can't draw without a stave.");this.glyph.getContext()||this.glyph.setContext(this.context);var a=this.getAbsoluteX();if(this.glyph.setStave(this.stave),this.glyph.setYShift(this.stave.getYForLine(this.clef.line)-this.stave.getYForGlyphs()),this.glyph.renderToStave(a),void 0!==this.clef_obj.annotation){var b=new Vex.Flow.Glyph(this.clef_obj.annotation.code,this.clef_obj.annotation.point);b.getContext()||b.setContext(this.context),b.setStave(this.stave),b.setYShift(this.stave.getYForLine(this.clef_obj.annotation.line)-this.stave.getYForGlyphs()),b.setXShift(this.clef_obj.annotation.x_shift),b.renderToStave(a)}}}),a}(),Vex.Flow.TimeSigNote=function(){function a(a,b){arguments.length>0&&this.init(a,b)}return Vex.Inherit(a,Vex.Flow.Note,{init:function(b,c){a.superclass.init.call(this,{duration:"b"});var d=new Vex.Flow.TimeSignature(b,c);this.timeSig=d.getTimeSig(),this.setWidth(this.timeSig.glyph.getMetrics().width),this.ignore_ticks=!0},setStave:function(a){var b=Vex.Flow.TimeSigNote.superclass;b.setStave.call(this,a)},getBoundingBox:function(){return new Vex.Flow.BoundingBox(0,0,0,0)},addToModifierContext:function(){return this},preFormat:function(){return this.setPreFormatted(!0),this},draw:function(){if(!this.stave)throw new Vex.RERR("NoStave","Can't draw without a stave.");this.timeSig.glyph.getContext()||this.timeSig.glyph.setContext(this.context),this.timeSig.glyph.setStave(this.stave),this.timeSig.glyph.setYShift(this.stave.getYForLine(this.timeSig.line)-this.stave.getYForGlyphs()),this.timeSig.glyph.renderToStave(this.getAbsoluteX())}}),a}(),Vex.Flow.Beam=function(){function a(a,b){arguments.length>0&&this.init(a,b)}function b(a){var b=0;return a.forEach(function(a){a.keyProps&&a.keyProps.forEach(function(a){b+=a.line-3})}),b>=0?c.DOWN:c.UP}var c=Vex.Flow.Stem;return a.prototype={init:function(a,d){if(!a||a==[])throw new Vex.RuntimeError("BadArguments","No notes provided for beam.");if(1==a.length)throw new Vex.RuntimeError("BadArguments","Too few notes for beam.");if(this.ticks=a[0].getIntrinsicTicks(),this.ticks>=Vex.Flow.durationToTicks("4"))throw new Vex.RuntimeError("BadArguments","Beams can only be applied to notes shorter than a quarter note.");var e,f;for(this.stem_direction=c.UP,e=0;e<a.length;++e)if(f=a[e],f.hasStem()){this.stem_direction=f.getStemDirection();break}var g=this.stem_direction;if(d&&"stavenotes"===a[0].getCategory())g=b(a);else if(d&&"tabnotes"===a[0].getCategory()){var h=a.reduce(function(a,b){return a+b.stem_direction},0);g=h>-1?c.UP:c.DOWN}for(e=0;e<a.length;++e)f=a[e],d&&(f.setStemDirection(g),this.stem_direction=g),f.setBeam(this);this.postFormatted=!1,this.notes=a,this.beam_count=this.getBeamCount(),this.break_on_indices=[],this.render_options={beam_width:5,max_slope:.25,min_slope:-.25,slope_iterations:20,slope_cost:100,show_stemlets:!1,stemlet_extension:7,partial_beam_length:10}},setContext:function(a){return this.context=a,this},getNotes:function(){return this.notes},getBeamCount:function(){var a=this.notes.map(function(a){return a.getGlyph().beam_count}),b=a.reduce(function(a,b){return b>a?b:a});return b},breakSecondaryAt:function(a){return this.break_on_indices=a,this},getSlopeY:function(a,b,c,d){return c+(a-b)*d},calculateSlope:function(){for(var a=this.notes[0],b=a.getStemExtents().topY,c=a.getStemX(),d=(this.render_options.max_slope-this.render_options.min_slope)/this.render_options.slope_iterations,e=Number.MAX_VALUE,f=0,g=0,h=this.render_options.min_slope;h<=this.render_options.max_slope;h+=d){for(var i=0,j=0,k=1;k<this.notes.length;++k){var l=this.notes[k],m=l.getStemX(),n=l.getStemExtents().topY,o=this.getSlopeY(m,c,b,h)+j;if(n*this.stem_direction<o*this.stem_direction){var p=Math.abs(n-o);j+=p*-this.stem_direction,i+=p*k}else i+=(n-o)*this.stem_direction}var q=this.notes[this.notes.length-1],r=(q.getStemExtents().topY-b)/(q.getStemX()-c),s=r/2,t=Math.abs(s-h),u=this.render_options.slope_cost*t+Math.abs(i);e>u&&(e=u,f=h,g=j)}this.slope=f,this.y_shift=g},applyStemExtensions:function(){for(var a=this.notes[0],b=a.getStemExtents().topY,d=a.getStemX(),e=0;e<this.notes.length;++e){var f=this.notes[e],g=f.getStemX(),h=f.getStemExtents(),i=h.baseY,j=h.topY;i+=this.stem_direction*f.glyph.stem_offset;var k=Vex.Flow.STEM_WIDTH;if(f.hasStem()){var l=this.getSlopeY(g,d,b,this.slope)+this.y_shift;f.setStem(new Vex.Flow.Stem({x_begin:g-Vex.Flow.STEM_WIDTH/2,x_end:g,y_top:1===this.stem_direction?j:i,y_bottom:1===this.stem_direction?i:j,y_extend:k,stem_extension:Math.abs(j-l)-c.HEIGHT-1,stem_direction:this.stem_direction}))}else if(f.isRest()&&this.render_options.show_stemlets){var m=f.getCenterGlyphX(),n=this.render_options.beam_width,o=(this.beam_count-1)*n*1.5+n,p=o-k+this.render_options.stemlet_extension,q=this.getSlopeY(m,d,b,this.slope)+this.y_shift,r=q+Vex.Flow.Stem.HEIGHT*this.stem_direction,s=q+p*this.stem_direction;f.setStem(new Vex.Flow.Stem({x_begin:m,x_end:m,y_bottom:1===this.stem_direction?s:r,y_top:1===this.stem_direction?r:s,y_extend:k,stem_extension:-1,stem_direction:this.stem_direction}))}}},getBeamLines:function(a){function b(b,c){var d=0;c&&b&&(d=b.getBeamCount()-c.getBeamCount());var e="8"!==a&&d>0,f="8"!==a&&0>d;return{left:e,right:f}}for(var c,d=[],e=!1,f=this.render_options.partial_beam_length,g=0;g<this.notes.length;++g){var h=this.notes[g],i=this.notes[g-1],j=this.notes[g+1],k=h.getIntrinsicTicks(),l=b(i,j),m=h.isRest()?h.getCenterGlyphX():h.getStemX();if(k<Vex.Flow.durationToTicks(a))if(e){c=d[d.length-1],c.end=m;var n=-1!==this.break_on_indices.indexOf(g),o=parseInt(a,10)>=8;n&&o&&(e=!1)}else{var p={start:m,end:null};l.left&&(p.end=m-f),d.push(p),e=!0}else e&&(c=d[d.length-1],null==c.end&&(c.end=c.start+f)),e=!1}return e===!0&&(c=d[d.length-1],null==c.end&&(c.end=c.start-f)),d},drawStems:function(){this.notes.forEach(function(a){a.getStem()&&a.getStem().setContext(this.context).draw()},this)},drawBeamLines:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");for(var a=["4","8","16","32","64"],b=this.notes[0],d=this.notes[this.notes.length-1],e=b.getStemExtents().topY,f=d.getStemExtents().topY,g=b.getStemX(),h=this.render_options.beam_width*this.stem_direction,i=0;i<a.length;++i){for(var j=a[i],k=this.getBeamLines(j),l=0;l<k.length;++l){var m=k[l],n=m.start-(this.stem_direction==c.DOWN?Vex.Flow.STEM_WIDTH/2:0),o=this.getSlopeY(n,g,e,this.slope),p=m.end+(1==this.stem_direction?Vex.Flow.STEM_WIDTH/3:-Vex.Flow.STEM_WIDTH/3),q=this.getSlopeY(p,g,e,this.slope);this.context.beginPath(),this.context.moveTo(n,o+this.y_shift),this.context.lineTo(n,o+h+this.y_shift),this.context.lineTo(p+1,q+h+this.y_shift),this.context.lineTo(p+1,q+this.y_shift),this.context.closePath(),this.context.fill()}e+=1.5*h,f+=1.5*h}},preFormat:function(){return this},postFormat:function(){this.postFormatted||(this.calculateSlope(),this.applyStemExtensions(),this.postFormatted=!0)},draw:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");if(!this.unbeamable)return this.postFormatted||this.postFormat(),this.drawStems(),this.drawBeamLines(),!0}},a.getDefaultBeamGroups=function(a){a&&"c"!=a||(a="4/4");var b={"1/2":["1/2"],"2/2":["1/2"],"3/2":["1/2"],"4/2":["1/2"],"1/4":["1/4"],"2/4":["1/4"],"3/4":["1/4"],"4/4":["1/4"],"1/8":["1/8"],"2/8":["2/8"],"3/8":["3/8"],"4/8":["2/8"],"1/16":["1/16"],"2/16":["2/16"],"3/16":["3/16"],"4/16":["2/16"]},c=Vex.Flow.Fraction,d=b[a];if(d)return d.map(function(a){return(new c).parse(a)});var e=parseInt(a.split("/")[0],10),f=parseInt(a.split("/")[1],10),g=e%3===0;return g?[new c(3,f)]:f>4?[new c(2,f)]:4>=f?[new c(1,f)]:void 0},a.applyAndGetBeams=function(b,c,d){return a.generateBeams(b.getTickables(),{groups:d,stem_direction:c})},a.generateBeams=function(a,d){function e(a){return a.reduce(function(a,b){return b.getTicks().clone().add(a)},new Vex.Flow.Fraction(0,1))}function f(){n.length-1>p?p+=1:p=0}function g(){var a=[];o.forEach(function(b){if(a=[],b.shouldIgnoreTicks())return q.push(r),void(r=a);r.push(b);var c=n[p].clone(),d=e(r),g=Vex.Flow.durationToNumber(b.duration)<8;g&&b.tuplet&&(c.numerator*=2),d.greaterThan(c)?(g||a.push(r.pop()),q.push(r),r=a,f()):d.equals(c)&&(q.push(r),r=a,f())}),r.length>0&&q.push(r)}function h(){return q.filter(function(a){if(a.length>1){var b=!0;return a.forEach(function(a){a.getIntrinsicTicks()>=Vex.Flow.durationToTicks("4")&&(b=!1)}),b}return!1})}function i(){var a=[];q.forEach(function(b){var c=[];b.forEach(function(b,e,f){var g=0===e||e===f.length-1,h=f[e-1],i=!d.beam_rests&&b.isRest(),j=d.beam_rests&&d.beam_middle_only&&b.isRest()&&g,k=!1;if(d.maintain_stem_directions&&h&&!b.isRest()&&!h.isRest()){var l=h.getStemDirection(),m=b.getStemDirection();k=m!==l}var n=parseInt(b.duration,10)<8,o=i||j||k||n;o?(c.length>0&&a.push(c),c=k?[b]:[]):c.push(b)}),c.length>0&&a.push(c)}),q=a}function j(){q.forEach(function(a){var e;if(d.maintain_stem_directions){var f=k(a);e=f?f.getStemDirection():c.UP}else e=d.stem_direction?d.stem_direction:b(a);l(a,e)})}function k(a){for(var b=0;b<a.length;b++){var c=a[b];if(!c.isRest())return c}return!1}function l(a,b){a.forEach(function(a){a.setStemDirection(b)})}function m(){return q.filter(function(a){return a[0]?a[0].tuplet:void 0})}d||(d={}),d.groups&&d.groups.length||(d.groups=[new Vex.Flow.Fraction(2,8)]);var n=d.groups.map(function(a){if(!a.multiply)throw new Vex.RuntimeError("InvalidBeamGroups","The beam groups must be an array of Vex.Flow.Fractions");return a.clone().multiply(Vex.Flow.RESOLUTION,1)}),o=a,p=0,q=[],r=[];g(),i(),j();var s=h(),t=m(),u=[];return s.forEach(function(a){var b=new Vex.Flow.Beam(a);d.show_stemlets&&(b.render_options.show_stemlets=!0),u.push(b)}),t.forEach(function(a){for(var b=a[0],d=0;d<a.length;++d)if(a[d].hasStem()){b=a[d];break}var e=b.tuplet;b.beam&&e.setBracketed(!1),b.stem_direction==c.DOWN&&e.setTupletLocation(Vex.Flow.Tuplet.LOCATION_BOTTOM)}),u},a}(),Vex.Flow.Voice=function(){function a(a){arguments.length>0&&this.init(a)}return a.Mode={STRICT:1,SOFT:2,FULL:3},a.prototype={init:function(a){this.time=Vex.Merge({num_beats:4,beat_value:4,resolution:Vex.Flow.RESOLUTION},a),this.totalTicks=new Vex.Flow.Fraction(this.time.num_beats*(this.time.resolution/this.time.beat_value),1),this.resolutionMultiplier=1,this.tickables=[],this.ticksUsed=new Vex.Flow.Fraction(0,1),this.smallestTickCount=this.totalTicks.clone(),this.largestTickWidth=0,this.stave=null,this.boundingBox=null,this.mode=Vex.Flow.Voice.Mode.STRICT,this.voiceGroup=null},getTotalTicks:function(){return this.totalTicks},getTicksUsed:function(){return this.ticksUsed},getLargestTickWidth:function(){return this.largestTickWidth},getSmallestTickCount:function(){return this.smallestTickCount},getTickables:function(){return this.tickables},getMode:function(){return this.mode},setMode:function(a){return this.mode=a,this},getResolutionMultiplier:function(){return this.resolutionMultiplier},getActualResolution:function(){return this.resolutionMultiplier*this.time.resolution},setStave:function(a){return this.stave=a,this.boundingBox=null,this
},getBoundingBox:function(){var a,b,c,d;if(!this.boundingBox){if(!this.stave)throw Vex.RERR("NoStave","Can't get bounding box without stave.");for(a=this.stave,b=null,d=0;d<this.tickables.length;++d)this.tickables[d].setStave(a),c=this.tickables[d].getBoundingBox(),c&&(b=b?b.mergeWith(c):c);this.boundingBox=b}return this.boundingBox},getVoiceGroup:function(){if(!this.voiceGroup)throw new Vex.RERR("NoVoiceGroup","No voice group for voice.");return this.voiceGroup},setVoiceGroup:function(a){return this.voiceGroup=a,this},setStrict:function(a){return this.mode=a?Vex.Flow.Voice.Mode.STRICT:Vex.Flow.Voice.Mode.SOFT,this},isComplete:function(){return this.mode==Vex.Flow.Voice.Mode.STRICT||this.mode==Vex.Flow.Voice.Mode.FULL?this.ticksUsed.equals(this.totalTicks):!0},addTickable:function(a){if(!a.shouldIgnoreTicks()){var b=a.getTicks();if(this.ticksUsed.add(b),(this.mode==Vex.Flow.Voice.Mode.STRICT||this.mode==Vex.Flow.Voice.Mode.FULL)&&this.ticksUsed.greaterThan(this.totalTicks))throw this.totalTicks.subtract(b),new Vex.RERR("BadArgument","Too many ticks.");b.lessThan(this.smallestTickCount)&&(this.smallestTickCount=b.clone()),this.resolutionMultiplier=this.ticksUsed.denominator,this.totalTicks.add(0,this.ticksUsed.denominator)}return this.tickables.push(a),a.setVoice(this),this},addTickables:function(a){for(var b=0;b<a.length;++b)this.addTickable(a[b]);return this},preFormat:function(){return this.preFormatted?void 0:(this.tickables.forEach(function(a){a.getStave()||a.setStave(this.stave)},this),this.preFormatted=!0,this)},draw:function(a,b){for(var c=null,d=0;d<this.tickables.length;++d){var e=this.tickables[d];if(b&&e.setStave(b),!e.getStave())throw new Vex.RuntimeError("MissingStave","The voice cannot draw tickables without staves.");if(0===d&&(c=e.getBoundingBox()),d>0&&c){var f=e.getBoundingBox();f&&c.mergeWith(f)}e.setContext(a),e.draw()}this.boundingBox=c}},a}(),Vex.Flow.VoiceGroup=function(){function a(){this.init()}return a.prototype={init:function(){this.voices=[],this.modifierContexts=[]},getVoices:function(){return this.voices},getModifierContexts:function(){return this.modifierContexts},addVoice:function(a){if(!a)throw new Vex.RERR("BadArguments","Voice cannot be null.");this.voices.push(a),a.setVoiceGroup(this)}},a}(),Vex.Flow.Modifier=function(){function a(){this.constructor=a,this.init()}function b(){a.DEBUG&&Vex.L("Vex.Flow.Modifier",arguments)}return a.CATEGORY="none",a.Position={LEFT:1,RIGHT:2,ABOVE:3,BELOW:4},a.prototype={init:function(){this.width=0,this.context=null,this.note=null,this.index=null,this.text_line=0,this.position=a.Position.LEFT,this.modifier_context=null,this.x_shift=0,this.y_shift=0,b("Created new modifier")},getCategory:function(){return this.constructor.CATEGORY},getWidth:function(){return this.width},setWidth:function(a){return this.width=a,this},getNote:function(){return this.note},setNote:function(a){return this.note=a,this},getIndex:function(){return this.index},setIndex:function(a){return this.index=a,this},getContext:function(){return this.context},setContext:function(a){return this.context=a,this},getModifierContext:function(){return this.modifier_context},setModifierContext:function(a){return this.modifier_context=a,this},getPosition:function(){return this.position},setPosition:function(a){return this.position=a,this},setTextLine:function(a){return this.text_line=a,this},setYShift:function(a){return this.y_shift=a,this},setXShift:function(b){this.x_shift=0,this.position==a.Position.LEFT?this.x_shift-=b:this.x_shift+=b},draw:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");throw new Vex.RERR("MethodNotImplemented","Draw() not implemented for this modifier.")}},a}(),Vex.Flow.ModifierContext=function(){function a(){this.modifiers={},this.preFormatted=!1,this.postFormatted=!1,this.width=0,this.spacing=0,this.state={left_shift:0,right_shift:0,text_line:0},this.PREFORMAT=[Vex.Flow.StaveNote,Vex.Flow.Dot,Vex.Flow.FretHandFinger,Vex.Flow.Accidental,Vex.Flow.GraceNoteGroup,Vex.Flow.Stroke,Vex.Flow.StringNumber,Vex.Flow.Articulation,Vex.Flow.Ornament,Vex.Flow.Annotation,Vex.Flow.Bend,Vex.Flow.Vibrato],this.POSTFORMAT=[Vex.Flow.StaveNote]}function b(){a.DEBUG&&Vex.L("Vex.Flow.ModifierContext",arguments)}return a.prototype={addModifier:function(a){var b=a.getCategory();return this.modifiers[b]||(this.modifiers[b]=[]),this.modifiers[b].push(a),a.setModifierContext(this),this.preFormatted=!1,this},getModifiers:function(a){return this.modifiers[a]},getWidth:function(){return this.width},getExtraLeftPx:function(){return this.state.left_shift},getExtraRightPx:function(){return this.state.right_shift},getState:function(){return this.state},getMetrics:function(){if(!this.formatted)throw new Vex.RERR("UnformattedModifier","Unformatted modifier has no metrics.");return{width:this.state.left_shift+this.state.right_shift+this.spacing,spacing:this.spacing,extra_left_px:this.state.left_shift,extra_right_px:this.state.right_shift}},preFormat:function(){this.preFormatted||(this.PREFORMAT.forEach(function(a){b("Preformatting ModifierContext: ",a.CATEGORY),a.format(this.getModifiers(a.CATEGORY),this.state,this)},this),this.width=this.state.left_shift+this.state.right_shift,this.preFormatted=!0)},postFormat:function(){this.postFormatted||this.POSTFORMAT.forEach(function(a){b("Postformatting ModifierContext: ",a.CATEGORY),a.postFormat(this.getModifiers(a.CATEGORY),this)},this)}},a}(),Vex.Flow.Accidental=function(){function a(a){arguments.length>0&&this.init(a)}function b(){a.DEBUG&&Vex.L("Vex.Flow.Accidental",arguments)}a.CATEGORY="accidentals";var c=Vex.Flow.Modifier;return a.format=function(a,c){var d=c.left_shift,e=2;if(!a||0===a.length)return!1;var f,g,h,i=[],j=!1,k=null,l=0;for(f=0;f<a.length;++f){g=a[f];var m=g.getNote(),n=m.getStave(),o=m.getKeyProps()[g.getIndex()];if(m!=k){for(var p=0;p<m.keys.length;++p)h=m.getKeyProps()[p],l=h.displaced?m.getExtraLeftPx():l;k=m}if(null!==n){j=!0;var q=n.options.spacing_between_lines_px,r=n.getYForLine(o.line),s=Math.round(r/q*2)/2;i.push({y:r,line:s,shift:l,acc:g,lineSpace:q})}else i.push({line:o.line,shift:l,acc:g})}i.sort(function(a,b){return b.line-a.line});var t=[],u=0,v=null;for(f=0;f<i.length;f++)g=i[f],(null===v||v!=g.line)&&t.push({line:g.line,flat_line:!0,dbl_sharp_line:!0,num_acc:0,width:0}),"b"!=g.acc.type&&"bb"!=g.acc.type&&(t[t.length-1].flat_line=!1),"##"!=g.acc.type&&(t[t.length-1].dbl_sharp_line=!1),t[t.length-1].num_acc++,t[t.length-1].width+=g.acc.getWidth()+e,u=g.shift>u?g.shift:u,v=g.line;var w=0;for(f=0;f<t.length;f++){for(var x=!1,y=f,z=f;z+1<t.length&&!x;)this.checkCollision(t[z],t[z+1])?z++:x=!0;var A=z-y+1,B=this.checkCollision(t[y],t[z])?"a":"b",C=this.checkCollision;switch(A){case 3:"a"==B&&t[y+1].line-t[y+2].line==.5&&t[y].line-t[y+1].line!=.5&&(B="second_on_bottom");break;case 4:C(t[y],t[y+2])||C(t[y+1],t[y+3])||(B="spaced_out_tetrachord");break;case 5:"b"!=B||C(t[y+1],t[y+3])||(B="spaced_out_pentachord"),"spaced_out_pentachord"!=B||C(t[y],t[y+2])||C(t[y+2],t[y+4])||(B="very_spaced_out_pentachord");break;case 6:C(t[y],t[y+3])||C(t[y+1],t[y+4])||C(t[y+2],t[y+5])||(B="spaced_out_hexachord"),C(t[y],t[y+2])||C(t[y+2],t[y+4])||C(t[y+1],t[y+3])||C(t[y+3],t[y+5])||(B="very_spaced_out_hexachord")}var D,E;if(A>=7){for(var F=2,G=!0;G===!0;){G=!1;a:for(var H=0;H+F<t.length;H++)if(this.checkCollision(t[H],t[H+F])){G=!0,F++;break a}}for(D=f;z>=D;D++)E=(D-f)%F+1,t[D].column=E,w=w>E?w:E}else for(D=f;z>=D;D++)E=Vex.Flow.accidentalColumnsTable[A][B][D-f],t[D].column=E,w=w>E?w:E;f=z}var I=[],J=[];for(f=0;w>=f;f++)I[f]=0,J[f]=0;for(I[0]=u+d,J[0]=u+d,t.forEach(function(a){a.width>I[a.column]&&(I[a.column]=a.width)}),f=1;f<I.length;f++)J[f]=I[f]+J[f-1];var K=0;t.forEach(function(a){var c=0,d=K+a.num_acc;for(K;d>K;K++){var f=J[a.column-1]+c;i[K].acc.setXShift(f),c+=i[K].acc.getWidth()+e,b("Line, acc_count, shift: ",a.line,K,f)}}),c.left_shift+=J[J.length-1]},a.checkCollision=function(a,c){var d=c.line-a.line,e=3;d>0?(e=c.flat_line||c.dbl_sharp_line?2.5:3,a.dbl_sharp_line&&(d-=.5)):(e=a.flat_line||a.dbl_sharp_line?2.5:3,c.dbl_sharp_line&&(d-=.5));var f=Math.abs(d)<e;return b("Line_1, Line_2, Collision: ",a.line,c.line,f),f},Vex.Inherit(a,c,{init:function(d){if(a.superclass.init.call(this),b("New accidental: ",d),this.note=null,this.index=null,this.type=d,this.position=c.Position.LEFT,this.render_options={font_scale:38,stroke_px:3},this.accidental=Vex.Flow.accidentalCodes(this.type),!this.accidental)throw new Vex.RERR("ArgumentError","Unknown accidental type: "+d);this.cautionary=!1,this.paren_left=null,this.paren_right=null,this.setWidth(this.accidental.width)},setNote:function(a){if(!a)throw new Vex.RERR("ArgumentError","Bad note value: "+a);this.note=a,"gracenotes"===this.note.getCategory()&&(this.render_options.font_scale=25,this.setWidth(this.accidental.gracenote_width))},setAsCautionary:function(){this.cautionary=!0,this.render_options.font_scale=28,this.paren_left=Vex.Flow.accidentalCodes("{"),this.paren_right=Vex.Flow.accidentalCodes("}");var a="##"==this.type||"bb"==this.type?6:4;return this.setWidth(this.paren_left.width+this.accidental.width+this.paren_right.width-a),this},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw accidental without a context.");if(!this.note||null==this.index)throw new Vex.RERR("NoAttachedNote","Can't draw accidental without a note and index.");var a=this.note.getModifierStartXY(this.position,this.index),c=a.x+this.x_shift-this.width,d=a.y+this.y_shift;b("Rendering: ",this.type,c,d),this.cautionary?(c+=3,Vex.Flow.renderGlyph(this.context,c,d,this.render_options.font_scale,this.paren_left.code),c+=2,Vex.Flow.renderGlyph(this.context,c,d,this.render_options.font_scale,this.accidental.code),c+=this.accidental.width-2,("##"==this.type||"bb"==this.type)&&(c-=2),Vex.Flow.renderGlyph(this.context,c,d,this.render_options.font_scale,this.paren_right.code)):Vex.Flow.renderGlyph(this.context,c,d,this.render_options.font_scale,this.accidental.code)}}),a.applyAccidentals=function(a,b){var c=[],d={};a.forEach(function(a){var b=new Vex.Flow.Fraction(0,1),e=a.getTickables();e.forEach(function(a){var e=d[b.value()];e?e.push(a):(c.push(b.value()),d[b.value()]=[a]),b.add(a.getTicks())})});var e=new Vex.Flow.Music;b||(b="C");var f=e.createScaleMap(b);c.forEach(function(a){var b=d[a],c=[];b.forEach(function(a){a.isRest()||a.keys.forEach(function(b,d){var g=e.getNoteParts(b.split("/")[0]),h=g.accidental||"n",i=g.root+h,j=f[g.root]===i,k=c.indexOf(i)>-1;if(!j||j&&k){f[g.root]=i;var l=new Vex.Flow.Accidental(h);a.addAccidental(d,l),c.push(i)}})})})},a}(),Vex.Flow.Dot=function(){function a(){this.init()}a.CATEGORY="dots";var b=Vex.Flow.Modifier;return a.format=function(a,b){var c=b.right_shift,d=1;if(!a||0===a.length)return!1;var e,f,g,h,i=[];for(e=0;e<a.length;++e){f=a[e],g=f.getNote();var j;"function"==typeof g.getKeyProps?(j=g.getKeyProps()[f.getIndex()],h=j.displaced?g.getExtraRightPx():0):(j={line:.5},h=0),i.push({line:j.line,shift:h,note:g,dot:f})}i.sort(function(a,b){return b.line-a.line});var k=c,l=0,m=null,n=null,o=null,p=0;for(e=0;e<i.length;++e){f=i[e].dot,g=i[e].note,h=i[e].shift;var q=i[e].line;(q!=m||g!=n)&&(k=h),g.isRest()||q==m||(.5==Math.abs(q%1)?p=0:g.isRest()||(p=.5,null==n||n.isRest()||m-q!=.5?q+p==o&&(p=-.5):p=-.5)),f.dot_shiftY+=-p,o=q+p,f.setXShift(k),k+=f.getWidth()+d,l=k>l?k:l,m=q,n=g}b.right_shift+=l},Vex.Inherit(a,b,{init:function(){a.superclass.init.call(this),this.note=null,this.index=null,this.position=b.Position.RIGHT,this.radius=2,this.setWidth(5),this.dot_shiftY=0},setNote:function(a){this.note=a,"gracenotes"===this.note.getCategory()&&(this.radius*=.5,this.setWidth(3))},setDotShiftY:function(a){return this.dot_shiftY=a,this},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw dot without a context.");if(!this.note||null==this.index)throw new Vex.RERR("NoAttachedNote","Can't draw dot without a note and index.");var a=this.note.stave.options.spacing_between_lines_px,b=this.note.getModifierStartXY(this.position,this.index);"tabnotes"===this.note.getCategory()&&(b.y=this.note.getStemExtents().baseY);var c=b.x+this.x_shift+this.width-this.radius,d=b.y+this.y_shift+this.dot_shiftY*a,e=this.context;e.beginPath(),e.arc(c,d,this.radius,0,2*Math.PI,!1),e.fill()}}),a}(),Vex.Flow.Formatter=function(){function a(){this.minTotalWidth=0,this.hasMinTotalWidth=!1,this.pixelsPerTick=0,this.totalTicks=new Vex.Flow.Fraction(0,1),this.tContexts=null,this.mContexts=null}function b(){a.DEBUG&&Vex.L("Vex.Flow.Formatter",arguments)}function c(a,b,c,d){var e=b;for(c++;c<a.length;){if(!a[c].isRest()&&!a[c].shouldIgnoreTicks()){e=a[c].getLineForRest();break}c++}if(d&&b!=e){var f=Vex.Max(b,e),g=Vex.Min(b,e);e=Vex.MidLine(f,g)}return e}function d(a,b,c){if(!a||!a.length)throw new Vex.RERR("BadArgument","No voices to format");var d,e,f=a[0].getTotalTicks(),g={},h=[],i=[],j=1;for(d=0;d<a.length;++d){if(e=a[d],!e.getTotalTicks().equals(f))throw new Vex.RERR("TickMismatch","Voices should have same total note duration in ticks.");if(e.getMode()==Vex.Flow.Voice.Mode.STRICT&&!e.isComplete())throw new Vex.RERR("IncompleteVoice","Voice does not have enough notes.");var k=Vex.Flow.Fraction.LCM(j,e.getResolutionMultiplier());k>j&&(j=k)}for(d=0;d<a.length;++d){e=a[d];for(var l=e.getTickables(),m=new Vex.Flow.Fraction(0,j),n=0;n<l.length;++n){var o=l[n],p=m.numerator;if(!g[p]){var q=new b;i.push(q),g[p]=q}c(o,g[p]),h.push(p),m.add(o.getTicks())}}return{map:g,array:i,list:Vex.SortAndUnique(h,function(a,b){return a-b},function(a,b){return a===b}),resolutionMultiplier:j}}return a.FormatAndDraw=function(b,c,d,e){var f={auto_beam:!1,align_rests:!1};"object"==typeof e?Vex.Merge(f,e):"boolean"==typeof e&&(f.auto_beam=e);var g=new Vex.Flow.Voice(Vex.Flow.TIME4_4).setMode(Vex.Flow.Voice.Mode.SOFT);g.addTickables(d);var h=null;if(f.auto_beam&&(h=Vex.Flow.Beam.applyAndGetBeams(g)),(new a).joinVoices([g],{align_rests:f.align_rests}).formatToStave([g],c,{align_rests:f.align_rests}),g.setStave(c),g.draw(b,c),null!=h)for(var i=0;i<h.length;++i)h[i].setContext(b).draw();return g.getBoundingBox()},a.FormatAndDrawTab=function(b,c,d,e,f,g,h){var i={auto_beam:g,align_rests:!1};"object"==typeof h?Vex.Merge(i,h):"boolean"==typeof h&&(i.auto_beam=h);var j=new Vex.Flow.Voice(Vex.Flow.TIME4_4).setMode(Vex.Flow.Voice.Mode.SOFT);j.addTickables(f);var k=new Vex.Flow.Voice(Vex.Flow.TIME4_4).setMode(Vex.Flow.Voice.Mode.SOFT);k.addTickables(e);var l=null;if(i.auto_beam&&(l=Vex.Flow.Beam.applyAndGetBeams(j)),(new a).joinVoices([j],{align_rests:i.align_rests}).joinVoices([k]).formatToStave([j,k],d,{align_rests:i.align_rests}),j.draw(b,d),k.draw(b,c),null!=l)for(var m=0;m<l.length;++m)l[m].setContext(b).draw();new Vex.Flow.StaveConnector(d,c).setContext(b).draw()},a.AlignRestsToNotes=function(a,b,d){for(var e=0;e<a.length;++e)if(a[e]instanceof Vex.Flow.StaveNote&&a[e].isRest()){var f=a[e];if(f.tuplet&&!d)continue;var g=f.getGlyph().position.toUpperCase();if("R/4"!=g&&"B/4"!=g)continue;if(b||null!=f.beam){var h=f.getKeyProps()[0];if(0===e)h.line=c(a,h.line,e,!1),f.setKeyLine(0,h.line);else if(e>0&&e<a.length){var i;a[e-1].isRest()?(i=a[e-1].getKeyProps()[0].line,h.line=i):(i=a[e-1].getLineForRest(),h.line=c(a,i,e,!0)),f.setKeyLine(0,h.line)}}}return this},a.prototype={alignRests:function(b,c){if(!b||!b.length)throw new Vex.RERR("BadArgument","No voices to format rests");for(var d=0;d<b.length;d++)new a.AlignRestsToNotes(b[d].tickables,c)},preCalculateMinTotalWidth:function(a){if(!this.hasMinTotalWidth){if(!this.tContexts){if(!a)throw new Vex.RERR("BadArgument","'voices' required to run preCalculateMinTotalWidth");this.createTickContexts(a)}var b=this.tContexts,c=b.list,d=b.map;this.minTotalWidth=0;for(var e=0;e<c.length;++e){var f=d[c[e]];f.preFormat(),this.minTotalWidth+=f.getWidth()}return this.hasMinTotalWidth=!0,this.minTotalWidth}},getMinTotalWidth:function(){if(!this.hasMinTotalWidth)throw new Vex.RERR("NoMinTotalWidth","Need to call 'preCalculateMinTotalWidth' or 'preFormat' before calling 'getMinTotalWidth'");return this.minTotalWidth},createModifierContexts:function(a){var b=d(a,Vex.Flow.ModifierContext,function(a,b){a.addToModifierContext(b)});return this.mContexts=b,b},createTickContexts:function(a){var b=d(a,Vex.Flow.TickContext,function(a,b){b.addTickable(a)});return b.array.forEach(function(a){a.tContexts=b.array}),this.totalTicks=a[0].getTicksUsed().clone(),this.tContexts=b,b},preFormat:function(a,b,c,d){var e=this.tContexts,f=e.list,g=e.map;c&&d&&c.forEach(function(a){a.setStave(d),a.preFormat()}),a?this.pixelsPerTick=a/(this.totalTicks.value()*e.resolutionMultiplier):(a=0,this.pixelsPerTick=0);var h=0,i=a/2,j=0,k=0,l=0,m=0,n=null,o=a;this.minTotalWidth=0;var p,q,r;for(p=0;p<f.length;++p){q=f[p],r=g[q],b&&r.setContext(b),r.preFormat();var s=r.getMetrics(),t=r.getWidth();this.minTotalWidth+=t;var u=0,v=t;k=Math.min((q-l)*this.pixelsPerTick,v);var w=h+k;null!=n&&(u=h+m-n.extraLeftPx),w=r.shouldIgnoreTicks()?u+r.getWidth():Math.max(w,u),r.shouldIgnoreTicks()&&a&&(a-=r.getWidth(),this.pixelsPerTick=a/(this.totalTicks.value()*e.resolutionMultiplier));var x=s.extraLeftPx;null!=n&&(j=w-h-(m-n.extraLeftPx)),p>0&&j>0&&(j>=x?x=0:x-=j),w+=x,r.setX(w),r.setPixelsUsed(v),n=s,m=t,l=q,h=w}if(this.hasMinTotalWidth=!0,a>0){var y=o-(h+m),z=y/(this.totalTicks.value()*e.resolutionMultiplier),A=0;l=0;var B=function(a){a.center_x_shift=i-r.getX()};for(p=0;p<f.length;++p){q=f[p],r=g[q],k=(q-l)*z,A+=k,r.setX(r.getX()+A),l=q;var C=r.getCenterAlignedTickables();C.forEach(B)}}},postFormat:function(){return this.mContexts.list.forEach(function(a){this.mContexts.map[a].postFormat()},this),this.tContexts.list.forEach(function(a){this.tContexts.map[a].postFormat()},this),this},joinVoices:function(a){return this.createModifierContexts(a),this.hasMinTotalWidth=!1,this},format:function(a,b,c){var d={align_rests:!1,context:null,stave:null};return Vex.Merge(d,c),this.alignRests(a,d.align_rests),this.createTickContexts(a),this.preFormat(b,d.context,a,d.stave),d.stave&&this.postFormat(),this},formatToStave:function(a,c,d){var e=c.getNoteEndX()-c.getNoteStartX()-10;b("Formatting voices to width: ",e);var f={context:c.getContext()};return Vex.Merge(f,d),this.format(a,e,f)}},a}(),Vex.Flow.StaveTie=function(){function a(a,b){arguments.length>0&&this.init(a,b)}return a.prototype={init:function(a,b){this.notes=a,this.context=null,this.text=b,this.render_options={cp1:8,cp2:12,text_shift_x:0,first_x_shift:0,last_x_shift:0,y_shift:7,tie_spacing:0,font:{family:"Arial",size:10,style:""}},this.font=this.render_options.font,this.setNotes(a)},setContext:function(a){return this.context=a,this},setFont:function(a){return this.font=a,this},setNotes:function(a){if(!a.first_note&&!a.last_note)throw new Vex.RuntimeError("BadArguments","Tie needs to have either first_note or last_note set.");if(a.first_indices||(a.first_indices=[0]),a.last_indices||(a.last_indices=[0]),a.first_indices.length!=a.last_indices.length)throw new Vex.RuntimeError("BadArguments","Tied notes must have similar index sizes");return this.first_note=a.first_note,this.first_indices=a.first_indices,this.last_note=a.last_note,this.last_indices=a.last_indices,this},isPartial:function(){return!this.first_note||!this.last_note},renderTie:function(a){if(0===a.first_ys.length||0===a.last_ys.length)throw new Vex.RERR("BadArguments","No Y-values to render");var b=this.context,c=this.render_options.cp1,d=this.render_options.cp2;Math.abs(a.last_x_px-a.first_x_px)<10&&(c=2,d=8);for(var e=this.render_options.first_x_shift,f=this.render_options.last_x_shift,g=this.render_options.y_shift*a.direction,h=0;h<this.first_indices.length;++h){var i=(a.last_x_px+f+(a.first_x_px+e))/2,j=a.first_ys[this.first_indices[h]]+g,k=a.last_ys[this.last_indices[h]]+g;if(isNaN(j)||isNaN(k))throw new Vex.RERR("BadArguments","Bad indices for tie rendering.");var l=(j+k)/2+c*a.direction,m=(j+k)/2+d*a.direction;b.beginPath(),b.moveTo(a.first_x_px+e,j),b.quadraticCurveTo(i,l,a.last_x_px+f,k),b.quadraticCurveTo(i,m,a.first_x_px+e,j),b.closePath(),b.fill()}},renderText:function(a,b){if(this.text){var c=(a+b)/2;c-=this.context.measureText(this.text).width/2,this.context.save(),this.context.setFont(this.font.family,this.font.size,this.font.style),this.context.fillText(this.text,c+this.render_options.text_shift_x,(this.first_note||this.last_note).getStave().getYForTopText()-1),this.context.restore()}},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","No context to render tie.");var a,b,c,d,e,f=this.first_note,g=this.last_note;return f?(a=f.getTieRightX()+this.render_options.tie_spacing,e=f.getStemDirection(),c=f.getYs()):(a=g.getStave().getTieStartX(),c=g.getYs(),this.first_indices=this.last_indices),g?(b=g.getTieLeftX()+this.render_options.tie_spacing,e=g.getStemDirection(),d=g.getYs()):(b=f.getStave().getTieEndX(),d=f.getYs(),this.last_indices=this.first_indices),this.renderTie({first_x_px:a,last_x_px:b,first_ys:c,last_ys:d,direction:e}),this.renderText(a,b),!0}},a}(),Vex.Flow.TabTie=function(){function a(a,b){arguments.length>0&&this.init(a,b)}return a.createHammeron=function(b){return new a(b,"H")},a.createPulloff=function(b){return new a(b,"P")},Vex.Inherit(a,Vex.Flow.StaveTie,{init:function(b,c){a.superclass.init.call(this,b,c),this.render_options.cp1=9,this.render_options.cp2=11,this.render_options.y_shift=3,this.setNotes(b)},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","No context to render tie.");var a,b,c,d,e=this.first_note,f=this.last_note;return e?(a=e.getTieRightX()+this.render_options.tie_spacing,c=e.getYs()):(a=f.getStave().getTieStartX(),c=f.getYs(),this.first_indices=this.last_indices),f?(b=f.getTieLeftX()+this.render_options.tie_spacing,d=f.getYs()):(b=e.getStave().getTieEndX(),d=e.getYs(),this.last_indices=this.first_indices),this.renderTie({first_x_px:a,last_x_px:b,first_ys:c,last_ys:d,direction:-1}),this.renderText(a,b),!0}}),a}(),Vex.Flow.TabSlide=function(){function a(a,b){arguments.length>0&&this.init(a,b)}return a.SLIDE_UP=1,a.SLIDE_DOWN=-1,a.createSlideUp=function(b){return new a(b,a.SLIDE_UP)},a.createSlideDown=function(b){return new a(b,a.SLIDE_DOWN)},Vex.Inherit(a,Vex.Flow.TabTie,{init:function(b,c){if(a.superclass.init.call(this,b,"sl."),!c){var d=b.first_note.getPositions()[0].fret,e=b.last_note.getPositions()[0].fret;c=parseInt(d,10)>parseInt(e,10)?a.SLIDE_DOWN:a.SLIDE_UP}this.slide_direction=c,this.render_options.cp1=11,this.render_options.cp2=14,this.render_options.y_shift=.5,this.setFont({font:"Times",size:10,style:"bold italic"}),this.setNotes(b)},renderTie:function(b){if(0===b.first_ys.length||0===b.last_ys.length)throw new Vex.RERR("BadArguments","No Y-values to render");var c=this.context,d=b.first_x_px,e=b.first_ys,f=b.last_x_px,g=this.slide_direction;if(g!=a.SLIDE_UP&&g!=a.SLIDE_DOWN)throw new Vex.RERR("BadSlide","Invalid slide direction");for(var h=0;h<this.first_indices.length;++h){var i=e[this.first_indices[h]]+this.render_options.y_shift;if(isNaN(i))throw new Vex.RERR("BadArguments","Bad indices for slide rendering.");c.beginPath(),c.moveTo(d,i+3*g),c.lineTo(f,i-3*g),c.closePath(),c.stroke()}}}),a}(),Vex.Flow.Bend=function(){function a(a,b,c){arguments.length>0&&this.init(a,b,c)}a.CATEGORY="bends",a.UP=0,a.DOWN=1;var b=Vex.Flow.Modifier;return a.format=function(a,b){if(!a||0===a.length)return!1;for(var c=0,d=b.text_line,e=0;e<a.length;++e){var f=a[e];f.setXShift(c),c=f.getWidth(),f.setTextLine(d)}return b.right_shift+=c,b.text_line+=1,!0},Vex.Inherit(a,b,{init:function(b,c,d){var e=Vex.Flow.Bend.superclass;e.init.call(this),this.text=b,this.x_shift=0,this.release=c||!1,this.font="10pt Arial",this.render_options={line_width:1.5,line_style:"#777777",bend_width:8,release_width:8},d?this.phrase=d:(this.phrase=[{type:a.UP,text:this.text}],this.release&&this.phrase.push({type:a.DOWN,text:""})),this.updateWidth()},setXShift:function(a){this.x_shift=a,this.updateWidth()},setFont:function(a){return this.font=a,this},getText:function(){return this.text},updateWidth:function(){function b(a){var b;return b=c.context?c.context.measureText(a).width:Vex.Flow.textWidth(a)}for(var c=this,d=0,e=0;e<this.phrase.length;++e){var f=this.phrase[e];if("width"in f)d+=f.width;else{var g=f.type==a.UP?this.render_options.bend_width:this.render_options.release_width;f.width=Vex.Max(g,b(f.text))+3,f.draw_width=f.width/2,d+=f.width}}return this.setWidth(d+this.x_shift),this},draw:function(){function c(a,b,c,d){var e=a+c,f=b;i.save(),i.beginPath(),i.setLineWidth(l.render_options.line_width),i.setStrokeStyle(l.render_options.line_style),i.setFillStyle(l.render_options.line_style),i.moveTo(a,b),i.quadraticCurveTo(e,f,a+c,d),i.stroke(),i.restore()}function d(a,b,c,d){i.save(),i.beginPath(),i.setLineWidth(l.render_options.line_width),i.setStrokeStyle(l.render_options.line_style),i.setFillStyle(l.render_options.line_style),i.moveTo(a,d),i.quadraticCurveTo(a+c,d,a+c,b),i.stroke(),i.restore()}function e(a,b,c){var d=4,e=c||1;i.beginPath(),i.moveTo(a,b),i.lineTo(a-d,b+d*e),i.lineTo(a+d,b+d*e),i.closePath(),i.fill()}function f(a,b){i.save(),i.setRawFont(l.font);var c=a-i.measureText(b).width/2;i.fillText(b,c,k),i.restore()}if(!this.context)throw new Vex.RERR("NoContext","Can't draw bend without a context.");if(!this.note||null==this.index)throw new Vex.RERR("NoNoteForBend","Can't draw bend without a note or index.");var g=this.note.getModifierStartXY(b.Position.RIGHT,this.index);g.x+=3,g.y+=.5;for(var h=this.x_shift,i=this.context,j=this.note.getStave().getYForTopText(this.text_line)+3,k=this.note.getStave().getYForTopText(this.text_line)-1,l=this,m=null,n=0,o=0;o<this.phrase.length;++o){var p=this.phrase[o];0===o&&(p.draw_width+=h),n=p.draw_width+(m?m.draw_width:0)-(1==o?h:0),p.type==a.UP&&(m&&m.type==a.UP&&e(g.x,j),c(g.x,g.y,n,j)),p.type==a.DOWN&&(m&&m.type==a.UP&&d(g.x,g.y,n,j),m&&m.type==a.DOWN&&(e(g.x,g.y,-1),d(g.x,g.y,n,j)),null==m&&(n=p.draw_width,d(g.x,g.y,n,j))),f(g.x+n,p.text),m=p,m.x=g.x,g.x+=n}m.type==a.UP?e(m.x+n,j):m.type==a.DOWN&&e(m.x+n,g.y,-1)}}),a}(),Vex.Flow.Vibrato=function(){function a(){this.init()}a.CATEGORY="vibratos";var b=Vex.Flow.Modifier;return a.format=function(a,b,c){if(!a||0===a.length)return!1;var d=b.text_line,e=0,f=b.right_shift-7,g=c.getModifiers(Vex.Flow.Bend.CATEGORY);g&&g.length>0&&d--;for(var h=0;h<a.length;++h){var i=a[h];i.setXShift(f),i.setTextLine(d),e+=i.getWidth(),f+=e}return b.right_shift+=e,b.text_line+=1,!0},Vex.Inherit(a,b,{init:function(){var a=Vex.Flow.Vibrato.superclass;a.init.call(this),this.harsh=!1,this.position=Vex.Flow.Modifier.Position.RIGHT,this.render_options={vibrato_width:20,wave_height:6,wave_width:4,wave_girth:2},this.setVibratoWidth(this.render_options.vibrato_width)},setHarsh:function(a){return this.harsh=a,this},setVibratoWidth:function(a){return this.vibrato_width=a,this.setWidth(this.vibrato_width),this},draw:function(){function a(a,b){var f=d.render_options.wave_width,g=d.render_options.wave_girth,h=d.render_options.wave_height,i=e/f;c.beginPath();var j;if(d.harsh){for(c.moveTo(a,b+g+1),j=0;i/2>j;++j)c.lineTo(a+f,b-h/2),a+=f,c.lineTo(a+f,b+h/2),a+=f;for(j=0;i/2>j;++j)c.lineTo(a-f,b-h/2+g+1),a-=f,c.lineTo(a-f,b+h/2+g+1),a-=f;c.fill()}else{for(c.moveTo(a,b+g),j=0;i/2>j;++j)c.quadraticCurveTo(a+f/2,b-h/2,a+f,b),a+=f,c.quadraticCurveTo(a+f/2,b+h/2,a+f,b),a+=f;for(j=0;i/2>j;++j)c.quadraticCurveTo(a-f/2,b+h/2+g,a-f,b+g),a-=f,c.quadraticCurveTo(a-f/2,b-h/2+g,a-f,b+g),a-=f;c.fill()}}if(!this.context)throw new Vex.RERR("NoContext","Can't draw vibrato without a context.");if(!this.note)throw new Vex.RERR("NoNoteForVibrato","Can't draw vibrato without an attached note.");var b=this.note.getModifierStartXY(Vex.Flow.Modifier.Position.RIGHT,this.index),c=this.context,d=this,e=this.vibrato_width,f=b.x+this.x_shift,g=this.note.getYForTopText(this.text_line)+2;a(f,g)}}),a}(),Vex.Flow.Annotation=function(){function a(a){arguments.length>0&&this.init(a)}function b(){a.DEBUG&&Vex.L("Vex.Flow.Annotation",arguments)}a.CATEGORY="annotations",a.Justify={LEFT:1,CENTER:2,RIGHT:3,CENTER_STEM:4},a.VerticalJustify={TOP:1,CENTER:2,BOTTOM:3,CENTER_STEM:4},a.format=function(a,b){if(!a||0===a.length)return!1;for(var c,d=b.text_line,e=0,f=0;f<a.length;++f){var g=a[f];g.setTextLine(d),c=g.getWidth()>e?g.getWidth():e,d++}return b.left_shift+=c/2,b.right_shift+=c/2,!0};var c=Vex.Flow.Modifier;return Vex.Inherit(a,c,{init:function(b){a.superclass.init.call(this),this.note=null,this.index=null,this.text_line=0,this.text=b,this.justification=a.Justify.CENTER,this.vert_justification=a.VerticalJustify.TOP,this.font={family:"Arial",size:10,weight:""},this.setWidth(Vex.Flow.textWidth(b))},setTextLine:function(a){return this.text_line=a,this},setFont:function(a,b,c){return this.font={family:a,size:b,weight:c},this},setVerticalJustification:function(a){return this.vert_justification=a,this},getJustification:function(){return this.justification},setJustification:function(a){return this.justification=a,this},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw text annotation without a context.");if(!this.note)throw new Vex.RERR("NoNoteForAnnotation","Can't draw text annotation without an attached note.");var d=this.note.getModifierStartXY(c.Position.ABOVE,this.index);this.context.save(),this.context.setFont(this.font.family,this.font.size,this.font.weight);var e,f,g=this.context.measureText(this.text).width,h=this.context.measureText("m").width;e=this.justification==a.Justify.LEFT?d.x:this.justification==a.Justify.RIGHT?d.x-g:this.justification==a.Justify.CENTER?d.x-g/2:this.note.getStemX()-g/2;var i,j,k=this.note.hasStem(),l=this.note.getStave();if(k&&(i=this.note.getStem().getExtents(),j=l.getSpacingBetweenLines()),this.vert_justification==a.VerticalJustify.BOTTOM){if(f=l.getYForBottomText(this.text_line),k){var m=1===this.note.getStemDirection()?i.baseY:i.topY;f=Math.max(f,m+j*(this.text_line+2))}}else if(this.vert_justification==a.VerticalJustify.CENTER){var n=this.note.getYForTopText(this.text_line)-1,o=l.getYForBottomText(this.text_line);f=n+(o-n)/2+h/2}else if(this.vert_justification==a.VerticalJustify.TOP)f=Math.min(l.getYForTopText(this.text_line),this.note.getYs()[0]-10),k&&(f=Math.min(f,i.topY-5-j*this.text_line));else{var p=this.note.getStemExtents();f=p.topY+(p.baseY-p.topY)/2+h/2}b("Rendering annotation: ",this.text,e,f),this.context.fillText(this.text,e,f),this.context.restore()}}),a}(),Vex.Flow.Articulation=function(){function a(a){arguments.length>0&&this.init(a)}function b(){a.DEBUG&&Vex.L("Vex.Flow.Articulation",arguments)}a.CATEGORY="articulations";var c=Vex.Flow.Modifier;return a.format=function(a,b){if(!a||0===a.length)return!1;for(var c,d=b.text_line,e=0,f=0;f<a.length;++f){var g=a[f];g.setTextLine(d),c=g.getWidth()>e?g.getWidth():e;var h=Vex.Flow.articulationCodes(g.type);d+=h.between_lines?1:1.5}return b.left_shift+=c/2,b.right_shift+=c/2,b.text_line=d,!0},Vex.Inherit(a,c,{init:function(b){if(a.superclass.init.call(this),this.note=null,this.index=null,this.type=b,this.position=c.Position.BELOW,this.render_options={font_scale:38},this.articulation=Vex.Flow.articulationCodes(this.type),!this.articulation)throw new Vex.RERR("ArgumentError","Articulation not found: '"+this.type+"'");this.setWidth(this.articulation.width)},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw Articulation without a context.");if(!this.note||null===this.index)throw new Vex.RERR("NoAttachedNote","Can't draw Articulation without a note and index.");var a=this.note.getStemDirection(),d=this.note.getStave(),e=this.position===c.Position.ABOVE&&a===Vex.Flow.StaveNote.STEM_DOWN||this.position===c.Position.BELOW&&a===Vex.Flow.StaveNote.STEM_UP,f=function(a,b,d){var f=a.position===c.Position.ABOVE?1:-1,g=a.getNote().getDuration();!e&&Vex.Flow.durationToNumber(g)<=1&&(b+=3.5*f);var h=b+f*d;return h>=1&&5>=h&&h%1===0?!0:!1},g=this.note.getModifierStartXY(this.position,this.index),h=g.y,i=0,j=1,k=d.getSpacingBetweenLines(),l="tabnotes"===this.note.getCategory(),m=this.note.getStem().getExtents(),n=m.topY,o=m.baseY;
a===Vex.Flow.StaveNote.STEM_DOWN&&(n=m.baseY,o=m.topY),l&&(this.note.hasStem()?a===Vex.Flow.StaveNote.STEM_UP?o=d.getYForBottomText(this.text_line-2):a===Vex.Flow.StaveNote.STEM_DOWN&&(n=d.getYForTopText(this.text_line-1.5)):(n=d.getYForTopText(this.text_line-1),o=d.getYForBottomText(this.text_line-2)));var p=this.position===c.Position.ABOVE?!0:!1,q=this.note.getLineNumber(p);!e&&this.note.beam&&(j+=.5),f(this,q,j)&&(j+=.5);var r;this.position===c.Position.ABOVE?(i=this.articulation.shift_up,r=n-7-k*(this.text_line+j),h=this.articulation.between_lines?r:Math.min(d.getYForTopText(this.text_line)-3,r)):(i=this.articulation.shift_down-10,r=o+10+k*(this.text_line+j),h=this.articulation.between_lines?r:Math.max(d.getYForBottomText(this.text_line),r));var s=g.x+this.articulation.shift_right;h+=i+this.y_shift,b("Rendering articulation: ",this.articulation,s,h),Vex.Flow.renderGlyph(this.context,s,h,this.render_options.font_scale,this.articulation.code),this.x=s,this.y=h}}),a}(),Vex.Flow.Tuning=function(){function a(a){this.init(a)}return a.names={standard:"E/5,B/4,G/4,D/4,A/3,E/3",dagdad:"D/5,A/4,G/4,D/4,A/3,D/3",dropd:"E/5,B/4,G/4,D/4,A/3,D/3",eb:"Eb/5,Bb/4,Gb/4,Db/4,Ab/3,Db/3"},a.prototype={init:function(a){this.setTuning(a||"E/5,B/4,G/4,D/4,A/3,E/3,B/2,E/2")},noteToInteger:function(a){return Vex.Flow.keyProperties(a).int_value},setTuning:function(a){Vex.Flow.Tuning.names[a]&&(a=Vex.Flow.Tuning.names[a]),this.tuningString=a,this.tuningValues=[],this.numStrings=0;var b=a.split(/\s*,\s*/);if(0===b.length)throw new Vex.RERR("BadArguments","Invalid tuning string: "+a);this.numStrings=b.length;for(var c=0;c<this.numStrings;++c)this.tuningValues[c]=this.noteToInteger(b[c])},getValueForString:function(a){var b=parseInt(a,10);if(1>b||b>this.numStrings)throw new Vex.RERR("BadArguments","String number must be between 1 and "+this.numStrings+": "+a);return this.tuningValues[b-1]},getValueForFret:function(a,b){var c=this.getValueForString(b),d=parseInt(a,10);if(0>d)throw new Vex.RERR("BadArguments","Fret number must be 0 or higher: "+a);return c+d},getNoteForFret:function(a,b){var c=this.getValueForFret(a,b),d=Math.floor(c/12),e=c%12;return Vex.Flow.integerToNote(e)+"/"+d}},a}(),Vex.Flow.StaveModifier=function(){function a(){this.init()}return a.prototype={init:function(){this.padding=10},getCategory:function(){return""},makeSpacer:function(a){return{getContext:function(){return!0},setStave:function(){},renderToStave:function(){},getMetrics:function(){return{width:a}}}},placeGlyphOnLine:function(a,b,c){a.setYShift(b.getYForLine(c)-b.getYForGlyphs())},setPadding:function(a){this.padding=a},addToStave:function(a,b){return b||a.addGlyph(this.makeSpacer(this.padding)),this.addModifier(a),this},addToStaveEnd:function(a,b){return a.addEndGlyph(b?this.makeSpacer(2):this.makeSpacer(this.padding)),this.addEndModifier(a),this},addModifier:function(){throw new Vex.RERR("MethodNotImplemented","addModifier() not implemented for this stave modifier.")},addEndModifier:function(){throw new Vex.RERR("MethodNotImplemented","addEndModifier() not implemented for this stave modifier.")}},a}(),Vex.Flow.KeySignature=function(){function a(a){arguments.length>0&&this.init(a)}return a.accidentalSpacing={"#":{above:6,below:4},b:{above:4,below:7},n:{above:3,below:-1}},Vex.Inherit(a,Vex.Flow.StaveModifier,{init:function(b){a.superclass.init(),this.glyphFontScale=38,this.accList=Vex.Flow.keySignature(b)},addAccToStave:function(b,c,d){var e=Vex.Flow.accidentalCodes(c.type),f=new Vex.Flow.Glyph(e.code,this.glyphFontScale),g=0;if("n"===c.type&&d){var h=d.line>=c.line,i=a.accidentalSpacing[d.type];g=h?i.above:i.below}f.setWidth(e.width+g),this.placeGlyphOnLine(f,b,c.line),b.addGlyph(f)},cancelKey:function(a){var b=Vex.Flow.keySignature(a),c=this.accList.length>0&&b[0].type!==this.accList[0].type,d=0;if(d=c?b.length:b.length-this.accList.length,!(1>d)){for(var e=[],f=0;d>f;f++){var g=f;c||(g=b.length-d+f);var h=b[g];e.push({type:"n",line:h.line})}return this.accList=e.concat(this.accList),this}},addModifier:function(a){this.convertAccLines(a.clef,this.accList[0].type);for(var b=0;b<this.accList.length;++b)this.addAccToStave(a,this.accList[b],this.accList[b+1])},addToStave:function(a,b){return 0===this.accList.length?this:(b||a.addGlyph(this.makeSpacer(this.padding)),this.addModifier(a),this)},convertAccLines:function(a,b){var c,d=0,e="tenor"===a&&"#"===b?!0:!1;switch(a){case"bass":d=1;break;case"alto":d=.5;break;case"tenor":e||(d=-.5)}var f;if(e)for(c=[3,1,2.5,.5,2,0,1.5],f=0;f<this.accList.length;++f)this.accList[f].line=c[f];else if("treble"!=a)for(f=0;f<this.accList.length;++f)this.accList[f].line+=d}}),a}(),Vex.Flow.TimeSignature=function(){function a(a,b){arguments.length>0&&this.init(a,b)}return a.glyphs={C:{code:"v41",point:40,line:2},"C|":{code:"vb6",point:40,line:2}},Vex.Inherit(a,Vex.Flow.StaveModifier,{init:function(b,c){a.superclass.init();var d=c||15;this.setPadding(d),this.point=40,this.topLine=2,this.bottomLine=4,this.timeSig=this.parseTimeSpec(b)},parseTimeSpec:function(b){if("C"==b||"C|"==b){var c=a.glyphs[b];return{num:!1,line:c.line,glyph:new Vex.Flow.Glyph(c.code,c.point)}}var d,e,f=[];for(d=0;d<b.length&&(e=b.charAt(d),"/"!=e);++d){if(!/[0-9]/.test(e))throw new Vex.RERR("BadTimeSignature","Invalid time spec: "+b);f.push(e)}if(0===d)throw new Vex.RERR("BadTimeSignature","Invalid time spec: "+b);if(++d,d==b.length)throw new Vex.RERR("BadTimeSignature","Invalid time spec: "+b);for(var g=[];d<b.length;++d){if(e=b.charAt(d),!/[0-9]/.test(e))throw new Vex.RERR("BadTimeSignature","Invalid time spec: "+b);g.push(e)}return{num:!0,glyph:this.makeTimeSignatureGlyph(f,g)}},makeTimeSignatureGlyph:function(a,b){var c=new Vex.Flow.Glyph("v0",this.point);c.topGlyphs=[],c.botGlyphs=[];var d,e,f=0;for(d=0;d<a.length;++d){e=a[d];var g=new Vex.Flow.Glyph("v"+e,this.point);c.topGlyphs.push(g),f+=g.getMetrics().width}var h=0;for(d=0;d<b.length;++d){e=b[d];var i=new Vex.Flow.Glyph("v"+e,this.point);c.botGlyphs.push(i),h+=i.getMetrics().width}var j=f>h?f:h,k=c.getMetrics().x_min;c.getMetrics=function(){return{x_min:k,x_max:k+j,width:j}};var l=(j-f)/2,m=(j-h)/2,n=this;return c.renderToStave=function(a){var b,c,d=a+l;for(b=0;b<this.topGlyphs.length;++b)c=this.topGlyphs[b],Vex.Flow.Glyph.renderOutline(this.context,c.metrics.outline,c.scale,d+c.x_shift,this.stave.getYForLine(n.topLine)+1),d+=c.getMetrics().width;for(d=a+m,b=0;b<this.botGlyphs.length;++b)c=this.botGlyphs[b],n.placeGlyphOnLine(c,this.stave,c.line),Vex.Flow.Glyph.renderOutline(this.context,c.metrics.outline,c.scale,d+c.x_shift,this.stave.getYForLine(n.bottomLine)+1),d+=c.getMetrics().width},c},getTimeSig:function(){return this.timeSig},addModifier:function(a){this.timeSig.num||this.placeGlyphOnLine(this.timeSig.glyph,a,this.timeSig.line),a.addGlyph(this.timeSig.glyph)},addEndModifier:function(a){this.timeSig.num||this.placeGlyphOnLine(this.timeSig.glyph,a,this.timeSig.line),a.addEndGlyph(this.timeSig.glyph)}}),a}(),Vex.Flow.Clef=function(){function a(a,b,c){arguments.length>0&&this.init(a,b,c)}function b(){Vex.Flow.Clef.DEBUG&&Vex.L("Vex.Flow.Clef",arguments)}return a.types={treble:{code:"v83",line:3},bass:{code:"v79",line:1},alto:{code:"vad",line:2},tenor:{code:"vad",line:1},percussion:{code:"v59",line:2},soprano:{code:"vad",line:4},"mezzo-soprano":{code:"vad",line:3},"baritone-c":{code:"vad",line:0},"baritone-f":{code:"v79",line:2},subbass:{code:"v79",line:0},french:{code:"v83",line:4}},a.sizes={"default":40,small:32},a.annotations={"8va":{code:"v8",sizes:{"default":{point:20,attachments:{treble:{line:-1.2,x_shift:11}}},small:{point:18,attachments:{treble:{line:-.4,x_shift:8}}}}},"8vb":{code:"v8",sizes:{"default":{point:20,attachments:{treble:{line:6.3,x_shift:10},bass:{line:4,x_shift:1}}},small:{point:18,attachments:{treble:{line:5.8,x_shift:6},bass:{line:3.5,x_shift:.5}}}}}},Vex.Inherit(a,Vex.Flow.StaveModifier,{init:function(a,c,d){var e=Vex.Flow.Clef.superclass;if(e.init.call(this),this.clef=Vex.Flow.Clef.types[a],this.size=void 0===c?"default":c,this.clef.point=Vex.Flow.Clef.sizes[this.size],void 0!==d){var f=Vex.Flow.Clef.annotations[d];this.annotation={code:f.code,point:f.sizes[this.size].point,line:f.sizes[this.size].attachments[a].line,x_shift:f.sizes[this.size].attachments[a].x_shift}}b("Creating clef:",a)},addModifier:function(a){var b=new Vex.Flow.Glyph(this.clef.code,this.clef.point);if(this.placeGlyphOnLine(b,a,this.clef.line),void 0!==this.annotation){var c=new Vex.Flow.Glyph(this.annotation.code,this.annotation.point);c.metrics.x_max=0,c.setXShift(this.annotation.x_shift),this.placeGlyphOnLine(c,a,this.annotation.line),a.addGlyph(c)}a.addGlyph(b)},addEndModifier:function(a){var b=new Vex.Flow.Glyph(this.clef.code,this.clef.point);if(this.placeGlyphOnLine(b,a,this.clef.line),a.addEndGlyph(b),void 0!==this.annotation){var c=new Vex.Flow.Glyph(this.annotation.code,this.annotation.point);c.metrics.x_max=0,c.setXShift(this.annotation.x_shift),this.placeGlyphOnLine(c,a,this.annotation.line),a.addEndGlyph(c)}}}),a}(),Vex.Flow.Music=function(){function a(){this.init()}return a.NUM_TONES=12,a.roots=["c","d","e","f","g","a","b"],a.root_values=[0,2,4,5,7,9,11],a.root_indices={c:0,d:1,e:2,f:3,g:4,a:5,b:6},a.canonical_notes=["c","c#","d","d#","e","f","f#","g","g#","a","a#","b"],a.diatonic_intervals=["unison","m2","M2","m3","M3","p4","dim5","p5","m6","M6","b7","M7","octave"],a.diatonic_accidentals={unison:{note:0,accidental:0},m2:{note:1,accidental:-1},M2:{note:1,accidental:0},m3:{note:2,accidental:-1},M3:{note:2,accidental:0},p4:{note:3,accidental:0},dim5:{note:4,accidental:-1},p5:{note:4,accidental:0},m6:{note:5,accidental:-1},M6:{note:5,accidental:0},b7:{note:6,accidental:-1},M7:{note:6,accidental:0},octave:{note:7,accidental:0}},a.intervals={u:0,unison:0,m2:1,b2:1,min2:1,S:1,H:1,2:2,M2:2,maj2:2,T:2,W:2,m3:3,b3:3,min3:3,M3:4,3:4,maj3:4,4:5,p4:5,"#4":6,b5:6,aug4:6,dim5:6,5:7,p5:7,"#5":8,b6:8,aug5:8,6:9,M6:9,maj6:9,b7:10,m7:10,min7:10,dom7:10,M7:11,maj7:11,8:12,octave:12},a.scales={major:[2,2,1,2,2,2,1],dorian:[2,1,2,2,2,1,2],mixolydian:[2,2,1,2,2,1,2],minor:[2,1,2,2,1,2,2]},a.accidentals=["bb","b","n","#","##"],a.noteValues={c:{root_index:0,int_val:0},cn:{root_index:0,int_val:0},"c#":{root_index:0,int_val:1},"c##":{root_index:0,int_val:2},cb:{root_index:0,int_val:11},cbb:{root_index:0,int_val:10},d:{root_index:1,int_val:2},dn:{root_index:1,int_val:2},"d#":{root_index:1,int_val:3},"d##":{root_index:1,int_val:4},db:{root_index:1,int_val:1},dbb:{root_index:1,int_val:0},e:{root_index:2,int_val:4},en:{root_index:2,int_val:4},"e#":{root_index:2,int_val:5},"e##":{root_index:2,int_val:6},eb:{root_index:2,int_val:3},ebb:{root_index:2,int_val:2},f:{root_index:3,int_val:5},fn:{root_index:3,int_val:5},"f#":{root_index:3,int_val:6},"f##":{root_index:3,int_val:7},fb:{root_index:3,int_val:4},fbb:{root_index:3,int_val:3},g:{root_index:4,int_val:7},gn:{root_index:4,int_val:7},"g#":{root_index:4,int_val:8},"g##":{root_index:4,int_val:9},gb:{root_index:4,int_val:6},gbb:{root_index:4,int_val:5},a:{root_index:5,int_val:9},an:{root_index:5,int_val:9},"a#":{root_index:5,int_val:10},"a##":{root_index:5,int_val:11},ab:{root_index:5,int_val:8},abb:{root_index:5,int_val:7},b:{root_index:6,int_val:11},bn:{root_index:6,int_val:11},"b#":{root_index:6,int_val:0},"b##":{root_index:6,int_val:1},bb:{root_index:6,int_val:10},bbb:{root_index:6,int_val:9}},a.prototype={init:function(){},isValidNoteValue:function(a){return null==a||0>a||a>=Vex.Flow.Music.NUM_TONES?!1:!0},isValidIntervalValue:function(a){return this.isValidNoteValue(a)},getNoteParts:function(a){if(!a||a.length<1)throw new Vex.RERR("BadArguments","Invalid note name: "+a);if(a.length>3)throw new Vex.RERR("BadArguments","Invalid note name: "+a);var b=a.toLowerCase(),c=/^([cdefgab])(b|bb|n|#|##)?$/,d=c.exec(b);if(null!=d){var e=d[1],f=d[2];return{root:e,accidental:f}}throw new Vex.RERR("BadArguments","Invalid note name: "+a)},getKeyParts:function(a){if(!a||a.length<1)throw new Vex.RERR("BadArguments","Invalid key: "+a);var b=a.toLowerCase(),c=/^([cdefgab])(b|#)?(mel|harm|m|M)?$/,d=c.exec(b);if(null!=d){var e=d[1],f=d[2],g=d[3];return g||(g="M"),{root:e,accidental:f,type:g}}throw new Vex.RERR("BadArguments","Invalid key: "+a)},getNoteValue:function(b){var c=a.noteValues[b];if(null==c)throw new Vex.RERR("BadArguments","Invalid note name: "+b);return c.int_val},getIntervalValue:function(b){var c=a.intervals[b];if(null==c)throw new Vex.RERR("BadArguments","Invalid interval name: "+b);return c},getCanonicalNoteName:function(b){if(!this.isValidNoteValue(b))throw new Vex.RERR("BadArguments","Invalid note value: "+b);return a.canonical_notes[b]},getCanonicalIntervalName:function(b){if(!this.isValidIntervalValue(b))throw new Vex.RERR("BadArguments","Invalid interval value: "+b);return a.diatonic_intervals[b]},getRelativeNoteValue:function(b,c,d){if(null==d&&(d=1),1!=d&&-1!=d)throw new Vex.RERR("BadArguments","Invalid direction: "+d);var e=(b+d*c)%a.NUM_TONES;return 0>e&&(e+=a.NUM_TONES),e},getRelativeNoteName:function(b,c){var d=this.getNoteParts(b),e=this.getNoteValue(d.root),f=c-e;if(Math.abs(f)>a.NUM_TONES-3){var g=1;f>0&&(g=-1);var h=(c+1+(e+1))%a.NUM_TONES*g;if(Math.abs(h)>2)throw new Vex.RERR("BadArguments","Notes not related: "+b+", "+c);f=h}if(Math.abs(f)>2)throw new Vex.RERR("BadArguments","Notes not related: "+b+", "+c);var i,j=d.root;if(f>0)for(i=1;f>=i;++i)j+="#";else if(0>f)for(i=-1;i>=f;--i)j+="b";return j},getScaleTones:function(a,b){var c=[];c.push(a);for(var d=a,e=0;e<b.length;++e)d=this.getRelativeNoteValue(d,b[e]),d!=a&&c.push(d);return c},getIntervalBetween:function(b,c,d){if(null==d&&(d=1),1!=d&&-1!=d)throw new Vex.RERR("BadArguments","Invalid direction: "+d);if(!this.isValidNoteValue(b)||!this.isValidNoteValue(c))throw new Vex.RERR("BadArguments","Invalid notes: "+b+", "+c);var e;return e=1==d?c-b:b-c,0>e&&(e+=a.NUM_TONES),e},createScaleMap:function(a){var b=this.getKeyParts(a),c=Vex.Flow.KeyManager.scales[b.type],d=b.root;if(b.accidental&&(d+=b.accidental),!c)throw new Vex.RERR("BadArguments","Unsupported key type: "+a);for(var e=this.getScaleTones(this.getNoteValue(d),c),f=Vex.Flow.Music.root_indices[b.root],g={},h=0;h<Vex.Flow.Music.roots.length;++h){var i=(f+h)%Vex.Flow.Music.roots.length,j=Vex.Flow.Music.roots[i],k=this.getRelativeNoteName(j,e[h]);1===k.length&&(k+="n"),g[j]=k}return g}},a}(),Vex.Flow.KeyManager=function(){function a(a){this.init(a)}return a.scales={M:Vex.Flow.Music.scales.major,m:Vex.Flow.Music.scales.minor},a.prototype={init:function(a){this.music=new Vex.Flow.Music,this.setKey(a)},setKey:function(a){return this.key=a,this.reset(),this},getKey:function(){return this.key},reset:function(){this.keyParts=this.music.getKeyParts(this.key),this.keyString=this.keyParts.root,this.keyParts.accidental&&(this.keyString+=this.keyParts.accidental);var b=a.scales[this.keyParts.type];if(!b)throw new Vex.RERR("BadArguments","Unsupported key type: "+this.key);this.scale=this.music.getScaleTones(this.music.getNoteValue(this.keyString),Vex.Flow.KeyManager.scales[this.keyParts.type]),this.scaleMap={},this.scaleMapByValue={},this.originalScaleMapByValue={};for(var c=Vex.Flow.Music.root_indices[this.keyParts.root],d=0;d<Vex.Flow.Music.roots.length;++d){var e=(c+d)%Vex.Flow.Music.roots.length,f=Vex.Flow.Music.roots[e],g=this.music.getRelativeNoteName(f,this.scale[d]);this.scaleMap[f]=g,this.scaleMapByValue[this.scale[d]]=g,this.originalScaleMapByValue[this.scale[d]]=g}return this},getAccidental:function(a){var b=this.music.getKeyParts(a).root,c=this.music.getNoteParts(this.scaleMap[b]);return{note:this.scaleMap[b],accidental:c.accidental}},selectNote:function(a){a=a.toLowerCase();var b=this.music.getNoteParts(a),c=this.scaleMap[b.root],d=this.music.getNoteParts(c);if(c==a)return{note:c,accidental:b.accidental,change:!1};var e=this.scaleMapByValue[this.music.getNoteValue(a)];if(null!=e)return{note:e,accidental:this.music.getNoteParts(e).accidental,change:!1};var f=this.originalScaleMapByValue[this.music.getNoteValue(a)];return null!=f?(this.scaleMap[d.root]=f,delete this.scaleMapByValue[this.music.getNoteValue(c)],this.scaleMapByValue[this.music.getNoteValue(a)]=f,{note:f,accidental:this.music.getNoteParts(f).accidental,change:!0}):d.root==a?(delete this.scaleMapByValue[this.music.getNoteValue(this.scaleMap[b.root])],this.scaleMapByValue[this.music.getNoteValue(d.root)]=d.root,this.scaleMap[d.root]=d.root,{note:d.root,accidental:null,change:!0}):(delete this.scaleMapByValue[this.music.getNoteValue(this.scaleMap[b.root])],this.scaleMapByValue[this.music.getNoteValue(a)]=a,delete this.scaleMap[d.root],this.scaleMap[d.root]=a,{note:a,accidental:b.accidental,change:!0})}},a}(),Vex.Flow.Renderer=function(){function a(a,b){arguments.length>0&&this.init(a,b)}return a.Backends={CANVAS:1,RAPHAEL:2,SVG:3,VML:4},a.LineEndType={NONE:1,UP:2,DOWN:3},a.USE_CANVAS_PROXY=!1,a.buildContext=function(b,c,d,e,f){var g=new a(b,c);d&&e&&g.resize(d,e),f||(f="#FFF");var h=g.getContext();return h.setBackgroundFillStyle(f),h},a.getCanvasContext=function(b,c,d,e){return a.buildContext(b,a.Backends.CANVAS,c,d,e)},a.getRaphaelContext=function(b,c,d,e){return a.buildContext(b,a.Backends.RAPHAEL,c,d,e)},a.getSVGContext=function(b,c,d,e){return a.buildContext(b,a.Backends.SVG,c,d,e)},a.bolsterCanvasContext=function(b){if(a.USE_CANVAS_PROXY)return new Vex.Flow.CanvasContext(b);var c=["clear","setFont","setRawFont","setFillStyle","setBackgroundFillStyle","setStrokeStyle","setShadowColor","setShadowBlur","setLineWidth","setLineCap","setLineDash"];b.vexFlowCanvasContext=b;for(var d in c){var e=c[d];b[e]=Vex.Flow.CanvasContext.prototype[e]}return b},a.drawDashedLine=function(a,b,c,d,e,f){a.beginPath();var g=d-b,h=e-c,i=Math.atan2(h,g),j=b,k=c;a.moveTo(b,c);for(var l=0,m=!0;!(0>g?d>=j:j>=d)||!(0>h?e>=k:k>=e);){var n=f[l++%f.length],o=j+Math.cos(i)*n;j=0>g?Math.max(d,o):Math.min(d,o);var p=k+Math.sin(i)*n;k=0>h?Math.max(e,p):Math.min(e,p),m?a.lineTo(j,k):a.moveTo(j,k),m=!m}a.closePath(),a.stroke()},a.prototype={init:function(b,c){if(this.sel=b,!this.sel)throw new Vex.RERR("BadArgument","Invalid selector for renderer.");if(this.element=document.getElementById(b),this.element||(this.element=b),this.ctx=null,this.paper=null,this.backend=c,this.backend==a.Backends.CANVAS){if(!this.element.getContext)throw new Vex.RERR("BadElement","Can't get canvas context from element: "+b);this.ctx=a.bolsterCanvasContext(this.element.getContext("2d"))}else if(this.backend==a.Backends.RAPHAEL)this.ctx=new Vex.Flow.RaphaelContext(this.element);else{if(this.backend!=a.Backends.SVG)throw new Vex.RERR("InvalidBackend","No support for backend: "+this.backend);this.ctx=new Vex.Flow.SVGContext(this.element)}},resize:function(b,c){if(this.backend==a.Backends.CANVAS){if(!this.element.getContext)throw new Vex.RERR("BadElement","Can't get canvas context from element: "+this.sel);this.element.width=b,this.element.height=c,this.ctx=a.bolsterCanvasContext(this.element.getContext("2d"))}else this.ctx.resize(b,c);return this},getContext:function(){return this.ctx}},a}(),Vex.Flow.RaphaelContext=function(){function a(a){arguments.length>0&&this.init(a)}return a.prototype={init:function(a){this.element=a,this.paper=Raphael(a),this.path="",this.pen={x:0,y:0},this.lineWidth=1,this.state={scale:{x:1,y:1},font_family:"Arial",font_size:8,font_weight:800},this.attributes={"stroke-width":.3,fill:"black",stroke:"black",font:"10pt Arial"},this.background_attributes={"stroke-width":0,fill:"white",stroke:"white",font:"10pt Arial"},this.shadow_attributes={width:0,color:"black"},this.state_stack=[]},setFont:function(a,b,c){return this.state.font_family=a,this.state.font_size=b,this.state.font_weight=c,this.attributes.font=(this.state.font_weight||"")+" "+this.state.font_size*this.state.scale.x+"pt "+this.state.font_family,this},setRawFont:function(a){return this.attributes.font=a,this},setFillStyle:function(a){return this.attributes.fill=a,this},setBackgroundFillStyle:function(a){return this.background_attributes.fill=a,this.background_attributes.stroke=a,this},setStrokeStyle:function(a){return this.attributes.stroke=a,this},setShadowColor:function(a){return this.shadow_attributes.color=a,this},setShadowBlur:function(a){return this.shadow_attributes.width=a,this},setLineWidth:function(a){this.attributes["stroke-width"]=a,this.lineWidth=a},setLineDash:function(){return this},setLineCap:function(){return this},scale:function(a,b){return this.state.scale={x:a,y:b},this.attributes.transform="S"+a+","+b+",0,0",this.attributes.scale=a+","+b+",0,0",this.attributes.font=this.state.font_size*this.state.scale.x+"pt "+this.state.font_family,this.background_attributes.transform="S"+a+","+b+",0,0",this.background_attributes.font=this.state.font_size*this.state.scale.x+"pt "+this.state.font_family,this},clear:function(){this.paper.clear()},resize:function(a,b){return this.element.style.width=a,this.paper.setSize(a,b),this},setViewBox:function(a){this.paper.canvas.setAttribute("viewBox",a)},rect:function(a,b,c,d){return 0>d&&(b+=d,d=-d),this.paper.rect(a,b,c-.5,d-.5).attr(this.attributes).attr("fill","none").attr("stroke-width",this.lineWidth),this},fillRect:function(a,b,c,d){return 0>d&&(b+=d,d=-d),this.paper.rect(a,b,c-.5,d-.5).attr(this.attributes),this},clearRect:function(a,b,c,d){return 0>d&&(b+=d,d=-d),this.paper.rect(a,b,c-.5,d-.5).attr(this.background_attributes),this},beginPath:function(){return this.path="",this.pen.x=0,this.pen.y=0,this},moveTo:function(a,b){return this.path+="M"+a+","+b,this.pen.x=a,this.pen.y=b,this},lineTo:function(a,b){return this.path+="L"+a+","+b,this.pen.x=a,this.pen.y=b,this},bezierCurveTo:function(a,b,c,d,e,f){return this.path+="C"+a+","+b+","+c+","+d+","+e+","+f,this.pen.x=e,this.pen.y=f,this},quadraticCurveTo:function(a,b,c,d){return this.path+="Q"+a+","+b+","+c+","+d,this.pen.x=c,this.pen.y=d,this},arc:function(a,b,c,d,e,f){function g(a){for(;0>a;)a+=2*Math.PI;for(;a>2*Math.PI;)a-=2*Math.PI;return a}if(d=g(d),e=g(e),d>e){var h=d;d=e,e=h,f=!f}var i=e-d;return i>Math.PI?(this.arcHelper(a,b,c,d,d+i/2,f),this.arcHelper(a,b,c,d+i/2,e,f)):this.arcHelper(a,b,c,d,e,f),this},arcHelper:function(a,b,c,d,e,f){var g=a+c*Math.cos(d),h=b+c*Math.sin(d),i=a+c*Math.cos(e),j=b+c*Math.sin(e),k=0,l=0;f?(l=1,e-d<Math.PI&&(k=1)):e-d>Math.PI&&(k=1),this.path+="M"+g+","+h+",A"+c+","+c+",0,"+k+","+l+","+i+","+j+"M"+this.pen.x+","+this.pen.y},glow:function(){var a=this.paper.set();if(this.shadow_attributes.width>0)for(var b=this.shadow_attributes,c=b.width/2,d=1;c>=d;d++)a.push(this.paper.path(this.path).attr({stroke:b.color,"stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(b.width/c*d).toFixed(3),opacity:+((b.opacity||.3)/c).toFixed(3),transform:this.attributes.transform,scale:this.attributes.scale}));return a},fill:function(){var a=this.paper.path(this.path).attr(this.attributes).attr("stroke-width",0);return this.glow(a),this},stroke:function(){var a=this.lineWidth*(this.state.scale.x+this.state.scale.y)/2,b=this.paper.path(this.path).attr(this.attributes).attr("fill","none").attr("stroke-width",a);return this.glow(b),this},closePath:function(){return this.path+="Z",this},measureText:function(a){var b=this.paper.text(0,0,a).attr(this.attributes).attr("fill","none").attr("stroke","none"),c=b.getBBox();return b.remove(),{width:c.width,height:c.height}},fillText:function(a,b,c){return this.paper.text(b+this.measureText(a).width/2,c-this.state.font_size/(2.25*this.state.scale.y),a).attr(this.attributes),this},save:function(){return this.state_stack.push({state:{font_family:this.state.font_family},attributes:{font:this.attributes.font,fill:this.attributes.fill,stroke:this.attributes.stroke,"stroke-width":this.attributes["stroke-width"]},shadow_attributes:{width:this.shadow_attributes.width,color:this.shadow_attributes.color}}),this},restore:function(){var a=this.state_stack.pop();return this.state.font_family=a.state.font_family,this.attributes.font=a.attributes.font,this.attributes.fill=a.attributes.fill,this.attributes.stroke=a.attributes.stroke,this.attributes["stroke-width"]=a.attributes["stroke-width"],this.shadow_attributes.width=a.shadow_attributes.width,this.shadow_attributes.color=a.shadow_attributes.color,this}},a}(),Vex.Flow.CanvasContext=function(){function a(a){arguments.length>0&&this.init(a)}return a.WIDTH=600,a.HEIGHT=400,a.prototype={init:function(b){this.vexFlowCanvasContext=b,this.canvas=b.canvas?b.canvas:{width:a.WIDTH,height:a.HEIGHT}},clear:function(){this.vexFlowCanvasContext.clearRect(0,0,this.canvas.width,this.canvas.height)},setFont:function(a,b,c){return this.vexFlowCanvasContext.font=(c||"")+" "+b+"pt "+a,this},setRawFont:function(a){return this.vexFlowCanvasContext.font=a,this},setFillStyle:function(a){return this.vexFlowCanvasContext.fillStyle=a,this},setBackgroundFillStyle:function(a){return this.background_fillStyle=a,this},setStrokeStyle:function(a){return this.vexFlowCanvasContext.strokeStyle=a,this},setShadowColor:function(a){return this.vexFlowCanvasContext.shadowColor=a,this},setShadowBlur:function(a){return this.vexFlowCanvasContext.shadowBlur=a,this},setLineWidth:function(a){return this.vexFlowCanvasContext.lineWidth=a,this},setLineCap:function(a){return this.vexFlowCanvasContext.lineCap=a,this},setLineDash:function(a){this.vexFlowCanvasContext.lineDash=a},scale:function(a,b){return this.vexFlowCanvasContext.scale(parseFloat(a),parseFloat(b))},resize:function(a,b){return this.vexFlowCanvasContext.resize(parseInt(a,10),parseInt(b,10))},rect:function(a,b,c,d){return this.vexFlowCanvasContext.rect(a,b,c,d)},fillRect:function(a,b,c,d){return this.vexFlowCanvasContext.fillRect(a,b,c,d)},clearRect:function(a,b,c,d){return this.vexFlowCanvasContext.clearRect(a,b,c,d)},beginPath:function(){return this.vexFlowCanvasContext.beginPath()},moveTo:function(a,b){return this.vexFlowCanvasContext.moveTo(a,b)},lineTo:function(a,b){return this.vexFlowCanvasContext.lineTo(a,b)},bezierCurveTo:function(a,b,c,d,e,f){return this.vexFlowCanvasContext.bezierCurveTo(a,b,c,d,e,f)},quadraticCurveTo:function(a,b,c,d){return this.vexFlowCanvasContext.quadraticCurveTo(a,b,c,d)},arc:function(a,b,c,d,e,f){return this.vexFlowCanvasContext.arc(a,b,c,d,e,f)},glow:function(){return this.vexFlowCanvasContext.glow()},fill:function(){return this.vexFlowCanvasContext.fill()},stroke:function(){return this.vexFlowCanvasContext.stroke()},closePath:function(){return this.vexFlowCanvasContext.closePath()},measureText:function(a){return this.vexFlowCanvasContext.measureText(a)},fillText:function(a,b,c){return this.vexFlowCanvasContext.fillText(a,b,c)},save:function(){return this.vexFlowCanvasContext.save()},restore:function(){return this.vexFlowCanvasContext.restore()}},a}(),Vex.Flow.Barline=function(){function a(a,b){arguments.length>0&&this.init(a,b)}return a.type={SINGLE:1,DOUBLE:2,END:3,REPEAT_BEGIN:4,REPEAT_END:5,REPEAT_BOTH:6,NONE:7},Vex.Inherit(a,Vex.Flow.StaveModifier,{init:function(b,c){a.superclass.init.call(this),this.thickness=Vex.Flow.STAVE_LINE_THICKNESS,this.barline=b,this.x=c},getCategory:function(){return"barlines"},setX:function(a){return this.x=a,this},draw:function(b,c){switch(c="number"!=typeof c?0:c,this.barline){case a.type.SINGLE:this.drawVerticalBar(b,this.x,!1);break;case a.type.DOUBLE:this.drawVerticalBar(b,this.x,!0);break;case a.type.END:this.drawVerticalEndBar(b,this.x);break;case a.type.REPEAT_BEGIN:c>0&&this.drawVerticalBar(b,this.x),this.drawRepeatBar(b,this.x+c,!0);break;case a.type.REPEAT_END:this.drawRepeatBar(b,this.x,!1);break;case a.type.REPEAT_BOTH:this.drawRepeatBar(b,this.x,!1),this.drawRepeatBar(b,this.x,!0)}},drawVerticalBar:function(a,b,c){if(!a.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");var d=a.getYForLine(0),e=a.getYForLine(a.getNumLines()-1)+this.thickness;c&&a.context.fillRect(b-3,d,1,e-d),a.context.fillRect(b,d,1,e-d)},drawVerticalEndBar:function(a,b){if(!a.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");var c=a.getYForLine(0),d=a.getYForLine(a.getNumLines()-1)+this.thickness;a.context.fillRect(b-5,c,1,d-c),a.context.fillRect(b-2,c,3,d-c)},drawRepeatBar:function(a,b,c){if(!a.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");var d=a.getYForLine(0),e=a.getYForLine(a.getNumLines()-1)+this.thickness,f=3;c||(f=-5),a.context.fillRect(b+f,d,1,e-d),a.context.fillRect(b-2,d,3,e-d);var g=2;c?f+=4:f-=4;var h=b+f+g/2,i=(a.getNumLines()-1)*a.getSpacingBetweenLines();i=i/2-a.getSpacingBetweenLines()/2;var j=d+i+g/2;a.context.beginPath(),a.context.arc(h,j,g,0,2*Math.PI,!1),a.context.fill(),j+=a.getSpacingBetweenLines(),a.context.beginPath(),a.context.arc(h,j,g,0,2*Math.PI,!1),a.context.fill()}}),a}(),Vex.Flow.StaveHairpin=function(){function a(a,b){arguments.length>0&&this.init(a,b)}return a.type={CRESC:1,DECRESC:2},a.FormatByTicksAndDraw=function(b,c,d,e,f,g){var h=c.pixelsPerTick;if(null==h)throw new Vex.RuntimeError("BadArguments","A valid Formatter must be provide to draw offsets by ticks.");var i=h*g.left_shift_ticks,j=h*g.right_shift_ticks,k={height:g.height,y_shift:g.y_shift,left_shift_px:i,right_shift_px:j};new a({first_note:d.first_note,last_note:d.last_note},e).setContext(b).setRenderOptions(k).setPosition(f).draw()},a.prototype={init:function(a,b){this.notes=a,this.hairpin=b,this.position=Vex.Flow.Modifier.Position.BELOW,this.context=null,this.render_options={height:10,y_shift:0,left_shift_px:0,right_shift_px:0},this.setNotes(a)},setContext:function(a){return this.context=a,this},setPosition:function(a){return(a==Vex.Flow.Modifier.Position.ABOVE||a==Vex.Flow.Modifier.Position.BELOW)&&(this.position=a),this},setRenderOptions:function(a){return null!=a.height&&null!=a.y_shift&&null!=a.left_shift_px&&null!=a.right_shift_px&&(this.render_options=a),this},setNotes:function(a){if(!a.first_note&&!a.last_note)throw new Vex.RuntimeError("BadArguments","Hairpin needs to have either first_note or last_note set.");return this.first_note=a.first_note,this.last_note=a.last_note,this},renderHairpin:function(b){var c=this.context,d=this.render_options.y_shift+20,e=b.first_y;this.position==Vex.Flow.Modifier.Position.ABOVE&&(d=-d+30,e=b.first_y-b.staff_height);var f=this.render_options.left_shift_px,g=this.render_options.right_shift_px;switch(this.hairpin){case a.type.CRESC:c.moveTo(b.last_x+g,e+d),c.lineTo(b.first_x+f,e+this.render_options.height/2+d),c.lineTo(b.last_x+g,e+this.render_options.height+d);break;case a.type.DECRESC:c.moveTo(b.first_x+f,e+d),c.lineTo(b.last_x+g,e+this.render_options.height/2+d),c.lineTo(b.first_x+f,e+this.render_options.height+d)}c.stroke()},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw Hairpin without a context.");var a=this.first_note,b=this.last_note,c=a.getModifierStartXY(this.position,0),d=b.getModifierStartXY(this.position,0);return this.renderHairpin({first_x:c.x,last_x:d.x,first_y:a.getStave().y+a.getStave().height,last_y:b.getStave().y+b.getStave().height,staff_height:a.getStave().height}),!0}},a}(),Vex.Flow.Volta=function(){function a(a,b,c,d){arguments.length>0&&this.init(a,b,c,d)}return a.type={NONE:1,BEGIN:2,MID:3,END:4,BEGIN_END:5},Vex.Inherit(a,Vex.Flow.StaveModifier,{init:function(b,c,d,e){a.superclass.init.call(this),this.volta=b,this.x=d,this.y_shift=e,this.number=c,this.font={family:"sans-serif",size:9,weight:"bold"}},getCategory:function(){return"voltas"},setShiftY:function(a){return this.y_shift=a,this},draw:function(b,c){if(!b.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");var d=b.context,e=b.width,f=b.getYForTopText(b.options.num_lines)+this.y_shift,g=1.5*b.options.spacing_between_lines_px;switch(this.volta){case Vex.Flow.Volta.type.BEGIN:d.fillRect(this.x+c,f,1,g);break;case Vex.Flow.Volta.type.END:e-=5,d.fillRect(this.x+c+e,f,1,g);break;case Vex.Flow.Volta.type.BEGIN_END:e-=3,d.fillRect(this.x+c,f,1,g),d.fillRect(this.x+c+e,f,1,g)}return(this.volta==a.type.BEGIN||this.volta==a.type.BEGIN_END)&&(d.save(),d.setFont(this.font.family,this.font.size,this.font.weight),d.fillText(this.number,this.x+c+5,f+15),d.restore()),d.fillRect(this.x+c,f,e,1),this
}}),a}(),Vex.Flow.Repetition=function(){function a(a,b,c){arguments.length>0&&this.init(a,b,c)}return a.type={NONE:1,CODA_LEFT:2,CODA_RIGHT:3,SEGNO_LEFT:4,SEGNO_RIGHT:5,DC:6,DC_AL_CODA:7,DC_AL_FINE:8,DS:9,DS_AL_CODA:10,DS_AL_FINE:11,FINE:12},Vex.Inherit(a,Vex.Flow.StaveModifier,{init:function(b,c,d){a.superclass.init.call(this),this.symbol_type=b,this.x=c,this.x_shift=0,this.y_shift=d,this.font={family:"times",size:12,weight:"bold italic"}},getCategory:function(){return"repetitions"},setShiftX:function(a){return this.x_shift=a,this},setShiftY:function(a){return this.y_shift=a,this},draw:function(b,c){switch(this.symbol_type){case a.type.CODA_RIGHT:this.drawCodaFixed(b,c+b.width);break;case a.type.CODA_LEFT:this.drawSymbolText(b,c,"Coda",!0);break;case a.type.SEGNO_LEFT:this.drawSignoFixed(b,c);break;case a.type.SEGNO_RIGHT:this.drawSignoFixed(b,c+b.width);break;case a.type.DC:this.drawSymbolText(b,c,"D.C.",!1);break;case a.type.DC_AL_CODA:this.drawSymbolText(b,c,"D.C. al",!0);break;case a.type.DC_AL_FINE:this.drawSymbolText(b,c,"D.C. al Fine",!1);break;case a.type.DS:this.drawSymbolText(b,c,"D.S.",!1);break;case a.type.DS_AL_CODA:this.drawSymbolText(b,c,"D.S. al",!0);break;case a.type.DS_AL_FINE:this.drawSymbolText(b,c,"D.S. al Fine",!1);break;case a.type.FINE:this.drawSymbolText(b,c,"Fine",!1)}return this},drawCodaFixed:function(a,b){if(!a.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");var c=a.getYForTopText(a.options.num_lines)+this.y_shift;return Vex.Flow.renderGlyph(a.context,this.x+b+this.x_shift,c+25,40,"v4d",!0),this},drawSignoFixed:function(a,b){if(!a.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");var c=a.getYForTopText(a.options.num_lines)+this.y_shift;return Vex.Flow.renderGlyph(a.context,this.x+b+this.x_shift,c+25,30,"v8c",!0),this},drawSymbolText:function(a,b,c,d){if(!a.context)throw new Vex.RERR("NoCanvasContext","Can't draw stave without canvas context.");var e=a.context;e.save(),e.setFont(this.font.family,this.font.size,this.font.weight);var f=0+this.x_shift,g=b+this.x_shift;this.symbol_type==Vex.Flow.Repetition.type.CODA_LEFT?(f=this.x+a.options.vertical_bar_width,g=f+e.measureText(c).width+12):(g=this.x+b+a.width-5+this.x_shift,f=g-+e.measureText(c).width-12);var h=a.getYForTopText(a.options.num_lines)+this.y_shift;return d&&Vex.Flow.renderGlyph(e,g,h,40,"v4d",!0),e.fillText(c,f,h+5),e.restore(),this}}),a}(),Vex.Flow.StaveSection=function(){function a(a,b,c){arguments.length>0&&this.init(a,b,c)}var b=Vex.Flow.Modifier;return Vex.Inherit(a,b,{init:function(c,d,e){a.superclass.init.call(this),this.setWidth(16),this.section=c,this.position=b.Position.ABOVE,this.x=d,this.shift_x=0,this.shift_y=e,this.font={family:"sans-serif",size:12,weight:"bold"}},getCategory:function(){return"stavesection"},setStaveSection:function(a){return this.section=a,this},setShiftX:function(a){return this.shift_x=a,this},setShiftY:function(a){return this.shift_y=a,this},draw:function(a,b){if(!a.context)throw new Vex.RERR("NoContext","Can't draw stave section without a context.");var c=a.context;c.save(),c.lineWidth=2,c.setFont(this.font.family,this.font.size,this.font.weight);var d=c.measureText(""+this.section).width,e=d+6;18>e&&(e=18);var f=20,g=a.getYForTopText(3)+this.shift_y,h=this.x+b;return c.beginPath(),c.lineWidth=2,c.rect(h,g,e,f),c.stroke(),h+=(e-d)/2,c.fillText(""+this.section,h,g+16),c.restore(),this}}),a}(),Vex.Flow.StaveTempo=function(){function a(a,b,c){arguments.length>0&&this.init(a,b,c)}return Vex.Inherit(a,Vex.Flow.StaveModifier,{init:function(b,c,d){a.superclass.init.call(this),this.tempo=b,this.position=Vex.Flow.Modifier.Position.ABOVE,this.x=c,this.shift_x=10,this.shift_y=d,this.font={family:"times",size:14,weight:"bold"},this.render_options={glyph_font_scale:30}},getCategory:function(){return"stavetempo"},setTempo:function(a){return this.tempo=a,this},setShiftX:function(a){return this.shift_x=a,this},setShiftY:function(a){return this.shift_y=a,this},draw:function(a,b){if(!a.context)throw new Vex.RERR("NoContext","Can't draw stave tempo without a context.");var c=this.render_options,d=c.glyph_font_scale/38,e=this.tempo.name,f=this.tempo.duration,g=this.tempo.dots,h=this.tempo.bpm,i=this.font,j=a.context,k=this.x+this.shift_x+b,l=a.getYForTopText(1)+this.shift_y;if(j.save(),e&&(j.setFont(i.family,i.size,i.weight),j.fillText(e,k,l),k+=j.measureText(e).width),f&&h){j.setFont(i.family,i.size,"normal"),e&&(k+=j.measureText(" ").width,j.fillText("(",k,l),k+=j.measureText("(").width);var m=Vex.Flow.durationToGlyph(f);if(k+=3*d,Vex.Flow.renderGlyph(j,k,l,c.glyph_font_scale,m.code_head),k+=m.head_width*d,m.stem){var n=30;m.beam_count&&(n+=3*(m.beam_count-1)),n*=d;var o=l-n;j.fillRect(k,o,d,n),m.flag&&(Vex.Flow.renderGlyph(j,k+d,o,c.glyph_font_scale,m.code_flag_upstem),g||(k+=6*d))}for(var p=0;g>p;p++)k+=6*d,j.beginPath(),j.arc(k,l+2*d,2*d,0,2*Math.PI,!1),j.fill();j.fillText(" = "+h+(e?")":""),k+3*d,l)}return j.restore(),this}}),a}(),Vex.Flow.StaveText=function(){function a(a,b,c){arguments.length>0&&this.init(a,b,c)}var b=Vex.Flow.Modifier;return Vex.Inherit(a,b,{init:function(b,c,d){a.superclass.init.call(this),this.setWidth(16),this.text=b,this.position=c,this.options={shift_x:0,shift_y:0,justification:Vex.Flow.TextNote.Justification.CENTER},Vex.Merge(this.options,d),this.font={family:"times",size:16,weight:"normal"}},getCategory:function(){return"stavetext"},setStaveText:function(a){return this.text=a,this},setShiftX:function(a){return this.shift_x=a,this},setShiftY:function(a){return this.shift_y=a,this},setFont:function(a){Vex.Merge(this.font,a)},setText:function(a){this.text=a},draw:function(a){if(!a.context)throw new Vex.RERR("NoContext","Can't draw stave text without a context.");var b=a.context;b.save(),b.lineWidth=2,b.setFont(this.font.family,this.font.size,this.font.weight);var c,d,e=b.measureText(""+this.text).width,f=Vex.Flow.Modifier;switch(this.position){case f.Position.LEFT:case f.Position.RIGHT:d=(a.getYForLine(0)+a.getBottomLineY())/2+this.options.shift_y,c=this.position==f.Position.LEFT?a.getX()-e-24+this.options.shift_x:a.getX()+a.getWidth()+24+this.options.shift_x;break;case f.Position.ABOVE:case f.Position.BELOW:var g=Vex.Flow.TextNote.Justification;c=a.getX()+this.options.shift_x,this.options.justification==g.CENTER?c+=a.getWidth()/2-e/2:this.options.justification==g.RIGHT&&(c+=a.getWidth()-e),d=this.position==f.Position.ABOVE?a.getYForTopText(2)+this.options.shift_y:a.getYForBottomText(2)+this.options.shift_y;break;default:throw new Vex.RERR("InvalidPosition","Value Must be in Modifier.Position.")}return b.fillText(""+this.text,c,d+4),b.restore(),this}}),a}(),Vex.Flow.BarNote=function(){function a(){this.init()}function b(){a.DEBUG&&Vex.L("Vex.Flow.BarNote",arguments)}return Vex.Inherit(a,Vex.Flow.Note,{init:function(){a.superclass.init.call(this,{duration:"b"});var b=Vex.Flow.Barline.type;this.metrics={widths:{}},this.metrics.widths[b.SINGLE]=8,this.metrics.widths[b.DOUBLE]=12,this.metrics.widths[b.END]=15,this.metrics.widths[b.REPEAT_BEGIN]=14,this.metrics.widths[b.REPEAT_END]=14,this.metrics.widths[b.REPEAT_BOTH]=18,this.metrics.widths[b.NONE]=0,this.ignore_ticks=!0,this.type=b.SINGLE,this.setWidth(this.metrics.widths[this.type])},getType:function(){return this.type},setType:function(a){return this.type=a,this.setWidth(this.metrics.widths[this.type]),this},getBoundingBox:function(){return new Vex.Flow.BoundingBox(0,0,0,0)},addToModifierContext:function(){return this},preFormat:function(){return this.setPreFormatted(!0),this},draw:function(){if(!this.stave)throw new Vex.RERR("NoStave","Can't draw without a stave.");b("Rendering bar line at: ",this.getAbsoluteX());var a=new Vex.Flow.Barline(this.type,this.getAbsoluteX());a.draw(this.stave)}}),a}(),Vex.Flow.Tremolo=function(){function a(a){arguments.length>0&&this.init(a)}var b=Vex.Flow.Modifier;return Vex.Inherit(a,b,{init:function(c){a.superclass.init.call(this),this.num=c,this.note=null,this.index=null,this.position=b.Position.CENTER,this.code="v74",this.shift_right=-2,this.y_spacing=4,this.render_options={font_scale:35,stroke_px:3,stroke_spacing:10},this.font={family:"Arial",size:16,weight:""}},getCategory:function(){return"tremolo"},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw Tremolo without a context.");if(!this.note||null==this.index)throw new Vex.RERR("NoAttachedNote","Can't draw Tremolo without a note and index.");var a=this.note.getModifierStartXY(this.position,this.index),b=a.x,c=a.y;b+=this.shift_right;for(var d=0;d<this.num;++d)Vex.Flow.renderGlyph(this.context,b,c,this.render_options.font_scale,this.code),c+=this.y_spacing}}),a}(),Vex.Flow.Tuplet=function(){function a(a,b){arguments.length>0&&this.init(a,b)}return a.LOCATION_TOP=1,a.LOCATION_BOTTOM=-1,a.prototype={init:function(b,c){if(!b||b==[])throw new Vex.RuntimeError("BadArguments","No notes provided for tuplet.");if(1==b.length)throw new Vex.RuntimeError("BadArguments","Too few notes for tuplet.");this.options=Vex.Merge({},c),this.notes=b,this.num_notes="num_notes"in this.options?this.options.num_notes:b.length,this.beats_occupied="beats_occupied"in this.options?this.options.beats_occupied:2,this.bracketed=null==b[0].beam,this.ratioed=!1,this.point=28,this.y_pos=16,this.x_pos=100,this.width=200,this.location=a.LOCATION_TOP,Vex.Flow.Formatter.AlignRestsToNotes(b,!0,!0),this.resolveGlyphs(),this.attach()},attach:function(){for(var a=0;a<this.notes.length;a++){var b=this.notes[a];b.setTuplet(this)}},detach:function(){for(var a=0;a<this.notes.length;a++){var b=this.notes[a];b.setTuplet(null)}},setContext:function(a){return this.context=a,this},setBracketed:function(a){return this.bracketed=a?!0:!1,this},setRatioed:function(a){return this.ratioed=a?!0:!1,this},setTupletLocation:function(b){if(b){if(b!=a.LOCATION_TOP&&b!=a.LOCATION_BOTTOM)throw new Vex.RERR("BadArgument","Invalid tuplet location: "+b)}else b=a.LOCATION_TOP;return this.location=b,this},getNotes:function(){return this.notes},getNoteCount:function(){return this.num_notes},getBeatsOccupied:function(){return this.beats_occupied},setBeatsOccupied:function(a){this.detach(),this.beats_occupied=a,this.resolveGlyphs(),this.attach()},resolveGlyphs:function(){this.num_glyphs=[];for(var a=this.num_notes;a>=1;)this.num_glyphs.push(new Vex.Flow.Glyph("v"+a%10,this.point)),a=parseInt(a/10,10);for(this.denom_glyphs=[],a=this.beats_occupied;a>=1;)this.denom_glyphs.push(new Vex.Flow.Glyph("v"+a%10,this.point)),a=parseInt(a/10,10)},draw:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");var b=this.notes[0],c=this.notes[this.notes.length-1];this.bracketed?(this.x_pos=b.getTieLeftX()-5,this.width=c.getTieRightX()-this.x_pos+5):(this.x_pos=b.getStemX(),this.width=c.getStemX()-this.x_pos);var d;if(this.location==a.LOCATION_TOP)for(this.y_pos=b.getStave().getYForLine(0)-15,d=0;d<this.notes.length;++d){var e=this.notes[d].getStemDirection()===Vex.Flow.Stem.UP?this.notes[d].getStemExtents().topY-10:this.notes[d].getStemExtents().baseY-20;e<this.y_pos&&(this.y_pos=e)}else for(this.y_pos=b.getStave().getYForLine(4)+20,d=0;d<this.notes.length;++d){var f=this.notes[d].getStemDirection()===Vex.Flow.Stem.UP?this.notes[d].getStemExtents().baseY+20:this.notes[d].getStemExtents().topY+10;f>this.y_pos&&(this.y_pos=f)}var g,h=0;for(g in this.num_glyphs)h+=this.num_glyphs[g].getMetrics().width;if(this.ratioed){for(g in this.denom_glyphs)h+=this.denom_glyphs[g].getMetrics().width;h+=.32*this.point}var i=this.x_pos+this.width/2,j=i-h/2;if(this.bracketed){var k=this.width/2-h/2-5;k>0&&(this.context.fillRect(this.x_pos,this.y_pos,k,1),this.context.fillRect(this.x_pos+this.width/2+h/2+5,this.y_pos,k,1),this.context.fillRect(this.x_pos,this.y_pos+(this.location==a.LOCATION_BOTTOM),1,10*this.location),this.context.fillRect(this.x_pos+this.width,this.y_pos+(this.location==a.LOCATION_BOTTOM),1,10*this.location))}var l=0,m=this.num_glyphs.length;for(g in this.num_glyphs)this.num_glyphs[m-g-1].render(this.context,j+l,this.y_pos+this.point/3-2),l+=this.num_glyphs[m-g-1].getMetrics().width;if(this.ratioed){var n=j+l+.16*this.point,o=.06*this.point;this.context.beginPath(),this.context.arc(n,this.y_pos-.08*this.point,o,0,2*Math.PI,!0),this.context.closePath(),this.context.fill(),this.context.beginPath(),this.context.arc(n,this.y_pos+.12*this.point,o,0,2*Math.PI,!0),this.context.closePath(),this.context.fill(),l+=.32*this.point,m=this.denom_glyphs.length;for(g in this.denom_glyphs)this.denom_glyphs[m-g-1].render(this.context,j+l,this.y_pos+this.point/3-2),l+=this.denom_glyphs[m-g-1].getMetrics().width}}},a}(),Vex.Flow.BoundingBox=function(){function a(a,b,c,d){this.init(a,b,c,d)}return a.copy=function(b){return new a(b.x,b.y,b.w,b.h)},a.prototype={init:function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d},getX:function(){return this.x},getY:function(){return this.y},getW:function(){return this.w},getH:function(){return this.h},setX:function(a){return this.x=a,this},setY:function(a){return this.y=a,this},setW:function(a){return this.w=a,this},setH:function(a){return this.h=a,this},move:function(a,b){this.x+=a,this.y+=b},clone:function(){return a.copy(this)},mergeWith:function(a,b){var c=a,d=this.x<c.x?this.x:c.x,e=this.y<c.y?this.y:c.y,f=this.x+this.w<c.x+c.w?c.x+c.w-this.x:this.x+this.w-Vex.Min(this.x,c.x),g=this.y+this.h<c.y+c.h?c.y+c.h-this.y:this.y+this.h-Vex.Min(this.y,c.y);return this.x=d,this.y=e,this.w=f,this.h=g,b&&this.draw(b),this},draw:function(a,b,c){b||(b=0),c||(c=0),a.rect(this.x+b,this.y+c,this.w,this.h),a.stroke()}},a}(),Vex.Flow.TextNote=function(){function a(a){arguments.length>0&&this.init(a)}return a.Justification={LEFT:1,CENTER:2,RIGHT:3},a.GLYPHS={segno:{code:"v8c",point:40,x_shift:0,y_shift:-10},tr:{code:"v1f",point:40,x_shift:0,y_shift:0},mordent_upper:{code:"v1e",point:40,x_shift:0,y_shift:0},mordent_lower:{code:"v45",point:40,x_shift:0,y_shift:0},f:{code:"vba",point:40,x_shift:0,y_shift:0},p:{code:"vbf",point:40,x_shift:0,y_shift:0},m:{code:"v62",point:40,x_shift:0,y_shift:0},s:{code:"v4a",point:40,x_shift:0,y_shift:0},z:{code:"v80",point:40,x_shift:0,y_shift:0},coda:{code:"v4d",point:40,x_shift:0,y_shift:-8},pedal_open:{code:"v36",point:40,x_shift:0,y_shift:0},pedal_close:{code:"v5d",point:40,x_shift:0,y_shift:3},caesura_straight:{code:"v34",point:40,x_shift:0,y_shift:2},caesura_curved:{code:"v4b",point:40,x_shift:0,y_shift:2},breath:{code:"v6c",point:40,x_shift:0,y_shift:0},tick:{code:"v6f",point:50,x_shift:0,y_shift:0},turn:{code:"v72",point:40,x_shift:0,y_shift:0},turn_inverted:{code:"v33",point:40,x_shift:0,y_shift:0},mordent:{code:"v1e",point:40,x_shift:0,y_shift:0}},Vex.Inherit(a,Vex.Flow.Note,{init:function(b){if(a.superclass.init.call(this,b),this.text=b.text,this.superscript=b.superscript,this.subscript=b.subscript,this.glyph_type=b.glyph,this.glyph=null,this.font={family:"Arial",size:12,weight:""},b.font&&(this.font=b.font),this.glyph_type){var c=a.GLYPHS[this.glyph_type];if(!c)throw new Vex.RERR("Invalid glyph type: "+this.glyph_type);this.glyph=new Vex.Flow.Glyph(c.code,c.point,{cache:!1}),this.setWidth(c.width?c.width:this.glyph.getMetrics().width),this.glyph_struct=c}else this.setWidth(Vex.Flow.textWidth(this.text));this.line=b.line||0,this.smooth=b.smooth||!1,this.ignore_ticks=b.ignore_ticks||!1,this.justification=a.Justification.LEFT},setJustification:function(a){return this.justification=a,this},setLine:function(a){return this.line=a,this},preFormat:function(){if(!this.context)throw new Vex.RERR("NoRenderContext","Can't measure text without rendering context.");this.preFormatted||(this.smooth?this.setWidth(0):this.glyph||this.setWidth(this.context.measureText(this.text).width),this.justification==a.Justification.CENTER?this.extraLeftPx=this.width/2:this.justification==a.Justification.RIGHT&&(this.extraLeftPx=this.width),this.setPreFormatted(!0))},draw:function(){if(!this.context)throw new Vex.RERR("NoCanvasContext","Can't draw without a canvas context.");if(!this.stave)throw new Vex.RERR("NoStave","Can't draw without a stave.");var b=this.context,c=this.getAbsoluteX();this.justification==a.Justification.CENTER?c-=this.getWidth()/2:this.justification==a.Justification.RIGHT&&(c-=this.getWidth());var d;if(this.glyph)d=this.stave.getYForLine(this.line+-3),this.glyph.render(this.context,c+this.glyph_struct.x_shift,d+this.glyph_struct.y_shift);else{d=this.stave.getYForLine(this.line+-3),b.save(),b.setFont(this.font.family,this.font.size,this.font.weight),b.fillText(this.text,c,d);var e=b.measureText("M").width,f=b.measureText(this.text).width;this.superscript&&(b.setFont(this.font.family,this.font.size/1.3,this.font.weight),b.fillText(this.superscript,c+f+2,d-e/2.2)),this.subscript&&(b.setFont(this.font.family,this.font.size/1.3,this.font.weight),b.fillText(this.subscript,c+f+2,d+e/2.2-1)),b.restore()}}}),a}(),Vex.Flow.FretHandFinger=function(){function a(a){arguments.length>0&&this.init(a)}a.CATEGORY="frethandfinger";var b=Vex.Flow.Modifier;return a.format=function(a,b){var c=b.left_shift,d=b.right_shift,e=1;if(!a||0===a.length)return!1;var f,g,h,i,j,k=[],l=null,m=0,n=0;for(f=0;f<a.length;++f){g=a[f],h=g.getNote(),i=g.getPosition();var o=h.getKeyProps()[g.getIndex()];if(h!=l){for(var p=0;p<h.keys.length;++p)j=h.getKeyProps()[p],0===c&&(m=j.displaced?h.getExtraLeftPx():m),0===d&&(n=j.displaced?h.getExtraRightPx():n);l=h}k.push({line:o.line,pos:i,shiftL:m,shiftR:n,note:h,num:g})}k.sort(function(a,b){return b.line-a.line});var q=0,r=0,s=0,t=0,u=null,v=null;for(f=0;f<k.length;++f){var w=0;h=k[f].note,i=k[f].pos,g=k[f].num;var x=k[f].line,y=k[f].shiftL,z=k[f].shiftR;(x!=u||h!=v)&&(q=c+y,r=d+z);var A=g.getWidth()+e;i==Vex.Flow.Modifier.Position.LEFT?(g.setXShift(c+q),w=c+A,s=w>s?w:s):i==Vex.Flow.Modifier.Position.RIGHT&&(g.setXShift(r),w=n+A,t=w>t?w:t),u=x,v=h}b.left_shift+=s,b.right_shift+=t},Vex.Inherit(a,b,{init:function(a){var c=Vex.Flow.FretHandFinger.superclass;c.init.call(this),this.note=null,this.index=null,this.finger=a,this.width=7,this.position=b.Position.LEFT,this.x_shift=0,this.y_shift=0,this.x_offset=0,this.y_offset=0,this.font={family:"sans-serif",size:9,weight:"bold"}},getNote:function(){return this.note},setNote:function(a){return this.note=a,this},getIndex:function(){return this.index},setIndex:function(a){return this.index=a,this},getPosition:function(){return this.position},setPosition:function(a){return a>=b.Position.LEFT&&a<=b.Position.BELOW&&(this.position=a),this},setFretHandFinger:function(a){return this.finger=a,this},setOffsetX:function(a){return this.x_offset=a,this},setOffsetY:function(a){return this.y_offset=a,this},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw string number without a context.");if(!this.note||null==this.index)throw new Vex.RERR("NoAttachedNote","Can't draw string number without a note and index.");var a=this.context,c=this.note.getModifierStartXY(this.position,this.index),d=c.x+this.x_shift+this.x_offset,e=c.y+this.y_shift+this.y_offset+5;switch(this.position){case b.Position.ABOVE:d-=4,e-=12;break;case b.Position.BELOW:d-=2,e+=10;break;case b.Position.LEFT:d-=this.width;break;case b.Position.RIGHT:d+=1}a.save(),a.setFont(this.font.family,this.font.size,this.font.weight),a.fillText(""+this.finger,d,e),a.restore()}}),a}(),Vex.Flow.StringNumber=function(){function a(a){arguments.length>0&&this.init(a)}a.CATEGORY="stringnumber";var b=Vex.Flow.Modifier;return a.format=function(a,b){var c=b.left_shift,d=b.right_shift,e=1;if(!a||0===a.length)return this;var f,g,h,i,j,k=[],l=null,m=0,n=0;for(f=0;f<a.length;++f)for(g=a[f],h=g.getNote(),f=0;f<a.length;++f){g=a[f],h=g.getNote(),i=g.getPosition();var o=h.getKeyProps()[g.getIndex()];if(h!=l){for(var p=0;p<h.keys.length;++p)j=h.getKeyProps()[p],0===c&&(m=j.displaced?h.getExtraLeftPx():m),0===d&&(n=j.displaced?h.getExtraRightPx():n);l=h}k.push({line:o.line,pos:i,shiftL:m,shiftR:n,note:h,num:g})}k.sort(function(a,b){return b.line-a.line});var q=0,r=0,s=0,t=0,u=null,v=null;for(f=0;f<k.length;++f){var w=0;h=k[f].note,i=k[f].pos,g=k[f].num;var x=k[f].line,y=k[f].shiftL,z=k[f].shiftR;(x!=u||h!=v)&&(q=c+y,r=d+z);var A=g.getWidth()+e;i==Vex.Flow.Modifier.Position.LEFT?(g.setXShift(c),w=m+A,s=w>s?w:s):i==Vex.Flow.Modifier.Position.RIGHT&&(g.setXShift(r),w+=A,t=w>t?w:t),u=x,v=h}return b.left_shift+=s,b.right_shift+=t,!0},Vex.Inherit(a,b,{init:function(c){a.superclass.init.call(this),this.note=null,this.last_note=null,this.index=null,this.string_number=c,this.setWidth(20),this.position=b.Position.ABOVE,this.x_shift=0,this.y_shift=0,this.x_offset=0,this.y_offset=0,this.dashed=!0,this.leg=Vex.Flow.Renderer.LineEndType.NONE,this.radius=8,this.font={family:"sans-serif",size:10,weight:"bold"}},getNote:function(){return this.note},setNote:function(a){return this.note=a,this},getIndex:function(){return this.index},setIndex:function(a){return this.index=a,this},setLineEndType:function(a){return a>=Vex.Flow.Renderer.LineEndType.NONE&&a<=Vex.Flow.Renderer.LineEndType.DOWN&&(this.leg=a),this},getPosition:function(){return this.position},setPosition:function(a){return a>=b.Position.LEFT&&a<=b.Position.BELOW&&(this.position=a),this},setStringNumber:function(a){return this.string_number=a,this},setOffsetX:function(a){return this.x_offset=a,this},setOffsetY:function(a){return this.y_offset=a,this},setLastNote:function(a){return this.last_note=a,this},setDashed:function(a){return this.dashed=a,this},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw string number without a context.");if(!this.note||null==this.index)throw new Vex.RERR("NoAttachedNote","Can't draw string number without a note and index.");var a=this.context,c=this.note.stave.options.spacing_between_lines_px,d=this.note.getModifierStartXY(this.position,this.index),e=d.x+this.x_shift+this.x_offset,f=d.y+this.y_shift+this.y_offset;switch(this.position){case b.Position.ABOVE:case b.Position.BELOW:var g=this.note.getStemExtents(),h=g.topY,i=g.baseY+2;this.note.stem_direction==Vex.Flow.StaveNote.STEM_DOWN&&(h=g.baseY,i=g.topY-2),f=this.position==b.Position.ABOVE?this.note.hasStem()?h-1.75*c:d.y-1.75*c:this.note.hasStem()?i+1.5*c:d.y+1.75*c,f+=this.y_shift+this.y_offset;break;case b.Position.LEFT:e-=this.radius/2+5;break;case b.Position.RIGHT:e+=this.radius/2+6}a.save(),a.beginPath(),a.arc(e,f,this.radius,0,2*Math.PI,!1),a.lineWidth=1.5,a.stroke(),a.setFont(this.font.family,this.font.size,this.font.weight);var j=e-a.measureText(this.string_number).width/2;if(a.fillText(""+this.string_number,j,f+4.5),null!=this.last_note){var k=this.last_note.getStemX()-this.note.getX()+5;a.strokeStyle="#000000",a.lineCap="round",a.lineWidth=.6,this.dashed?Vex.Flow.Renderer.drawDashedLine(a,e+10,f,e+k,f,[3,3]):Vex.Flow.Renderer.drawDashedLine(a,e+10,f,e+k,f,[3,0]);var l,m;switch(this.leg){case Vex.Flow.Renderer.LineEndType.UP:l=-10,m=this.dashed?[3,3]:[3,0],Vex.Flow.Renderer.drawDashedLine(a,e+k,f,e+k,f+l,m);break;case Vex.Flow.Renderer.LineEndType.DOWN:l=10,m=this.dashed?[3,3]:[3,0],Vex.Flow.Renderer.drawDashedLine(a,e+k,f,e+k,f+l,m)}}a.restore()}}),a}(),Vex.Flow.Stroke=function(){function a(a,b){arguments.length>0&&this.init(a,b)}a.CATEGORY="strokes",a.Type={BRUSH_DOWN:1,BRUSH_UP:2,ROLL_DOWN:3,ROLL_UP:4,RASQUEDO_DOWN:5,RASQUEDO_UP:6};var b=Vex.Flow.Modifier;return a.format=function(a,b){var c=b.left_shift,d=0;if(!a||0===a.length)return this;var e,f,g,h=[];for(e=0;e<a.length;++e){f=a[e];var i,j=f.getNote();j instanceof Vex.Flow.StaveNote?(i=j.getKeyProps()[f.getIndex()],g=i.displaced?j.getExtraLeftPx():0,h.push({line:i.line,shift:g,str:f})):(i=j.getPositions()[f.getIndex()],h.push({line:i.str,shift:0,str:f}))}var k=c,l=0;for(e=0;e<h.length;++e)f=h[e].str,g=h[e].shift,f.setXShift(k+g),l=Math.max(f.getWidth()+d,l);return b.left_shift+=l,!0},Vex.Inherit(a,b,{init:function(c,d){a.superclass.init.call(this),this.note=null,this.options=Vex.Merge({},d),this.all_voices="all_voices"in this.options?this.options.all_voices:!0,this.note_end=null,this.index=null,this.type=c,this.position=b.Position.LEFT,this.render_options={font_scale:38,stroke_px:3,stroke_spacing:10},this.font={family:"serif",size:10,weight:"bold italic"},this.setXShift(0),this.setWidth(10)},getPosition:function(){return this.position},addEndNote:function(a){return this.note_end=a,this},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw stroke without a context.");if(!this.note||null==this.index)throw new Vex.RERR("NoAttachedNote","Can't draw stroke without a note and index.");var b,c=this.note.getModifierStartXY(this.position,this.index),d=this.note.getYs(),e=c.y,f=c.y,g=c.x-5,h=this.note.stave.options.spacing_between_lines_px,i=this.getModifierContext().getModifiers(this.note.getCategory());for(b=0;b<i.length;b++){d=i[b].getYs();for(var j=0;j<d.length;j++)(this.note==i[b]||this.all_voices)&&(e=Vex.Min(e,d[j]),f=Vex.Max(f,d[j]))}var k,l,m,n,o;switch(this.type){case a.Type.BRUSH_DOWN:k="vc3",l=-3,m=e-h/2+10,f+=h/2;break;case a.Type.BRUSH_UP:k="v11",l=.5,m=f+h/2,e-=h/2;break;case a.Type.ROLL_DOWN:case a.Type.RASQUEDO_DOWN:k="vc3",l=-3,n=this.x_shift+l-2,this.note instanceof Vex.Flow.StaveNote?(e+=1.5*h,f+=(f-e)%2!==0?.5*h:h,m=e-h,o=f+h+2):(e+=1.5*h,f+=h,m=e-.75*h,o=f+.25*h);break;case a.Type.ROLL_UP:case a.Type.RASQUEDO_UP:k="v52",l=-4,n=this.x_shift+l-1,this.note instanceof Vex.Flow.StaveNote?(m=h/2,e+=.5*h,(f-e)%2===0&&(f+=h/2),m=f+.5*h,o=e-1.25*h):(e+=.25*h,f+=.5*h,m=f+.25*h,o=e-h)}if(this.type==a.Type.BRUSH_DOWN||this.type==a.Type.BRUSH_UP)this.context.fillRect(g+this.x_shift,e,1,f-e);else if(this.note instanceof Vex.Flow.StaveNote)for(b=e;f>=b;b+=h)Vex.Flow.renderGlyph(this.context,g+this.x_shift-4,b,this.render_options.font_scale,"va3");else{for(b=e;f>=b;b+=10)Vex.Flow.renderGlyph(this.context,g+this.x_shift-4,b,this.render_options.font_scale,"va3");this.type==Vex.Flow.Stroke.Type.RASQUEDO_DOWN&&(o=b+.25*h)}Vex.Flow.renderGlyph(this.context,g+this.x_shift+l,m,this.render_options.font_scale,k),(this.type==a.Type.RASQUEDO_DOWN||this.type==a.Type.RASQUEDO_UP)&&(this.context.save(),this.context.setFont(this.font.family,this.font.size,this.font.weight),this.context.fillText("R",g+n,o),this.context.restore())}}),a}(),Vex.Flow.Curve=function(){function a(a,b,c){arguments.length>0&&this.init(a,b,c)}return a.Position={NEAR_HEAD:1,NEAR_TOP:2},a.DEBUG=!0,a.prototype={init:function(b,c,d){this.render_options={spacing:2,thickness:2,x_shift:0,y_shift:10,position:a.Position.NEAR_HEAD,invert:!1,cps:[{x:0,y:10},{x:0,y:10}]},Vex.Merge(this.render_options,d),this.setNotes(b,c)},setContext:function(a){return this.context=a,this},setNotes:function(a,b){if(!a&&!b)throw new Vex.RuntimeError("BadArguments","Curve needs to have either first_note or last_note set.");return this.from=a,this.to=b,this},isPartial:function(){return!this.from||!this.to},renderCurve:function(a){var b=this.context,c=this.render_options.cps,d=this.render_options.x_shift,e=this.render_options.y_shift*a.direction,f=a.first_x+d,g=a.first_y+e,h=a.last_x-d,i=a.last_y+e,j=this.render_options.thickness,k=(h-f)/(c.length+2);b.beginPath(),b.moveTo(f,g),b.bezierCurveTo(f+k+c[0].x,g+c[0].y*a.direction,h-k+c[1].x,i+c[1].y*a.direction,h,i),b.bezierCurveTo(h-k+c[1].x,i+(c[1].y+j)*a.direction,f+k+c[0].x,g+(c[0].y+j)*a.direction,f,g),b.stroke(),b.closePath(),b.fill()},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","No context to render tie.");var b,c,d,e,f,g=this.from,h=this.to,i="baseY",j="baseY",k=this.render_options.position,l=this.render_options.position_end;return k===a.Position.NEAR_TOP&&(i="topY",j="topY"),l==a.Position.NEAR_HEAD?j="baseY":l==a.Position.NEAR_TOP&&(j="topY"),g?(b=g.getTieRightX(),f=g.getStemDirection(),d=g.getStemExtents()[i]):(b=h.getStave().getTieStartX(),d=h.getStemExtents()[i]),h?(c=h.getTieLeftX(),f=h.getStemDirection(),e=h.getStemExtents()[j]):(c=g.getStave().getTieEndX(),e=g.getStemExtents()[j]),this.renderCurve({first_x:b,last_x:c,first_y:d,last_y:e,direction:f*(this.render_options.invert===!0?-1:1)}),!0}},a}(),Vex.Flow.StaveLine=function(){function a(a){arguments.length>0&&this.init(a)}function b(a,b,c,d,e,f,g){a.beginPath(),a.moveTo(b,c),a.lineTo(d,e),a.lineTo(f,g),a.lineTo(b,c),a.closePath(),a.fill()}function c(a,c,d,e){var f,g,h,i,j=e.draw_start_arrow&&e.draw_end_arrow,k=c.x,l=c.y,m=d.x,n=d.y,o=Math.sqrt((m-k)*(m-k)+(n-l)*(n-l)),p=(o-e.arrowhead_length/3)/o;e.draw_end_arrow||j?(f=Math.round(k+(m-k)*p),g=Math.round(l+(n-l)*p)):(f=m,g=n),e.draw_start_arrow||j?(h=k+(m-k)*(1-p),i=l+(n-l)*(1-p)):(h=k,i=l),e.color&&(a.setStrokeStyle(e.color),a.setFillStyle(e.color)),a.beginPath(),a.moveTo(h,i),a.lineTo(f,g),a.stroke(),a.closePath();var q,r,s,t,u,v,w=Math.atan2(n-l,m-k),x=Math.abs(e.arrowhead_length/Math.cos(e.arrowhead_angle));(e.draw_end_arrow||j)&&(q=w+Math.PI+e.arrowhead_angle,s=m+Math.cos(q)*x,t=n+Math.sin(q)*x,r=w+Math.PI-e.arrowhead_angle,u=m+Math.cos(r)*x,v=n+Math.sin(r)*x,b(a,s,t,m,n,u,v)),(e.draw_start_arrow||j)&&(q=w+e.arrowhead_angle,s=k+Math.cos(q)*x,t=l+Math.sin(q)*x,r=w-e.arrowhead_angle,u=k+Math.cos(r)*x,v=l+Math.sin(r)*x,b(a,s,t,k,l,u,v))}return a.TextVerticalPosition={TOP:1,BOTTOM:2},a.TextJustification={LEFT:1,CENTER:2,RIGHT:3},a.prototype={init:function(b){this.notes=b,this.context=null,this.text="",this.font={family:"Arial",size:10,weight:""},this.render_options={padding_left:4,padding_right:3,line_width:1,line_dash:null,rounded_end:!0,color:null,draw_start_arrow:!1,draw_end_arrow:!1,arrowhead_length:10,arrowhead_angle:Math.PI/8,text_position_vertical:a.TextVerticalPosition.TOP,text_justification:a.TextJustification.CENTER},this.setNotes(b)},setContext:function(a){return this.context=a,this},setFont:function(a){return this.font=a,this},setText:function(a){return this.text=a,this},setNotes:function(a){if(!a.first_note&&!a.last_note)throw new Vex.RuntimeError("BadArguments","Notes needs to have either first_note or last_note set.");if(a.first_indices||(a.first_indices=[0]),a.last_indices||(a.last_indices=[0]),a.first_indices.length!=a.last_indices.length)throw new Vex.RuntimeError("BadArguments","Connected notes must have similar index sizes");return this.first_note=a.first_note,this.first_indices=a.first_indices,this.last_note=a.last_note,this.last_indices=a.last_indices,this},applyLineStyle:function(){if(!this.context)throw new Vex.RERR("NoContext","No context to apply the styling to");var a=this.render_options,b=this.context;a.line_dash&&b.setLineDash(a.line_dash),a.line_width&&b.setLineWidth(a.line_width),b.setLineCap(a.rounded_end?"round":"square")},applyFontStyle:function(){if(!this.context)throw new Vex.RERR("NoContext","No context to apply the styling to");var a=this.context;this.font&&a.setFont(this.font.family,this.font.size,this.font.weight),this.render_options.color&&(a.setStrokeStyle(this.render_options.color),a.setFillStyle(this.render_options.color))},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","No context to render StaveLine.");var b=this.context,d=this.first_note,e=this.last_note,f=this.render_options;b.save(),this.applyLineStyle();var g,h;this.first_indices.forEach(function(a,i){var j=this.last_indices[i];g=d.getModifierStartXY(2,a),h=e.getModifierStartXY(1,j);var k=g.y>h.y;g.x+=d.getMetrics().modRightPx+f.padding_left,h.x-=e.getMetrics().modLeftPx+f.padding_right;var l=d.getGlyph().head_width,m=d.getKeyProps()[a].displaced;m&&1===d.getStemDirection()&&(g.x+=l+f.padding_left);var n=e.getKeyProps()[j].displaced;n&&-1===e.getStemDirection()&&(h.x-=l+f.padding_right),g.y+=k?-3:1,h.y+=k?2:0,c(b,g,h,this.render_options)},this),b.restore();var i=b.measureText(this.text).width,j=f.text_justification,k=0;if(j===a.TextJustification.LEFT)k=g.x;else if(j===a.TextJustification.CENTER){var l=h.x-g.x,m=l/2+g.x;k=m-i/2}else j===a.TextJustification.RIGHT&&(k=h.x-i);var n,o=f.text_position_vertical;return o===a.TextVerticalPosition.TOP?n=d.getStave().getYForTopText():o===a.TextVerticalPosition.BOTTOM&&(n=d.getStave().getYForBottomText()),b.save(),this.applyFontStyle(),b.fillText(this.text,k,n),b.restore(),this
}},a}(),Vex.Flow.Crescendo=function(){function a(a){arguments.length>0&&this.init(a)}function b(){a.DEBUG&&Vex.L("Vex.Flow.Crescendo",arguments)}function c(a,b){var c=b.begin_x,d=b.end_x,e=b.y,f=b.height/2;a.beginPath(),b.reverse?(a.moveTo(c,e-f),a.lineTo(d,e),a.lineTo(c,e+f)):(a.moveTo(d,e-f),a.lineTo(c,e),a.lineTo(d,e+f)),a.stroke(),a.closePath()}return Vex.Inherit(a,Vex.Flow.Note,{init:function(b){a.superclass.init.call(this,b),this.decrescendo=!1,this.line=b.line||0,this.height=15,Vex.Merge(this.render_options,{extend_left:0,extend_right:0,y_shift:0})},setLine:function(a){return this.line=a,this},setHeight:function(a){return this.height=a,this},setDecrescendo:function(a){return this.decrescendo=a,this},preFormat:function(){return this.preFormatted=!0,this},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw Hairpin without a context.");var a,d=this.getTickContext(),e=Vex.Flow.TickContext.getNextContext(d),f=this.getAbsoluteX();a=e?e.getX():this.stave.x+this.stave.width;var g=this.stave.getYForLine(this.line+-3)+1;b("Drawing ",this.decrescendo?"decrescendo ":"crescendo ",this.height,"x",f-a),c(this.context,{begin_x:f-this.render_options.extend_left,end_x:a+this.render_options.extend_right,y:g+this.render_options.y_shift,height:this.height,reverse:this.decrescendo})}}),a}(),Vex.Flow.Ornament=function(){function a(a){arguments.length>0&&this.init(a)}function b(){a.DEBUG&&Vex.L("Vex.Flow.Ornament",arguments)}a.CATEGORY="ornaments";var c={n:{shift_x:1,shift_y_upper:0,shift_y_lower:0,height:17},"#":{shift_x:0,shift_y_upper:-2,shift_y_lower:-2,height:20},b:{shift_x:1,shift_y_upper:0,shift_y_lower:3,height:18},"##":{shift_x:0,shift_y_upper:0,shift_y_lower:0,height:12},bb:{shift_x:0,shift_y_upper:0,shift_y_lower:4,height:17},db:{shift_x:-3,shift_y_upper:0,shift_y_lower:4,height:17},bbs:{shift_x:0,shift_y_upper:0,shift_y_lower:4,height:17},d:{shift_x:0,shift_y_upper:0,shift_y_lower:0,height:17},"++":{shift_x:-2,shift_y_upper:-6,shift_y_lower:-3,height:22},"+":{shift_x:1,shift_y_upper:-4,shift_y_lower:-2,height:20}},d=Vex.Flow.Modifier;return a.format=function(a,b){if(!a||0===a.length)return!1;for(var c,d=b.text_line,e=0,f=0;f<a.length;++f){var g=a[f];g.setTextLine(d),c=g.getWidth()>e?g.getWidth():e;var h=Vex.Flow.ornamentCodes(g.type);d+=h.between_lines?1:1.5}return b.left_shift+=c/2,b.right_shift+=c/2,b.text_line=d,!0},Vex.Inherit(a,d,{init:function(b){if(a.superclass.init.call(this),this.note=null,this.index=null,this.type=b,this.position=d.Position.ABOVE,this.delayed=!1,this.accidental_upper="",this.accidental_lower="",this.render_options={font_scale:38},this.ornament=Vex.Flow.ornamentCodes(this.type),!this.ornament)throw new Vex.RERR("ArgumentError","Ornament not found: '"+this.type+"'");this.setWidth(this.ornament.width)},setDelayed:function(a){return this.delayed=a,this},setUpperAccidental:function(a){return this.accidental_upper=a,this},setLowerAccidental:function(a){return this.accidental_lower=a,this},draw:function(){function a(a,b,d){var e=Vex.Flow.accidentalCodes(b),f=q-3,g=r+2;d?(g-=h?h.height:18,g+="tr"===t.type?-8:0):g+="tr"===t.type?-6:0;var h=c[b];h&&(f+=h.shift_x,g+=d?h.shift_y_upper:h.shift_y_lower);var i=t.render_options.font_scale/1.3;Vex.Flow.renderGlyph(a,f,g,i,e.code),d||(r-=h?h.height:18)}if(!this.context)throw new Vex.RERR("NoContext","Can't draw Ornament without a context.");if(!this.note||null===this.index)throw new Vex.RERR("NoAttachedNote","Can't draw Ornament without a note and index.");var d,e,f=this.context,g=this.note.getStemDirection(),h=this.note.getStave(),i=this.note.getStem().getExtents();g===Vex.Flow.StaveNote.STEM_DOWN?(d=i.baseY,e=i.topY):(d=i.topY,e=i.baseY);var j="tabnotes"===this.note.getCategory();j&&(this.note.hasStem()?g===Vex.Flow.StaveNote.STEM_UP?e=h.getYForBottomText(this.text_line-2):g===Vex.Flow.StaveNote.STEM_DOWN&&(d=h.getYForTopText(this.text_line-1.5)):(d=h.getYForTopText(this.text_line-1),e=h.getYForBottomText(this.text_line-2)));var k=g===Vex.Flow.StaveNote.STEM_DOWN,l=h.getSpacingBetweenLines(),m=1;!k&&this.note.beam&&(m+=.5);var n=l*(this.text_line+m),o=d-7-n,p=this.note.getModifierStartXY(this.position,this.index),q=p.x+this.ornament.shift_right,r=Math.min(h.getYForTopText(this.text_line)-3,o);if(r+=this.ornament.shift_up+this.y_shift,this.delayed){q+=this.ornament.width;var s=Vex.Flow.TickContext.getNextContext(this.note.getTickContext());q+=s?.5*(s.getX()-q):.5*(h.x+h.width-q)}var t=this;this.accidental_lower&&a(f,this.accidental_lower,!1,q,r),b("Rendering ornament: ",this.ornament,q,r),Vex.Flow.renderGlyph(f,q,r,this.render_options.font_scale,this.ornament.code),this.accidental_upper&&a(f,this.accidental_upper,!0,q,r)}}),a}(),Vex.Flow.PedalMarking=function(){function a(a){arguments.length>0&&this.init(a)}function b(){a.DEBUG&&Vex.L("Vex.Flow.PedalMarking",arguments)}function c(b,c,d,e,f){var g=a.GLYPHS[b],h=new Vex.Flow.Glyph(g.code,f);h.render(c,d+g.x_shift,e+g.y_shift)}return a.GLYPHS={pedal_depress:{code:"v36",x_shift:-10,y_shift:0},pedal_release:{code:"v5d",x_shift:-2,y_shift:3}},a.Styles={TEXT:1,BRACKET:2,MIXED:3},a.createSustain=function(b){var c=new a(b);return c},a.createSostenuto=function(b){var c=new a(b);return c.setStyle(a.Styles.MIXED),c.setCustomText("Sost. Ped."),c},a.createUnaCorda=function(b){var c=new a(b);return c.setStyle(a.Styles.TEXT),c.setCustomText("una corda","tre corda"),c},a.prototype={init:function(a){this.notes=a,this.style=Vex.Flow.PedalMarking.TEXT,this.line=0,this.custom_depress_text="",this.custom_release_text="",this.font={family:"Times New Roman",size:12,weight:"italic bold"},this.render_options={bracket_height:10,text_margin_right:6,bracket_line_width:1,glyph_point_size:40,color:"black"}},setCustomText:function(a,b){return this.custom_depress_text=a||"",this.custom_release_text=b||"",this},setStyle:function(a){if(1>a&&a>3)throw new Vex.RERR("InvalidParameter","The style must be one found in PedalMarking.Styles");return this.style=a,this},setLine:function(a){return this.line=a,this},setContext:function(a){return this.context=a,this},drawBracketed:function(){var b,d,e=this.context,f=!1,g=this;this.notes.forEach(function(h,i,j){f=!f;var k=h.getAbsoluteX(),l=h.getStave().getYForBottomText(g.line+3);if(b>k)throw new Vex.RERR("InvalidConfiguration","The notes provided must be in order of ascending x positions");var m=j[i+1]===h,n=j[i-1]===h,o=0;if(f)if(o=n?5:0,g.style!==a.Styles.MIXED||n)e.beginPath(),e.moveTo(k,l-g.render_options.bracket_height),e.lineTo(k+o,l),e.stroke(),e.closePath();else if(g.custom_depress_text){var p=e.measureText(g.custom_depress_text).width;e.fillText(g.custom_depress_text,k-p/2,l),o=p/2+g.render_options.text_margin_right}else c("pedal_depress",e,k,l,g.render_options.glyph_point_size),o=20+g.render_options.text_margin_right;else o=m?-5:0,e.beginPath(),e.moveTo(b,d),e.lineTo(k+o,l),e.lineTo(k,l-g.render_options.bracket_height),e.stroke(),e.closePath();b=k+o,d=l})},drawText:function(){var a=this.context,b=!1,d=this,e=d.render_options.glyph_point_size;this.notes.forEach(function(f){b=!b;var g=f.getStave(),h=f.getAbsoluteX(),i=g.getYForBottomText(d.line+3),j=0;b?d.custom_depress_text?(j=a.measureText(d.custom_depress_text).width,a.fillText(d.custom_depress_text,h-j/2,i)):c("pedal_depress",a,h,i,e):d.custom_release_text?(j=a.measureText(d.custom_release_text).width,a.fillText(d.custom_release_text,h-j/2,i)):c("pedal_release",a,h,i,e)})},draw:function(){if(!this.context)throw new Vex.RERR("NoContext","Can't draw PedalMarking without a context.");var c=this.context;c.save(),c.setStrokeStyle(this.render_options.color),c.setFillStyle(this.render_options.color),c.setFont(this.font.family,this.font.size,this.font.weight),b("Rendering Pedal Marking"),this.style===a.Styles.BRACKET||this.style===a.Styles.MIXED?(c.setLineWidth(this.render_options.bracket_line_width),this.drawBracketed()):this.style===Vex.Flow.PedalMarking.Styles.TEXT&&this.drawText(),c.restore()}},a}(),Vex.Flow.TextBracket=function(){function a(a){arguments.length>0&&this.init(a)}function b(){a.DEBUG&&Vex.L("Vex.Flow.TextBracket",arguments)}return a.Positions={TOP:1,BOTTOM:-1},a.prototype={init:function(b){this.start=b.start,this.stop=b.stop,this.text=b.text||"",this.superscript=b.superscript||"",this.position=b.position||a.Positions.TOP,this.line=1,this.font={family:"Serif",size:15,weight:"italic"},this.render_options={dashed:!0,dash:[5],color:"black",line_width:1,show_bracket:!0,bracket_height:8,underline_superscript:!0}},applyStyle:function(a){return a.setFont(this.font.family,this.font.size,this.font.weight),a.setStrokeStyle(this.render_options.color),a.setFillStyle(this.render_options.color),a.setLineWidth(this.render_options.line_width),this},setDashed:function(a,b){return this.render_options.dashed=a,b&&(this.render_options.dash=b),this},setFont:function(a){return this.font=a,this},setContext:function(a){return this.context=a,this},setLine:function(a){return this.line=a,this},draw:function(){var c=this.context,d=0;switch(this.position){case a.Positions.TOP:d=this.start.getStave().getYForTopText(this.line);break;case a.Positions.BOTTOM:d=this.start.getStave().getYForBottomText(this.line)}var e={x:this.start.getAbsoluteX(),y:d},f={x:this.stop.getAbsoluteX(),y:d};b("Rendering TextBracket: start:",e,"stop:",f,"y:",d);var g=this.render_options.bracket_height*this.position;c.save(),this.applyStyle(c),c.fillText(this.text,e.x,e.y);var h=c.measureText(this.text).width,i=c.measureText("M").width,j=e.y-i/2.5;c.setFont(this.font.family,this.font.size/1.4,this.font.weight),c.fillText(this.superscript,e.x+h+1,j);var k=c.measureText(this.superscript).width,l=c.measureText("M").width,m=e.x,n=j,o=f.x+this.stop.getGlyph().head_width;this.position===a.Positions.TOP?(m+=h+k+5,n-=l/2.7):this.position===a.Positions.BOTTOM&&(n+=l/2.7,m+=h+2,this.render_options.underline_superscript||(m+=k)),this.render_options.dashed?(Vex.Flow.Renderer.drawDashedLine(c,m,n,o,n,this.render_options.dash),this.render_options.show_bracket&&Vex.Flow.Renderer.drawDashedLine(c,o,n+1*this.position,o,n+g,this.render_options.dash)):(c.beginPath(),c.moveTo(m,n),c.lineTo(o,n),this.render_options.show_bracket&&c.lineTo(o,n+g),c.stroke(),c.closePath()),c.restore()}},a}(),Vex.Flow.TextDynamics=function(){function a(a){arguments.length>0&&this.init(a)}function b(){a.DEBUG&&Vex.L("Vex.Flow.TextDynamics",arguments)}return a.GLYPHS={f:{code:"vba",width:12},p:{code:"vbf",width:14},m:{code:"v62",width:17},s:{code:"v4a",width:10},z:{code:"v80",width:12},r:{code:"vb1",width:12}},Vex.Inherit(a,Vex.Flow.Note,{init:function(c){a.superclass.init.call(this,c),this.sequence=c.text.toLowerCase(),this.line=c.line||0,this.glyphs=[],Vex.Merge(this.render_options,{glyph_font_size:40}),b("New Dynamics Text: ",this.sequence)},setLine:function(a){return this.line=a,this},preFormat:function(){var b=0;return this.sequence.split("").forEach(function(c){var d=a.GLYPHS[c];if(!d)throw new Vex.RERR("Invalid dynamics character: "+c);var e=this.render_options.glyph_font_size,f=new Vex.Flow.Glyph(d.code,e);this.glyphs.push(f),b+=d.width},this),this.setWidth(b),this.preFormatted=!0,this},draw:function(){var c=this.getAbsoluteX(),d=this.stave.getYForLine(this.line+-3);b("Rendering Dynamics: ",this.sequence);var e=c;this.glyphs.forEach(function(b,c){var f=this.sequence[c];b.render(this.context,e,d),e+=a.GLYPHS[f].width},this)}}),a}(),Vex.Flow.GraceNote=function(){var a=function(a){arguments.length>0&&this.init(a)};return Vex.Inherit(a,Vex.Flow.StaveNote,{init:function(b){a.superclass.init.call(this,b),this.render_options.glyph_font_scale=22,this.render_options.stem_height=20,this.render_options.stroke_px=2,this.glyph.head_width=6,this.slash=b.slash,this.slur=!0,this.buildNoteHeads(),this.width=3},getStemExtension:function(){var a=this.getGlyph();return null!=this.stem_extension_override?this.stem_extension_override:a?1===this.getStemDirection()?a.gracenote_stem_up_extension:a.gracenote_stem_down_extension:0},getCategory:function(){return"gracenotes"},draw:function(){a.superclass.draw.call(this);var b=this.context,c=this.getStemDirection();if(this.slash){b.beginPath();var d=this.getAbsoluteX(),e=this.getYs()[0]-this.stem.getHeight()/2.8;1===c?(d+=1,b.moveTo(d,e),b.lineTo(d+13,e-9)):-1===c&&(d-=4,e+=1,b.moveTo(d,e),b.lineTo(d+13,e+9)),b.closePath(),b.stroke()}}}),a}(),Vex.Flow.GraceNoteGroup=function(){function a(a,b){arguments.length>0&&this.init(a,b)}function b(){a.DEBUG&&Vex.L("Vex.Flow.GraceNoteGroup",arguments)}return a.CATEGORY="gracenotegroups",a.format=function(a,b){var c=4;if(!a||0===a.length)return!1;var d,e,f,g=[],h=!1,i=null,j=0;for(d=0;d<a.length;++d){e=a[d];var k=e.getNote(),l=k.getStave();if(k!=i){for(var m=0;m<k.keys.length;++m)f=k.getKeyProps()[m],j=f.displaced?k.getExtraLeftPx():j;i=k}null!=l?(h=!0,g.push({shift:j,gracenote_group:e})):g.push({shift:j,gracenote_group:e})}var n=g[0].shift;for(d=0;d<g.length;++d)e=g[d].gracenote_group,e.preFormat(),n=e.getWidth()+c;return b.left_shift+=n,!0},Vex.Inherit(a,Vex.Flow.Modifier,{init:function(b,c){var d=a.superclass;return d.init.call(this),this.note=null,this.index=null,this.position=Vex.Flow.Modifier.Position.LEFT,this.grace_notes=b,this.width=0,this.preFormatted=!1,this.show_slur=c,this.slur=null,this.formatter=new Vex.Flow.Formatter,this.voice=new Vex.Flow.Voice({num_beats:4,beat_value:4,resolution:Vex.Flow.RESOLUTION}).setStrict(!1),this.voice.addTickables(this.grace_notes),this},preFormat:function(){this.preFormatted||(this.formatter.joinVoices([this.voice]).format([this.voice],0),this.setWidth(this.formatter.getMinTotalWidth()),this.preFormatted=!0)},beamNotes:function(){if(this.grace_notes.length>1){var a=new Vex.Flow.Beam(this.grace_notes);a.render_options.beam_width=3,a.render_options.partial_beam_length=4,this.beam=a}return this},setNote:function(a){this.note=a},setWidth:function(a){this.width=a},getWidth:function(){return this.width},setXShift:function(a){this.x_shift=a},draw:function(){function a(a,b){var c=b.getTickContext(),d=c.getExtraPx(),e=c.getX()-d.left-d.extraLeft;a.forEach(function(a){var c=a.getTickContext(),d=c.getX();a.setStave(b.stave),c.setX(e+d)})}if(!this.context)throw new Vex.RuntimeError("NoContext","Can't draw Grace note without a context.");var c=this.getNote();if(b("Drawing grace note group for:",c),!c||null===this.index)throw new Vex.RuntimeError("NoAttachedNote","Can't draw grace note without a parent note and parent note index.");a(this.grace_notes,c),this.grace_notes.forEach(function(a){a.setContext(this.context).draw()},this),this.beam&&this.beam.setContext(this.context).draw(),this.show_slur&&(this.slur=new Vex.Flow.StaveTie({last_note:this.grace_notes[0],first_note:c,first_indices:[0],last_indices:[0]}),this.slur.render_options.cp2=12,this.slur.setContext(this.context).draw())}}),a}(),Vex.Flow.SVGContext=function(){function a(a){arguments.length>0&&this.init(a)}return a.prototype={init:function(a){this.element=a,this.svgNS="http://www.w3.org/2000/svg";var b=this.create("svg");this.element.appendChild(b),this.svg=b,this.path="",this.pen={x:0,y:0},this.lineWidth=1,this.state={scale:{x:1,y:1},"font-family":"Arial","font-size":"8pt","font-weight":"normal"},this.attributes={"stroke-width":.3,fill:"black",stroke:"black","font-family":"Arial","font-size":"10pt","font-weight":"normal","font-style":"normal"},this.background_attributes={"stroke-width":0,fill:"white",stroke:"white","font-family":"Arial","font-size":"10pt","font-weight":"normal","font-style":"normal"},this.shadow_attributes={width:0,color:"black"},this.state_stack=[],this.iePolyfill()},iePolyfill:function(){this.ie=/MSIE 9/i.test(navigator.userAgent)||/MSIE 10/i.test(navigator.userAgent)||/rv:11\.0/i.test(navigator.userAgent)||/Trident/i.test(navigator.userAgent)},setFont:function(a,b,c){var d=!1,e=!1,f="normal";"string"==typeof c&&(-1!==c.indexOf("italic")&&(c=c.replace(/italic/g,""),e=!0),-1!==c.indexOf("bold")&&(c=c.replace(/bold/g,""),d=!0),c=c.replace(/ /g,"")),c=d?"bold":c,c="undefined"==typeof c||""===c?"normal":c,f=e?"italic":f;var g={"font-family":a,"font-size":b+"pt","font-weight":c,"font-style":f};return this.fontSize=Number(b),Vex.Merge(this.attributes,g),Vex.Merge(this.state,g),this},setRawFont:function(a){a=a.trim();var b=a.split(" ");return this.attributes["font-family"]=b[1],this.state["font-family"]=b[1],this.attributes["font-size"]=b[0],this.state["font-size"]=b[0],this.fontSize=Number(b[0].match(/\d+/)),this},setFillStyle:function(a){return this.attributes.fill=a,this},setBackgroundFillStyle:function(a){return this.background_attributes.fill=a,this.background_attributes.stroke=a,this},setStrokeStyle:function(a){return this.attributes.stroke=a,this},setShadowColor:function(a){return this.shadow_attributes.color=a,this},setShadowBlur:function(a){return this.shadow_attributes.width=a,this},setLineWidth:function(a){this.attributes["stroke-width"]=a,this.lineWidth=a},setLineDash:function(a){return this.attributes["stroke-linedash"]=a,this},setLineCap:function(a){return this.attributes["stroke-linecap"]=a,this},resize:function(a,b){this.width=a,this.height=b,this.element.style.width=a;var c={width:a,height:b};return this.applyAttributes(this.svg,c),this},scale:function(a,b){this.state.scale={x:a,y:b};var c=this.width/a,d=this.height/b;return this.setViewBox(0,0,c,d),this},setViewBox:function(a,b,c,d){if(1==arguments.length)this.svg.setAttribute("viewBox",viewBox);else{var e=a+" "+b+" "+c+" "+d;this.svg.setAttribute("viewBox",e)}},applyAttributes:function(a,b){for(var c in b)a.setAttributeNS(null,c,b[c]);return a},create:function(a){return document.createElementNS(this.svgNS,a)},flipRectangle:function(a){a[1]+=a[3],a[3]=-a[3]},clear:function(){for(;this.svg.lastChild;)this.svg.removeChild(this.svg.lastChild);this.scale(this.state.scale.x,this.state.scale.y)},rect:function(a,b,c,d,e){0>d&&this.flipRectangle(arguments);var f=this.create("rect");return"undefined"==typeof e&&(e={fill:"none","stroke-width":this.lineWidth,stroke:"black"}),Vex.Merge(e,{x:a,y:b,width:c,height:d}),this.applyAttributes(f,e),this.svg.appendChild(f),this},fillRect:function(a,b,c,d){return 0>d&&this.flipRectangle(arguments),this.rect(a,b,c-.5,d-.5,this.attributes),this},clearRect:function(a,b,c,d){return 0>d&&this.flipRectangle(arguments),this.rect(a,b,c-.5,d-.5,this.background_attributes),this},beginPath:function(){return this.path="",this.pen.x=0,this.pen.y=0,this},moveTo:function(a,b){return this.path+="M"+a+" "+b,this.pen.x=a,this.pen.y=b,this},lineTo:function(a,b){return this.path+="L"+a+" "+b,this.pen.x=a,this.pen.y=b,this},bezierCurveTo:function(a,b,c,d,e,f){return this.path+="C"+a+" "+b+","+c+" "+d+","+e+" "+f,this.pen.x=e,this.pen.y=f,this},quadraticCurveTo:function(a,b,c,d){return this.path+="Q"+a+" "+b+","+c+" "+d,this.pen.x=c,this.pen.y=d,this},arc:function(a,b,c,d,e,f){function g(a){for(;0>a;)a+=2*Math.PI;for(;a>2*Math.PI;)a-=2*Math.PI;return a}if(d=g(d),e=g(e),d>e){var h=d;d=e,e=h,f=!f}var i=e-d;return i>Math.PI?(this.arcHelper(a,b,c,d,d+i/2,f),this.arcHelper(a,b,c,d+i/2,e,f)):this.arcHelper(a,b,c,d,e,f),this},arcHelper:function(a,b,c,d,e,f){var g=a+c*Math.cos(d),h=b+c*Math.sin(d),i=a+c*Math.cos(e),j=b+c*Math.sin(e),k=0,l=0;f?(l=1,e-d<Math.PI&&(k=1)):e-d>Math.PI&&(k=1),this.path+="M"+g+" "+h+" A"+c+" "+c+" 0 "+k+" "+l+" "+i+" "+j+"M"+this.pen.x+" "+this.pen.y},closePath:function(){return this.path+="Z",this},glow:function(){if(this.shadow_attributes.width>0)for(var a=this.shadow_attributes,b=a.width/2,c=1;b>=c;c++){var d={stroke:a.color,"stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(.4*a.width/b*c).toFixed(3),opacity:+((a.opacity||.3)/b).toFixed(3)},e=this.create("path");d.d=this.path,this.applyAttributes(e,d),this.svg.appendChild(e)}return this},fill:function(a){this.glow();var b=this.create("path");return"undefined"==typeof a&&(a={},Vex.Merge(a,this.attributes),a.stroke="none"),a.d=this.path,this.applyAttributes(b,a),this.svg.appendChild(b),this},stroke:function(){this.glow();var a=this.create("path"),b={};return Vex.Merge(b,this.attributes),b.fill="none",b["stroke-width"]=this.lineWidth,b.d=this.path,this.applyAttributes(a,b),this.svg.appendChild(a),this},measureText:function(a){var b=this.create("text");b.textContent=a,this.applyAttributes(b,this.attributes),this.svg.appendChild(b);var c=b.getBBox();return this.ie&&""!==a&&"italic"==this.attributes["font-style"]&&(c=this.ieMeasureTextFix(c,a)),this.svg.removeChild(b),c},ieMeasureTextFix:function(a){var b=Number(this.fontSize),c=1.196,d=1.9598,e=c*b+d,f=a.width-e,g=a.height-1.5,h={x:a.x,y:a.y,width:f,height:g};return h},fillText:function(a,b,c){var d={};Vex.Merge(d,this.attributes),d.stroke="none",d.x=b,d.y=c;var e=this.create("text");e.textContent=a,this.applyAttributes(e,d),this.svg.appendChild(e)},save:function(){return this.state_stack.push({state:{"font-family":this.state["font-family"],"font-weight":this.state["font-weight"],"font-style":this.state["font-style"],"font-size":this.state["font-size"]},attributes:{"font-family":this.attributes["font-family"],"font-weight":this.attributes["font-weight"],"font-style":this.attributes["font-style"],"font-size":this.attributes["font-size"],fill:this.attributes.fill,stroke:this.attributes.stroke,"stroke-width":this.attributes["stroke-width"]},shadow_attributes:{width:this.shadow_attributes.width,color:this.shadow_attributes.color}}),this},restore:function(){var a=this.state_stack.pop();return this.state["font-family"]=a.state["font-family"],this.state["font-weight"]=a.state["font-weight"],this.state["font-style"]=a.state["font-style"],this.state["font-size"]=a.state["font-size"],this.attributes["font-family"]=a.attributes["font-family"],this.attributes["font-weight"]=a.attributes["font-weight"],this.attributes["font-style"]=a.attributes["font-style"],this.attributes["font-size"]=a.attributes["font-size"],this.attributes.fill=a.attributes.fill,this.attributes.stroke=a.attributes.stroke,this.attributes["stroke-width"]=a.attributes["stroke-width"],this.shadow_attributes.width=a.shadow_attributes.width,this.shadow_attributes.color=a.shadow_attributes.color,this}},a}();
//# sourceMappingURL=vexflow-min.js.map;;
var VF = Vex.Flow;
;;/**
 * Changes:
 * 1) draw(): let left justified notes align with note heads on the left
 * 2) format(): take text height into account when calculating text_line
 * 3) format(): increase text_lines of annotations separately for top, bottom and the rest
 * 4) draw(): Fixed that annotations below stem-less notes with outside of the staff system didn't get
 * shifted with their note
 */



  VF.Annotation.prototype.setMeiElement = function (element) {
    this.meiElement = element;
    return this;
  };

  VF.Annotation.prototype.getMeiElement = function () {
    return this.meiElement;
  };


  VF.Annotation.format = function (annotations, state) {
    if (!annotations || annotations.length === 0) return false;

    var text_line = state.text_line;
    var top_text_line = state.top_text_line;
    var bottom_text_line = state.bottom_text_line;
    var max_width = 0;

    // TODO get this from the stave
    var spacing_between_lines = 10;
    var height_in_lines;

    // Format Annotations
    var width;
    for (var i = 0; i < annotations.length; ++i) {
      var annotation = annotations[i];

      height_in_lines = (annotation.font.size / spacing_between_lines) * 1.5;

      if (annotation.vert_justification === 1) {
        annotation.setTextLine(top_text_line);
        top_text_line += height_in_lines;
      } else if (annotation.vert_justification === 3) {
        annotation.setTextLine(bottom_text_line);
        bottom_text_line += height_in_lines;
      } else {

        annotation.setTextLine(text_line);
        text_line += height_in_lines;
      }

      width = annotation.getWidth() > max_width ? annotation.getWidth() : max_width;
    }

    state.left_shift += width / 2;
    state.right_shift += width / 2;

    state.text_line = text_line;
    state.top_text_line = top_text_line;
    state.bottom_text_line = bottom_text_line;

    return true;
  };


  VF.Annotation.prototype.draw = function () {

    // START ADDITION
    var Annotation = VF.Annotation;
    var Modifier = VF.Modifier;
    // END ADDITION

    if (!this.context) throw new Vex.RERR("NoContext", "Can't draw text annotation without a context.");
    if (!this.note) throw new Vex.RERR("NoNoteForAnnotation", "Can't draw text annotation without an attached note.");

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
      // START MODIFIFICATION
      //x = start.x;
      x = this.note.getAbsoluteX();
      // END MODIFICATION
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
    }
    spacing = stave.getSpacingBetweenLines();

    if (this.vert_justification == Annotation.VerticalJustify.BOTTOM) {
      y = stave.getYForBottomText(this.text_line);
      //console.log('y ' +this.text_line);
      if (has_stem) {
        var stem_base = (this.note.getStemDirection() === 1 ? stem_ext.baseY : stem_ext.topY);
        y = Math.max(y, stem_base + 7 + (spacing * ((this.text_line) + 2)));
      } else {
        y = Math.max(y, this.note.getYs()[0] + 7 + (spacing * ((this.text_line) + 2)));
      }

    } else if (this.vert_justification == Annotation.VerticalJustify.CENTER) {
      var yt = this.note.getYForTopText(this.text_line) - 1;
      var yb = stave.getYForBottomText(this.text_line);
      y = yt + ( yb - yt ) / 2 + text_height / 2;

    } else if (this.vert_justification == Annotation.VerticalJustify.TOP) {
      y = Math.min(stave.getYForTopText(this.text_line), this.note.getYs()[0] - text_height);
      if (has_stem) {
        y = Math.min(y, (stem_ext.topY - 7) - (spacing * this.text_line));
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

    //var context = this.context;
    //context.save();
    //context.beginPath();
    //context.rect(x, y-this.text_height, this.text_width, this.text_height);
    //context.fillStyle = 'rgba(0, 0, 255, 0.5)';
    //context.fill();
    //context.restore();


    this.context.fillText(this.text, x, y);
    this.context.restore();
  };



/**
 * Changes:
 * 1) let left justified notes align with note heads on the left
 * 2) use this.text_line * 2 instead of this.text_line as y starting point so annotations don't
 * collide when default font sizes are used
 * 3) increase text_lines of annotations separately for top, bottom and the rest
 */



  // ## Static Methods
    // Arrange articulations inside `ModifierContext`
  VF.Articulation.format = function(articulations, state) {
    if (!articulations || articulations.length === 0) return false;

    var text_line = state.text_line;
    var top_text_line = state.top_text_line;
    var bottom_text_line = state.bottom_text_line;
    var max_width = 0;

    // Format Articulations
    var width;
    for (var i = 0; i < articulations.length; ++i) {
      var articulation = articulations[i];

      var type = Vex.Flow.articulationCodes(articulation.type);

      if (articulation.position === 3) {
        articulation.setTextLine(top_text_line);
        top_text_line += (type.between_lines) ? 1 : 1.5;
      } else if (articulation.position === 4) {
        articulation.setTextLine(bottom_text_line);
        bottom_text_line += (type.between_lines) ? 1 : 1.5;
      } else {
        articulation.setTextLine(text_line);
        text_line += (type.between_lines) ? 1 : 1.5;
      }

      width = articulation.getWidth() > max_width ?
              articulation.getWidth() : max_width;
    }

    state.left_shift += width / 2;
    state.right_shift += width / 2;

    state.text_line = text_line;
    state.top_text_line = top_text_line;
    state.bottom_text_line = bottom_text_line;

    return true;
  };


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
      if (!is_on_head && !articulation.getNote().hasStem()) {
        // Add stem length, inless it's on a whole note
        note_line += offset_direction * 3.5;
      }

      var articulation_line = note_line + (offset_direction * line_spacing);

      return (articulation_line >= 1 && articulation_line <= 5 && articulation_line % 1 === 0);
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

    var is_above = (this.position === Modifier.Position.ABOVE);
    var note_line = this.note.getLineNumber(is_above);

    // Beamed stems are longer than quarter note stems.
    if (!is_on_head && this.note.beam) {
      line_spacing = this.note.beam.beam_count * 0.5;
    }

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

    //var context = this.context;
    //context.save();
    //context.beginPath();
    //context.rect(glyph_x, glyph_y, 10, 10);
    //context.fillStyle = 'rgba(0, 0, 255, 0.5)';
    //context.fill();
    //context.restore();


    // ### START ADDITION
    this.x = glyph_x;
    this.y = glyph_y;
    // ### END ADDITION

  };






/**
 * Changes:
 * 1) set default partial beam direction to left instead of right (that's the correct direction in
 * most cases; in order to get 100% correct beams, the direction must be calculated on basis of the
 * metrical position of the beam)
 * 2) Changed beaming behavior: Never beam rests, draw partial beams instead
 * 3) Treat rests in beams distinctly so they don't clash with their beam when the beam is
 * below and they don't claim too much space when the beam is above
 * 4) extend beam stems of notes with diverging stem direction
 */






  // [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
  //
  // ## Description
  //
  // This file implements `Beams` that span over a set of `StemmableNotes`.
  //
  // Requires: vex.js, vexmusic.js, note.js
  Vex.Flow.Beam = (function () {
    function Beam(notes, auto_stem) {
      if (arguments.length > 0) this.init(notes, auto_stem);
    }

    var Stem = Vex.Flow.Stem;

    // ## Prototype Methods
    Beam.prototype = {
      init : function (notes, auto_stem) {
        if (!notes || notes == []) {
          throw new Vex.RuntimeError("BadArguments", "No notes provided for beam.");
        }

        if (notes.length == 1) {
          throw new Vex.RuntimeError("BadArguments", "Too few notes for beam.");
        }

        // Validate beam line, direction and ticks.
        this.ticks = notes[0].getIntrinsicTicks();

        if (this.ticks >= Vex.Flow.durationToTicks("4")) {
          throw new Vex.RuntimeError("BadArguments", "Beams can only be applied to notes shorter than a quarter note.");
        }

        var i; // shared iterator
        var note;

        this.stem_direction = Stem.UP;

        for (i = 0; i < notes.length; ++i) {
          note = notes[i];
          if (note.hasStem()) {
            this.stem_direction = note.getStemDirection();
            break;
          }
        }

        var stem_direction = this.stem_direction;
        // Figure out optimal stem direction based on given notes
        if (auto_stem && notes[0].getCategory() === 'stavenotes') {
          stem_direction = calculateStemDirection(notes);
        } else if (auto_stem && notes[0].getCategory() === 'tabnotes') {
          // Auto Stem TabNotes
          var stem_weight = notes.reduce(function (memo, note) {
            return memo + note.stem_direction;
          }, 0);

          stem_direction = stem_weight > -1 ? Stem.UP : Stem.DOWN;
        }

        // Apply stem directions and attach beam to notes
        for (i = 0; i < notes.length; ++i) {
          note = notes[i];
          if (auto_stem) {
            note.setStemDirection(stem_direction);
            this.stem_direction = stem_direction;
          }
          note.setBeam(this);
        }

        this.postFormatted = false;
        this.notes = notes;
        this.beam_count = this.getBeamCount();
        this.break_on_indices = [];
        this.render_options = {
          beam_width : 5,
          max_slope : 0.25,
          min_slope : -0.25,
          slope_iterations : 20,
          slope_cost : 100,
          show_stemlets : false,
          stemlet_extension : 7,
          partial_beam_length : 10
        };
      },

      // The the rendering `context`
      setContext : function (context) {
        this.context = context;
        return this;
      },

      // Get the notes in this beam
      getNotes : function () {
        return this.notes;
      },

      // Get the max number of beams in the set of notes
      getBeamCount : function () {
        var beamCounts = this.notes.map(function (note) {
          return note.getGlyph().beam_count;
        });

        var maxBeamCount = beamCounts.reduce(function (max, beamCount) {
          return beamCount > max ? beamCount : max;
        });

        return maxBeamCount;
      },

      // Set which note `indices` to break the secondary beam at
      breakSecondaryAt : function (indices) {
        this.break_on_indices = indices;
        return this;
      },

      // Return the y coordinate for linear function
      getSlopeY : function (x, first_x_px, first_y_px, slope) {
        return first_y_px + ((x - first_x_px) * slope);
      },

      // Calculate the best possible slope for the provided notes
      calculateSlope : function () {
        var first_note = this.notes[0];
        var first_y_px = first_note.getStemExtents().topY;
        var first_x_px = first_note.getStemX();

        var inc = (this.render_options.max_slope - this.render_options.min_slope) /
                  this.render_options.slope_iterations;
        var min_cost = Number.MAX_VALUE;
        var best_slope = 0;
        var y_shift = 0;

        // iterate through slope values to find best weighted fit
        for (var slope = this.render_options.min_slope; slope <= this.render_options.max_slope; slope += inc) {
          var total_stem_extension = 0;
          var y_shift_tmp = 0;

          // iterate through notes, calculating y shift and stem extension
          for (var i = 1; i < this.notes.length; ++i) {
            var note = this.notes[i];

            var x_px = note.getStemX();
            var y_px = note.getStemExtents().topY;

            // QUICKFIX
            if (note.isRest()) {
              y_px = (this.stem_direction === -1) ? y_px + 70 : y_px + 10;
            }

            var slope_y_px = this.getSlopeY(x_px, first_x_px, first_y_px, slope) + y_shift_tmp;

            // beam needs to be shifted up to accommodate note
            if (y_px * this.stem_direction < slope_y_px * this.stem_direction) {
              var diff = Math.abs(y_px - slope_y_px);
              y_shift_tmp += diff * -this.stem_direction;
              total_stem_extension += (diff * i);
            } else { // beam overshoots note, account for the difference
              total_stem_extension += (y_px - slope_y_px) * this.stem_direction;
            }

          }

          var last_note = this.notes[this.notes.length - 1];
          var first_last_slope = ((last_note.getStemExtents().topY - first_y_px) / (last_note.getStemX() - first_x_px));
          // most engraving books suggest aiming for a slope about half the angle of the
          // difference between the first and last notes' stem length;
          var ideal_slope = first_last_slope / 2;
          var distance_from_ideal = Math.abs(ideal_slope - slope);

          // This tries to align most beams to something closer to the ideal_slope, but
          // doesn't go crazy. To disable, set this.render_options.slope_cost = 0
          var cost = this.render_options.slope_cost * distance_from_ideal + Math.abs(total_stem_extension);

          // update state when a more ideal slope is found
          if (cost < min_cost) {
            min_cost = cost;
            best_slope = slope;
            y_shift = y_shift_tmp;
          }
        }

        this.slope = best_slope;
        this.y_shift = y_shift;
      },

      // Create new stems for the notes in the beam, so that each stem
      // extends into the beams.
      applyStemExtensions : function () {
        var first_note = this.notes[0];
        var first_y_px = first_note.getStemExtents().topY;
        var first_x_px = first_note.getStemX();

        for (var i = 0; i < this.notes.length; ++i) {
          var note = this.notes[i];

          var x_px = note.getStemX();
          var y_extents = note.getStemExtents();
          var base_y_px = y_extents.baseY;
          var top_y_px = y_extents.topY;

          // For harmonic note heads, shorten stem length by 3 pixels
          base_y_px += this.stem_direction * note.glyph.stem_offset;

          // Don't go all the way to the top (for thicker stems)
          var y_displacement = Vex.Flow.STEM_WIDTH;

          if (!note.hasStem()) {
            // SKIPPED in MEI2VF
            //if (note.isRest() && this.render_options.show_stemlets) {
            //  var centerGlyphX = note.getCenterGlyphX();
            //
            //  var width = this.render_options.beam_width;
            //  var total_width = ((this.beam_count - 1) * width * 1.5) + width;
            //
            //  var stemlet_height = (total_width - y_displacement + this.render_options.stemlet_extension);
            //
            //  var beam_y = this.getSlopeY(centerGlyphX, first_x_px, first_y_px, this.slope) + this.y_shift;
            //  var start_y = beam_y + (Vex.Flow.Stem.HEIGHT * this.stem_direction);
            //  var end_y = beam_y + (stemlet_height * this.stem_direction);
            //
            //  // Draw Stemlet
            //  note.setStem(new Vex.Flow.Stem({
            //    x_begin : centerGlyphX,
            //    x_end : centerGlyphX,
            //    y_bottom : this.stem_direction === 1 ? end_y : start_y,
            //    y_top : this.stem_direction === 1 ? start_y : end_y,
            //    y_extend : y_displacement,
            //    stem_extension : -1, // To avoid protruding through the beam
            //    stem_direction : this.stem_direction
            //  }));
            //}
            continue;
          }

          var slope_y = this.getSlopeY(x_px, first_x_px, first_y_px, this.slope) + this.y_shift;

          var note_stem_dir = note.getStemDirection();
          var beam_width = this.render_options.beam_width;
          var stem_through_beams_length = beam_width- 1;
          var regular_beam_count = 0;
          var stem_extension;

          if (note_stem_dir === this.stem_direction) {
            // set stem extension for notes on the regular side of the beam
            stem_extension = Math.abs(top_y_px - slope_y) - Stem.HEIGHT - 1;

          } else {
            // set stem extension for notes on the opposite side of the beam

            var prev_note;
            var k = i;
            while (k--) {
              prev_note = this.notes[k];
              if (prev_note.stem_direction === this.stem_direction) {
                regular_beam_count = prev_note.getBeamCount();
                break;
              }
            }
            //            var next_note = this.notes[i+1];
            //            prev_note.getBeamCount() - next_note.getBeamCount()

            if (regular_beam_count > 1) {
              regular_beam_count = Math.min(regular_beam_count, note.getGlyph().beam_count);
              stem_through_beams_length += (regular_beam_count - 1) * beam_width * 1.5;
            }
            stem_extension = -Math.abs(top_y_px - slope_y) - Stem.HEIGHT + .5 + stem_through_beams_length;
          }


          note.setStem(new Vex.Flow.Stem({
            x_begin : x_px - (Vex.Flow.STEM_WIDTH / 2),
            x_end : x_px,
            y_top : note_stem_dir === 1 ? top_y_px : base_y_px,
            y_bottom : note_stem_dir === 1 ? base_y_px : top_y_px,
            y_extend : y_displacement,
            stem_extension : stem_extension,
            stem_direction : note_stem_dir
          }));


        }
      },

      // Get the x coordinates for the beam lines of specific `duration`
      getBeamLines : function (duration) {
        var beam_lines = [];
        var beam_started = false;
        var current_beam;
        var partial_beam_length = this.render_options.partial_beam_length;

        function determinePartialSide(prev_note, next_note) {
          // Compare beam counts and store differences
          var unshared_beams = 0;
          if (next_note && prev_note) {
            unshared_beams = prev_note.getBeamCount() - next_note.getBeamCount();
          }

          //          var left_partial = duration !== "8" && unshared_beams > 0;
          var right_partial = duration !== "8" && unshared_beams < 0;

          return {
            left : prev_note, right : right_partial
          };
        }

        for (var i = 0; i < this.notes.length; ++i) {
          var note = this.notes[i];
          var prev_note = this.notes[i - 1];
          var next_note = this.notes[i + 1];
          var ticks = note.getIntrinsicTicks();
          var partial = determinePartialSide(prev_note, next_note);
          var stem_x = note.isRest() ? note.getCenterGlyphX() : note.getStemX();

          // Check whether to apply beam(s)
          if (ticks < Vex.Flow.durationToTicks(duration)) {
            if (!beam_started) {
              if (!note.isRest()) {

                var new_line = {
                  start : stem_x, end : null, flipped : note.getStemDirection() !== this.stem_direction
                };

                if (partial.left && !partial.right) {
                  new_line.end = stem_x - partial_beam_length;
                }

                beam_lines.push(new_line);
                beam_started = true;
              }
            } else {
              current_beam = beam_lines[beam_lines.length - 1];
              current_beam.end = stem_x;

              // Should break secondary beams on note
              var should_break = this.break_on_indices.indexOf(i) !== -1;
              // Shorter than or eq an 8th note duration
              var can_break = parseInt(duration, 10) >= 8;
              if (should_break && can_break) {
                beam_started = false;
              }
            }
          } else {
            if (!beam_started) {
              // we don't care
            } else {
              current_beam = beam_lines[beam_lines.length - 1];
              if (current_beam.end == null) {
                // single note
                current_beam.end = current_beam.start + partial_beam_length;
              } else {
                // we don't care
              }
            }

            beam_started = false;
          }
        }

        if (beam_started === true) {
          current_beam = beam_lines[beam_lines.length - 1];
          if (current_beam.end == null) {
            // single note
            current_beam.end = current_beam.start - partial_beam_length;
          }
        }

        return beam_lines;
      },

      // Render the stems for each notes
      drawStems : function () {
        this.notes.forEach(function (note) {
          if (note.getStem()) {
            note.getStem().setContext(this.context).draw();
          }
        }, this);
      },

      // Render the beam lines
      drawBeamLines : function () {
        if (!this.context) throw new Vex.RERR("NoCanvasContext", "Can't draw without a canvas context.");

        var valid_beam_durations = [
          "4",
          "8",
          "16",
          "32",
          "64"
        ];

        var first_note = this.notes[0];
        var last_note = this.notes[this.notes.length - 1];

        var first_y_px = first_note.getStemExtents().topY;
        var last_y_px = last_note.getStemExtents().topY;

        var first_x_px = first_note.getStemX();

        var beam_width = this.render_options.beam_width * this.stem_direction;

        // Draw the beams.
        for (var i = 0; i < valid_beam_durations.length; ++i) {
          var duration = valid_beam_durations[i];
          var beam_lines = this.getBeamLines(duration);

          for (var j = 0; j < beam_lines.length; ++j) {
            var beam_line = beam_lines[j];

            if (!beam_line.flipped) {
              var first_x = beam_line.start - (this.stem_direction == Stem.DOWN ? Vex.Flow.STEM_WIDTH / 2 : 0);
              var first_y = this.getSlopeY(first_x, first_x_px, first_y_px, this.slope);

              var last_x = beam_line.end +
                           (this.stem_direction == 1 ? (Vex.Flow.STEM_WIDTH / 3) : (-Vex.Flow.STEM_WIDTH / 3));
              var last_y = this.getSlopeY(last_x, first_x_px, first_y_px, this.slope);

              this.context.beginPath();
              this.context.moveTo(first_x, first_y + this.y_shift);
              this.context.lineTo(first_x, first_y + beam_width + this.y_shift);
              this.context.lineTo(last_x + 1, last_y + beam_width + this.y_shift);
              this.context.lineTo(last_x + 1, last_y + this.y_shift);
              this.context.closePath();
              this.context.fill();
            }
          }

          first_y_px += beam_width * 1.5;
          last_y_px += beam_width * 1.5;
        }


        // TODO integrate!:


        beam_width = this.render_options.beam_width * this.stem_direction * -1;

        first_y_px = first_note.getStemExtents().topY + (beam_width * 0.5);
        last_y_px = last_note.getStemExtents().topY + (beam_width * 0.5);

        first_x_px = first_note.getStemX();

        var inc = false;

        // Draw the beams.
        for (i = 0; i < valid_beam_durations.length; ++i) {
          duration = valid_beam_durations[i];
          beam_lines = this.getBeamLines(duration);

          for (j = 0; j < beam_lines.length; ++j) {
            beam_line = beam_lines[j];

            if (beam_line.flipped) {
              inc = true;

              first_x = beam_line.start - (this.stem_direction * -1 == Stem.DOWN ? Vex.Flow.STEM_WIDTH / 2 : 0);
              first_y = this.getSlopeY(first_x, first_x_px, first_y_px, this.slope);

              last_x =
              beam_line.end + (this.stem_direction * -1 == 1 ? (Vex.Flow.STEM_WIDTH / 3) : (-Vex.Flow.STEM_WIDTH / 3));
              last_y = this.getSlopeY(last_x, first_x_px, first_y_px, this.slope);

              this.context.beginPath();
              this.context.moveTo(first_x, first_y + this.y_shift);
              this.context.lineTo(first_x, first_y + beam_width + this.y_shift);
              this.context.lineTo(last_x + 1, last_y + beam_width + this.y_shift);
              this.context.lineTo(last_x + 1, last_y + this.y_shift);
              this.context.closePath();
              this.context.fill();

            }
          }

          if (inc) {
            first_y_px += beam_width * 1.5;
            last_y_px += beam_width * 1.5;
          }

        }

      },

      // Pre-format the beam
      preFormat : function () {
        return this;
      },

      // Post-format the beam. This can only be called after
      // the notes in the beam have both `x` and `y` values. ie: they've
      // been formatted and have staves
      postFormat : function () {
        if (this.postFormatted) return;

        this.calculateSlope();
        this.applyStemExtensions();

        this.postFormatted = true;
      },

      // Render the beam to the canvas context
      draw : function () {
        if (!this.context) throw new Vex.RERR("NoCanvasContext", "Can't draw without a canvas context.");

        if (this.unbeamable) return;

        if (!this.postFormatted) {
          this.postFormat();
        }

        this.drawStems();
        this.drawBeamLines();

        return true;
      }
    };

    function calculateStemDirection(notes) {
      var lineSum = 0;
      notes.forEach(function (note) {
        if (note.keyProps) {
          note.keyProps.forEach(function (keyProp) {
            lineSum += (keyProp.line - 3);
          });
        }
      });

      if (lineSum >= 0) {
        return Stem.DOWN;
      }
      return Stem.UP;
    }

    //    // ## Static Methods
    //    //
    //    // Gets the default beam groups for a provided time signature.
    //    // Attempts to guess if the time signature is not found in table.
    //    // Currently this is fairly naive.
    //    Beam.getDefaultBeamGroups = function (time_sig) {
    //      if (!time_sig || time_sig == "c") time_sig = "4/4";
    //
    //      var defaults = {
    //        '1/2' : ['1/2'],
    //        '2/2' : ['1/2'],
    //        '3/2' : ['1/2'],
    //        '4/2' : ['1/2'],
    //
    //        '1/4' : ['1/4'],
    //        '2/4' : ['1/4'],
    //        '3/4' : ['1/4'],
    //        '4/4' : ['1/4'],
    //
    //        '1/8' : ['1/8'],
    //        '2/8' : ['2/8'],
    //        '3/8' : ['3/8'],
    //        '4/8' : ['2/8'],
    //
    //        '1/16' : ['1/16'],
    //        '2/16' : ['2/16'],
    //        '3/16' : ['3/16'],
    //        '4/16' : ['2/16']
    //      };
    //
    //      var Fraction = Vex.Flow.Fraction;
    //      var groups = defaults[time_sig];
    //
    //      if (!groups) {
    //        // If no beam groups found, naively determine
    //        // the beam groupings from the time signature
    //        var beatTotal = parseInt(time_sig.split('/')[0], 10);
    //        var beatValue = parseInt(time_sig.split('/')[1], 10);
    //
    //        var tripleMeter = beatTotal % 3 === 0;
    //
    //        if (tripleMeter) {
    //          return [new Fraction(3, beatValue)];
    //        } else if (beatValue > 4) {
    //          return [new Fraction(2, beatValue)];
    //        } else if (beatValue <= 4) {
    //          return [new Fraction(1, beatValue)];
    //        }
    //      } else {
    //        return groups.map(function (group) {
    //          return new Fraction().parse(group);
    //        });
    //      }
    //    };
    //
    //    // A helper function to automatically build basic beams for a voice. For more
    //    // complex auto-beaming use `Beam.generateBeams()`.
    //    //
    //    // Parameters:
    //    // * `voice` - The voice to generate the beams for
    //    // * `stem_direction` - A stem direction to apply to the entire voice
    //    // * `groups` - An array of `Fraction` representing beat groupings for the beam
    //    Beam.applyAndGetBeams = function (voice, stem_direction, groups) {
    //      return Beam.generateBeams(voice.getTickables(), {
    //        groups : groups,
    //        stem_direction : stem_direction
    //      });
    //    };
    //
    //    // A helper function to autimatically build beams for a voice with
    //    // configuration options.
    //    //
    //    // Example configuration object:
    //    //
    //    // ```
    //    // config = {
    //    //   groups: [new Vex.Flow.Fraction(2, 8)],
    //    //   stem_direction: -1,
    //    //   beam_rests: true,
    //    //   beam_middle_only: true,
    //    //   show_stemlets: false
    //    // };
    //    // ```
    //    //
    //    // Parameters:
    //    // * `notes` - An array of notes to create the beams for
    //    // * `config` - The configuration object
    //    //    * `groups` - Array of `Fractions` that represent the beat structure to beam the notes
    //    //    * `stem_direction` - Set to apply the same direction to all notes
    //    //    * `beam_rests` - Set to `true` to include rests in the beams
    //    //    * `beam_middle_only` - Set to `true` to only beam rests in the middle of the beat
    //    //    * `show_stemlets` - Set to `true` to draw stemlets for rests
    //    //    * `maintain_stem_directions` - Set to `true` to not apply new stem directions
    //    //
    //    Beam.generateBeams = function (notes, config) {
    //
    //      if (!config) config = {};
    //
    //      if (!config.groups || !config.groups.length) {
    //        config.groups = [new Vex.Flow.Fraction(2, 8)];
    //      }
    //
    //      // Convert beam groups to tick amounts
    //      var tickGroups = config.groups.map(function (group) {
    //        if (!group.multiply) {
    //          throw new Vex.RuntimeError("InvalidBeamGroups", "The beam groups must be an array of Vex.Flow.Fractions");
    //        }
    //        return group.clone().multiply(Vex.Flow.RESOLUTION, 1);
    //      });
    //
    //      var unprocessedNotes = notes;
    //      var currentTickGroup = 0;
    //      var noteGroups = [];
    //      var currentGroup = [];
    //
    //      function getTotalTicks(vf_notes) {
    //        return vf_notes.reduce(function (memo, note) {
    //          return note.getTicks().clone().add(memo);
    //        }, new Vex.Flow.Fraction(0, 1));
    //      }
    //
    //      function nextTickGroup() {
    //        if (tickGroups.length - 1 > currentTickGroup) {
    //          currentTickGroup += 1;
    //        } else {
    //          currentTickGroup = 0;
    //        }
    //      }
    //
    //      function createGroups() {
    //        var nextGroup = [];
    //
    //        unprocessedNotes.forEach(function (unprocessedNote) {
    //          nextGroup = [];
    //          if (unprocessedNote.shouldIgnoreTicks()) {
    //            noteGroups.push(currentGroup);
    //            currentGroup = nextGroup;
    //            return; // Ignore untickables (like bar notes)
    //          }
    //
    //          currentGroup.push(unprocessedNote);
    //          var ticksPerGroup = tickGroups[currentTickGroup].clone();
    //          var totalTicks = getTotalTicks(currentGroup);
    //
    //          // Double the amount of ticks in a group, if it's an unbeamable tuplet
    //          var unbeamable = Vex.Flow.durationToNumber(unprocessedNote.duration) < 8;
    //          if (unbeamable && unprocessedNote.tuplet) {
    //            ticksPerGroup.numerator *= 2;
    //          }
    //
    //          // If the note that was just added overflows the group tick total
    //          if (totalTicks.greaterThan(ticksPerGroup)) {
    //            // If the overflow note can be beamed, start the next group
    //            // with it. Unbeamable notes leave the group overflowed.
    //            if (!unbeamable) {
    //              nextGroup.push(currentGroup.pop());
    //            }
    //            noteGroups.push(currentGroup);
    //            currentGroup = nextGroup;
    //            nextTickGroup();
    //          } else if (totalTicks.equals(ticksPerGroup)) {
    //            noteGroups.push(currentGroup);
    //            currentGroup = nextGroup;
    //            nextTickGroup();
    //          }
    //        });
    //
    //        // Adds any remainder notes
    //      if (currentGroup.length > 0)
    //          noteGroups.push(currentGroup);
    //        }
    //
    //      function getBeamGroups() {
    //        return noteGroups.filter(function (group) {
    //          if (group.length > 1) {
    //            var beamable = true;
    //            group.forEach(function (note) {
    //              if (note.getIntrinsicTicks() >= Vex.Flow.durationToTicks("4")) {
    //                beamable = false;
    //              }
    //            });
    //            return beamable;
    //          }
    //          return false;
    //        });
    //      }
    //
    //      // Splits up groups by Rest
    //      function sanitizeGroups() {
    //        var sanitizedGroups = [];
    //        noteGroups.forEach(function (group) {
    //          var tempGroup = [];
    //          group.forEach(function (note, index, group) {
    //            var isFirstOrLast = index === 0 || index === group.length - 1;
    //            var prevNote = group[index - 1];
    //
    //            var breaksOnEachRest = !config.beam_rests && note.isRest();
    //            var breaksOnFirstOrLastRest = (config.beam_rests && config.beam_middle_only && note.isRest() &&
    //                                           isFirstOrLast);
    //
    //            var breakOnStemChange = false;
    //            if (config.maintain_stem_directions && prevNote && !note.isRest() && !prevNote.isRest()) {
    //              var prevDirection = prevNote.getStemDirection();
    //              var currentDirection = note.getStemDirection();
    //              breakOnStemChange = currentDirection !== prevDirection;
    //            }
    //
    //            var isUnbeamableDuration = parseInt(note.duration, 10) < 8;
    //
    //            // Determine if the group should be broken at this note
    //            var shouldBreak = breaksOnEachRest || breaksOnFirstOrLastRest || breakOnStemChange || isUnbeamableDuration;
    //
    //            if (shouldBreak) {
    //              // Add current group
    //              if (tempGroup.length > 0) {
    //                sanitizedGroups.push(tempGroup);
    //              }
    //
    //              // Start a new group. Include the current note if the group
    //              // was broken up by stem direction, as that note needs to start
    //              // the next group of notes
    //              tempGroup = breakOnStemChange ? [note] : [];
    //            } else {
    //              // Add note to group
    //              tempGroup.push(note);
    //            }
    //          });
    //
    //          // If there is a remaining group, add it as well
    //          if (tempGroup.length > 0) {
    //            sanitizedGroups.push(tempGroup);
    //          }
    //        });
    //
    //        noteGroups = sanitizedGroups;
    //      }
    //
    //      function formatStems() {
    //        noteGroups.forEach(function (group) {
    //          var stemDirection;
    //          if (config.maintain_stem_directions) {
    //            var note = findFirstNote(group);
    //            stemDirection = note ? note.getStemDirection() : Stem.UP;
    //          } else {
    //            if (config.stem_direction) {
    //              stemDirection = config.stem_direction;
    //            } else {
    //              stemDirection = calculateStemDirection(group);
    //            }
    //          }
    //          applyStemDirection(group, stemDirection);
    //        });
    //      }
    //
    //      function findFirstNote(group) {
    //        for (var i = 0; i < group.length; i++) {
    //          var note = group[i];
    //          if (!note.isRest()) {
    //            return note;
    //          }
    //        }
    //
    //        return false;
    //      }
    //
    //      function applyStemDirection(group, direction) {
    //        group.forEach(function (note) {
    //          note.setStemDirection(direction);
    //        });
    //      }
    //
    //      function getTupletGroups() {
    //        return noteGroups.filter(function (group) {
    //          if (group[0]) return group[0].tuplet;
    //        });
    //      }
    //
    //
    //      // Using closures to store the variables throughout the various functions
    //      // IMO Keeps it this process lot cleaner - but not super consistent with
    //      // the rest of the API's style - Silverwolf90 (Cyril)
    //      createGroups();
    //      sanitizeGroups();
    //      formatStems();
    //
    //      // Get the notes to be beamed
    //      var beamedNoteGroups = getBeamGroups();
    //
    //      // Get the tuplets in order to format them accurately
    //      var tupletGroups = getTupletGroups();
    //
    //      // Create a Vex.Flow.Beam from each group of notes to be beamed
    //      var beams = [];
    //      beamedNoteGroups.forEach(function (group) {
    //        var beam = new Vex.Flow.Beam(group);
    //
    //        if (config.show_stemlets) {
    //          beam.render_options.show_stemlets = true;
    //        }
    //
    //        beams.push(beam);
    //      });
    //
    //      // Reformat tuplets
    //      tupletGroups.forEach(function (group) {
    //        var firstNote = group[0];
    //        for (var i = 0; i < group.length; ++i) {
    //          if (group[i].hasStem()) {
    //            firstNote = group[i];
    //            break;
    //          }
    //        }
    //
    //        var tuplet = firstNote.tuplet;
    //
    //        if (firstNote.beam) tuplet.setBracketed(false);
    //        if (firstNote.stem_direction == Stem.DOWN) {
    //          tuplet.setTupletLocation(Vex.Flow.Tuplet.LOCATION_BOTTOM);
    //        }
    //      });
    //
    //      return beams;
    //    };

    return Beam;
  }());





  VF.ClefNote.prototype.setMeiElement = function (element) {
    this.meiElement = element;
    return this;
  };
  VF.ClefNote.prototype.getMeiElement = function () {
    return this.meiElement;
  };



  //######## start addition
  VF.ClefNote.prototype.setOffsetLeft = function (offset) {
    this.offsetLeft = offset;
  };
  //######### end addition

  VF.ClefNote.prototype.draw = function () {
    if (!this.stave) throw new Vex.RERR("NoStave", "Can't draw without a stave.");

    if (!this.glyph.getContext()) {
      this.glyph.setContext(this.context);
    }
    var abs_x = this.getAbsoluteX() - (this.offsetLeft || 0);

    this.glyph.setStave(this.stave);
    this.glyph.setYShift(this.stave.getYForLine(this.clef.line) - this.stave.getYForGlyphs());

    // ##########START MODIFICATION
    this.glyph.renderToStave(abs_x);
    // ##########END MODIFICATION

    // If the VF.Clef has an annotation, such as 8va, draw it.
    if (this.clef_obj.annotation !== undefined) {
      var attachment = new VF.Glyph(this.clef_obj.annotation.code, this.clef_obj.annotation.point);
      if (!attachment.getContext()) {
        attachment.setContext(this.context);
      }
      attachment.setStave(this.stave);
      attachment.setYShift(this.stave.getYForLine(this.clef_obj.annotation.line) - this.stave.getYForGlyphs());
      attachment.setXShift(this.clef_obj.annotation.x_shift);
      attachment.renderToStave(abs_x);
    }

  };





  VF.Curve.prototype.renderCurve = function (params) {
    var ctx = this.context;
    var cps = this.render_options.cps;

    var x_shift = this.render_options.x_shift;
    var y_shift = this.render_options.y_shift * params.direction;

    // TODO name variables according to staveTie
    // START MODIFICATION (allows to specify y_shift for start & end
    // note separately):
    var y_shift_start = this.render_options.y_shift_start || 0;
    var y_shift_end = this.render_options.y_shift_end || 0;
    var first_x = params.first_x + x_shift;
    var first_y = params.first_y + y_shift + y_shift_start;
    var last_x = params.last_x - x_shift;
    var last_y = params.last_y + y_shift + y_shift_end;
    // END MODIFICATION

    var thickness = this.render_options.thickness;

    var cp_spacing = (last_x - first_x) / (cps.length + 2);

    ctx.beginPath();

    if (this.render_options.custom_cps) {
      // adjustments to MEI bezier encoding practice
      var cps_0_x = first_x + cps[0].x;
      var cps_0_y = first_y + cps[0].y;
      var cps_1_x = last_x + cps[1].x;
      var cps_1_y = last_y + cps[1].y;
      ctx.moveTo(first_x, first_y);
      ctx.bezierCurveTo(cps_0_x, cps_0_y, cps_1_x, cps_1_y, last_x, last_y);
      ctx.bezierCurveTo(cps_1_x, cps_1_y + thickness, cps_0_x, cps_0_y + thickness, first_x, first_y);
    } else {
      var cps_0_x = cps[0].x;
      var cps_0_y = cps[0].y;
      var cps_1_x = cps[1].x;
      var cps_1_y = cps[1].y;

      var x_diff = last_x-first_x;
      var y_diff = last_y-first_y;

      // decrease height of very narrow slurs
      if(x_diff < 60) {
        cps_0_y = 5 + cps_0_y * (x_diff / 120);
        cps_1_y = 5 + cps_1_y *(x_diff / 120);
      }

      // adjust cps when y_diff is bigger than x_diff
      var max_y_diff = x_diff/2;
      if (y_diff > max_y_diff) {
        if (params.direction === 1) {
          cps_0_y += Math.abs(y_diff);
        } else {
          cps_1_y += Math.abs(y_diff);
        }
      } else if (y_diff < -max_y_diff) {
        //cps[0].y += -y_diff * -1;

        if (params.direction === 1) {
          cps_1_y += Math.abs(y_diff);
        } else {
          cps_0_y += Math.abs(y_diff);
        }
      }


      ctx.moveTo(first_x, first_y);
      ctx.bezierCurveTo(first_x + cp_spacing + cps_0_x,
        first_y + (cps_0_y * params.direction),
        last_x - cp_spacing + cps_1_x,
        last_y + (cps_1_y * params.direction),
        last_x, last_y);
      ctx.bezierCurveTo(last_x - cp_spacing + cps_1_x,
        last_y + ((cps_1_y + thickness) * params.direction),
        first_x + cp_spacing + cps_0_x,
        first_y + ((cps_0_y + thickness) * params.direction),
        first_x, first_y);
    }

    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  };


  VF.Curve.prototype.draw = function () {
    //#######start addition
    var Curve = VF.Curve;
    //###########end addition


    if (!this.context) {
      throw new Vex.RERR("NoContext", "No context to render tie.");
    }
    var first_note = this.from;
    var last_note = this.to;
    var first_x, last_x, first_y, last_y, stem_direction;

    var metric = "baseY";
    var end_metric = "baseY";
    var position = this.render_options.position;
    var position_end = this.render_options.position_end;

    if (position === Curve.Position.NEAR_TOP) {
      metric = "topY";
      end_metric = "topY";
    }

    if (position_end == Curve.Position.NEAR_HEAD) {
      end_metric = "baseY";
    } else if (position_end == Curve.Position.NEAR_TOP) {
      end_metric = "topY";
    }

    if (first_note) {
      first_x = first_note.getTieRightX();
      stem_direction = first_note.getStemDirection();
      first_y = first_note.getStemExtents()[metric];
    } else {
      // ##### START MODIFICATION
      first_x = last_note.getStave().getSlurStartX();
      // ##### END MODIFICATION
      first_y = last_note.getStemExtents()[metric];
    }

    if (last_note) {
      last_x = last_note.getTieLeftX();
      stem_direction = last_note.getStemDirection();
      last_y = last_note.getStemExtents()[end_metric];
    } else {
      // ##### START MODIFICATION
      last_x = first_note.getStave().getSlurEndX();
      // ##### END MODIFICATION
      last_y = first_note.getStemExtents()[end_metric];
    }

    this.renderCurve({
      first_x : first_x,
      last_x : last_x,
      first_y : first_y,
      last_y : last_y,
      direction : stem_direction * (this.render_options.invert === true ? -1 : 1)
    });
    return true;
  };





  VF.articulationCodes.articulations['a^b'] = {   // Marcato below
    code : "v16",
    width : 8,
    shift_right : 0,
    shift_up : 6,
    shift_down : 8,
    between_lines : false
  };

  VF.articulationCodes.articulations['avb'] = {   // Staccatissimo below
    code : "v66",
    width : 4,
    shift_right : 0,
    shift_up : 3,
    shift_down : -3,
    between_lines : true
  };


  VF.Font.glyphs['v66'] = {
    "x_min" : -73.5,
    "x_max" : 72.140625,
    "ha" : 74,
    "o" : "m -36 -126 b 0 0 -17 -56 -1 0 b 70 -254 0 0 70 -249 l 72 -255 l 0 -255 l -73 -255 l -72 -254 b -36 -126 -72 -254 -55 -195 "
  };

  VF.Font.glyphs['v16'] = {
    "x_min" : -155.171875,
    "x_max" : 153.8125,
    "ha" : 157,
    "o" : "m -137 353 b -129 355 -134 353 -132 355 b -102 333 -118 355 -111 348 b -8 129 -63 273 -32 205 b 0 106 -4 116 -1 106 b 6 129 0 106 2 116 b 100 333 31 205 62 273 b 114 349 107 344 108 347 b 127 353 118 352 123 353 b 153 327 141 353 153 344 b 144 302 153 320 153 317 b 29 18 96 227 54 123 l 25 -4 b -1 -26 21 -19 13 -26 b -27 -4 -14 -26 -23 -19 l -31 18 b -145 302 -55 123 -98 227 b -155 327 -155 317 -155 320 b -137 353 -155 340 -148 349 "
  };

  // use square breve glyph instead of VexFlow's ||O||
  VF.durationToGlyph.duration_codes['1/2'].type.n = {code_head : "noteheadDoubleWholeSquare"};

  //fallback: remove when the CMN long is implemented in VexFlow
  if (!VF.durationToTicks.durations['1/4']) {
    VF.durationToTicks.durations['1/4'] = VF.RESOLUTION / 0.25;
  }

  // fallback: remove when the CMN long is implemented in VexFlow
  if (!VF.durationToGlyph.duration_codes['1/4']) {
    VF.durationToGlyph.duration_codes['1/4'] = {
      common : {
        head_width : 22,
        stem : false,
        stem_offset : 0,
        flag : false,
        stem_up_extension : -VF.STEM_HEIGHT,
        stem_down_extension : -VF.STEM_HEIGHT,
        gracenote_stem_up_extension : -VF.STEM_HEIGHT,
        gracenote_stem_down_extension : -VF.STEM_HEIGHT,
        tabnote_stem_up_extension : -VF.STEM_HEIGHT,
        tabnote_stem_down_extension : -VF.STEM_HEIGHT,
        dot_shiftY : 0,
        line_above : 0,
        line_below : 0
      }, type : {
        "n" : { // Longa note
          code_head : "noteheadCMNLonga"
        }, // the following shapes are not supported with longas
        "h" : { // Breve note harmonic
          code_head : "v59"
        }, "m" : { // Breve note muted -
          code_head : "vf", stem_offset : 0
        }, "r" : { // Breve rest
          code_head : "v31", head_width : 24, rest : true, position : "B/5", dot_shiftY : 0.5
        }, "s" : { // Breve note slash -
          // Drawn with canvas primitives
          head_width : 15, position : "B/4"
        }
      }
    };
  }

  VF.Font.glyphs["noteheadDoubleWholeSquare"] = {
    "x_min" : 0,
    "x_max" : 746,
    "ha" : 746,
    "o" : "0 0 117 0 1 1 560 560 1 -1 0 -1120 m 724 350 b 746 328 736 350 746 340 l 746 -328 b 724 -350 746 -339 736 -350 b 701 -328 711 -350 701 -339 l 701 -270 b 659 -234 701 -253 683 -234 l 83 -234 b 45 -276 67 -234 45 -256 l 45 -328 b 22 -350 45 -339 35 -350 b 0 -328 10 -350 0 -339 l 0 328 b 22 350 0 340 10 350 b 45 328 35 350 45 340 l 45 260 b 77 218 45 260 64 218 l 659 218 b 701 265 679 218 701 232 l 701 328 b 724 350 701 340 711 350 m 45 18 l 45 -36 b 146 -94 45 -70 83 -94 l 606 -94 b 701 -36 664 -94 701 -77 l 701 28 b 606 78 701 57 664 78 l 139 78 b 45 18 71 78 45 59 "
  };
  // NOT PART OF BRAVURA:
  VF.Font.glyphs["noteheadCMNLonga"] = {
    "x_min" : 0, "x_max" : 746, "ha" : 746, // based on the Bravura breve glyph; CHANGES: all values < -1400
    "o" : "0 0 117 0 1 1 560 560 1 -1 0 -1120 " + "m 724 350 " + "b 746 328 736 350 746 340 " + "l 746 -1428 " +
          "b 724 -1450 746 -1439 736 -1450 " + "b 701 -1428 711 -1450 701 -1439 " + "l 701 -270 " +
          "b 659 -234 701 -253 683 -234 " + "l 83 -234 " + "b 45 -276 67 -234 45 -256 " + "l 45 -328 " +
          "b 22 -350 45 -339 35 -350 " + "b 0 -328 10 -350 0 -339 " + "l 0 328 " + "b 22 350 0 340 10 350 " +
          "b 45 328 35 350 45 340 " + "l 45 260 " + "b 77 218 45 260 64 218 " + "l 659 218 " +
          "b 701 265 679 218 701 232 " + "l 701 328 " + "b 724 350 701 340 711 350 " + "m 45 18 " + "l 45 -36 " +
          "b 146 -94 45 -70 83 -94 " + "l 606 -94 " + "b 701 -36 664 -94 701 -77 " + "l 701 28 " +
          "b 606 78 701 57 664 78 " + "l 139 78 " + "b 45 18 71 78 45 59 "
  };


/**
 * Modifications:
 * 1) added conditions in draw() to align notes and create new slur only once. If the note
 * alignment function were called multiple times, the grace notes would get shifted further and
 * further each time draw() is called.
 */



  VF.GraceNoteGroup.prototype.draw = function () {
    if (!this.context) {
      throw new Vex.RuntimeError("NoContext", "Can't draw Grace note without a context.");
    }

    var note = this.getNote();

    if (!(note && (this.index !== null))) {
      throw new Vex.RuntimeError("NoAttachedNote", "Can't draw grace note without a parent note and parent note index.");
    }

    function alignGraceNotesWithNote(grace_notes, note) {
      // Shift over the tick contexts of each note
      // So that th aligned with the note
      var tickContext = note.getTickContext();
      var extraPx = tickContext.getExtraPx();
      var x = tickContext.getX() - extraPx.left - extraPx.extraLeft;
      grace_notes.forEach(function (graceNote) {
        var tick_context = graceNote.getTickContext();
        var x_offset = tick_context.getX();
        graceNote.setStave(note.stave);
        tick_context.setX(x + x_offset);
      });
    }

    if (this.graceNotesAligned !== true) {
      alignGraceNotesWithNote(this.grace_notes, note);
      this.graceNotesAligned = true;
    }

    // Draw notes
    this.grace_notes.forEach(function (graceNote) {
      graceNote.setContext(this.context).draw();
    }, this);

    // Draw beam
    if (this.beam) {
      this.beam.setContext(this.context).draw();
    }

    if (this.show_slur) {
      if (!this.slur) {
        // Create and draw slur
        this.slur = new Vex.Flow.StaveTie({
          last_note : this.grace_notes[0],
          first_note : note,
          first_indices : [0],
          last_indices : [0]
        });
        this.slur.render_options.cp2 = 12;
      }
      this.slur.setContext(this.context).draw();
    }
  };





  /**
   * Create hyphens between the specified annotations.
   *
   * @constructor
   */
  VF.Hyphen = ( function () {
    function Hyphen(config) {
      if (arguments.length > 0) {
        this.init(config);
      }
    }

    Hyphen.prototype = {
      init : function (config) {
        /**
         * config is a struct that has:
         *
         *  {
         *    first_annot: Annotation or any other object with an x (and optional
         * y) property,
         *    last_annot: Annotation or any other object with an x (and optional
         * y) property,
         *    NOTE: either first_annot or last_annot must have an y property
         *    (optional) max_hyphen_distance: the maximum distance between two
         * hyphens
         *    (optional) hyphen_width: the width of the hyphen character to draw
         *  }
         *
         **/

        this.max_hyphen_distance = config.max_hyphen_distance || 75;
        this.font = {
          family : "Arial",
          size : 10,
          style : ""
        };

        this.config = config;
        this.context = null;

      },

      setContext : function (context) {
        this.context = context;
        return this;
      },

      setFont : function (font) {
        this.font = font;
        return this;
      },

      renderHyphen : function () {
        var cfg = this.config;
        var ctx = this.context;
        var hyphen_width = cfg.hyphen_width || ctx.measureText('-').width;

        var first = cfg.first_annot;
        var last = cfg.last_annot;

        var start_x = (first.text) ? first.x + first.text_width : first.x;
        var end_x = last.x;

        var distance = end_x - start_x;

        if (distance > hyphen_width) {
          var y = (first.y && last.y) ? (first.y + last.y) / 2 : first.y || last.y;
          var hyphen_count = Math.ceil(distance / this.max_hyphen_distance);
          var single_width = distance / (hyphen_count + 1);
          while (hyphen_count--) {
            start_x += single_width;
            ctx.fillText('-', start_x - hyphen_width / 2, y);
          }
        }
      },

      draw : function () {
        if (!this.context) {
          throw new Vex.RERR("NoContext", "No context to render hyphens.");
        }
        var ctx = this.context;
        ctx.save();
        ctx.setFont(this.font.family, this.font.size, this.font.style);
        this.renderHyphen();
        ctx.restore();
        return true;
      }
    };

    return Hyphen;
  }());








  // [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
  // Author: Cyril Silverman
  //
  // ## Description
  //
  // This file implements key signatures. A key signature sits on a stave
  // and indicates the notes with implicit accidentals.
  VF.KeySignature = (function () {
    // MODIFIED: ADDED PARAMETER
    function KeySignature(keySpec, customPadding) {
      // MODIFIED: ADDED PARAMETER
      if (arguments.length > 0) this.init(keySpec, customPadding);
    }

    // Space between natural and following accidental depending
    // on vertical position
    KeySignature.accidentalSpacing = {
      '#' : {
        above : 6,
        below : 4
      },
      'b' : {
        above : 4,
        below : 7
      },
      'n' : {
        above : 3,
        below : -1
      }
    };

    // ## Prototype Methods
    Vex.Inherit(KeySignature, VF.StaveModifier, {
      // Create a new Key Signature based on a `key_spec`
      // MODIFIED: ADDED PARAMETER
      init : function (key_spec, customPadding) {
        KeySignature.superclass.init();

        // MODIFIED: added 2 lines
        var padding = customPadding || 10;
        this.setPadding(padding);

        this.glyphFontScale = 38; // TODO(0xFE): Should this match StaveNote?
        this.accList = VF.keySignature(key_spec);
      },

      // Add an accidental glyph to the `stave`. `acc` is the data of the
      // accidental to add. If the `next` accidental is also provided, extra
      // width will be added to the initial accidental for optimal spacing.
      addAccToStave : function (stave, acc, next) {
        var glyph_data = VF.accidentalCodes(acc.type);
        var glyph = new VF.Glyph(glyph_data.code, this.glyphFontScale);

        // Determine spacing between current accidental and the next accidental
        var extra_width = 0;
        if (acc.type === "n" && next) {
          var above = next.line >= acc.line;
          var space = KeySignature.accidentalSpacing[next.type];
          extra_width = above ? space.above : space.below;
        }

        // Set the width and place the glyph on the stave
        glyph.setWidth(glyph_data.width + extra_width);
        this.placeGlyphOnLine(glyph, stave, acc.line);
        stave.addGlyph(glyph);
      },

      // Cancel out a key signature provided in the `spec` parameter. This will
      // place appropriate natural accidentals before the key signature.
      cancelKey : function (spec) {
        // Get the accidental list for the cancelled key signature
        var cancel_accList = VF.keySignature(spec);

        // If the cancelled key has a different accidental type, ie: # vs b
        var different_types = this.accList.length > 0 && cancel_accList[0].type !== this.accList[0].type;

        // Determine how many naturals needed to add
        var naturals = 0;
        if (different_types) {
          naturals = cancel_accList.length;
        } else {
          naturals = cancel_accList.length - this.accList.length;
        }

        // Return if no naturals needed
        if (naturals < 1) return;

        // Get the line position for each natural
        var cancelled = [];
        for (var i = 0; i < naturals; i++) {
          var index = i;
          if (!different_types) {
            index = cancel_accList.length - naturals + i;
          }

          var acc = cancel_accList[index];
          cancelled.push({type : "n", line : acc.line});
        }

        // Combine naturals with main accidental list for the key signature
        this.accList = cancelled.concat(this.accList);

        return this;
      },

      // Add the key signature to the `stave`. You probably want to use the
      // helper method `.addToStave()` instead
      addModifier : function (stave) {
        this.convertAccLines(stave.clef, this.accList[0].type);
        for (var i = 0; i < this.accList.length; ++i) {
          this.addAccToStave(stave, this.accList[i], this.accList[i + 1]);
        }
      },

      // Add the key signature to the `stave`, if it's the not the `firstGlyph`
      // a spacer will be added as well.
      addToStave : function (stave, firstGlyph) {
        if (this.accList.length === 0) {
          return this;
        }

        if (!firstGlyph) {
          stave.addGlyph(this.makeSpacer(this.padding));
        }

        this.addModifier(stave);
        return this;
      },

      // Apply the accidental staff line placement based on the `clef` and
      // the  accidental `type` for the key signature ('# or 'b').
      convertAccLines : function (clef, type) {
        var offset = 0.0; // if clef === "treble"

        var sharps;
        var isTenorSharps = !!((clef === "tenor" || clef === 'subbass') && (type === "#"));
        var isSopranoSharps = !!((clef === 'soprano') && (type === "#"));
        var isBaritoneSharps = !!((clef === 'baritone-f' || clef === 'baritone-c') && (type === "#"));


        var isSopranoFlats = !!((clef === 'soprano' || clef === 'baritone-c' || clef === 'baritone-f') &&
                                (type === "b"));
        var isMezzoSopranoFlats = !!((clef === 'mezzo-soprano') && (type === "b"));

        // no shift: treble
        // only shift: bass, french, alto
        // sequence flats:  (baritone-c, baritone-f, soprano), (mezzo-soprano)
        // sequence sharps: (baritone-c, baritone-f), (soprano), (tenor, subbass)
        // # tenor


        switch (clef) {
          case "bass":
            offset = 1;
            break;
          case 'french':
            offset = 1;
            break;
          case "alto":
            offset = 0.5;
            break;

          case "tenor":
            offset = -0.5;
            break;


          case 'mezzo-soprano':
            offset = 1.5;
            break;

          case 'soprano':
            offset = -1;
            break;

          case 'baritone-f':
            offset = -1.5;
            break;
          case 'baritone-c':
            offset = -1.5;
            break;
        }

        // Special-case for sharps
        var i;
        if (isTenorSharps) {
          sharps = [
            3.5,
            1.5,
            3,
            1,
            2.5,
            0.5,
            2
          ];
          for (i = 0; i < this.accList.length; ++i) {
            this.accList[i].line = sharps[i] + offset;
          }
        } else if (isSopranoSharps) {
          sharps = [
            3.5,
            5,
            3,
            4.5,
            2.5,
            4,
            2
          ];
          for (i = 0; i < this.accList.length; ++i) {
            this.accList[i].line = sharps[i] + offset;
          }
        } else if (isSopranoFlats) {
          sharps = [
            2,
            4,
            2.5,
            4.5,
            3,
            5,
            3.5
          ];
          for (i = 0; i < this.accList.length; ++i) {
            this.accList[i].line = sharps[i] + offset;
          }
        } else if (isMezzoSopranoFlats) {
          sharps = [
            2,
            0.5,
            -1,
            1,
            -0.5,
            1.5,
            0
          ];
          for (i = 0; i < this.accList.length; ++i) {
            this.accList[i].line = sharps[i] + offset;
          }
        } else if (isBaritoneSharps) {
          sharps = [
            3.5,
            1.5,
            3,
            1,
            2.5,
            4,
            2
          ];
          for (i = 0; i < this.accList.length; ++i) {
            this.accList[i].line = sharps[i] + offset;
          }
        } else {
          if (clef != "treble") {
            for (i = 0; i < this.accList.length; ++i) {
              this.accList[i].line += offset;
            }
          }
        }
      }
    });

    return KeySignature;
  }());


/**
 * Modifications:
 * 1) added top_text_line and bottom_text_line to state object
 */




  // [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
  //
  // ## Description
  //
  // This class implements various types of modifiers to notes (e.g. bends,
  // fingering positions etc.)

  VF.ModifierContext = (function() {
    function ModifierContext() {
      // Current modifiers
      this.modifiers = {};

      // Formatting data.
      this.preFormatted = false;
      this.postFormatted = false;
      this.width = 0;
      this.spacing = 0;
      this.state = {
        left_shift: 0,
        right_shift: 0,
        text_line: 0,
        top_text_line : 0,
        bottom_text_line : 0
      };

      // Add new modifiers to this array. The ordering is significant -- lower
      // modifiers are formatted and rendered before higher ones.
      this.PREFORMAT = [
        VF.StaveNote,
        VF.Dot,
        VF.FretHandFinger,
        VF.Accidental,
        VF.GraceNoteGroup,
        VF.Stroke,
        VF.StringNumber,
        VF.Articulation,
        VF.Ornament,
        VF.Annotation,
        VF.Bend,
        VF.Vibrato
      ];

      // If post-formatting is required for an element, add it to this array.
      this.POSTFORMAT = [ VF.StaveNote ];
    }

    // To enable logging for this class. Set `VF.ModifierContext.DEBUG` to `true`.
    function L() { if (ModifierContext.DEBUG) Vex.L("VF.ModifierContext", arguments); }

    ModifierContext.prototype = {
      addModifier: function(modifier) {
        var type = modifier.getCategory();
        if (!this.modifiers[type]) this.modifiers[type] = [];
        this.modifiers[type].push(modifier);
        modifier.setModifierContext(this);
        this.preFormatted = false;
        return this;
      },

      getModifiers: function(type) { return this.modifiers[type]; },
      getWidth: function() { return this.width; },
      getExtraLeftPx: function() { return this.state.left_shift; },
      getExtraRightPx: function() { return this.state.right_shift; },
      getState: function() { return this.state; },

      getMetrics: function() {
        if (!this.formatted) throw new Vex.RERR("UnformattedModifier",
          "Unformatted modifier has no metrics.");

        return {
          width: this.state.left_shift + this.state.right_shift + this.spacing,
          spacing: this.spacing,
          extra_left_px: this.state.left_shift,
          extra_right_px: this.state.right_shift
        };
      },

      preFormat: function() {
        if (this.preFormatted) return;
        this.PREFORMAT.forEach(function(modifier) {
          L("Preformatting ModifierContext: ", modifier.CATEGORY);
          modifier.format(this.getModifiers(modifier.CATEGORY), this.state, this);
        }, this);

        // Update width of this modifier context
        this.width = this.state.left_shift + this.state.right_shift;
        this.preFormatted = true;
      },

      postFormat: function() {
        if (this.postFormatted) return;
        this.POSTFORMAT.forEach(function(modifier) {
          L("Postformatting ModifierContext: ", modifier.CATEGORY);
          modifier.postFormat(this.getModifiers(modifier.CATEGORY), this);
        }, this);
      }
    };

    return ModifierContext;
  }());




  VF.Ornament.prototype.setMeiElement = function (element) {
    this.meiElement = element;
    return this;
  };
  VF.Ornament.prototype.getMeiElement = function () {
    return this.meiElement;
  };


  // ## Static Methods
  // Arrange ornaments inside `ModifierContext`
  VF.Ornament.format = function(ornaments, state) {
    if (!ornaments || ornaments.length === 0) return false;

    var text_line = state.text_line;
    var top_text_line = state.top_text_line;
    var bottom_text_line = state.bottom_text_line;
    var max_width = 0;

    // Format Articulations
    var width;
    for (var i = 0; i < ornaments.length; ++i) {
      var ornament = ornaments[i];

      var type = Vex.Flow.ornamentCodes(ornament.type);

      if (ornament.position === 3) {
        ornament.setTextLine(top_text_line);
        top_text_line += (type.between_lines) ? 1 : 1.5;
      } else if (ornament.position=== 4) {
        ornament.setTextLine(bottom_text_line);
        bottom_text_line += (type.between_lines) ? 1 : 1.5;
      } else {
        ornament.setTextLine(text_line);
        text_line += (type.between_lines) ? 1 : 1.5;
      }

      width = ornament.getWidth() > max_width ?
              ornament.getWidth() : max_width;
    }

    state.left_shift += width / 2;
    state.right_shift += width / 2;

    state.text_line = text_line;
    state.top_text_line = top_text_line;
    state.bottom_text_line = bottom_text_line;

    return true;
  };


  VF.Ornament.prototype.draw = function () {
    if (!this.context) throw new Vex.RERR("NoContext", "Can't draw Ornament without a context.");
    if (!(this.note && (this.index !== null))) {
      throw new Vex.RERR("NoAttachedNote", "Can't draw Ornament without a note and index.");
    }

    var ctx = this.context;
    var stem_direction = this.note.getStemDirection();
    var stave = this.note.getStave();

    // TODO support bottom ornaments

    // Get stem extents
    var stem_ext = this.note.getStem().getExtents();
    var top, bottom;
    if (stem_direction === Vex.Flow.StaveNote.STEM_DOWN) {
      top = stem_ext.baseY;
      //bottom = stem_ext.topY;
    } else {
      top = stem_ext.topY;
      //bottom = stem_ext.baseY;
    }

    // TabNotes don't have stems attached to them. Tab stems are rendered
    // outside the stave.
    var is_tabnote = this.note.getCategory() === 'tabnotes';
    if (is_tabnote) {
      if (this.note.hasStem()) {
        if (stem_direction === Vex.Flow.StaveNote.STEM_UP) {
          //bottom = stave.getYForBottomText(this.text_line - 2);
        } else if (stem_direction === Vex.Flow.StaveNote.STEM_DOWN) {
          top = stave.getYForTopText(this.text_line - 1.5);
        }
      } else { // Without a stem
        top = stave.getYForTopText(this.text_line - 1);
        //bottom = stave.getYForBottomText(this.text_line - 2);
      }
    }

    var is_on_head = stem_direction === Vex.Flow.StaveNote.STEM_DOWN;
    var spacing = stave.getSpacingBetweenLines();
    var line_spacing = 1;

    // Beamed stems are longer than quarter note stems, adjust accordingly
    if (!is_on_head && this.note.beam) {
      line_spacing += 0.5;
    }

    var total_spacing = spacing * (this.text_line + line_spacing);
    var glyph_y_between_lines = (top - 7) - total_spacing;

    // Get initial coordinates for the modifier position
    var start = this.note.getModifierStartXY(this.position, this.index);
    var glyph_x = start.x + this.ornament.shift_right;
    var glyph_y = Math.min(stave.getYForTopText(this.text_line) - 3, glyph_y_between_lines);
    glyph_y += this.ornament.shift_up + this.y_shift;

    // Ajdust x position if ornament is delayed
    if (this.delayed) {
      glyph_x += this.ornament.width;
      var next_context = Vex.Flow.TickContext.getNextContext(this.note.getTickContext());
      if (next_context) {
        glyph_x += (next_context.getX() - glyph_x) * 0.5;
      } else {
        glyph_x += (stave.x + stave.width - glyph_x) * 0.5;
      }
    }

    var ornament = this;

    function drawAccidental(ctx, code, upper) {
      var acc_mods = {
        "n" : {
          shift_x : 1,
          shift_y_upper : 0,
          shift_y_lower : 0,
          height : 17
        },
        "#" : {
          shift_x : 0,
          shift_y_upper : -2,
          shift_y_lower : -2,
          height : 20
        },
        "b" : {
          shift_x : 1,
          shift_y_upper : 0,
          shift_y_lower : 3,
          height : 18
        },
        "##" : {
          shift_x : 0,
          shift_y_upper : 0,
          shift_y_lower : 0,
          height : 12
        },
        "bb" : {
          shift_x : 0,
          shift_y_upper : 0,
          shift_y_lower : 4,
          height : 17
        },
        "db" : {
          shift_x : -3,
          shift_y_upper : 0,
          shift_y_lower : 4,
          height : 17
        },
        "bbs" : {
          shift_x : 0,
          shift_y_upper : 0,
          shift_y_lower : 4,
          height : 17
        },
        "d" : {
          shift_x : 0,
          shift_y_upper : 0,
          shift_y_lower : 0,
          height : 17
        },
        "++" : {
          shift_x : -2,
          shift_y_upper : -6,
          shift_y_lower : -3,
          height : 22
        },
        "+" : {
          shift_x : 1,
          shift_y_upper : -4,
          shift_y_lower : -2,
          height : 20
        }
      };

      var accidental = Vex.Flow.accidentalCodes(code);

      var acc_x = glyph_x - 3;
      var acc_y = glyph_y + 2;

      var mods = acc_mods[code];

      // Special adjustments for trill glyph
      if (upper) {
        acc_y -= mods ? mods.height : 18;
        acc_y += ornament.type === "tr" ? -8 : 0;
      } else {
        acc_y += ornament.type === "tr" ? -6 : 0;
      }

      // Fine tune position of accidental glyph
      if (mods) {
        acc_x += mods.shift_x;
        acc_y += upper ? mods.shift_y_upper : mods.shift_y_lower;
      }

      // Render the glyph
      var scale = ornament.render_options.font_scale / 1.3;
      Vex.Flow.renderGlyph(ctx, acc_x, acc_y, scale, accidental.code);

      // If rendered a bottom accidental, increase the y value by the
      // accidental height so that the ornament's glyph is shifted up
      if (!upper) {
        glyph_y -= mods ? mods.height : 18;
      }
    }

    // Draw lower accidental for ornament
    if (this.accidental_lower) {
      drawAccidental(ctx, this.accidental_lower, false, glyph_x, glyph_y);
    }

    Vex.Flow.renderGlyph(ctx, glyph_x, glyph_y, this.render_options.font_scale, this.ornament.code);

    // ADDITION:
    this.x = glyph_x;
    this.y = glyph_y;

    // Draw upper accidental for ornament
    if (this.accidental_upper) {
      drawAccidental(ctx, this.accidental_upper, true, glyph_x, glyph_y);
    }

  };




  // Vex Flow
  // Mohit Muthanna <mohit@muthanna.com>
  //
  // Copyright Mohit Cheppudira 2010

  /** @constructor */
  VF.Stave = (function () {
    function Stave(x, y, width, options) {
      if (arguments.length > 0) this.init(x, y, width, options);
    }

    var THICKNESS = (VF.STAVE_LINE_THICKNESS > 1 ? VF.STAVE_LINE_THICKNESS : 0);
    Stave.prototype = {
      init : function (x, y, width, options) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.start_x = this.getGlyphStartX();
        this.end_x = this.getGlyphEndX();
        this.context = null;
        this.glyphs = [];
        this.end_glyphs = [];
        this.modifiers = [];  // non-glyph stave items (barlines, coda, segno, etc.)
        this.measure = 0;
        this.clef = "treble";
        this.font = {
          family : "sans-serif",
          size : 8,
          weight : ""
        };
        this.options = {
          vertical_bar_width : 10,       // Width around vertical bar end-marker
          glyph_spacing_px : 10,
          num_lines : 5,
          fill_style : "#999999",
          spacing_between_lines_px : 10, // in pixels
          space_above_staff_ln : 4,      // in staff lines
          space_below_staff_ln : 4,      // in staff lines
          top_text_position : 1          // in staff lines
        };
        this.bounds = {x : this.x, y : this.y, w : this.width, h : 0};
        Vex.Merge(this.options, options);

        this.resetLines();

        this.modifiers.push(new VF.Barline(VF.Barline.type.SINGLE, this.x)); // beg bar
        this.modifiers.push(new VF.Barline(VF.Barline.type.SINGLE, this.x + this.width)); // end bar
      },

      getGlyphStartX : function () {
        return this.x + 5;
      },

      getGlyphEndX : function () {
        return this.x + this.width;
      },

      resetLines : function () {
        this.options.line_config = [];
        for (var i = 0; i < this.options.num_lines; i++) {
          this.options.line_config.push({visible : true});
        }
        this.height =
        (this.options.num_lines + this.options.space_above_staff_ln) * this.options.spacing_between_lines_px;
        this.options.bottom_text_position = this.options.num_lines + 1;
      },

      setNoteStartX : function (x) {
        this.start_x = x;
        return this;
      },
      getNoteStartX : function () {
        var start_x = this.start_x;

        // Add additional space if left barline is REPEAT_BEGIN and there are other
        // start modifiers than barlines
        if (this.modifiers[0].barline == VF.Barline.type.REPEAT_BEGIN && this.modifiers.length > 2) {
          start_x += 20;
        }
        return start_x;
      },

      getNoteEndX : function () {
        return this.end_x;
      },
      getTieStartX : function () {
        return this.start_x;
      },
      getTieEndX : function () {
        return this.x + this.width;
      },
      setContext : function (context) {
        this.context = context;
        return this;
      },
      getContext : function () {
        return this.context;
      },

      setX : function (x) {
        var i;
        var dx = (typeof this.x == "number") ? x - this.x : 0;
        //      console.log('dx: ' + dx.toString());
        this.x = x;
        this.bounds.x = x;
        this.start_x += dx;
        for (i = 0; i < this.modifiers.length; i++) {
          this.modifiers[i].x = x;
        }
        return this;
      },

      getX : function () {
        return this.x;
      },
      getNumLines : function () {
        return this.options.num_lines;
      },
      setNumLines : function (lines) {
        this.options.num_lines = parseInt(lines, 10);
        this.resetLines();
        return this;
      },
      setY : function (y) {
        this.y = y;
        return this;
      },

      setWidth : function (width) {
        this.width = width;
        this.end_x = this.getGlyphEndX();

        // reset the x position of the end barline
        this.modifiers[1].setX(this.end_x);
        return this;
      },

      getWidth : function () {
        return this.width;
      },

      setMeasure : function (measure) {
        this.measure = measure;
        return this;
      },

      // Bar Line functions
      setBegBarType : function (type) {
        // Only valid bar types at beginning of stave is none, single or begin repeat
        if (type == VF.Barline.type.SINGLE || type == VF.Barline.type.REPEAT_BEGIN || type == VF.Barline.type.NONE) {
          this.modifiers[0] = new VF.Barline(type, this.x);
        }
        return this;
      },

      setEndBarType : function (type) {
        // Repeat end not valid at end of stave
        if (type != VF.Barline.type.REPEAT_BEGIN) {
          this.modifiers[1] = new VF.Barline(type, this.x + this.width);
        }
        return this;
      },

      /**
       * Gets the pixels to shift from the beginning of the stave
       * following the modifier at the provided index
       * @param  {Number} index The index from which to determine the shift
       * @return {Number}       The amount of pixels shifted
       */
      getModifierXShift : function (index) {
        if (typeof index === 'undefined') index = this.glyphs.length - 1;
        if (typeof index !== 'number') new Vex.RERR("InvalidIndex", "Must be of number type");

        var x = this.getGlyphStartX();
        var bar_x_shift = 0;

        for (var i = 0; i < index + 1; ++i) {
          var glyph = this.glyphs[i];
          x += glyph.getMetrics().width;
          bar_x_shift += glyph.getMetrics().width;
        }

        // Add padding after clef, time sig, key sig
        if (bar_x_shift > 0) bar_x_shift += this.options.vertical_bar_width + 10;

        return bar_x_shift;
      },

      // Coda & Segno Symbol functions
      setRepetitionTypeLeft : function (type, y) {
        this.modifiers.push(new VF.Repetition(type, this.x, y));
        return this;
      },

      setRepetitionTypeRight : function (type, y) {
        this.modifiers.push(new VF.Repetition(type, this.x, y));
        return this;
      },

      // Volta functions
      setVoltaType : function (type, number_t, y) {
        this.modifiers.push(new VF.Volta(type, number_t, this.x, y));
        return this;
      },

      // Section functions
      setSection : function (section, y) {
        this.modifiers.push(new VF.StaveSection(section, this.x, y));
        return this;
      },

      // Tempo functions
      setTempo : function (tempo, y) {
        this.modifiers.push(new VF.StaveTempo(tempo, this.x, y));
        return this;
      },

      // Text functions
      setText : function (text, position, options) {
        this.modifiers.push(new VF.StaveText(text, position, options));
        return this;
      },

      getHeight : function () {
        return this.height;
      },

      getSpacingBetweenLines : function () {
        return this.options.spacing_between_lines_px;
      },

      getBoundingBox : function () {
        return new VF.BoundingBox(this.x, this.y, this.width, this.getBottomY() - this.y);
        // body...
      },

      getBottomY : function () {
        var options = this.options;
        var spacing = options.spacing_between_lines_px;

        return this.getYForLine(options.num_lines) + (options.space_below_staff_ln * spacing);
      },

      getBottomLineY : function () {
        return this.getYForLine(this.options.num_lines);
      },

      getYForLine : function (line) {
        var options = this.options;
        var spacing = options.spacing_between_lines_px;
        var headroom = options.space_above_staff_ln;

        return this.y + ((line * spacing) + (headroom * spacing)) - (THICKNESS / 2);
      },

      getYForTopText : function (line, font_scale) {
        var l = line || 0;
        var scale = font_scale || 1;
        return this.getYForLine(-(l * scale) - this.options.top_text_position);
      },

      getYForBottomText : function (line, font_scale) {
        var l = line || 0;
        var scale = font_scale || 1;
        return this.getYForLine(this.options.bottom_text_position + (l * scale));
      },

      getYForNote : function (line) {
        var options = this.options;
        var spacing = options.spacing_between_lines_px;
        var headroom = options.space_above_staff_ln;

        return this.y + (headroom * spacing) + (5 * spacing) - (line * spacing);
      },

      getYForGlyphs : function () {
        return this.getYForLine(3);
      },

      addGlyph : function (glyph) {
        glyph.setStave(this);
        this.glyphs.push(glyph);
        this.start_x += glyph.getMetrics().width;
        return this;
      },

      addEndGlyph : function (glyph) {
        glyph.setStave(this);
        this.end_glyphs.push(glyph);
        this.end_x -= glyph.getMetrics().width;
        return this;
      },

      addModifier : function (modifier) {
        this.modifiers.push(modifier);
        modifier.addToStave(this, (this.glyphs.length === 0));
        return this;
      },

      addEndModifier : function (modifier) {
        this.modifiers.push(modifier);
        modifier.addToStaveEnd(this, (this.end_glyphs.length === 0));
        return this;
      },

      addKeySignature : function (keySpec) {
        this.addModifier(new VF.KeySignature(keySpec));
        return this;
      },

      addClef : function (clef, size, annotation) {
        this.clef = clef;
        this.addModifier(new VF.Clef(clef, size, annotation));
        return this;
      },

      addEndClef : function (clef, size, annotation) {
        this.addEndModifier(new VF.Clef(clef, size, annotation));
        return this;
      },

      addTimeSignature : function (timeSpec, customPadding) {
        this.addModifier(new VF.TimeSignature(timeSpec, customPadding));
        return this;
      },

      addEndTimeSignature : function (timeSpec, customPadding) {
        this.addEndModifier(new VF.TimeSignature(timeSpec, customPadding));
      },

      addTrebleGlyph : function () {
        this.clef = "treble";
        this.addGlyph(new VF.Glyph("v83", 40));
        return this;
      },

      /**
       * All drawing functions below need the context to be set.
       */
      draw : function () {
        if (!this.context) throw new Vex.RERR("NoCanvasContext", "Can't draw stave without canvas context.");

        var num_lines = this.options.num_lines;
        var width = this.width;
        var x = this.x;
        var y;
        var glyph;

        // Render lines
        for (var line = 0; line < num_lines; line++) {
          y = this.getYForLine(line);

          this.context.save();
          this.context.setFillStyle(this.options.fill_style);
          this.context.setStrokeStyle(this.options.fill_style);
          if (this.options.line_config[line].visible) {
            this.context.fillRect(x, y, width, VF.STAVE_LINE_THICKNESS);
          }
          this.context.restore();
        }

        // Render glyphs
        x = this.getGlyphStartX();
        for (var i = 0; i < this.glyphs.length; ++i) {
          glyph = this.glyphs[i];
          if (!glyph.getContext()) {
            glyph.setContext(this.context);
          }
          glyph.renderToStave(x);
          x += glyph.getMetrics().width;
        }

        // Render end glyphs
        x = this.getGlyphEndX();
        for (i = 0; i < this.end_glyphs.length; ++i) {
          glyph = this.end_glyphs[i];
          if (!glyph.getContext()) {
            glyph.setContext(this.context);
          }
          x -= glyph.getMetrics().width;
          glyph.renderToStave(x);
        }

        // Draw the modifiers (bar lines, coda, segno, repeat brackets, etc.)
        for (i = 0; i < this.modifiers.length; i++) {
          // Only draw modifier if it has a draw function
          if (typeof this.modifiers[i].draw == "function") {
            this.modifiers[i].draw(this, this.getModifierXShift());
          }
        }

        // Render measure numbers
        if (this.measure > 0) {
          this.context.save();
          this.context.setFont(this.font.family, this.font.size, this.font.weight);
          var text_width = this.context.measureText("" + this.measure).width;
          y = this.getYForTopText(0) + 3;
          this.context.fillText("" + this.measure, this.x - text_width / 2, y);
          this.context.restore();
        }

        return this;
      },

      // Draw Simple barlines for backward compatability
      // Do not delete - draws the beginning bar of the stave
      drawVertical : function (x, isDouble) {
        this.drawVerticalFixed(this.x + x, isDouble);
      },

      drawVerticalFixed : function (x, isDouble) {
        if (!this.context) throw new Vex.RERR("NoCanvasContext", "Can't draw stave without canvas context.");

        var top_line = this.getYForLine(0);
        var bottom_line = this.getYForLine(this.options.num_lines - 1);
        if (isDouble) {
          this.context.fillRect(x - 3, top_line, 1, bottom_line - top_line + 1);
        }
        this.context.fillRect(x, top_line, 1, bottom_line - top_line + 1);
      },

      drawVerticalBar : function (x) {
        this.drawVerticalBarFixed(this.x + x, false);
      },

      drawVerticalBarFixed : function (x) {
        if (!this.context) throw new Vex.RERR("NoCanvasContext", "Can't draw stave without canvas context.");

        var top_line = this.getYForLine(0);
        var bottom_line = this.getYForLine(this.options.num_lines - 1);
        this.context.fillRect(x, top_line, 1, bottom_line - top_line + 1);
      },

      /**
       * Get the current configuration for the Stave.
       * @return {Array} An array of configuration objects.
       */
      getConfigForLines : function () {
        return this.options.line_config;
      },

      /**
       * Configure properties of the lines in the Stave
       * @param line_number The index of the line to configure.
       * @param line_config An configuration object for the specified line.
       * @throws Vex.RERR "StaveConfigError" When the specified line number is out of
       *   range of the number of lines specified in the constructor.
       */
      setConfigForLine : function (line_number, line_config) {
        if (line_number >= this.options.num_lines || line_number < 0) {
          throw new Vex.RERR("StaveConfigError", "The line number must be within the range of the number of lines in the Stave.");
        }
        if (!line_config.hasOwnProperty('visible')) {
          throw new Vex.RERR("StaveConfigError", "The line configuration object is missing the 'visible' property.");
        }
        if (typeof(line_config.visible) !== 'boolean') {
          throw new Vex.RERR("StaveConfigError", "The line configuration objects 'visible' property must be true or false.");
        }

        this.options.line_config[line_number] = line_config;

        return this;
      },

      /**
       * Set the staff line configuration array for all of the lines at once.
       * @param lines_configuration An array of line configuration objects.  These objects
       *   are of the same format as the single one passed in to setLineConfiguration().
       *   The caller can set null for any line config entry if it is desired that the default be used
       * @throws Vex.RERR "StaveConfigError" When the lines_configuration array does not have
       *   exactly the same number of elements as the num_lines configuration object set in
       *   the constructor.
       */
      setConfigForLines : function (lines_configuration) {
        if (lines_configuration.length !== this.options.num_lines) {
          throw new Vex.RERR("StaveConfigError", "The length of the lines configuration array must match the number of lines in the Stave");
        }

        // Make sure the defaults are present in case an incomplete set of
        //  configuration options were supplied.
        for (var line_config in lines_configuration) {
          // Allow 'null' to be used if the caller just wants the default for a particular node.
          if (!lines_configuration[line_config]) {
            lines_configuration[line_config] = this.options.line_config[line_config];
          }
          Vex.Merge(this.options.line_config[line_config], lines_configuration[line_config]);
        }

        this.options.line_config = lines_configuration;

        return this;
      }
    };

    return Stave;
  }());





  // Vex Flow Notation
  // Implements key signatures
  //
  // Requires vex.js.

  VF.StaveNote.prototype.getTieRightX = function () {
    var tieStartX = this.getAbsoluteX();
    tieStartX += this.glyph.head_width + this.x_shift + this.extraRightPx;
    //if (this.modifierContext) tieStartX += this.modifierContext.getExtraRightPx();
    return tieStartX;
  };

  VF.StaveNote.prototype.getYForBottomText = function (text_line) {
    var extents = this.getStemExtents();
    return Vex.Max(this.stave.getYForBottomText(text_line), extents.baseY +
                                                            (this.render_options.annotation_spacing * (text_line + 1)));
  };


  // TODO modify to draw lines for whole/half rests outside of the staff system
//  // Draw the ledger lines between the stave and the highest/lowest keys
//  drawLedgerLines: function(){
//    if (this.isRest()) { return; }
//    if (!this.context) throw new Vex.RERR("NoCanvasContext",
//      "Can't draw without a canvas context.");
//    var ctx = this.context;
//
//    var bounds = this.getNoteHeadBounds();
//    var highest_line = bounds.highest_line;
//    var lowest_line = bounds.lowest_line;
//    var head_x = this.note_heads[0].getAbsoluteX();
//
//    var that = this;
//    function stroke(y) {
//      if (that.use_default_head_x === true)  {
//        head_x = that.getAbsoluteX() + that.x_shift;
//      }
//      var x = head_x - that.render_options.stroke_px;
//      var length = ((head_x + that.glyph.head_width) - head_x) +
//                   (that.render_options.stroke_px * 2);
//
//      ctx.fillRect(x, y, length, 1);
//    }
//
//    var line; // iterator
//    for (line = 6; line <= highest_line; ++line) {
//      stroke(this.stave.getYForNote(line));
//    }
//
//    for (line = 0; line >= lowest_line; --line) {
//      stroke(this.stave.getYForNote(line));
//    }
//  };


  VF.StaveNote.prototype.draw = function() {
    if (!this.context) throw new Vex.RERR("NoCanvasContext",
      "Can't draw without a canvas context.");
    if (!this.stave) throw new Vex.RERR("NoStave",
      "Can't draw without a stave.");
    if (this.ys.length === 0) throw new Vex.RERR("NoYValues",
      "Can't draw note without Y values.");

    var x_begin = this.getNoteHeadBeginX();
    var x_end = this.getNoteHeadEndX();

    var render_stem = this.hasStem() && !this.beam;

    // Format note head x positions
    this.note_heads.forEach(function(note_head) {
      note_head.setX(x_begin);
    }, this);


    // Format stem x positions
    this.stem.setNoteHeadXBounds(x_begin, x_end);


    // Draw each part of the note
    this.drawLedgerLines();
    if (render_stem) this.drawStem();
    this.drawNoteHeads();
    this.drawFlag();
    this.drawModifiers();
  }



;
/**
 * Modifications:
 * 1) Added ctx.save() etc
 */



  // VexFlow - Music Engraving for HTML5
  // Copyright Mohit Muthanna 2010
  // This class by Raffaele Viglianti, 2012 http://itisnotsound.wordpress.com/
  //
  // This class implements hairpins between notes.
  // Hairpins can be either Crescendo or Descrescendo.

  /**
   * Create a new hairpin from the specified notes.
   *
   * @constructor
   * @param {!Object} notes The notes to tie up.
   * @param {!Object} type The type of hairpin
   */

  VF.StaveHairpin = (function () {
    function StaveHairpin(notes, type) {
      if (arguments.length > 0) this.init(notes, type);
    }

    StaveHairpin.type = {
      CRESC : 1,
      DECRESC : 2
    };

    /* Helper function to convert ticks into pixels.
     * Requires a Formatter with voices joined and formatted (to
     * get pixels per tick)
     *
     * options is struct that has:
     *
     *  {
     *   height: px,
     *   y_shift: px, //vertical offset
     *   left_shift_ticks: 0, //left horizontal offset expressed in ticks
     *   right_shift_ticks: 0 // right horizontal offset expressed in ticks
     *  }
     *
     **/
    StaveHairpin.FormatByTicksAndDraw = function (ctx, formatter, notes, type, position, options) {
      var ppt = formatter.pixelsPerTick;

      if (ppt == null) {
        throw new Vex.RuntimeError("BadArguments", "A valid Formatter must be provide to draw offsets by ticks.");
      }

      var l_shift_px = ppt * options.left_shift_ticks;
      var r_shift_px = ppt * options.right_shift_ticks;

      var hairpin_options = {
        height : options.height,
        y_shift : options.y_shift,
        left_shift_px : l_shift_px,
        right_shift_px : r_shift_px};

      new StaveHairpin({
        first_note : notes.first_note,
        last_note : notes.last_note
      }, type).setContext(ctx).setRenderOptions(hairpin_options).setPosition(position).draw();
    };

    StaveHairpin.prototype = {

    setMeiElement : function (element) {
      this.meiElement = element;
      return this;
    },

    getMeiElement : function () {
      return this.meiElement;
    },


      init : function (notes, type) {
        /**
         * Notes is a struct that has:
         *
         *  {
       *    first_note: Note,
       *    last_note: Note,
       *  }
         *
         **/

        this.setNotes(notes);
        this.hairpin = type;
        this.position = VF.Modifier.Position.BELOW;

        this.context = null;

        this.render_options = {
          height : 10,
          y_shift : 0, //vertical offset
          left_shift_px : 0, //left horizontal offset
          right_shift_px : 0 // right horizontal offset
        };

        this.setNotes(notes);
      },

      setContext : function (context) {
        this.context = context;
        return this;
      },

      setPosition : function (position) {
        if (position == VF.Modifier.Position.ABOVE || position == VF.Modifier.Position.BELOW) {
          this.position = position;
        }
        return this;
      },

      setRenderOptions : function (options) {
        if (options) {
          Vex.Merge(this.render_options, options);
        }
        return this;
      },

      /**
       * Set the notes to attach this hairpin to.
       *
       * @param {!Object} notes The start and end notes.
       */
      setNotes : function (notes) {
        if (!notes.first_note && !notes.last_note) {
          throw new Vex.RuntimeError("BadArguments", "Hairpin needs to have either first_note or last_note set.");
        }

        // Success. Lets grab 'em notes.
        this.first_note = notes.first_note;
        this.last_note = notes.last_note;
        return this;
      },

      renderHairpin : function (params) {
        var ctx = this.context;

        ctx.save();
        ctx.lineWidth = 1.3;
        ctx.beginPath();

        var dis = this.render_options.y_shift + 20;
        var y_shift = params.first_y;

        if (this.position == VF.Modifier.Position.ABOVE) {
          dis = -dis + 30;
          y_shift = params.first_y - params.staff_height;
        }

        var l_shift = this.render_options.left_shift_px;
        var r_shift = this.render_options.right_shift_px;

        var x, x1, y, height;
        x = params.first_x + l_shift;
        x1 = params.last_x + r_shift;
        y = y_shift + dis;
        height = this.render_options.height;

        this.x = x;
        this.x1 = x1;
        this.y = y;
        this.height = height;

        var height_diff;

        switch (this.hairpin) {
          case StaveHairpin.type.CRESC:
            if (params.continued_left) {
              height_diff = height * 0.2;
              ctx.moveTo(x1 + l_shift, y);
              ctx.lineTo(x, y + height_diff);
              ctx.moveTo(x + l_shift,  y + height - height_diff);
              ctx.lineTo(x1, y + height);
            } else {
              ctx.moveTo(x1, y);
              ctx.lineTo(x, y + (height / 2));
              ctx.lineTo(x1, y + height);
            }
            break;
          case StaveHairpin.type.DECRESC:
            if (params.continued_right) {
              height_diff = height * 0.2;
              ctx.moveTo(x + l_shift, y);
              ctx.lineTo(x1, y + height_diff);
              ctx.moveTo(x1 + l_shift,  y + height - height_diff);
              ctx.lineTo(x, y + height);
            } else {
              ctx.moveTo(x + l_shift, y);
              ctx.lineTo(x1, y + (height / 2));
              ctx.lineTo(x, y + height);
            }
            break;
          default:
            // Default is NONE, so nothing to draw
            break;
        }

        ctx.stroke();
        ctx.restore();
      },

      draw : function () {
        if (!this.context) throw new Vex.RERR("NoContext", "Can't draw Hairpin without a context.");

        var first_note = this.first_note;
        var last_note = this.last_note;
        var start, end;

        if (first_note && last_note) {
          start = first_note.getModifierStartXY(this.position, 0);
          end = last_note.getModifierStartXY(this.position, 0);

          this.renderHairpin({
            first_x : start.x,
            last_x : end.x,
            first_y : first_note.getStave().y + first_note.getStave().height,
            // currently not in use:
//            last_y : last_note.getStave().y + last_note.getStave().height,
            staff_height : first_note.getStave().height,
            continued_left : false,
            continued_right : false
          });
          return true;
        } else if (first_note) {
          start = first_note.getModifierStartXY(this.position, 0);
          this.renderHairpin({
            first_x : start.x,
            last_x : first_note.getStave().getSlurEndX(),
            first_y : first_note.getStave().y + first_note.getStave().height,
            // currently not in use:
            //            last_y : last_note.getStave().y + last_note.getStave().height,
            staff_height : first_note.getStave().height,
            continued_left : false,
            continued_right : true
          });
          return true;

        } else {
          end = last_note.getModifierStartXY(this.position, 0);
          this.renderHairpin({
            first_x : last_note.getStave().getSlurStartX(),
            last_x : end.x,
            first_y : last_note.getStave().y + last_note.getStave().height,
            // currently not in use:
            //            last_y : last_note.getStave().y + last_note.getStave().height,
            staff_height : last_note.getStave().height,
            continued_left : true,
            continued_right : false
          });
        }

      }
    };
    return StaveHairpin;
  }());







  // VexFlow - Music Engraving for HTML5
  // Copyright Mohit Muthanna 2010
  //
  // This class implements varies types of ties between contiguous notes. The
  // ties include: regular ties, hammer ons, pull offs, and slides.

  /**
   * Create a new tie from the specified notes. The notes must
   * be part of the same line, and have the same duration (in ticks).
   *
   * @constructor
   * @param {!Object} context The canvas context.
   * @param {!Object} notes The notes to tie up.
   * @param {!Object} Options
   */
  VF.StaveTie = ( function () {
    function StaveTie(notes, text) {
      if (arguments.length > 0) {
        this.init(notes, text);
      }
    }


    StaveTie.prototype = {
      init : function (notes, text) {
        /**
         * Notes is a struct that has:
         *
         *  {
         *    first_note: Note,
         *    last_note: Note,
         *    first_indices: [n1, n2, n3],
         *    last_indices: [n1, n2, n3]
         *  }
         *
         **/
        this.notes = notes;
        this.context = null;
        this.text = text;

        this.render_options = {
          cp1 : 8, // Curve control point 1
          cp2 : 12, // Curve control point 2
          text_shift_x : 0,
          first_x_shift : 0,
          last_x_shift : 0,
          y_shift : 7,
          tie_spacing : 0,
          font : {
            family : "Arial",
            size : 10,
            style : ""
          }
        };

        this.font = this.render_options.font;
        this.setNotes(notes);
      },

      setContext : function (context) {
        this.context = context;
        return this;
      },
      setFont : function (font) {
        this.font = font;
        return this;
      },

      /**
       * Set the notes to attach this tie to.
       *
       * @param {!Object} notes The notes to tie up.
       */
      setNotes : function (notes) {
        if (!notes.first_note && !notes.last_note) {
          throw new Vex.RuntimeError("BadArguments", "Tie needs to have either first_note or last_note set.");
        }

        if (!notes.first_indices) {
          notes.first_indices = [0];
        }
        if (!notes.last_indices) {
          notes.last_indices = [0];
        }

        if (notes.first_indices.length != notes.last_indices.length) {
          throw new Vex.RuntimeError("BadArguments", "Tied notes must have similar" + " index sizes");
        }

        // Success. Lets grab 'em notes.
        this.first_note = notes.first_note;
        this.first_indices = notes.first_indices;
        this.last_note = notes.last_note;
        this.last_indices = notes.last_indices;
        return this;
      },

      /**
       * @return {boolean} Returns true if this is a partial bar.
       */
      isPartial : function () {
        return (!this.first_note || !this.last_note);
      },

      // START ADDITION
      setDir : function (dir) {
        this.direction = dir;
      },

      getDir : function () {
        return this.direction;
      },
      // END ADDITION

      renderTie : function (params) {
        if (params.first_ys.length === 0 || params.last_ys.length === 0) {
          throw new Vex.RERR("BadArguments", "No Y-values to render");
        }

        var ctx = this.context;
        var cp1 = this.render_options.cp1;
        var cp2 = this.render_options.cp2;

        if (Math.abs(params.last_x_px - params.first_x_px) < 10) {
          cp1 = 2;
          cp2 = 8;
        }

        var first_x_shift = this.render_options.first_x_shift;
        var last_x_shift = this.render_options.last_x_shift;
        var y_shift = this.render_options.y_shift * params.direction;

        for (var i = 0; i < this.first_indices.length; ++i) {
          var cp_x = ((params.last_x_px + last_x_shift) + (params.first_x_px + first_x_shift)) / 2;
          var first_y_px = params.first_ys[this.first_indices[i]] + y_shift;
          var last_y_px = params.last_ys[this.last_indices[i]] + y_shift;

          if (isNaN(first_y_px) || isNaN(last_y_px)) {
            throw new Vex.RERR("BadArguments", "Bad indices for tie rendering.");
          }

          var top_cp_y = ((first_y_px + last_y_px) / 2) + (cp1 * params.direction);
          var bottom_cp_y = ((first_y_px + last_y_px) / 2) + (cp2 * params.direction);

          ctx.beginPath();
          ctx.moveTo(params.first_x_px + first_x_shift, first_y_px);
          ctx.quadraticCurveTo(cp_x, top_cp_y, params.last_x_px + last_x_shift, last_y_px);
          ctx.quadraticCurveTo(cp_x, bottom_cp_y, params.first_x_px + first_x_shift, first_y_px);

          ctx.closePath();
          ctx.fill();
        }
      },

      renderText : function (first_x_px, last_x_px) {
        if (!this.text) {
          return;
        }
        var center_x = (first_x_px + last_x_px) / 2;
        center_x -= this.context.measureText(this.text).width / 2;

        this.context.save();
        this.context.setFont(this.font.family, this.font.size, this.font.style);
        this.context.fillText(this.text, center_x + this.render_options.text_shift_x, (this.first_note ||
                                                                                       this.last_note).getStave().getYForTopText() -
                                                                                      1);
        this.context.restore();
      },

      draw : function () {
        if (!this.context) {
          throw new Vex.RERR("NoContext", "No context to render tie.");
        }
        var first_note = this.first_note;
        var last_note = this.last_note;
        var first_x_px, last_x_px, first_ys, last_ys, stem_direction;

        if (first_note) {
          first_x_px = first_note.getTieRightX() + this.render_options.tie_spacing;
          stem_direction = first_note.getStemDirection();
          first_ys = first_note.getYs();
        } else {
          first_x_px = last_note.getStave().getTieStartX();
          first_ys = last_note.getYs();
          this.first_indices = this.last_indices;
        }

        if (last_note) {
          last_x_px = last_note.getTieLeftX() + this.render_options.tie_spacing;
          stem_direction = last_note.getStemDirection();
          last_ys = last_note.getYs();
        } else {
          last_x_px = first_note.getStave().getTieEndX();
          last_ys = first_note.getYs();
          this.last_indices = this.first_indices;
        }

        // START MODIFICATION
        if (!this.direction) {
          this.direction = stem_direction;
        }

        this.renderTie({
          first_x_px : first_x_px,
          last_x_px : last_x_px,
          first_ys : first_ys,
          last_ys : last_ys,
          direction : this.direction
        });
        // END MODIFICATION

        this.renderText(first_x_px, last_x_px);
        return true;
      }
    };

    return StaveTie;
  }());



/**
 * Changes:
 * 1) set volta start x to measure start even if it's not the first stave modifier (e.g. when
 * a new system starts with a volta
 */



  VF.Volta.prototype.draw = function (stave, x) {

    x-=stave.getModifierXShift();

    var Volta = VF.Volta;

    if (!stave.context) throw new Vex.RERR("NoCanvasContext", "Can't draw stave without canvas context.");
    var ctx = stave.context;
    var width = stave.width;
    var top_y = stave.getYForTopText(stave.options.num_lines) + this.y_shift;
    var vert_height = 1.5 * stave.options.spacing_between_lines_px;
    switch (this.volta) {
      case Vex.Flow.Volta.type.BEGIN:
        ctx.fillRect(this.x + x, top_y, 1, vert_height);
        break;
      case Vex.Flow.Volta.type.END:
        width -= 5;
        ctx.fillRect(this.x + x + width, top_y, 1, vert_height);
        break;
      case Vex.Flow.Volta.type.BEGIN_END:
        width -= 3;
        ctx.fillRect(this.x + x, top_y, 1, vert_height);
        ctx.fillRect(this.x + x + width, top_y, 1, vert_height);
        break;
    }
    // If the beginning of a volta, draw measure number
    if (this.volta == Volta.type.BEGIN || this.volta == Volta.type.BEGIN_END) {
      ctx.save();
      ctx.setFont(this.font.family, this.font.size, this.font.weight);
      ctx.fillText(this.number, this.x + x + 5, top_y + 15);
      ctx.restore();
    }
    ctx.fillRect(this.x + x, top_y, width, 1);
    return this;
  };



/**
 * Modifications:
 * 1) added arrow-less ROLL stroke type
 */

/**
 * VexFlow extension to support tremolos not only on down- but also on up-stems
 */



  // [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
  // Author: Larry Kuhns
  //
  // ## Description
  //
  // This file implements the `Stroke` class which renders chord strokes
  // that can be arpeggiated, brushed, rasquedo, etc.

  Vex.Flow.Stroke = (function () {
    function Stroke(type, options) {
      if (arguments.length > 0) this.init(type, options);
    }

    Stroke.CATEGORY = "strokes";

    Stroke.Type = {
      ROLL : 0,
      BRUSH_DOWN : 1,
      BRUSH_UP : 2,
      ROLL_DOWN : 3,        // Arpegiated chord
      ROLL_UP : 4,          // Arpegiated chord
      RASQUEDO_DOWN : 5,
      RASQUEDO_UP : 6
    };

    var Modifier = Vex.Flow.Modifier;

    // ## Static Methods

    // Arrange strokes inside `ModifierContext`
    Stroke.format = function (strokes, state) {
      var left_shift = state.left_shift;
      var stroke_spacing = 0;

      if (!strokes || strokes.length === 0) return this;

      var str_list = [];
      var i, str, shift;
      for (i = 0; i < strokes.length; ++i) {
        str = strokes[i];
        var note = str.getNote();
        var props;
        if (note instanceof Vex.Flow.StaveNote) {
          props = note.getKeyProps()[str.getIndex()];
          shift = (props.displaced ? note.getExtraLeftPx() : 0);
          str_list.push({ line : props.line, shift : shift, str : str });
        } else {
          props = note.getPositions()[str.getIndex()];
          str_list.push({ line : props.str, shift : 0, str : str });
        }
      }

      var str_shift = left_shift;
      var x_shift = 0;

      // There can only be one stroke .. if more than one, they overlay each other
      for (i = 0; i < str_list.length; ++i) {
        str = str_list[i].str;
        shift = str_list[i].shift;

        str.setXShift(str_shift + shift);
        x_shift = Math.max(str.getWidth() + stroke_spacing, x_shift);
      }

      state.left_shift += x_shift;
      return true;
    };

    // ## Prototype Methods
    Vex.Inherit(Stroke, Modifier, {
      init : function (type, options) {
        Stroke.superclass.init.call(this);

        this.note = null;
        this.options = Vex.Merge({}, options);

        // multi voice - span stroke across all voices if true
        this.all_voices = 'all_voices' in this.options ? this.options.all_voices : true;

        // multi voice - end note of stroke, set in draw()
        this.note_end = null;
        this.index = null;
        this.type = type;
        this.position = Modifier.Position.LEFT;

        this.render_options = {
          font_scale : 38,
          stroke_px : 3,
          stroke_spacing : 10
        };

        this.font = {
          family : "serif",
          size : 10,
          weight : "bold italic"
        };

        this.setXShift(0);
        this.setWidth(10);
      },

      getPosition : function () {
        return this.position;
      },
      addEndNote : function (note) {
        this.note_end = note;
        return this;
      },

      draw : function () {
        if (!this.context) throw new Vex.RERR("NoContext", "Can't draw stroke without a context.");
        if (!(this.note && (this.index != null))) {
          throw new Vex.RERR("NoAttachedNote", "Can't draw stroke without a note and index.");
        }
        var start = this.note.getModifierStartXY(this.position, this.index);
        var ys = this.note.getYs();
        var topY = start.y;
        var botY = start.y;
        var x = start.x - 5;
        var line_space = this.note.stave.options.spacing_between_lines_px;

        var notes = this.getModifierContext().getModifiers(this.note.getCategory());
        var i;
        for (i = 0; i < notes.length; i++) {
          ys = notes[i].getYs();
          for (var n = 0; n < ys.length; n++) {
            if (this.note == notes[i] || this.all_voices) {
              topY = Vex.Min(topY, ys[n]);
              botY = Vex.Max(botY, ys[n]);
            }
          }
        }

        var arrow, arrow_shift_x, arrow_y, text_shift_x, text_y;
        switch (this.type) {
          case Stroke.Type.BRUSH_DOWN:
            arrow = "vc3";
            arrow_shift_x = -3;
            arrow_y = topY - (line_space / 2) + 10;
            botY += (line_space / 2);
            break;
          case Stroke.Type.BRUSH_UP:
            arrow = "v11";
            arrow_shift_x = 0.5;
            arrow_y = botY + (line_space / 2);
            topY -= (line_space / 2);
            break;
          case Stroke.Type.ROLL:
            topY += (line_space / 2);
            if (this.note instanceof Vex.Flow.StaveNote && (botY - topY) % 2 !== 0) {
              botY += 0.5 * line_space;
            } else {
              botY += line_space;
            }
            break;
          case Stroke.Type.ROLL_DOWN:
          case Stroke.Type.RASQUEDO_DOWN:
            arrow = "vc3";
            arrow_shift_x = -3;
            text_shift_x = this.x_shift + arrow_shift_x - 2;
            if (this.note instanceof Vex.Flow.StaveNote) {
              topY += 1.5 * line_space;
              if ((botY - topY) % 2 !== 0) {
                botY += 0.5 * line_space;
              } else {
                botY += line_space;
              }
              arrow_y = topY - line_space;
              text_y = botY + line_space + 2;
            } else {
              topY += 1.5 * line_space;
              botY += line_space;
              arrow_y = topY - 0.75 * line_space;
              text_y = botY + 0.25 * line_space;
            }
            break;
          case Stroke.Type.ROLL_UP:
          case Stroke.Type.RASQUEDO_UP:
            arrow = "v52";
            arrow_shift_x = -4;
            text_shift_x = this.x_shift + arrow_shift_x - 1;
            if (this.note instanceof Vex.Flow.StaveNote) {
              arrow_y = line_space / 2;
              topY += 0.5 * line_space;
              if ((botY - topY) % 2 === 0) {
                botY += line_space / 2;
              }
              arrow_y = botY + 0.5 * line_space;
              text_y = topY - 1.25 * line_space;
            } else {
              topY += 0.25 * line_space;
              botY += 0.5 * line_space;
              arrow_y = botY + 0.25 * line_space;
              text_y = topY - line_space;
            }
            break;
        }

        // Draw the stroke
        if (this.type == Stroke.Type.BRUSH_DOWN || this.type == Stroke.Type.BRUSH_UP) {
          this.context.fillRect(x + this.x_shift, topY, 1, botY - topY);
        } else {
          if (this.note instanceof Vex.Flow.StaveNote) {
            for (i = topY; i <= botY; i += line_space) {
              Vex.Flow.renderGlyph(this.context, x + this.x_shift - 4, i, this.render_options.font_scale, "va3");
            }
          } else {
            for (i = topY; i <= botY; i += 10) {
              Vex.Flow.renderGlyph(this.context, x + this.x_shift - 4, i, this.render_options.font_scale, "va3");
            }
            if (this.type == Vex.Flow.Stroke.Type.RASQUEDO_DOWN) {
              text_y = i + 0.25 * line_space;
            }
          }
        }

        // Draw the arrow head
        if (this.type !== Stroke.Type.ROLL) {
          Vex.Flow.renderGlyph(this.context, x + this.x_shift +
                                             arrow_shift_x, arrow_y, this.render_options.font_scale, arrow);
        }

        // Draw the rasquedo "R"
        if (this.type == Stroke.Type.RASQUEDO_DOWN || this.type == Stroke.Type.RASQUEDO_UP) {
          this.context.save();
          this.context.setFont(this.font.family, this.font.size, this.font.weight);
          this.context.fillText("R", x + text_shift_x, text_y);
          this.context.restore();
        }
      }
    });

    return Stroke;
  }());


/**
 * VexFlow extension to support tremolos not only on down- but also on up-stems
 */



  VF.Tremolo.prototype.draw = function () {
    if (!this.context) throw new Vex.RERR("NoContext", "Can't draw Tremolo without a context.");
    if (!(this.note && (this.index != null))) {
      throw new Vex.RERR("NoAttachedNote", "Can't draw Tremolo without a note and index.");
    }


    var stem = this.note.getStem();

    var start, x, y;

    if (this.note.duration === 'w') {
      x = (stem.x_end + stem.x_begin) / 2;
      if (stem.stem_direction === 1) {
        y = stem.getExtents().topY - (this.y_spacing * this.num / 2) + stem.stem_extension;
      } else {
        start = this.note.getModifierStartXY(this.position, this.index);
        y = start.y;
      }
    } else if (stem.stem_direction === 1) {
      x = stem.x_end;
      y = stem.getExtents().topY - (this.y_spacing * this.num / 2);
    } else {
      start = this.note.getModifierStartXY(this.position, this.index);
      x = start.x; // or stem.x_begin
      y = start.y;
    }

    x += this.shift_right;
    for (var i = 0; i < this.num; ++i) {
      Vex.Flow.renderGlyph(this.context, x, y, this.render_options.font_scale, this.code);
      y += this.y_spacing;
    }
  };


;


  var RuntimeError = function (message) {
    this.name = 'MEI2VF Runtime Error';
    this.message = message;
    this.stack = (new Error()).stack;
  };
  RuntimeError.prototype = new Error;
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


  var DefaultAppender = {
    error : function () {
      window.console.error('MEI2VF (' + arguments[0] + "): " + Array.prototype.slice.call(arguments, 1).join(' '));
    },
    info : function () {
      window.console.info('MEI2VF (' + arguments[0] + "): " + Array.prototype.slice.call(arguments, 1).join(' '));
    },
    warn : function () {
      window.console.warn('MEI2VF (' + arguments[0] + "): " + Array.prototype.slice.call(arguments, 1).join(' '));
    },
    debug : function () {
      window.console.log('MEI2VF (' + arguments[0] + "): " + Array.prototype.slice.call(arguments, 1).join(' '));
    }
  };
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


  var emptyFn = function () {
  };

  var Logger = {

    error : emptyFn,
    info : emptyFn,
    warn : emptyFn,
    debug : emptyFn,

    /**
     * An appender object to which the log messages are sent; has to provide the methods error, info, warn and debug;
     * defaults to window.console
     */
    appender : DefaultAppender,

    /**
     * Sets the object to which log messages are sent
     * @param appender
     * @returns {Logger}
     */
    setAppender : function (appender) {
      if (typeof appender === 'object') {
        if (typeof appender.error === 'function' && typeof appender.warn === 'function' &&
            typeof appender.info === 'function' && typeof appender.debug === 'function') {
          this.appender = appender;
          return this;
        }
        throw new RuntimeError('Parameter object does not contain the expected appender methods.');
      }
      throw new RuntimeError('Parameter is not an object');
    },

    /**
     * @method setLevel sets the logging level. Values:
     *
     * - 'debug'|true debug messages
     * - 'info' info, e.g. unsupported elements
     * - 'warn' warnings, e.g. wrong encodings
     * - 'error' errors
     * - false no logging
     * @param {String} level
     */
    setLevel : function (level) {
      var i, j, allLevels, activate = false;
      allLevels = [
        'debug',
        'info',
        'warn',
        'error'
      ];
      if (level === true) activate = true;
      for (i = 0, j = allLevels.length; i < j; i += 1) {
        if (allLevels[i] === level) activate = true;
        if (activate) {
          this[allLevels[i]] = this.appender[allLevels[i]].bind(this.appender);
        } else {
          this[allLevels[i]] = emptyFn;
        }
      }
    }
    
  };
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


  /**
   * @class MEI2VF.Util
   * @singleton
   * @private
   */
  var Util = {

    /**
     * returns the attributes of an element or an empty object if the element doesn't have attributes
     */
    attsToObj : function (element) {
      var i, obj = {};
      if (element.hasAttributes()) {
        i = element.attributes.length;
        while (i--) {
          obj[element.attributes[i].nodeName] = element.attributes[i].nodeValue;
        }
      }
      return obj;
    },

    pListToArray : function (pList) {
      return (pList !== null) ? pList.split(' ') : [];
    },

    /**
     *
     */
    serializeElement : function (element) {
      var result = '<' + element.localName, i, j, atts, att;
      if (element.hasAttributes()) {
        atts = element.attributes;
        for (i = 0, j = atts.length; i < j; i += 1) {
          att = atts.item(i);
          result += ' ' + att.nodeName + '="' + att.nodeValue + '"';
        }
      }
      return result + '>';
    },


    /**
     * jQuery's method, without window check
     * @param obj
     * @returns {boolean}
     */
    isPlainObject : function (obj) {
      // Not plain objects:
      // - Any object or value whose internal [[Class]] property is not "[object Object]"
      // - DOM nodes
      if (typeof obj !== "object" || obj.nodeType) {
        return false;
      }
      if (obj.constructor && !obj.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
      // If the function hasn't returned already, we're confident that
      // |obj| is a plain object, created by {} or constructed with new Object
      return true;
    },

    /**
     * jQuery's extend method, without deep parameter (deep is assumed to be true)
     */
    extend : function () {
      var options, name, src, copy, copyIsArray, clone, target = arguments[ 0 ] || {}, i = 1, length = arguments.length;

      if (typeof target !== "object" && typeof target !== 'function') {
        target = {};
      }

      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[ i ]) != null) {
          // Extend the base object
          for (name in options) {
            src = target[ name ];
            copy = options[ name ];
            // Prevent never-ending loop
            if (target === copy) {
              continue;
            }
            // Recurse if we're merging plain objects or arrays
            if (copy && ( Util.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) )) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && Array.isArray(src) ? src : [];
              } else {
                clone = src && Util.isPlainObject(src) ? src : {};
              }
              // Never move original objects, clone them
              target[ name ] = Util.extend(clone, copy);
              // Don't bring in undefined values
            } else if (copy !== undefined) {
              target[ name ] = copy;
            }
          }
        }
      }
      // Return the modified object
      return target;
    },

    // from sizzle.js
    getText : function (elem) {
      var node, ret = "", i = 0, nodeType = elem.nodeType;
      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while ((node = elem[i++])) {
          // Do not traverse comment nodes
          ret += this.getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += this.getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      // Do not include comment or processing instruction nodes
      return ret;
    },

    getNormalizedText : function (elem) {
      return Util.getText(elem).replace(/\s+/g, ' ')
    }

  };


  if (!window.MeiLib) window.MeiLib = {};

  /**
   * @class RuntimeError
   *
   * @constructor
   * @param {String} errorcode
   * @param {String} message
   */
  MeiLib.RuntimeError = function (errorcode, message) {
    this.errorcode = errorcode;
    this.message = message;
  };
  /**
   * @method toString
   * @return {String} the string representation of the error
   */
  MeiLib.RuntimeError.prototype.toString = function () {
    return 'MeiLib.RuntimeError: ' + this.errorcode + ': ' + this.message ? this.message : "";
  };
  /**
   * @class MeiLib
   * @singleton
   */;


  if (!window.MeiLib) window.MeiLib = {};

  /**
   * @class MeiLib.EventEnumerator
   * Enumerate over the children events of node (node is a layer, beam or tuplet).
   * @constructor
   * @param {Object} node an XML DOM object
   * @param {Object} proportion
   */
  MeiLib.EventEnumerator = function (node, proportion) {
    this.init(node, proportion);
  };
  /**
   * @method init
   * @param {Node} node
   * @param {Object} proportion
   */
  MeiLib.EventEnumerator.prototype.init = function (node, proportion) {
    if (!node) {
      throw new MeiLib.RuntimeError('MeiLib.EventEnumerator.init():E01', 'node is null or undefined');
    }
    this.node = node;
    this.next_evnt = null;
    // false if and only if next_evnt is valid.
    this.EoI = true;
    this.children = this.node.childNodes;
    this.i_next = -1;
    this.proportion = proportion || {
      num : 1,
      numbase : 1
    };
    this.outputProportion = proportion || {
      num : 1,
      numbase : 1
    };
    this.read_ahead();
  };
  /**
   * @method nextEvent
   * @public
   * @return
   */
  MeiLib.EventEnumerator.prototype.nextEvent = function () {
    if (!this.EoI) {
      var result = this.next_evnt;
      this.read_ahead();
      return result;
    }
    throw new MeiLib.RuntimeError('MeiLib.LayerEnum:E01', 'End of Input.')
  };

  /**
   * @method read_ahead
   * @private
   * @return
   */
  MeiLib.EventEnumerator.prototype.read_ahead = function () {
    if (this.beam_enumerator) {
      if (!this.beam_enumerator.EoI) {
        this.next_evnt = this.beam_enumerator.nextEvent();
        this.EoI = false;
      } else {
        this.EoI = true;
        this.beam_enumerator = null;
        this.step_ahead()
      }
    } else {
      this.step_ahead()
    }
  };

  /**
   * @method step_ahead
   * @private
   */
  MeiLib.EventEnumerator.prototype.step_ahead = function () {
    var end = false, i_next = this.i_next, children = this.children;

    while (!end) {
      ++i_next;
      if (i_next === children.length || children[i_next].nodeType === 1) {
        end = true;
      }
    }

    if (i_next < children.length) {
      this.next_evnt = children[i_next];
      var node_name = this.next_evnt.localName;
      if (node_name === 'note' || node_name === 'rest' || node_name === 'mRest' || node_name === 'chord') {
        this.EoI = false;
      } else if (node_name === 'beam') {
        this.beam_enumerator = new MeiLib.EventEnumerator(this.next_evnt);
        if (!this.beam_enumerator.EoI) {
          this.next_evnt = this.beam_enumerator.nextEvent();
          this.EoI = false;
        } else {
          this.EoI = true;
        }
      } else if (node_name === 'tuplet') {

        var proportion = {
          num : this.proportion.num * +this.next_evnt.getAttribute('num') || 3,
          numbase : this.proportion.numbase * +this.next_evnt.getAttribute('numbase') || 2
        };

        this.beam_enumerator = new MeiLib.EventEnumerator(this.next_evnt, proportion);
        if (!this.beam_enumerator.EoI) {
          this.outputProportion = this.beam_enumerator.outputProportion;
          this.next_evnt = this.beam_enumerator.nextEvent();
          this.EoI = false;
        } else {
          this.outputProportion = this.proportion;
          this.EoI = true;
        }
      }
    } else {
      this.EoI = true;
    }
    this.i_next = i_next;
  };


  if (!window.MeiLib) window.MeiLib = {};

  /**
   * @method SliceMEI
   * Returns a slice of the MEI. The slice is specified by the number of the
   * starting and ending measures.
   *
   * About the <code>staves</code> parameter: it specifies a list of staff
   * numbers. If it is defined, only the listed staves will be kept in the
   * resulting slice. The following elements will be removed from:
   *
   * 1. <b>staffDef</b> elements (@staff value is matched against the specified list)
   * 2. <b>staff</b> elements (@n value is matched against the specified list)
   * 3. any other child element of measures that has
   *
   * @staff specified AND it is not listed.
   *
   * Note that <b>staff</b> elements without @n will be removed.
   *
   * @param {Object} MEI
   * @param {Object} params like { start_n:NUMBER, end_n:NUMBER, noKey:BOOLEAN,
 *            noClef:BOOLEAN, noMeter:BOOLEAN, noConnectors, staves:[NUMBER] },
   *            where <code>noKey</code>, <code>noClef</code> and
   *            <code>noMeter</code> and <code>noConnectors</code> are
   *            optional. taves is optional. If staves is set, it is an array of
   *            staff numbers. Only the staves specified in the list will be
   *            included in the resulting MEI.
   * @return XML DOM object
   */
  MeiLib.SliceMEI = function (MEI, params) {

    var i, j;

    var setVisibles = function (elements, params) {
      var i, j, elem;
      for (i = 0, j = elements.length; i < j; i++) {
        elem = elements[i];
        if (params.noClef) {
          elem.setAttribute('clef.visible', 'false');
        }
        if (params.noKey) {
          elem.setAttribute('key.sig.show', 'false');
        }
        if (params.noMeter) {
          elem.setAttribute('meter.rend', 'false');
        }
      }
    };

    /**
     * Keep or remove child from section depending whether it's inside the section or not.
     * If it's kept, remove unwanted staves
     */
    var keepOrRemove = function (elem, inside_slice, staffNSelector, params) {
      var i, j, staffElements, staffElement, n, removed = false;
      if (!inside_slice) {
        if (elem.localName === 'measure' && Number(elem.getAttribute('n')) === params.start_n) {
          inside_slice = true;
        } else {
          elem.parentNode.removeChild(elem);
          removed = true;
        }
      }

      if (inside_slice) {
        // remove unwanted staff
        if (params.staves && elem.nodeType === 1) {
//          $(elem).find('[staff]').remove(':not(' + staffNSelector + ')');

          var elementsToRemove = elem.querySelectorAll('[staff]' + staffNSelector);
          for (i= 0, j=elementsToRemove.length;i<j;i++){
            elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
          }

          staffElements = elem.getElementsByTagName('staff');
          for (i = 0, j = staffElements.length; i < j; i++) {
            staffElement = staffElements[i];
            n = Number(staffElement.getAttribute('n'));
            if (params.staves.indexOf(n) === -1) {
              staffElement.parentNode.removeChild(staffElement);
              i--;
              j--;
            }
          }
        }

        // finish inside_slice state if it's the end of slice.
        if (elem.localName === 'measure' && Number(elem.getAttribute('n')) === params.end_n) {
          inside_slice = false;
        }
      }
      return {inside_slice: inside_slice, removed: removed};
    };

    var paramsStaves = params.staves;
    if (paramsStaves) {
      var staffDefSelector = '';
      var staffNSelector = '';
      for (i = 0, j = paramsStaves.length; i < j; i++) {
        staffDefSelector += ':not([n="' + paramsStaves[i] + '"])';
        staffNSelector += ':not([staff="' + paramsStaves[i] + '"])';
      }
    }

    var slice = MEI.cloneNode(true);
    if (paramsStaves) {
      var staffDefsToRemove = slice.querySelectorAll('staffDef' + staffDefSelector);

      for (i= 0, j=staffDefsToRemove.length;i<j;i++){
        staffDefsToRemove[i].parentNode.removeChild(staffDefsToRemove[i]);
      }
      //$(slice.getElementsByTagName('staffDef')).remove(':not(' + staffDefSelector + ')');
    }
    if (params.noClef || params.noKey || params.noMeter) {
      var scoreDef = slice.getElementsByTagName('scoreDef')[0];
      var staffDefs = scoreDef.getElementsByTagName('staffDef');
      setVisibles([scoreDef], params);
      setVisibles(staffDefs, params);
    }
    if (params.noConnectors) {
      var staffGrpElements = slice.getElementsByTagName('staffGrp');
      for (i = 0, j = staffGrpElements.length; i < j; i++) {
        staffGrpElements[i].removeAttribute('symbol');
      }

    }
    var section = slice.getElementsByTagName('section')[0];
    var inside_slice = false;

    /*
     * Iterate through each child of the section and remove everything outside
     * the slice. Remove
     */
    var section_children = section.childNodes;
    var sectionChild;

//    $(section_children).each(function () {

    var o, p, q, r, res;
    for (o=0,p=section_children.length;o<p;o++) {

      sectionChild = section_children[o];

      if (sectionChild.localName === 'ending') {
        var ending_children = sectionChild.childNodes;

        for (q=0,r=ending_children.length;q<r;q++){
          res = keepOrRemove(ending_children[q], inside_slice, staffNSelector, params);
          inside_slice = res.inside_slice;
          if (res.removed){
            q--;
            r--;
          }
        }
        if (sectionChild.getElementsByTagName('measure').length === 0) {
          sectionChild.parentNode.removeChild(sectionChild);
          o--;
          p--;
        }
      } else {
        res = keepOrRemove(sectionChild, inside_slice, staffNSelector, params);
        inside_slice = res.inside_slice;
        if (res.removed){
          o--;
          p--;
        }
      }

    }

    return slice;
  };


  if (!window.MeiLib) window.MeiLib = {};

  /**
   * Represents an MEI <b>app</b> or <b>choice</b> element.
   *
   * @class MeiLib.Alt
   * @constructor
   * @param {Element} elem
   * @param {String} xmlID the xml:id attribute value of the <b>app</b> or
   * <b>choice</b> element.
   * @param {String} parentID the xml:id attribute value of the direct parent
   * element of the <b>app</b> or <b>choice</b> element.
   * @param {String} tagname
   */
  MeiLib.Alt = function (elem, xmlID, parentID, tagname) {
    this.elem = elem;
    this.xmlID = xmlID;
    this.altitems = [];
    this.parentID = parentID;
    this.tagname = tagname;
  };

  MeiLib.Alt.prototype.getDefaultItem = function () {

    /* find the editors pick or the first alternative */
    var findDefault = function (altitems, editorspick_tagname, other_tagname) {
      var first_sic, alt;
      for (alt in altitems) {
        if (altitems[alt].tagname === editorspick_tagname) {
          return altitems[alt];
        } else if (!first_sic && (altitems[alt].tagname === other_tagname)) {
          first_sic = altitems[alt];
        }
      }
      return first_sic;
    };
    if (this.tagname === 'choice') {
      return findDefault(this.altitems, 'corr', 'sic');
    } else if (this.tagname === 'app') {
      //      return findDefault(this.altitems, 'lem', 'rdg');
      return findDefault(this.altitems, 'lem');
    }
  };


  if (!window.MeiLib) window.MeiLib = {};

  /**
   * @class MeiLib.Variant
   * Represents a <b>lem</b>, <b>rdg</b>, <b>sic</b> or <b>corr</b> element.
   *
   * @constructor
   * @param elem {Element}
   * @param xmlID {String} the xml:id attribute value of the element.
   * @param tagname {String} 'lem' for <b>lem</b> and 'rdg for <b>rdg</b> elements.
   * @param source {String} space-separated list of the source IDs what the given
   *            item belongs to.
   * @param resp {String} xmlID of the editor responsible for the given reading or
   *            correction.
   * @param n {String} @n attribute value of the element.
   */
  MeiLib.Variant = function (elem, xmlID, tagname, source, resp, n) {
    this.elem = elem;
    this.xmlID = xmlID;
    this.tagname = tagname;
    this.source = source;
    this.resp = resp;
    this.n = n;
  };


  if (!window.MeiLib) window.MeiLib = {};

  /**
   * @class MeiLib.MeiDoc
   * A Rich MEI is an MEI that contain ambiguity represented by Critical Apparatus
   * (<b>app</b>, <b>rdg</b>, etc.), or Editorial Transformation (<b>choice</b>,
   * <b>corr</b>, etc.)
   * elements.
   *
   * @constructor
   * @param {XMLDocument} meiXmlDoc the MEI document.
   */
  MeiLib.MeiDoc = function (meiXmlDoc) {
    if (meiXmlDoc) {
      this.init(meiXmlDoc);
    }
  };
  /**
   * @method init
   * Initializes a <code>MeiLib.MeiDoc</code> object.
   *
   * The constructor extracts information about alternative encodings and compiles
   * them into a JS object (this.ALTs). The obejcts are exposed as per the
   * following: 1. <code>sourceList</code> is the list of sources as defined in
   * the MEI header (meiHead). 2. <code>editorList</code> is the list of editors
   * listed in the MEI header. 3. <code>ALTs</code> is the object that contains
   * information about the alternative encodings. It contains one entry per for
   * each <b>app</b> or <b>choice</b> element. It is indexed by the xml:id
   * attribute value of the elements. 4. <code>altgroups</code> is the obejct that
   * contains how <b>app</b> and <b>choice</b> elements are grouped together to
   * form a logical unit of alternative encoding.
   *
   * @param {XMLDocument} meiXmlDoc an XML document containing the rich MEI
   */
  MeiLib.MeiDoc.prototype.init = function (meiXmlDoc) {
    this.xmlDoc = meiXmlDoc;
    this.rich_head = meiXmlDoc.getElementsByTagNameNS("http://www.music-encoding.org/ns/mei", 'meiHead')[0];
    this.rich_music = meiXmlDoc.getElementsByTagNameNS("http://www.music-encoding.org/ns/mei", 'music')[0];
    this.rich_score = this.rich_music.getElementsByTagName('score')[0];
    this.parseSourceList();
    this.parseEditorList();
    this.parseALTs();
    this.initAltgroups();
    this.initSectionView();
  };
  /**
   * @method getRichScore
   */
  MeiLib.MeiDoc.prototype.getRichScore = function () {
    return this.rich_score;
  };
  /**
   * @method getPlainScore
   */
  MeiLib.MeiDoc.prototype.getPlainScore = function () {
    return this.plain_score;
  };
  /**
   * @method getALTs
   */
  MeiLib.MeiDoc.prototype.getALTs = function () {
    return this.ALTs;
  };
  /**
   * @method getSourceList
   */
  MeiLib.MeiDoc.prototype.getSourceList = function () {
    return this.sourceList;
  };
  /**
   * @method getEditorList
   */
  MeiLib.MeiDoc.prototype.getEditorList = function () {
    return this.editorList;
  };
  /**
   * @method parseSourceList
   * Extracts information about the sources as defined in the MEI header.
   *
   * @return {Object} is a container indexed by the xml:id attribute value of the
   *         <b>sourceDesc</b> element.
   */
  MeiLib.MeiDoc.prototype.parseSourceList = function () {
    // var srcs = $(this.rich_head).find('sourceDesc').children();
    // this.sourceList = {};
    // var i
    // for(i=0;i<srcs.length;++i) {
    // var src = srcs[i];
    // var xml_id = $(src).attr('xml:id');
    // var serializer = new XMLSerializer();
    // this.sourceList[xml_id] = serializer.serializeToString(src);
    // }
    // return this.sourceList;

    //    this.sources = $(this.rich_head.getElementsByTagName('sourceDesc')).children();

    var elementFilter = function (node) {
      return node.nodeType === 1;
    };

    var sourceDesc = this.rich_head.getElementsByTagName('sourceDesc')[0];
    if (sourceDesc){
      this.sources = Array.prototype.filter.call(sourceDesc.childNodes, elementFilter);
    } else {
      this.sources = [];
    }

    return this.sources;
  };
  /**
   * @method parseEditorList
   */
  MeiLib.MeiDoc.prototype.parseEditorList = function () {
    // var edtrs = $(this.rich_head).find('titleStmt').children('editor');
    // this.editorList = {};
    // var i
    // for(i=0;i<edtrs.length;++i) {
    // var edtr = edtrs[i];
    // var xml_id = $(edtr).attr('xml:id');
    // this.editorList[xml_id] = edtr;
    // }

    //    this.editors = $(this.rich_head.getElementsByTagName('titleStmt')).children('editor');

    var editorFilter = function (node) {
      return node.localName === 'editor';
    };

    var titleStmt = this.rich_head.getElementsByTagName('titleStmt')[0];
    if (titleStmt) {
      this.editors = Array.prototype.filter.call(titleStmt.childNodes, editorFilter);
    } else {
      this.editors = [];
    }

    return this.editors;
  };
  /**
   * @method parseALTs
   * Extracts information about the elements encoding alternatives. The method
   * stores its result in the <code>ALTs</code> property.
   *
   * <code>ALTs</code> is a container of MeiLib.Alt obejcts indexed by the
   * xml:id attribute value of the <b>app</b> or <b>choice</b> elements.
   */
  MeiLib.MeiDoc.prototype.parseALTs = function () {
    var i, j;
    this.ALTs = {};
    // console.log(this.rich_score);
    var apps = this.rich_score.querySelectorAll('app, choice');
    for (i = 0; i < apps.length; i++) {
      var app = apps[i];
      var parent = app.parentNode;
      var altitems = app.querySelectorAll('rdg, lem, sic, corr');
      var AppsItem = new MeiLib.Alt(app, MeiLib.XMLID(app), MeiLib.XMLID(parent), app.localName);
      AppsItem.altitems = {};
      for (j = 0; j < altitems.length; j++) {
        var altitem = altitems[j];
        var source = altitem.getAttribute('source');
        var resp = altitem.getAttribute('resp');
        var n = altitem.getAttribute('n');
        var tagname = altitem.localName;
        var varXMLID = MeiLib.XMLID(altitem);
        AppsItem.altitems[varXMLID] = new MeiLib.Variant(altitem, varXMLID, tagname, source, resp, n);
      }
      this.ALTs[MeiLib.XMLID(app)] = AppsItem;
    }
  };
  /**
   * @method initAltgroups
   */
  MeiLib.MeiDoc.prototype.initAltgroups = function () {
    var i, j, altgroup, token_list;
    //var ALTs = this.ALTs;
    var annots = this.rich_score.querySelectorAll('annot[type="appGrp"], annot[type="choiceGrp"]');
    this.altgroups = {};
    for (i = 0; i < annots.length; i++) {
      altgroup = [];
      token_list = annots[i].getAttribute('plist').split(' ');
      for (j = 0; j < token_list.length; j++) {
        altgroup.push(token_list[j].replace('#', ''));
      }
      for (j in altgroup) {
        this.altgroups[altgroup[j]] = altgroup;
      }
    }
  };
  /**
   * @method initSectionView
   * The MeiLib.MeiDoc.initSectionView transforms the rich MEI (this.rich_score)
   * into a plain MEI (this.sectionview_score)
   *
   * An MEI is called 'plain' MEI if it contains no <b>app</b> or <b>choice</b>
   * elements.
   * Such an MEI can also be referred after the analogy of 2D section views of a
   * 3D object: the rich MEI is a higher-dimensional object, of which we would
   * like to display a 'flat' section view. The term 'section plane' refers to a
   * combination of alternatives at different locations in the score. The section
   * plane defines the actual view of the higher-dimensional object. For instance,
   * consider a score that has two different variants at measure #5 (let's call
   * them (variant A and variant B), and it contains three different variants at
   * measure #10 (let's call those ones variants C, D and E). In this case the
   * section plane would contain two elements the first one is either A or B, the
   * second one is C, D or E.
   *
   * The extracted information about all the <b>app</b> and <b>choice</b> elements
   * are stored in an array. Using this array the application can access information
   * such as what alternative encodings are present in the score, what source a
   * variant comes from, etc. This array is exposed by te <code>ALTs</code>
   * property.
   *
   */

  MeiLib.MeiDoc.prototype.selectDefaultAlternative = function (alt) {
    var result = {};

    // TODO check: is it OK to query all descendant corr/sic etc elements? (or would children be better?) --
    // (nested apps)

    if (alt.localName === 'choice') {
      // ...the default replacement is...
      var corr = alt.getElementsByTagName('corr')[0];
      if (corr) {
        // ...the first corr...
        result.alt_item_xml_id = MeiLib.XMLID(corr);
        result.alt_item = corr;
        //...or
      } else {
        // ...the first sic.
        var sic = alt.getElementsByTagName('sic')[0];
        if (sic) {
          result.alt_item_xml_id = MeiLib.XMLID(sic);
          result.alt_item = sic;
        } else {
          result = {};
        }
      }
    } else {
      var lem = alt.getElementsByTagName('lem')[0];
      if (lem) {
        // ...the first lem...
        result.alt_item_xml_id = MeiLib.XMLID(lem);
        result.alt_item = lem;
        //...or nothing:
      } else {
        var rdg = alt.getElementsByTagName('rdg')[0];
        if (rdg) {
          // ...the first rdg...
          result.alt_item_xml_id = MeiLib.XMLID(rdg);
          result.alt_item = rdg;
          //...or nothing:
        } else {
          result = {};
        }
      }
    }
    return result;
  };

  MeiLib.MeiDoc.prototype.initSectionView = function (altReplacements) {
    altReplacements = altReplacements || {};
    // Make a copy of the rich MEI. We don't want to remove nodes from the
    // original object.
    this.sectionview_score = this.rich_score.cloneNode(true);
    this.sectionplane = {};

    // Transform this.sectionview_score into a plain MEI:
    //
    // * itereate through all <app> and <choice> elements:
    // o chose the appropriate rdg or lem defined by sectionplane
    // (sectionplane[app.xmlID]).
    // If nothing is defined, leave it empty.
    // o chose the appropriate sic or corr defined by sectionplance
    // (sectionplane[choice.xmlID])
    // If nothing is defined, chose the first corr, if exists, otherwise chose
    // sic, if exists.
    // When replacing an item, mark the location of replacement with XML
    // processing instructions.

    var alts = this.sectionview_score.querySelectorAll('app, choice');

    var alt_item_xml_id;
    var this_sectionview_score = this.sectionview_score;
    var this_sectionplane = this.sectionplane;
    var this_ALTs = this.ALTs;
    var xmlDoc = this.xmlDoc;
    var me = this;
    var alt;
    var i, j;
    for (i = 0, j = alts.length; i < j; i++) {
      alt = alts[i];


      var alt_xml_id = MeiLib.XMLID(alt);
      var replacement = altReplacements[alt_xml_id];
      if (replacement) {
        // apply replacement, or...
        alt_item_xml_id = replacement.xmlID;

//        var alt_item2insert = this_sectionview_score.querySelector(replacement.tagname + '[*|id="' + alt_item_xml_id +
//                                                                   '"]');

        var alt_item2insert = $(this_sectionview_score).find(replacement.tagname + '[xml\\:id="' + alt_item_xml_id +
                                                             '"]')[0];

        if (!alt_item2insert) {
          throw new MeiLib.RuntimeError('MeiLib.MeiDoc.prototype.initSectionView():E01', "Cannot find <lem>, <rdg>, <sic>, or <corr> with @xml:id '" +
                                                                                         alt_item_xml_id + "'.");
        }
      } else {
        var defaultAlt = me.ALTs[alt_xml_id].getDefaultItem();
        if (defaultAlt) {
          alt_item_xml_id = defaultAlt.xmlID;
          alt_item2insert = defaultAlt.elem;
        }
      }
      var parent = alt.parentNode;
      var PIStart = xmlDoc.createProcessingInstruction('MEI2VF', 'rdgStart="' + alt_xml_id + '"');
      parent.insertBefore(PIStart, alt);
      if (alt_item2insert) {
        var childNodes = alt_item2insert.childNodes;
        var k;
        for (k = 0; k < childNodes.length; ++k) {
          parent.insertBefore(childNodes.item(k).cloneNode(true), alt);
        }
      }
      var PIEnd = xmlDoc.createProcessingInstruction('MEI2VF', 'rdgEnd="' + alt_xml_id + '"');
      parent.insertBefore(PIEnd, alt);
      parent.removeChild(alt);

      this_sectionplane[alt_xml_id] = [];
      if (this_ALTs[alt_xml_id].altitems[alt_item_xml_id]) {
        this_sectionplane[alt_xml_id].push(this_ALTs[alt_xml_id].altitems[alt_item_xml_id]);
      }
    }

    return this.sectionview_score;

  };
  /**
   * @method updateSectionView
   * Updates the sectionview score (plain MEI) by replacing one or more
   * alternative instance with other alternatives.
   *
   * @param sectionplaneUpdate
   *            {object} the list of changes. It is an container of xml:id
   *            attribute values of <b>rdg</b>, <b>lem</b>, <b>sic</b> or
   * <b>corr</b> elements,
   *            indexed by the xml:id attribute values of the corresponding
   * <b>app</b>
   *            or <b>choice</b> elements. sectionplaneUpdate[altXmlID] =
   * altInstXmlID
   *            is the xml:id attribute value of the <b>rdg</b>, <b>lem</b>,
   * <b>sic</b> or <b>corr</b>
   *            element, which is to be inserted in place of the original <app
   *            xml:id=altXmlID> or <b>choice xml:id=altXmlID</b> When replacing an
   *            <b>app</b> or <b>choice</b> that is part of a group of such
   * elements
   *            (defined by this.altgroups), then those other elements needs to be
   *            replaced as well.
   */
  MeiLib.MeiDoc.prototype.updateSectionView = function (sectionplaneUpdate) {

    var altID, altID__;

    var corresponding_alt_item = function (altitems, altitem) {
      var vars_match = function (v1, v2) {
        var res = 0;
        for (var field in v1) {
          if (v1[field] !== undefined && v1[field] === v2[field]) {
            res++;
          }
        }
        //      console.log('vars_match: ' + res);
        return res;
      };
      var max = 0;
      var corresponding_item, M;
      for (var alt_item_id in altitems) {
        M = vars_match(altitems[alt_item_id], altitem);
        if (max < M) {
          max = M;
          corresponding_item = altitems[alt_item_id];
        }
      }
      return corresponding_item;
    };

    for (altID in sectionplaneUpdate) {
      var this_ALTs = this.ALTs;
      var altitems2insert = [];
      // preserving backward compatibility:
      if (typeof sectionplaneUpdate[altID] === 'string') {
        sectionplaneUpdate[altID] = [sectionplaneUpdate[altID]];
      }
      var i, j;
      j = sectionplaneUpdate[altID].length;
      if (j > 0) {
        for (i = 0; i < j; i++) {
          altitems2insert.push(this_ALTs[altID].altitems[sectionplaneUpdate[altID][i]]);
        }
        //        $(sectionplaneUpdate[altID]).each(function () {
        //          altitems2insert.push(this_ALTs[altID].altitems[this]);
        //        });

      } else {
        var defaultAltItem = this.ALTs[altID].getDefaultItem();
        if (defaultAltItem) {
          altitems2insert.push(defaultAltItem);
        }
      }
      var altgroup = this.altgroups[altID];
      if (altgroup) {
        // if altID is present in altgroups, then replace all corresponding alts
        // with the
        // altitems that correspons to the any of the alt item that are being
        // inserted.
        for (i = 0; i < altgroup.length; i++) {
          altID__ = altgroup[i];
          var altitems2insert__ = [];

          var k, l;
          for (k = 0, l = altitems2insert.length; k < l; k++) {
            altitems2insert__.push(corresponding_alt_item(this_ALTs[altID__].altitems, altitems2insert[k]));
          }
          //          $(altitems2insert).each(function () {
          //            altitems2insert__.push(corresponding_alt_item(this_ALTs[altID__].altitems, this))
          //          });

          this.replaceAltInstance({
            appXmlID : altID__,
            replaceWith : altitems2insert__
          });
        }
      } else {
        // otherwise just replace alt[xml:id=altID] with the list of items
        this.replaceAltInstance({
          appXmlID : altID,
          replaceWith : altitems2insert
        });
      }
    }
  };
  /**
   * @method replaceAltInstance
   * Replace an alternative instance in the sectionview score and in the
   * sectionplane
   *
   * @param {Object} alt_inst_update
   * @return {Object} the updated score
   */
  MeiLib.MeiDoc.prototype.replaceAltInstance = function (alt_inst_update) {

    var extendWithNodeList = function (nodeArray, nodeList) {
      var res = nodeArray;
      var i;
      for (i = 0; i < nodeList.length; ++i) {
        res.push(nodeList.item(i));
      }
      return res;
    };
    var app_xml_id = alt_inst_update.appXmlID;


    var parent = $(this.sectionview_score).find('[xml\\:id=' + this.ALTs[app_xml_id].parentID + ']')[0];
    if (typeof parent === 'undefined') {
      return;
    }

//    var parent = this.sectionview_score.querySelector('[*|id=' + this.ALTs[app_xml_id].parentID + ']');
//    if (parent === null) {
//      return;
//    }

    var children = parent.childNodes;

    var replaceWith = alt_inst_update.replaceWith;
    var nodes2insert = [];
    var this_rich_score = this.rich_score;
    if (replaceWith) {
      var i, j;
      for (i = 0; i < replaceWith.length; ++i) {
        var replaceWith_item = replaceWith[i];
        var replaceWith_xmlID = replaceWith_item.xmlID;

        var var_inst_elem = $(this_rich_score).find(replaceWith_item.tagname + '[xml\\:id="' + replaceWith_xmlID +
                                                    '"]')[0];
//        var var_inst_elem = this_rich_score.querySelector(replaceWith_item.tagname + '[*|id="' + replaceWith_xmlID +
//                                                          '"]');
        nodes2insert = extendWithNodeList(nodes2insert, var_inst_elem.childNodes);
      }
    }
    //  console.log(nodes2insert)

    var match_pseudo_attrValues = function (data1, data2) {
      data1 = data1.replace("'", '"');
      data2 = data2.replace("'", '"');
      return data1 === data2;
    };

    var inside_inst = false;
    var found = false;
    var insert_before_this = null;

    for (i = 0, j = children.length; i < j; i++) {
      var child = children[i];
      if (child.nodeType === 7) {
        if (child.nodeName === 'MEI2VF' && match_pseudo_attrValues(child.nodeValue, 'rdgStart="' + app_xml_id + '"')) {
          inside_inst = true;
          found = true;
        } else if (child.nodeName === 'MEI2VF' &&
                   match_pseudo_attrValues(child.nodeValue, 'rdgEnd="' + app_xml_id + '"')) {
          inside_inst = false;
          insert_before_this = child;
        }
      } else if (inside_inst) {
        parent.removeChild(child);
        i--;
        j--;
      }
    }

    if (!found) {
      throw "processing instruction not found";
    }
    if (inside_inst) {
      throw "Unmatched <?MEI2VF rdgStart?>";
    }

    var insert_method;
    if (insert_before_this) {
      insert_method = function (elem) {
        parent.insertBefore(elem, insert_before_this)
      };
    } else {
      insert_method = function (elem) {
        parent.appendChild(elem)
      };
    }

    for (i = 0, j = nodes2insert.length; i < j; i++) {
      insert_method(nodes2insert[i].cloneNode(true));
    }

    this.sectionplane[app_xml_id] = alt_inst_update.replaceWith;

    return this.sectionview_score;
  };

  /**
   * @method getSectionViewSlice
   * Get a slice of the sectionview_score.
   *
   * @param params
   *            {Object} contains the parameters for slicing. For more info see at
   *            documentation of MeiLib.SliceMEI
   * @return {Object} an XML DOM object containing the slice of the plain MEI
   */
  MeiLib.MeiDoc.prototype.getSectionViewSlice = function (params) {
    return MeiLib.SliceMEI(this.sectionview_score, params);
  };
  /**
   * @method getRichSlice
   * Get a slice of the whole rich MEI document.
   *
   * @param params
   *            {Obejct} contains the parameters for slicing. For more info see at
   *            documentation of MeiLib.SliceMEI
   * @return {MeiLib.MeiDoc} a MeiDoc object
   */
  MeiLib.MeiDoc.prototype.getRichSlice = function (params) {
    var slice = new MeiLib.MeiDoc();
    slice.xmlDoc = this.xmlDoc;
    slice.rich_head = this.rich_head.cloneNode(true);
    slice.rich_music = this.rich_music.cloneNode(true);
    slice.rich_score = MeiLib.SliceMEI(this.rich_score, params);
    slice.sourceList = this.sourceList;
    slice.editorList = this.editorList;
    slice.ALTs = this.ALTs;
    slice.altgroups = this.altgroups;
    return slice;
  };

  /*
   * meilib.js
   *
   * Author: Zoltan Komives Created: 05.07.2013
   *
   * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
   * University of Maryland
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not
   * use this file except in compliance with the License. You may obtain a copy of
   * the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
   * License for the specific language governing permissions and limitations under
   * the License.
   */
  /**
   * Contributor: Alexander Erhard
   */
  /**
   * @class MeiLib
   * MeiLib - General purpose JavaScript functions for processing MEI documents.
   * @singleton
   */

  if (!window.MeiLib) window.MeiLib = {};

  /**
   * @method createPseudoUUID
   */
  MeiLib.createPseudoUUID = function () {
    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).substr(-4)
  };

  /**
   * @method durationOf
   * Calculate the duration of an event (number of beats) according to the given
   * meter.
   *
   * Event refers to musical event such as notes, rests, chords. The MEI element
   * <b>space</b> is also considered an event.
   *
   * @param evnt an XML DOM object
   * @param meter the time signature object { count, unit }
   * @param {Boolean} zeroGraceNotes Specifies if all grace notes should return the duration 0
   */
  MeiLib.durationOf = function (evnt, meter, zeroGraceNotes) {

    var IsZeroDurEvent = zeroGraceNotes ? function (evnt, tagName) {
      return evnt.hasAttribute('grace') || tagName === 'clef';
    } : function (evnt, tagName) {
      return tagName === 'clef';
    };

    var isSimpleEvent = function (tagName) {
      return (tagName === 'note' || tagName === 'rest' || tagName === 'space');
    };

    var durationOf_SimpleEvent = function (simple_evnt, meter) {
      var dur = simple_evnt.getAttribute('dur');
      if (!dur) {
        console.warn('@dur of <b>note</b>, <b>rest</b> or <b>space</b> must be specified. Proceeding with default @dur="4". Element:');
        console.log(simple_evnt);
        dur = "4";
        //      throw new MeiLib.RuntimeError('MeiLib.durationOf:E04', '@dur of <b>note</b>, <b>rest</b> or <b>space</b> must be specified.');
      }
      //    console.log(MeiLib.dotsMult(simple_evnt) * MeiLib.dur2beats(Number(dur), meter));
      return MeiLib.dotsMult(simple_evnt) * MeiLib.dur2beats(Number(dur), meter);
    };

    var durationOf_Chord = function (chord, meter, layer_no) {
      var i, j, childNodes, note;
      if (!layer_no) {
        layer_no = "1";
      }
      var dur = chord.getAttribute('dur');
      var dotsMult = MeiLib.dotsMult(chord);
      if (dur) {
        return dotsMult * MeiLib.dur2beats(Number(dur), meter);
      }
      childNodes = chord.childNodes;
      for (i = 0, j = childNodes.length; i < j; i++) {
        if (childNodes[i].localName === 'note') {
          note = childNodes[i];
          var lyr_n = note.getAttribute('layer');
          if (!lyr_n || lyr_n === layer_no) {
            var dur_note = note.getAttribute('dur');
            var dotsMult_note = MeiLib.dotsMult(chord);
            if (!dur && dur_note) {
              dur = dur_note;
              dotsMult = dotsMult_note;
            } else if (dur && dur != dur_note) {
              throw new MeiLib.RuntimeError('MeiLib.durationOf:E05', 'duration of <chord> is ambiguous. Element: ' +
                                                                     Util.serializeElement(chord));
            }
          }
        }
      }

      if (!dur) {
        throw new MeiLib.RuntimeError('MeiLib.durationOf:E06', '@dur of chord must be specified either in <chord> or in at least one of its <note> elements. Proceeding with default @dur="4". Element:' +
                                                               Util.serializeElement(chord));
      }
      return dotsMult * MeiLib.dur2beats(Number(dur), meter);
    };

    var durationOf_Beam = function (beam, meter) {
      var acc = 0, i, j, childNodes, childNode;
      childNodes = beam.childNodes;
      for (i = 0, j = childNodes.length; i < j; i++) {
        childNode = childNodes[i];
        var dur_b;
        var tagName = childNode.localName;
        if (IsZeroDurEvent(childNode, tagName)) {
          dur_b = 0;
        } else if (isSimpleEvent(tagName)) {
          dur_b = durationOf_SimpleEvent(childNode, meter);
        } else if (tagName === 'chord') {
          dur_b = durationOf_Chord(childNode, meter);
        } else if (tagName === 'beam') {
          dur_b = durationOf_Beam(childNode, meter);
        } else if (tagName === 'tuplet') {
          dur_b = durationOf_Tuplet(childNode, meter);
        } else {
          dur_b = 0;
          //throw new MeiLib.RuntimeError('MeiLib.durationOf:E03', "Not supported element '" + tagName + "'");
        }
        acc += dur_b;
      }
      return acc;
    };

    var durationOf_Tuplet = function (tuplet, meter) {
      // change the meter unit according to the ratio in the tuplet, the get the duration as if the tuplet were a beam
      var num = +tuplet.getAttribute('num') || 3;
      var numbase = +tuplet.getAttribute('numbase') || 2;
      return durationOf_Beam(tuplet, {
        count : meter.count,
        unit : meter.unit * numbase / num
      });
    };

    var evnt_name = evnt.localName;
    if (IsZeroDurEvent(evnt, evnt_name)) {
      return 0;
    }
    if (isSimpleEvent(evnt_name)) {
      return durationOf_SimpleEvent(evnt, meter);
    }
    if (evnt_name === 'mRest') {
      return meter.count;
    }
    if (evnt_name === 'chord') {
      return durationOf_Chord(evnt, meter);
    }
    if (evnt_name === 'beam') {
      return durationOf_Beam(evnt, meter);
    }
    if (evnt_name === 'tuplet') {
      return durationOf_Tuplet(evnt, meter);
    }
    return 0;
    //throw new MeiLib.RuntimeError('MeiLib.durationOf:E05', "Not supported element: '" + evnt_name + "'");

  };
  /**
   * @method tstamp2id
   * Find the event with the minimum distance from of the given timestamp.
   *
   * @param {String} tstamp the timestamp to match against events in the given
   * context. Local timestamp only (without measure part).
   * @param {Object} layer an XML DOM object, contains all events in the given
   * measure.
   * @param {Object} meter the effective time signature object { count, unit } in
   * the measure containing layer.
   * @return {String} the xml:id of the closest element, or
   * undefined if <b>layer</b> contains no events.
   */
  MeiLib.tstamp2id = function (tstamp, layer, meter) {
    var ts = Number(tstamp);
    var ts_acc = 0;
    // total duration of events before current event
    var c_ts = function () {
      return ts_acc + 1;
    };// tstamp of current event
    var distF = function () {
      return ts - c_ts();
    };// signed distance between tstamp and tstamp of current event;
    var eventList = new MeiLib.EventEnumerator(layer);
    var evnt;
    var dist;
    var prev_evnt = null;
    // previous event
    var prev_dist;
    // previous distance
    while (!eventList.EoI && (dist === undefined || dist > 0)) {
      prev_evnt = evnt;
      prev_dist = dist;
      evnt = eventList.nextEvent();
      dist = distF();
      if (!evnt.hasAttribute('grace') && evnt.localName !== 'clef') {
        ts_acc +=
        MeiLib.durationOf(evnt, meter, true) * eventList.outputProportion.numbase / eventList.outputProportion.num;
      }
      //    m = meter;
      //    e = evnt;
    }

    if (dist === undefined) {
      return undefined;
    }
    var winner;
    if (dist < 0) {
      if (prev_evnt && prev_dist < Math.abs(dist)) {
        winner = prev_evnt;
      } else {
        winner = evnt;
      }
    } else {
      winner = evnt;
    }

    var getFullNote = function (evnt) {
      if (evnt.hasAttribute('grace') || evnt.localName === 'clef') {
        return getFullNote(eventList.nextEvent()) || evnt;
      }
      return evnt;
    };

    winner = getFullNote(winner);

    var xml_id;
    xml_id = winner.getAttribute('xml:id');
    if (!xml_id) {
      xml_id = MeiLib.createPseudoUUID();
      winner.setAttribute('xml:id', xml_id);
    }
    return xml_id;
  };
  /**
   * @method XMLID
   * returns the xml:id attribute of an element; if there is none, the function
   * created a pseudo id, adds it to the element and returns that id.
   * @param {Element} elem the element to process
   * @return {String} the xml:id of the element
   */
  MeiLib.XMLID = function (elem) {
    var xml_id = elem.getAttribute('xml:id');
    if (!xml_id) {
      xml_id = MeiLib.createPseudoUUID();
      elem.setAttribute('xml:id', xml_id);
    }
    return xml_id;
  };
  /**
   * @method id2tstamp
   * Calculates a timestamp value for an event in a given context. (Event refers
   * to musical events such as notes, rests and chords).
   *
   * @param eventid {String} the xml:id of the event
   * @param context {Array} of contextual objects {layer, meter}. Time signature
   * is mandatory for the first one, but optional for the rest. All layers belong
   * to a single logical layer. They are the layer elements from some consequtive
   * measures.
   * @return {String} the MEI timestamp value (expressed in beats relative to the
   * meter of the measure containing the event) of all events that happened before
   * the given event in the given context. If the event is not in the first
   * measure (layer) the timestamp value contains a 'measure part', that is for
   * example 2m+2 if the event is at the second beat in the 3rd measure.
   */
  MeiLib.id2tstamp = function (eventid, context) {
    var meter;
    var found = false;
    for (var i = 0; i < context.length && !found; ++i) {
      if (context[i].meter) {
        meter = context[i].meter;
      }
      if (i === 0 && !meter) {
        throw new MeiLib.RuntimeError('MeiLib.id2tstamp:E001', 'No time signature specified');
      }

      var result = MeiLib.sumUpUntil(eventid, context[i].layer, meter);
      if (result.found) {
        found = true;
        return i.toString() + 'm' + '+' + (result.beats + 1).toString();
      }
    }
    throw new MeiLib.RuntimeError('MeiLib.id2tstamp:E002', 'No event with xml:id="' + eventid +
                                                           '" was found in the given MEI context.');
  };

  /**
   * @method dur2beats
   * Convert absolute duration into relative duration (nuber of beats) according
   * to time signature.
   *
   * @param dur {Number} reciprocal value of absolute duration (e.g. 4->quarter
   * note, 8->eighth note, etc.)
   * @param {Object} meter the time signature object { count, unit }
   * @return {Number}
   */
  MeiLib.dur2beats = function (dur, meter) {
    return (meter.unit / dur);
  };
  /**
   * @method beats2dur
   * Convert relative duration (nuber of beats) into absolute duration (e.g.
   * quarter note, eighth note, etc) according to time signature.
   *
   * @param beats {Number} duration in beats @param meter time signature object {
 * count, unit } @return {Number} reciprocal value of absolute duration (e.g. 4
   * -> quarter note, 8 -> eighth note, etc.)
   * @param {Object} meter
   */
  MeiLib.beats2dur = function (beats, meter) {
    return (meter.unit / beats);
  };
  /**
   * @method dotsMult
   * Converts the <b>dots</b> attribute value into a duration multiplier.
   *
   * @param node XML DOM object containing a node which may have <code>dots</code>
   * attribute
   * @return {Number} The result is 1 if no <code>dots</code> attribute is present.
   * For <code>dots="1"</code> the result is 1.5, for <code>dots="2"</code> the
   * result is 1.75, etc.
   */
  MeiLib.dotsMult = function (node) {
    var dots = node.getAttribute('dots');
    dots = Number(dots || "0");
    var mult = 1;
    for (; dots > 0; --dots) {
      mult += (1 / Math.pow(2, dots))
    }
    return mult;
  };
  /**
   * @method sumUpUntil
   * For a given event (such as note, rest chord or space) calculates the combined
   * length of preceding events, or the combined length of all events if the given
   * event isn't present.
   *
   * @param {String} eventid the value of the xml:id attribute of the event
   * @param {Object} layer an XML DOM object containing the MEI <b>Layer</b>
   * element
   * @param {Object} meter the time signature object { count, unit }
   * @return {Object} an object { beats:number, found:boolean }. 1. 'found' is true
   * and 'beats' is the total duration of the events that happened before the event
   * 'eventid' within 'layer', or 2. 'found' is false and 'beats is the total
   * duration of the events in 'layer'.
   */
  MeiLib.sumUpUntil = function (eventid, layer, meter) {

    var sumUpUntil_inNode = function (node) {
      var beats, children, found = null, dur, dots, subtotal, chord_dur, i;
      var node_name = node.localName;
      if (node.hasAttribute('grace') || node_name === 'clef') {
        return {
          beats : 0,
          found : (node.getAttribute('xml:id') === eventid)
        };
      }
      if (node_name === 'note' || node_name === 'rest') {
        if (node.getAttribute('xml:id') === eventid) {
          return {
            beats : 0,
            found : true
          };
        } else {
          dur = Number(node.getAttribute('dur'));
          if (!dur) {
            throw new MeiLib.RuntimeError('MeiLib.sumUpUntil:E001', "Duration is not a number ('breve' and 'long' are not supported).");
          }
          dots = node.getAttribute('dots');
          dots = Number(dots || "0");
          beats = MeiLib.dotsMult(node) * MeiLib.dur2beats(dur, meter);

          return {
            beats : beats,
            found : false
          };
        }
      } else if (node_name === 'mRest') {
        if (node.getAttribute('xml:id') === eventid) {
          return {
            beats : 0,
            found : true
          };
        } else {
          return {
            beats : meter.count,
            found : false
          };
          // the duration of a whole bar expressed in number of beats.
        }
      } else if (node_name === 'layer' || node_name === 'beam' || node_name === 'tuplet') {

        // sum up childrens' duration
        beats = 0;
        children = node.childNodes;
        found = false;
        for (i = 0; i < children.length && !found; ++i) {
          if (children[i].nodeType === 1) {
            subtotal = sumUpUntil_inNode(children[i]);
            beats += subtotal.beats;
            found = subtotal.found;
          }
        }
        return {
          beats : beats,
          found : found
        };
      } else if (node_name === 'chord') {
        chord_dur = node.getAttribute('dur');
        if (node.getAttribute('xml:id') === eventid) {
          return {
            beats : 0,
            found : true
          };
        } else {
          // ... or find the longest note in the chord ????
          chord_dur = node.getAttribute('dur');
          if (chord_dur) {
            //            if (node.querySelector("[*|id='" + eventid + "']")) {
            if ($(node).find("[xml\\:id='" + eventid + "']").length) {
              return {
                beats : 0,
                found : true
              };
            } else {
              return {
                beats : MeiLib.dur2beats(chord_dur, meter),
                found : found
              };
            }
          } else {
            children = node.childNodes;
            found = false;
            for (i = 0; i < children.length && !found; ++i) {
              if (children[i].nodeType === 1) {
                subtotal = sumUpUntil_inNode(children[i]);
                beats = subtotal.beats;
                found = subtotal.found;
              }
            }
            return {
              beats : beats,
              found : found
            };
          }
        }
      }
      return {
        beats : 0,
        found : false
      };
    };

    return sumUpUntil_inNode(layer);
  };
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



  var EventContext = function (notes_by_id, system_n) {

    var me = this;

    me.notes_by_id = notes_by_id;
    me.system_n = system_n;
    me.newBeamInfosToResolve = [];
    me.clefCheckQueue = [];

  };

  EventContext.prototype = {

    startNewStave : function(stave, stave_n) {
      var me = this;

      me.stave = stave;
      me.stave_n = stave_n;

      /**
       * inBeamNo specifies the number of beams the current events are under
       */
      me.inBeamNo = 0;
      /**
       * hasStemDirInBeam specifies if a stem.dir has been specified in the current beam
       */
      me.hasStemDirInBeam = false;
      me.hasSpaceInBeam = false;
      /**
       * Grace note or grace chord objects to be added to the next non-grace note or chord
       * @property {Vex.Flow.StaveNote[]} graceNoteQueue
       */
      me.graceNoteQueue = [];
      me.clefChangeInfo = null;

      me.beamInfosToResolve = me.newBeamInfosToResolve;
      me.newBeamInfosToResolve = [];
    },

    setLayerDir : function (layerDir) {
      this.layerDir = layerDir;
    },

    getLayerDir : function () {
      return this.layerDir;
    },

    setStaveN : function(n) {
      this.stave_n = n;
    },

    setStave : function(stave) {
      this.stave = stave;
    },

    getStave : function () {
      return this.stave;
    },

    enterBeam : function () {
      this.inBeamNo += 1;
    },

    exitBeam : function () {
      var me = this;
      me.inBeamNo -= 1;
      if (me.inBeamNo === 0) {
        me.hasStemDirInBeam = false;
        me.hasSpaceInBeam = false;
      }
    },

    addBeamInfoToResolve : function (element, vexNotes) {
      this.newBeamInfosToResolve.push({
        element : element,
        vexNotes : vexNotes
      });
    },

    shiftBeamInfoToResolve : function () {
      return this.beamInfosToResolve.shift();
    },

    setSpaceInBeam : function (val) {
      this.hasSpaceInBeam = val;
    },

    getSpaceInBeam : function () {
      return this.hasSpaceInBeam;
    },

    setStemDirInBeam : function (val) {
      this.hasStemDirInBeam = val;
    },

    getStemDirInBeam : function () {
      return this.hasStemDirInBeam;
    },

    isInBeam : function (){
      return this.inBeamNo > 0;
    },

    addEvent : function (xml_id, obj) {
      var me = this;
      obj.system = me.system_n;
      obj.layerDir = me.layerDir;
      me.notes_by_id[xml_id] = obj;
    },

    setClefChangeInfo : function (info) {
      this.clefChangeInfo = info;
    },

    getClefChangeInfo : function () {
      return this.clefChangeInfo;
    },

    addToClefCheckQueue : function (event) {
      this.clefCheckQueue.push(event);
    },

    emptyClefCheckQueue : function () {
      this.clefCheckQueue = [];
    }

  };
/*
 * Component of MEItoVexFlow Author: Raffaele Viglianti, 2012
 *
 * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/**
 * Contributor: Alexander Erhard
 */

/**
 * @class MEI2VF
 * @singleton
 * Tables for MEI <-> VexFlow values
 */



  /**
   * @private
   * @namespace {Object} Tables
   */
  var Tables = {

    accidentals : {
      'n' : 'n',
      'f' : 'b',
      's' : '#',
      'ff' : 'bb',
      'ss' : '##',
      'x' : '##'
    },

    durations : {
      'long' : '1/4',
      'breve' : '1/2',
      '1' : 'w',
      '2' : 'h',
      '4' : 'q',
      '8' : '8',
      '16' : '16',
      '32' : '32',
      '64' : '64'
      // '128': '',
      // '256': '',
      // '512': '',
      // '1024': '',
      // '2048': '',
      // 'maxima': '',
      // 'longa': '',
      // 'brevis': '',
      // 'semibrevis': '',
      // 'minima': '',
      // 'semiminima': '',
      // 'fusa': '',
      // 'semifusa': ''
    },

    positions : {
      'above' : VF.Modifier.Position.ABOVE,
      'below' : VF.Modifier.Position.BELOW
    },

    hairpins : {
      'cres' : VF.StaveHairpin.type.CRESC,
      'dim' : VF.StaveHairpin.type.DECRESC
    },

    articulations : {
      'acc' : 'a>',
      'stacc' : 'a.',
      'ten' : 'a-',
      'stacciss' : 'av',
      'marc' : 'a^',
      // 'marc-stacc':
      // 'spicc':
      // 'doit':
      // 'rip':
      // 'plop':
      // 'fall':
      // 'bend':
      // 'flip':
      // 'smear':
      'dnbow' : 'am',
      'upbow' : 'a|',
      // 'harm':
      'snap' : 'ao',
      // 'fingernail':
      // 'ten-stacc':
      // 'damp':
      // 'dampall':
      // 'open':
      // 'stop':
      // 'dbltongue':
      // 'trpltongue':
      // 'heel':
      // 'toe':
      // 'tap':
      'lhpizz' : 'a+',
      'dot' : 'a.',
      'stroke' : 'a|'
    },

    articulationsBelow : {
      'acc' : 'a>',
      'stacc' : 'a.',
      'ten' : 'a-',
      'stacciss' : 'avb', // different glyph
      'marc' : 'a^b', // different glyph
      'dnbow' : 'am',
      'upbow' : 'a|',
      'snap' : 'ao',
      'lhpizz' : 'a+',
      'dot' : 'a.',
      'stroke' : 'a|'
    },

    fermata : {
      'above' : 'a@a',
      'below' : 'a@u'
    }

  };
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


  var Articulation = function (type) {
    this.init(type);
  };

  Articulation.CATEGORY = "articulations";

  Vex.Inherit(Articulation, VF.Articulation, {

    init : function (type) {
      Articulation.superclass.init.call(this, type);
      this.meiElement = [];
    },

    addMeiElement : function (element) {
      this.meiElement.push(element);
      return this;
    },

    getMeiElement : function () {
      return this.meiElement;
    },

    draw : function () {

      if (this.position === null) {
        this.position = (this.note.getStemDirection() === VF.StaveNote.STEM_DOWN) ? VF.Modifier.Position.ABOVE : VF.Modifier.Position.BELOW;
      }

      Articulation.superclass.draw.call(this);
    }

  });
/*
 * MEItoVexFlow, EventUtil class
 * (based on meitovexflow.js)
 * Author of reworkings: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */



  var EventUtil = {

    DIR : {
      down : VF.StaveNote.STEM_DOWN,
      up : VF.StaveNote.STEM_UP
    },

    /**
     * converts the pitch of an MEI element to a VexFlow pitch
     *
     * @method getVexPitch
     * @param {Element} element the MEI element from which the pitch should be read
     * @return {String} the VexFlow pitch
     */
    getVexPitch : function (element) {
      var pname, oct;
      pname = element.getAttribute('pname');
      oct = element.getAttribute('oct');
      if (!pname || !oct) {
        Logger.warn('Missing attributes', '@pname and @oct must be specified in ' + Util.serializeElement(element) +
                                          '". Setting default pitch c4.');
        return 'c/4';
      }
      return pname + '/' + oct;
    },

    /**
     * @method translateDuration
     */
    translateDuration : function (element, mei_dur) {
      var result = Tables.durations[mei_dur + ''], alias;
      if (!result) {
        alias = {
          'brevis' : 'breve',
          'longa' : 'long'
        };
        if (alias[mei_dur]) {
          Logger.info('Not supported', 'Duration "' + mei_dur + '" in ' + Util.serializeElement(element) +
                                       ' is not supported. Using "' + alias[mei_dur] + '" instead.');
          return Tables.durations[alias[mei_dur] + ''];
        }
        if (mei_dur === undefined) {
          throw new RuntimeError('No duration attribute found in ' + Util.serializeElement(element));
        } else {
          Logger.warn('Not supported', 'Duration "' + mei_dur + ' in "' + Util.serializeElement(element) +
                                       '" is not supported. Using "4" instead.');
        }
        result = Tables.durations['4'];
      }
      return result;
    },

    /**
     * @method processAttsDuration
     */
    processAttsDuration : function (element, atts) {
      var me = this, dur;
      dur = me.translateDuration(element, atts.dur);
      return (atts.dots === '1') ? dur + 'd' : (atts.dots === '2') ? dur + 'dd' : dur;
    },

    /**
     * @method processAttrAccid
     */
    processAttrAccid : function (mei_accid, vexObject, i) {
      var val = Tables.accidentals[mei_accid];
      if (val) {
        vexObject.addAccidental(i, new VF.Accidental(val));
      } else {
        Logger.warn('Not supported', 'The value "' + mei_accid + '" is not supported in @accid. Ignoring attribute.');
      }
    },

    /**
     * @method processAttrHo
     */
    processAttrHo : function (mei_ho, vexObject, stave) {
      vexObject.setExtraLeftPx(+mei_ho * stave.getSpacingBetweenLines() / 2);
    },

    /**
     * adds an articulation to a note-like object
     * @method addArticulation
     * @param {Vex.Flow.StaveNote} note the note-like VexFlow object
     * @param {Element} element the articulation element
     */
    addArticulation : function (note, element) {
      var i, j, k, articCode, vexArtic, articElement, place;

      articElement = element.getAttribute('artic');

      if (articElement !== null) {

        var artics = articElement.split(' ');

        for (k=0;k<artics.length;k++) {
          place = element.getAttribute('place');
          articCode = (place==='below') ? Tables.articulationsBelow[artics[k]] : Tables.articulations[artics[k]];

          if (articCode) {
            vexArtic = null;
            for (i = 0, j = note.modifiers.length; i < j; i++) {
              if (note.modifiers[i].type === articCode) {
                vexArtic = note.modifiers[i];
                break;
              }
            }
            if (vexArtic) {
              vexArtic.addMeiElement(element);
            } else {
              vexArtic = new Articulation(articCode).addMeiElement(element);
              if (place) {
                vexArtic.setPosition(Tables.positions[place]);
              } else{
                // sets position to null; null positions are set in Articulation.draw()
                vexArtic.setPosition(null);
              }
              note.addArticulation(0, vexArtic);
            }
          } else {
            Logger.info('unknown @artic', 'The @artic attribute in ' + Util.serializeElement(element) +
                                          ' is unknown. Ignoring articulation.');
          }
        }
      } else {
        Logger.warn('Missing attribute', Util.serializeElement(element) +
                                         ' does not have an @artic attribute. Ignoring articulation.');
      }
    },

    addFermataAtt : function (note, element, place, index) {
      var me = this;
      var vexPlace = Tables.fermata[place];
      me.addNewFermata(note, element, place, index, vexPlace);
    },

    /**
     * adds a fermata to a note-like object
     * @method addFermataAtt
     * @param {Vex.Flow.StaveNote} note the note-like VexFlow object
     * @param {Element} element the element containing the fermata specifications
     * @param {'above'/'below'} place The place of the fermata
     * @param {Number} index The index of the note in a chord (optional)
     */
    addFermata : function (note, element, place, index) {
      var me = this, i, j, vexArtic = null, vexPlace;
      vexPlace = Tables.fermata[place];
      for (i = 0, j = note.modifiers.length; i < j; i++) {
        if (note.modifiers[i].type === vexPlace) {
          vexArtic = note.modifiers[i];
          break;
        }
      }
      if (vexArtic) {
        vexArtic.addMeiElement(element);
      } else {
        me.addNewFermata(note, element, place, index, vexPlace);
      }
    },

    addNewFermata : function (note, element, place, index, articCode) {
      var vexArtic = new Articulation(articCode);
      vexArtic.setPosition(Tables.positions[place]);
      vexArtic.addMeiElement(element);
      note.addArticulation(index || 0, vexArtic);
    },

    addStemModifier : function (note, element, stemMod) {
      var n = parseInt(stemMod, 10);
      if (n) {
        note.addArticulation(0, new VF.Tremolo(n));
      } else {
        Logger.info('Not supported', 'The value of @stem.mod="' + stemMod + '" specified in ' +
                                     Util.serializeElement(element) + ' is not supported. Ignoring attribute');
      }
    },

    addClefModifier : function (vexNote, prop) {
      var clef = new VF.ClefNote(prop.type, 'small', prop.shift === -1 ? '8vb' : undefined);
      clef.setMeiElement(prop.meiElement);
      vexNote.addModifier(0, new VF.GraceNoteGroup([clef], false));
      clef.setOffsetLeft(25);
    },

    /**
     * @method setStemDir
     * @param options
     * @param vexOptions
     * @return {Boolean} true if a stem direction has been specified in the MEI code
     */
    setStemDir : function (options, vexOptions) {
      var specified_dir = this.DIR[options.atts['stem.dir']];
      if (specified_dir) {
        vexOptions.stem_direction = specified_dir;
        return true;
      } else if (options.layerDir) {
        vexOptions.stem_direction = options.layerDir;
        return false;
      } else {
        vexOptions.auto_stem = true;
        return false;
      }
    },

    setCueSize: function () {
      this.render_options.glyph_font_scale = 22;
      this.render_options.stem_height = 20;
      this.render_options.stroke_px = 2;
      this.glyph.head_width = 6;
      this.buildNoteHeads();
      this.width = 3;
    }


  };
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



  var Note = function (options) {
    var me = this, dots, i, j, element = options.element, atts = options.atts;

    var vexOptions = {
      keys : [options.vexPitch],
      duration : EventUtil.processAttsDuration(element, atts),
      clef : options.clef.type,
      octave_shift : options.clef.shift
    };

    this.hasMeiStemDir = EventUtil.setStemDir(options, vexOptions);


    VF.StaveNote.call(this, vexOptions);

    if (atts.size === 'cue') {
      EventUtil.setCueSize.call(this);
    }

    dots = +atts.dots || 0;
    for (i = 0; i < dots; i += 1) {
      this.addDotToAll();
    }

    this.setStave(options.stave);


    // TODO artic attribute

    var childNodes = element.childNodes;
    for (i = 0, j = childNodes.length; i < j; i++) {
      switch (childNodes[i].localName) {
        case 'accid':
          atts.accid = childNodes[i].getAttribute('accid');
          break;
        case 'artic':
          EventUtil.addArticulation(me, childNodes[i]);
          break;
        default:
          break;
      }
    }

    if (atts.accid) {
      EventUtil.processAttrAccid(atts.accid, this, 0);
    }
    if (atts.artic) {
      EventUtil.addArticulation(me, element);
    }
    if (atts.ho) {
      EventUtil.processAttrHo(atts.ho, this, options.stave);
    }
    if (atts.fermata) {
      EventUtil.addFermataAtt(this, element, atts.fermata);
    }
    if (atts['stem.mod']) {
      EventUtil.addStemModifier(this, element, atts['stem.mod']);
    }


  };

  Note.prototype = Object.create(VF.StaveNote.prototype);

  Note.prototype.beamable = true;
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



  var GraceNote = function (options) {
    var me = this, dots, i, j, element = options.element, atts = options.atts;

    var vexOptions = {
      keys : [options.vexPitch],
      duration : EventUtil.processAttsDuration(element, options.atts),
      clef : options.clef.type,
      octave_shift : options.clef.shift
    };

    this.hasMeiStemDir = EventUtil.setStemDir(options, vexOptions);


    VF.GraceNote.call(this, vexOptions);


    dots = +options.atts.dots || 0;
    for (i = 0; i < dots; i += 1) {
      this.addDotToAll();
    }

    this.slash = options.atts['stem.mod'] === '1slash';

    this.setStave(options.stave);

    var childNodes = element.childNodes;
    for (i = 0, j = childNodes.length; i < j; i++) {
      switch (childNodes[i].localName) {
        case 'accid':
          atts.accid = childNodes[i].getAttribute('accid');
          break;
        case 'artic':
          EventUtil.addArticulation(me, childNodes[i]);
          break;
        default:
          break;
      }
    }

    if (atts.accid) {
      EventUtil.processAttrAccid(atts.accid, this, 0);
    }
    if (atts.artic) {
      EventUtil.addArticulation(me, element);
    }
    if (atts.ho) {
      EventUtil.processAttrHo(atts.ho, this, options.stave);
    }
    if (atts.fermata) {
      EventUtil.addFermataAtt(this, element, atts.fermata);
    }


  };

  GraceNote.prototype = Object.create(VF.GraceNote.prototype);

  GraceNote.prototype.grace = true;
  //GraceNote.prototype.beamable = false;
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



  var Chord = function (options) {

    var me = this, atts = options.atts, element = options.element;
    var durAtt, durations = [], duration, keys = [], i, j, noteElements, dots;

    noteElements = options.noteElements;

    durAtt = atts.dur;

    if (durAtt) {
      duration = EventUtil.processAttsDuration(element, atts);
      dots = +atts.dots || 0;
      for (i = 0, j = noteElements.length; i < j; i += 1) {
        keys.push(EventUtil.getVexPitch(noteElements[i]));
      }
    } else {
      for (i = 0, j = noteElements.length; i < j; i += 1) {
        durations.push(+noteElements[i].getAttribute('dur'));
        dots = +noteElements[i].getAttribute('dots') || 0;
        keys.push(EventUtil.getVexPitch(noteElements[i]));
      }
      duration = EventUtil.translateDuration(element, Math.max.apply(Math, durations));
      for (i = 0; i < dots; i += 1) {
        duration += 'd';
      }
    }


    var vexOptions = {
      keys : keys,
      duration : duration,
      clef : options.clef.type,
      octave_shift : options.clef.shift
    };

    this.hasMeiStemDir = EventUtil.setStemDir(options, vexOptions);


    VF.StaveNote.call(this, vexOptions);

    if (atts.size === 'cue') {
      EventUtil.setCueSize.call(this);
    }


    for (i = 0; i < dots; i += 1) {
      this.addDotToAll();
    }

    this.setStave(options.stave);

    if (atts.ho) {
      EventUtil.processAttrHo(atts.ho, me, options.stave);
    }

    var articElements = element.getElementsByTagName('artic');
    for (i = 0, j = articElements.length; i < j; i++) {
      EventUtil.addArticulation(me, articElements[i]);
    }
    if (atts.artic) {
      EventUtil.addArticulation(me, element);
    }

    if (atts.fermata) {
      EventUtil.addFermataAtt(me, element, atts.fermata);
    }
    if (atts['stem.mod']) {
      EventUtil.addStemModifier(this, element, atts['stem.mod']);
    }

  };

  Chord.prototype = Object.create(VF.StaveNote.prototype);

  Chord.prototype.beamable = true;
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



  var GraceChord = function (options) {
    var me = this, atts = options.atts, element = options.element;
    var durAtt, durations = [], duration, keys = [], i, j, noteElements, dots;

    noteElements = options.noteElements;

    durAtt = atts.dur;

    if (durAtt) {
      duration = EventUtil.processAttsDuration(element, atts);
      dots = +atts.dots || 0;
      for (i = 0, j = noteElements.length; i < j; i += 1) {
        keys.push(EventUtil.getVexPitch(noteElements[i]));
      }
    } else {
      for (i = 0, j = noteElements.length; i < j; i += 1) {
        durations.push(+noteElements[i].getAttribute('dur'));
        dots =+noteElements[i].getAttribute('dots') || 0;
        keys.push(EventUtil.getVexPitch(noteElements[i]));
      }
      duration = EventUtil.translateDuration(element, Math.max.apply(Math, durations));
      for (i = 0; i < dots; i += 1) {
        duration += 'd';
      }
    }


    var vexOptions = {
      keys : keys,
      duration : duration,
      clef : options.clef.type,
      octave_shift : options.clef.shift
    };

    this.hasMeiStemDir = EventUtil.setStemDir(options, vexOptions);

    VF.GraceNote.call(this, vexOptions);


    for (i = 0; i < dots; i += 1) {
      this.addDotToAll();
    }



    this.slash = atts['stem.mod'] === '1slash';

    this.setStave(options.stave);

    if (atts.ho) {
      EventUtil.processAttrHo(atts.ho, me, options.stave);
    }

    var articElements = element.getElementsByTagName('artic');
    for (i=0,j=articElements.length;i<j;i++) {
      EventUtil.addArticulation(me, articElements[i]);
    }
    if (atts.artic) {
      EventUtil.addArticulation(me, element);
    }

    if (atts.fermata) {
      EventUtil.addFermataAtt(me, element, atts.fermata);
    }

  };

  GraceChord.prototype = Object.create(VF.GraceNote.prototype);

  GraceChord.prototype.grace = true;
//  GraceChord.prototype.beamable = true;
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



  var Rest = function (options) {
    var dots, i, vexOptions, atts;

    atts = Util.attsToObj(options.element);


    var duration = EventUtil.processAttsDuration(options.element, atts) + 'r';

    if (options.clef) {
      vexOptions = {
        duration: duration,
        keys : [atts.ploc + '/' + atts.oloc],
        clef : options.clef.type,
        octave_shift : options.clef.shift
      }
    } else {
      vexOptions = {
        duration: duration,
        keys : [(atts.dur === '1') ? 'd/5' : 'b/4']
      }
    }


    VF.StaveNote.call(this, vexOptions);

    if (atts.size === 'cue') {
      EventUtil.setCueSize.call(this);
    }


    dots = +atts.dots || 0;
    for (i = 0; i < dots; i += 1) {
      this.addDotToAll();
    }

    this.setStave(options.stave);

    if (atts.ho) {
      EventUtil.processAttrHo(atts.ho, this, options.stave);
    }

    if (atts.fermata) {
      EventUtil.addFermataAtt(this, options.element, atts.fermata);
    }

  };

  Rest.prototype = Object.create(VF.StaveNote.prototype);

  Rest.prototype.beamable = true;
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



  var MRest = function (options) {
    var dots, i, vexOptions, atts;

    atts = Util.attsToObj(options.element);

    var duration = new VF.Fraction(options.meter.count, options.meter.unit);
    var dur, keys;
    if (duration.value() == 2) {
      dur = Tables.durations['breve'];
      keys = ['b/4'];
    } else if (duration.value() == 4) {
      dur = Tables.durations['long'];
      keys = ['b/4']
    } else {
      dur = 'w';
      keys = ['d/5'];
    }


//    if (options.clef) {
//      vexOptions.keys = [atts.ploc + '/' + atts.oloc];
//      vexOptions.clef = me.systemInfo.getClef(stave_n);
//    } else {
//      vexOptions.keys = keys;
//    }

    if (options.clef) {
      vexOptions = {
        align_center : true,
        duration : dur + 'r',
        duration_override : duration,

        keys : [atts.ploc + '/' + atts.oloc],
        clef : options.clef.type,
        octave_shift : options.clef.shift
      };
    } else {
      vexOptions = {
        align_center : true,
        duration : dur + 'r',
        duration_override : duration,

        keys : keys
      };
    }

    VF.StaveNote.call(this, vexOptions);

    if (atts.size === 'cue') {
      EventUtil.setCueSize.call(this);
    }


    dots = +atts.dots || 0;
    for (i = 0; i < dots; i += 1) {
      this.addDotToAll();
    }

    this.setStave(options.stave);

    if (atts.ho) {
      EventUtil.processAttrHo(atts.ho, this, options.stave);
    }

    if (atts.fermata) {
      EventUtil.addFermataAtt(this, options.element, atts.fermata);
    }

  };

  MRest.prototype = Object.create(VF.StaveNote.prototype);

  MRest.prototype.beamable = true;
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



  var Space = function (options) {
    var vexOptions, atts;

    atts = Util.attsToObj(options.element);


    vexOptions = {
      duration: EventUtil.processAttsDuration(options.element, atts) + 'r'
    };

    VF.GhostNote.call(this, vexOptions);

    this.setStave(options.stave);

  };

  Space.prototype = Object.create(VF.GhostNote.prototype);

  Space.prototype.beamable = true;

  /*
   * meilib.js
   *
   * Author: Zoltan Komives Created: 05.07.2013
   *
   * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
   * University of Maryland
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not
   * use this file except in compliance with the License. You may obtain a copy of
   * the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
   * License for the specific language governing permissions and limitations under
   * the License.
   */
  /**
   * Contributor: Alexander Erhard
   */
  /**
   * @class MeiLib
   * MeiLib - General purpose JavaScript functions for processing MEI documents.
   * @singleton
   */

  if (!window.MeiLib) window.MeiLib = {};

  /**
   * @method createPseudoUUID
   */
  MeiLib.createPseudoUUID = function () {
    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).substr(-4)
  };

  /**
   * @method durationOf
   * Calculate the duration of an event (number of beats) according to the given
   * meter.
   *
   * Event refers to musical event such as notes, rests, chords. The MEI element
   * <b>space</b> is also considered an event.
   *
   * @param evnt an XML DOM object
   * @param meter the time signature object { count, unit }
   * @param {Boolean} zeroGraceNotes Specifies if all grace notes should return the duration 0
   */
  MeiLib.durationOf = function (evnt, meter, zeroGraceNotes) {

    var IsZeroDurEvent = zeroGraceNotes ? function (evnt, tagName) {
      return evnt.hasAttribute('grace') || tagName === 'clef';
    } : function (evnt, tagName) {
      return tagName === 'clef';
    };

    var isSimpleEvent = function (tagName) {
      return (tagName === 'note' || tagName === 'rest' || tagName === 'space');
    };

    var durationOf_SimpleEvent = function (simple_evnt, meter) {
      var dur = simple_evnt.getAttribute('dur');
      if (!dur) {
        console.warn('@dur of <b>note</b>, <b>rest</b> or <b>space</b> must be specified. Proceeding with default @dur="4". Element:');
        console.log(simple_evnt);
        dur = "4";
        //      throw new MeiLib.RuntimeError('MeiLib.durationOf:E04', '@dur of <b>note</b>, <b>rest</b> or <b>space</b> must be specified.');
      }
      //    console.log(MeiLib.dotsMult(simple_evnt) * MeiLib.dur2beats(Number(dur), meter));
      return MeiLib.dotsMult(simple_evnt) * MeiLib.dur2beats(Number(dur), meter);
    };

    var durationOf_Chord = function (chord, meter, layer_no) {
      var i, j, childNodes, note;
      if (!layer_no) {
        layer_no = "1";
      }
      var dur = chord.getAttribute('dur');
      var dotsMult = MeiLib.dotsMult(chord);
      if (dur) {
        return dotsMult * MeiLib.dur2beats(Number(dur), meter);
      }
      childNodes = chord.childNodes;
      for (i = 0, j = childNodes.length; i < j; i++) {
        if (childNodes[i].localName === 'note') {
          note = childNodes[i];
          var lyr_n = note.getAttribute('layer');
          if (!lyr_n || lyr_n === layer_no) {
            var dur_note = note.getAttribute('dur');
            var dotsMult_note = MeiLib.dotsMult(chord);
            if (!dur && dur_note) {
              dur = dur_note;
              dotsMult = dotsMult_note;
            } else if (dur && dur != dur_note) {
              throw new MeiLib.RuntimeError('MeiLib.durationOf:E05', 'duration of <chord> is ambiguous. Element: ' +
                                                                     Util.serializeElement(chord));
            }
          }
        }
      }

      if (!dur) {
        throw new MeiLib.RuntimeError('MeiLib.durationOf:E06', '@dur of chord must be specified either in <chord> or in at least one of its <note> elements. Proceeding with default @dur="4". Element:' +
                                                               Util.serializeElement(chord));
      }
      return dotsMult * MeiLib.dur2beats(Number(dur), meter);
    };

    var durationOf_Beam = function (beam, meter) {
      var acc = 0, i, j, childNodes, childNode;
      childNodes = beam.childNodes;
      for (i = 0, j = childNodes.length; i < j; i++) {
        childNode = childNodes[i];
        var dur_b;
        var tagName = childNode.localName;
        if (IsZeroDurEvent(childNode, tagName)) {
          dur_b = 0;
        } else if (isSimpleEvent(tagName)) {
          dur_b = durationOf_SimpleEvent(childNode, meter);
        } else if (tagName === 'chord') {
          dur_b = durationOf_Chord(childNode, meter);
        } else if (tagName === 'beam') {
          dur_b = durationOf_Beam(childNode, meter);
        } else if (tagName === 'tuplet') {
          dur_b = durationOf_Tuplet(childNode, meter);
        } else {
          dur_b = 0;
          //throw new MeiLib.RuntimeError('MeiLib.durationOf:E03', "Not supported element '" + tagName + "'");
        }
        acc += dur_b;
      }
      return acc;
    };

    var durationOf_Tuplet = function (tuplet, meter) {
      // change the meter unit according to the ratio in the tuplet, the get the duration as if the tuplet were a beam
      var num = +tuplet.getAttribute('num') || 3;
      var numbase = +tuplet.getAttribute('numbase') || 2;
      return durationOf_Beam(tuplet, {
        count : meter.count,
        unit : meter.unit * numbase / num
      });
    };

    var evnt_name = evnt.localName;
    if (IsZeroDurEvent(evnt, evnt_name)) {
      return 0;
    }
    if (isSimpleEvent(evnt_name)) {
      return durationOf_SimpleEvent(evnt, meter);
    }
    if (evnt_name === 'mRest') {
      return meter.count;
    }
    if (evnt_name === 'chord') {
      return durationOf_Chord(evnt, meter);
    }
    if (evnt_name === 'beam') {
      return durationOf_Beam(evnt, meter);
    }
    if (evnt_name === 'tuplet') {
      return durationOf_Tuplet(evnt, meter);
    }
    return 0;
    //throw new MeiLib.RuntimeError('MeiLib.durationOf:E05', "Not supported element: '" + evnt_name + "'");

  };
  /**
   * @method tstamp2id
   * Find the event with the minimum distance from of the given timestamp.
   *
   * @param {String} tstamp the timestamp to match against events in the given
   * context. Local timestamp only (without measure part).
   * @param {Object} layer an XML DOM object, contains all events in the given
   * measure.
   * @param {Object} meter the effective time signature object { count, unit } in
   * the measure containing layer.
   * @return {String} the xml:id of the closest element, or
   * undefined if <b>layer</b> contains no events.
   */
  MeiLib.tstamp2id = function (tstamp, layer, meter) {
    var ts = Number(tstamp);
    var ts_acc = 0;
    // total duration of events before current event
    var c_ts = function () {
      return ts_acc + 1;
    };// tstamp of current event
    var distF = function () {
      return ts - c_ts();
    };// signed distance between tstamp and tstamp of current event;
    var eventList = new MeiLib.EventEnumerator(layer);
    var evnt;
    var dist;
    var prev_evnt = null;
    // previous event
    var prev_dist;
    // previous distance
    while (!eventList.EoI && (dist === undefined || dist > 0)) {
      prev_evnt = evnt;
      prev_dist = dist;
      evnt = eventList.nextEvent();
      dist = distF();
      if (!evnt.hasAttribute('grace') && evnt.localName !== 'clef') {
        ts_acc +=
        MeiLib.durationOf(evnt, meter, true) * eventList.outputProportion.numbase / eventList.outputProportion.num;
      }
      //    m = meter;
      //    e = evnt;
    }

    if (dist === undefined) {
      return undefined;
    }
    var winner;
    if (dist < 0) {
      if (prev_evnt && prev_dist < Math.abs(dist)) {
        winner = prev_evnt;
      } else {
        winner = evnt;
      }
    } else {
      winner = evnt;
    }

    var getFullNote = function (evnt) {
      if (evnt.hasAttribute('grace') || evnt.localName === 'clef') {
        return getFullNote(eventList.nextEvent()) || evnt;
      }
      return evnt;
    };

    winner = getFullNote(winner);

    var xml_id;
    xml_id = winner.getAttribute('xml:id');
    if (!xml_id) {
      xml_id = MeiLib.createPseudoUUID();
      winner.setAttribute('xml:id', xml_id);
    }
    return xml_id;
  };
  /**
   * @method XMLID
   * returns the xml:id attribute of an element; if there is none, the function
   * created a pseudo id, adds it to the element and returns that id.
   * @param {Element} elem the element to process
   * @return {String} the xml:id of the element
   */
  MeiLib.XMLID = function (elem) {
    var xml_id = elem.getAttribute('xml:id');
    if (!xml_id) {
      xml_id = MeiLib.createPseudoUUID();
      elem.setAttribute('xml:id', xml_id);
    }
    return xml_id;
  };
  /**
   * @method id2tstamp
   * Calculates a timestamp value for an event in a given context. (Event refers
   * to musical events such as notes, rests and chords).
   *
   * @param eventid {String} the xml:id of the event
   * @param context {Array} of contextual objects {layer, meter}. Time signature
   * is mandatory for the first one, but optional for the rest. All layers belong
   * to a single logical layer. They are the layer elements from some consequtive
   * measures.
   * @return {String} the MEI timestamp value (expressed in beats relative to the
   * meter of the measure containing the event) of all events that happened before
   * the given event in the given context. If the event is not in the first
   * measure (layer) the timestamp value contains a 'measure part', that is for
   * example 2m+2 if the event is at the second beat in the 3rd measure.
   */
  MeiLib.id2tstamp = function (eventid, context) {
    var meter;
    var found = false;
    for (var i = 0; i < context.length && !found; ++i) {
      if (context[i].meter) {
        meter = context[i].meter;
      }
      if (i === 0 && !meter) {
        throw new MeiLib.RuntimeError('MeiLib.id2tstamp:E001', 'No time signature specified');
      }

      var result = MeiLib.sumUpUntil(eventid, context[i].layer, meter);
      if (result.found) {
        found = true;
        return i.toString() + 'm' + '+' + (result.beats + 1).toString();
      }
    }
    throw new MeiLib.RuntimeError('MeiLib.id2tstamp:E002', 'No event with xml:id="' + eventid +
                                                           '" was found in the given MEI context.');
  };

  /**
   * @method dur2beats
   * Convert absolute duration into relative duration (nuber of beats) according
   * to time signature.
   *
   * @param dur {Number} reciprocal value of absolute duration (e.g. 4->quarter
   * note, 8->eighth note, etc.)
   * @param {Object} meter the time signature object { count, unit }
   * @return {Number}
   */
  MeiLib.dur2beats = function (dur, meter) {
    return (meter.unit / dur);
  };
  /**
   * @method beats2dur
   * Convert relative duration (nuber of beats) into absolute duration (e.g.
   * quarter note, eighth note, etc) according to time signature.
   *
   * @param beats {Number} duration in beats @param meter time signature object {
 * count, unit } @return {Number} reciprocal value of absolute duration (e.g. 4
   * -> quarter note, 8 -> eighth note, etc.)
   * @param {Object} meter
   */
  MeiLib.beats2dur = function (beats, meter) {
    return (meter.unit / beats);
  };
  /**
   * @method dotsMult
   * Converts the <b>dots</b> attribute value into a duration multiplier.
   *
   * @param node XML DOM object containing a node which may have <code>dots</code>
   * attribute
   * @return {Number} The result is 1 if no <code>dots</code> attribute is present.
   * For <code>dots="1"</code> the result is 1.5, for <code>dots="2"</code> the
   * result is 1.75, etc.
   */
  MeiLib.dotsMult = function (node) {
    var dots = node.getAttribute('dots');
    dots = Number(dots || "0");
    var mult = 1;
    for (; dots > 0; --dots) {
      mult += (1 / Math.pow(2, dots))
    }
    return mult;
  };
  /**
   * @method sumUpUntil
   * For a given event (such as note, rest chord or space) calculates the combined
   * length of preceding events, or the combined length of all events if the given
   * event isn't present.
   *
   * @param {String} eventid the value of the xml:id attribute of the event
   * @param {Object} layer an XML DOM object containing the MEI <b>Layer</b>
   * element
   * @param {Object} meter the time signature object { count, unit }
   * @return {Object} an object { beats:number, found:boolean }. 1. 'found' is true
   * and 'beats' is the total duration of the events that happened before the event
   * 'eventid' within 'layer', or 2. 'found' is false and 'beats is the total
   * duration of the events in 'layer'.
   */
  MeiLib.sumUpUntil = function (eventid, layer, meter) {

    var sumUpUntil_inNode = function (node) {
      var beats, children, found = null, dur, dots, subtotal, chord_dur, i;
      var node_name = node.localName;
      if (node.hasAttribute('grace') || node_name === 'clef') {
        return {
          beats : 0,
          found : (node.getAttribute('xml:id') === eventid)
        };
      }
      if (node_name === 'note' || node_name === 'rest') {
        if (node.getAttribute('xml:id') === eventid) {
          return {
            beats : 0,
            found : true
          };
        } else {
          dur = Number(node.getAttribute('dur'));
          if (!dur) {
            throw new MeiLib.RuntimeError('MeiLib.sumUpUntil:E001', "Duration is not a number ('breve' and 'long' are not supported).");
          }
          dots = node.getAttribute('dots');
          dots = Number(dots || "0");
          beats = MeiLib.dotsMult(node) * MeiLib.dur2beats(dur, meter);

          return {
            beats : beats,
            found : false
          };
        }
      } else if (node_name === 'mRest') {
        if (node.getAttribute('xml:id') === eventid) {
          return {
            beats : 0,
            found : true
          };
        } else {
          return {
            beats : meter.count,
            found : false
          };
          // the duration of a whole bar expressed in number of beats.
        }
      } else if (node_name === 'layer' || node_name === 'beam' || node_name === 'tuplet') {

        // sum up childrens' duration
        beats = 0;
        children = node.childNodes;
        found = false;
        for (i = 0; i < children.length && !found; ++i) {
          if (children[i].nodeType === 1) {
            subtotal = sumUpUntil_inNode(children[i]);
            beats += subtotal.beats;
            found = subtotal.found;
          }
        }
        return {
          beats : beats,
          found : found
        };
      } else if (node_name === 'chord') {
        chord_dur = node.getAttribute('dur');
        if (node.getAttribute('xml:id') === eventid) {
          return {
            beats : 0,
            found : true
          };
        } else {
          // ... or find the longest note in the chord ????
          chord_dur = node.getAttribute('dur');
          if (chord_dur) {
            //            if (node.querySelector("[*|id='" + eventid + "']")) {
            if ($(node).find("[xml\\:id='" + eventid + "']").length) {
              return {
                beats : 0,
                found : true
              };
            } else {
              return {
                beats : MeiLib.dur2beats(chord_dur, meter),
                found : found
              };
            }
          } else {
            children = node.childNodes;
            found = false;
            for (i = 0; i < children.length && !found; ++i) {
              if (children[i].nodeType === 1) {
                subtotal = sumUpUntil_inNode(children[i]);
                beats = subtotal.beats;
                found = subtotal.found;
              }
            }
            return {
              beats : beats,
              found : found
            };
          }
        }
      }
      return {
        beats : 0,
        found : false
      };
    };

    return sumUpUntil_inNode(layer);
  };
/*
 * EventReference.js Author: Zoltan Komives (zolaemil@gmail.com) Created:
 * 04.07.2013
 *
 * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */



  /**
   * @class MEI2VF.EventReverence
   * Represents and event with its xmlid, but if the xmlid is not defined, it
   * can also hold the timestamp that can be resolved as soon as the context
   * that holds the event is established. When the tstamp reference is being
   * resolved, the xml:id is calculated using the generic function tstamp2id(),
   * then the xml:id stored, thus marking that the reference is resolved.
   * @private
   *
   * @constructor
   * @param {String} xmlid
   */
  var EventReference = function (xmlid) {
    this.xmlid = xmlid;
  };

  EventReference.prototype = {

    /**
     * @public
     * @param xmlid
     */
    setId : function (xmlid) {
      this.xmlid = xmlid;
    },

    /**
     * @public
     * @param tstamp
     */
    setTStamp : function (tstamp) {
      this.tstamp = tstamp;
      if (this.xmlid) {
        // parameter not used in callee:
        this.tryResolveReference(true);
      }
    },

    /**
     * @private
     */
    tryResolveReference : function () {
      var tstamp;
      tstamp = this.tstamp;
      if (!tstamp) {
        throw new RuntimeError('tstamp must be set in order to resolve reference.');
      }
      if (this.meicontext) {
        // look up event corresponding to the given tstamp (strictly or losely)
        this.xmlid = MeiLib.tstamp2id(this.tstamp, this.meicontext.layer, this.meicontext.meter);
      } else {
        this.xmlid = null;
      }
    },

    /**
     * @param params {
     *            meicontext, strict }; both parameters are optional;
     *            meicontext is an obejct { layer, meter }; strict is
     *            boolean, false if not defined.
     *
     */
    getId : function (params) {
      if (params && params.meicontext) {
        this.setContext(params.meicontext);
      }
      if (this.xmlid) {
        return this.xmlid;
      }
      if (this.tstamp && this.meicontext) {
        // look up the closest event to tstamp within
        // this.meicontext and return its ID

        // parameter not used in callee:
        this.tryResolveReference(params && params.strict);
        return this.xmlid;
      }
      return null;
    },

    /**
     * @public
     * @param meicontext
     */
    setContext : function (meicontext) {
      this.meicontext = meicontext;
    }
  };
/*
 * EventLink.js Author: Zoltan Komives (zolaemil@gmail.com) Created: 04.07.2013
 *
 * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */




  /**
   * @class MEI2VF.EventLink
   * @private
   * Represents a link between two MEI events. The link is represented by two
   * references:
   *
   * 1. reference to start event,
   * 2. reference to end event.
   *
   * @constructor
   * @param {String} first_id
   * @param {String} last_id
   */
  var EventLink = function (first_id, last_id) {
    this.init(first_id, last_id);
  };

  EventLink.prototype = {
    init : function (first_id, last_id) {
      this.first_ref = new EventReference(first_id);
      this.last_ref = new EventReference(last_id);
      this.params = {};
    },

    /**
     * @param {Object} params
     *            is an object. for ties and slurs { linkCond } to indicate
     *            the linking condition when parsing from attributes (pitch
     *            name for ties, nesting level for slurs); for hairpins
     *            params it is an object { place, form }
     */
    setParams : function (params) {
      this.params = params;
    },

    setMeiElement : function (element) {
      this.meiElement = element;
    },

    getMeiElement : function () {
      return this.meiElement;
    },

    setFirstRef : function (first_ref) {
      this.first_ref = first_ref;
    },

    setLastRef : function (last_ref) {
      this.last_ref = last_ref;
    },

    setFirstId : function (id) {
      this.first_ref.setId(id);
    },

    setLastId : function (id) {
      this.last_ref.setId(id);
    },

    setFirstTStamp : function (tstamp) {
      this.first_ref.setTStamp(tstamp);
    },

    setLastTStamp : function (tstamp2) {
      this.last_ref.setTStamp(tstamp2);
    },

    setContext : function (meicontext) {
      this.meicontext = meicontext;
    },

    getFirstId : function () {
      return this.first_ref.getId({
        meicontext : this.meicontext
      });
    },

    getLastId : function () {
      return this.last_ref.getId({
        meicontext : this.meicontext
      });
    }
  };
/*
 * MEItoVexFlow, EventLinkCollection class
 *
 * Author: Alexander Erhard
 * (based on meitovexflow.js)
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class EventLinkCollection
   * @private
   *
   * @constructor
   */
  var EventLinkCollection = function (systemInfo, unresolvedTStamp2) {
    this.init(systemInfo, unresolvedTStamp2);
  };

  EventLinkCollection.prototype = {

    /**
     * initializes the EventLinkCollection
     */
    init : function (systemInfo, unresolvedTStamp2) {
      /**
       * @property
       */
      this.allVexObjects = [];
      /**
       * @property
       */
      this.allModels = [];
      /**
       * @property
       */
      this.systemInfo = systemInfo;
      /**
       * @property
       */
      this.unresolvedTStamp2 = unresolvedTStamp2;
    },

    validateAtts : function () {
      throw new RuntimeError('You have to provide a validateAtts() method when inheriting MEI2VF.EventLinkCollection.');
    },

    createVexFromInfos : function () {
      throw new RuntimeError('You have to provide a createVexFromInfos method when inheriting MEI2VF.EventLinkCollection.');
    },

    /**
     * create EventLink objects from  <b>tie</b>, <b>slur</b> or <b>hairpin</b>
     * elements
     */
    createInfos : function (link_elements, measureElement, measureIndex, systemInfo) {
      var me = this;

      var link_staveInfo = function (lnkelem) {
        return {
          stave_n : lnkelem.getAttribute('staff') || '1',
          layer_n : lnkelem.getAttribute('layer') || '1'
        };
      };

      // convert tstamp into startid in current measure
      var local_tstamp2id = function (tstamp, lnkelem, measureElement) {

        var stffinf = link_staveInfo(lnkelem);
        var stave = measureElement.querySelector('staff[n="' + stffinf.stave_n + '"]');
        if (!stave) {
          throw new RuntimeError('Cannot find staff @n="' + stffinf.stave_n + '" in ' +
                                 Util.serializeElement(measureElement));
        }
        var layer = stave.querySelector('layer[n="' + stffinf.layer_n + '"]');
        if (!layer) {
          var layer_candid = stave.getElementsByTagName('layer')[0];
          if (layer_candid && !layer_candid.hasAttribute('n')) {
            layer = layer_candid;
          }
          if (!layer) {
            throw new RuntimeError('Cannot find layer @n="' + stffinf.layer_n + '" in ' +
                                   Util.serializeElement(measureElement));
          }
        }
        var staveInfo = systemInfo.getStaveInfo(stffinf.stave_n);
        if (!staveInfo) {
          throw new RuntimeError('Cannot determine staff definition.');
        }
        var meter = staveInfo.getTimeSpec();
        if (!meter.count || !meter.unit) {
          throw new RuntimeError('Cannot determine meter; missing or incorrect @meter.count or @meter.unit.');
        }
        return MeiLib.tstamp2id(tstamp, layer, meter);
      };

      var measure_partOf = function (tstamp2) {
        return tstamp2.substring(0, tstamp2.indexOf('m'));
      };

      var beat_partOf = function (tstamp2) {
        return tstamp2.substring(tstamp2.indexOf('+') + 1);
      };

      var i, j, eventLink, element, atts, startid, tstamp, tstamp2, endid, measures_ahead;

      for (i = 0, j = link_elements.length; i < j; i++) {
        element = link_elements[i];

        eventLink = new EventLink(null, null);

        atts = Util.attsToObj(element);

        me.validateAtts(atts);

        eventLink.setParams(atts);
        eventLink.setMeiElement(element);

        // find startid for eventLink. if tstamp is provided in the
        // element, tstamp will be calculated.
        startid = atts.startid;
        if (startid) {
          eventLink.setFirstId(startid.substring(1));
        } else {
          tstamp = atts.tstamp;
          if (tstamp) {
            startid = local_tstamp2id(tstamp, element, measureElement);
            eventLink.setFirstId(startid);
          }
          // else {
          // // no @startid, no @tstamp ==> eventLink.first_ref
          // remains empty.
          // }
        }

        // find end reference value (id/tstamp) of eventLink:
        endid = atts.endid;
        if (endid) {
          eventLink.setLastId(endid.substring(1));
        } else {
          tstamp2 = atts.tstamp2;
          if (tstamp2) {
            measures_ahead = +measure_partOf(tstamp2);
            if (measures_ahead > 0) {
              eventLink.setLastTStamp(beat_partOf(tstamp2));
              // register that eventLink needs context;
              // need to save: measure.n, link.stave_n,
              // link.layer_n
              var staveInfo = link_staveInfo(element);
              var target_measure_n = measureIndex + measures_ahead;
              var refLocationIndex = target_measure_n + ':' + staveInfo.stave_n + ':' + staveInfo.layer_n;
              if (!me.unresolvedTStamp2[refLocationIndex]) {
                me.unresolvedTStamp2[refLocationIndex] = [];
              }
              me.unresolvedTStamp2[refLocationIndex].push(eventLink);
            } else {
              endid = local_tstamp2id(beat_partOf(tstamp2), element, measureElement);
              eventLink.setLastId(endid);
            }
          }
          // else {
          // // TODO no @endid, no @tstamp2 ==> eventLink.last_ref remains empty.
          // }
        }
        me.addModel(eventLink);
      }
    },

    /**
     * adds a new model to {@link #allModels}
     * @param {Object} obj the object to add
     */
    addModel : function (obj) {
      this.allModels.push(obj);
    },

    /**
     * gets all models
     * @return {Object[]} all models in {@link #allModels}
     */
    getModels : function () {
      return this.allModels;
    },

    /**
     * sets the context for the link collection
     * @param {Object} ctx the canvas context
     */
    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    /**
     * draws the link collection to the canvas set by {@link #setContext}
     */
    draw : function () {
      var ctx = this.ctx, i, j, allVexObjects = this.allVexObjects;
      for (i = 0, j = allVexObjects.length; i < j; i++) {
        allVexObjects[i].setContext(ctx).draw();
      }
    }
  };
/*
 * MEItoVexFlow, Hairpins class
 * (based on meitovexflow.js)
 * Author of reworkings: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class Hairpins
   * @extend EventLinkCollection
   * @private
   *
   * @constructor
   */
  var Hairpins = function (systemInfo, unresolvedTStamp2) {
    this.init(systemInfo, unresolvedTStamp2);
  };

  Vex.Inherit(Hairpins, EventLinkCollection, {

    init : function (systemInfo, unresolvedTStamp2) {
      Hairpins.superclass.init.call(this, systemInfo, unresolvedTStamp2);
    },

    validateAtts : function (atts) {
      if (!atts.form) {
        throw new RuntimeError('@form is mandatory in <hairpin> - make sure the xml is valid.');
      }
    },

    createVexFromInfos : function (notes_by_id) {
      var me = this, f_note, l_note, i, j, model;
      for (i = 0, j = me.allModels.length; i < j; i++) {
        model = me.allModels[i];
        f_note = notes_by_id[model.getFirstId()] || {};
        l_note = notes_by_id[model.getLastId()] || {};

        if (f_note.system !== undefined && l_note.system !== undefined && f_note.system !== l_note.system) {
          me.createSingleHairpin(f_note, {}, model.params, model.getMeiElement());
          me.createSingleHairpin({}, l_note, model.params, model.getMeiElement());
        } else {
          me.createSingleHairpin(f_note, l_note, model.params, model.getMeiElement());
        }
      }
      return this;
    },

    createSingleHairpin : function (f_note, l_note, params, element) {
      var me = this, place, type, vex_options, hairpin;
      place = Tables.positions[params.place];
      type = Tables.hairpins[params.form];


      // TODO read from stave
      var stave_spacing = 10;


      if (!f_note.vexNote && !l_note.vexNote) {
        var param, paramString = '';
        for (param in params) {
          paramString += param + '="' + params[param] + '" ';
        }
        console.log(params);
        Logger.warn('Hairpin could not be processed', 'No haipin start or hairpin end could be found. Hairpin parameters: ' +
                                                      paramString + '. Skipping hairpin.');
        return true;
      }

      hairpin = new VF.StaveHairpin({
        first_note : f_note.vexNote,
        last_note : l_note.vexNote
      }, type);

      vex_options = {
        // processing of @opening skipped for aesthetic reasons
        //height : stave_spacing * (parseFloat(params.opening) || 1),
        height: stave_spacing,
        y_shift : 0,
        left_shift_px : 0,
        right_shift_px : 0
      };

      hairpin.setRenderOptions(vex_options);
      hairpin.setPosition(place);
      hairpin.setMeiElement(element);

      me.allVexObjects.push(hairpin);

    }
  });
/*
 * MEItoVexFlow, Ties class
 * (based on meitovexflow.js)
 * Author of reworkings: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */



  /**
   * @class Ties
   * @extend EventLinkCollection
   * @private
   *
   * @constructor
   */

  var Ties = function (systemInfo, unresolvedTStamp2) {
    this.init(systemInfo, unresolvedTStamp2);
  };

  Vex.Inherit(Ties, EventLinkCollection, {

    init : function (systemInfo, unresolvedTStamp2) {
      Ties.superclass.init.call(this, systemInfo, unresolvedTStamp2);
    },

    validateAtts : function () {
    },

    // NB called from tie/slur attributes elements
    startTie : function (startid, linkCond) {
      var eventLink = new EventLink(startid, null);
      eventLink.setParams({
        linkCond : linkCond
      });
      this.allModels.push(eventLink);
    },

    terminateTie : function (endid, linkCond) {
      var cmpLinkCond, found, i, tie, allTies;

      allTies = this.getModels();

      cmpLinkCond = function (lc1, lc2) {
        return (lc1 && lc2 && lc1.vexPitch === lc2.vexPitch && lc1.stave_n === lc2.stave_n);
      };

      found = false;
      for (i = 0; !found && i < allTies.length; ++i) {
        tie = allTies[i];
        if (!tie.getLastId()) {
          if (cmpLinkCond(tie.params.linkCond, linkCond)) {
            found = true;
            tie.setLastId(endid);
          }
          // else {
          // // TODO in case there's no link condition set for the
          // link,
          // // we have to retreive the pitch of the referenced note.
          // // var note_id = tie.getFirstId();
          // // if (note_id) {
          // // var note = me.notes_by_id[note_id];
          // // if (note && cmpLinkCond(tie.params.linkCond,
          // // linkCond)) {
          // // found=true;
          // // tie.setLastId(endid);
          // // }
          // // }
          // }
        }
      }
      // if no tie object found that is uncomplete and with the same
      // pitch, then create a tie that has only endid set.
      if (!found) {
        this.addModel(new EventLink(null, endid));
      }
    },

    createVexFromInfos : function (notes_by_id) {
      var me = this, f_note, l_note, i, j,model;

      for (i=0,j=me.allModels.length;i<j;i++) {
        model = me.allModels[i];

        var keysInChord;
        f_note = notes_by_id[model.getFirstId()] || {};
        l_note = notes_by_id[model.getLastId()] || {};


        if (!f_note.vexNote && !l_note.vexNote) {
          var param, paramString = '';
          for (param in model.params) {
            paramString += param + '="' + model.params[param] + '" ';
          }
          console.log(model);
          Logger.warn('Tie could not be processed', 'No tie start or tie end could be found. Tie parameters: ' + paramString + '. Skipping tie.');
          return true;
        }

        // if the curve direction isn't specified in the model, calculate it:
        if (!model.params.curvedir) {
          var layerDir = f_note.layerDir || l_note.layerDir;
          // if a layer direction is specified, take this as basis for the curve direction
          if (layerDir) {
            model.params.curvedir = layerDir === -1 ? 'below' : layerDir === 1 ? 'above' : undefined;
          } else {
            // if the tie links to a note in a chord, let the outer ties of the
            // chord point outwards
            if (f_note.vexNote) {
              keysInChord = f_note.vexNote.keys.length;
              if (keysInChord > 1) {
                model.params.curvedir =
                (+f_note.index === 0) ? 'below' : (+f_note.index === keysInChord - 1) ? 'above' : undefined;
              }
            } else if (l_note.vexNote) {
              keysInChord = l_note.vexNote.keys.length;
              if (keysInChord > 1) {
                model.params.curvedir =
                +l_note.index === 0 ? 'below' : (+l_note.index === keysInChord - 1) ? 'above' : undefined;
              }
            }
          }
        }

        // if the tied notes belong to different staves, render a tie to each of the staves:
        if (f_note.system !== undefined && l_note.system !== undefined && f_note.system !== l_note.system) {
          me.createSingleTie(f_note, {}, model.params);
          if (!model.params.curvedir) {
            model.params.curvedir = (f_note.vexNote.getStemDirection() === -1) ? 'above' : 'below';
          }
          me.createSingleTie({}, l_note, model.params);
        } else {
          // ... otherwise render only one tie:
          me.createSingleTie(f_note, l_note, model.params);
        }
      }
      return this;
    },

    createSingleTie : function (f_note, l_note, params) {
      var me = this, vexTie;
      vexTie = new VF.StaveTie({
        first_note : f_note.vexNote,
        last_note : l_note.vexNote,
        first_indices : f_note.index,
        last_indices : l_note.index
      });

      if (params.curvedir) {
        vexTie.setDir((params.curvedir === 'above') ? -1 : 1);
      }
      if (f_note.vexNote && f_note.vexNote.grace === true) {
        vexTie.render_options.first_x_shift = -5;
      }
      me.allVexObjects.push(vexTie);
    }

  });
/*
 * MEItoVexFlow, Slurs class
 * (based on meitovexflow.js)
 * Author of reworkings: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */



  /**
   * @class Slurs
   * @extend EventLinkCollection
   * @private
   *
   * @constructor
   */

  var Slurs = function (systemInfo, unresolvedTStamp2) {
    this.init(systemInfo, unresolvedTStamp2);
  };

  Vex.Inherit(Slurs, EventLinkCollection, {

    init : function (systemInfo, unresolvedTStamp2) {
      Slurs.superclass.init.call(this, systemInfo, unresolvedTStamp2);
    },

    validateAtts : function () {
    },

    // NB called from slur attributes elements
    startSlur : function (startid, linkCond) {
      var eventLink = new EventLink(startid, null);
      eventLink.setParams({
        linkCond : linkCond
      });
      this.allModels.push(eventLink);
    },

    terminateSlur : function (endid, linkCond) {
      var me = this, cmpLinkCond, found, i, slur;

      var allModels = this.getModels();

      cmpLinkCond = function (lc1, lc2) {
        return lc1.nesting_level === lc2.nesting_level;
      };

      found = false;
      for (i = 0; i < allModels.length; ++i) {
        slur = allModels[i];
        if (slur && !slur.getLastId() && cmpLinkCond(slur.params.linkCond, linkCond)) {
          slur.setLastId(endid);
          found = true;
          break;
        }
      }
      if (!found) {
        me.addModel(new EventLink(null, endid));
      }
    },

    createVexFromInfos : function (notes_by_id) {
      var me = this, f_note, l_note, i, j, model, bezier, params, curveDir, layerDir, slurOptions = {};

      var BELOW = -1;
      var ABOVE = 1;


      for (i = 0, j = me.allModels.length; i < j; i++) {
        model = me.allModels[i];
        params = model.params;
        curveDir = (params.curvedir === 'above') ? ABOVE : (params.curvedir === 'below') ? BELOW : null;

        f_note = notes_by_id[model.getFirstId()] || {};
        l_note = notes_by_id[model.getLastId()] || {};

        // Skip slurs where no vexNote could be found for both first and last note
        if (!f_note.vexNote && !l_note.vexNote) {
          var param, paramString = '';
          for (param in params) {
            paramString += param + '="' + params[param] + '" ';
          }
          console.log(model);
          Logger.warn('Slur could not be processed', 'No slur start or slur end could be found. Slur parameters: ' +
                                                     paramString + '. Skipping slur.');
          return true;
        }

        var firstStemDir, lastStemDir;
        if (f_note.vexNote) firstStemDir = f_note.vexNote.getStemDirection();
        if (l_note.vexNote) lastStemDir = l_note.vexNote.getStemDirection();
        layerDir = f_note.layerDir || l_note.layerDir;
        var firstDefinedStemDir = firstStemDir || lastStemDir;


        // TODO
        // STEPS :
        // 1) if bezier, use bezier, otherwise calculate curvedir
        // 2) if y shift, use y shift, otherwise calculate position


        // ### STEP 1: Determine curve and curve dir

        bezier = params.bezier;
        //ignore bezier for now!
        bezier = null;
        if (bezier) {
          slurOptions.cps = me.bezierStringToCps(bezier);
          slurOptions.custom_cps = true;
          // bezier overrrides @curvedir
          curveDir = (slurOptions.cps[0].y < 0) ? ABOVE : BELOW;
        } else {

          if (!curveDir) {
            // if no @curvedir is specified, set @curvedir according to the layer direction or to
            // the position of a note in a chord
            if (layerDir) {
              // if @layerdir is specified, set curveDir to @layerdir
              curveDir = layerDir;
            } else {
              // if the slur links to a note in a chord, let the outer slurs of the
              // chord point outwards

              // TODO adjust to slurs!!
              //              keysInChord = firstDefinedNote.vexNote.keys.length;
              //              if (keysInChord > 1) {
              //                curveDir = (+firstDefinedNote.index === 0) ? BELOW :
              //                           (+firstDefinedNote.index === keysInChord - 1) ? ABOVE : undefined;
              //              } else {
              //                curveDir = firstDefinedStemDir * -1;
              //              }

              curveDir = firstDefinedStemDir * -1;

            }
          }

          // adjust slurOptions to curveDir
          slurOptions.invert = !((curveDir === BELOW && lastStemDir === ABOVE) || (curveDir === ABOVE && lastStemDir === BELOW));

        }


        // TODO refactor: take stem-top and stem-bottom into account

        // ### STEP 2: Determine position

        var startvo = parseFloat(params.startvo);
        var endvo = parseFloat(params.endvo);

        // skip this for now
        startvo = null;

        if (startvo && endvo) {
          slurOptions.y_shift_start = startvo;
          slurOptions.y_shift_end = endvo;
        } else {

          if (!f_note.vexNote || !l_note.vexNote || !f_note.vexNote.hasStem() || !l_note.vexNote.hasStem()) {
            // always position at head when one of the notes doesn't have a stem
            slurOptions.position = VF.Curve.Position.NEAR_HEAD;
            slurOptions.position_end = VF.Curve.Position.NEAR_HEAD;

          } else if (firstStemDir === lastStemDir || !firstStemDir || !lastStemDir) {
            // same stem direction in both notes

            // shift slurs to stem end if stem direction equals curve direction
            if (firstDefinedStemDir === curveDir) {
              slurOptions.position = VF.Curve.Position.NEAR_TOP;
              slurOptions.position_end = VF.Curve.Position.NEAR_TOP;
            } else {
              slurOptions.position = VF.Curve.Position.NEAR_HEAD;
              slurOptions.position_end = VF.Curve.Position.NEAR_HEAD;
            }

          } else {
            // different direction in notes

            // change position
            if (firstDefinedStemDir === curveDir) {
              slurOptions.position = VF.Curve.Position.NEAR_TOP;
              slurOptions.position_end = VF.Curve.Position.NEAR_HEAD;
            } else {
              slurOptions.position = VF.Curve.Position.NEAR_HEAD;
              slurOptions.position_end = VF.Curve.Position.NEAR_TOP;
            }

          }

        }


        //
        //          var setPositionBasedOnDistance = function () {
        //            var firstNoteLine = f_note.vexNote.getLineNumber();
        //            var lastNoteLine = l_note.vexNote.getLineNumber();
        //            var distance = firstNoteLine - lastNoteLine;
        //            if (firstStemDir !== lastStemDir) {
        //              if ((firstStemDir === ABOVE && distance < -0.5 && curveDir === ABOVE) ||
        //                  (lastStemDir === BELOW && distance > 0.5 && curveDir === BELOW)) {
        //                slurOptions.position = VF.Curve.Position.NEAR_TOP;
        //                slurOptions.position_end = VF.Curve.Position.NEAR_HEAD;
        //              } else if ((distance > 0.5 && curveDir === ABOVE) || (distance < -0.5 && curveDir === BELOW)) {
        //                slurOptions.position_end = VF.Curve.Position.NEAR_TOP;
        //                //                slurOptions.position_end = VF.Curve.Position.NEAR_TOP;
        //              } else if (distance > 0.5 || distance < -0.5) {
        //                slurOptions.position = VF.Curve.Position.NEAR_HEAD;
        //                slurOptions.position_end = VF.Curve.Position.NEAR_HEAD;
        //              }
        //            } else {
        //              if (slurOptions.invert === true) {
        //                slurOptions.position = VF.Curve.Position.NEAR_TOP;
        //              }
        //            }
        //          };
        //
        //          if (curveDir && f_note.vexNote && l_note.vexNote && f_note.vexNote.duration !== 'w' &&
        //              l_note.vexNote.duration !== 'w') {
        //            // CURVEDIR SPECIFIED - TWO NOTES THERE
        //            setPositionBasedOnDistance();
        //
        //          } else {
        //            // NO CURVEDIR SPECIFIED
        //
        //            if (f_note.layerDir || l_note.layerDir) {
        //              // NO FIXED PLACE - MULTI LAYER
        //              slurOptions.invert = true;
        //
        //              if (f_note.vexNote && l_note.vexNote && f_note.vexNote.hasStem() && l_note.vexNote.hasStem()) {
        //                slurOptions.position = VF.Curve.Position.NEAR_TOP;
        //
        //                if (f_note.vexNote.getStemDirection() !== l_note.vexNote.getStemDirection()) {
        //                  slurOptions.position_end = VF.Curve.Position.NEAR_HEAD;
        //                }
        //
        //              }
        //            } else {
        //              if (f_note.vexNote && l_note.vexNote) {
        //                setPositionBasedOnDistance();
        //              }
        //            }
        //          }
        //
        //        }

        //        console.log('curve dir: ' + curveDir + ', ' + 'layer dir: ' + params.layerDir + ', ');

        // finally, in all cases, handle system breaks and create slur objects
        if (f_note.system !== undefined && l_note.system !== undefined && f_note.system !== l_note.system) {
          me.createSingleSlur(f_note, {}, {
            y_shift_start : slurOptions.y_shift_start,
            y_shift_end : slurOptions.y_shift_end,
            invert : ((curveDir === ABOVE && firstStemDir === ABOVE) || (curveDir === BELOW && firstStemDir === BELOW)),
            position : slurOptions.position,
            position_end : slurOptions.position
          });

          slurOptions.position = slurOptions.position_end;
          slurOptions.invert =
          ((curveDir === ABOVE && lastStemDir === ABOVE) || (curveDir === BELOW && lastStemDir === BELOW));
          me.createSingleSlur({}, l_note, slurOptions);
        } else {
          me.createSingleSlur(f_note, l_note, slurOptions);
        }

      }
      return this;
    },

    createSingleSlur : function (f_note, l_note, slurOptions) {
      this.allVexObjects.push(new VF.Curve(f_note.vexNote, l_note.vexNote, slurOptions));
    },

    bezierStringToCps : function (str) {
      var cps = [], regex, matched;
      regex = /(\-?[\d|\.]+)\s+(\-?[\d|\.]+)/g;
      while (matched = regex.exec(str)) {
        cps.push({
          x : +matched[1],
          y : +matched[2]
        });
      }
      if (!cps[1]) {
        Logger.info('Incomplete attribute', 'Expected four control points in slur/@bezier, but only found two. Providing cps 3 & 4 on basis on cps 1 & 2.');
        cps[1] = {x : -cps[0].x, y : cps[0].y};
      }
      return cps;
    }
  });
/*
 * MEItoVexFlow, EventPointerCollection class
 * (based on meitovexflow.js)

 * Author: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class EventPointerCollection
   * @private
   *
   * @constructor
   */
  var EventPointerCollection = function (systemInfo, font) {
    this.init(systemInfo, font);
  };

  EventPointerCollection.prototype = {

    BOTTOM : VF.Annotation.VerticalJustify.BOTTOM,

    /**
     * initializes the EventPointerCollection
     */
    init : function (systemInfo, font) {
      /**
       * @property
       */
      this.allVexObjects = [];
      /**
       * @property
       */
      this.allModels = [];
      /**
       * @property
       */
      this.systemInfo = systemInfo;
      /**
       * @property
       */
      this.font = font;
    },

    /**
     * adds a new model to {@link #allModels}
     * @param {Object} obj the object to add
     */
    addModel : function (obj) {
      this.allModels.push(obj);
    },

    /**
     * gets all models
     * @return {Object[]} all models in {@link #allModels}
     */
    getModels : function () {
      return this.allModels;
    },

    createInfos : function (elements, measureElement) {
      var me = this, i, j, element, atts, startid, tstamp;

      var link_staveInfo = function (lnkelem) {
        return {
          stave_n : lnkelem.getAttribute('staff') || '1',
          layer_n : lnkelem.getAttribute('layer') || '1'
        };
      };

      // convert tstamp into startid in current measure
      var local_tstamp2id = function (tstamp, lnkelem, measureElement) {
        var stffinf = link_staveInfo(lnkelem);
        var stave = measureElement.querySelector('staff[n="' + stffinf.stave_n + '"]');
        if (!stave) {
          throw new RuntimeError('Could not find staff @n="' + stffinf.stave_n + '" in ' +
                                 Util.serializeElement(measureElement) + ' while processing ' + Util.serializeElement(lnkelem));
        }
        var layer = stave.querySelector('layer[n="' + stffinf.layer_n + '"]');
        if (!layer) {
          var layer_candid = stave.getElementsByTagName('layer')[0];
          if (layer_candid && !layer_candid.hasAttribute('n')) {
            layer = layer_candid;
          }
          if (!layer) {
            throw new RuntimeError('Could not find layer @n="' + stffinf.layer_n + '" in ' +
                                   Util.serializeElement(measureElement) + ' while processing ' + Util.serializeElement(lnkelem));
          }
        }
        var staveInfo = me.systemInfo.getStaveInfo(stffinf.stave_n);
        if (!staveInfo) {
          throw new RuntimeError('Cannot determine staff definition.');
        }
        var meter = staveInfo.getTimeSpec();
        if (!meter.count || !meter.unit) {
          throw new RuntimeError('Cannot determine meter; missing or incorrect @meter.count or @meter.unit.');
        }
        return MeiLib.tstamp2id(tstamp, layer, meter);
      };

      for (i = 0, j = elements.length; i < j; i++) {
        element = elements[i];

        atts = Util.attsToObj(element);

        startid = atts.startid;
        if (startid) {
          startid = startid.substring(1);
        } else {
          tstamp = atts.tstamp;
          if (tstamp) {
            startid = local_tstamp2id(tstamp, element, measureElement);
          } else {
            Logger.warn('@startid or @tstamp expected', Util.serializeElement(element) +
                                                        ' could not be processed because neither @startid nor @tstamp are specified.');
            return;
          }
        }
        me.allModels.push({
          element : element,
          atts : atts,
          startid : startid
        });
      }
    },


    createVexFromInfos : function (notes_by_id) {
      var me = this, i, model, note;
      i = me.allModels.length;
      while (i--) {
        model = me.allModels[i];
        note = notes_by_id[model.startid];
        if (note) {
          me.addToNote(model, note);
        } else {
          if (model.startid) {
            Logger.warn('Unknown reference', Util.serializeElement(model.element) +
                                             ' could not be processed because the reference "' + model.startid +
                                             '" could not be resolved.');
          } else {
            Logger.warn('Unknown reference', Util.serializeElement(model.element) +
                                             ' could not be processed because it could not be assigned to an element.');
          }
        }
      }
    },

    addToNote : function () {
      throw new RuntimeError('You have to provide an addToNote() method when inheriting MEI2VF.EventPointerCollection.');
    }
  };
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


  /**
   * @class Arpeggios
   * @extend EventPointerCollection
   * @private
   *
   * @constructor
   */
  var Arpeggios = function (systemInfo) {
    this.init(systemInfo);
  };

  Vex.Inherit(Arpeggios, EventPointerCollection, {

    init : function (systemInfo, font) {
      Arpeggios.superclass.init.call(this, systemInfo, font);
    },

    createInfos : function (elements, measureElement) {
      var me = this, i, j, element, atts, startid, tstamp;

      var link_staveInfo = function (lnkelem) {
        return {
          stave_n : lnkelem.getAttribute('staff') || '1',
          layer_n : lnkelem.getAttribute('layer') || '1'
        };
      };

      // convert tstamp into startid in current measure
      var local_tstamp2id = function (tstamp, lnkelem, measureElement) {
        var stffinf = link_staveInfo(lnkelem);
        var stave = measureElement.querySelector('staff[n="' + stffinf.stave_n + '"]');
        if (!stave) {
          throw new RuntimeError('Could not find staff @n="' + stffinf.stave_n + '" in ' +
                                 Util.serializeElement(measureElement) + ' while processing ' + Util.serializeElement(lnkelem));
        }
        var layer = stave.querySelector('layer[n="' + stffinf.layer_n + '"]');
        if (!layer) {
          var layer_candid = stave.getElementsByTagName('layer')[0];
          if (layer_candid && !layer_candid.hasAttribute('n')) {
            layer = layer_candid;
          }
          if (!layer) {
            throw new RuntimeError('Could not find layer @n="' + stffinf.layer_n + '" in ' +
                                   Util.serializeElement(measureElement) + ' while processing ' + Util.serializeElement(lnkelem));
          }
        }
        var staveInfo = me.systemInfo.getStaveInfo(stffinf.stave_n);
        if (!staveInfo) {
          throw new RuntimeError('Cannot determine staff definition.');
        }
        var meter = staveInfo.getTimeSpec();
        if (!meter.count || !meter.unit) {
          throw new RuntimeError('Cannot determine meter; missing or incorrect @meter.count or @meter.unit.');
        }
        return MeiLib.tstamp2id(tstamp, layer, meter);
      };

      for (i = 0, j = elements.length; i < j; i++) {
        element = elements[i];

        atts = Util.attsToObj(element);

        var pList;
        if (atts.plist) {
          pList = Util.pListToArray(atts.plist);
        }
        
        // TODO handle arpeggio over multiple notes / chords!

        // for now, only look for the first id in the plist

        if (pList && pList[0]) {
          startid = pList[0].substring(1);
        } else {
          tstamp = atts.tstamp;
          if (tstamp) {
            startid = local_tstamp2id(tstamp, element, measureElement);
          } else {
            Logger.warn('@startid or @tstamp expected', Util.serializeElement(element) +
                                                        ' could not be processed because neither @startid nor @tstamp are specified.');
            return;
          }
        }
        me.allModels.push({
          element : element,
          atts : atts,
          startid : startid
        });
      }
    },


    addToNote : function(model, note) {
      note.vexNote.addStroke(0, new VF.Stroke(0));
    }

  });
/*
 * MEItoVexFlow, Directives class
 * (based on meitovexflow.js)
 * Author of reworkings: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class Directives
   * @extend EventPointerCollection
   * @private
   *
   * @constructor
   */
  var Directives = function (systemInfo, font) {
    this.init(systemInfo, font);
  };

  Vex.Inherit(Directives, EventPointerCollection, {

    init : function (systemInfo, font) {
      Directives.superclass.init.call(this, systemInfo, font);
    },

    addToNote : function (model, note) {
      var me = this, annot, rend, font, rendAtts;

      font = {
        family: me.font.family,
        size: me.font.size,
        weight: ''
      };

      rend = model.element.getElementsByTagName('rend')[0];
      if (rend) {
        rendAtts = Util.attsToObj(rend);
        if (rendAtts.fontfamily) font.family = rendAtts.fontfamily;
        if (rendAtts.fontweight) font.weight += rendAtts.fontweight + ' ';
        if (rendAtts.fontstyle) font.weight += rendAtts.fontstyle;
        if (rendAtts.fontsize) font.size = +rendAtts.fontsize * 1.5;
      }

      annot = (new VF.Annotation(Util.getNormalizedText(model.element).trim())).setFont(font.family, font.size, font.weight).setMeiElement(model.element);

      // TEMPORARY: set width of modifier to zero so voices with modifiers
      // don't get too much width; remove when the width calculation in
      // VexFlow does distinguish between different y values when
      // calculating the width of tickables
      annot.setWidth(0);
      annot.setJustification(1); // left by default
      if (model.atts.place === 'below') {
        note.vexNote.addAnnotation(0, annot.setVerticalJustification(me.BOTTOM));
      } else {
        note.vexNote.addAnnotation(0, annot);
      }
    }

  });
/*
 * MEItoVexFlow, Dynamics class
 * (based on meitovexflow.js)
 * Author of reworkings: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class Dynamics
   * @extend EventPointerCollection
   * @private
   *
   * @constructor
   */
  var Dynamics = function (systemInfo, font) {
    this.init(systemInfo, font);
  };

  Vex.Inherit(Dynamics, EventPointerCollection, {

    init : function (systemInfo, font) {
      Dynamics.superclass.init.call(this, systemInfo, font);
    },

    addToNote : function(model, note) {
      var me = this, annot =
      (new VF.Annotation(Util.getText(model.element).trim())).setFont(me.font.family, me.font.size, me.font.weight).setMeiElement(model.element);

      // TEMPORARY: set width of modifier to zero so voices with modifiers
      // don't get too much width; remove when the width calculation in
      // VexFlow does distinguish between different y values when
      // calculating the width of tickables
      annot.setWidth(0);
      if (model.atts.place === 'above') {
        note.vexNote.addAnnotation(0, annot);
      } else {
        note.vexNote.addAnnotation(0, annot.setVerticalJustification(me.BOTTOM));
      }
    }

  });
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



  /**
   * @class Fermatas
   * @extend EventPointerCollection
   * @private
   *
   * @constructor
   */
  var Fermatas = function (systemInfo, font) {
    this.init(systemInfo, font);
  };

  Vex.Inherit(Fermatas, EventPointerCollection, {

    init : function (systemInfo, font) {
      Fermatas.superclass.init.call(this, systemInfo, font);
    },

    addToNote : function (model, note) {
      EventUtil.addFermata(note.vexNote, model.element, model.atts.place);
    }

  });
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


  /**
   * @class Ornaments
   * @extend PointerCollection
   * @private
   *
   * @constructor
   */
  var Ornaments = function (systemInfo, font) {
    this.init(systemInfo, font);
  };

  Vex.Inherit(Ornaments, EventPointerCollection, {

    init : function (systemInfo, font) {
      Ornaments.superclass.init.call(this, systemInfo, font);
    },

    /**
     * adds an ornament to a note-like object
     * @method addOrnamentToNote
     * @param {Object} model
     * @param {Object} note
     */
    addToNote : function (model, note) {
      var atts = model.atts;
      // TODO support @tstamp2 etc -> make Link instead of Pointer

      var ornamentMap = {
        'trill' : 'tr', 'mordent' : 'mordent', 'turn' : 'turn'
      };

      var name = ornamentMap[model.element.localName];

      var form;
      if (name === 'mordent') {
        form = (atts.form === 'inv') ? '' : '_inverted';
      } else {
        form = (atts.form === 'inv') ? '_inverted' : '';
      }

      var vexOrnament = new VF.Ornament(name + form);

      vexOrnament.setMeiElement(model.element);

      // not yet implemented in vexFlow
      //      var place = atts.place;
      //      if (place) {
      //        vexOrnament.position = Tables.positions[place];
      //      }

      //      notesBar1[0].addModifier(0, new Vex.Flow.Ornament("mordent"));
      //      notesBar1[1].addModifier(0, new Vex.Flow.Ornament("mordent_inverted"));
      //      notesBar1[2].addModifier(0, new Vex.Flow.Ornament("turn"));
      //      notesBar1[3].addModifier(0, new Vex.Flow.Ornament("turn_inverted"));
      //      notesBar1[4].addModifier(0, new Vex.Flow.Ornament("tr"));
      //      notesBar1[5].addModifier(0, new Vex.Flow.Ornament("upprall"));
      //      notesBar1[6].addModifier(0, new Vex.Flow.Ornament("downprall"));
      //      notesBar1[7].addModifier(0, new Vex.Flow.Ornament("prallup"));
      //      notesBar1[8].addModifier(0, new Vex.Flow.Ornament("pralldown"));
      //      notesBar1[9].addModifier(0, new Vex.Flow.Ornament("upmordent"));
      //      notesBar1[10].addModifier(0, new Vex.Flow.Ornament("downmordent"));
      //      notesBar1[11].addModifier(0, new Vex.Flow.Ornament("lineprall"));
      //      notesBar1[12].addModifier(0, new Vex.Flow.Ornament("prallprall"));

      if (atts.accidupper) {
        vexOrnament.setUpperAccidental(Tables.accidentals[atts.accidupper]);
      }
      if (atts.accidlower) {
        vexOrnament.setLowerAccidental(Tables.accidentals[atts.accidlower]);
      }
      note.vexNote.addModifier(0, vexOrnament);
    }
  });
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


  var SpanCollection = function() {};

  SpanCollection.prototype = {

    init: function () {
      var me = this;
      me.spanElements = [];
      me.vexObjects = [];
    },

    addSpanElements: function (elements) {
      this.spanElements.push(elements);
    },

    addVexObject : function (obj) {
      this.vexObjects.push(obj);
    },

    resolveSpans : function (elements, fragmentPostProcessor, notes_by_id) {
      var me = this, i, j, element, pList, pListArray, startIdAtt, endIdAtt;

      for (i = 0, j = elements.length; i < j; i++) {
        element = elements[i];
        pList = element.getAttribute('plist');
        pListArray = Util.pListToArray(pList);

        startIdAtt = element.getAttribute('startid');
        endIdAtt = element.getAttribute('endid');
        if (startIdAtt !== null || endIdAtt !== null) {
          // insert startid and endid to the plist if they're not already there
          if (pListArray[0] !== startIdAtt) {
            pListArray.unshift(startIdAtt);
          }
          if (pListArray[pListArray.length - 1] !== endIdAtt) {
            pListArray.push(endIdAtt);
          }
          var voices = [];
          var firstMeasure;
          var noteObjects = pListArray.map(function (item, index) {
            var obj = notes_by_id[item.substring(1)];
            if (!obj) {
              throw new RuntimeError('Reference "' + item + '" given in ' + Util.serializeElement(element) +
                                     ' not found.')
            }
            var voice = obj.vexNote.voice;
            if (index === 0) {
              firstMeasure = $(obj.meiNote).closest('measure').get(0);
            }
            var voiceIndex = voices.indexOf(voice);
            if (voiceIndex === -1) {
              // voice index remains -1 if the note is not in the start measure; it will not get
              // included then when adding spaces
              if (!firstMeasure || $(obj.meiNote).closest('measure').get(0) === firstMeasure) {
                //noinspection JSReferencingMutableVariableFromClosure
                voiceIndex = voices.push(voice) - 1;
              }
            }
            return {
              obj : obj, voiceIndex : voiceIndex, vexNote : obj.vexNote
            };
          });

          var newSpace;

          var createSpaceFrom = function (vexNote, stave) {
            var gn = new VF.GhostNote(vexNote.getDuration());

            // TODO handle dots
            gn.setStave(stave);
            return gn;
          };

          var notes = noteObjects.map(function (item) {
            return item.vexNote;
          });

          var newVoiceSegment;
          var indicesInVoice;

          if (voices.length > 1) {
            // create spaces in voices

            for (var m = 0, n = voices.length; m < n; m++) {
              newVoiceSegment = [];
              indicesInVoice = [];
              for (var o = 0, p = noteObjects.length; o < p; o++) {
                if (noteObjects[o].voiceIndex === m) {
                  newVoiceSegment[o] = noteObjects[o].vexNote;
                  indicesInVoice.push(voices[m].tickables.indexOf(noteObjects[o].vexNote));
                } else if (noteObjects[o].voiceIndex !== -1) {

                  // TODO handle this later for each measure!!!
                  newSpace = createSpaceFrom(noteObjects[o].vexNote, voices[m].tickables[0].stave);
                  newVoiceSegment[o] = newSpace;
                }
              }

              var t = voices[m].tickables;
              if (m !== 0 && typeof fragmentPostProcessor === 'function') {
                fragmentPostProcessor(element, newVoiceSegment);
              }
              voices[m].tickables =
              t.slice(0, indicesInVoice[0]).concat(newVoiceSegment).concat(t.slice(indicesInVoice[indicesInVoice.length -
                                                                                                  1] + 1));
            }
          }

          me.createVexObject(notes, voices, element);

        } else {
          Logger.warn('Missing attributes', 'Could not process ' + Util.serializeElement(element) +
                                            ', because @startid or @endid is missing.')
        }
      }
    },

    createVexObject : function () {
      throw new RuntimeError('createVexObject() method not implemented.');
    },

    postFormat : function () {
      var i, j, items = this.vexObjects;
      for (i = 0, j = items.length; i < j; i++) {
        items[i].postFormat();
      }
    },

    setContext : function(ctx) {
      this.ctx = ctx;
      return this;
    },

    draw : function () {
      var me = this, i, j, items = me.vexObjects, ctx = me.ctx;
      for (i = 0, j = items.length; i < j; i++) {
        items[i].setContext(ctx).draw();
      }
    }


  };
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


  /**
   * @class BeamCollection
   * @extend SpanCollection
   * @private
   *
   * @constructor
   */
  var BeamCollection = function () {
    this.init();
  };

  Vex.Inherit(BeamCollection, SpanCollection, {

    init : function () {
      BeamCollection.superclass.init.call(this);
    },

    resolveSpanElements : function (notes_by_id) {
      var me = this;
      me.resolveSpans(me.spanElements, null, notes_by_id);
    },

    createVexObject : function (notes) {
      this.vexObjects.push(new VF.Beam(notes, false));
    }

  });
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


  /**
   * @class TupletCollection
   * @extend SpanCollection
   * @private
   *
   * @constructor
   */
  var TupletCollection = function () {
    this.init();
  };

  Vex.Inherit(TupletCollection, SpanCollection, {

    init : function () {
      TupletCollection.superclass.init.call(this);
    },

    resolveSpanElements : function (notes_by_id) {
      var me = this;

      var fragmentPostProcessor = function (element, slice) {
        new VF.Tuplet(slice, {
          num_notes : parseInt(element.getAttribute('num'), 10) || 3,
          beats_occupied : parseInt(element.getAttribute('numbase'), 10) || 2
        })
      };

      me.resolveSpans(me.spanElements, fragmentPostProcessor, notes_by_id);
    },

    createVexObject : function (notes, voices, element) {
      var me=this, tickables, tuplet, voice, i, j;

      tuplet = new VF.Tuplet(notes, {
        num_notes : parseInt(element.getAttribute('num'), 10) || 3,
        beats_occupied : parseInt(element.getAttribute('numbase'), 10) || 2
      });

      if (element.getAttribute('num.format') === 'ratio') {
        tuplet.setRatioed(true);
      }

      tuplet.setBracketed(element.getAttribute('bracket.visible') === 'true');

      var bracketPlace = element.getAttribute('bracket.place');
      if (bracketPlace) {
        tuplet.setTupletLocation((bracketPlace === 'above') ? 1 : -1);
      }

      me.vexObjects.push(tuplet);

      // TODO make this more efficient
      for (i = 0, j = voices.length; i < j; i++) {
        voice = voices[i];
        tickables = voice.tickables;
        voice.ticksUsed = new Vex.Flow.Fraction(0, 1);
        voice.tickables = [];
        voice.addTickables(tickables);
      }

    }

  });
/*
 * MEItoVexFlow, Hyphenation class
 *
 * Author: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class MEI2VF.Hyphenation
   * @private
   * @param font
   * @param maxHyphenDistance
   * @constructor
   */
  var Hyphenation = function (font, maxHyphenDistance) {
    var me = this;
    me.allSyllables = [];
    me.font = font;
    me.maxHyphenDistance = maxHyphenDistance;
  };

  Hyphenation.prototype = {

    /**
     * @const {null} WORD_SEPARATOR the object indicating the transition between two separate words
     */
    WORD_SEPARATOR : null,

    addSyllable : function (annot, wordpos) {
      var me = this;
      if (wordpos === 'i') me.allSyllables.push(me.WORD_SEPARATOR);
      me.allSyllables.push(annot);
      if (wordpos === 't') me.allSyllables.push(me.WORD_SEPARATOR);
    },

    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    draw : function (leftX, rightX) {
      var me = this, i, first, second, hyphenWidth;

      me.ctx.setFont(me.font.family, me.font.size, me.font.weight);

      hyphenWidth = me.ctx.measureText('-').width;

      i = me.allSyllables.length + 1;
      while (i--) {
        first = me.allSyllables[i - 1];
        second = me.allSyllables[i];

        if (first !== me.WORD_SEPARATOR && second !== me.WORD_SEPARATOR) {
          var opts = {
            hyphen_width : hyphenWidth,
            max_hyphen_distance : me.maxHyphenDistance
          };
          if (first === undefined) {
            // we're at the start of a system
            opts.first_annot = { x : leftX };
          } else {
            opts.first_annot = first;
          }
          if (second === undefined) {
            // we're at the end of a system
            opts.last_annot = { x : rightX };
          } else {
            opts.last_annot = second;
          }
          if (opts.first_annot.y || opts.last_annot.y) {
            var h = new VF.Hyphen(opts);
            h.setContext(me.ctx).renderHyphen();
          }
        }
      }
    }
  };
/*
 * MEItoVexFlow, Verses class
 *
 * Author: Zoltan Komives
 * Contributor: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class MEI2VF.Verses
   * @private
   *
   * @constructor
   * @param {Object} config
   */
  var Verses = function (config) {
    var me = this;
    me.systemVerses = {};
    me.lowestYs = {};
    me.font = config.font;
    me.maxHyphenDistance = config.maxHyphenDistance;
  };

  Verses.prototype = {

    /**
     * @public
     * @param annot
     * @param element
     * @param stave_n
     * @returns {Verses}
     */
    addSyllable : function (annot, element, stave_n) {
      var me = this, verse_n;

      var wordpos = element.getAttribute('wordpos');

      var parentNode = element.parentNode;
      if (parentNode.localName === 'verse' && parentNode.hasAttribute('n')) {
        verse_n = parentNode.getAttribute('n');
      } else {
        verse_n = '1';
      }

      if (!me.systemVerses[stave_n]) {
        me.systemVerses[stave_n] = {};
      }

      if (!me.systemVerses[stave_n][verse_n]) {
        me.systemVerses[stave_n][verse_n] = {
          syllables: [],
          hyphenation : me.newHyphenation()
        };
      }

      me.systemVerses[stave_n][verse_n].syllables.push(annot);

      if (wordpos) {
        me.systemVerses[stave_n][verse_n].hyphenation.addSyllable(annot, wordpos);
      }
      return me;
    },

    /**
     * @public
     */
    getLowestYs : function () {
      return this.lowestYs;
    },

    /**
     * @public
     */
    getLowestY : function (stave_n) {
      return this.lowestYs[stave_n];
    },

    /**
     * @private
     */
    newHyphenation : function () {
      return new Hyphenation(this.font, this.maxHyphenDistance);
    },

    /**
     * @public
     * @returns {Verses}
     */
    format : function () {
      var me = this, stave_n, verse_n, text_line, verse, i, j, lowestY, padding, lowestTextLine;
      var notesInContext;

      padding = 20;

      me.font.size=15;

      var spacing_between_lines = 10;
      var height_in_lines = me.font.size / spacing_between_lines * 1.5;

      for (stave_n in me.systemVerses) {
        text_line = 0;
        lowestTextLine = 0;
        lowestY = -20;

        for (verse_n in me.systemVerses[stave_n]) {
          verse = me.systemVerses[stave_n][verse_n].syllables;
          lowestY += padding;
          // first pass: get lowest y
          for (i = 0, j = verse.length; i < j; i++) {
            verse[i].setTextLine(text_line);

            notesInContext = verse[i].getModifierContext().modifiers.stavenotes;

            if (notesInContext.length > 1) {
              verse[i].setNote(notesInContext[0]);
            }

            // TODO compare lowest Ys


            lowestY = Math.max(lowestY, verse[i].preProcess());

//            lowestTextLine = Math.max(lowestTextLine, verse[i].text_line);
          }
          // second pass: set lowest y
          for (i = 0; i < j; i++) {
            verse[i].setY(lowestY);
//            verse[i].setTextLine(lowestTextLine);
          }
          lowestTextLine += height_in_lines;
        }
        me.lowestYs[stave_n] = lowestY;

      }
      return me;
    },

    /**
     * @public
     * @param ctx
     * @param leftX
     * @param rightX
     * @returns {Verses}
     */
    drawHyphens : function (ctx, leftX, rightX) {
      var me = this, stave_n, verse_n;
      for (stave_n in me.systemVerses) {
        for (verse_n in me.systemVerses[stave_n]) {
          me.systemVerses[stave_n][verse_n].hyphenation.setContext(ctx).draw(leftX, rightX);
        }
      }
      return me;
    }

  };
/*
 * MEItoVexFlow, Syllable class
 * a modified version on VexFlow's annotation.js
 *
 * Authors: Zoltan Komives, Alexander Erhard
 */

// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.



  var Syllable = function (text, element, font) {
    this.init(text);
    this.setFont(font.family, font.size, font.weight);
    this.setMeiElement(element);
    this.setLineSpacing(font.spacing);
  };

  Syllable.CATEGORY = "annotations";

  // To enable logging for this class. Set `Vex.Flow.Syllable.DEBUG` to `true`.
  function L() {
    if (Syllable.DEBUG) Vex.L("Vex.Flow.Syllable", arguments);
  }

  // START ADDITION
  Syllable.DEFAULT_FONT_SIZE = 10;
  // END ADDITION

  // Text annotations can be positioned and justified relative to the note.
  Syllable.Justify = {
    LEFT : 1,
    CENTER : 2,
    RIGHT : 3,
    CENTER_STEM : 4
  };

  Syllable.VerticalJustify = {
    TOP : 1,
    BOTTOM : 3
  };

  // Arrange annotations within a `ModifierContext`
  Syllable.format = function (annotations, state) {
    if (!annotations || annotations.length === 0) return false;

    var text_line = state.text_line;
    var max_width = 0;

    // Format Syllables
    var width;
    for (var i = 0; i < annotations.length; ++i) {
      var annotation = annotations[i];
      annotation.setTextLine(text_line);
      width = annotation.getWidth() > max_width ? annotation.getWidth() : max_width;
      text_line++;
    }

    state.left_shift += width / 2;
    state.right_shift += width / 2;
    return true;
  };

  // ## Prototype Methods
  //
  // Syllables inherit from `Modifier` and are positioned correctly when
  // in a `ModifierContext`.
  var Modifier = VF.Modifier;

  Vex.Inherit(Syllable, Modifier, {
    // Create a new `Syllable` with the string `text`.
    init : function (text) {
      Syllable.superclass.init.call(this);

      this.note = null;
      this.index = null;
      this.text_line = 0;
      this.text = text;
      this.justification = Syllable.Justify.CENTER;
      // START MODIFICATION
      this.vert_justification = Syllable.VerticalJustify.BOTTOM;
      // END MODIFICATION
      this.font = {
        family : "Arial",
        // START MODIFICATION
        size : Syllable.DEFAULT_FONT_SIZE,
        // END MODIFICATION
        weight : ""
      };

      // START ADDITION
      // Line spacing, relative to font size
      this.line_spacing = 1.1;
      // END ADDITiON

      // The default width is calculated from the text.
      this.setWidth(VF.textWidth(text));
    },

    // START ADDITION
     setMeiElement : function (element) {
      this.meiElement = element;
      return this;
    },

    getMeiElement : function () {
      return this.meiElement;
    },

    setLineSpacing : function (spacing) {
      this.line_spacing = spacing;
      return this;
    },
    // END ADDITiON

    // Set the vertical position of the text relative to the stave.
    setTextLine : function (line) {
      this.text_line = line;
      return this;
    },

    // Set font family, size, and weight. E.g., `Arial`, `10pt`, `Bold`.
    setFont : function (family, size, weight) {
      this.font = { family : family, size : size, weight : weight };
      return this;
    },

    // Set vertical position of text (above or below stave). `just` must be
    // a value in `Syllable.VerticalJustify`.
    setVerticalJustification : function (just) {
      this.vert_justification = just;
      return this;
    },

    // Get and set horizontal justification. `justification` is a value in
    // `Syllable.Justify`.
    getJustification : function () {
      return this.justification;
    },
    setJustification : function (justification) {
      this.justification = justification;
      return this;
    },

    preProcess : function () {

      var PADDING = 5;

      var y;

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
      var font_scale = this.font.size / Syllable.DEFAULT_FONT_SIZE * this.line_spacing;
      // END ADDITION

      if (this.vert_justification == Syllable.VerticalJustify.BOTTOM) {
        y = stave.getYForBottomText(this.text_line);
        if (has_stem) {
          var stem_base = (this.note.getStemDirection() === 1 ? stem_ext.baseY + 2 * PADDING : stem_ext.topY + PADDING);

          // START MODIFICATION
          y = Math.max(y, stem_base + ( spacing * (this.text_line + 1) * font_scale + ( spacing * (this.text_line) ) ));
          // END MODIFICATION
        }

        // TODO refactor top text, too
      } else if (this.vert_justification == Syllable.VerticalJustify.TOP) {
        y = Math.min(stave.getYForTopText(this.text_line), this.note.getYs()[0] - 10);
        if (has_stem) {
          y = Math.min(y, (stem_ext.topY - 5) - (spacing * this.text_line));
        }
      }

      this.y = y;
      return y;
    },

    setY : function (y) {
      this.y = y;
    },

    // Render text beside the note.
    draw : function () {
      if (!this.context) throw new Vex.RERR("NoContext", "Can't draw text annotation without a context.");
      if (!this.note) throw new Vex.RERR("NoNoteForSyllable", "Can't draw text annotation without an attached note.");

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

      if (this.justification == Syllable.Justify.LEFT) {
        x = start.x;
      } else if (this.justification == Syllable.Justify.RIGHT) {
        x = start.x - text_width;
      } else if (this.justification == Syllable.Justify.CENTER) {
        x = start.x - text_width / 2;
      } else /* CENTER_STEM */ {
        x = this.note.getStemX() - text_width / 2;
      }

      // START ADDITION
      this.x = x;

      y = this.y;

      this.text_height = text_height;
      this.text_width = text_width;
      // END ADDITION

      L("Rendering annotation: ", this.text, x, y);
      this.context.fillText(this.text, x, y);
      this.context.restore();
    }
  });
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


  /**
   * Creates a new Stave object at the specified y coordinate. This
   * method sets fixed x coordinates, which will later be substituted in
   * {@link MEI2VF.System#format} - the Vex.Flow.Stave
   * objects must be initialized with some x measurements, but the real
   * values depend on values only available after modifiers, voices etc
   * have been added.
   *
   * @constructor
   * @param {Object} cfg
   */
  var Stave = function (cfg) {
    var me = this, leftBarline, rightBarline;

    me.init(0, cfg.y, 1000, {
      vertical_bar_width : 20, // 10 // Width around vertical bar end-marker
      top_text_position : 1.5, // 1 // in stave lines
      fill_style : me.lineColor
    });
    me.options.bottom_text_position = 6.5;

    me.setSystem(cfg.system);

    if (cfg.barlineInfo) {
      leftBarline = cfg.barlineInfo.leftBarline;
      rightBarline = cfg.barlineInfo.rightBarline;
    }

    if (leftBarline) {
      me.setBegBarType(me.barlines[leftBarline]);
      me.leftBarlineElement = cfg.barlineInfo.leftBarlineElement;
    } else {
      me.setBegBarType(me.barlines['invis']);
    }
    if (rightBarline) {
      me.setEndBarType(me.barlines[rightBarline]);
    }

  };

  Vex.Inherit(Stave, VF.Stave, {

    lineColor : '#999999',

    barlines : {
      'single' : VF.Barline.type.SINGLE,
      'dbl' : VF.Barline.type.DOUBLE,
      'end' : VF.Barline.type.END,
      'rptstart' : VF.Barline.type.REPEAT_BEGIN,
      'rptend' : VF.Barline.type.REPEAT_END,
      'rptboth' : VF.Barline.type.REPEAT_BOTH,
      'invis' : VF.Barline.type.NONE
    },

    addVoltaFromInfo : function (voltaInfo) {
      var begin = voltaInfo.hasOwnProperty('start');
      var end = voltaInfo.hasOwnProperty('end');
      if (begin) {
        this.setVoltaType((end) ? VF.Volta.type.BEGIN_END : VF.Volta.type.BEGIN, voltaInfo.start, 30);
      } else {
        this.setVoltaType((end) ? VF.Volta.type.END : VF.Volta.type.MID, "", 30);
      }
      // TODO [think through in which cases we actually need type.END]
      // 1) at the end of a composition
      // 2) if the current volta is followed by another volta (type.MID might be sufficient when
      // both volte are in the same system, but in cases where the first volta is at the end of
      // a system, it erroneously remains 'open'
    },

    // FIXME check if deviation of clef.shift between clef and end clef is OK
    addClefFromInfo : function (clef) {
      var me = this;
      me.addClef(clef.type, clef.size, clef.shift === -1 ? '8vb' : undefined);

      me.meiClefElement = clef.meiElement;
    },

    addEndClefFromInfo : function (clef) {
      var me = this;
      me.addEndClef(clef.type, 'small', clef.shift);

      me.meiEndClefElement = clef.meiElement;
    },

    addKeySpecFromInfo : function (keySpec, padding) {
      var me = this;
      me.addModifier(new VF.KeySignature(keySpec.key, padding));

      me.meiKeySpecElement = keySpec.meiElement;
    },

    addTimeSpecFromInfo : function (timeSpec, padding) {
      var me = this, symbol, count, unit, vexTimeSig;
      symbol = timeSpec.sym;
      if (symbol) {
        vexTimeSig = (symbol === 'cut') ? 'C|' : 'C';
      } else {
        count = timeSpec.count;
        unit = timeSpec.unit;
        vexTimeSig = (count && unit) ? count + '/' + unit : undefined;
      }
      me.addTimeSignature(vexTimeSig, padding);

      me.meiTimeSpecElement = timeSpec.meiElement;
    },

    hasTimeSig : function () {
      return typeof this.meiTimeSpecElement !== 'undefined';
    },

    setSystem : function (system) {
      this.system = system;
    },

    setSlurStartX : function (x) {
      this.slurStartX = x;
    },

    getSlurStartX : function () {
      return this.system.getSlurStartX();
    },

    setSlurEndX : function (x) {
      this.slurEndX = x;
    },

    getSlurEndX : function () {
      return this.system.getSlurEndX();
    }

  });
/*
 * StaveConnector.js Author: Zoltan Komives (zolaemil@gmail.com) Created:
 * 24.07.2013
 *
 * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
/*
 * Contributor: Alexander Erhard
 */


  /**
   * @class MEI2VF.Connectors
   * Handles stave connectors
   * @private
   *
   * @constructor
   * @param {Object} config the config object
   */
  var StaveConnectors = function (config) {
    var me = this;
    me.allVexConnectors = [];
    if (config) {
      me.init(config);
    }
  };

  StaveConnectors.prototype = {

    vexTypes : {
      'line' : VF.StaveConnector.type.SINGLE_LEFT,
      'brace' : VF.StaveConnector.type.BRACE,
      'bracket' : VF.StaveConnector.type.BRACKET,
      'none' : null,
      'singleright' : VF.StaveConnector.type.SINGLE_RIGHT
    },

    vexTypesBarlineRight : {
      'single' : VF.StaveConnector.type.SINGLE_RIGHT,
      'dbl' : VF.StaveConnector.type.THIN_DOUBLE,
      'end' : VF.StaveConnector.type.BOLD_DOUBLE_RIGHT,
      'rptend' : VF.StaveConnector.type.BOLD_DOUBLE_RIGHT,
      'invis' : null
    },

    vexTypesBarlineLeft : {
      'single' : VF.StaveConnector.type.SINGLE_LEFT,
      'dbl' : VF.StaveConnector.type.THIN_DOUBLE,
      'end' : VF.StaveConnector.type.BOLD_DOUBLE_LEFT,
      'rptstart' : VF.StaveConnector.type.BOLD_DOUBLE_LEFT,
      'invis' : null
    },

    init : function (config) {
      var me = this, vexType, topStave, bottomStave, vexConnector, label, labelMode, i, model, leftBarline, rightBarline;
      var models = config.models;
      var staves = config.staves;
      if (config.barlineInfo) {
        leftBarline = config.barlineInfo.leftBarline;
        rightBarline = config.barlineInfo.rightBarline;
      }
      var system_n = config.system_n;
      labelMode = config.labelMode;

      for (i in models) {
        model = models[i];

        vexType = (rightBarline) ? me.vexTypesBarlineRight[rightBarline] : me.vexTypes[model.symbol];
        topStave = staves[model.top_stave_n];
        bottomStave = staves[model.bottom_stave_n];

        if (typeof vexType === 'number' && topStave && bottomStave) {
          vexConnector = new VF.StaveConnector(topStave, bottomStave);
          vexConnector.setType(vexType);

          // TODO implement offset in VexFlow
          // offset nested connectors
          //if (model.ancestorSymbols) {
          //console.log(model.ancestorSymbols);
          //vexConnector.x_shift = -30;
          //}

          me.allVexConnectors.push(vexConnector);
          if (labelMode === 'full') {
            label = (system_n === 0) ? model.label : model.labelAbbr;
          } else if (labelMode === 'abbr') {
            label = model.labelAbbr;
          }
          if (label) {
            vexConnector.setText(label);
          }
        }

        if (leftBarline) {
          vexType = me.vexTypesBarlineLeft[leftBarline];
          if (typeof vexType === 'number' && topStave && bottomStave) {
            vexConnector = new VF.StaveConnector(topStave, bottomStave);
            vexConnector.setType(vexType);
            if (vexType === VF.StaveConnector.type.BOLD_DOUBLE_LEFT) {
              vexConnector.checkShift = true;
            }
            me.allVexConnectors.push(vexConnector);
          }
        }

      }
    },

    getAll : function () {
      return this.allVexConnectors;
    },

    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    draw : function () {
      var me = this, i, j, conn, shift;
      for (i = 0, j = me.allVexConnectors.length; i < j; i += 1) {
        conn = me.allVexConnectors[i];
        if (conn.checkShift) {
          shift = conn.top_stave.getModifierXShift();
          if (shift > 0) {
            conn.setXShift(shift);
          }
        }
        conn.setContext(me.ctx).draw();
      }
    }
  };
/*
 * MEItoVexFlow, Measure class
 *
 * Author: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class Measure
   * @private
   *
   * @constructor
   * @param {Object} config The configuration object
   */
  var Measure = function (config) {
    this.init(config);
  };

  Measure.prototype = {

    /**
     * initializes the current MEI2VF.Measure object
     * @param {Object} config The configuration object
     */
    init : function (config) {
      var me = this;
      /**
       * @cfg {MEI2VF.System} system the parent system
       */
      me.system = config.system;
      /**
       * @cfg {Element} element the MEI element of the current measure
       */
      me.element = config.element;
      /**
       * @cfg {String} n The value of the measure's n attribute
       */
      me.n = config.element.getAttribute('n');
      /**
       * @cfg {Array} staves an array of the staves in the current
       * measure. Contains
       */
      me.staves = config.staves;
      /**
       * @cfg {MEI2VF.StaveVoices} voices The voices of all staves in the
       * current measure
       */
      me.voices = config.voices;
      /**
       * @cfg {MEI2VF.Connectors} startConnectors an instance of
       * MEI2VF.Connectors handling all left connectors (only the first measure
       * in a system has data)
       */
      me.startConnectors = new StaveConnectors(config.startConnectorCfg);
      /**
       * @cfg {MEI2VF.Connectors} inlineConnectors an instance of
       * MEI2VF.Connectors handling all right connectors
       */
      me.inlineConnectors = new StaveConnectors(config.inlineConnectorCfg);

      me.tieElements = config.tieElements;
      me.slurElements = config.slurElements;
      me.hairpinElements = config.hairpinElements;
      /**
       * @cfg {Element[]} tempoElements the MEI tempo elements in the
       * current measure
       */
      me.tempoElements = config.tempoElements;
      /**
       * @cfg {Object} tempoFont the font used for rendering tempo
       * specifications
       */
      me.tempoFont = config.tempoFont;
      /**
       * @cfg {Element[]} rehElements the MEI rehearsal mark elements in the
       * current measure
       */
      me.rehElements = config.rehElements;
      /**
       * @property {Number} meiW the width attribute of the measure element or
       * null if NaN
       */
      me.meiW = (config.readMeasureWidths) ? me.setMeiWidth(me.element) : null;
    },

    getSystem : function () {
      return this.system;
    },

    /**
     *  reads the width attribute of the specified element and converts it to a
     * number
     * @param {Element} element the element to process
     * @return {Number} the number of the attribute or null if NaN
     */
    setMeiWidth : function (element) {
      return +element.getAttribute('width') || null;
    },

    /**
     * gets the staves array of the current measure
     * @return {Array}
     */
    getStaves : function () {
      return this.staves;
    },

    /**
     * gets the voices object of the current measure
     * @return {MEI2VF.StaveVoices}
     */
    getVoices : function () {
      return this.voices;
    },

    getMeiElement : function () {
      return this.element;
    },

    /**
     * gets the x coordinate of the staff
     * @return {Number}
     */
    getX : function () {
      return this.getFirstDefinedStave().x;
    },

    /**
     * gets the number of the current staff as specified in the MEI code
     * @return {Number}
     */
    getNAttr : function () {
      return this.n;
    },

    /**
     * gets the first defined staff in the current measure
     * @return {Vex.Flow.Stave}
     */
    getFirstDefinedStave : function () {
      var me = this, i, j;
      for (i = 0, j = me.staves.length; i < j; i += 1) {
        if (me.staves[i]) {
          return me.staves[i];
        }
      }
      throw new RuntimeError('No staff found in the current measure.');
    },

    /**
     * Adds rehearsal marks encoded in reh elements in the current measure to
     * the corresponding Vex.Flow.Stave object
     */
    addRehearsalMarks : function () {
      var me = this, stave_n, vexStave, offsetX, i, j, rehElement;
      for (i = 0, j = me.rehElements.length; i < j; i++) {
        rehElement = me.rehElements[i];
        stave_n = rehElement.getAttribute('staff');
        vexStave = me.staves[stave_n];
        offsetX = (vexStave.getModifierXShift() > 0) ? -40 : 0;
        vexStave.modifiers.push(new VF.StaveSection(Util.getText(rehElement), vexStave.x + offsetX, 0));
      }
    },

    // TODO handle timestamps! (is it necessary to handle tempo element
    // as annotations?)
    // TODO make magic numbers constants
    // TODO move from here
    /**
     * Writes the data of the tempo elements in the current measure to the
     * corresponding Vex.Flow.Stave object
     */
    addTempoToStaves : function () {
      var me = this, offsetX, vexStave, vexTempo, atts, halfLineDistance, i, j, tempoElement;
      for (i = 0, j = me.tempoElements.length; i < j; i++) {
        tempoElement = me.tempoElements[i];

        atts = Util.attsToObj(tempoElement);
        vexStave = me.staves[atts.staff];
        halfLineDistance = vexStave.getSpacingBetweenLines() / 2;
        vexTempo = new VF.StaveTempo({
          name : Util.getText(tempoElement), duration : atts['mm.unit'], dots : +atts['mm.dots'], bpm : +atts.mm
        }, vexStave.x, 5);
        if (atts.vo) {
          vexTempo.setShiftY(+atts.vo * halfLineDistance);
        }
        offsetX = (vexStave.getModifierXShift() > 0) ? -14 : 14;

        // if a staff has a time signature, set the tempo on top of the time
        // signature instead of the first note
        if (vexStave.hasTimeSig()) {
          offsetX -= 24;
        }
        if (atts.ho) {
          offsetX += +atts.ho * halfLineDistance;
        }
        vexTempo.setShiftX(offsetX);
        vexTempo.font = me.tempoFont;
        vexStave.modifiers.push(vexTempo);
      }
    },

    /**
     * calculates the minimum width of the current measure
     */
    calculateMinWidth : function () {
      var me = this, i, staves, stave, repeatPadding, maxNoteStartX = 0, maxEndModifierW = 0;

      staves = me.staves;
      i = staves.length;
      while (i--) {
        stave = staves[i];
        if (stave) {
          // max start modifier width
          maxNoteStartX = Math.max(maxNoteStartX, stave.getNoteStartX());
          // max end modifier width
          maxEndModifierW = Math.max(maxEndModifierW, stave.getGlyphEndX() - stave.end_x);
        }
      }

      /**
       * @property {Number} maxNoteStartX the maximum note_start_x value of all
       * Vex.Flow.Stave objects in the current measure
       */
      me.maxNoteStartX = maxNoteStartX;
      /**
       * @property {Number} maxEndModifierW the maximum width of the end
       * modifiers in all Vex.Flow.Stave objects in the current measure
       */
      me.maxEndModifierW = maxEndModifierW;

      // calculate additional padding (20px) if the staff does have a left REPEAT_BEGIN barline
      // located to the right of other staff modifiers; 0px in all other cases.
      stave = me.getFirstDefinedStave();
      repeatPadding =
      (stave.modifiers[0].barline == VF.Barline.type.REPEAT_BEGIN && stave.modifiers.length > 2) ? 20 : 0;

      /**
       * @property {Number} minVoicesW the minimum width of the voices in the
       * measure
       */
      me.minVoicesW = me.voices.preFormat();

      me.voiceFillFactor = me.voices.getFillFactor();

      /**
       * @property {Number} minWidth the minimum width of the measure
       */
      me.minWidth = maxNoteStartX + maxEndModifierW + repeatPadding + me.minVoicesW;
    },

    getVoiceFillFactor : function () {
      return this.voiceFillFactor;
    },

    /**
     * gets the final width of the current measure
     */
    getW : function () {
      return this.w;
    },

    /**
     * gets the minimum width of the current measure
     */
    getMinWidth : function () {
      return this.minWidth;
    },

    setFinalWidth : function (additionalWidth) {
      var me = this;
      me.w = (me.meiW === null) ? me.minWidth + (additionalWidth * me.voiceFillFactor) : me.meiW;
    },

    /**
     * Formats the staves in the current measure: sets x coordinates and adds
     * staff labels
     * @param {Number} x The x coordinate of the the measure
     * @param {String[]} labels The labels of all staves
     */
    format : function (x, labels) {
      var me = this, width = me.w, i = me.staves.length, stave, k;
      while (i--) {
        if (me.staves[i]) {
          stave = me.staves[i];
          if (labels && typeof labels[i] === 'string') {
            stave.setText(labels[i], VF.Modifier.Position.LEFT, {
              shift_y : -3
            });
          }

          if (typeof stave.setX == "function") {
            stave.setX(x);
          } else {
            /* Fallback if VexFlow doesn't have setter */
            //TODO: remove when setX() is merged to standard VexFlow
            stave.x = x;
            stave.glyph_start_x = x + 5;
            stave.bounds.x = x;
            for (k = 0; k < stave.modifiers.length; k++) {
              stave.modifiers[k].x = x;
            }
          }

          stave.start_x = stave.x + me.maxNoteStartX;
          stave.setWidth(width);
          stave.end_x -= me.maxEndModifierW;

        }
      }
      me.voices.format(me.getFirstDefinedStave());
    },

    /**
     * Draws the staves, voices and connectors in the current measure to a
     * canvas
     * @param {Object} ctx the canvas context
     */
    draw : function (ctx) {
      var me = this, i, staves, staff;
      staves = me.staves;
      i = staves.length;
      while (i--) {
        staff = staves[i];
        if (staff) {
          staff.setContext(ctx).draw();
        }
      }
      me.voices.draw(ctx, staves);
      me.startConnectors.setContext(ctx).draw();
      me.inlineConnectors.setContext(ctx).draw();
    }
  };
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



  var Page = function () {
    this.init();
  };

  Page.prototype = {

    STAVE_HEIGHT : 40,

    init : function () {
      var me = this;
      /**
       * Contains all {@link System} objects
       * @property {System[]} systems
       */
      me.systems = [];
    },

    formatSystems : function (pageInfo, systemInfo, cfg, ctx) {
      var me = this, i, j, totalMinSystemWidth = 0, minSystemWidth, broadestSystemN = 1;
      var systems = me.systems;
      j = systems.length;

      // calculate page width if me.cfg.pageWidth is falsy
      if (!cfg.pageWidth) {
        for (i = 0; i < j; i++) {
          minSystemWidth = systems[i].preFormat(ctx);
          if (totalMinSystemWidth < minSystemWidth) {
            broadestSystemN = i;
            totalMinSystemWidth = minSystemWidth;
          }
        }

        // calculate the width of all systems based on the final width of the system with the
        // largest minSystemWidth and the default space to be added to each measure
        var totalSystemWidth = totalMinSystemWidth +
                               (systems[broadestSystemN].voiceFillFactorSum * cfg.defaultSpacingInMeasure);
        pageInfo.setPrintSpaceWidth(totalSystemWidth);

        for (i = 0; i < j; i++) {
          systems[i].setFinalMeasureWidths(totalSystemWidth);
          systems[i].format(ctx);
        }

      } else {
        // ... if me.cfg.pageWidth is specified, format the measures based on that width
        for (i = 0; i < j; i++) {
          minSystemWidth = systems[i].preFormat(ctx);
          systems[i].setFinalMeasureWidths();
          systems[i].format(ctx);
        }
      }

      pageInfo.setLowestY(systemInfo.getCurrentLowestY() + me.STAVE_HEIGHT);

    },

    addSystem : function (system, n) {
      this.systems[n] = system;
    },

    getSystems : function () {
      return this.systems;
    },

    setContext : function(ctx) {
      this.ctx = ctx;
      return this;
    },

    drawSystems : function () {
      var me = this, i, j, systems = me.systems, ctx = me.ctx;
      j = systems.length;
      for (i = 0; i < j; i++) {
        systems[i].draw(ctx);
      }
    }


  };
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



  var PageInfo = function (config) {

    var me = this;

    me.pageTopMar = config.pageTopMar;
    me.pageLeftMar = config.pageLeftMar;
    me.pageRightMar = config.pageRightMar;
    me.pageBottomMar = config.pageBottomMar;

    /**
     * The print space coordinates calculated from the page config.
     * @property {Object} printSpace
     * @property {Number} printSpace.top
     * @property {Number} printSpace.left
     * @property {Number} printSpace.right
     * @property {Number} printSpace.width
     */
    me.printSpace = {
      // substract four line distances (40px) from pageTopMar in order
      // to compensate VexFlow's default top spacing / allow specifying
      // absolute values
      top : config.pageTopMar - 40,
      left : config.pageLeftMar,
      // not in use:
      //right : config.pageWidth - config.pageRightMar,
      width : (config.pageWidth === null) ? null : Math.floor(config.pageWidth - config.pageRightMar - config.pageLeftMar) - 1
    };

  };


  PageInfo.prototype = {

    getPrintSpace : function () {
      return this.printSpace;
    },

    setPrintSpaceWidth : function (width) {
      var me = this;
      me.printSpace.width = width;
      me.widthCalculated = true;
    },

    hasCalculatedWidth : function () {
      return !!this.widthCalculated;
    },

    getCalculatedWidth : function () {
      var me = this;
      return me.printSpace.width + me.pageLeftMar + me.pageRightMar;
    },

    setLowestY : function (lowestY) {
      this.lowestY = lowestY;
    },

    getLowestY : function () {
      return this.lowestY;
    },

    getCalculatedHeight : function () {
      return this.lowestY + this.pageBottomMar;
    }

  };
/*
 * MEItoVexFlow, Verses class
 *
 * Author: Zoltan Komives
 * Contributor: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class MEI2VF.Verses
   * @private
   *
   * @constructor
   * @param {Object} config
   */
  var Verses = function (config) {
    var me = this;
    me.systemVerses = {};
    me.lowestYs = {};
    me.font = config.font;
    me.maxHyphenDistance = config.maxHyphenDistance;
  };

  Verses.prototype = {

    /**
     * @public
     * @param annot
     * @param element
     * @param stave_n
     * @returns {Verses}
     */
    addSyllable : function (annot, element, stave_n) {
      var me = this, verse_n;

      var wordpos = element.getAttribute('wordpos');

      var parentNode = element.parentNode;
      if (parentNode.localName === 'verse' && parentNode.hasAttribute('n')) {
        verse_n = parentNode.getAttribute('n');
      } else {
        verse_n = '1';
      }

      if (!me.systemVerses[stave_n]) {
        me.systemVerses[stave_n] = {};
      }

      if (!me.systemVerses[stave_n][verse_n]) {
        me.systemVerses[stave_n][verse_n] = {
          syllables: [],
          hyphenation : me.newHyphenation()
        };
      }

      me.systemVerses[stave_n][verse_n].syllables.push(annot);

      if (wordpos) {
        me.systemVerses[stave_n][verse_n].hyphenation.addSyllable(annot, wordpos);
      }
      return me;
    },

    /**
     * @public
     */
    getLowestYs : function () {
      return this.lowestYs;
    },

    /**
     * @public
     */
    getLowestY : function (stave_n) {
      return this.lowestYs[stave_n];
    },

    /**
     * @private
     */
    newHyphenation : function () {
      return new Hyphenation(this.font, this.maxHyphenDistance);
    },

    /**
     * @public
     * @returns {Verses}
     */
    format : function () {
      var me = this, stave_n, verse_n, text_line, verse, i, j, lowestY, padding, lowestTextLine;
      var notesInContext;

      padding = 20;

      me.font.size=15;

      var spacing_between_lines = 10;
      var height_in_lines = me.font.size / spacing_between_lines * 1.5;

      for (stave_n in me.systemVerses) {
        text_line = 0;
        lowestTextLine = 0;
        lowestY = -20;

        for (verse_n in me.systemVerses[stave_n]) {
          verse = me.systemVerses[stave_n][verse_n].syllables;
          lowestY += padding;
          // first pass: get lowest y
          for (i = 0, j = verse.length; i < j; i++) {
            verse[i].setTextLine(text_line);

            notesInContext = verse[i].getModifierContext().modifiers.stavenotes;

            if (notesInContext.length > 1) {
              verse[i].setNote(notesInContext[0]);
            }

            // TODO compare lowest Ys


            lowestY = Math.max(lowestY, verse[i].preProcess());

//            lowestTextLine = Math.max(lowestTextLine, verse[i].text_line);
          }
          // second pass: set lowest y
          for (i = 0; i < j; i++) {
            verse[i].setY(lowestY);
//            verse[i].setTextLine(lowestTextLine);
          }
          lowestTextLine += height_in_lines;
        }
        me.lowestYs[stave_n] = lowestY;

      }
      return me;
    },

    /**
     * @public
     * @param ctx
     * @param leftX
     * @param rightX
     * @returns {Verses}
     */
    drawHyphens : function (ctx, leftX, rightX) {
      var me = this, stave_n, verse_n;
      for (stave_n in me.systemVerses) {
        for (verse_n in me.systemVerses[stave_n]) {
          me.systemVerses[stave_n][verse_n].hyphenation.setContext(ctx).draw(leftX, rightX);
        }
      }
      return me;
    }

  };
/*
 * MEItoVexFlow, System class
 *
 * Author: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * A single instance of a staff system, containing and processing information
   * about the measures contained
   * @class System
   * @private
   *
   * @param pageInfo
   * @param systemInfo
   * @param system_n
   * @constructor
   */
  var System = function (pageInfo, systemInfo, system_n) {
    this.init(pageInfo, systemInfo, system_n);
  };

  System.prototype = {

    /**
     * @property {Number} LABEL_PADDING the padding (in pixels) between the voice
     * labels and the staves
     */
    LABEL_PADDING : 20,

    /**
     *
     * @param pageInfo
     * @param systemInfo
     * @param system_n
     */
    init : function (pageInfo, systemInfo, system_n) {
      var me = this;

      /**
       * @cfg {Number|null} leftMar the left system margin as specified in the
       * MEI file or null if there is no margin specified. In the latter case,
       * the margin will be calculated on basis of the text width of the labels
       */
      me.leftMar = systemInfo.getLeftMar();
      /**
       * @cfg {Object} coords the coords of the current system
       * @cfg {Number} coords.x the x coordinate of the system
       * @cfg {Number} coords.y the y coordinate of the system
       * @cfg {Number} coords.width the system width
       */
      var printSpace = pageInfo.getPrintSpace();
      me.coords = {
        x : printSpace.left,
        y : (system_n === 0) ? printSpace.top : systemInfo.getCurrentLowestY() + systemInfo.cfg.systemSpacing,
        width : printSpace.width
      };
      /**
       * @cfg {Number[]} staveYs the y coordinates of all staves in the current
       * system
       */
      me.staveYs = systemInfo.getYs(me.coords.y);
      /**
       * an instance of MEI2VF.Verses dealing with and storing all verse lines
       * found in the MEI document
       * @property {MEI2VF.Verses} verses
       */
      me.verses = new Verses(systemInfo.getVerseConfig());
      /**
       * @cfg {String[]} labels the labels of all staves in the current system
       */
      me.labels = systemInfo.getStaveLabels(system_n);
      /**
       * @property {MEI2VF.Measure[]} measures the measures in the current
       * system
       */
      me.measures = [];
      me.systemVoiceYBounds = [];
    },

    /**
     * @return {Number[]} the value of {@link #staveYs}
     */
    getStaveYs : function () {
      return this.staveYs;
    },

    /**
     * adds a measure to the end of the measure array
     * @param {MEI2VF.Measure} measure the measure to add
     */
    addMeasure : function (measure) {
      this.measures.push(measure);
    },

    /**
     * gets a measure in the current system at the specified index
     * @param {Number} i the measure index (the first measure in the current
     * system has the index 0)
     * @return {MEI2VF.Measure}
     */
    getMeasure : function (i) {
      return this.measures[i];
    },

    /**
     * gets all measures in the current system
     * @return {MEI2VF.Measure[]}
     */
    getMeasures : function () {
      return this.measures;
    },

    getLastMeasure : function () {
      return this.measures[this.measures.length - 1];
    },

    /**
     * Calculates the system indent based on the width of the stave and
     * stave-connector labels
     * @param {Object} ctx the canvas context
     */
    calculateLeftMar : function (ctx) {
      var me = this, label, max = 0, w, connectors, i, text;
      ctx.setFont('Times', 16);
      for (label in me.labels) {
        text = me.labels[label];
        if (typeof text === 'string') {
          w = ctx.measureText(me.labels[label]).width;
          if (max < w) {
            max = w;
          }
        }
      }
      connectors = me.getMeasures()[0].startConnectors.getAll();
      i = connectors.length;
      while (i--) {
        text = connectors[i].text;
        if (typeof text === 'string') {
          w = ctx.measureText(me.labels[label]).width;
          if (max < w) {
            max = w;
          }
        }
      }
      me.leftMar = (max === 0) ? 0 : max + me.LABEL_PADDING;
    },

    /**
     * Calculates the minimum width of each measure in the current system
     */
    calculateMinMeasureWidths : function () {
      var measures = this.measures, i = measures.length;
      while (i--) {
        measures[i].calculateMinWidth();
      }
    },

    /**
     * calculates the minimum width of all measures in a stave
     */
    calculateMinSystemWidth : function () {
      var me = this, i, j, totalSpecifiedMeasureWidth = 0, voiceFillFactorSum = 0;
      for (i = 0, j = me.measures.length; i < j; i += 1) {
        if (me.measures[i].meiW === null) {
          totalSpecifiedMeasureWidth += me.measures[i].getMinWidth();
          voiceFillFactorSum += me.measures[i].getVoiceFillFactor();
        } else {
          totalSpecifiedMeasureWidth += me.measures[i].meiW;
        }
      }
      me.minSystemWidth = totalSpecifiedMeasureWidth;
      me.voiceFillFactorSum = voiceFillFactorSum;
    },

    /**
     * sets the final width of all measures in a stave
     */
    setFinalMeasureWidths : function (overrideWidth) {
      var me = this, i, j, singleAdditionalWidth;

      var totalWidth = overrideWidth || me.coords.width;

      singleAdditionalWidth = Math.floor((totalWidth - me.leftMar - me.minSystemWidth) / me.voiceFillFactorSum);

      for (i = 0, j = me.measures.length; i < j; i += 1) {
        me.measures[i].setFinalWidth(singleAdditionalWidth);
      }
    },

    preFormat : function (ctx) {
      var me = this;
      if (typeof me.leftMar !== 'number') {
        me.calculateLeftMar(ctx);
      }
      me.calculateMinMeasureWidths();
      me.calculateMinSystemWidth();
      return me.minSystemWidth + me.leftMar;
    },

    /**
     * formats the measures in the current system
     * @return {System} this
     */
    format : function () {
      var me = this, i, j, measures, offsetX, labels;
      offsetX = me.coords.x + me.leftMar;
      measures = me.getMeasures();
      j = measures.length;
      for (i = 0; i < j; i += 1) {
        if (measures[i]) {
          labels = (i === 0) ? me.labels : null;
          measures[i].format(offsetX, labels);
          //me.updateSystemVoiceYBounds(measures[i].getVoices().getYBounds());

          offsetX += measures[i].getW();
        }
        measures[i].addRehearsalMarks();
        measures[i].addTempoToStaves();
      }

      if (j > 0) {
        me.slurStartX = measures[0].getFirstDefinedStave().getTieStartX();
        me.slurEndX = me.getLastMeasure().getFirstDefinedStave().getTieEndX();
      }

      me.verses.format();
      return me;
    },

    updateSystemVoiceYBounds : function(bounds) {
      var me = this;
      me.systemVoiceYBounds.push(bounds);
      console.log(me.systemVoiceYBounds);
    },


    getSlurStartX : function () {
      return this.slurStartX;
    },

    getSlurEndX : function () {
      return this.slurEndX;
    },

    /**
     * draws the current system to a canvas
     * @param {Object} ctx the canvas context
     */
    draw : function (ctx) {
      var me = this, i = me.measures.length;
      while (i--) {
        if (me.measures[i]) {
          me.measures[i].draw(ctx);
        }
      }
      me.verses.drawHyphens(ctx, me.slurStartX, me.slurEndX);
    }
  };
/*
 * StaveInfo.js Author: Zoltan Komives (zolaemil@gmail.com) Created: 03.07.2013
 *
 * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
/*
 * Contributors and additions: Alexander Erhard, @davethehat
 */



  /**
   * @class MEI2VF.StaveInfo
   * Contains the definition and the rendering information (i.e. what
   * clef modifiers are to be rendered) of a single staff
   * @private
   *
   * @constructor
   * @param staffDef
   * @param scoreDef
   * @param w_clef
   * @param w_keysig
   * @param w_timesig
   */
  var StaveInfo = function (staffDef, scoreDef, w_clef, w_keysig, w_timesig) {
    var me = this;
    /**
     * @private
     */
    me.renderWith = {
      clef : w_clef,
      keysig : w_keysig,
      timesig : w_timesig
    };
    /**
     * the currently valid keySpec
     * @private
     */
    me.keySpec = {key : 'C', meiElement : staffDef}; // default key
    /**
     * the currently valid timeSpec
     * @private
     */
    me.timeSpec = {};
    /**
     * the currently valid staff labels
     * @private
     */
    me.labels = null;
    /**
     * the currently valid stave spacing
     * @private
     */
    me.spacing = null;
    /**
     * the currently valid clef
     * @private
     */
    me.clef = {};
    /**
     * a copy of the start clef of a measure-stave; used when there are clef changes in multi-voice staves
     */
    me.startClefCopy = null;

    me.updateDef(staffDef, scoreDef, true);
  };

  StaveInfo.prototype = {

    /**
     * @private
     */
    clefTypeMap : {
      G : 'treble',
      G1 : 'french',
      G2 : 'treble',
      F3 : 'baritone-f',
      F4 : 'bass',
      F5 : 'subbass',
      C1 : 'soprano',
      C2 : 'mezzo-soprano',
      C3 : 'alto',
      C4 : 'tenor',
      C5 : 'baritone-c',
      perc : 'percussion'
    },

    getCurrentScoreDef : function () {
      return this.currentScoreDef;
    },

    /**
     * @public
     * @param staffDef
     * @param scoreDef
     * @param skipRenderWith
     */
    updateDef : function (staffDef, scoreDef, skipRenderWith) {
      var me = this, clefDefiningElement, timeSigDefiningElement, keySigDefiningElement;

      me.currentScoreDef = scoreDef;

      var getDefiningElement = function (element1, element2, att) {
        if (element1 && element1.hasAttribute(att)) {
          return element1;
        }
        if (element2 && element2.hasAttribute(att)) {
          return element2;
        }
      };

      clefDefiningElement = getDefiningElement(staffDef, scoreDef, 'clef.shape');
      keySigDefiningElement = getDefiningElement(staffDef, scoreDef, 'key.pname');
      timeSigDefiningElement = getDefiningElement(staffDef, scoreDef, 'meter.count');

      if (!skipRenderWith) {
        me.updateRenderWith(clefDefiningElement, keySigDefiningElement, timeSigDefiningElement);
      }

      if (clefDefiningElement) me.updateClef(clefDefiningElement);
      if (keySigDefiningElement) me.updateKeySpec(keySigDefiningElement);
      if (timeSigDefiningElement) me.updateTimeSpec(timeSigDefiningElement);

      // TODO currently, labels and spacing are only read from <staffDef>
      if (staffDef) {
        me.updateLabels(staffDef);
        me.updateSpacing(staffDef);
      }

    },

    /**
     * updated the definition from a <scoreDef> only if the <scoreDef> hasn't been processed yet with a <staffDef>
     * @param scoreDef
     */
    updateIfNew : function (scoreDef) {
      var me = this;
      if (scoreDef !== me.currentScoreDef) {
        me.updateDef(null, scoreDef);
      }
    },

    /**
     * @private
     * @param clefDefiningElement
     * @param keySigDefiningElement
     * @param timeSigDefiningElement
     */
    updateRenderWith : function (clefDefiningElement, keySigDefiningElement, timeSigDefiningElement) {
      var me = this, result, hasEqualAtt;

      result = {
        clef : false,
        keysig : false,
        timesig : false
      };

      hasEqualAtt = function (currentElement, newElement, attr_name) {
        return currentElement.getAttribute(attr_name) === newElement.getAttribute(attr_name);
      };

      var hasEqualClefAtt = function (currentElement, newElement, currentPrefix, newPrefix, attr_name) {
        return currentElement.getAttribute(currentPrefix + attr_name) === newElement.getAttribute(newPrefix + attr_name);
      };

      var currentClefElement = me.clef.meiElement;
      var currentKeySigElement = me.keySpec.meiElement;
      var currentTimeSigElement = me.timeSpec.meiElement;

      if (clefDefiningElement) {
        var currentPrefix = (currentClefElement.localName === 'clef') ? '' : 'clef.';
        var newPrefix = (clefDefiningElement.localName === 'clef') ? '' : 'clef.';
        if (!hasEqualClefAtt(currentClefElement, clefDefiningElement, currentPrefix, newPrefix, 'shape') ||
            !hasEqualClefAtt(currentClefElement, clefDefiningElement, currentPrefix, newPrefix, 'line')) {
          result.clef = true;
        }
      }

      if (keySigDefiningElement && (!hasEqualAtt(currentKeySigElement, keySigDefiningElement, 'key.pname') ||
                                    !hasEqualAtt(currentKeySigElement, keySigDefiningElement, 'key.accid') ||
                                    !hasEqualAtt(currentKeySigElement, keySigDefiningElement, 'key.mode'))) {
        result.keysig = true;
      }
      if (timeSigDefiningElement && (!hasEqualAtt(currentTimeSigElement, timeSigDefiningElement, 'meter.count') ||
                                     !hasEqualAtt(currentTimeSigElement, timeSigDefiningElement, 'meter.unit') ||
                                     !hasEqualAtt(currentTimeSigElement, timeSigDefiningElement, 'meter.sym'))) {
        result.timesig = true;
      }

      me.renderWith = result;
    },

    /**
     * @private
     */
    updateLabels : function (staffDef) {
      var me = this, label, labelAbbr;
      label = staffDef.getAttribute('label');
      if (typeof label === 'string') {
        me.label = label;
      }
      labelAbbr = staffDef.getAttribute('label.abbr');
      if (typeof labelAbbr === 'string') {
        me.labelAbbr = labelAbbr;
      }
    },

    /**
     * @private
     */
    updateSpacing : function (staffDef) {
      var me = this, spacing;
      spacing = staffDef.getAttribute('spacing');
      if (spacing !== null && !isNaN(spacing)) {
        me.spacing = +spacing;
      }
      return me.spacing;
    },

    /**
     * @private
     * @param element
     * @returns {*}
     */
    updateClef : function (element) {
      var me = this, clefShape, clefDis, clefDisPlace, clefType, prefix;

      // prefix for clef attribute names
      prefix = (element.localName === 'clef') ? '' : 'clef.';

      clefShape = element.getAttribute(prefix + 'shape');
      if (!clefShape) {
        Logger.warn('@clef.shape expected', 'No clef shape attribute found in ' + Util.serializeElement(element) +
                                            '. Setting default clef.shape "G".');
        clefShape = 'G';
      }
      clefType = clefShape + (element.getAttribute(prefix + 'line') || '');
      clefDis = element.getAttribute(prefix + 'dis');
      clefDisPlace = element.getAttribute(prefix + 'dis.place');

      var type = me.clefTypeMap[clefType];
      if (type) {
        if (clefDis === '8' && clefDisPlace === 'below') {
          me.clef = {
            type : type,
            shift : -1,
            meiElement : element
          };
        } else {
          me.clef = {
            type : type,
            meiElement : element
          };
        }
      } else {
        me.clef = {
          type : 'treble',
          meiElement : null
        };
        Logger.warn('Not supported', 'Clef definition in ' + Util.serializeElement(element) +
                                     ' is not supported. Setting default treble clef.');
      }
    },

    /**
     * @private
     */
    updateTimeSpec : function (element) {
      var me = this;
      me.timeSpec = {
        count : +element.getAttribute('meter.count'),
        unit : +element.getAttribute('meter.unit'),
        sym : element.getAttribute('meter.sym'),
        meiElement : element
      };
    },

    /**
     * @private
     */
    updateKeySpec : function (element) {
      var me = this;
      me.keySpec = {
        key : me.convertKeySpec(element),
        meiElement : element
      };
    },

    /**
     * @private
     * @param element
     * @returns {*}
     */
    convertKeySpec : function (element) {
      var keyname, key_accid, key_mode;
      keyname = element.getAttribute('key.pname').toUpperCase();
      key_accid = element.getAttribute('key.accid');
      if (key_accid !== null) {
        switch (key_accid) {
          case 's' :
            keyname += '#';
            break;
          case 'f' :
            keyname += 'b';
            break;
          default :
            Logger.warn('Not supported', 'expected to find value "s" or "f" instead of "' + key_accid +
                                         '" in @key.accid of ' + Util.serializeElement(element) +
                                         '. Ignoring processing of this attribute.');
        }
      }
      key_mode = element.getAttribute('key.mode');
      if (key_mode !== null) {
        keyname += (key_mode === 'major') ? '' : 'm';
      }
      return keyname;
    },


    /**
     * @public
     * @param clefElement
     */
    clefChangeInMeasure : function (clefElement) {
      var me = this;
      if (!me.startClefCopy) {
        me.startClefCopy = {
          type : me.clef.type,
          size : me.clef.size,
          shift : me.clef.shift
        };
      }
      me.updateClef(clefElement);
      return me.clef;
    },

    /**
     * called at the beginning of each layer. Sets the clef to the initial clef of the stave and saves
     * any existing clef to this.changedClef
     * @public
     */
    checkInitialClef : function () {
      var me = this;
      if (me.startClefCopy) {
        me.changedClef = me.clef;
        me.clef = me.startClefCopy;
      }
    },

    /**
     * called after the last layer. Removes this.startClefCopy and sets the current clef to the last
     * clef change
     * @public
     */
    finalizeClefInfo : function () {
      var me = this;
      if (me.changedClef) {
        me.clef = me.changedClef;
        me.changedClef = null;
      }
      me.startClefCopy = null;
    },

    /**
     * @public
     */
    forceSectionStartInfo : function () {
      this.renderWith = {
        clef: true,
        keysig:true,
        timesig: true
      }
    },

    /**
     * @public
     */
    forceStaveStartInfo : function () {
      var me = this;
      me.renderWith.clef = true;
      me.renderWith.keysig = true;
    },

    /**
     * @public
     */
    showClefCheck : function () {
      var me = this;
      if (me.renderWith.clef && me.clef.meiElement && me.clef.meiElement.getAttribute('clef.visible') !== 'false') {
        me.renderWith.clef = false;
        return true;
      }
    },

    /**
     * @public
     */
    showKeysigCheck : function () {
      var me = this;
      if (me.renderWith.keysig && me.keySpec.meiElement && me.keySpec.meiElement.getAttribute('key.sig.show') !== 'false') {
        me.renderWith.keysig = false;
        return true;
      }
    },

    /**
     * @public
     */
    showTimesigCheck : function () {
      var me = this;
      if (me.renderWith.timesig) {
        me.renderWith.timesig = false;
        if (me.timeSpec.meiElement && me.timeSpec.meiElement.getAttribute('meter.rend') !== 'invis') {
          return true;
        }
      }
    },

    /**
     * @public
     */
    getClef : function () {
      return this.clef;
    },

    /**
     * @public
     */
    getKeySpec : function () {
      return this.keySpec;
    },

    /**
     * @public
     */
    getTimeSpec : function () {
      return this.timeSpec;
    }

  };
/*
 * MEItoVexFlow, SystemInfo class
 *
 * Author: Alexander Erhard
 * (process... methods based on meitovexflow.js)
 * Contributor: @davethehat
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * @class MEI2VF.SystemInfo
   * Deals with MEI data provided by scoreDef, staffDef and staffGrp elements and its children
   * @private
   *
   * @constructor

   */
  var SystemInfo = function () {
  };

  SystemInfo.prototype = {

    STAVE_HEIGHT : 40,

    init : function (cfg) {
      var me = this;
      me.cfg = cfg;

      /**
       * contains the current {@link MEI2VF.StaveInfo} objects
       */
      me.currentStaveInfos = [];
      /**
       * @property {Number} systemLeftMar the left margin of the
       * current system (additional to the left print space margin)
       */
      me.systemLeftMar = null;
      /**
       * @property {Number} currentLowestY the lowest Y coordinate of the
       * previously processed staves
       */
      me.currentLowestY = 0;

      me.startConnectorInfos = {};
      me.inlineConnectorInfos = {};

    },

    setLeftMar : function (width) {
      this.systemLeftMar = width;
    },

    getLeftMar : function () {
      return this.systemLeftMar;
    },

    /**
     * @method
     */
    setConnectorModels : function (staffGrp, range, isChild, ancestorSymbols) {
      var me = this, symbol, barthru, first_n, last_n;

      var setModelForStaveRange = function (target, obj, add) {
        add = add || '';
        target[obj.top_stave_n + ':' + obj.bottom_stave_n + add] = obj;
      };

      first_n = range.first_n;
      last_n = range.last_n;
      symbol = staffGrp.getAttribute('symbol');

      Logger.debug('Converter.setConnectorModels() {2}', 'symbol: ' + symbol, ' range.first_n: ' +
                                                                              first_n, ' range.last_n: ' + last_n);

      // 1. left connectors specified in the MEI file:
      setModelForStaveRange(me.startConnectorInfos, {
        top_stave_n : first_n,
        bottom_stave_n : last_n,
        symbol : symbol || 'line',
        label : staffGrp.getAttribute('label'),
        labelAbbr : staffGrp.getAttribute('label.abbr'),
        ancestorSymbols : ancestorSymbols
      });

      // 2. left auto line, only (if at all) attached to
      // //staffGrp[not(ancestor::staffGrp)]
      if (!isChild && me.cfg.autoStaveConnectorLine) {
        setModelForStaveRange(me.startConnectorInfos, {
          top_stave_n : first_n,
          bottom_stave_n : last_n,
          symbol : (symbol === 'none') ? 'none' : 'line'
        }, 'autoline');
      }

      // 3. inline connectors
      if (staffGrp.getAttribute('barthru') === 'true') {
        setModelForStaveRange(me.inlineConnectorInfos, {
          top_stave_n : first_n,
          bottom_stave_n : last_n,
          symbol : 'singleright' // default
        });
      }
    },

    getStaveInfo : function (stave_n) {
      return this.currentStaveInfos[stave_n];
    },

    getAllStaveInfos : function () {
      return this.currentStaveInfos;
    },


    /**
     * @method getStaveLabels
     */
    getStaveLabels : function (currentSystem_n) {
      var me = this, labels, i, infos, labelType;
      labels = {};
      if (!me.cfg.labelMode) {
        return labels;
      }
      labelType = (me.cfg.labelMode === 'full' && currentSystem_n === 0) ? 'label' : 'labelAbbr';
      infos = me.getAllStaveInfos();
      i = infos.length;
      while (i--) {
        if (infos[i]) {
          labels[i] = infos[i][labelType];
        }
      }
      return labels;
    },

    getVerseConfig : function () {
      var me = this;
      return {
        font : me.cfg.lyricsFont, maxHyphenDistance : me.cfg.maxHyphenDistance
      };
    },

    /**
     * @method
     */
    getClef : function (stave_n) {
      var me = this, staveInfo;
      staveInfo = me.currentStaveInfos[stave_n];
      if (!staveInfo) {
        throw new RuntimeError('No staff definition for staff n="' + stave_n + '"');
      }
      return staveInfo.getClef();
    },

    getCurrentLowestY : function () {
      return this.currentLowestY;
    },

    setCurrentLowestY : function (y) {
      this.currentLowestY = y;
    },

    getYs : function (currentSystemY) {
      var me = this, currentStaveY, i, j, isFirstStave = true, infoSpacing, lowestYCandidate, ys = [];
      currentStaveY = 0;
      for (i = 1, j = me.currentStaveInfos.length; i < j; i += 1) {
        if (me.currentStaveInfos[i]) {
          infoSpacing = me.currentStaveInfos[i].spacing;
          currentStaveY += (isFirstStave) ? 0 :
                           (infoSpacing !== null) ? me.STAVE_HEIGHT + me.currentStaveInfos[i].spacing :
                           me.STAVE_HEIGHT + me.cfg.staveSpacing;
          ys[i] = currentSystemY + currentStaveY;
          isFirstStave = false;
        }
      }
      lowestYCandidate = currentSystemY + currentStaveY + me.STAVE_HEIGHT;
      if (lowestYCandidate > me.currentLowestY) {
        me.currentLowestY = lowestYCandidate;
      }
      return ys;
    },

    forceSectionStartInfos : function () {
      var me = this, i = me.currentStaveInfos.length;
      while (i--) {
        if (me.currentStaveInfos[i]) {
          me.currentStaveInfos[i].forceSectionStartInfo();
        }
      }
    },

    forceStaveStartInfos : function () {
      var me = this, i = me.currentStaveInfos.length;
      while (i--) {
        if (me.currentStaveInfos[i]) {
          me.currentStaveInfos[i].forceStaveStartInfo();
        }
      }
    },

    /**
     *
     */
    processScoreDef : function (scoredef) {
      var me = this, i, j, children, systemLeftmar;
      me.scoreDefElement = scoredef;
      systemLeftmar = parseFloat(me.scoreDefElement.getAttribute('system.leftmar'));
      if (!isNaN(systemLeftmar)) {
        me.setLeftMar(systemLeftmar);
      }
      children = me.scoreDefElement.childNodes;

      for (i = 0, j = children.length; i < j; i += 1) {
        if (children[i].nodeType === 1) {
          me.processScoreDef_child(children[i]);
        }
      }

      me.updateStaffDefs(scoredef);

    },

    /**
     * process scoreDef in all system which didn't get updated by a staffDef child of the current scoreDef
     * @param scoredef
     */
    updateStaffDefs : function (scoredef) {
      var me = this, i = me.currentStaveInfos.length;
      while (i--) {
        if (me.currentStaveInfos[i] && me.currentStaveInfos[i].getCurrentScoreDef() !== scoredef) {
          me.currentStaveInfos[i].updateDef(null, scoredef);
        }
      }
    },


    /**
     * MEI element <b>scoreDef</b> may contain (MEI v2.1.0):
     * MEI.cmn: <b>meterSig</b> <b>meterSigGrp</b>
     * MEI.harmony: <b>chordTable</b> MEI.linkalign:
     * <b>timeline</b> MEI.midi: <b>instrGrp</b> MEI.shared:
     * <b>keySig</b> <b>pgFoot</b> <b>pgFoot2</b> <b>pgHead</b>
     * <b>pgHead2</b> <b>staffGrp</b> MEI.usersymbols:
     * <b>symbolTable</b>
     *
     * Supported elements: <b>staffGrp</b>
     *
     * @param {Element} element the scoreDef element to process
     */
    processScoreDef_child : function (element) {
      var me = this;
      switch (element.localName) {
        case 'staffGrp' :
          me.processStaffGrp(element);
          break;
        case 'pgHead' :
          me.processPgHead(element);
          break;
        case 'pgFoot' :
          me.processPgFoot(element);
          break;
        default :
          Logger.info('Not supported', 'Element <' + element.localName +
                                       '> is not supported in <scoreDef>. Ignoring element.');
      }
    },

    processPgHead : function (element) {
      Logger.info('Not supported', 'Element <' + element.localName +
                                   '> is not supported in <scoreDef>. Ignoring element.');
    },

    processPgFoot : function (element) {
      Logger.info('Not supported', 'Element <' + element.localName +
                                   '> is not supported in <scoreDef>. Ignoring element.');
    },

    /**
     *
     * @param {Element} staffGrp
     * @param {Boolean} isChild specifies if the staffGrp is a child of another
     *            staffGrp (auto staff connectors only get attached
     *            to the outermost staffGrp elements)
     * @param {Object} ancestorSymbols
     * @return {Object} the range of the current staff group. Properties:
     *         first_n, last_n
     */
    processStaffGrp : function (staffGrp, isChild, ancestorSymbols) {
      var me = this, range = {}, isFirst = true, children, i, j, childRange;
      children = staffGrp.childNodes;
      for (i = 0, j = children.length; i < j; i++) {
        if (children[i].nodeType === 1) {
          childRange = me.processStaffGrp_child(staffGrp, children[i], ancestorSymbols);
          if (childRange) {
            Logger.debug('Converter.processStaffGrp() {1}.{a}', 'childRange.first_n: ' +
                                                                childRange.first_n, ' childRange.last_n: ' +
                                                                                    childRange.last_n);
            if (isFirst) range.first_n = childRange.first_n;
            range.last_n = childRange.last_n;
            isFirst = false;
          }
        }

      }
      me.setConnectorModels(staffGrp, range, isChild, ancestorSymbols);
      return range;
    },

    /**
     * MEI element <b>staffGrp</b> may contain (MEI v2.1.0): MEI.cmn: meterSig
     * meterSigGrp MEI.mensural: mensur proport MEI.midi: instrDef
     * MEI.shared: clef clefGrp keySig label layerDef
     *
     * Supported elements: <b>staffGrp</b> <b>staffDef</b>
     *
     * @param {Element} parent
     * @param {Element} element
     * @param {Object} ancestorSymbols
     * @return {Object} the range of staves. Properties: first_n, last_n
     */
    processStaffGrp_child : function (parent, element, ancestorSymbols) {
      var me = this, stave_n, myAncestorSymbols;
      switch (element.localName) {
        case 'staffDef' :
          stave_n = me.processStaffDef(element, me.scoreDefElement);
          return {
            first_n : stave_n,
            last_n : stave_n
          };
        case 'staffGrp' :
          myAncestorSymbols =
          (!ancestorSymbols) ? [parent.getAttribute('symbol')] : ancestorSymbols.concat(parent.getAttribute('symbol'));
          return me.processStaffGrp(element, true, myAncestorSymbols);
        default :
          Logger.info('Not supported', 'Element <' + element.localName +
                                       '> is not supported in <staffGrp>. Ignoring element.');
      }
    },

    /**
     * reads a staffDef, writes it to currentStaveInfos
     *
     * @param {Element} element
     * @param {Element} scoreDef
     * @return {Number} the staff number of the staffDef
     */
    processStaffDef : function (element, scoreDef) {
      var me = this, stave_n, staveInfo;
      stave_n = parseInt(element.getAttribute('n'), 10);
      if (!isNaN(stave_n)) {
        staveInfo = me.currentStaveInfos[stave_n];
        if (staveInfo) {
          staveInfo.updateDef(element, scoreDef);
        } else {
          me.currentStaveInfos[stave_n] = new StaveInfo(element, scoreDef, true, true, true);
        }
        return stave_n;
      } else {
        throw new RuntimeError(Util.serializeElement(element) + ' must have an @n attribute of type integer.');
      }
    }
  };
/*
 * StaveVoice.js Author: Zoltan Komives (zolaemil@gmail.com) Created:
 * 25.07.2013
 *
 * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */



  /**
   * @class MEI2VF.StaveVoice
   * @private
   *
   * @constructor
   * @param {Object} voice
   * @param {Object} stave_n
   */
  var StaveVoice = function (voice, stave_n) {
    this.voice = voice;
    this.stave_n = stave_n;
  };
/*
 * StaveVoices.js Author: Zoltan Komives (zolaemil@gmail.com) Created:
 * 25.07.2013
 *
 * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
/*
 * Contributor: Alexander Erhard
 */



  /**
   * @class MEI2VF.StaveVoices
   * Stores all voices in a given measure along with the respective staff id.
   * Passes all voices to Vex.Flow.Formatter and calls joinVoices, then draws
   * all voices.
   * @private
   *
   * @constructor
   */
  var StaveVoices = function () {
    this.all_voices = [];
    this.formatter = new VF.Formatter();
  };

  StaveVoices.prototype = {
    addStaffVoice : function (staveVoice) {
      this.all_voices.push(staveVoice);
    },

    addVoice : function (voice, stave_n) {
      this.addStaffVoice(new StaveVoice(voice, stave_n));
    },

    reset : function () {
      this.all_voices = [];
    },

    preFormat : function () {
      var me = this, all, stave_n, i, voice;
      all = me.all_voices;
      me.vexVoices = [];
      me.vexVoicesStaffWise = {};
      i = all.length;

      while (i--) {
        voice = all[i].voice;
        me.vexVoices.push(voice);
        stave_n = all[i].stave_n;
        if (me.vexVoicesStaffWise[stave_n]) {
          me.vexVoicesStaffWise[stave_n].push(voice);
        } else {
          me.vexVoicesStaffWise[stave_n] = [voice];
        }
      }

      me.formatter.preCalculateMinTotalWidth(me.vexVoices);
      return me.formatter.getMinTotalWidth();
    },

    /**
     * returns how much of the total tick count in the measure is actually used by the first voice
     * return {Number}
     */
    getFillFactor : function () {
      var voice = this.vexVoices[0], ticksUsed;
      ticksUsed = voice.getTicksUsed().numerator;
      return (ticksUsed === 0) ? 1 : ticksUsed / voice.getTotalTicks().numerator;
    },

    /**
     *
     * @param {Object} stave a staff in the current measure used to set
     * the x dimensions of the voice
     */
    format : function (stave) {
      var me = this, i, f, alignRests;
      f = me.formatter;
      for (i in me.vexVoicesStaffWise) {
        alignRests = (me.vexVoicesStaffWise[i].length > 1);
        f.joinVoices(me.vexVoicesStaffWise[i]);
        if (alignRests) f.alignRests(me.vexVoicesStaffWise[i], {align_rests : alignRests});
      }

      var justifyWidth = stave.getNoteEndX() - stave.getNoteStartX() - 10;
      f.createTickContexts(me.vexVoices);
      f.preFormat(justifyWidth, stave.getContext(), me.vexVoices, null);
    },

    //    getStaveLowestY : function (stave_n) {
    //      var me=this, i, j, voices, lowestY = 0;
    //      voices = me.vexVoicesStaffWise[stave_n];
    //      if (voices) {
    //        console.log(voices);
    //        for (i=0,j=voices.length;i<j;i++) {
    //          lowestY = Math.max(lowestY, voices[i].boundingBox.y + voices[i].boundingBox.h);
    //        }
    //        return lowestY;
    //      }
    //    },

    // TODO: also use this for auto y formatting!!

    getYBounds : function () {
      var me = this, vStaveWise = me.vexVoicesStaffWise;
      var yBounds = {};
      for (var i in vStaveWise) {
        yBounds[i] = [];
        for (var k= 0,l=vStaveWise[i].length;k<l;k++) {
          yBounds[i].push(vStaveWise[i][k].getBoundingBox());
        }
      }
      return yBounds;
    },


    draw : function (context) {
      var i, staveVoice, all_voices = this.all_voices;
      for (i = 0; i < all_voices.length; ++i) {
        staveVoice = all_voices[i];

        this.drawVoice.call(staveVoice.voice, context);
        //        staveVoice.voice.draw(context, staves[staveVoice.stave_n]);
      }
    },

    // modified version of VF.Voice.draw() which calls setStave with the voice's stave as parameter
    drawVoice : function (context) {
      var boundingBox = null;
      for (var i = 0; i < this.tickables.length; ++i) {
        var tickable = this.tickables[i];

        if (!tickable.getStave()) {
          throw new Vex.RuntimeError("MissingStave", "The voice cannot draw tickables without staves.");
        }

        tickable.setStave(tickable.getStave());

        if (i === 0) boundingBox = tickable.getBoundingBox();

        if (i > 0 && boundingBox) {
          var tickable_bb = tickable.getBoundingBox();
          if (tickable_bb) boundingBox.mergeWith(tickable_bb);
        }

        tickable.setContext(context);
        tickable.draw();
      }

      this.boundingBox = boundingBox;
    }


  };
/*
 * MEItoVexFlow, Converter class
 * (based on meitovexflow.js)
 * Rearrangements and additions: Alexander Erhard
 *
 * Copyright © 2014 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

/*
 * MEItoVexFlow
 *
 * Author: Richard Lewis Contributors: Zoltan Komives, Raffaele Viglianti
 *
 * See README for details of this library
 *
 * Copyright © 2012, 2013 Richard Lewis, Raffaele Viglianti, Zoltan Komives,
 * University of Maryland
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */



    /**
     * Converts an MEI XML document / document fragment to VexFlow objects and
     * optionally renders it using SVG, Raphael or HTML5 Canvas.
     *
     * Usage:
     *
     * - Either pass a config object to the constructor function or (if no config
     * object has been passed) call {@link #initConfig} after construction.
     * - Call {@link #process} to process an MEI XML document
     * - Call {@link #draw} to draw the processed VexFlow objects to a canvas
     *
     * @class MEI2VF.Converter
     *
     * @constructor
     * @param {Object} [config]
     * @chainable
     * @return {MEI2VF.Converter} this
     */
    var Converter = function (config) {
        if (config) {
            this.initConfig(config);
        }
        return this;
    };

    Converter.prototype = {

        defaults: {
            /**
             * @cfg {Number|null} pageWidth The width of the page. If null, the page width is calculated on
             * basis of the page content
             */
            pageWidth: null, /**
             * @cfg {Number} pageTopMar The page top margin
             */
            pageTopMar: 60, /**
             * @cfg {Number} pageBottomMar The page bottom margin
             */
            pageBottomMar: 80, /**
             * @cfg {Number} pageLeftMar The page left margin
             */
            pageLeftMar: 20, /**
             * @cfg {Number} pageRightMar The page right margin
             */
            pageRightMar: 20, /**
             * @cfg {Number} defaultSpacingInMeasure The default spacing added to a measure's minimum
             * width when no page width is specified (i.e. when the width cannot be determined on basis
             * of the page width)
             */
            defaultSpacingInMeasure: 180, /**
             * @cfg {Number} systemSpacing The default spacing between two stave
             * systems
             */
            systemSpacing: 90, /**
             * @cfg {Number} staveSpacing The default spacing between two staves
             * within a system; overridden by the spacing attribute of a staffDef
             * element in the MEI code
             */
            staveSpacing: 60, /**
             * @cfg {Boolean} autoStaveConnectorLine Specifies if a stave connector
             * line is drawn on the left of systems by default; if set to true, the
             * auto line will not appear when staffDef/@symbol="none" is set for the
             * outermost staffDef element
             */
            autoStaveConnectorLine: true, /**
             * @cfg {"full"/"abbr"/null} labelMode Specifies the way voice labels are
             * added
             * to staves. Values:
             *
             * - 'full': renders full labels in the first system, abbreviated labels
             * in all following systems
             * - 'abbr': only render abbreviated labels
             * - null or undefined: renders no labels
             */
            labelMode: null, // 'full',
            readMeasureWidths: true, // false
            processSb: 'sb', // sb / ignore
            processPb: 'sb', // pb / sb / ignore
            /**
             * @cfg {Number} maxHyphenDistance The maximum distance (in pixels)
             * between two hyphens in the lyrics lines
             */
            maxHyphenDistance: 75, /**
             * @cfg {Object} lyricsFont The font used for rendering lyrics (and
             * hyphens)
             * @cfg {String} lyricsFont.family the font family
             * @cfg {Number} lyricsFont.size the font size
             */
            lyricsFont: {
                family: 'Times', size: 15, spacing: 1.3
            }, /**
             * @cfg {Object} annotFont the font used for annotations (for example,
             * 'pizz.')
             * @cfg {String} annotFont.family the font family
             * @cfg {Number} annotFont.size the font size
             */
            annotFont: {
                family: 'Times', size: 15
            }, /**
             * @cfg {Object} dynamFont the font used for dynamics
             * @cfg {String} dynamFont.family the font family
             * @cfg {Number} dynamFont.size the font size
             * @cfg {String} dynamFont.weight the font weight
             */
            dynamFont: {
                family: 'Times', size: 17.5, weight: 'bold italic'
            }, /**
             * @cfg {Object} tempoFont The tempo font
             * @cfg {String} tempoFont.family the font family
             * @cfg {Number} tempoFont.size the font size
             * @cfg {String} tempoFont.weight the font weight
             */
            tempoFont: {
                family: "Times", size: 17, weight: "bold"
            }
        },

        /**
         * initializes the Converter
         * @method initConfig
         * @param {Object} config A config object (optional)
         * @chainable
         * @return {Converter} this
         */
        initConfig: function (config) {
            var me = this;
            me.cfg = Util.extend({}, me.defaults, config);
            /**
             * an instance of MEI2VF.SystemInfo dealing with the system and stave
             * info derived from the MEI data
             * @property {MEI2VF.SystemInfo} systemInfo
             */
            me.systemInfo = new SystemInfo();

            me.pageInfo = new PageInfo(me.cfg);

            switch (me.cfg.processSb) {
                case 'pb' :
                    me.onSb = me.setPendingPageBreak;
                    break;
                case 'sb' :
                    me.onSb = me.setPendingSystemBreak;
                    break;
                default :
                    me.onSb = me.emptyFn;
            }
            switch (me.cfg.processPb) {
                case 'pb' :
                    me.onPb = me.setPendingPageBreak;
                    break;
                case 'sb' :
                    me.onPb = me.setPendingSystemBreak;
                    break;
                default :
                    me.onPb = me.emptyFn;
            }
            return me;

        },

        emptyFn: function () {
        },

        /**
         * Resets all data. Called by {@link #process}.
         * @method reset
         * @chainable
         * @return {Converter} this
         */
        reset: function () {
            var me = this;

            me.page = new Page();

            me.systemInfo.init(me.cfg);
            /**
             * @property {MEI2VF.EventLink[][]} unresolvedTStamp2
             */
            me.unresolvedTStamp2 = [];
            /**
             * Contains all Vex.Flow.Stave objects. Addressing scheme:
             * [measure_n][stave_n]
             * @property {Vex.Flow.Stave[][]} allVexMeasureStaves
             */
            me.allVexMeasureStaves = [];

            me.beams = new BeamCollection();
            me.tuplets = new TupletCollection();

            /**
             * an instance of MEI2VF.Dynamics dealing with and storing all dynamics
             * found in the MEI document
             * @property {MEI2VF.Dynamics} dynamics
             */
            me.dynamics = new Dynamics(me.systemInfo, me.cfg.dynamFont);
            /**
             * an instance of MEI2VF.Arpeggios dealing with and storing all
             * arpeggios found in the MEI document
             * @property {Arpeggios} arpeggios
             */
            me.arpeggios = new Arpeggios(me.systemInfo);
            /**
             * an instance of MEI2VF.Directives dealing with and storing all
             * directives found in the MEI document
             * @property {MEI2VF.Directives} directives
             */
            me.directives = new Directives(me.systemInfo, me.cfg.annotFont);
            /**
             * an instance of MEI2VF.Fermatas dealing with and storing all
             * fermata elements found in the MEI document (fermata attributes are
             * attached directly to the containing note-like object)
             * @property {MEI2VF.Fermatas} fermatas
             */
            me.fermatas = new Fermatas(me.systemInfo);
            /**
             * an instance of MEI2VF.Ornaments dealing with and storing all
             * ornament elements found in the MEI document
             * @property {MEI2VF.Ornaments} ornaments
             */
            me.ornaments = new Ornaments(me.systemInfo);
            /**
             * an instance of MEI2VF.Ties dealing with and storing all ties found in
             * the MEI document
             * @property {MEI2VF.Ties} ties
             */
            me.ties = new Ties(me.systemInfo, me.unresolvedTStamp2);
            /**
             * an instance of MEI2VF.Slurs dealing with and storing all slurs found in
             * the MEI document
             * @property {MEI2VF.Slurs} slurs
             */
            me.slurs = new Slurs(me.systemInfo, me.unresolvedTStamp2);
            /**
             * an instance of MEI2VF.Hairpins dealing with and storing all hairpins
             * found in the MEI document
             * @property {MEI2VF.Hairpins} hairpins
             */
            me.hairpins = new Hairpins(me.systemInfo, me.unresolvedTStamp2);
            /**
             * contains all note-like objects in the current MEI document, accessible
             * by their xml:id
             * @property {Object} notes_by_id
             * @property {Element} notes_by_id.meiNote the XML Element of the note
             * @property {Vex.Flow.StaveNote} notes_by_id.vexNote the VexFlow note
             * object
             */
            me.notes_by_id = {};
            /**
             * the number of the current system
             * @property {Number} currentSystem_n
             */
            me.currentSystem_n = -1;
            /**
             * indicates if a system break is currently to be processed
             * @property {Boolean} pendingSystemBreak
             */
            me.pendingSystemBreak = false;
            /**
             * indicates if a system break is currently to be processed
             * @property {Boolean} pendingSectionBreak
             */
            me.pendingSectionBreak = true;
            /**
             * Contains information about the volta type of the current stave. Properties:
             *
             * -  `start` {String} indicates the number to render to the volta. When
             * falsy, it is assumed that the volta does not start in the current
             * measure
             * -  `end` {Boolean} indicates if there is a volta end in the current
             * measure
             *
             * If null, no volta is rendered
             * @property {Object} voltaInfo
             */
            me.voltaInfo = null;
            return me;
        },

        /**
         * Processes the specified MEI document or
         * document fragment. The generated objects can
         * be processed further or drawn immediately to a canvas via {@link #draw}.
         * @method process
         * @chainable
         * @param {XMLDocument|Element} xmlDoc an XML document or element containing the MEI music to render
         * @return {Converter} this
         */
        process: function (xmlDoc) {
            var me = this;

            //      me.systemInfo.processScoreDef(xmlDoc.getElementsByTagName('scoreDef')[0]);
            //      me.processSections(xmlDoc);

            if (xmlDoc.localName === 'score') {
                me.processScoreChildren(xmlDoc);
            } else {
                me.processScoreChildren(xmlDoc.querySelector('score'));
            }

            me.arpeggios.createVexFromInfos(me.notes_by_id);
            me.dynamics.createVexFromInfos(me.notes_by_id);
            me.ornaments.createVexFromInfos(me.notes_by_id);
            me.directives.createVexFromInfos(me.notes_by_id);
            me.fermatas.createVexFromInfos(me.notes_by_id);
            me.ties.createVexFromInfos(me.notes_by_id);
            me.slurs.createVexFromInfos(me.notes_by_id);
            me.hairpins.createVexFromInfos(me.notes_by_id);

            me.tuplets.resolveSpanElements(me.notes_by_id);
            me.beams.resolveSpanElements(me.notes_by_id);

            return me;
        },

        format: function (ctx) {
            var me = this;
            me.page.formatSystems(me.pageInfo, me.systemInfo, me.cfg, ctx);
            me.beams.postFormat();
        },

        /**
         * Draws the internal data objects to a canvas
         * @method draw
         * @chainable
         * @param ctx The canvas context
         * @return {Converter} this
         */
        draw: function (ctx) {
            var me = this;
            me.page.setContext(ctx).drawSystems();
            me.beams.setContext(ctx).draw();
            me.tuplets.setContext(ctx).draw();
            me.ties.setContext(ctx).draw();
            me.slurs.setContext(ctx).draw();
            me.hairpins.setContext(ctx).draw();
            return me;
        },

        /**
         * Returns the width and the height of the area that contains all drawn
         * staves as per the last processing.
         *
         * @method getStaveArea
         * @return {Object} the width and height of the area that contains all
         * staves.
         * Properties: width, height
         */
        getStaveArea: function () {
            var height;
            height = this.systemInfo.getCurrentLowestY();
            var allVexMeasureStaves = this.getAllVexMeasureStaves();
            var i, k, max_start_x, area_width, stave;
            i = allVexMeasureStaves.length;
            area_width = 0;
            while (i--) {
                if (allVexMeasureStaves[i]) {
                    max_start_x = 0;
                    // get maximum start_x of all staves in measure
                    k = allVexMeasureStaves[i].length;
                    while (k--) {
                        stave = allVexMeasureStaves[i][k];
                        if (stave) {
                            max_start_x = Math.max(max_start_x, stave.getNoteStartX());
                        }
                    }
                    k = allVexMeasureStaves[i].length;
                    while (k--) {
                        // get maximum width of all staves in measure
                        stave = allVexMeasureStaves[i][k];
                        if (stave) {
                            area_width = Math.max(area_width, max_start_x + stave.getWidth());
                        }
                    }
                }
            }
            return {
                width: area_width, height: height
            };
        },

        /**
         * returns a 2d array of all Vex.Flow.Stave objects, arranged by
         * [measure_n][stave_n]
         * @method getAllVexMeasureStaves
         * @return {Vex.Flow.Stave[][]} see {@link #allVexMeasureStaves}
         */
        getAllVexMeasureStaves: function () {
            return this.allVexMeasureStaves;
        },

        /**
         * returns all systems created when processing the MEI document
         * @method getSystems
         * @return {MEI2VF.System[]}
         */
        getSystems: function () {
            return this.page.getSystems();
        },

        /**
         * returns all note-like objects created when processing the MEI document
         * @method getNotes
         * @return {Object} for the object properties, see {@link #notes_by_id}
         */
        getNotes: function () {
            return this.notes_by_id;
        },

        /**
         * creates in initializes a new {@link MEI2VF.System} and updates the stave
         * modifier infos
         * @method createNewSystem
         */
        createNewSystem: function () {
            var me = this, system;

            Logger.debug('Converter.createNewSystem()', '{enter}');

            me.pendingSystemBreak = false;
            me.currentSystem_n += 1;

            system = new System(me.pageInfo, me.systemInfo, me.currentSystem_n);

            if (me.pendingSectionBreak) {
                me.pendingSectionBreak = false;
                me.systemInfo.forceSectionStartInfos();
            } else {
                me.systemInfo.forceStaveStartInfos();
            }

            me.page.addSystem(system, me.currentSystem_n);
            return system;
        },

        processScoreChildren: function (score) {
            var me = this, i, j, childNodes, sectionContext;

            sectionContext = {
                voltaInfo: null
            };

            if (score) {
                childNodes = score.childNodes;
                for (i = 0, j = childNodes.length; i < j; i++) {
                    if (childNodes[i].nodeType === 1) {
                        me.processScoreChild(childNodes[i], sectionContext);
                    }
                }
            } else {
                throw new RuntimeError('No score element found in the document.')
            }
        },

        processScoreChild: function (element, sectionContext) {
            var me = this;
            switch (element.localName) {
                case 'scoreDef' :
                    me.systemInfo.processScoreDef(element);
                    break;
                case 'staffDef' :
                    me.systemInfo.processStaffDef(element, null);
                    break;
                case 'pb' :
                    me.onPb(element);
                    break;
                case 'ending' :
                    me.processEnding(element, sectionContext);
                    break;
                case 'section' :
                    me.processSection(element, sectionContext);
                    break;
                default :
                    Logger.info('Not supported', 'Element ' + Util.serializeElement(element) +
                    ' is not supported in <score>. Ignoring element.');
            }
        },

        //    /**
        //     * @method processSections
        //     */
        //    processSections : function (xmlDoc) {
        //      var me = this, i, j, sections;
        //      sections = xmlDoc.getElementsByTagName('section');
        //      for (i = 0, j = sections.length; i < j; i++) {
        //        me.processSection(sections[i]);
        //      }
        //    },

        /**
         *@method processSection
         */
        processSection: function (element, sectionContext) {
            var me = this, i, j, sectionChildren = element.childNodes;
            for (i = 0, j = sectionChildren.length; i < j; i += 1) {
                if (sectionChildren[i].nodeType === 1) {
                    me.processSectionChild(sectionChildren[i], sectionContext);
                }
            }
        },

        /**
         * @method processEnding
         */
        processEnding: function (element, sectionContext) {
            var me = this, next, childNode, voltaInfo, endVoltaHere;

            voltaInfo = sectionContext.voltaInfo;

            endVoltaHere = (voltaInfo === null);

            var getNext = function (node) {
                var nextSibling = node.nextSibling;
                while (nextSibling && nextSibling.nodeType !== 1) {
                    nextSibling = nextSibling.nextSibling;
                }
                return nextSibling;
            };

            childNode = element.firstChild;
            if (childNode.nodeType !== 1) {
                childNode = getNext(childNode);
            }

            // TODO take into account that section children may be other elements than measures;
            // in this case, the last measure wouldn't be the last child element in the list!!

            while (childNode) {
                next = getNext(childNode);
                // modify volta information only on measure elements
                if (childNode.localName === 'measure') {
                    if (sectionContext.voltaInfo === null) {
                        sectionContext.voltaInfo = {
                            start: element.getAttribute('n')
                        };
                    } else {
                        delete sectionContext.voltaInfo.start;
                    }
                    if (!next && endVoltaHere) {
                        sectionContext.voltaInfo.end = true;
                    }
                } else if (childNode.localName === 'ending' || childNode.localName === 'section') {
                    Logger.info('Not supported', Util.serializeElement(childNode) + ' is not supported as a child of ' +
                    Util.serializeElement(element) + '. Trying to process it anyway.');
                }
                me.processSectionChild(childNode, sectionContext);
                childNode = next;
            }
            if (endVoltaHere) sectionContext.voltaInfo = null;
        },

        /**
         * MEI element <b>section</b> may contain (MEI v2.1.0): MEI.cmn: measure
         * MEI.critapp: app MEI.edittrans: add choice corr damage del gap
         * handShift orig reg restore sic subst supplied unclear MEI.shared:
         * annot ending expansion pb sb scoreDef section staff staffDef
         * MEI.text: div MEI.usersymbols: anchoredText curve line symbol
         *
         * Supported elements: <b>ending</b> <b>measure</b> <b>scoreDef</b> <b>section</b> <b>staffDef</b>
         * <b>sb</b>
         * @method processSectionChild
         */
        processSectionChild: function (element, sectionContext) {
            var me = this;
            switch (element.localName) {
                case 'measure' :
                    me.processMeasure(element, sectionContext);
                    break;
                case 'scoreDef' :
                    me.systemInfo.processScoreDef(element);
                    break;
                case 'staffDef' :
                    me.systemInfo.processStaffDef(element, null);
                    break;
                case 'pb' :
                    me.onPb(element);
                    break;
                case 'sb' :
                    me.onSb(element);
                    break;
                case 'ending' :
                    me.processEnding(element, sectionContext);
                    break;
                case 'section' :
                    me.processSection(element, sectionContext);
                    break;
                default :
                    Logger.info('Not supported', 'Element ' + Util.serializeElement(element) +
                    ' is not supported in <section>. Ignoring element.');
            }
        },

        setPendingPageBreak: function () {
            Logger.info('setPendingPageBreak() not implemented.')
        },

        /**
         * sets the property {@link #pendingSystemBreak} to `true`. When true, a
         * new system will be initialized when {@link #processMeasure} is called
         * the next time.
         * @method setPendingSystemBreak
         */
        setPendingSystemBreak: function () {
            this.pendingSystemBreak = true;
        },

        /**
         * Processes a MEI measure element
         * @method processMeasure
         * @param {Element} element the MEI measure element
         * @param {Object} sectionContext the context shared by the current elements
         */
        processMeasure: function (element, sectionContext) {
            var me = this, atSystemStart, systems, system, system_n, childNodes;

            if (me.pendingSectionBreak || me.pendingSystemBreak) {
                system = me.createNewSystem();
                atSystemStart = true;
            } else {
                systems = me.page.getSystems();
                system_n = systems.length - 1;
                system = systems[system_n];
                atSystemStart = false;
            }

            Logger.debug('Converter.processMeasure()', '{enter}');

            var barlineInfo = {
                leftBarline: element.getAttribute('left'), rightBarline: element.getAttribute('right')
            };


            // VexFlow doesn't support repetition starts at the end of staves -> pass
            // the value of @right to the following measure if @left isn't specified in it
            if (sectionContext.leftBarlineElement && !barlineInfo.leftBarline) {
                barlineInfo.leftBarline = sectionContext.leftBarlineElement.getAttribute('right');
                barlineInfo.leftBarlineElement = sectionContext.leftBarlineElement;
                sectionContext.leftBarlineElement = null;
            }
            if (barlineInfo.rightBarline === 'rptstart') {
                barlineInfo.rightBarline = null;
                sectionContext.leftBarlineElement = element;
            }


            var staveElements = [], arpegElements = [], dirElements = [], slurElements = [], tieElements = [], hairpinElements = [], tempoElements = [], dynamElements = [], fermataElements = [], rehElements = [], ornamentElements = [], i, j;

            childNodes = element.childNodes;
            for (i = 0, j = childNodes.length; i < j; i++) {
                switch (childNodes[i].localName) {
                    // skip text nodes
                    case null :
                        break;
                    case 'staff':
                        staveElements.push(childNodes[i]);
                        break;
                    case 'dir':
                        dirElements.push(childNodes[i]);
                        break;
                    case 'harm':
                        dirElements.push(childNodes[i]);
                        break;
                    case 'tie':
                        tieElements.push(childNodes[i]);
                        break;
                    case 'slur':
                        slurElements.push(childNodes[i]);
                        break;
                    case 'hairpin':
                        hairpinElements.push(childNodes[i]);
                        break;
                    case 'tempo':
                        tempoElements.push(childNodes[i]);
                        break;
                    case 'dynam':
                        dynamElements.push(childNodes[i]);
                        break;
                    case 'arpeg':
                        arpegElements.push(childNodes[i]);
                        break;
                    case 'fermata':
                        fermataElements.push(childNodes[i]);
                        break;
                    case 'mordent':
                    case 'turn':
                    case 'trill':
                        ornamentElements.push(childNodes[i]);
                        break;
                    case 'reh':
                        rehElements.push(childNodes[i]);
                        break;
                    case 'beamSpan':
                        me.beams.addSpanElements(childNodes[i]);
                        break;
                    case 'tupletSpan':
                        me.tuplets.addSpanElements(childNodes[i]);
                        break;
                    default:
                        Logger.info('Not supported', '<' + childNodes[i].localName + '> is not supported as child of <measure>.');
                        break;
                }
            }

            // the stave objects will be stored in two places:
            // 1) in each MEI2VF.Measure
            // 2) in MEI2VF.Converter.allVexMeasureStaves
            var staves = me.initializeStavesInMeasure(system, staveElements, barlineInfo, atSystemStart, sectionContext);
            var measureIndex = me.allVexMeasureStaves.push(staves) - 1;

            var currentStaveVoices = new StaveVoices();

            var eventContext = new EventContext(me.notes_by_id, me.currentSystem_n);

            for (i = 0, j = staveElements.length; i < j; i++) {
                me.processStaveEvents(staves, staveElements[i], measureIndex, currentStaveVoices, eventContext);
            }

            if (eventContext.clefCheckQueue.length !== 0) {
                me.processClefCheckQueue(eventContext);
            }

            me.dynamics.createInfos(dynamElements, element);
            me.arpeggios.createInfos(arpegElements, element);
            me.directives.createInfos(dirElements, element);
            me.fermatas.createInfos(fermataElements, element);
            me.ornaments.createInfos(ornamentElements, element);
            me.ties.createInfos(tieElements, element, measureIndex, me.systemInfo);
            me.slurs.createInfos(slurElements, element, measureIndex, me.systemInfo);
            me.hairpins.createInfos(hairpinElements, element, measureIndex, me.systemInfo);

            var measure = new Measure({
                system: system,
                element: element,
                staves: staves,
                voices: currentStaveVoices,
                startConnectorCfg: (atSystemStart) ? {
                    labelMode: me.cfg.labelMode,
                    models: me.systemInfo.startConnectorInfos,
                    staves: staves,
                    system_n: me.currentSystem_n
                } : null,
                inlineConnectorCfg: {
                    models: me.systemInfo.inlineConnectorInfos, staves: staves, barlineInfo: barlineInfo
                },
                tempoElements: tempoElements,
                rehElements: rehElements,
                tempoFont: me.cfg.tempoFont,
                readMeasureWidths: me.cfg.readMeasureWidths
            });

            system.addMeasure(measure);
        },

        processClefCheckQueue: function (eventContext) {


            var i, j, event, events = eventContext.clefCheckQueue;
            for (i = 0, j = events.length; i < j; i++) {
                event = events[i];
                if (event.clef !== event.stave.clef) {

                    // TODO check if there is a clef change in any of the voices in the other system
                    // and adjust accordingly determine the position
                    event.clef = event.stave.clef;

                    //          console.log(event.clef);
                    //          console.log(event.stave.clef);

                    event.keyProps = [];
                    event.calculateKeyProps();
                    event.buildNoteHeads();
                    event.buildStem();
                }
            }

            eventContext.emptyClefCheckQueue();

        },


        /**
         * @method initializeStavesInMeasure
         * @param {System} system the current system
         * @param {Element[]} staveElements all stave elements in the current
         * measure
         * @param {Object} barlineInfo information about the barlines to render to the measure
         * @param {Boolean} atSystemStart indicates if the current measure is the system's start measure
         * @param {Object} sectionContext an object containing section child context information
         */
        initializeStavesInMeasure: function (system, staveElements, barlineInfo, atSystemStart, sectionContext) {
            var me = this, i, j, stave, stave_n, staves, isFirstStaveInMeasure = true, clefOffsets = {}, maxClefOffset = 0, keySigOffsets = {}, maxKeySigOffset = 0, precedingMeasureStaves, newClef, currentStaveInfo, padding;

            staves = [];

            if (!atSystemStart) {
                precedingMeasureStaves = system.getLastMeasure().getStaves();
            }

            // first run: create MEI2VF.Stave objects, store them in the staves
            // array. Set stave barlines and stave volta. Add clef. Get each stave's
            // clefOffset and calculate the maxClefOffset.
            for (i = 0, j = staveElements.length; i < j; i++) {
                stave_n = parseInt(staveElements[i].getAttribute('n'), 10);
                if (isNaN(stave_n)) {
                    throw new RuntimeError(Util.serializeElement(staveElements[i]) +
                    ' must have an @n attribute of type integer.');
                }

                stave = new Stave({
                    system: system, y: system.getStaveYs()[stave_n], barlineInfo: barlineInfo
                });
                staves[stave_n] = stave;

                if (isFirstStaveInMeasure && sectionContext.voltaInfo) {
                    stave.addVoltaFromInfo(sectionContext.voltaInfo);
                    isFirstStaveInMeasure = false;
                }

                if (precedingMeasureStaves && precedingMeasureStaves[stave_n]) {
                    currentStaveInfo = me.systemInfo.getStaveInfo(stave_n);
                    newClef = currentStaveInfo.getClef();
                    if (currentStaveInfo.showClefCheck()) {
                        precedingMeasureStaves[stave_n].addEndClefFromInfo(newClef);
                    }
                    stave.clef = newClef.type;
                    clefOffsets[stave_n] = 0;
                    maxClefOffset = 0;
                } else {
                    currentStaveInfo = me.systemInfo.getStaveInfo(stave_n);
                    if (!currentStaveInfo) {
                        throw new RuntimeError(Util.serializeElement(staveElements[i]) + ' refers to stave "' + stave_n +
                        '", but no corresponding stave definition could be found in the document.');
                    }
                    if (currentStaveInfo.showClefCheck()) {
                        stave.addClefFromInfo(currentStaveInfo.getClef());
                    }
                    clefOffsets[stave_n] = stave.getModifierXShift();
                    maxClefOffset = Math.max(maxClefOffset, clefOffsets[stave_n]);
                }
            }

            // second run: add key signatures; if the clefOffset of a stave is less than
            // maxClefOffset, add padding to the left of the key signature. Get each
            // stave's keySigOffset and calculate the maxKeySigOffset.
            j = staves.length;
            for (i = 0; i < j; i++) {
                stave = staves[i];
                if (stave) {
                    if (clefOffsets[i] !== maxClefOffset) {
                        padding = maxClefOffset - clefOffsets[i] + 10;
                    } else {
                        padding = null;
                    }
                    currentStaveInfo = me.systemInfo.getStaveInfo(i);
                    if (currentStaveInfo.showKeysigCheck()) {
                        stave.addKeySpecFromInfo(currentStaveInfo.getKeySpec(), padding);
                    }
                    keySigOffsets[i] = stave.getModifierXShift();
                    maxKeySigOffset = Math.max(maxKeySigOffset, keySigOffsets[i]);
                }
            }

            // third run: add time signatures; if the keySigOffset of a stave is
            // less than maxKeySigOffset, add padding to the left of the time signature.
            for (i = 0; i < j; i++) {
                stave = staves[i];
                if (stave) {
                    if (keySigOffsets[i] !== maxKeySigOffset) {
                        padding = maxKeySigOffset - keySigOffsets[i] + 15;
                    } else {
                        padding = null;
                    }
                    currentStaveInfo = me.systemInfo.getStaveInfo(i);
                    if (currentStaveInfo.showTimesigCheck()) {
                        stave.addTimeSpecFromInfo(currentStaveInfo.getTimeSpec(), padding);
                    }
                }
            }

            return staves;
        },

        /**
         * Processes a single stave in a measure
         *
         * @method processStaveEvents
         * @param {Vex.Flow.Stave[]} staves the stave objects in the current
         * measure
         * @param {Element} staveElement the MEI staff element
         * @param {Number} measureIndex the index of the current measure
         * @param {MEI2VF.StaveVoices} currentStaveVoices The current StaveVoices
         * object
         * @param {EventContext} eventContext the context shared by the current events
         */
        processStaveEvents: function (staves, staveElement, measureIndex, currentStaveVoices, eventContext) {
            var me = this, stave, stave_n, layerElements, i, j, vexNotes, staveInfo;

            stave_n = parseInt(staveElement.getAttribute('n'), 10) || 1;
            stave = staves[stave_n];

            eventContext.startNewStave(stave, stave_n);

            staveInfo = me.systemInfo.getStaveInfo(stave_n);
            var meter = staveInfo.getTimeSpec();

            layerElements = staveElement.getElementsByTagName('layer');

            for (i = 0, j = layerElements.length; i < j; i++) {
                eventContext.setLayerDir((j > 1) ?
                    (i === 0 ? VF.StaveNote.STEM_UP : i === j - 1 ? VF.StaveNote.STEM_DOWN : null) : null);
                me.resolveUnresolvedTimestamps(layerElements[i], stave_n, measureIndex, meter);
                staveInfo.checkInitialClef();

                vexNotes = me.processNoteLikeChildren(eventContext, layerElements[i], staveInfo);
                currentStaveVoices.addVoice(me.createVexVoice(vexNotes, meter), stave_n);
            }

            var anchoredTexts = staveElement.getElementsByTagName('anchoredText');
            for (i = 0, j = anchoredTexts.length; i < j; i++) {
                me.processAnchoredText(eventContext, anchoredTexts[i]);
            }

            // if there is a clef not yet attached to a note (i.e. the last clef), add it as a stave end modifier
            if (eventContext.clefChangeInfo) {
                stave.addEndClefFromInfo(eventContext.clefChangeInfo);
                eventContext.setClefChangeInfo(null);
            }

            staveInfo.finalizeClefInfo();

        },

        /**
         * Creates a new Vex.Flow.Voice
         * @method createVexVoice
         * @param {Array} voiceContents The contents of the voice, an array of
         * tickables
         * @param {Object} meter The meter of the enclosing staff element
         * return {Vex.Flow.Voice}
         */
        createVexVoice: function (voiceContents, meter) {
            var me = this, voice;
            if (!Array.isArray(voiceContents)) {
                throw new RuntimeError('me.createVexVoice() voice_contents argument must be an array.');
            }
            voice = new VF.Voice({
                num_beats: meter.count, beat_value: meter.unit, resolution: VF.RESOLUTION
            });
            voice.setStrict(false);
            voice.addTickables(voiceContents);
            return voice;
        },

        /**
         * @method resolveUnresolvedTimestamps
         */
        resolveUnresolvedTimestamps: function (layer, stave_n, measureIndex, meter) {
            var me = this, refLocationIndex, i, j, unresolvedTStamp2;
            // check if there's an unresolved TStamp2 reference to this location
            // (measure, staff, layer):
            stave_n = stave_n || 1;
            refLocationIndex = measureIndex + ':' + stave_n + ':' + (parseInt(layer.getAttribute('n'), 10) || '1');
            unresolvedTStamp2 = me.unresolvedTStamp2[refLocationIndex];
            if (unresolvedTStamp2) {
                for (i = 0, j = unresolvedTStamp2.length; i < j; i++) {
                    unresolvedTStamp2[i].setContext({
                        layer: layer, meter: meter
                    });
                    // TODO: remove eventLink from the list
                    unresolvedTStamp2[i] = null;
                }
                // at this point all references should be supplied with context.
                me.unresolvedTStamp2[refLocationIndex] = null;
            }
        },

        processNoteLikeChildren: function (eventContext, element, staveInfo) {
            var me = this, vexNotes = [], k, l, processingResults;

            var childElements = element.childNodes;
            for (k = 0, l = childElements.length; k < l; k++) {
                if (childElements[k].nodeType === 1) {
                    processingResults = me.processNoteLikeElement(eventContext, childElements[k], staveInfo);
                    if (processingResults) {
                        if (Array.isArray(processingResults)) {
                            vexNotes = vexNotes.concat(processingResults);
                        } else {
                            vexNotes.push(processingResults);
                        }
                    }
                }
            }
            return vexNotes;
        },

        /**
         * processes a note-like element by calling the adequate processing
         * function
         *
         * @method processNoteLikeElement
         * @param {Object} eventContext the layer context object
         * @param {Element} element the MEI element
         * @param {StaveInfo} staveInfo
         */
        processNoteLikeElement: function (eventContext, element, staveInfo) {
            var me = this;
            switch (element.localName) {
                case 'rest' :
                    return me.processRest(eventContext, element, staveInfo);
                case 'mRest' :
                    return me.processMRest(eventContext, element, staveInfo);
                case 'space' :
                    return me.processSpace(eventContext, element);
                case 'note' :
                    return me.processNote(eventContext, element, staveInfo);
                case 'beam' :
                    return me.processBeam(eventContext, element, staveInfo);
                case 'tuplet' :
                    return me.processTuplet(eventContext, element, staveInfo);
                case 'chord' :
                    return me.processChord(eventContext, element, staveInfo);
                case 'clef' :
                    return me.processClef(eventContext, element, staveInfo);
                case 'bTrem' :
                    return me.processBTrem(eventContext, element, staveInfo);
                //case 'anchoredText' :
                //  me.processAnchoredText(eventContext, element);
                //  return;
                default :
                    Logger.info('Not supported', 'Element "' + element.localName + '" is not supported. Ignoring element.');
            }
        },

        processAnchoredText: function (eventContext, element) {
        },

        /**
         * @method processNote
         */
        processNote: function (eventContext, element, staveInfo) {
            var me = this, xml_id, mei_tie, mei_slur, atts, note_opts, note, clef, vexPitch, stave, otherStave;

            atts = Util.attsToObj(element);

            mei_tie = atts.tie;
            mei_slur = atts.slur;

            xml_id = MeiLib.XMLID(element);

            atts.staff = parseInt(atts.staff);

            try {

                vexPitch = EventUtil.getVexPitch(element);

                if (atts.staff) {
                    otherStave = me.allVexMeasureStaves[me.allVexMeasureStaves.length - 1][atts.staff];
                    if (otherStave) {
                        stave = otherStave;
                        clef = me.systemInfo.getClef(atts.staff);
                    } else {
                        Logger.warn('Staff not found', 'No stave could be found which corresponds to @staff="' + atts.staff +
                        '" specified in ' + Util.serializeElement(element) +
                        '". Adding note to current stave.');
                    }
                }

                if (!clef) clef = staveInfo.getClef();
                if (!stave) stave = eventContext.getStave();

                note_opts = {
                    vexPitch: vexPitch,
                    clef: clef,
                    element: element,
                    atts: atts,
                    stave: stave,
                    layerDir: eventContext.getLayerDir()
                };

                note = (atts.grace) ? new GraceNote(note_opts) : new Note(note_opts);

                if (otherStave) {
                    eventContext.addToClefCheckQueue(note);
                }

                if (note.hasMeiStemDir && eventContext.isInBeam()) {
                    eventContext.setStemDirInBeam(true);
                }

                me.processSyllables(note, element, eventContext.stave_n);


                //        // FIXME For now, we'll remove any child nodes of <note>
                //        while (element.firstChild) {
                //          element.removeChild(element.firstChild);
                //        }

                if (mei_tie) {
                    me.processAttrTie(mei_tie, xml_id, vexPitch, atts.staff || eventContext.stave_n);
                }
                if (mei_slur) {
                    me.processSlurAttribute(mei_slur, xml_id);
                }

                eventContext.addEvent(xml_id, {
                    meiNote: element, vexNote: note
                });

                if (eventContext.clefChangeInfo) {
                    EventUtil.addClefModifier(note, eventContext.clefChangeInfo);
                    eventContext.setClefChangeInfo(null);
                }

                if (atts.grace) {
                    eventContext.graceNoteQueue.push(note);
                    return;
                } else {
                    if (eventContext.graceNoteQueue.length > 0) {
                        note.addModifier(0, new VF.GraceNoteGroup(eventContext.graceNoteQueue, false).beamNotes());
                        eventContext.graceNoteQueue = [];
                    }
                }
                return note;

            } catch (e) {
                throw new RuntimeError('An error occurred processing ' + Util.serializeElement(element) + ': "' + e.toString());
            }
        },

        /**
         * @method processChord
         */
        processChord: function (eventContext, element, staveInfo) {
            var me = this, noteElements, xml_id, chord, chord_opts, atts, i, j, mei_slur, clef, stave, otherStave;

            noteElements = element.getElementsByTagName('note');

            atts = Util.attsToObj(element);

            mei_slur = atts.slur;

            xml_id = MeiLib.XMLID(element);

            atts.staff = parseInt(atts.staff);

            try {

                if (atts.staff) {
                    otherStave = me.allVexMeasureStaves[me.allVexMeasureStaves.length - 1][atts.staff];
                    if (otherStave) {
                        stave = otherStave;

                        // TODO take clef changes in a stave into account. It might be necessary to calculate the
                        // actual clef to use if there is a clef change in the measure
                        clef = me.systemInfo.getClef(atts.staff);
                    } else {
                        Logger.warn('Staff not found', 'No stave could be found which corresponds to @staff="' + atts.staff +
                        '" specified in ' + Util.serializeElement(element) +
                        '". Adding note to current stave.');
                    }
                }

                if (!clef) clef = staveInfo.getClef();
                if (!stave) stave = eventContext.getStave();


                chord_opts = {
                    noteElements: noteElements,
                    clef: clef,
                    stave: stave,
                    element: element,
                    atts: atts,
                    layerDir: eventContext.getLayerDir()
                };

                chord = (atts.grace) ? new GraceChord(chord_opts) : new Chord(chord_opts);

                if (otherStave) {
                    eventContext.addToClefCheckQueue(chord);
                }

                if (chord.hasMeiStemDir && eventContext.isInBeam()) {
                    eventContext.setStemDirInBeam(true);
                }

                var allNoteIndices = [];

                for (i = 0, j = noteElements.length; i < j; i++) {
                    me.processNoteInChord(eventContext, i, noteElements[i], element, chord);
                    allNoteIndices.push(i);
                }

                // TODO tie attribute on chord should render a tie on each note
                if (atts.tie) {
                    me.processAttrTie(atts.tie, xml_id, null, atts.staff || eventContext.stave_n);
                }
                if (mei_slur) {
                    me.processSlurAttribute(mei_slur, xml_id);
                }

                eventContext.addEvent(xml_id, {
                    meiNote: element, vexNote: chord, index: allNoteIndices
                });

                if (eventContext.clefChangeInfo) {
                    EventUtil.addClefModifier(chord, eventContext.clefChangeInfo);
                    eventContext.setClefChangeInfo(null);
                }

                if (atts.grace) {
                    eventContext.graceNoteQueue.push(chord);
                    return;
                } else {
                    if (eventContext.graceNoteQueue.length > 0) {
                        chord.addModifier(0, new VF.GraceNoteGroup(eventContext.graceNoteQueue, false).beamNotes());
                        eventContext.graceNoteQueue = [];
                    }
                }
                return chord;
            } catch (e) {
                var xmlString = Util.serializeElement(element);
                for (i = 0, j = noteElements.length; i < j; i++) {
                    xmlString += '\n    ' + Util.serializeElement(noteElements[i]);
                }
                throw new RuntimeError('A problem occurred processing \n' + xmlString + '\n</chord>\n: ' + e.toString());
            }
        },

        /**
         * @method processNoteInChord
         */
        processNoteInChord: function (eventContext, chordIndex, element, chordElement, chord) {
            var me = this, i, j, atts, xml_id;

            atts = Util.attsToObj(element);

            var vexPitch = EventUtil.getVexPitch(element);

            xml_id = MeiLib.XMLID(element);

            if (atts.tie) {
                me.processAttrTie(atts.tie, xml_id, vexPitch, parseInt(atts.staff) || eventContext.stave_n);
            }
            if (atts.slur) {
                me.processSlurAttribute(atts.slur, xml_id);
            }

            eventContext.addEvent(xml_id, {
                meiNote: chordElement, vexNote: chord, index: [chordIndex]
            });

            var childNodes = element.childNodes;
            for (i = 0, j = childNodes.length; i < j; i++) {
                switch (childNodes[i].localName) {
                    case 'accid':
                        atts.accid = childNodes[i].getAttribute('accid');
                        break;
                    case 'artic':
                        EventUtil.addArticulation(chord, childNodes[i]);
                        break;
                    default:
                        break;
                }
            }

            if (atts.accid) {
                EventUtil.processAttrAccid(atts.accid, chord, chordIndex);
            }
            if (atts.fermata) {
                EventUtil.addFermata(chord, element, atts.fermata, chordIndex);
            }
        },

        /**
         * @method processRest
         */
        processRest: function (eventContext, element, staveInfo) {
            var rest, xml_id;
            try {

                rest = new Rest({
                    element: element,
                    stave: eventContext.getStave(),
                    clef: (element.hasAttribute('ploc') && element.hasAttribute('oloc')) ? staveInfo.getClef() : null
                });

                xml_id = MeiLib.XMLID(element);

                if (eventContext.clefChangeInfo) {
                    EventUtil.addClefModifier(rest, eventContext.clefChangeInfo);
                    eventContext.setClefChangeInfo(null);
                }

                if (eventContext.graceNoteQueue.length > 0) {
                    rest.addModifier(0, new VF.GraceNoteGroup(eventContext.graceNoteQueue, false).beamNotes());
                    eventContext.graceNoteQueue = [];
                }


                eventContext.addEvent(xml_id, {
                    meiNote: element, vexNote: rest
                });
                return rest;
            } catch (e) {
                throw new RuntimeError('An error occurred processing ' + Util.serializeElement(element) + ': "' + e.toString());
            }
        },

        /**
         * @method processMRest
         */
        processMRest: function (eventContext, element, staveInfo) {
            var mRest, xml_id;

            try {
                var mRestOpts = {
                    meter: staveInfo.getTimeSpec(),
                    element: element,
                    stave: eventContext.getStave(),
                    clef: (element.hasAttribute('ploc') && element.hasAttribute('oloc')) ? staveInfo.getClef() : null
                };

                mRest = new MRest(mRestOpts);

                xml_id = MeiLib.XMLID(element);

                if (eventContext.graceNoteQueue.length > 0) {
                    mRest.addModifier(0, new VF.GraceNoteGroup(eventContext.graceNoteQueue, false).beamNotes());
                    eventContext.graceNoteQueue = [];
                }

                eventContext.addEvent(xml_id, {
                    meiNote: element, vexNote: mRest
                });
                return mRest;
            } catch (e) {
                throw new RuntimeError('An error occurred processing ' + Util.serializeElement(element) + ': "' + e.toString());
            }
        },

        /**
         * @method processSpace
         */
        processSpace: function (eventContext, element) {
            var space = null;
            if (element.hasAttribute('dur')) {
                try {
                    space = new Space({element: element, stave: eventContext.getStave()});

                    if (eventContext.isInBeam()) {
                        eventContext.setSpaceInBeam(true);
                    }

                    if (eventContext.graceNoteQueue.length > 0) {
                        space.addModifier(0, new VF.GraceNoteGroup(eventContext.graceNoteQueue, false).beamNotes());
                        eventContext.graceNoteQueue = [];
                    }

                } catch (e) {
                    throw new RuntimeError('An error occurred processing ' + Util.serializeElement(element) + ': "' +
                    e.toString());
                }
            } else {
                Logger.info('@dur expected', 'No duration attribute in ' + Util.serializeElement(element) +
                '". Ignoring element.');
            }
            return space;
        },

        /**
         * @method processClef
         * @param {Object} eventContext the layer context object
         * @param {Element} element the MEI clef element
         * @param {StaveInfo} staveInfo

         */
        processClef: function (eventContext, element, staveInfo) {
            eventContext.setClefChangeInfo(staveInfo.clefChangeInMeasure(element));
        },

        /**
         * @method processBTrem
         * @param {Object} eventContext the layer context object
         * @param {Element} element the MEI bTrem element
         * @param {StaveInfo} staveInfo
         */
        processBTrem: function (eventContext, element, staveInfo) {
            var me = this;

            Logger.info('Not implemented', 'Element <bTrem> not implemented. Processing child nodes.');

            return me.processNoteLikeChildren(eventContext, element, staveInfo);

        },

        /**
         * @method processBeam
         * @param {Object} eventContext the layer context object
         * @param {Element} element the MEI beam element
         * @param {StaveInfo} staveInfo
         */
        processBeam: function (eventContext, element, staveInfo) {
            var me = this, vexNotes, filteredVexNotes, i, j, otherBeamNotes;
            eventContext.enterBeam();

            vexNotes = me.processNoteLikeChildren(eventContext, element, staveInfo);

            if (eventContext.getSpaceInBeam() === true) {
                otherBeamNotes = eventContext.shiftBeamInfoToResolve();
                if (otherBeamNotes !== undefined) {
                    var combinedVexNotes = [];
                    j = vexNotes.length;
                    if (j !== otherBeamNotes.vexNotes.length) {
                        Logger.warn('Beam content mismatch', Util.serializeElement(element) + ' and ' +
                        Util.serializeElement(otherBeamNotes.element) +
                        ' could not be combined, because their content does not match.');
                    }
                    for (i = 0; i < j; i++) {
                        if (vexNotes[i] instanceof Space) {
                            combinedVexNotes.push(otherBeamNotes.vexNotes[i]);
                        } else {
                            combinedVexNotes.push(vexNotes[i]);
                        }
                    }
                    filteredVexNotes = combinedVexNotes.filter(function (element) {
                        return element && element.beamable === true;
                    });

                } else {
                    eventContext.addBeamInfoToResolve(element, vexNotes);
                }

            } else {
                filteredVexNotes = vexNotes.filter(function (element) {
                    return element.beamable === true;
                });
            }

            if (filteredVexNotes && filteredVexNotes.length > 1) {
                try {
                    // set autostem parameter of VF.Beam to true if neither layerDir nor any stem direction in the beam is specified
                    me.beams.addVexObject(new VF.Beam(filteredVexNotes, !eventContext.getLayerDir() &&
                    eventContext.getStemDirInBeam() === false));
                } catch (e) {
                    Logger.error('VexFlow Error', 'An error occurred processing ' + Util.serializeElement(element) + ': "' +
                    e.toString() + '". Ignoring beam.');
                }
            }

            eventContext.exitBeam();

            return vexNotes;
        },

        /**
         * Processes an MEI <b>tuplet</b>.
         * Supported attributes:
         *
         * - num (3 if not specified)
         * - numbase (2 if not specified)
         * - num.format ('count' if not specified)
         * - bracket.visible (auto if not specified)
         * - bracket.place (auto if not specified)
         *
         * @method processTuplet
         * @param {Object} eventContext the layer context object
         * @param {Element} element the MEI tuplet element
         * @param {MEI2VF.StaveInfo} staveInfo the stave info object
         */
        processTuplet: function (eventContext, element, staveInfo) {
            var me = this, vexNotes, tuplet, bracketPlace;

            vexNotes = me.processNoteLikeChildren(eventContext, element, staveInfo);

            if (vexNotes.length === 0) {
                Logger.warn('Missing content', 'Not content found in ' + Util.serializeElement(element) +
                '". Ignoring tuplet.');
                return;
            }

            tuplet = new VF.Tuplet(vexNotes, {
                num_notes: parseInt(element.getAttribute('num'), 10) || 3,
                beats_occupied: parseInt(element.getAttribute('numbase'), 10) || 2
            });

            if (element.getAttribute('num.format') === 'ratio') {
                tuplet.setRatioed(true);
            }

            tuplet.setBracketed(element.getAttribute('bracket.visible') === 'true');

            bracketPlace = element.getAttribute('bracket.place');
            if (bracketPlace) {
                tuplet.setTupletLocation((bracketPlace === 'above') ? 1 : -1);
            }

            me.tuplets.addVexObject(tuplet);
            return vexNotes;
        },

        /**
         * @method processAttrTie
         */
        processAttrTie: function (mei_tie, xml_id, vexPitch, stave_n) {
            var me = this, i, j;
            for (i = 0, j = mei_tie.length; i < j; ++i) {
                if (mei_tie[i] === 't' || mei_tie[i] === 'm') {
                    me.ties.terminateTie(xml_id, {
                        vexPitch: vexPitch, stave_n: stave_n
                    });
                }
                if (mei_tie[i] === 'i' || mei_tie[i] === 'm') {
                    me.ties.startTie(xml_id, {
                        vexPitch: vexPitch, stave_n: stave_n
                    });
                }
            }
        },

        /**
         * @method processSlurAttribute
         */
        processSlurAttribute: function (mei_slur, xml_id) {
            var me = this, tokens, token, i, j;
            if (mei_slur) {
                // create a list of { letter, num }
                tokens = me.parseSlurAttribute(mei_slur);
                for (i = 0, j = tokens.length; i < j; i++) {
                    token = tokens[i];
                    if (token.letter === 't') {
                        me.slurs.terminateSlur(xml_id, {
                            nesting_level: token.nesting_level
                        });
                    }
                    if (token.letter === 'i') {
                        me.slurs.startSlur(xml_id, {
                            nesting_level: token.nesting_level
                        });
                    }
                }
            }
        },

        /**
         * @method parseSlurAttribute
         */
        parseSlurAttribute: function (slur_str) {
            var result = [], numbered_tokens, numbered_token, i, j, num;
            numbered_tokens = slur_str.split(' ');
            for (i = 0, j = numbered_tokens.length; i < j; i += 1) {
                numbered_token = numbered_tokens[i];
                if (numbered_token.length === 1) {
                    result.push({
                        letter: numbered_token, nesting_level: 0
                    });
                } else if (numbered_token.length === 2) {
                    num = +numbered_token[1];
                    if (!num) {
                        throw new RuntimeError('badly formed slur attribute');
                    }
                    result.push({
                        letter: numbered_token[0], nesting_level: num
                    });
                } else {
                    throw new RuntimeError('badly formed slur attribute');
                }
            }
            return result;
        },

        /**
         * @method processSyllables
         */
        processSyllables: function (note, element, stave_n) {
            var me = this, i, j, syllables, vexSyllable;
            syllables = element.getElementsByTagName('syl');
            if (element.hasAttribute('syl')) {
                vexSyllable = new Syllable(element.getAttribute('syl').replace(/\s+/g, ' '), element, me.cfg.lyricsFont);
                note.addAnnotation(0, vexSyllable);
                me.page.getSystems()[me.currentSystem_n].verses.addSyllable(vexSyllable, element, stave_n);
            }
            for (i = 0, j = syllables.length; i < j; i++) {
                vexSyllable = new Syllable(Util.getNormalizedText(syllables[i]), syllables[i], me.cfg.lyricsFont);
                note.addAnnotation(0, vexSyllable);
                me.page.getSystems()[me.currentSystem_n].verses.addSyllable(vexSyllable, syllables[i], stave_n);
            }
        }

    };
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

  /**
   * @exports mei2text/Text
   */

  var Text = function (meiElement, opts, overrideOpts, customText, meiNodeMatch) {
    this.init(meiElement, opts, overrideOpts, customText, meiNodeMatch);
  };

  Text.prototype = {

    init : function (meiElement, opts, overrideOpts, customText, meiNodeMatch) {
      var me = this, atts;

      me.meiElement = meiElement;
      me.meiNodeMatch = meiNodeMatch;
      atts = (overrideOpts) ? opts : $.extend({}, opts, Util.attsToObj(meiElement));
      me.x = +atts.x;
      me.y = +atts.y;

      me.h = +atts.fontsize;
      me.textAlign = atts.halign || 'left';
      me.text = (customText === undefined) ? $(meiElement).text() : customText;

      me.atts = atts;
    },

    setX : function (x) {
      this.x = x;
    },

    setY : function (y) {
      this.y = y;
    },

    setContainer : function (container) {
      this.container = container;
    },

    getContainer : function () {
      return this.container;
    },

    setTextAlign : function (textAlign) {
      this.textAlign = textAlign;
    },

    getArea : function () {
      var me = this;

      return {
        x : me.x - 6,
        y : me.y - me.h,
        w : me.w + 12,
        h : me.h + 8,
        x1 : me.x + me.w + 6,
        y1 : me.y + 8,
        meiElement : me.meiElement,
        meiNodeMatch : me.meiNodeMatch,
        xmlid : null
      };
    },

    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    preProcess : function () {
      var me = this, ctx = me.ctx, atts = me.atts;

      me.h = atts.fontsize * 2;

      this.font = atts.fontstyle + ' ' + atts.fontweight + ' ' + (me.h) + 'px ' + atts.fontfamily;
      ctx.font = this.font;
      me.w = ctx.measureText(me.text).width;
      return this;
    },

    draw : function () {
      var me = this;
      me.ctx.textAlign = me.textAlign;
      me.ctx.font = me.font;
      me.ctx.fillText(me.text, me.x, me.y);
    }

  };
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

  /**
   * @exports mei2text/AnchoredTexts
   */

  /**
   * @class MEI2TEXT.AnchoredTexts
   * @private
   *
   * @constructor
   */
  var AnchoredTexts = function (font) {
    var me = this;

    me.font = font;

    me.allTexts = [];
  };

  AnchoredTexts.prototype = {

    getAll : function () {
      return this.allTexts;
    },

    /**
     * Creates a model object from an element and adds it to {@link #allTexts}
     * @param {Element} element
     * @stave {Stave} stave
     */
    addText : function (element, stave) {
      var me = this;
      var text = new Text(element, {
        fontfamily : me.font.family,
        fontweight : me.font.weight,
        fontsize : me.font.size,
        fontstyle : ''
      });
      text.setContainer (stave);
      me.allTexts.push(text);
    },

    /**
     * Gets an element's first ancestor with the specified localName
     * @param {Element} element the start element
     * @param {String} localName the localName of the ancestor
     * @returns {Element}
     */
    getAncestor : function (element, localName) {
      while (( element = element.parentElement) && (element.localName !== localName)) {}
      return element;
    },

    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    draw : function () {
      var me = this, stave, ctx = me.ctx, i, j, text;

      for (i=0,j=me.allTexts.length;i<j;i++) {
        text = me.allTexts[i];

        if (!text.y) {
          stave = text.getContainer();
          text.setY(stave.getYForLine(3) - 4 + (+text.atts.vo * stave.getSpacingBetweenLines() / 2 || 0));
        }
        if (!text.x) {
          if (!stave) {
            stave = text.getContainer();
          }
          text.setX(stave.getGlyphStartX() + (+text.atts.ho * stave.getSpacingBetweenLines() / 2 || 0));
        }

        text.setContext(ctx).preProcess().draw();
      }
    }
  };
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

  /**
   * @exports mei2text/MeasureNumbers
   */

  /**
   * @class MEI2TEXT.MeasureNumbers
   * @private
   *
   * @constructor
   */
  var MeasureNumbers = function (font) {
    this.font = font;
  };

  MeasureNumbers.prototype = {

    addToSystemStarts : function (systems) {
      var me = this, i, measure, stave, volta, n;
      i = systems.length;
      while (i--) {
        measure = systems[i].getMeasure(0);
        stave = measure.getFirstDefinedStave();
        if (measure && stave) {
          n = measure.getNAttr();

          // don't render measure numbers 0 and 1
          if (parseInt(n, 10) > 1) {
            volta = me.getStaveVolta(stave.modifiers);
            if (volta) volta.setShiftY(volta.y_shift - me.font.size);

            stave.setMeasure(n).font = me.font;
          }
        }
      }
    },

    getStaveVolta : function (staveModifiers) {
      var i, j;
      for (i=2,j=staveModifiers.length;i<j;i++) {
        if (staveModifiers[i] instanceof VF.Volta) {
          return staveModifiers[i];
        }
      }
    }
  };
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

  /**
   * @exports mei2text/PgHead
   */

  /**
   * @class PgHead
   * @private
   *
   * @constructor
   */
  var PgHead = function (element, scale) {
    this.init(element, scale);
  };

  PgHead.prototype = {

    init : function (scale) {
      var me = this;

      me.scale = scale;
      me.defaultFontSize = 12;
      me.lineHeight = 1.3;

      // TODO treat rend[@align]s like floating HTML divs
      /**
       * Contains the MSV.Text objects ordered by line number. Each descendant text node
       * of the pgHead element is stored in its own Text object
       * @type {Text[][]}
       */
      me.textsByLine = [
        []
      ];
      me.line_n = 0;

      /**
       * Current coordinates
       * @type {{x: *, y: *, w: *}}
       */
      me.currentCoords = {};

    },

    processElement : function (element) {
      var me  = this;
      me.htmlToArray(element, {
        fontsize : me.defaultFontSize,
        fontweight : '',
        fontstyle : '',
        fontfamily : 'Times'
      });
      me.calculateHeight();
    },

    calculateHeight : function () {
      var me = this, maxFontSizeInLine, i, j, k, l, textLine, text, totalHeight = 0;
      for (i = 0, j = me.textsByLine.length; i < j; i++) {
        textLine = me.textsByLine[i];
        maxFontSizeInLine = 0;
        for (k = 0, l = textLine.length; k < l; k++) {
          text = textLine[k];
          text.h = text.atts.fontsize * 2;
          maxFontSizeInLine = Math.max(text.h, maxFontSizeInLine);
        }
        totalHeight += maxFontSizeInLine * me.lineHeight;
      }
      me.height = totalHeight;
    },

    setStartXY : function (x, y) {
      this.currentCoords.x = x;
      this.currentCoords.y = y;
    },

    setWidth : function (width) {
      this.currentCoords.w = width;
    },

    getLowestY : function () {
      return this.currentCoords.y + this.height;
    },

    getTextsByLine : function () {
      return this.textsByLine;
    },

    htmlToArray : function (element, opts) {
      var me = this, atts, defaults, text, i, j, childNodes, nodeMatch;

      childNodes = element.childNodes;

      for (i = 0, j = childNodes.length; i < j; i++) {

        if (childNodes[i].nodeName === '#text') {
          text = childNodes[i].textContent.replace(/([\n|\r]+\s*)/g, ' ');
          if (text) {
            // MSV.Text always expects an element as the first argument; we pass
            // the parent element of the current text node. If the parent
            // element contains more than one child, a nodeMatch parameter is
            // added; this way, the text node in concern can laber be addressed
            // unambiguously by evaluating element and nodeMatch.
            nodeMatch = (j === 1) ? null : {type : 'child', value : i};
            me.textsByLine[me.line_n].push(new Text(element, opts, true, text, nodeMatch));
          }
        } else {
          switch (childNodes[i].localName) {
            case undefined :
              break;
            case 'lb' :
              me.breakLine();
              break;
            case 'title' :
              atts = Util.attsToObj(childNodes[i]);
              defaults = {
                halign : 'center'
              };
              me.htmlToArray(childNodes[i], $.extend({}, opts, defaults, atts));
              me.breakLine();
              break;
            default :
              atts = Util.attsToObj(childNodes[i]);
              me.htmlToArray(childNodes[i], $.extend({}, opts, atts));
              // FIXME handle line breaks differently
              if (atts.halign == 'center') {
                me.breakLine();
              }

          }
        }
      }
    },

    breakLine : function () {
      var me = this;
      me.line_n += 1;
      me.textsByLine[me.line_n] = [];
    },

    setContext : function (ctx) {
      this.ctx = ctx;
      return this;
    },

    draw : function () {
      var me = this, leftTexts, centerTexts, rightTexts, maxFontSizeInLine, i, j, k, l, textLine, text;

      var currentCoords = {
        x : me.currentCoords.x,
        y : me.currentCoords.y,
        w : me.currentCoords.w
      };

      for (i = 0, j = me.textsByLine.length; i < j; i++) {
        textLine = me.textsByLine[i];
        leftTexts = [];
        centerTexts = [];
        rightTexts = [];
        maxFontSizeInLine = 0;

        for (k = 0, l = textLine.length; k < l; k++) {
          text = textLine[k];
          text.setContext(me.ctx).preProcess(me.scale);
          text.setTextAlign('left');
          switch (text.atts.halign) {
            case 'center' :
              centerTexts.push(text);
              break;
            case 'right' :
              rightTexts.push(text);
              break;
            default :
              leftTexts.push(text);
          }
        }

        maxFontSizeInLine =
        Math.max(me.drawCenterTexts(centerTexts, currentCoords), me.drawRightAlignedTexts(rightTexts, currentCoords), me.drawLeftAlignedTexts(leftTexts, currentCoords));

        currentCoords.y += maxFontSizeInLine * me.lineHeight;

      }
    },

    drawCenterTexts : function (centerTexts, currentCoords) {
      var me = this, maxFontSize, totalTextWidth = 0, i;

      i = centerTexts.length;
      while (i--) {
        totalTextWidth += centerTexts[i].w;
      }

      maxFontSize = me.drawLeftAlignedTexts(centerTexts, {
        x : currentCoords.x + (currentCoords.w / 2) - (totalTextWidth / 2),
        y : currentCoords.y,
        w : currentCoords.w
      }, me.ctx);
      return maxFontSize;
    },

    drawRightAlignedTexts : function (rightTexts, currentCoords) {
      var maxH = 0, offsetX = 0, obj, i;
      i = rightTexts.length;
      while (i--) {
        obj = rightTexts[i];
        offsetX += obj.w;
        obj.setX(currentCoords.x + currentCoords.w - offsetX);
        obj.setY(currentCoords.y + obj.h);
        obj.draw();
        maxH = Math.max(obj.h, maxH);
      }
      return maxH;
    },

    drawLeftAlignedTexts : function (leftTexts, currentCoords) {
      var maxH = 0, offsetX = 0;
      $.each(leftTexts, function (i, obj) {
        obj.setX(currentCoords.x + offsetX);
        obj.setY(currentCoords.y + obj.h);
        obj.draw();
        offsetX += obj.w;
        maxH = Math.max(obj.h, maxH);
      });
      return maxH;
    }

  };
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


  var ExtendedConverter = function (config) {
    this.init();

    if (config) {
      this.initConfig(config);
    }
  };

  Vex.Inherit(ExtendedConverter, Converter, {

    init : function () {
      var me = this, defaults = me.defaults;
      /**
       * @cfg {Number} pageScale The page scale (set 1 for 100%, 0.5 for 50%
       * etc.)
       */
      defaults.pageScale = 1;
      /**
       * @cfg {Number} pageHeight The height of the page. Null for auto height
       */
      defaults.pageHeight = null;
      /**
       * @cfg {Boolean} autoMeasureNumbers Specifies if measure numbers should
       * automatically be added to each system start
       */
      defaults.autoMeasureNumbers = false;
      /**
       * @cfg {Object} measureNumberFont The measure number font
       * @cfg {String} measureNumberFont.family the font family
       * @cfg {Number} measureNumberFont.size the font size
       * @cfg {String} measureNumberFont.weight the font weight
       */
      defaults.measureNumberFont = {
        family : 'Times', size : 14, weight : 'Italic'
      };
      /**
       * @cfg {Object} anchoredTextFont The anchored text font
       * @cfg {String} anchoredTextFont.family the font family
       * @cfg {Number} anchoredTextFont.size the font size
       * @cfg {String} anchoredTextFont.weight the font weight
       */
      defaults.anchoredTextFont = {
        family : 'Times', size : 22, weight : ''
      };
      /**
       * @cfg (Boolean) processPgHead Specifies if pgHead elemements should be rendered
       */
      defaults.processPgHead = true;
      /**
       * @cfg (Object[]) preProcess XML document pre-processing options. Set falsy if pre-processing should be skipped completely.
       */

      Stave.prototype.lineColor = '#000000';
    },


    initConfig : function (cfg) {
      var me = this, pgHeadLowestY;
      ExtendedConverter.superclass.initConfig.call(me, cfg);

      if (me.cfg.processPgHead) {

        me.systemInfo.processPgHead = function (element) {
          if (!me.pgHead) {
            var printSpace = me.pageInfo.getPrintSpace();
            me.pgHead = new PgHead(me.cfg.pageScale);
            me.pgHead.processElement(element);
            me.pgHead.setStartXY(printSpace.left, me.pageInfo.pageTopMar + 90); // increase top padding for header
            pgHeadLowestY = me.pgHead.getLowestY();
            if (pgHeadLowestY) {
              // round the y value in order to prevent blurred staff lines on the canvas
              printSpace.top = Math.ceil(pgHeadLowestY) + 30;
            }
          }
        };

        me.systemInfo.processPgFoot = function (element) {
          if (!me.pgFoot) {
            me.pgFoot = new PgHead(me.cfg.pageScale);
            me.pgFoot.processElement(element);
          }
        };

      }
    },

    process : function (xmlDoc) {
      var me = this;
      ExtendedConverter.superclass.process.call(me, xmlDoc);
      if (me.cfg.autoMeasureNumbers) {
        me.measureNumbers.addToSystemStarts(me.getSystems());
      }
    },

    format: function (ctx) {
      var me = this, printSpace = me.pageInfo.getPrintSpace();
      ExtendedConverter.superclass.format.call(me, ctx);
      if (me.pgHead) {
        me.pgHead.setWidth(printSpace.width);
      }
      if (me.pgFoot) {
        me.pgFoot.setStartXY(printSpace.left, me.pageInfo.getLowestY() + 80);
        me.pageInfo.setLowestY(me.pgFoot.getLowestY() + me.pageInfo.pageBottomMar);
        me.pgFoot.setWidth(printSpace.width);
      }
    },

    reset : function () {
      var me = this;
      ExtendedConverter.superclass.reset.call(me);
      me.measureNumbers = new MeasureNumbers(me.cfg.measureNumberFont);
      me.anchoredTexts = new AnchoredTexts(me.cfg.anchoredTextFont);
    },

      processAnchoredText : function (eventContext, element) {
          this.anchoredTexts.addText(element, eventContext.stave);
      },




    //processAnchoredText : function (element, stave, stave_n, layerDir, staveInfo) {
    //  this.anchoredTexts.addText(element, stave, stave_n, layerDir, staveInfo);
    //},


    draw : function (ctx) {
      var me = this;

      ExtendedConverter.superclass.draw.call(me, ctx);
      if (me.pgHead) {
        me.pgHead.setContext(ctx).draw();
      }
      if (me.pgFoot) {
        me.pgFoot.setContext(ctx).draw();
      }
      me.anchoredTexts.setContext(ctx).draw();
    }

  });
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

  /**
   * @exports core/Document
   */

  /**
   * @class MSV.Document
   * @singleton
   */
  var Document = {

    /**
     * initializes an xml document; if a string is passed, it gets parsed
     *
     * @param {String|XMLDocument} xmlDoc the input string / input XML document
     * object. If you pass a document object, be sure that it is an XMLDocument, not
     * an HTMLDocument.
     * @return {XMLDocument} the xml document to be rendered
     */
    initXmlDoc : function (xmlDoc) {
      return (typeof xmlDoc === 'string') ? this.parseXML(xmlDoc) : (xmlDoc[0] || xmlDoc);
    },

    parseXML : function (str) {
      var xmlDoc, parser;
      if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(str, "text/xml");
      } else // Internet Explorer
      {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(str);
      }
      return xmlDoc;
    },

    /**
     * Gets the MEI page config from a scoreDef element.
     * @param {Element} scoreDef The scoreDef element.
     * @return {Object} the config object
     */
    getMEIPageConfig : function (scoreDef) {
      var obj = Util.attsToObj(scoreDef);
      var convert = function (input) {
        return (isNaN(input) || input.length === 0) ? undefined : +input;
      };
      return {
        pageScale : parseInt(obj['page.scale'], 10) / 100 || undefined,
        pageHeight : convert(obj['page.height']),
        pageWidth : convert(obj['page.width']),
        pageTopMar : convert(obj['page.topmar']),
        pageLeftMar : convert(obj['page.leftmar']),
        pageRightMar : convert(obj['page.rightmar'])
      };
    }
  };
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

  /**
   * @exports core/UI
   */

  /**
   * @class UI
   */
  var UI = function () {
    this.init();
  };

  UI.prototype = {

    init : function () {
      var me = this;
      me.mouseClickHandlers = [];
      me.mouseMoveHandlers = [];
      me.vexLayerIndex = null;
    },

    setSize : function (height, width, scale) {

      var me = this, i, j, scaledHeight, scaledWidth, canvas;

      me.scale = scale;

      scaledHeight = height * scale;
      scaledWidth = width * scale;

      me.outerDiv.style.marginLeft = (scaledWidth / 2) + 'px';
      me.outerDiv.style.marginRight = (scaledWidth / 2) + 'px';

      me.innerDiv.style.height = scaledHeight + 'px';
      me.innerDiv.style.left = (-scaledWidth / 2) + 'px';

      j = me.layers.length;
      for (i = 0; i < j; i++) {

          canvas = me.layers[i].element;

          if (canvas.localName === 'canvas') {

              canvas.width = scaledWidth;
              canvas.height = scaledHeight;
              if (typeof me.layers[i].setContext === 'function') {
                  var ctx = canvas.getContext('2d');
                  me.layers[i].setContext(ctx);
                  me.layers[i].setScale(scale);
              }
              me.layers[i].ctx.scale(scale, scale);

          } else {
              var svgElement = me.layers[i].ctx.svg;
              me.layers[i].ctx.resize(scaledWidth, scaledHeight);
              me.layers[i].ctx.scale(scale, scale);
          }

      }
    },

    zoom : function (scale, drawFn, scope) {
      var me = this, canvas, ctx, i, j;

      for (i = 0, j = me.layers.length; i < j; i++) {
        canvas = me.layers[i].element;
        ctx = me.layers[i].ctx;
        ctx.scale(scale, scale);
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      me.scale *=scale;

      if (scope && typeof drawFn === 'function') {
        drawFn.call(scope, me.layers[me.vexLayerIndex].ctx);
      }


      //  var scaleFactor = 1.1;
      //  var zoom = function(clicks){
      //    var pt = ctx.transformedPoint(lastX,lastY);
      //    ctx.translate(pt.x,pt.y);
      //    var factor = Math.pow(scaleFactor,clicks);
      //    ctx.scale(factor,factor);
      //    ctx.translate(-pt.x,-pt.y);
      //    redraw();
      //  }

    },


    createLayers : function (cfg, scale) {
      var me = this, element, ctx, i, j, layers, hasVexLayer = false;

      me.scale = scale;

      // unwrap target if it's a jQuery object
      var target = cfg.target[0] || cfg.target;

      layers = cfg.layers;
      j = layers.length;

      while (j--) {
        if (layers[j].type === 'vex') hasVexLayer = true;
      }

      // add VexFlow layer if no VexFlow layer has been specified
      if (!hasVexLayer) {
        Logger.debug('UI.createLayers()', 'No VexFlow layer specified. Adding it.');
        layers.push({
          type : 'vex'
        });
      }

      me.outerDiv = me.createOuterDiv();
      me.outerDiv.appendChild(me.innerDiv = me.createInnerDiv());

      for (i = 0, j = layers.length; i < j; i++) {

        if (layers[i].type === 'vex') {
            element = me.createCanvas((cfg.backend === VF.Renderer.Backends.CANVAS) ? 'canvas':'div');
            me.innerDiv.appendChild(element);
          me.vexLayerIndex = i;
          ctx = me.createVexContext(element, cfg.backend);
          layers[i].element = element;
          layers[i].ctx = ctx;
        } else if (layers[i].type === 'highlighter') {
            element = me.createCanvas('canvas');
            me.innerDiv.appendChild(element);
          layers[i].setElement(element);
        } else {
          throw new RuntimeError('Layer type "' + layers[i].type + '" not valid.');
        }
      }

      target.appendChild(me.outerDiv);

      /**
       * @property {Object} topCanvas the top canvas containing the regular
       * MEI2VF output to which the mouse listeners get added.
       */
      me.topCanvas = layers[layers.length - 1].element;
      me.layers = layers;
      return layers;
    },

    /**
     * Creates a single canvas element or element container
     * @param {String} elementName the name of the element to create; 'canvas' for
     * HTML5 canvases, 'div' for a SVG canvas container
     * @returns {HTMLElement}
     */
    createCanvas : function (elementName) {
      var canvas = document.createElement(elementName);
      canvas.style.position = 'absolute';
      canvas.style.background = 'transparent';
      return canvas;
    },

    /**
     * Creates the outer div wrapper for the canvases
     * @returns {HTMLElement}
     */
    createOuterDiv : function () {
      var div = document.createElement('div');
      div.className = "outer-container";
      return div;
    },

    /**
     * Creates the inner div wrapper for the canvases
     * @returns {HTMLElement}
     */
    createInnerDiv : function () {
      var innerDiv = document.createElement('div');
      innerDiv.className = "inner-container";
      innerDiv.style.position = "relative";
      innerDiv.style.width = "100%";
      innerDiv.style.margin = "auto";
      return innerDiv;
    },

    createVexContext : function (canvas, backend) {
      return new VF.Renderer(canvas, backend || VF.Renderer.Backends.SVG).getContext();
    },

    //    scaleContext : function (ctx, cfg) {
    //      var me = this, paper, w, h;
    //      if (+cfg.backend === VF.Renderer.Backends.RAPHAEL) {
    //        //        paper = ctx.paper;
    //        //        h = cfg.pageHeight;
    //        //        w = cfg.pageWidth;
    //        //        paper.setSize(w * scale, h * scale);
    //        //        paper.setViewBox(0, 0, w, h);
    //      } else {
    //        ctx.scale(me.scale, me.scale);
    //      }
    //    },

    registerMouseClickHandler : function (handler) {
      var me = this;
      me.mouseClickHandlers.push(handler);
    },

    registerMouseMoveHandler : function (handler) {
      var me = this;
      me.mouseMoveHandlers.push(handler);
    },

    listenMouseClick : function () {
      var me = this;
      $(me.topCanvas).on('click', function (e) {
        var offset, mousePos, i;
        offset = $(this).offset();
        mousePos = {
          x : (e.pageX - offset.left) / me.scale,
          y : (e.pageY - offset.top) / me.scale
        };
        i = me.mouseClickHandlers.length;
        while (i--) {
          // if onClick returns false, events will not bubble up to the following layers
          if (me.mouseClickHandlers[i].onClick(mousePos, me.topCanvas, e) === false) {
            return;
          }
        }
      });
    },

    listenMouseMove : function () {
      var me = this;
      me.topCanvas.onmouseleave = function (e) {
        var i = me.mouseMoveHandlers.length;
        while (i--) {
          me.mouseMoveHandlers[i].removeHighlight();
          if (me.mouseMoveHandlers[i].mouseLeaveHandler) {
            me.mouseMoveHandlers[i].mouseLeaveHandler(null, me.topCanvas, e);
          }
        }
      };

      me.topCanvas.addEventListener('mousemove', function (e) {
        var offset, mousePos, i;
        offset = $(this).offset();
        mousePos = {
          x : (e.pageX - offset.left) / me.scale,
          y : (e.pageY - offset.top) / me.scale
        };
        i = me.mouseMoveHandlers.length;
        while (i--) {
          // if onMouseMove returns false, events will not bubble up to the following layers
          if (me.mouseMoveHandlers[i].onMouseMove(mousePos, me.topCanvas, e) === false) {
            return;
          }
        }
      });
    },

    registerMouseHandlers : function () {
      var i, layer, me = this, layers = me.layers;
      i = layers.length;
      while (i--) {
        layer = layers[i];
        if (layer.type === 'highlighter') {
          if (layer.clickHandler) {
            me.registerMouseClickHandler(layer);
          }
          if (layer.highlightMode === 'hover' || (layer.mouseEnterHandler && layer.mouseLeaveHandler)) {
            me.registerMouseMoveHandler(layer);
          }
        }
      }
      me.listenMouseClick();
      me.listenMouseMove();
    }

  };
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
      me.hairpinAreas = [];

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

      me.extractAndAddAreas(areaCollectionsByCategory['notes'], me.noteAreas, function () {
        me.calculateNoteAreas();
      });
      me.extractAndAddAreas(areaCollectionsByCategory['hairpins'], me.noteAreas, function () {
        me.calculateHairpinAreas();
      });
      me.extractAndAddAreas(areaCollectionsByCategory['anchoredTexts'], me.anchoredTextAreas, function () {
        me.calculateAnchoredTextAreas();
      });
      me.extractAndAddAreas(areaCollectionsByCategory['pgHead'], me.pgHeadAreas, function () {
        me.calculatePgHeadAreas();
      });
      me.extractAndAddAreas(areaCollectionsByCategory['variants'], me.variantAreas, function () {
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
        hairpins : [],
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
      var me = this, i, j, k, l, m, n, stave, x, y, w, y1, measures, staves;
      var systems = me.viewer.converter.getSystems();
      var STAFF_BOTTOM_OFFSET = 20;

      for (i = 0, j = systems.length; i < j; i += 1) {
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
    },

    calculateBarlineAreas : function (stave, staveY, staveH, meiElement) {
      var me = this;

      if (stave.modifiers[0].barline !== 7) {
        me.barlineAreas.push(me.createNoteAreaObj('barline', stave.modifiers[0].x -
                                                             8, staveY, 16, staveH, stave.leftBarlineElement ||
                                                                                    meiElement, 1));
      }
      if (stave.modifiers[1].barline !== 7) {
        me.barlineAreas.push(me.createNoteAreaObj('barline', stave.modifiers[1].x -
                                                             8, staveY, 16, staveH, meiElement, 1));
      }
    },

    calculateStaveModifierAreas : function (stave, y, h) {
      var me = this, i, j, x, w;
      j = stave.glyphs.length;
      x = stave.getGlyphStartX();
      var glyph;

      var codes = {
        v18 : 'meiKeySpecElement',
        v44 : 'meiKeySpecElement',
        v83 : 'meiClefElement',
        v79 : 'meiClefElement',
        vad : 'meiClefElement',
        v59 : 'meiClefElement',
        v8 : 'meiClefElement'
      };

      for (i = 0; i < j; i++) {
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

    calculateHairpinAreas : function () {
      var me = this, i, hairpin, x, y, w, h;
      var hairpins = me.viewer.converter.hairpins.allVexObjects;
      for (i in hairpins) {
        hairpin = hairpins[i];
        x = hairpin.x - 5;
        y = hairpin.y - 5;
        w = hairpin.x1 - hairpin.x + 5;
        h = hairpin.height + 10;
        me.noteAreas.push(me.createNoteAreaObj('note', x, y, w, h, hairpin.getMeiElement(), i));
      }
    },


    calculateNoteAreas : function () {
      var me = this, i, note, box, x, y, w, h, meiElement;
      var notes = me.viewer.converter.getNotes();
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
      var me = this, i;
      var texts = me.viewer.converter.anchoredTexts.getAll();
      i = texts.length;
      while (i--) {
        me.anchoredTextAreas.push(texts[i].getArea());
      }
    },

    calculatePgHeadAreas : function () {
      var me = this, i, j, texts;

      var calculate = function (obj) {
        if (obj) {
          var textsByLine = obj.getTextsByLine();
          j = textsByLine.length;
          while (j--) {
            texts = textsByLine[j];
            i = texts.length;
            while (i--) {
              me.pgHeadAreas.push(texts[i].getArea());
            }
          }
        }
      };

      calculate(me.viewer.converter.pgHead);
      calculate(me.viewer.converter.pgFoot);

    },

    calculateNoteModifierAreas : function (note) {
      var me = this, modifiers = note.modifiers, i, category, x, y, w, h;
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
      var note, box, x, y, w, h;

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
      var me = this, i, j, appObject, idsInAlternative, area, areas;

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


    getIdsInAlternative : function (meiDoc, appObject) {
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
      var me = this;
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

  /**
   * @exports mei2text/PreProcessor
   */

  var PreProcessor = {

    process : function (element, options) {
      var me = this, i, fnName;
      for (i = 0; i < options.length; i += 1) {
        fnName = (typeof options[i] === 'string') ? options[i] : options[i][0];
        if (typeof me[fnName] === 'function') {
          me[fnName](element, options[i]);
        } else {
          Logger.warn('Config error', 'Pre-processing option "' + fnName + '" doesn\'t exist.');
        }
      }
    },

    resolveCopyOf : function (element) {
      this.copyElements(element, 'copyof');
    },

    copyElements : function (element, attName) {
      var i, items = element.querySelectorAll('[' + attName + ']'), target, id, item, clone, cloneDescendants, j;
      for (i = items.length; i--;) {
        item = items[i];
        id = item.getAttribute(attName).substring(1);
        target = element.querySelector('[*|id=' + id + ']');
        if (target) {
          clone = target.cloneNode(true);
          clone.setAttribute(attName, '#' + id);
          clone.removeAttribute('xml:id');

          cloneDescendants = clone.querySelectorAll('[*|id]');
          for (j = cloneDescendants.length; j--;) {
            cloneDescendants[j].removeAttribute('xml:id');
          }

          item.parentNode.insertBefore(clone, item.nextSibling);
          item.parentNode.removeChild(item);
        } else {
          Logger.warn('Reference error', 'Target "'+id+'" specified in ' + Util.serializeElement(item) + ' could not be found.');
        }
      }
    },

    /**
     * checks if descendants of the provided element have xml:ids; adds xml:ids
     * if they are missing
     * @param {Element} element
     * @param {Object} option The pre-processing option
     */
    addXmlIdPrefix : function (element, option) {
      var i, items = element.getElementsByTagName("*"), prefix = option[1];
      for (i = items.length; i--;) {
        if (!items[i].hasAttribute('xml:id')) {
          items[i].setAttribute('xml:id', prefix + i);
        }
      }
    },

    /**
     * supported: up to 7 flats / sharps
     * @param element
     */
    processDefs : function (element) {
      var keys = {
        s : [
          'c',
          'g',
          'd',
          'a',
          'e',
          'b',
          [
            'f',
            's'
          ],
          [
            'c',
            's'
          ]
        ],
        f : [
          'c',
          'f',
          [
            'b',
            'f'
          ],
          [
            'e',
            'f'
          ],
          [
            'a',
            'f'
          ],
          [
            'd',
            'f'
          ],
          [
            'g',
            'f'
          ],
          [
            'c',
            'f'
          ]
        ]
      };

      var process = function (items, keys) {
        var i, keySig, n, acc, found, key;
        for (i = items.length; i--;) {
          if (items[i].hasAttribute('key.sig')) {
            keySig = items[i].getAttribute('key.sig');
            n = +keySig.substring(0, 1);
            acc = keySig.substring(1);
            key = keys[acc];

            items[i].setAttribute('key.mode', 'major');
            found = (key) ? key[n] : null;
            if (found) {
              if (typeof found === 'string') {
                items[i].setAttribute('key.pname', found);
              } else {
                items[i].setAttribute('key.pname', found[0]);
                items[i].setAttribute('key.accid', found[1]);
              }
            } else {
              items[i].setAttribute('key.pname', 'c');
            }
          }
        }
      };
      process(element.getElementsByTagName('staffDef'), keys);
      process(element.getElementsByTagName('scoreDef'), keys);
    }

  };
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

  /**
   * @exports core/Viewer
   */

  /**
   * @class Viewer
   *
   * @constructor
   * @param {Object} config For a full list, see the config options of the
   * Viewer object as well as the converter options at {@link MEI2VF.Converter
     * MEI2VF.Converter}
   */
  var Viewer = function (config) {
    if (config) {
      this.init(config);
    }
  };

  Viewer.prototype = {

    defaults : {
      /**
       * @cfg (Boolean) useMeiLib Specifies if the MeiLib library should be used to pre-process the input XML document. Necessary when there are variants in the MEI document.
       */
      useMeiLib : false,
      /**
       * @cfg (Object[]) preProcess XML document pre-processing options. Set falsy if pre-processing should be skipped completely.
       */
      preProcess : [
        'resolveCopyOf',
        [
          'addXmlIdPrefix',
          'M2V'
        ],
        'processDefs'
      ],
      /**
       * @cfg {Object[]} layers The canvas layers. (optional)
       *
       * Can be either a subclass of {@link AbstractAreaCollection} like
       * {@link DefaultAreaCollection} or, to specify the layer to contain
       * the VexFlow output, an object with the property `type` with the value `vex`.
       * The first layer will be the bottom-most, the last one the top-most.
       * If no VexFlow layer is specified, a VexFlow Layer gets added automatically
       * as the top-most layer.
       */
      layers : [],
    },

    init : function (config) {
      var me = this, xmlDoc, firstScoreDef, meiDoc, layers;

      if (!config) {
        throw new RuntimeError('No config passed to init function.');
      }

      if (!config.data) {
        throw new RuntimeError('No XML document passed to init function.');
      }

      xmlDoc = Document.initXmlDoc(config.data);

      firstScoreDef = xmlDoc.getElementsByTagName('scoreDef')[0];
      if (!firstScoreDef) {
        throw new RuntimeError('No <scoreDef> found in config.data.');
      }

      me.cfg = Util.extend({}, me.defaults, Document.getMEIPageConfig(firstScoreDef), config);

      if (me.cfg.preProcess) {
        PreProcessor.process(xmlDoc, me.cfg.preProcess);
      }

      me.converter = new ExtendedConverter(me.cfg);
      me.UI = new UI();

      // TODO improve
      me.UI.redraw = function() {
        me.converter.draw(this.layers[this.vexLayerIndex].ctx);
//        me.converter.draw(this.layers[this.vexLayerIndex].ctx, Math.round((1/this.scale)*2)/2);
//        me.converter.draw(this.layers[this.vexLayerIndex].ctx, Math.floor(1/this.scale) || 1);
      };


      me.converter.reset();
      if (me.cfg.useMeiLib) {
        meiDoc = new MeiLib.MeiDoc(xmlDoc);
        me.converter.process(meiDoc.sectionview_score);
      } else {
        me.converter.process(xmlDoc);
      }

      layers = me.UI.createLayers(me.cfg, me.converter.cfg.pageScale);

//      layers = me.UI.createLayers(me.cfg, 1);

      me.converter.format(layers[me.UI.vexLayerIndex].ctx);

      var height = me.converter.cfg.pageHeight || me.converter.pageInfo.getCalculatedHeight();
      var width = me.converter.cfg.pageWidth || me.converter.pageInfo.getCalculatedWidth();

//            me.UI.setSize(400, 800, 1);
      me.UI.setSize(height, width, me.converter.cfg.pageScale);

      me.converter.draw(layers[me.UI.vexLayerIndex].ctx);
//      me.UI.zoom(-4)

      me.areaHelper = new AreaHelper(me);
      me.areaHelper.setAreas(meiDoc, layers);

      me.UI.registerMouseHandlers();
    },

    zoom : function (scale) {
      var me = this;
//      me.UI.zoom(scale);


      me.converter.cfg.pageScale += scale;

      var height = me.converter.cfg.pageHeight || me.converter.pageInfo.getCalculatedHeight();
      var width = me.converter.cfg.pageWidth || me.converter.pageInfo.getCalculatedWidth();
      me.UI.setSize(height, width, me.converter.cfg.pageScale);

      me.converter.draw(me.UI.layers[me.UI.vexLayerIndex].ctx);

    }

  };
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

  /**
   * @exports areas/AbstractAreaCollection
   */

  /**
   * @class MSV.AbstractAreaCollection
   */
  var AbstractAreaCollection = function (config) {

  };

  AbstractAreaCollection.prototype = {

    setElement : function (element) {
      throw new RuntimeError('No override for setElement() provided.');
    },

    setContext : function (ctx) {
      throw new RuntimeError('No override for setContext() provided.');
    },

    setScale : function (scale) {
      throw new RuntimeError('No override for setScale() provided.');
    },

    addAreas : function (areas) {
      throw new RuntimeError('No override for addAreas() provided.');
    },

    initHighlights : function () {
      throw new RuntimeError('No override for initHighlights() provided.');
    },

    removeHighlight : function () {
      throw new RuntimeError('No override for removeHighlight() provided.');
    },

    onClick : function (mousePos, topCanvas, e) {
      throw new RuntimeError('No override for onClick() provided.');
    },

    onMouseMove : function (mousePos, topCanvas, e) {
      throw new RuntimeError('No override for onMouseMove() provided.');
    }

  };
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

  /**
   * @exports areas/DefaultAreaCollection
   */

  /**
   * @class DefaultAreaCollection
   */
  var DefaultAreaCollection = function (config) {
    this.init(config);
  };

  Vex.Inherit(DefaultAreaCollection, AbstractAreaCollection, {

    type : 'highlighter',

    /**
     * @property {Object} emptyArea An area in which all dimensions are set to
     * zero.
     */
    emptyArea : {
      x : 0,
      y : 0,
      w : 0,
      h : 0
    },

    init : function (config) {
      var me = this;
      me.ctx = config.ctx;
      me.content = config.content;
      me.highlightMode = config.highlightMode;
      me.fillStyle = config.fillStyle || 'rgba(100, 100, 0, 0.5)';
      me.clickHandler = config.clickHandler;
      me.mouseEnterHandler = config.mouseEnterHandler;
      me.mouseLeaveHandler = config.mouseLeaveHandler;
      me.currentHighlight = me.emptyArea;
      return me;
    },

    setElement : function (element) {
      this.element = element;
    },

    setContext : function (ctx) {
      var me = this;
      me.ctx = ctx;
      me.ctx.fillStyle = me.fillStyle;
    },

    setScale : function (scale) {
      this.scale = scale;
    },

    getAreas : function () {
      return this.areas;
    },

    addAreas : function (areas) {
      if (this.areas) {
        Array.prototype.push.apply(this.areas, areas);
      } else {
        this.areas = areas;
      }
    },

    initHighlights : function () {
      var me = this;
      if (me.highlightMode === 'static') {
        me.highlightAll();
      } else if (me.highlightMode === 'hover') {
        me.highlightOnHover = true;
      }
    },

    removeHighlight : function () {
      var me = this, factor = 1 / me.scale;
      // select a rectangle larger than the highlight in order to remove
      // additional pixels created by anti-aliasing in the HTML5 canvas; the smaller
      // the scaling, the bigger these artifacts are proportionally
      me.ctx.clearRect(me.currentHighlight.x - factor, me.currentHighlight.y -
                                                           factor, me.currentHighlight.w +
                                                                   2 * factor, me.currentHighlight.h + 2 * factor);
    },

    highlightAll : function () {
      var me = this, i;
      i = me.areas.length;
      while (i--) {
        me.setHighlight(me.areas[i]);
      }
    },

    onClick : function (mousePos, topCanvas, e) {
      var me = this, area;
      area = me.getAreaFromPoint(mousePos);
      if (area) {
        return me.clickHandler(area, topCanvas, e);
      }
      return true;
    },

    onMouseMove : function (mousePos, topCanvas, e) {
      var me = this, area;
      area = me.getAreaFromPoint(mousePos);
      if (area) {
        if (me.currentHighlight !== area) {
          if (me.highlightOnHover) {
            me.removeHighlight();
            me.setHighlight(area);
          }
          if (me.mouseEnterHandler) {
            me.mouseEnterHandler(area, topCanvas, e);
          }
        }
      } else {
        if (me.currentHighlight !== me.emptyArea) {
          if (me.highlightOnHover) {
            me.removeHighlight();
            me.currentHighlight = me.emptyArea;
          }
          if (me.mouseLeaveHandler) {
            me.mouseLeaveHandler(null, topCanvas, e);
          }
        }
      }
    },

    /**
     * Highlights an area.
     * @param {Object} area The area to highlight.
     */
    setHighlight : function (area) {
      var me = this;
      me.roundRect(me.ctx, area.x, area.y, area.w, area.h, 5, true, false);
      me.currentHighlight = area;
    },

    // From http://js-bits.blogspot.de/2010/07/canvas-rounded-corner-rectangles.html
    /**
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x The top left x coordinate
     * @param {Number} y The top left y coordinate
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     * @param {Number} radius The corner radius. Defaults to 5;
     * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
     * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
     */
    roundRect : function (ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke == "undefined") {
        stroke = true;
      }
      if (typeof radius === "undefined") {
        radius = 5;
      }
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (stroke) {
        ctx.stroke();
      }
      if (fill) {
        ctx.fill();
      }
    },

    /**
     * Checks if a point is in one of the highlighter areas.
     * @param {Object} point The point
     * @param {Number} point.x The x coordinate
     * @param {Number} point.y The y coordinate
     * @return {Object|null} The last area the point is in or null if the point
     * is in none of the highlighter's areas.
     */
    getAreaFromPoint : function (point) {
      var me = this, areas, i;
      areas = me.areas;
      i = areas.length;
      while (i--) {
        if (me.isPointInRect(point, areas[i])) {
          return areas[i];
        }
      }
      return null;
    },

    /**
     * Checks if a point is in a rectangle
     * @param {Object} point the coordinates of a point
     * @param {Object} point.x the x coordinate
     * @param {Object} point.y the y coordinate
     * @param {Object} rect the coordinates of the rectangle
     * @param {Object} rect.x the left x coordinate
     * @param {Object} rect.y the top y coordinate
     * @param {Object} rect.x1 the right x coordinate
     * @param {Object} rect.y1 the bottom y coordinate
     * @return {Boolean} True if the mouse is within the rectangle, otherwise
     * false.
     */
    isPointInRect : function (point, rect) {
      return !(point.x < rect.x || point.x > rect.x1 || point.y < rect.y || point.y > rect.y1);
    }
  });


  window.MSV = {
    Viewer : Viewer,
    Logger : Logger,
    AbstractAreaCollection : AbstractAreaCollection,
    DefaultAreaCollection : DefaultAreaCollection,
    Util : Util
  };


;var VF=Vex.Flow;})(jQuery);