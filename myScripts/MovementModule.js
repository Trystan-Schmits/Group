class Movement{
    Vx = 0; //instantous x velocity
    Vy = 0; //instantous y velocity
    FaAc = -10; //falling acelleration
    VyMin = -50; //max falling speed (minimum y velocity)
    DeltaX = 0; //x direction of buttons pressed (1 up, -1 down, 0 none)
    DeltaY = 0; //y direction of buttons pressed (1 right, -1 left, 0 none)

    speed = 80; //default speed

    up = "KeyW"; //default keybinds for controls
    down = "KeyS";
    right = "KeyD";
    left = "KeyA";

    constructor(Xi,Yi,spd,controls){
        this.x = Xi;
        this.y = Yi;
        if (controls){ //override default keybinds
            this.up = controls[0];
            this.down = controls[1];
            this.right = controls[2];
            this.left = controls[3];
        }
        if (spd){ //override default speed
            this.speed = spd;
        }
    }


    position(){
        console.log("Position X:" + this.x + " Y:" + this.y);
        return [this.x, this.y];
    }

    state(){
        return this.DeltaX;
    }

    overridePosition(pos){
        this.x = pos[0]
        this.y = pos[1]
    }
    
    update(f){
        this.Vx = this.DeltaX*this.speed;
        
        //this.Vy -= his.FaAc*this.DeltaY * (1/f);//unused
        if (this.Vy < this.VyMin){
            this.Vy = this.VyMin;
        };
        
        this.x = this.x + this.Vx * (1/f);
        
        //this.y += this.Vy * (1/f); //unused
    }
    
    ////IMPORTANT -- when setting up the event listener, it is necesary that you bind the function to the class with .bind()
    handleKeydown(event){ 
        switch(event.code){
            //case this.up: //unused
            //this.DeltaY =1;
            //break;
            //case this.down:
            //this.DeltaY =-1;
            //break;
            case this.right:
                this.DeltaX = 1;
                break;
            case this.left:
                this.DeltaX = -1;
                break;
        }
    }
    
    handleKeyup(event){
        switch(event.code){
            //case this.up: //unused
            //this.DeltaY =0;
            //break;
            //case this.down:
            //this.DeltaY =0;
            //break;
            case this.right:
            this.DeltaX = 0;
            break;
            case this.left:
            this.DeltaX =0;
            break;
        }  
    }
}

export default Movement;
