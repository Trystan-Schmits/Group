---
comments: False
layout: post
title: Webpage
description: A game played on the screen of a computer
type: tangibles
courses: {'compsci': {'week': 7}}
categories: ['C4.1']
---

<html>
    <style>
        .container {
            display: block;
            background-color: black;
        }
    </style>
    <canvas id="gameCanvas" class="container" width="500px" height="400px"></canvas>
    <body>
        <script>
            const canvas = document.getElementById("gameCanvas");
            const ctx = canvas.getContext("2d");
            var web = new Image();
            web.src = "/Group/images/Game/computer_Webpage (1).png";
            const scroll = {
                x: 0,
            };
            const bird = {
                x: -200,
                y:0,
                yv: 0,
                img: new Image(),
                src: "/Group/images/Game/birdgame_bird.png",
            };
            const pipe = {
                x: 0,
                y: -110,
                img: new Image(),
                src: "/Group/images/Game/birdgame_pipe.png",
            };
            var animID;
            // Correct positions to canvas relative
            pipe.x += canvas.width/2;
            pipe.y += canvas.height/2;
            bird.x += canvas.width/2;
            bird.y += canvas.height/2;
            scroll.x += canvas.width/2;
            const death = new Image();
            death.src = "/Group/images/Game/birdgame_death.png";
            function birdLogic() {
                bird.yv += 0.5;
                bird.y += bird.yv;
                if (bird.y > canvas.height-40) {
                    ctx.drawImage(death,0,0,500,400);
                    cancelAnimationFrame(animID);
                }
            };
            function pipeLogic() {
                pipe.x -= 2;
                if (pipe.x < -192) {
                    pipe.x = 532;
                }
            };
            bird.img.src = bird.src;
            pipe.img.src = pipe.src;
            var scale = 1.9;
            function update() {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(web,-100,-150,canvas.width*4,canvas.height*2.4);
                // Game Objects
                pipeLogic();
                ctx.drawImage(pipe.img,pipe.x,pipe.y,128*scale,192*scale);
                birdLogic();
                ctx.drawImage(bird.img,bird.x,bird.y,32*scale,64*scale);
                // Border Asthetic
                ctx.fillStyle = "black";
                ctx.fillRect(0,85,500,10);
                ctx.fillRect(0,390,500,10);
                requestAnimationFrame(update);
            };
            update();
            document.addEventListener("keydown", function(event) {
                // Check if the key pressed is the space key (key code 32 or key value " ")
                if (event.keyCode === 32 || event.key === " ") {
                    // Your code to handle the space key press goes here
                    bird.yv = -10;
                }
            });
        </script>
    </body>
</html>