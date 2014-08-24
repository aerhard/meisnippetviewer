---
layout: demopage
title: "Layout Demo"
category: demo
date: 2014-08-18 06:24:45
---

<div class="well">
<p>This page demonstrates embedding of short music fragments in a text. Layout is specified with simple inline CSS rules, 
for example &lt;div class="my-music" style="text-align:center;"&gt;&lt;/div&gt; or &lt;span class="my-music" style="float:right;"&gt;&lt;/span&gt;.
</p>
<p>
Each of the music fragments on the page consists of three canvas layers: one containing the VexFlow output (the notated music)
and two layers used for highlighting overlapping score features (layer 1: measures, layer 2: notes, bar lines, clefs etc. 
</p>
</div>

<h3>Separate Lines</h3>

<div>
    <p class="lorem"></p>
</div>
<div class="music" style="text-align:center;"></div>
<div>
    <p class="lorem"></p>
</div>
<div class="music" style="text-align:left;"></div>
<div>
    <p class="lorem"></p>
</div>
<div class="music" style="text-align:right;"></div>
<h3>Inline</h3>

<div>
    <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
        <span class="music" style="display:inline-table;vertical-align:middle"></span><b>(vertical-align:middle)</b> At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labor.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
        <span class="music" style="display:inline-table;vertical-align:top"></span><b>(vertical-align:top)</b> At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labor.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
        <span class="music" style="display:inline-table;vertical-align:bottom"></span><b>(vertical-align:bottom)</b> At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labor.
    </p>
</div>
<h3>Table</h3>
<table>
    <tbody>
    <tr>
        <td>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
        </td>
        <td style="text-align:center;">
            <div class="music"></div>
            center
        </td>
        <td>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
        </td>
    </tr>
    <tr>
        <td style="text-align:left;">left
            <div class="music"></div>
        </td>
        <td>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
        </td>
        <td>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
        </td>
    </tr>
    <tr>
        <td>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
        </td>
        <td>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
        </td>
        <td style="text-align:right;">
            <div class="music"></div>
            right
        </td>
    </tr>
    </tbody>
</table>
<h3>Float</h3>

<div>
    <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
        <span class="music" style="float:right;"></span>At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labor.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labor.
        <span class="music" style="float:left;"></span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labor.
    </p>
</div>

<script type="text/JavaScript" src="{{ site.baseurl }}/js/layout-demo.js"></script>
