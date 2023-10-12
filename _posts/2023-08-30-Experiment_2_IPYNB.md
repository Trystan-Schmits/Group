---
toc: False
comments: True
layout: post
title: Experiment 2
description: Testing depth and visual effects
type: hacks
courses: {'compsci': {'week': 1}}
permalink: /compsci/experiment
---

%%html

<html>
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="700" height="400"></canvas>

    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        // Camera
        const cam = {
            x: 0,
            y: 0,
            z: -200,
        };

        // Object Position
        const object = {
            x: 0,
            y: 0,
            z: 0,
        };

        function point(x,y,z) {
            object.x += x;
            object.y += y;
            object.z += z;
        };

        function calc(x,y,z) {
            point(x-cam.x,y-cam.y,z-cam.z);
            point(object.x*(250/object.z),object.y*(250/object.z),object.z)
        };

        function distance(x,y,z) {
            const tx = 0;
            const ty = 0;
            const tz = 0;
            tx = x - cam.x;
            ty = y - cam.y;
            tz = z - cam.z;
            const distance = 0;
            distance = Math.sqrt((tx*tx)+(ty*ty)+(tz*tz));
        };

        // Update function
        function update() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Render Object
            calc(0,0,100);
            distance(object.x,object.y,object.z);
            ctx.rectFill(object.x,object.y,20,20);


            // Request the next animation frame
            requestAnimationFrame(update);
        };

        // Start the game loop
        update();

        // Event listener for player movement (arrow keys)
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "W":
                    cam.z += 4;
                    event.preventDefault();
                    break;
                case "S":
                    cam.z -= 4;
                    event.preventDefault();
                    break;
                case "D":
                    cam.x += 4;
                    event.preventDefault();
                    break;
                case "A":
                    cam.x -= 4;
                    event.preventDefault();
                    break;
            }
        });
    </script>
</body>
</html>
