---
comments: False
layout: post
title: Ending Credits
description: For the end of the game
type: tangibles
courses: {'compsci': {'week': 6}}
categories: ['C4.1']
permalink: /tangibles/credits
---

<html>
    <style>
        .container {
            display: block;
            background-color: black;
        }
    </style>
    <canvas id="credits" class="container" width="500px" height="400px"></canvas>
    <button id="startButton">Start</button>
    <audio id="audio" src="/Group/audio/2023-10-27-endingCredits.mp3" preload="auto"></audio>
    <body>
        <script>
            const canvas = document.getElementById("credits");
            const ctx = canvas.getContext("2d");
            // Credits Text
            function text(x,y,space,cutx,text) {
                var words = text.split(" ");
                var len = words.length;
                var textX = x-(text.length*2.5);
                var textY = y;
                for (var letter = 0; letter < len; letter++) {
                    ctx.fillText(words[letter], textX, textY);
                    textX += space*words[letter].length/2;
                    if (textX+(space+words[letter].length) > cutx) {
                        textX = x;
                        textY += 14;
                    }
                }
            };
            ctx.font = "14px Arial";
            ctx.fillStyle = "white";
            var scrollY = 0;
            function addText() {
                text(canvas.width/2,0-scrollY,14,canvas.width,"Created By");
                text(canvas.width/2,-50-scrollY,14,canvas.width,"Sean Nakagawa");
                text(canvas.width/2,-100-scrollY,14,canvas.width,"Trystan Schmidts");
                text(canvas.width/2,-150-scrollY,14,canvas.width,"Zafeer Ahmed");
                text(canvas.width/2,-200-scrollY,14,canvas.width,"Spencer Lyons");
            };
            function update() {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                addText();
                scrollY -= 1;
                requestAnimationFrame(update);
            };
            let isCanvasCodeInitialized = false;
            startButton.addEventListener("click", function () {
            if (!isCanvasCodeInitialized) {
                audio.play();
                update();
                isCanvasCodeInitialized = true;
            }
            });
        </script>
    </body>
</html>
