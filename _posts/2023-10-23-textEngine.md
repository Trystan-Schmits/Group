---
comments: False
layout: post
title: Text Engine
description: Testing of the text engine without delay.
type: tangibles
courses: {'compsci': {'week': 6}}
categories: ['C4.1']
---

<html>
    <style>
        .container {
            display: block;
            background-color: white;
        }
    </style>
    <canvas id="gameCanvas" class="container" width="500px" height="400px"></canvas>
    <body>
        <script>
            // Canvas Variable Definitions (Grabs instructions from canvas)
            const canvas = document.getElementById("gameCanvas");
            const ctx = canvas.getContext("2d");
            // Text Engine Code
            function text(x,y,space,cutx,text) {
                var words = text.split(" ");
                var len = words.length;
                var textX = x;
                var textY = y;
                // space * 14
                for (var letter = 0; letter < len; letter++) {
                    ctx.fillText(words[letter], textX, textY);
                    textX += space*words[letter].length;
                    if (textX+(space+words[letter].length) > cutx) {
                        textX = x;
                        textY += 14;
                    }
                }
            };
            // Run Text Engine
            function update() {
                ctx.clearRect(0,0,500,500);
                ctx.fillStyle = "white"; // This box will be replaced with a textbox image
                ctx.fillRect(50,300,400,80);
                ctx.font = "14px Arial";
                ctx.fillStyle = "black";
                text(10,250,10,250,"Hello Zafeer! This engine uses cut off for x  so that it stops the text from going on for infinity.");
                requestAnimationFrame(update);
            };
            update();
        </script>
    </body>
</html>