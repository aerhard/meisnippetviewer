---
layout: demopage
title: "Full page demo"
category: demo
date: 2014-08-18 06:24:46
---

<div class="well">
<p>All music and text displayed in this demo is read from an MEI file. Measure 
widths are calculated automatically, based on measure content and the total page width specified in the MEI file.</p>
</div>

<div id="music"></div>

<script>
$.get('{{ site.baseurl }}/xml/TC.PageLayoutAutoWidths.xml', function (meiCode) {
    var viewer = new MSV.Viewer({
          data   : meiCode, 
          target : $('#music')
        });
}, 'xml');
</script>