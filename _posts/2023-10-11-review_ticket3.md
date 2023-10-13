---
toc: false
comments: true
layout: post
title: Progress for Week 3
description: What to do for the day
type: tangibles
courses: { compsci: {week: 3} }
permalink: /tangibles/week3
---

## Problem
Make objects fly across the screen with randomly generated code (Using Math and Sprites)

## Brainstorm (Spencer, Trystan, Zafeer)
```javascript
var depth = Math.Floor(-500 * Math.random());
// All position code
var x = x * (250 / depth);
var y = y * (250 / depth);
```
-The code would use a random depth value to determine how close or far an object is in the game. By dividing the object's original position by a scaled valuethe code makes objects with larger negative depths appear closer (since the scaling factor is larger), and objects with smaller or positive depths seem farther away (as the scaling factor diminishes), contributing to a sense of depth in the 2D game world.

