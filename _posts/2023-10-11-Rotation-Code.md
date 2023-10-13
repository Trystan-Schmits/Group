---
toc: false
comments: true
layout: post
title: Rotation Code
description: What to do for the day
type: hacks
courses: { compsci: {week: 0} }
permalink: /hacks/rotation
---

```markdown
Rotation
<!DOCTYPE html>
<html>
<body>
<p>Image to use:</p>
<img id="scream" src="img_the_scream.jpg" alt="The Scream" width="220" height="277">
<p>Canvas to fill:</p>
<canvas id="myCanvas" width="250" height="300"
style="border:1px solid #D3D3D3;">
Your browser does not support the HTML canvas tag.</canvas>
<p><button onclick="myCanvas()">Try it</button></p>
<script>
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var img = document.getElementById("scream");//replace with image
var deg = 0;
ctx.translate(img.width/2,img.height/2);
ctx.rotate((deg * Math.PI) / 180);
ctx.translate(-img.width/2,-img.height/2);
ctx.drawImage(img, 0,0);
// Reset transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);
</script>
</body>
</html>
```