---
comments: False
layout: post
title: Minigame Testing 1
description: Testing out minigame room with sprites
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
//import needed modules
import Character from "/Group/myScripts/GameScripts/CharacterMovement.js";
import Object from "/Group/myScripts/GameScripts/CreateObject.js";

//define canvas
var canvas = document.getElementById("display");
var hiddenCanvas = document.createElement("canvas");
hiddenCanvas.setAttribute("width","500px");
hiddenCanvas.setAttribute("height","500px");
hiddenCanvas.setAttribute("willReadFrequently",true);

//bind inputs to a controller
var myCharacter = new Character();
document.addEventListener("keydown",myCharacter.handleKeydown.bind(myCharacter));
document.addEventListener("keyup",myCharacter.handleKeyup.bind(myCharacter));

//create objects
    //main character
    var characterSpriteSheet = new Image();
    characterSpriteSheet.src = "/Group/images/Game/walking-sprite.png";
    var myCharacterObject = new Object("character", characterSpriteSheet,[44,54],[100,133],[0,500],5,1);

    //backgrounds
        //apartment background
        var backgroundImage = new Image();
        backgroundImage.src = "/Group/images/Game/minigameroom.png";
        var backgroundObject = new Object("background", backgroundImage,[197,175],[500,500],[0,500],1,1);
        //hallway

        //

    //windows
    var windowSpriteSheet = new Image();
    windowSpriteSheet.src = "/Group/images/Game/window-rain-sprite.png";
    var windowObject1 = new Object("window", windowSpriteSheet,[100,100],[152,180],[7,174],22,1);
    var windowObject2 = new Object("window", windowSpriteSheet,[100,100],[152,180],[175,174],22,1);
    var windowObject3 = new Object("window", windowSpriteSheet,[100,100],[152,180],[337,174],22,1);
    windowObject1.UpdateFrame(1);
    windowObject2.UpdateFrame(4);
    windowObject3.UpdateFrame(7);

    //text

var fps = 24;
var active = true;
var animId;
var currentFrame = 0;
var sec = 0;

function frame(){ //when a frame is updated
    currentFrame = (currentFrame+1)%fps;
    if (currentFrame == 0){
        sec+=1
    }
    windowObject1.UpdateFrame();
    windowObject2.UpdateFrame();
    windowObject3.UpdateFrame();        

    var pos = myCharacter.onFrame(fps); //update frame, and get position
    pos = [pos.x,500-pos.y]; //fix position
    myCharacterObject.OverridePosition(pos); //update objects
    
    console.log(pos)

    if(currentFrame % Math.round(fps/4) == 0){
        if (myCharacter.moving == true && myCharacter.directionY == 0){ //if moving, and not jumping or crouching
            myCharacterObject.UpdateFrame();
        }
    }

    var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);

    //draw frame
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);    

    //draw windows
    windowObject1.draw(ctx,[0,0]);
    windowObject2.draw(ctx,[0,0]);
    windowObject3.draw(ctx,[0,0]);
    //draw background second
    backgroundObject.draw(ctx,[0,0]);
    //draw character 
    myCharacterObject.draw(ctx,[0,0])

    //run function again
    setTimeout(function() {
        if(active==true){
            animId = requestAnimationFrame(frame);
            }
        }, 1000 / fps);
    }

//canvas.addEventListener("mousemove", function(e){
//    var scale = lightObject.ReturnScale();
//    lightObject.OverridePosition([e.offsetX-scale[0]/2,e.offsetY+scale[1]/2])
//});
frame();
</script>