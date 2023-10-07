---
toc: false
comments: true
layout: post
title:  Review Ticket Week 1
description: Review
type: tangibles
courses: { compsci: {week: 1} }
permalink: /plans/week2
---

## Code
Canvas Setup:

The program starts with the creation of a canvas (where the game or animation will be displayed).
It has to be 400 pixels tall because that is the height of the screen (it becomes fuzzy if you scale it, and you get weird animation issues). [How to make sprite sheets on vscode](https://www.itorian.com/2014/02/creating-image-sprite-in-visual-studio.html#:~:text=Step%201%3A%20Select%20images%20and,added%20inside%20'images'%20folder.)

Frame Loop:
The code sets up a loop that runs a function every frame. This function is executed with some specified frames per second (fps) or frame rate.

Function Execution in the Frame Loop:
Within the frame loop, various functions are executed. These functions seem to perform different tasks such as hitbox checking and drawing the current frame.
User Input Handling:

When the user presses either the 'a' or 'd' key, a function is triggered. This function likely updates the position of something in the game, possibly the player character.
Position Update:

After pressing 'a' or 'd', the position is updated. This could be the position of the player character or some other element in the game.
Screen Scroll and Walking Animation:

The updated position is then used to perform a screen scroll. This might involve adjusting what part of the game world is currently visible on the screen, creating the illusion of movement.
Additionally, there's a mention of a walking animation. This suggests that when the player character moves, it's not just a static change in position, but an animated transition to create a more visually appealing effect.
Faking Movement:

The combination of screen scrolling and a walking animation is described as "faking movement." This means that the appearance of movement is created without actually moving or changing the position of all the objects in the game world. Instead, the visible portion of the game world is adjusted.