---
comments: False
layout: post
title: Minigame Testing 2
description: Testing out mini game room with scrolling and elevator interactivity
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
import Character from "/Group/myScripts/GameScripts/MinigameCharacterMovement.js";
import Object from "/Group/myScripts/GameScripts/CreateObject.js";
import {Display, subDisplay} from "/Group/myScripts/GameScripts/Displays.js";

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

   
    //neighbor

    //text

var display = new subDisplay(canvas,[windowObject1,windowObject2,windowObject3,windowObject4,windowObject5,backgroundObject,elevatorObject,myCharacterObject]);

var fps = 24;
var active = true;
var animId;
var currentFrame = 0;
var sec = 0;
function frame(){ //when a frame is updated
    currentFrame = (currentFrame+1)%fps;
    if (currentFrame == 0){sec+=1}

    //run window animations
    windowObject1.UpdateFrame();
    windowObject2.UpdateFrame();
    windowObject3.UpdateFrame();    
    windowObject4.UpdateFrame();    
    windowObject5.UpdateFrame();

    var pos = myCharacter.onFrame(fps); //update frame, and get position
    pos = [pos.x,500-pos.y]; //fix position
    // Add a conditional check to limit the character's y-coordinate
    if (pos[1] < 240) {
        pos[1] = 240;
    }
    if (pos[0] < -32) {
        pos[0] = -32;
    }


    console.log(pos)


    //draw frame
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500); 

    //draw windows
    windowObject1.draw(ctx,[0,0]);
    windowObject2.draw(ctx,[0,0]);
    windowObject3.draw(ctx,[0,0]);
    windowObject4.draw(ctx,[0,0]);
    windowObject5.draw(ctx,[0,0]);

    //draw background second
    backgroundObject.draw(ctx,[0,0]);

    //draw character 
    myCharacterObject.draw(ctx,[0,0]);

    //draw elevator
    elevatorObject.draw(ctx,[0,0]);

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

    display.draw(1); //type 1 = with camera offset, type 2 = without camera offset

    canvas.getContext("2d").drawImage(hiddenCanvas,0,0); //draw shadows overtop

    //run function again
    setTimeout(function() {if(active==true){animId = requestAnimationFrame(frame)};}, 1000 / fps);
}

//canvas.addEventListener("mousemove", function(e){
//    var scale = lightObject.ReturnScale();
//    lightObject.OverridePosition([e.offsetX-scale[0]/2,e.offsetY+scale[1]/2])
//});

frame();
</script>
