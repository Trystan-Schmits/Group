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

////create objects
    //main character
    var characterSpriteSheet = new Image();
    characterSpriteSheet.src = "/Group/images/Game/squidambient-sprite.png";
    var myCharacterObject = new Object(characterSpriteSheet,[190,175],[190,175],[250,500],4,1);

    //backgrounds
        //apartment background
        var redPixelSprite = new Image();
        redPixelSprite.src = "/Group/images/Game/redPixel.png"
        var whitePixelSprite = new Image();
        whitePixelSprite.src = "/Group/images/Game/whitePixel.png"
        //hallway

        //

    //lighting
    var lightingSprite = new Image();
    lightingSprite.src = "/Group/images/Game/shadingV2.png";
    var lightObject = new Object(lightingSprite,[500,500],[500,500],[0,0],1,1);
    
    //neighbor

    //boxes

    //text


var fps = 24;
var active = true;
var animId;
var currentFrame = 0;
var sec = 0;
function frame(){ //when a frame is updated
    currentFrame = (currentFrame+1)%fps;
    if (currentFrame == 0){sec+=1}

    //var pos = myCharacter.onFrame(fps); //update frame, and get position
    //pos = [pos.x,500-pos.y] //fix position
    //myCharacterObject.OverridePosition(pos); //update objects
    
    //var scale = lightObject.ReturnScale();
    //lightObject.OverridePosition([pos[0]+scale[0]/2,pos[1]+scale[1]/2])
    //lightObject.OverridePosition([pos[0]-scale[0]/2+100,pos[1]+scale[1]/2-100])

    if(currentFrame % Math.round(fps/4) == 0){
        if (myCharacter.moving == false && myCharacter.directionY == 0){ //if moving, and not jumping or crouching
            myCharacterObject.UpdateFrame();
        }
    } 
    //draw frame
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    myCharacterObject.draw(ctx,[0,0],20);

    //shadows
    light([[-150,500],[250,500]],hiddenCanvas)
    //var imgData = ctxH.getImageData(0,0,canvas.width,canvas.height);
    //var pixels = imgData.data;
    //for (let i=3;i<pixels.length;i+=4){
    //    pixels[i] = 255-pixels[i];
    //}
    //ctxH.clearRect(0,0,500,500);
    //ctxH.putImageData(imgData,0,0);
    
    ctx.drawImage(hiddenCanvas,0,0);

    //run function again
    setTimeout(function() {if(active==true){animId = requestAnimationFrame(frame)};}, 1000 / fps);
}

function light(sourceLocations,canvas){
    var oldData;
    var ctx = canvas.getContext("2d")
    ctx.clearRect(0,0,500,500)
    lightObject.draw(ctx,sourceLocations[0])
    for (let i=1;i<sourceLocations.length;i++){

        oldData = ctx.getImageData(0,0,500,500);

        lightObject.draw(ctx,sourceLocations[i]);
        var newData = ctx.getImageData(0,0,500,500);

        for (let i2=3;i2<newData.length;i2++){
            console.log("hi")
            newData.data[i2]=(newData.data[i]<oldData.data[i])?newData.data[i]:oldData.data[i];
        }
        ctx.putImageData(newData,0,0)

    }
}


//canvas.addEventListener("mousemove", function(e){
//    var scale = lightObject.ReturnScale();
//    lightObject.OverridePosition([e.offsetX-scale[0]/2,e.offsetY+scale[1]/2])
//});
window.addEventListener('keydown', function(e) { //prevent space from moving screen
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

frame();
</script>