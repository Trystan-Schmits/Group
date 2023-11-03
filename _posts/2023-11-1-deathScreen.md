---
comments: False
layout: post
title: l'écran de la mort
description: Pour quand tu mourras
type: tangibles
courses: {'compsci': {'week': 7}}
categories: ['C4.1']
---

<style>
    .container {
        display: block;
        background-color: black;

    }
</style>
<canvas id="deathScreen" class="container" width="500" height="400"></canvas>
<button id="startButton">Start</button>
<audio id="death" src="/Group/audio/death.mp3" preload="auto"></audio>

<script>
    const canvas = document.getElementById("deathScreen");
    const ctx = canvas.getContext("2d");
    
    // Define Look Up List
    const sources = ["/Group/images/Game/deathScreen/1Y.png","/Group/images/Game/deathScreen/2O.png","/Group/images/Game/deathScreen/3U.png","/Group/images/Game/deathScreen/4D.png","/Group/images/Game/deathScreen/5I.png","/Group/images/Game/deathScreen/6E.png","/Group/images/Game/deathScreen/7D.png"];

    // Clone Letter
    var textY = -250;
    function slideY(y,newY) {
        return (newY-y);
    };

    y1 = new Image();
    y1.src = sources[0];
    o2 = new Image();
    o2.src = sources[1];
    u3 = new Image();
    u3.src = sources[2];
    d4 = new Image();
    d4.src = sources[3];
    i5 = new Image();
    i5.src = sources[4];
    e6 = new Image();
    e6.src = sources[5];
    d7 = new Image();
    d7.src = sources[6];

    function update() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        textY = -250;
        ctx.drawImage(o2,250,250);

        requestAnimationFrame(update)
    };

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        death.play();
        update();
    });
</script>
