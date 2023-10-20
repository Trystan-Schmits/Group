---
comments: False
layout: post
title: Shading
description: Testing out how to shade a screen
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
import light from "/Group/myScripts/GameScripts/Lights.js";

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
    characterSpriteSheet.src = "/Group/images/Game/squidambient-sprite.png";
    var myCharacterObject = new Object("character", characterSpriteSheet,[190,175],[190,175],[250,500],4,1);

    //backgrounds
        //apartment background
        var redPixelSprite = new Image();
        redPixelSprite.src = "/Group/images/Game/redPixel.png"
        var redObject = new Object ("background1",redPixelSprite,[1,1],[100,500],[0,500],1,1);
        var redObject2 = new Object ("background3", redPixelSprite,[1,1],[100,500],[200,500],1,1);
        var redObject3 = new Object ("background5", redPixelSprite,[1,1],[100,500],[400,500],1,1);
        var whitePixelSprite = new Image();
        whitePixelSprite.src = "/Group/images/Game/whitePixel.png"
        var whiteObject = new Object ("background 2",whitePixelSprite,[1,1],[100,500],[100,500],1,1);
        var whiteObject2 = new Object ("background 4",whitePixelSprite,[1,1],[100,500],[300,500],1,1);
        //hallway

        //

    //lighting
    var lightingSprite = new Image();
    lightingSprite.src = "/Group/images/Game/ShadingV3.png";
    var lightObject = new Object("light",lightingSprite,[500,500],[500,500],[0,0],1,1);
    
    //neighbor

    //boxes

    //text


class Group{
    constructor(objects){
        this.objects = objects;
    }

    OverrideScroll(pos){
        this.objects.forEach(function(obj){obj.UpdateCameraScroll(pos)})
    }
}

var group1 = new Group([myCharacterObject,redObject,whiteObject,redObject2,whiteObject2,redObject3,lightObject])

var fps = 24;
var active = true;
var animId;
var currentFrame = 0;
var sec = 0;
var ScrollDir = -1;
var currentScroll = 0;
function frame(){ //when a frame is updated
    currentFrame = (currentFrame+1)%fps;
    if (currentFrame == 0){sec+=1}

    group1.OverrideScroll([-(10*sec+10*(1/fps)*currentFrame),0]); // update camera

    var pos = myCharacter.onFrame(fps); //update frame, and get position
    pos = [pos.x,500-pos.y]; //fix position
    myCharacterObject.OverridePosition(pos); //update objects
    

    if(currentFrame % Math.round(fps/4) == 0){
        if (myCharacter.moving == false && myCharacter.directionY == 0){ //if moving, and not jumping or crouching
            myCharacterObject.UpdateFrame();
        }
    }
    if(currentFrame % Math.round(fps/4)==0){
        light([[400,500,.5],[100,250,1],[400,100,1]],lightObject,hiddenCanvas,true)
    } 
    //draw frame
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);
    
    //background
    redObject.drawWithCameraScroll(ctx,[0,0]);
    redObject2.drawWithCameraScroll(ctx,[0,0]);
    redObject3.drawWithCameraScroll(ctx,[0,0]);
    whiteObject.drawWithCameraScroll(ctx,[0,0]);
    whiteObject2.drawWithCameraScroll(ctx,[0,0]);

    //character
    myCharacterObject.drawWithCameraScroll(ctx,[0,0]);

    //lighting
    ctx.drawImage(hiddenCanvas,0,0);

    //run function again
    setTimeout(function() {if(active==true){animId = requestAnimationFrame(frame)};}, 1000 / fps);
}


//canvas.addEventListener("mousemove", function(e){
//    var scale = lightObject.ReturnScale();
//    lightObject.OverridePosition([e.offsetX-scale[0]/2,e.offsetY+scale[1]/2])
//});
frame();
</script>