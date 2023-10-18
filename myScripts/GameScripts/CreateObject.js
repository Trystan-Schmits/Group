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

    draw(ctx,scroll,rotation){
        if (rotation == null){rotation = 0};
        var s1 = this.state;
        var x = this.position[0]+scroll[0];
        var y = this.position[1]+scroll[1];
        var a = ((rotation) * Math.PI)/180; //convert to rad

        //rotate object
        ctx.translate(x,y);
        ctx.rotate(a);

        //draw
        ctx.drawImage(this.image,this.frame*this.SpriteSize[0],s1*this.SpriteSize[1],this.SpriteSize[0],this.SpriteSize[1],0,0,this.scale[0],-1*this.scale[1]);

        //undo rotations for next objects
        ctx.translate(-x,-y);
        ctx.rotate(-a);
    }
}
export default CreateObject;