---
comments: False
layout: post
title: Trystan
description: How our game works
type: tangibless
courses: {'compsci': {'week': 7}}
categories: ['C4.1']
permalink: /projectSummary/Trystan
---
{% include Documentation_basics.html %}

<body>

<style>
.accordion {
  background-color: #eee;
  color: black;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active, .accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  background-color: grey;
  color: black;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
</style>

<h1 id="introduction">Introduction</h1>
<ul>
  <li>Code <br />
I did a lot of code. I made most of the classes and functions (objects) that we used throughout the game.</li>
</ul>

<h2 id="object-class">“Object” Class</h2>
<style>
    .container{
        display:block;
        background-color:white;
    }
</style>

<canvas id="drawOnMe" class="container" width="100px" height="100px"></canvas>
<script type="module">
    import Object from "/Group/myScripts/GameScripts/CreateObject.js";
    var SquidSprite = new Image();
    SquidSprite.src = "/Group/images/Game/squidambient-sprite.png";
    var squidObject = new Object("character", SquidSprite ,[190,175],[90,90],[5,95],4,1);
    var currentFrame = 0;
    var ctx = document.getElementById("drawOnMe").getContext("2d");
    function frame(){
        currentFrame = (currentFrame+1)%24;
        if(currentFrame % 6 == 0){
            squidObject.UpdateFrame()
            ctx.clearRect(0,0,100,100)
            squidObject.draw(ctx,[0,0]);
        }  
    }
    setInterval(function(){requestAnimationFrame(frame)}, 1000 / 24);
</script>

<p><br /></p>

<button class="accordion">Code</button>
<div class="panel">

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>class CreateObject{
    constructor(Name,SpriteSheet,SpriteScale,DrawScale,position,maxFrames,states,cameraScroll){
        this.name = Name;
        this.image = SpriteSheet;
        this.SpriteSize = SpriteScale; //size of each sprite
        this.scale = DrawScale; // size of drawn image
        this.position = position; //[x,y]
        this.frame = 0;
        this.state = 0;
        this.maxFrames = maxFrames;
        this.maxState = states;
        this.cameraScroll = cameraScroll;
        console.log(this)
    }

    ReturnPosition(){
        return this.position;
    }

    ReturnScale(){
        return this.scale;
    }

    OverridePosition(pos){
        this.position = pos;
    }

    UpdateFrame(newFrame){
        if (newFrame == null){newFrame = this.frame+1}
        this.frame = newFrame%this.maxFrames;
    }

    UpdateState(newState){
        if (newState == null){newState = this.state+1}
        this.state = newState%this.maxState;
    }

    UpdateCameraScroll(newScroll){
        this.cameraScroll = newScroll;
    }

    draw(ctx,scroll,rotation,reScale){
        ctx.imageSmoothingEnabled = false;
        if (rotation == null){rotation = 0};
        if (reScale == null){ if(scroll[2]==null){reScale = 1}else{reScale=scroll[2]}};
        var s1 = this.state;
        var x = this.position[0]+scroll[0];
        var y = this.position[1]+scroll[1];
        var a = (rotation * Math.PI)/180; //convert to rad
        
        //rotate object
        ctx.translate(x,y);
        ctx.rotate(a);

        //draw
        ctx.drawImage(this.image,this.frame*this.SpriteSize[0],s1*this.SpriteSize[1],this.SpriteSize[0],this.SpriteSize[1],0,0,this.scale[0]*reScale,-1*this.scale[1]*reScale);

        //undo rotations for next objects
        ctx.rotate(-a);
        ctx.translate(-x,-y);

    }

    drawWithCameraScroll(ctx,scroll,rotation,reScale){
        if (this.cameraScroll == null){throw new TypeError("there is no camera scroll"); return;}

        ctx.translate(this.cameraScroll[0],this.cameraScroll[1]);//scroll camera

        ctx.imageSmoothingEnabled = false;
        if (rotation == null){rotation = 0};
        if (reScale == null){ if(scroll[2]==null){reScale = 1}else{reScale=scroll[2]}};
        var s1 = this.state;
        var x = this.position[0]+scroll[0];
        var y = this.position[1]+scroll[1];
        var a = (rotation * Math.PI)/180; //convert to rad
        
        //rotate object
        ctx.translate(x,y);
        ctx.rotate(a);

        //draw
        ctx.drawImage(this.image,this.frame*this.SpriteSize[0],s1*this.SpriteSize[1],this.SpriteSize[0],this.SpriteSize[1],0,0,this.scale[0]*reScale,-1*this.scale[1]*reScale);
        
        //undo transformations for next objects
        ctx.rotate(-a);
        ctx.translate(-x,-y);
        ctx.translate(-this.cameraScroll[0],-this.cameraScroll[1]);
    }
}
</code></pre></div></div>

<p>This is the most important class I created. It is what is reposible for basically all of the drawing within our game. To split it apart:</p>

<ol>
  <li>The Constructor
    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>constructor(Name,SpriteSheet,SpriteScale,DrawScale,position,maxFrames,states,cameraScroll){
     this.name = Name;
     this.image = SpriteSheet;
     this.SpriteSize = SpriteScale; //size of each sprite
     this.scale = DrawScale; // size of drawn image
     this.position = position; //[x,y]
     this.frame = 0;
     this.state = 0;
     this.maxFrames = maxFrames;
     this.maxState = states;
     this.cameraScroll = cameraScroll;
     console.log(this)
 }
</code></pre></div>    </div>
    <p>The <strong>constructor</strong> is what assigns the variables when you create the object.
My object mainly includes: name, image, frame size, drawing size, and position these variables give most of the information when drawing objects to the canvas.
The other variables are for other that are needed, for example the starting frame and starting state.</p>
  </li>
  <li>draw
    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>draw(ctx,scroll,rotation,reScale){
     ctx.imageSmoothingEnabled = false;
     if (rotation == null){rotation = 0};
     if (reScale == null){ if(scroll[2]==null){reScale = 1}else{reScale=scroll[2]}};
     var s1 = this.state;
     var x = this.position[0]+scroll[0];
     var y = this.position[1]+scroll[1];
     var a = (rotation * Math.PI)/180; //convert to rad
        
     //rotate object
     ctx.translate(x,y);
     ctx.rotate(a);

     //draw
     ctx.drawImage(this.image,this.frame*this.SpriteSize[0],s1*this.SpriteSize[1],this.SpriteSize[0],this.SpriteSize[1],0,0,this.scale[0]*reScale,-1*this.scale[1]*reScale);

     //undo rotations for next objects
     ctx.rotate(-a);
     ctx.translate(-x,-y);

 }
</code></pre></div>    </div>
    <p>This function <strong>draw</strong> is the main reason this class exists. With only 2 inputs (and more optional), you can draw the object object to the canvas without too much effort.</p>
  </li>
</ol>

<p>There is another similar function called <strong>drawWithCameraScroll</strong>. It is basically identical to the draw function, but it draws the object with an offset called “CameraScroll”.</p>

</div>
<br>

<h2 id="character-movement">Character Movement</h2>
<p>The y position isn’t used/changed.</p>
<svg width="300px" height="100px">
    <polyline id="left" points="0,50 75,0 75,100" style="fill:black;" />
    <polyline id="right" points="300,50 225,0 225,100" style="fill:black;" />
    <rect id="dirLeft" x="90" y="0" width="60" height="100" style="fill:black;" />
    <rect id="dirRight" x="150" y="0" width="60" height="100" style="fill:black;" />
    <circle id="moving" cx="150" cy="50" r="45" style="fill:darkgrey;" />
    <text id="pos" x="125" y="55" style="font:20px Arial; fill:white; text-align:center">[0,0]</text>
</svg>
<script type="module">
import Movement from "/Group/myScripts/GameScripts/CharacterMovement.js";
function update(){
    if(myMovement.directionX == 1){
        document.getElementById("dirRight").style.fill = "lightcoral";
        document.getElementById("dirLeft").style.fill = "black";
        document.getElementById("left").style.fill = "black";
        if(myMovement.moving == true){
            document.getElementById("right").style.fill = "lightblue";
            document.getElementById("moving").style.fill = "lightgreen";
        }
        else{
            document.getElementById("right").style.fill = "black";
            document.getElementById("moving").style.fill = "darkgrey";
        }
    }
    else{
        document.getElementById("dirLeft").style.fill = "lightcoral";
        document.getElementById("dirRight").style.fill = "black";
        document.getElementById("right").style.fill = "black";
        if(myMovement.moving == true){
            document.getElementById("left").style.fill = "lightblue";
            document.getElementById("moving").style.fill = "lightgreen";
        }
        else{
            document.getElementById("left").style.fill = "black";
            document.getElementById("moving").style.fill = "darkgrey";
        }
    }
    var pos = myMovement.position;
    document.getElementById("pos").textContent = "["+String(pos.x)+","+String(pos.y)+"]";
}
var myMovement = new Movement();
document.addEventListener("keydown",function(event){myMovement.handleKeydown(event); update()});
document.addEventListener("keyup",function(event){myMovement.handleKeyup(event); update()});
setInterval(function(){myMovement.onFrame(24)},1000/24);
</script>

<p><br /></p>

<button class="accordion">Code</button>
<div class="panel">

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>class Movement{
    //up = "KeyW"; //default keybinds for controls
    right = "KeyD";
    left = "KeyA";
    jump = "Space";
    down = "ShiftLeft";

    directionX = 1;
    directionY = 0;
    instantY = 0;
    gravity = 80;
    speed = 100;
    moving = false;
    
    constructor(){
        this.position = {
            x:0,
            y:0
        };
    }
    onFrame(fps){
        this.position = {
            x: Math.round(this.position.x+this.moving*this.speed*this.directionX*(1/fps)),
            y: this.position.y + (this.instantY*(1/fps))
        }
        if(this.position.y&lt;0){
            this.instantY = 0;
            this.directionY = 0;
            this.position.y = 0;
        }
        if(this.position.y&gt;0){
            this.instantY-=this.gravity*(1/fps);
        }
        return this.position;
    }
    getPosition(){
        return this.position;
    }
    handleKeydown(event){
        event.preventDefault();
        switch(event.code){
            case this.down:
                this.directionY = -1;
                break;
            case this.right:
                this.directionX = 1;
                this.moving = true;
                break;
            case this.left:
                this.directionX = -1;
                this.moving = true;
                break;
            //case this.jump:
            //    if (this.position.y == 0){
            //    this.instantY = 80;
            //    this.directionY = 1;
            //    }
            //    break;
        }
    }
    handleKeyup(event){
        event.preventDefault();
        switch(event.code){
            case this.down:
                this.directionY = 0;
                break;
            case this.right:
                this.moving = false;
                break;
            case this.left:
                this.moving = false;
                break;
        }
    }
}
</code></pre></div></div>
<p>This class handles most of the inputs, and does corresponding actions. “Movement”.</p>

<ol>
  <li>
    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>onFrame(fps){
    this.position = {
        x: Math.round(this.position.x+this.moving*this.speed*this.directionX*(1/fps)),
        y: this.position.y + (this.instantY*(1/fps))
    }
    if(this.position.y&lt;0){
        this.instantY = 0;
        this.directionY = 0;
        this.position.y = 0;
    }
    if(this.position.y&gt;0){
        this.instantY-=this.gravity*(1/fps);
    }
    return this.position;
}
</code></pre></div>    </div>
    <p>To simiplify this function, on each frame it checks what is currently pressed. Depending on the inputs, it does some calculations to tell you where the character will be located. Once finsihed it returns the new position of the object on that frame.</p>
  </li>
  <li>handleKey
    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>handleKeydown(event){
     event.preventDefault();
     switch(event.code){
         case this.down:
             this.directionY = -1;
             break;
         case this.right:
             this.directionX = 1;
             this.moving = true;
             break;
         case this.left:
             this.directionX = -1;
             this.moving = true;
             break;
         //case this.jump:
         //    if (this.position.y == 0){
         //    this.instantY = 80;
         //    this.directionY = 1;
         //    }
         //    break;
     }
 }
 handleKeyup(event){
     event.preventDefault();
     switch(event.code){
         case this.down:
             this.directionY = 0;
             break;
         case this.right:
             this.moving = false;
             break;
         case this.left:
             this.moving = false;
             break;
     }
 }
</code></pre></div>    </div>
    <p>These 2 functions should be binded to keyDown and keyUp events respectively. They look at the inputs that are given, then change variables, like the direction that the object is facing.</p>
  </li>
</ol>

</div>
<br>

<h2 id="display">Display</h2>
<style>
    .container3{
        display:block;
        background-color:white;
        width:200px;
        height:200px;
    }
    .container2{
        width:50px;
        height:50px;
        display:inline-block;
        background-color:white;
    }
</style>

<canvas id="mainDisplay" class="container3" height="500px" width="500px"></canvas>
<p><br /></p>
<canvas id="subDisplay" class="container2" height="500px" width="500px"></canvas>
<div></div>
<canvas id="subDisplay1" class="container2" height="500px" width="500px"></canvas>
<canvas id="subDisplay2" class="container2" height="500px" width="500px"></canvas>
<p><button id="switch">switch</button>
<script type="module">
//import needed modules
import Controller from "/Group/myScripts/GameScripts/CharacterMovement.js";
import Object from "/Group/myScripts/GameScripts/CreateObject.js";
import light from "/Group/myScripts/GameScripts/Lights.js";
import {Display,subDisplay} from "/Group/myScripts/GameScripts/Displays.js"
var canvas = document.getElementById("mainDisplay");
var subCanvas = document.getElementById("subDisplay");
var subCanvas1 = document.getElementById("subDisplay1");
var subCanvas2 = document.getElementById("subDisplay2")
var myCharacter = new Controller();
document.addEventListener("keydown",myCharacter.handleKeydown.bind(myCharacter));
document.addEventListener("keyup",myCharacter.handleKeyup.bind(myCharacter));
var characterSpriteSheet = new Image();
characterSpriteSheet.src = "/Group/images/Game/squidambient-sprite.png";
var myCharacterObject = new Object("character", characterSpriteSheet,[190,175],[190,175],[250,500],4,1);
var redPixelSprite = new Image();
redPixelSprite.src = "/Group/images/Game/redPixel.png"
var redObject = new Object ("background1",redPixelSprite,[1,1],[100,500],[0,500],1,1);
var redObject2 = new Object ("background3", redPixelSprite,[1,1],[100,500],[200,500],1,1);
var redObject3 = new Object ("background5", redPixelSprite,[1,1],[100,500],[400,500],1,1);
var whitePixelSprite = new Image();
whitePixelSprite.src = "/Group/images/Game/whitePixel.png"
var whiteObject = new Object ("background 2",whitePixelSprite,[1,1],[100,500],[100,500],1,1);
var whiteObject2 = new Object ("background 4",whitePixelSprite,[1,1],[100,500],[300,500],1,1);
var lightingSprite = new Image();
lightingSprite.src = "/Group/images/Game/ShadingV3.png";
var lightObject = new Object("light",lightingSprite,[500,500],[500,500],[0,0],1,1);
var subDisplay1 = new subDisplay(subCanvas,[redObject,whiteObject,redObject2,whiteObject2,redObject3]);
subDisplay1.OverrideScroll([0,0]);
var subDisplay2 = new subDisplay(subCanvas1,[myCharacterObject]);
subDisplay2.OverrideScroll([0,0]);
var subDisplay3 = new subDisplay(subCanvas2);
var MainDisplay = new Display(canvas,subDisplay1);
var currentFrame = 0;
var sec = 0;
var active = true; //set to false to stop all animation
var fps = 24;
function frame(){
    currentFrame = (currentFrame+1)%fps;
    if (currentFrame == 0){sec+=1};
    if (bool == false){ //if display with person is active
    var pos = myCharacter.onFrame(fps); //update frame, and get position
    pos = [pos.x,500-pos.y]; //fix position
    myCharacterObject.OverridePosition(pos); //update character Position
    }
    if(currentFrame % Math.round(fps/4)==0){ //update lighting every 1/4 sec
        light([[400,500,.5],[100,250,1],[400,100,1]],lightObject,subCanvas2,false);
    }
    subDisplay2.draw(1); //update SubCanvas (without offset)
    MainDisplay.draw(1); //update Main Canvas
setTimeout(function() {if(active == true){requestAnimationFrame(frame)}}, 1000 / fps);
}
var bool = true;
function Switch(){
        if(bool==false){
            MainDisplay.setActiveDisplay(subDisplay1);
            bool = true;
        }
        else{
           MainDisplay.setActiveDisplay([subDisplay2,subDisplay3]);
            bool = false; 
        }
}
document.getElementById("switch").addEventListener("click",Switch)
window.addEventListener("load",function(){
    subDisplay1.draw(0);
    var ctx = subDisplay1.canvas.getContext("2d");
    ctx.font = "bold 80px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center"
    ctx.fillText("Displays!",250,250)
    }) //wait for window to load then draw static canvas
frame(); //run frame
</script>
<br /></p>

<button class="accordion">Code</button>
<div class="panel">

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>class Display{
    
    constructor(canvas,displaysToDraw){

        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.activeDisplay = displaysToDraw;
    }

    setActiveDisplay(newDisplay){
        this.activeDisplay = newDisplay;
    }

    draw(type){   
        var ctx = this.canvas.getContext("2d"); //get Main Canvas Context
        ctx.clearRect(0,0,this.width,this.height); //clear Main Canvas
        if (this.activeDisplay.length !== undefined){ //if there is multiple displays
            this.activeDisplay.forEach(function(obj){ctx.drawImage(obj.canvas,0,0);});
        }
        else{ctx.drawImage(this.activeDisplay.canvas,0,0);} //draw subCanvas onto main canvas
    }
}

class subDisplay{
    constructor(canvas,objects){
        this.canvas = canvas;
        this.objects = objects;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    OverrideScroll(pos){
        this.objects.forEach(function(obj){obj.UpdateCameraScroll(pos)})
    }

    draw(type){//type 0 = without CameraScroll, 1 with CameraScroll
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.width,this.height);
        switch(type){
            case 0:
            this.objects.forEach(function(obj){obj.draw(ctx,[0,0])});
            break;
            case 1:
            this.objects.forEach(function(obj){obj.drawWithCameraScroll(ctx,[0,0])});
            break;
        }
    }
}
</code></pre></div></div>
<p>These classes are the easiest ways to draw all the objects in the game. Without going into too much depth of the functions, they basically act as groupings that have an ability to its canvas.</p>

</div>
<br>

<h2 id="overall">Overall</h2>
<p>Using the code above, and some optional extras, we were able to create most of the game. These functions were (mostly) made to work together. The object class was built for the basic function of drawing. Other functions and classes were made to support and use the objects to create the game. If you want a few more details about how they work together I recommend looking at the <a href="/Group/projectSummary/anatomy">Anatomy</a> page.</p>

<script>
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    function onClick(){
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    }
  acc[i].addEventListener("click", onClick.bind(acc[i]));
}
</script>
</body>