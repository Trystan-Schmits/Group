---
comments: False
layout: post
title: Documentation
description: How our game works
type: tangibless
courses: {'compsci': {'week': 7}}
categories: ['C4.1']
permalink: /projectSummary/Sean
---
{% include Documentation_basics.html %}

# Introduction
I drew most of the art for the game using pixilart.com. I used the same website to create many of the sprite sheets for the game. 

# Code
I worked on the minigame and bedroom of game. I added in the lights, boxes, and door to the bedroom using code.

- Objects 
```
var doorImage = new Image(); 
doorImage.src = "/Group/images/Game/apartmentdoor.png";
var doorObject = new Object("door",doorImage,[25,45],[185,310],[1145,500],1,1);
```
This line of code creates the new image then defines what the image is from our repository game images folder (in this case the door png). It then creates the door image in the game. 
After this, it is named and the size can be set. It first asks for the size of the image file, then the size we want to draw it, then the placement in the game. 

For the minigame it was similar but now had animation. 
```
var windowSpriteSheet = new Image();
windowSpriteSheet.src = "/Group/images/Game/window-rain-sprite.png";
var windowObject1 = new Object("window", windowSpriteSheet,[100,100],[164,180],[30,174],22,1);
windowObject1.UpdateFrame(1);
windowObject1.draw(ctx,[0,0]);
```
Similar to the bedroom door, this does the same thing where it defines and creates the windows then puts them in the room, but now has to be updated. In the second variable code, it insludes the number of sprite in the sheet, 22, then is updated and drawn using the update frame and draw functions. 
The five windows are offset in the frame they are on because of the update frame function being different for all of them. The number in the parenthese determines which frame they start on. This allowed for the windows to not all look the same when running. 

- Movement 
For the minigame, the room is more 3D than the other rooms so the character had to be able to move up and down as well as left and right. What had to be done was create a new character movement gamescript specifically for the minigame where the "w" and "s" keys would move the character up and down. 
```
//determine which keys mean what
up = "KeyW"; 
down = "KeyS";
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

```
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
```

This checks where the character is, and if they are too far left (if (pos[0]) < -32) then they cannot walk any further. Same for moving up past the floor line, (if (pos[1] < 240)) then they can only walk left, right, or down. [1] means y axis, [0] means x axis.  

- Monster and death
In the minigame, the monster will follow you and if it gets too close it will kill you. It follows you by tracking how far the monster is from the character and then move it closer to the character until they are overlapping. When they overlap, it uses collisions to stop drawing the character and remove him from the screen. It also stops all the other sprites from running and then will play the death animation where the character died. It will then run the death sprites and the fade to black sprites and stop when they finish. 

```
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
```

```
// Check for overlap between the character and the monster
    if (checkForOverlap(myCharacterObject, monsterObject)||checkForOverlap(monsterObject, myCharacterObject)) {
        isCharacterAlive = false;
        showCharacter = false;
        active = false;
        animationFrame = 0;
        display.objects = [windowObject1,windowObject2,windowObject3,windowObject4,windowObject5,backgroundObject,elevatorObject,monsterObject,fadeObject,deathObject]
        deathAnimation();
    }
```

# Drawings
![bedroom](/Group/images/Game/room1update.png)

![rain on window](/Group/images/Game/window-rain-sprite.png)

![potato walking](/Group/images/Game/potatowalking-sprite.png)

![potato ambient](/Group/images/Game/potatoambient-sprite.png)

![man walking](/Group/images/Game/walking-sprite.png)

![man dying](/Group/images/Game/deathsprite.png)

![squid ambient](/Group/images/Game/Squid(3).png)

![minigameroom1](/Group/images/Game/officeroom4.png)

![minigameroom2](/Group/images/Game/minigameroom2.png)

![elevator sprite](/Group/images/Game/elevatorsprite.png)