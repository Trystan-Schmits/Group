---
comments: False
layout: post
title: Minigame Testing 3
description: Adding interactivity and monster to minigame
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
<button id="startButton">Start</button>
<audio id="audio" src="/Group/audio/rainonwindow.mp3" preload="auto" loop="true"></audio>

<script type="module">
//import needed modules
import Character from "/Group/myScripts/GameScripts/MinigameCharacterMovement.js";
import Object from "/Group/myScripts/GameScripts/CreateObject.js";
import {Display, subDisplay} from "/Group/myScripts/GameScripts/Displays.js";

//define if the character is alive or not 
var isCharacterAlive = true;


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

//vertical position and speed variables
var characterY = 0; // Initial vertical position of the character
var characterYSpeed = 0; // Vertical speed of the character


//create objects
    //main character
    var characterSpriteSheet = new Image();
    characterSpriteSheet.src = "/Group/images/Game/walking-sprite.png";
    var myCharacterObject = new Object("character", characterSpriteSheet,[44,54],[100,133],[0,500],5,1);
        //main character death
        var deathSpriteSheet = new Image();
        deathSpriteSheet.src = "/Group/images/Game/deathsprite.png";
        var deathObject = new Object("death", deathSpriteSheet, [24,54],[54,133],[0,1500],23,1);
        var showdeathObject = false;

    //potato monster
    var monsterSpriteSheet = new Image();
    monsterSpriteSheet.src = "/Group/images/Game/potatowalking-sprite.png";
    var monsterObject = new Object("potato", monsterSpriteSheet,[315, 320],[105, 106.666667],[100,250],4,1);
    monsterObject.UpdateFrame();

    //backgrounds
        //windows
        var windowSpriteSheet = new Image();
        windowSpriteSheet.src = "/Group/images/Game/window-rain-sprite.png";
        var windowObject1 = new Object("window", windowSpriteSheet,[100,100],[164,180],[30,174],22,1);
        var windowObject2 = new Object("window", windowSpriteSheet,[100,100],[164,180],[210,174],22,1);
        var windowObject3 = new Object("window", windowSpriteSheet,[100,100],[164,180],[385,174],22,1);
        var windowObject4 = new Object("window", windowSpriteSheet,[100,100],[164,180],[566,174],22,1);
        var windowObject5 = new Object("window", windowSpriteSheet,[100,100],[164,180],[747,174],22,1);
        windowObject1.UpdateFrame(1);
        windowObject2.UpdateFrame(4);
        windowObject3.UpdateFrame(7);
        windowObject4.UpdateFrame(3);
        windowObject5.UpdateFrame(6);

        //office background
        var backgroundImage = new Image();
        backgroundImage.src = "/Group/images/Game/officeroom4.png";
        var backgroundObject = new Object("background",backgroundImage,[394,175],[1078,500],[0,500],1,1,[0,0])

        //elevator 
        var elevatorSpriteSheet = new Image();
        elevatorSpriteSheet.src = "/Group/images/Game/elevator-sprite.png"
        var elevatorObject = new Object("elevator",elevatorSpriteSheet,[58,64],[130,180],[948,203],11,1);

        //

    //text

var display = new subDisplay(canvas,[windowObject1,windowObject2,windowObject3,windowObject4,windowObject5,backgroundObject,elevatorObject,myCharacterObject,deathObject,monsterObject]);

