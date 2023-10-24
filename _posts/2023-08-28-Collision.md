---
toc: false
comments: true
layout: post
title: Collision
description: What to do for the day
type: hacks
courses: { compsci: {week: 2} }
permalink: /plans/collsion
---

<html>
<head>
    <style>
        canvas {
            border: 1px solid black;
            .bgmove {
            width: 750px;
            height: 400px;
            background-image: url("images/room2.png");
            background-size: cover;
            position: absolute;
            }
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="700" height="400"></canvas>
    <div class="bgmove"></div>
    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        // Scrolling
        const scroll = {
            x: 0,
            y: 0,
        };
        // Player position
        const player = {
            x: 0,
            y: 0,
            xv: 0,
            yv: 0,
            health: 100,
        };
        const platform = {
            x: 300,
            y: 175,
            width: 10,
            height: 50,
        };
        const circle = {
            x: 200,
            y: 200,
            radius: 20,
        };  
        var collide = false;
        function playerCollide(val) {
            collide = false;
            var deltaX = (platform.x-scroll.x) - (player.x-scroll.x + (canvas.width/2));
            var deltaY = (platform.y-scroll.y) - (player.y-scroll.y + (canvas.height/2));
            if (val === 1) {
                if (Math.abs(deltaX) < platform.width) {
                    if (Math.abs(deltaY) < platform.height) {
                        collide = true;
                    }
                }
            } else if (val === 2) {
                var dist = Math.sqrt(deltaX**2 + deltaY**2);
                if (dist < circle.radius) {
                    collide = true;
                }
            } else {
                return 0;
            }
        };
        function colup() {
            for (var i = 0; i < 6; i++) {
                collide(1);
                if (collide === true) {
                    player.y += 1;
                }
            }
        };
        function ycol() {
            while (collide === true) {
                playerCollide(1);
                if (player.yv > 0) {
                    player.y -= 1;
                } else {
                    player.y += 1;
                }
            }
        };
        function xcol() {
            while (collide === true) {
                playerCollide(1);
                if (player.xv > 0) {
                    player.x -= 1;
                } else {
                    player.x += 1;
                }
            }
        }
        function physics() {
            playerPosition();
            playerCollide(1);
            if (collide === true) {
                colup();
                playerCollide(1);
                if (collide === true) {
                    // xcol();
                    player.xv = 0;
                }
            }
            // playerCollide(1);
            // if (collide === true) {
            //     ycol();
            //     player.yv = 0;
            // }
        };
        function playerPosition() {
            player.xv = player.xv * 0.7;
            player.yv = player.yv * 0.7;
            player.x += player.xv;
            player.y += player.yv;
        };
        // Update function
        function update() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            // Change scroll variables to slide
            scroll.x += 0.05 * (player.x - scroll.x);
            scroll.y += 0.05 * (player.y - scroll.y);
            // Player Logic
            physics();
            // Draw the player
            ctx.fillStyle = "blue";
            ctx.fillRect((player.x - scroll.x) + (canvas.width / 2), (player.y - scroll.y) + (canvas.height / 2), Math.abs(player.xv)+20, Math.abs(player.yv)+20);
            // Draw Platform
            if (collide === true) {
            ctx.fillStyle = "green";
            } else {
                ctx.fillStyle = "red";
            }
            ctx.fillRect(platform.x - scroll.x,platform.y - scroll.y,platform.width,platform.height);
            // Draw Circle
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(circle.x - scroll.x, circle.y-scroll.y, circle.radius, 0, 2 * Math.PI);
            ctx.fill();
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
                    player.xv -= 1.5;
                    event.preventDefault();
                    break;
                case "ArrowRight":
                    player.xv += 1.5;
                    event.preventDefault();
                    break;
            }
        });
    </script>
</body>
</html>
