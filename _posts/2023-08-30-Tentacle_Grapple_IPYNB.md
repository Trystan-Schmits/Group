---
toc: False
comments: True
layout: post
title: Tentacle Grapple
description: Testing tentacle physics for main entity
type: tangibles
courses: {'compsci': {'week': 1}}
permalink: /plans/monster_mash
hide: false
---

%%html

<html>
<head>
    <style>
        canvas {
            border: 1px solid black;
            width: 750px;
            height: 400px;
            background-image: url("images/room2.png");
            background-size: cover;
            position: absolute;
        }
    </style>
</head>
<body>
    <p>Image to use:</p>
    <img id="tentacle" src="images/Game/pixil-frame-0 (8).png" alt="Arm" width="220" height="277">
    <p>Canvas to fill:</p>
    <canvas id="myCanvas" width="250" height="300"
    style="border:1px solid #D3D3D3;">Your browser does not support the HTML canvas tag.</canvas>
    <p><button onclick="myCanvas()">Try it</button></p>

    <script>
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        const monster = {
            x: 0,
            y: 0,
        };

        function findcontact() {
            // idk
        };

        let mouseX;
        let mouseY;
        function findMouse() {
            document.addEventListener('mousemove', (event) => {
                mouseX = event.clientX;
                mouseY = event.clientY;
            });
        };

        function pointTo(object,tx,ty) {
            const dx = tx - object.x;
            const dy = ty - object.y;
            const angle = Math.atan2(ty,tx) * (180/Math.PI);
            return angle;
        };

        var img = document.getElementById("tentacle");

        function move(speed,dir) {
            x += speed * Math.sin(dir);
            y += speed * Math.cos(dir);
        };

        function tentacle (x1,y1,x2,y2) {
            let x = x1;
            let y = y1;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.sqrt((dx*dx)+(dy*dy))

            var img = document.getElementById("tentacle");

            var deg = pointTo(img,x2,y2);
            move(dist/2,deg);
            ctx.translate(img.width/2,img.height/2);
            ctx.rotate(deg);
            ctx.translate(img.width/-2,img.height/-2);
            ctx.drawImage(img,x,y);

            ctx.setTransform(1,0,0,1,0,0);
        };

        // Update function
        function update() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            // Test Tentacle
            findmouse();
            tentacle(monster.y,monster.x,mouseX,mouseY);

            // Draw "Monster"
            ctx.fillStyle = "black";
            ctx.fillRect(monster.x,monster.y,20,20);

            // Request the next animation frame
            requestAnimationFrame(update);
        }

        // Start the game loop
        update();

        // Event listener for player movement (arrow keys)
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    break;
                case "ArrowLeft":
                    monster.x -= 1.5;
                    event.preventDefault();
                    break;
                case "ArrowRight":
                    monster.x += 1.5;
                    event.preventDefault();
                    break;
            }
        });
    </script>
</body>
</html>
