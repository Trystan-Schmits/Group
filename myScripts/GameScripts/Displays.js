class Display{
    
    constructor(canvas,displayToDraw){

        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.displayToDraw = displayToDraw;
    }

    setActiveDisplay(newDisplay){
        this.displayToDraw = newDisplay;
    }

    draw(){   
        var ctx = this.canvas.getContext("2d"); //get Main Canvas Context
        ctx.clearRect(0,0,this.width,this.height); //clear Main Canvas
        ctx.drawImage(this.displayToDraw.subCanvas,0,0); //draw subCanvas onto main canvas
    }
}

class subDisplay{
    constructor(canvas,objects){
        this.canvas = canvas;
        this.objects = objects;
        this.width = this.subCanvas.width;
        this.height = this.subCanvas.height;
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

export {Display,subDisplay}