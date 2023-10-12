class CreateObject{
    constructor(SpriteSheet,SpriteScale,DrawScale,position,maxFrames,states){
        this.image = SpriteSheet;
        this.SpriteSize = SpriteScale; //size of each sprite
        this.scale = DrawScale; // size of drawn image
        this.position = position; //[x,y]
        this.frame = 0;
        this.state = 0;
        this.maxFrames = maxFrames;
        this.maxState = states;
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

    draw(ctx,scroll,state,rotation){
        if (state == null){state= this.state};
        if (rotation == null){rotation = 0};
        var s1 = state%this.maxState;
        var x = this.position[0]+scroll[0];
        var y = this.position[1]+scroll[1];
        var a = (rotation * Math.PI)/180
        //drawing function

        //rotate object
        ctx.translate(this.image.width/2,this.image.height/2);
        ctx.rotate(a);
        ctx.translate(-this.image.width/2,-this.image.height/2)

        //draw
        ctx.drawImage(this.image,this.frame*this.SpriteSize[0],s1*this.SpriteSize[1],this.SpriteSize[0],this.SpriteSize[1],x,y,this.scale[0],-1*this.scale[1]);
        
        ctx.setTransform(1, 0, 0, 1, 0, 0); //something something reset matrix
    }
}
export default CreateObject;