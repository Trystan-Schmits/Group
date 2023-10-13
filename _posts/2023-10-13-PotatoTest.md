---
comments: False
layout: post
title: Potato test
description: Week 2? work on our game.
type: hacks
courses: {'compsci': {'week': 5}}
categories: ['C4.1']
---

<html>
<head>
    <style>
        .container {
            display: block;
            background-color: white;
        }
    </style>
</head>
<body>
    <canvas id="display" class="container" height="500px" width="500px"></canvas>
    <script type="module">
        import Character from "/Group/myScripts/GameScripts/CharacterMovement.js";
        import Object from "/Group/myScripts/GameScripts/CreateObject.js";
        var canvas = document.getElementById("display");
        var characterSpriteSheet = new Image();
        characterSpriteSheet.src = "/Group/images/Game/potatowalkinganimation.png";
        // Define an idle sprite sheet for the character
        var idleCharacterSpriteSheet = new Image();
        idleCharacterSpriteSheet.src = "/Group/images/Game/potatoambient.png";
        var idleObject = new Object(idleCharacterSpriteSheet,[275,275],[315,320],[200,250],4,1)
        var myCharacter = new Character();
        document.addEventListener("keydown", myCharacter.handleKeydown.bind(myCharacter));
        document.addEventListener("keyup", myCharacter.handleKeyup.bind(myCharacter));
        var myCharacterObject = new Object(characterSpriteSheet, [315, 320], [315, 320], [0, 0], 4, 1);
        var fps = 20;
        var active = true;
        var animId;
        var currentFrame = 0;
        var shakeFrame = 0;
        function frame() {
            currentFrame = (currentFrame + 1) % fps;
            shakeFrame = (shakeFrame + 1) % (5 * fps);
            var pos = myCharacter.onFrame(fps);
            pos = [pos.x, 500 - pos.y];
            myCharacterObject.OverridePosition(pos);
            if (currentFrame % Math.round(fps / 4) == 0) {
                if (myCharacter.moving == false && myCharacter.directionY == 0) {
                    myCharacterObject.spriteSheet = idleCharacterSpriteSheet; // Switch to the idle sprite sheet
                    myCharacterObject.UpdateFrame();
                } else if (myCharacter.moving) {
                    myCharacterObject.spriteSheet = characterSpriteSheet; // Switch back to the walking sprite sheet
                    myCharacterObject.UpdateFrame();
                }
                idleObject.UpdateFrame();
            }
            var shake = [0, 0];
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 500, 500);
            myCharacterObject.draw(ctx, shake);
            idleObject.draw(ctx,[0,0])
            setTimeout(function () {
                if (active == true) {
                    animId = requestAnimationFrame(frame);
                }
            }, 1000 / fps);
        }
        frame();
        window.addEventListener('keydown', function (e) {
            if (e.keyCode == 32 && e.target == document.body) {
                e.preventDefault();
            }
        });
    </script>
</body>
</html>
