---
comments: False
layout: post
title: Minigame Testing 5
description: Add working elevator to second floor with interactivity
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
<button id="startButton">Start</button>
<canvas id="display" class="container" height="500px" width="500px"></canvas>
<audio id="audio" src="/Group/audio/rainonwindow.mp3" preload="auto" loop="true"></audio>

<script type="module">
//import needed modules
import Character from "/Group/myScripts/GameScripts/MinigameCharacterMovement.js";
import Object from "/Group/myScripts/GameScripts/CreateObject.js";
import {Display, subDisplay} from "/Group/myScripts/GameScripts/Displays.js";

//define if the character is alive or not 
var isCharacterAlive = true;
var showCharacter = true;
//track whether death animation has happened
var deathAnimationTriggered = false;

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
    if (isCharacterAlive === false){
        //draw player
    }
        //main character death
        var deathSpriteSheet = new Image();
        deathSpriteSheet.src = "/Group/images/Game/deathsprite.png";
        var deathObject = new Object("death", deathSpriteSheet, [24,54],[54,133],[0,1500],23,1);
        var showdeathObject = false;

        //Death Screen
        var deathScreen = new Image ();
        deathScreen.src = "/Group/images/Game/Death(1).png";
        var DeathScreenObject = new Object ("Death Screen Object", DeathScreenObject, [2000, 250],[54,133],[0,1500],8,1)

        //character death fade 
        var fadeSpriteSheet = new Image();
        fadeSpriteSheet.src = "/Group/images/Game/deathscreenfade-sprite.png";
        var fadeObject = new Object("fade",fadeSpriteSheet,[100,100],[1078,500],[0,500],50,1);

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
        
        //offset window starting frames 
        windowObject1.UpdateFrame(1);
        windowObject2.UpdateFrame(4);
        windowObject3.UpdateFrame(7);
        windowObject4.UpdateFrame(3);
        windowObject5.UpdateFrame(6);

        //office background
        var backgroundImage = new Image();
        backgroundImage.src = "/Group/images/Game/officeroom4.png";
        var backgroundObject = new Object("background",backgroundImage,[394,175],[1078,500],[0,500],1,1,[0,0]);

        //elevator 
        var elevatorSpriteSheet = new Image();
        elevatorSpriteSheet.src = "/Group/images/Game/elevator-sprite.png"
        var elevatorObject = new Object("elevator",elevatorSpriteSheet,[58,64],[130,180],[948,203],11,1);

    //eKey
        var EkeyImage = new Image ();
        EkeyImage.src = "/Group/images/Game/EKeySprite.png"
        var Ekey= new Object ("Ekey" ,EkeyImage, [400,354],[80,100],[230,300],2,1);
        var showEKeySprite = false;

        // Add the "E" key press event listener to handle the interaction with elevatorObject
        window.addEventListener('keydown', function (e) {
    if (e.keyCode === 69) {
        // Check for overlap with elevatorObject
        if (checkForOverlap(myCharacterObject, elevatorObject)) {
            if ((currentFrame % Math.round(fps/4)) == 0){
              //run elevator frame
                 elevatorObject.UpdateFrame();
                 }
         //hide Ekey sprite
        showEKeySprite = false;
        } else {
            // Make the E key related to elevatorObject disappear if no overlap            
            showEKeySprite = false;
        }
    }
});
// Function to draw the "Hold the EKey" message on the canvas
function drawHoldEKeyMessage() {
    // Adjust the text positioning and style as needed
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Hold the EKey", 365, 39); // Adjust position for your canvas
}

// Modify the event listener to start checking for overlap on page load
window.addEventListener('load', function () {
    checkForElevatorOverlap(); // Start checking for overlap
});

// Add the functionality to continuously check for overlap and show the message
function checkForElevatorOverlap() {
    if (checkForOverlap(myCharacterObject, elevatorObject)) {
        // Draw the "Hold the EKey" message if there is an overlap
        drawHoldEKeyMessage();
    }
    requestAnimationFrame(checkForElevatorOverlap);
}

