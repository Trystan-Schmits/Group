---
comments: False
layout: post
title: Sprite Animation
description: Simple requestAnimationFrame() for sprite animation
type: hacks
courses: {'compsci': {'week': 5}}
categories: ['C4.1']
---
<style>
    .container{
        display: Block;
        background-color: white;
    }
</style>


<h>Animation</h>
<button id="start">start</button>
<button id="stop">stop</button>
<button id="reset">reset</button>
<input id="fps" type="number" onfocus="this.value=''" />
<button id="setFps">set fps</button>

<canvas width="500px" height="500px" id="container" class="container"></canvas>

<script type="module">
//importModules
import Movement from "/Group/myScripts/MovementModule.js" //standAlone

import Drawing from "/Group/myScripts/DrawingModule.js"//must be used with object
import Object from "/Group/myScripts/CreateObject.js" //must be used with drawing

//to be assigned
var movement;
var Drawer;

//base variables
let fps = 25;
var animId;
let active = false;
var canvas = document.getElementById("container");
var state = 0;
var lastDirection = 1;
let CurrentFrame = 0;

//objects
var character = new Image(); //character
character.src = "/Group/images/Game/CharacterSpriteSheet.png";
//document.getElementById("setFps").insertAdjacentElement("afterend", character);
var charObject = new Object(character,[31,54],[90,160],[0,0],2,4);

var background = new Image(); //Background0
background.src = "/Group/images/Game/room1.png";
var backgroundObject = new Object(background,[438,115],[1472,400],[0,0],1,1);

var dresser = new Image(); //object1
dresser.src = "/Group/images/Game/drawer1.png";
var desserObject = new Object(dresser,[28,28],[94,94],[21,13],1,1);

var slime = new Image();//slime
slime.src = "/Group/images/Game/slime.jpeg"
var slimeObject = new Object(slime,[225,200],[20,20],[150,0],1,1);

var eyes = new Image();
eyes.src = "/Group/images/Game/eyes.png"
var eyesObject = new Object(eyes,[20,10],[60,30],[300,300],3,1)

var objects = [[backgroundObject],[eyesObject],[desserObject],[slimeObject]];

function checkForOverlap(object1,object2){
    var pos1 = object1.ReturnPosition().slice();
    var scale1 = object1.ReturnScale().slice();   
    var xRange1 = [pos1[0],pos1[0]+scale1[0]];
    var yRange1 = [pos1[1],pos1[1]+scale1[1]];

    var pos2 = object2.ReturnPosition().slice();
    var scale2 = object2.ReturnScale().slice();   
    var xRange2 = [pos2[0],pos2[0]+scale2[0]];
    var yRange2 = [pos2[1],pos2[1]+scale2[1]];
    
    if (xRange1[0]>=xRange2[0]){
        if (xRange1[0]<=xRange2[1]){
            if (yRange1[0]>=yRange2[0]){
                if (yRange1[0]<=yRange2[1]){
                    return true;
                }
            }
            if (yRange1[1]>=yRange2[0]){
                if (yRange1[1]<=yRange2[1]){
                    return true;
                }
            }
        }
    }
    if (xRange1[1]>=xRange2[0]){
        if (xRange1[1]<=xRange2[1]){
            if (yRange1[0]>=yRange2[0]){
                if (yRange1[0]<=yRange2[1]){
                    return true;
                }
            }
            if (yRange1[1]>=yRange2[0]){
                if (yRange1[1]<=yRange2[1]){
                    return true;
                }
            }
        }
    }
    return false;
}
function checkForCharacterOverlap(object1){
    var scroll = Drawer.ReturnScroll();

    var pos1 = charObject.ReturnPosition().slice();
    pos1[0] = scroll + canvas.offsetWidth/2;
    var scale1 = charObject.ReturnScale().slice();
    var xRange1 = [pos1[0],pos1[0]+scale1[0]];
    var yRange1 = [pos1[1],pos1[1]+scale1[1]];

    var pos2 = object1.ReturnPosition().slice();
    var scale2 = object1.ReturnScale().slice();   
    var xRange2 = [pos2[0],pos2[0]+scale2[0]];
    var yRange2 = [pos2[1],pos2[1]+scale2[1]];

    if (xRange1[0]>=xRange2[0]){
        if (xRange1[0]<=xRange2[1]){
            if (yRange1[0]>=yRange2[0]){
                if (yRange1[0]<=yRange2[1]){
                    return true;
                }
            }
            if (yRange1[1]>=yRange2[0]){
                if (yRange1[1]<=yRange2[1]){
                    return true;
                }
            }
        }
    }
    if (xRange1[1]>=xRange2[0]){
        if (xRange1[1]<=xRange2[1]){
            if (yRange1[0]>=yRange2[0]){
                if (yRange1[0]<=yRange2[1]){
                    return true;
                }
            }
            if (yRange1[1]>=yRange2[0]){
                if (yRange1[1]<=yRange2[1]){
                    return true;
                }
            }
        }
    }
    return false;
}

function HandleInteractions(){

}

function frame(){ //when a frame is updated
    CurrentFrame += 1;

    movement.update(fps);
    Drawer.update(movement.position()[0]);

    //slime movement
    if (slimeObject.ReturnPosition()[0] < (Drawer.ReturnScroll()+canvas.offsetWidth/2)){
        slimeObject.OverridePosition([slimeObject.ReturnPosition()[0]+10/fps,0]);
    }
    else{
        slimeObject.OverridePosition([slimeObject.ReturnPosition()[0]-10/fps,0]);
    }

    if (eyesObject.ReturnPosition()[0] < (Drawer.ReturnScroll()+canvas.offsetWidth/2)){
        eyesObject.UpdateFrame(0);
        console.log(true);
    }
    else{
        eyesObject.UpdateFrame(2);
        console.log(false);
    }
    //character Animation
    var F = 0;
    if (CurrentFrame % Math.round(fps/2)== 0){F+=1; charObject.UpdateFrame(F);};

    switch(movement.state()){
        case 0: 
            if (lastDirection == 1){
                state = 0;
            }
            else {
                state = 2;
            }
            break;
        case 1:
                state = 1;
                lastDirection = 1;
            break;
        case -1:
                state = 3;
                lastDirection = -1;
            break;
    }


    Drawer.draw(canvas,state); //draw frame
    setTimeout(function() {if(active==true){animId = requestAnimationFrame(frame)};}, 1000 / fps);
}

function start(){
    if (active==true){return;};
    active = true;
    animId = requestAnimationFrame(frame);
}

function setFps(){
    fps = document.getElementById("fps").value;
}
function stop(){
    active = false;
    cancelAnimationFrame(animId);
}

function reset(a){
    console.log("reset a:" + a);
    stop();
    
    if (a !== 1 ) {
    document.removeEventListener("keydown",movement.handleKeydown.bind(movement));
    document.removeEventListener("keyup",movement.handleKeyup.bind(movement));
    }

    Drawer = new Drawing(objects,charObject,canvas,100);

    movement = new Movement(0,0);
    document.addEventListener("keydown",movement.handleKeydown.bind(movement));
    document.addEventListener("keyup",movement.handleKeyup.bind(movement));
    
    Drawer.draw(canvas,movement.state());
}


window.onload = reset(1);
document.getElementById("start").addEventListener("click",start);
document.getElementById("stop").addEventListener("click",stop)
document.getElementById("setFps").addEventListener("click",setFps)
document.getElementById("reset").addEventListener("click",reset)

</script>