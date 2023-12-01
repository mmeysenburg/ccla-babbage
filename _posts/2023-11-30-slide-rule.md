---
layout: post
title: Circular Slide Rule
subtitle: Multiply like it's 1828
tags: [slide rule]
comments: false
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js">
</script>

<script src='../assets/js/csr.js'>
</script>

This page contains a Web implementation of a circular slide rule to be used in the [Charles Babbage, Ada Lovelace, and the Dawn of Computing](https://reactingconsortium.org/games/babbage) [Reacting to the Past](https://reactingconsortium.org/WIR-basics) game. 

The app will technically work on mobile, but works best when viewed from a browser on a desktop or laptop computer. Maximize your browser, and then refresh the page, to get the largest slide rule your screen is capable of drawing. 

Click and drag to rotate either the inner dial or the cursor; toggle which one with the button below. The other button can be used to lock / unlock movement as needed. 

<div id="csr-holder">
  <button id="btnCD" onclick="toggleCD()">Change to cursor rotation</button>
  <button id="btnLock" onclick="toggleLock()">Lock</button>
  <!-- the sketch will be loaded here -->
</div>
