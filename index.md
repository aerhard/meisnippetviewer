---
layout: default
title: "MEI Snippet Viewer"
---

<div class="jumbotron">
    <h1>MEI SNIPPET VIEWER</h1>
</div>


The MEI Snippet Viewer is a client-side (pure JavaScript) utility to display notated music encoded in the [MEI format](http://music-encoding.org/home) on web pages.
The viewer relies on the [VexFlow music engraving library](https://github.com/0xfe/vexflow) and the [MEItoVexFlow](https://github.com/TEI-Music-SIG/MEItoVexFlow) 
converter.

Like VexFlow and MEItoVexFlow, the viewer is focused on Common Western Notation. It currently only supports a basic set of what can be expressed in MEI. 
If you're looking for a web application displaying variant readings, you should have a look at Zoltan Komives' [MeiView](https://github.com/zolaemil/meiView), which 
uses MEItoVexFlow as a converter as well.

#### Features

See the demo section for live demonstrations of features. Features include:

- Display of scores and single voices
- Clef and time signature changes
- Multiple voices in a system
- Lyrics and other score text
- Automatic measure width calculation
- an API for mouse event handling and highlighting

#### Browser compatibility

The viewer requires a modern browser (IE9+) with JavaScript enabled.

#### Usage

See the section [Getting started]({{ site.baseurl }}{% post_url 2014-08-18-setup %}).

#### Developers

You can fork or clone the source code at https://github.com/aerhard/meisnippetviewer

#### Issues

To report an issue, please visit the project's GitHub page at https://github.com/aerhard/meisnippetviewer