// Function to initiate the elevator animation
function startElevatorAnimation() {
    const totalFrames = 11; // Adjust based on the total frames of your elevator animation

    let frameCount = 0;
    const elevatorAnimationInterval = setInterval(function () {
        if (frameCount < totalFrames) {
            elevatorObject.UpdateFrame(); // Update elevator frame
            display.draw(1); // Draw the updated frame on the canvas
            frameCount++;
        } else {
            clearInterval(elevatorAnimationInterval); // Stop the animation loop when done
        }
    }, 1000 / fps); // Adjust the timing based on your frame rate (fps)
}


    //text

var display = new subDisplay(canvas,[windowObject1,windowObject2,windowObject3,windowObject4,windowObject5,backgroundObject,elevatorObject,myCharacterObject,monsterObject,fadeObject,deathObject,DeathScreenObject]);

var fps = 22;
var active = true;
var animId;
var currentFrame = 0;
var sec = 0;
//overlap functions 
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

var animationFrame = 0;
function deathAnimation(){
    animationFrame = (animationFrame+1);
// Drawing the death sprite
        if (animationFrame % Math.round(2) == 0){
        deathObject.UpdateFrame()
        }
    //draw the death fade
        fadeObject.UpdateFrame()
    //Draw death screen
        DeathScreenObject.UpdateFrame()

 var characterPosition = myCharacterObject.ReturnPosition();
        deathObject.OverridePosition([characterPosition[0] + 23, characterPosition[1]]); // Adjust the position
        

    display.draw(1);

     setTimeout(function() {
    if(animationFrame < 45){animId = requestAnimationFrame(deathAnimation)}else;}, 1000 / fps);
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
    var monsterSpeed = 2;

    if (distance > monsterSpeed) {
        var angle = Math.atan2(deltaY, deltaX);
        var newX = monsterX + monsterSpeed * Math.cos(angle);
        var newY = monsterY + monsterSpeed * Math.sin(angle);
        monsterObject.OverridePosition([newX, newY]);
    }

    // Check for overlap between the character and the monster
    if (checkForOverlap(myCharacterObject, monsterObject)||checkForOverlap(monsterObject, myCharacterObject)) {
        isCharacterAlive = false;
        showCharacter = false;
        active = false;
        animationFrame = 0;
        display.objects = [windowObject1,windowObject2,windowObject3,windowObject4,windowObject5,backgroundObject,elevatorObject,monsterObject,fadeObject,deathObject,DeathScreenObject]
        deathAnimation();
    }
    // check for overlap between character and elevator 
    if (checkForOverlap(myCharacterObject, elevatorObject)) {
    console.log("Now press the E key");
    showEKeySprite = true;
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
    if(pos[0]>=-68 && pos[0]<828){
    display.OverrideScroll([-pos[0] +canvas.width/2,0]); 
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


    //console.log("fired")

    display.draw(1); //type 1 = with camera offset, type 2 = without camera offset

    canvas.getContext("2d").drawImage(hiddenCanvas,0,0); //draw shadows overtop

    // Drawing the EKey sprite
    if (showEKeySprite) {
        if (currentFrame % Math.round(fps/2)==0){
        Ekey.UpdateFrame()
        }

        Ekey.draw(canvas.getContext("2d"),[0,0]); // Draw the EKey sprite with camera offset
    }

    //run function again
    setTimeout(function() {if(active==true){animId = requestAnimationFrame(frame)};}, 1000 / fps);
}

//canvas.addEventListener("mousemove", function(e){
//    var scale = lightObject.ReturnScale();
//    lightObject.OverridePosition([e.offsetX-scale[0]/2,e.offsetY+scale[1]/2])
//});

 let isCanvasCodeInitialized = false;
// Add a click event listener to the button
startButton.addEventListener("click", function () {
    if (!isCanvasCodeInitialized) { // Run the canvas code only when the button is clicked
        // Reset the variables
        isCharacterAlive = true;
        showCharacter = true;
        audio.play();
        frame();
        isCanvasCodeInitialized = true;
    }
});
</script>
