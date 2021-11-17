class Player{

    constructor(image){
        this.color = color(0);
        this.x = 0;
        this.y = 50;
        this.angle;
        this.speed;
        this.score;
        this.img = image;
    }

    show(){
        translate((this.x), (this.y));
        rotate(this.angle);
        imageMode(CENTER);
        image(this.img,this.x,this.y,20,20)


    }

    spawnBullet(){


    }

    move(){

        

    }



}