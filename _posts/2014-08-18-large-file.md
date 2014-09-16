---
layout: demopage
title: "Large File"
category: demo
date: 2014-08-18 06:20:27
---

<script type="text/JavaScript" src="{{ site.baseurl }}/js/Inspector.js"></script>


<div class="well">
<p>
This is a demo of a very large file rendered to a single canvas. In Practice, you should display large files page-wise to improve rendering performance. 
</p>
<p>

</p>
</div>

<div id="music"></div>

<script>
$.get('{{ site.baseurl }}/xml/sinfonie.xml', function (meiCode) {
    var viewer = new MSV.Viewer({
          data   : meiCode, 
          target : $('#music'),
          labelMode : 'full',
          autoStaveConnectorLine: true,
          pageHeight: 1700, 
          pageWidth:30000, 
          pageScale:0.5, 
          staveSpacing: 80
        });
}, 'xml');
</script>

