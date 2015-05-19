
$(document).ready(function () {

  var lorem = function (length) {
    length = length || 100;
    var text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.';
    var output = '';
    var i = Math.ceil(length / text.length);
    while (i--) {
      output += text;
    }
    return output.substring(0, length) + '.';
  };

  $('.lorem').text(lorem(400));

  var render = function (xmlDoc, target) {
    new MSV.Viewer({
      data   : xmlDoc,
      target   : target,
      useMeiLib: false,
      layers   : [
        new MSV.DefaultAreaCollection({
          content      : ['measures'],
          highlightMode: 'hover'
        }),
        new MSV.DefaultAreaCollection({
          content      : ['notes', 'barlines', 'measure_modifiers', 'anchoredTexts'],
          highlightMode: 'hover'
        })]
    });
  };


  var count = 0;

  var getDoc = function () {

    var keys = [
      'd', 'e', 'f', 'g', 'a', 'b', 'c'
    ];


    var musicString =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<mdiv xmlns="http://www.music-encoding.org/ns/mei" xmlns:tei="http://www.music-encoding.org/ns/mei">' + '<score>' +
    '<scoreDef page.width="440" page.height="124" page.leftmar="10" page.topmar="50" page.scale="50%">' +
    '<staffGrp>' +
    '<tei:staffDef n="1" lines="5" clef.line="2" clef.shape="G" meter.count="4" meter.unit="4" meter.rend = "invis" key.pname = "'+ keys[count % 7]+ '" key.mode = "major"/> ' +
    '</staffGrp>' + '</scoreDef>' + '<section>' + '<measure n="0">' + '<staff n="1">' +
    '<layer>' + '<note xml:id="n01" pname="a" oct="5" dur="4" dots="1" tie="i">' +
    '</note>' + '<beam>' + '<note pname="a" oct="5" dur="8" tie="t"/>' +
    '<note pname="g" accid="s" oct="5" dur="8"/>' + '<note pname="'+ keys[((count+2) % 3)+2] +'" oct="5" dur="8"/>' +
    '</beam>' + '</layer>' + '</staff>' +
    '<slur staff="1" startid="#n01" endid="#s01" startvo="-3" endvo="-5" bezier="40 -30 20 -10"/>' +
    '</measure>' + '<measure n="1">' + '<staff n="1">' + '<layer>' +
    '<note pname="b" accid="f" oct="5" dur="4" dots="1" tie="i"/>' + '<beam>' +
    '<note pname="b" oct="5" dur="8" tie="t"/>' + '<note pname="'+ keys[count % 4] +'" oct="5" dur="8"/>' +
    '<note pname="g" oct="5" dur="8"/>' + '</beam>' + '</layer>' + '</staff>' +
    '</measure>' + '<measure n="3" width="50" unit="px" right="invis">' + '<staff n="1">' +
    '<layer>' + '<note pname="'+ keys[count % 4] +'" oct="5" dur="2"/>' + '<space xml:id="s01" dur="1">' +
    '</space>' + '</layer>' + '</staff>' + '</measure>' + '</section>' + '</score>' +
    '</mdiv>';

    count++;
    return musicString;
  };

  $('.music').each(function () {
    render(getDoc(), this)
  });

});