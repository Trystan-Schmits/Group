---
comments: False
layout: post
title: Ending Credits (Simpilified)
description: For the end of the game
type: tangibles
courses: {'compsci': {'week': 6}}
categories: ['C4.1']
---

<style>
    .container {
        display: block;
        background-color: black;
        
    }
</style>
<canvas id="credits" class="container" width="500px" height="400px"></canvas>
<button id="startButton">Start</button>
<audio id="audio" src="/Group/audio/2023-10-27-endingCredits.mp3" preload="auto"></audio>

<script>
    const canvas = document.getElementById("credits");
    const ctx = canvas.getContext("2d");
    ctx.save(); //for resetting the context later
    var scrollY = 0;

    // Credits Text
    function text(text, yOffset, modifiers, xOffset) {
        if (xOffset == null){xOffset = canvas.width/2};
        ctx.restore();
        if (modifiers == null){ //default
            ctx.font = "14px Arial";
            ctx.textAlign = "center"
            ctx.fillStyle = "white";
        }
        else{ //if the object exists
            for(const [key,value] of Object.entries(modifiers)){ //loop through entries
                ctx[key]=value; //set the context changes (ex:{fillStyle:"red"} will set ctx.fillStyle to red)
            } 
        }
        ctx.fillText(text,xOffset,scrollY-yOffset); //draw text at middle, and draw y with scroll and offset
    };
    function addText() { //Text,Offset
        text("Created By", 0);
        text("Sean Nakagawa", 50,{font:"18px Arial",fillStyle:"red"});
        var gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height); //create a gradient starting top left, ending bottom right
        gradient.addColorStop(0.25,"blue"); //add colors
        gradient.addColorStop(.5,"white");
        gradient.addColorStop(.75,"blue");
        text("Trystan Schmits", 100, {font:"700 24px cursive",fillStyle:gradient});
        var gradient3 = ctx.createLinearGradient(0,0,0,canvas.height); //create a gradient starting top left, ending bottom right
        gradient3.addColorStop(.75, "green"); //add colors
        gradient3.addColorStop(.25,"#66FF99");
        text("Zafeer Ahmed", 150,{font:"bold 20px cursive",fillStyle:gradient3});
        var gradient2 = ctx.createLinearGradient(0,0,0,canvas.height); //create a gradient starting top left, ending bottom right
        gradient2.addColorStop(.75, "white"); //add colors
        gradient2.addColorStop(.25,"black");
        text("Spencer Lyons", 200,{font:"16px Arial",fillStyle:gradient2});
    };
    var fps = 24;
    function update() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        addText();
        scrollY += 1;
        setTimeout(requestAnimationFrame(update),1000/(fps));
    };
    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        audio.play();
        update();
    });
</script>