var fps = 22;
var active = true;
var animId;
var currentFrame = 0;
var sec = 0;
function checkForOverlap(object1, object2) {
    var pos1 = object1.ReturnPosition().slice();
    var scale1 = object1.ReturnScale().slice();
    var xRange1 = [pos1[0], pos1[0] + scale1[0]];
    var yRange1 = [pos1[1], pos1[1] + scale1[1]];

    var pos2 = object2.ReturnPosition().slice();
    var scale2 = object2.ReturnScale().slice();
    var xRange2 = [pos2[0], pos2[0] + scale2[0]];
    var yRange2 = [pos2[1], pos2[1] + scale2[1]];

    if (
        xRange1[0] >= xRange2[0] &&
        xRange1[0] <= xRange2[1] &&
        yRange1[0] >= yRange2[0] &&
        yRange1[0] <= yRange2[1]
    ) {
        return true;
    }

    if (
        xRange1[0] >= xRange2[0] &&
        xRange1[0] <= xRange2[1] &&
        yRange1[1] >= yRange2[0] &&
        yRange1[1] <= yRange2[1]
    ) {
        return true;
    }

    if (
        xRange1[1] >= xRange2[0] &&
        xRange1[1] <= xRange2[1] &&
        yRange1[0] >= yRange2[0] &&
        yRange1[0] <= yRange2[1]
    ) {
        return true;
    }

    if (
        xRange1[1] >= xRange2[0] &&
        xRange1[1] <= xRange2[1] &&
        yRange1[1] >= yRange2[0] &&
        yRange1[1] <= yRange2[1]
    ) {
        return true;
    }

    return false;
}
function frame(){ //when a frame is updated
    currentFrame = (currentFrame+1)%fps;
    if (currentFrame == 0){sec+=1}

    //run window animations
    windowObject1.UpdateFrame();
    windowObject2.UpdateFrame();
    windowObject3.UpdateFrame();    
    windowObject4.UpdateFrame();    
    windowObject5.UpdateFrame();
    if ((currentFrame % Math.round(fps/4)) == 0){
    //run elevator frame
    elevatorObject.UpdateFrame();
    }

    //run monster walking animation
    monsterObject.UpdateFrame();

    var pos = myCharacter.onFrame(fps); //update frame, and get position
    pos = [pos.x,500-pos.y]; //fix position
    // Add a conditional check to limit the character's y-coordinate
    if (pos[1] < 240) {
        pos[1] = 240;
    }
     if (pos[1] > 500) {
        pos[1] = 500;
    }
    if (pos[0] < -32) {
        pos[0] = -32;
    }

    // Calculate the distance between the character and the monster
    var characterX = pos[0];
    var characterY = pos[1];
    var monsterX = monsterObject.position[0];
    var monsterY = monsterObject.position[1];
    var deltaX = characterX - monsterX;
    var deltaY = characterY - monsterY;
    var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Define a speed at which the monster follows the character
    var monsterSpeed = 3;

    if (distance > monsterSpeed) {
        var angle = Math.atan2(deltaY, deltaX);
        var newX = monsterX + monsterSpeed * Math.cos(angle);
        var newY = monsterY + monsterSpeed * Math.sin(angle);
        monsterObject.OverridePosition([newX, newY]);
    }

     // Check for overlap between the character and the monster
    if (checkForOverlap(myCharacterObject, monsterObject)) {
        isCharacterAlive = false;
    }

    //console.log(pos)

    //draw frame
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500); 

    //console.log(pos)
    if(pos[0]>=-64 && pos[0]<1008){
    myCharacterObject.OverridePosition(pos); //update character position
    if(myCharacter.movingX == true){ //if charavter is moving then animate
        if (currentFrame % Math.round(fps/12)==0){
        myCharacterObject.UpdateFrame()
        }
    }
    }
    else{
        if(pos[0]<-64){
            myCharacter.position = {x:-64,y:myCharacter.position.y}
        }
        else{
            myCharacter.position = {x:1008,y:myCharacter.position.y}
        }
    }

    if (pos[0]>=0 && pos[0]<576){
    display.OverrideScroll([-pos[0],0]); //scroll everything
    }
    
    if (checkForOverlap(myCharacterObject, monsterObject)) {
        console.log("test");
    }
    if (checkForOverlap(myCharacterObject, monsterObject) || checkForOverlap(myCharacterObject, monsterObject)) {
    console.log("test");
    showdeathObject = true;
    }

    //console.log("fired")

    display.draw(1); //type 1 = with camera offset, type 2 = without camera offset

    // Draw the character or death sprite based on isCharacterAlive
    if (isCharacterAlive) {
        display.draw(1); // Draw the character if it's alive
    } else {
        // Draw the "deathsprite.png" in the character's position
        var characterPosition = myCharacterObject.ReturnPosition();
        deathObject.OverridePosition(characterPosition);
        deathObject.UpdateFrame();
        display.draw(1); // Draw the death sprite
    }

    canvas.getContext("2d").drawImage(hiddenCanvas,0,0); //draw shadows overtop

    // Drawing the death sprite
    if (showdeathObject) {
        if (currentFrame % Math.round(fps/2)==0){
        deathObject.UpdateFrame()
        }
    }
    //run function again
    setTimeout(function() {
        if(active==true){
            animId = requestAnimationFrame(frame)};}, 1000 / fps);
}

//canvas.addEventListener("mousemove", function(e){
//    var scale = lightObject.ReturnScale();
//    lightObject.OverridePosition([e.offsetX-scale[0]/2,e.offsetY+scale[1]/2])
//});

 let isCanvasCodeInitialized = false;
// Add a click event listener to the button
startButton.addEventListener("click", function () {
    if (!isCanvasCodeInitialized) {
        // Run the canvas code only when the button is clicked
        audio.play();
        frame();
        isCanvasCodeInitialized = true;
    }
});
</script>
