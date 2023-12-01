---
layout: post
title: Difference Engine Simulator
subtitle: Automating finite differences
tags: [Difference Engine]
comments: false
---

<script src='../assets/js/difference-engine.js'>
</script>

This page contains a Web simulation of the Difference Engine, to be used in the 
[Charles Babbage, Ada Lovelace, and the Dawn of Computing](https://reactingconsortium.org/games/babbage) 
[Reacting to the Past](https://reactingconsortium.org/WIR-basics) game. 

Here we use a modern programming language and Web interface to automate the process of computation using
the method of finite differences. You will not see the moving gears and cogs that Babbage's engine would 
have used, but you will be able to carry out a finite differences calculation similar to the ones the 
Difference Engine was designed to compute.

Fill in the first row of a finite differences table, and then click "Submit" to set the machine in motion.
Click on the "Reset" button to reset the simulator for another computation.

<div id="difference-engine-holder">
  <button id="btnSubmit" onclick="submit()">Submit</button>
  <button id="btnReset" onclick="reset()">Reset</button>

  <table>
    <tr>
      <th>x</th>
      <th>f(x)</th>
      <th>d<sub>1</sub>(x)</th>
      <th>d<sub>2</sub>(x)</th>
      <th>d<sub>3</sub>(x)</th>
      <th>d<sub>4</sub>(x)</th>
      <th>d<sub>5</sub>(x)</th>
    </tr>
    <tr>
      <td>0</td>
      <td><input type="text" id="inpF0" value="0"></td>
      <td><input type="text" id="inpD1" value="0"></td>
      <td><input type="text" id="inpD2" value="0"></td>
      <td><input type="text" id="inpD3" value="0"></td>
      <td><input type="text" id="inpD4" value="0"></td>
      <td><input type="text" id="inpD5" value="0"></td>
    </tr>
  </table>
</div>
