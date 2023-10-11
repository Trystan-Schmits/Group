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
        background-color:white;
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
var myCharacterObject = new Object(characterSpriteSheet,[500,500],[50,50],[250,250],10,1);


var fps = 24;
var active = true;
var animId;
var currentFrame = 0;
function frame(){ //when a frame is updated
    currentFrame = (currentFrame+1)%fps;

    //var pos = myCharacter.onFrame(fps); //update frame, and get position
    //pos = [pos.x,500-pos.y] //fix position
    //myCharacterObject.OverridePosition(pos); //update object

    if(currentFrame % Math.round(fps/4) == 0){
        myCharacterObject.UpdateFrame();
    }

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);
    myCharacterObject.draw(ctx,[0,0],1); //draw

    // run function again
    setTimeout(function() {if(active==true){animId = requestAnimationFrame(frame)};}, 1000 / fps);
}
frame();

window.addEventListener('keydown', function(e) { //prevent space from moving screen
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});
</script>