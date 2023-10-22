---
comments: False
layout: post
title: Different Frames 
description: Showing How Multiple Frames would work (for menuing and different rooms)
type: hacks
courses: {'compsci': {'week': 6}}
categories: ['C4.1']
---
<style>
    .container{
        display:block;
        background-color:white;
    }
    .container2{
        width:25%;
        height:25%;
        display:inline-block;
        background-color:white;
    }
</style>
<canvas id="mainDisplay" class="container" height="500px" width="500px"></canvas>
<br>
<canvas id="subDisplay" class="container2" height="500px" width="500px"></canvas>
<canvas id="subDisplay1" class="container2" height="500px" width="500px"></canvas>


<script type="module">
//import needed modules
import Character from "/Group/myScripts/GameScripts/CharacterMovement.js";
import Object from "/Group/myScripts/GameScripts/CreateObject.js";
import light from "/Group/myScripts/GameScripts/Lights.js";
import {Display,subDisplay} from "/Group/myScripts/GameScripts/Displays.js"

//define canvas
var canvas = document.getElementById("mainDisplay");
var subCanvas = document.getElementById("subDisplay");
var subCanvas1 = document.getElementById("subDisplay1");

var hiddenCanvas = document.createElement("canvas");
hiddenCanvas.setAttribute("width","500px");
hiddenCanvas.setAttribute("height","500px");

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

var subDisplay1 = new subDisplay(subCanvas,[redObject,whiteObject,redObject2,whiteObject2,redObject3]);
subDisplay1.OverrideScroll[0,0];

var subDisplay2 = new subDisplay(subCanvas1,[myCharacterObject]);
subDisplay2.OverrideScroll[0,0];

var MainDisplay = new Display(canvas,subDisplay1);


var bool = false
var currentFrame = 0;
var sec = 0;
var active = true; //set to false to stop all animation
var fps = 24;
function frame(){
    currentFrame = (currentFrame+1)%fps;
    if (currentFrame == 0){sec+=1};

    var pos = myCharacter.onFrame(fps); //update frame, and get position
    pos = [pos.x,500-pos.y]; //fix position
    myCharacterObject.OverridePosition(pos); //update character Position

    subDisplay1.draw(0); //update subCanvas (withoutOffset)

    subDisplay2.draw(0); //update SubCanvas (without offset)

    console.log("fired")
    MainDisplay.handleFrame();
    if (sec % 5 ==0 && currentFrame == 0){
        if(bool==false){
            MainDisplay.setActiveDisplay(subDisplay1);
            bool = true;
        }
        else{
           MainDisplay.setActiveDisplay(subDisplay2);
            bool = false; 
        }
    }

setTimeout(function() {if(active == true){requestAnimationFrame(frame)}}, 1000 / fps);
}

frame()


</script>