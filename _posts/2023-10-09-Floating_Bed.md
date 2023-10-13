---
comments: False
layout: post
title: Floating Bed
description: Week 1 work on our game.
type: hacks
courses: {'compsci': {'week': 6}}
categories: ['C4.1']
---
<style>
    .container{
        display:block;
        background-color:black;
    }
</style>
<canvas id="display" class="container" height="500px" width="500px"></canvas>

<script type="module">
import Character from "/Group/myScripts/GameScripts/CharacterMovement.js";
import Object from "/Group/myScripts/GameScripts/CreateObject.js";

var canvas = document.getElementById("display");

var myCharacter = new Character();
document.addEventListener("keydown",myCharacter.handleKeydown.bind(myCharacter));
document.addEventListener("keyup",myCharacter.handleKeyup.bind(myCharacter));
var characterSpriteSheet = new Image();
characterSpriteSheet.src = "/Group/images/Game/floatingBed.png";
var myCharacterObject = new Object(characterSpriteSheet,[500,500],[250,250],[250,250],10,1);


var fps = 24;
var active = true;
var animId;
var currentFrame = 0;

var x = 0;
var y = 0;

function overidePosition(x1, y1) {
  // Update the position based on depth
  x1 = x1 * (250 / this.depth);
  y1 = y1 * (250 / this.depth);
  this.position[0] = x1;
  this.position[1] = y1;
};

function float(height) {
  x -= 10;
  y = height * Math.sin(currentFrame*(FPS*10));

  if (x < -canvas.width) {
    x = canvas.width;
  }
};

function frame(){ //when a frame is updated
    overidePosition();

    const ctx = getContext("2d");
    ctx.clearRect(0,0,500,500);
    myCharacterObject.draw(ctx,[0,0],1)

    frame();
};
frame();

window.addEventListener('keydown', function(e) { //prevent space from moving screen
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});
</script>