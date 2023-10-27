---
comments: False
layout: post
title: Trystan
description: How our game works
type: tangibles
courses: {'compsci': {'week': 7}}
categories: ['C4.1']
permalink: /projectSummary/Trystan
---
{% include nav_basics.html %}

# Introduction
- Code <br>
I did a lot of code. I made most of the classes and functions (objects) that we used throughout the game.

## "Object" Class
```
class CreateObject{
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
```

This is the most important class I created. It is what is reposible for basically all of the drawing within our game. To split it apart:

1. The Constructor
```
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
```
The **constructor** is what assigns the variables when you create the object.
My object mainly includes: name, image, frame size, drawing size, and position these variables give most of the information when drawing objects to the canvas.
The other variables are for other that are needed, for example the starting frame and starting state.

2. draw
```
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
```
This function **draw** is the main reason this class exists. With only 2 inputs (and more optional), you can draw the object object to the canvas without too much effort.

There is another similar function called **drawWithCameraScroll**. It is basically identical to the draw function, but it draws the object with an offset called "CameraScroll".


## Character Movement
```
class Movement{
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
        if(this.position.y<0){
            this.instantY = 0;
            this.directionY = 0;
            this.position.y = 0;
        }
        if(this.position.y>0){
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
```
This class handles most of the inputs, and does corresponding actions. "Movement"

1. 
```
onFrame(fps){
        this.position = {
            x: Math.round(this.position.x+this.moving*this.speed*this.directionX*(1/fps)),
            y: this.position.y + (this.instantY*(1/fps))
        }
        if(this.position.y<0){
            this.instantY = 0;
            this.directionY = 0;
            this.position.y = 0;
        }
        if(this.position.y>0){
            this.instantY-=this.gravity*(1/fps);
        }
        return this.position;
    }
```
To simiplify this function, on each frame it checks what is currently pressed. Depending on the inputs, it does some calculations to tell you where the character will be located. Once finsihed it returns the new position of the object on that frame.

2. handleKey
```
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
```
These 2 functions should be binded to keyDown and keyUp events respectively. They look at the inputs that are given, then change variables, like the direction that the object is facing.

## Display
```
class Display{
    
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
```
These classes are the easiest ways to draw all the objects in the game. Without going into too much depth of the functions, they basically act as groupings that have an ability to its canvas.

## Overall
Using the code above, and some optional extras, we were able to create most of the game. These functions were (mostly) made to work together. The object class was built for the basic function of drawing. Other functions and classes were made to support and use the objects to create the game. If you want a few more details about how they work together I recommend looking at the [Anatomy](/Group/projectSummary/anatomy) page.