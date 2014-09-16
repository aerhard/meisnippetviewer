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


<script type="text/JavaScript">

$(document).ready(function () {
    var inspector = new Inspector();
    inspector.render('{{ site.baseurl }}/xml/sinfonie.xml', {autoStaveConnectorLine : true, pageHeight: 1700, pageWidth:30000, pageScale:0.5, staveSpacing: 80});
});
</script>
<div class="infobar">
    INFO <span id="measureinfo"></span>
</div>
<div id="tests" class="test-page"></div>
<div id="tooltip"></div>

