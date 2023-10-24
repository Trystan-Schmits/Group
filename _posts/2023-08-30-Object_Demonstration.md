---
toc: False
comments: True
layout: post
title: Object Demonstration
description: Testing different entities for horror game
type: tangibles
courses: {'compsci': {'week': 1}}
permalink: /plans/monster_smash
hide: false
---

%%html

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

        const ai = {
            x: 300, 
            y: 200, 
            speed: 0.1,
            health: 100,
        };

        const platform = {
            x: 0,
            y: 20,
            width: 1000,
            height: 10,
        }

        const bgmove = document.querySelector('.bgmove');

        function background() {
            let positionX = 0 - scroll.x + 350;
            bgmove.style.transform = 'translateX(${positionX}px)';
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
            
            console.log("player is located at" + player.x)
            console.log("ai is located at" + ai.x)
            // Move the AI towards the player
            if (ai.x < (player.x + canvas.width/2)) {
                ai.x += 0.5;
            } else if (ai.x > player.x) {
                ai.x -= 0.5;
            }

            // Change scroll variables to slide
            scroll.x += 0.05 * (player.x - scroll.x);
            scroll.y += 0.05 * (player.y - scroll.y);

            // Player Logic
            playerPosition();

            // Draw the player
            ctx.fillStyle = "blue";
            ctx.fillRect((player.x - scroll.x) + (canvas.width / 2), (player.y - scroll.y) + (canvas.height / 2), 20, 20);

            // Draw AI
            ctx.fillStyle = "red";
            ctx.fillRect(ai.x - scroll.x,ai.y - scroll.y,20,20);

            // Draw Platform
            ctx.fillStyle = "green";
            ctx.fillRect((platform.x-scroll.x)+(platform.width/-2),(platform.y-scroll.y)+(canvas.height/2),platform.width,platform.height);

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
