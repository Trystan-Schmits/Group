---
comments: False
layout: post
title: lighting
description: how the lighting function works
type: hacks
courses: {'compsci': {'week': 7}}
categories: ['C4.1']
---
<style>
    canvas{
        display:block;
        background-color:white;
    }
</style>

# How the light function works

1. the light object
<canvas id="1" width="500px" height="500px"></canvas>
The light might look a little weird. This is because the light function calculates light from the dark space, then inverting it so that the dark spaces become the light <br>

2. positioning
<canvas id="2" width="500px" height="500px"></canvas>
The lighting functions main aspect is making it far easier to place lighting. Instead of having to place lighting based off the bottom left corner of the light object. It allows you place light sources based off the center of the light<br>

3. inversion
<canvas id="4" width="500px" height="500px"></canvas>
this step is the simpliest step, it simply inversts the alpha of the lighting, this makes the dark areas become the light, and the light areas become dark

<script type="module">
    import Object from "/Group/myScripts/GameScripts/CreateObject.js";
    import light from "/Group/myScripts/GameScripts/Lights.js";

    var canvas1 = document.getElementById("1");
    var canvas2 = document.getElementById("2");
    var canvas4 = document.getElementById("4");

    var ctx1 = canvas1.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var ctx4 = canvas4.getContext("2d");

    var lightingSprite = new Image();
    lightingSprite.src = "/Group/images/Game/ShadingV3.png";
    var lightObject = new Object("light",lightingSprite,[500,500],[500,500],[0,0],1,1);

    window.addEventListener("load",function(){

        lightObject.draw(ctx1,[0,500]); //first light

        var source = [[150,250,1],[350,250,1],[250,150,1],[250,350,1]];
        var scale = lightObject.ReturnScale();
        for (let i=0;i<source.length;i++){
            source[i][0] -= scale[0]/2*source[i][2];
            source[i][1] += scale[1]/2*source[i][2];
        } //center positions to the middle of the light source

        lightObject.draw(ctx2,source[0]); //showing off interaction
        lightObject.draw(ctx2,source[1]);
        lightObject.draw(ctx2,source[2]);
        lightObject.draw(ctx2,source[3]);

        light([[150,250,1],[350,250,1],[250,150,1],[250,350,1]],lightObject,canvas4,false);
    })
</script>
