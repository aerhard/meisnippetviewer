---
layout: demopage
title: "Joplin"
category: demo
date: 2014-08-18 06:20:27
---

<script type="text/JavaScript" src="{{ site.baseurl }}/js/Inspector.js"></script>


<div class="well">
<p>
This is a rendering of Scott Joplin's "Elite Syncopations". The MEI file contains music both in the meiHeader and in
the `music` element. In order to display only the contents of `music`, the `data` property is set to `meiCode.querySelector('music')`.  
</p>
<p>

</p>
</div>

<div id="music"></div>

<script>



$.get('{{ site.baseurl }}/xml/Joplin_Elite_Syncopations.xml', function (meiCode) {

    var viewer = new MSV.Viewer({
          data   : meiCode.querySelector('music'), 
          target : $('#music'),
          labelMode : 'full',
          autoStaveConnectorLine: true,
          pageScale:0.6,
           pageWidth: 1500,
          staveSpacing: 80
        });
}, 'xml');
</script>

