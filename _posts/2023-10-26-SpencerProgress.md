---
comments: False
layout: post
title: Spencer's Documentation
description: Documentation of what Spencer has done.
type: tangibles
courses: {'compsci': {'week': 7}}
categories: ['C4.1']
permalink: /projectSummary/Spencer
---
{% include nav_basics.html %}

# Introduction
- Art 
I drew many things included in the game, such as the player spritesheet, main bedroom, and the main menu. Throughout the designing, we changed different styles and other parts to fit within our game.
- Code 
I worked on OOP, the computer in the first minigame, the player, scrolling, and the monster interaction. I also made a refrence for how the game is supposed to look like. I then introduced audio and enviroment ambience.

- Objects 
```
const object = {
    x: 0,
    y:0,
    height: 64,
    width: 32,
    img: new Image(),
    src: "/Group/images/Game/birdgame_bird.png"
};
```
This line of code creates the new image then defines what the image is from our repository game images folder (in this case the bird png). It then creates the bird image in the first minigame. 
After this, it is named and the size can be set. It first asks for the size of the image file, then the size we want to draw it, then the placement in the game.

Objects can also be used for other things, such as player, text, or buttons. In the example below, we have an example of a text object that can be used and changed in the canvas.
```
const text = {
    x: 0,
    y; 0,
    space: 14,
    txt: "Hello World",
    font: "14px Arial",
};
ctx.font = text.font;
ctx.fillStyle = "black";
ctx.fillText(text.txt,text.x,text.y);
```
This text is defined in an object, and then can be drawn on the canvas. The text's peramerters are defined by the object variables of font, x, y, and spacing.

We can then add a custom text function to control even more of it.
```
function text(x,y,space,cutx,text) {
    var words = text.split(" ");
    var len = words.length;
    var textX = x;
    var textY = y;
    for (var letter = 0; letter < len; letter++) {
        ctx.fillText(words[letter], textX, textY);
        textX += space*words[letter].length;
        if (textX+(space+words[letter].length) > cutx) {
            textX = x;
            textY += 14;
        }
    }
};
```
The function above allows for cutoff of the text at a certain x on the canvas that prevents the text from moving past that x. When the function detects a word that is past the text, then it resets the text to the original starting x and changes the y of the text down by the spacing/font size.

- Movement 
The original design for movement was slow and weird. So I designed a new one that uses a velocity of the player that changes its position rather than moving it by the position. This allowed for a more dynamic movment and friction.
```
// Determine which keys mean what
up = "KeyW"; 
down = "KeyS";
left = "KeyA";
right = "KeyD";
...
```
This determines which keys mean what functions (move left,rigth, up, down)
```
//handle keydowns(press key)
...
case this.up:
    this.directionY = 1; //move up
    this.movingY = true 
    break;
case this.down:
    this.directionY = -1; //move down
    this.movingY = true
    break;

//handle keyups (let go of key)
...
case this.down:
    this.movingY = false; //stop moving up
    break;
case this.up:
    this.movingY = false; //stop moving down
    break;
```
Define what key does what and when. When you press the W key it move the character up, when you let go it stops, and same for "S" key. 
This meant that gravity had to be set to 0/deleted.

This ability to move up and down had the problem that the character could now walk on the wall, which we did not want. 

This checks where the character is, and if they are too far left (if (pos[0]) < -32) then they cannot walk any further. Same for moving up past the floor line, (if (pos[1] < 240)) then they can only walk left, right, or down. [1] means y axis, [0] means x axis.

# Drawings
![Minigame Player Character](/Group/images/Game/minigame_player.png)

![Main Player Character](/Group/images/Game/walking-sprite.png)

![Menu Layer 1](/Group/images/Game/menu_tree.png)

![Menu Layer 2](/Group/images/Game/menu_building.png)

![Menu Layer 3](/Group/images/Game/menu_entities.png)

![Menu Vinette](/Group/images/Game/menu_fade.png)

![Menu Clouds](/Group/images/Game/menu_cloud1.png)