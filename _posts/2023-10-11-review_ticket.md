---
toc: false
comments: true
layout: post
title: Review Ticket
description: What to do for the day
type: tangibles
courses: { compsci: {week: 3} }
permalink: /tangibles/week3
---

## Hello

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sprite Animation</title>
    <style>
        canvas {
            border: 1px solid #000;
            background-color: #fff; /* Set background color to white */
        }
    </style>
</head>
<body>
    <canvas id="spriteCanvas" width="500" height="500"></canvas>

    <script>
        const canvas = document.getElementById('spriteCanvas');
        const ctx = canvas.getContext('2d');

        const sprite = new Image();
        sprite.src = '/Group/images/pixilart-sprite.png';

        const spriteWidth = 50;
        const spriteHeight = 50;

        let x = 50;
        let y = canvas.height / 2;
        const floatingSpeed = 1;

        function update() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Implement the floating effect
            y += Math.sin(x / 20) * floatingSpeed;

            // Draw the sprite
            ctx.drawImage(sprite, x, y, spriteWidth, spriteHeight);

            // Increment x for movement
            x += 2;

            // Request the next animation frame
            requestAnimationFrame(update);
        }

        // Start the animation when the sprite is loaded
        sprite.onload = function () {
            update();
        };

        // Handle errors loading the sprite
        sprite.onerror = function () {
            console.error('Error loading sprite');
        };
    </script>
</body>
</html>
