---
toc: False
comments: True
layout: post
title: Monster AI Test
description: Testing different entities for horror game
type: tangibles
courses: {'compsci': {'week': 0}}
permalink: /plans/monster_mash
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
    <img id="scream" src="img_the_scream.jpg" alt="The Scream" width="220" height="277">

    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

         function tentacle (x1,y1,x2,y2) {
            var x = x1;
            var y = y1;

            var img = 
         };

        // Update function
        function update() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            //

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
