---
layout: demopage
title: "MEI Inspector"
category: demo
date: 2014-08-18 06:24:27
---

<script type="text/JavaScript" src="{{ site.baseurl }}/js/Inspector.js"></script>


<div class="well">
<p>
In this demo, mouse move listeners trigger tooltips to display the underlying MEI data and update the top info bar. 
</p>
<p>

</p>
</div>


<script type="text/JavaScript">

$(document).ready(function () {
    var inspector = new Inspector();
    inspector.render('{{ site.baseurl }}/xml/Demo.BachGMinorPrelude-WKII.xml', {autoStaveConnectorLine : true});
    inspector.render('{{ site.baseurl }}/xml/TC.GraceNotes.xml');
});
</script>
<div class="infobar">
    INFO <span id="measureinfo"></span>
</div>
<div id="tests" class="test-page"></div>
<div id="tooltip"></div>

