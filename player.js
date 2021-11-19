class Player{

    constructor(image){
        this.color = color(0);
        this.x = 50;
        this.y = 50;
        this.angle = random(0,360);
        this.speed = 1;
        this.rotateSpeed = 2;
        this.score;
        this.img = image;
    }

    show(){
        push();
        translate((this.x), (this.y));
        rotate(radians(this.angle - 90));
        imageMode(CENTER);
        image(this.img,0,0,20,20)
        pop();


    }

    spawnBullet(){


    }

    move(){

        if(keyIsDown(87)){

            this.x += cos(radians(this.angle)) * this.speed;
            this.y += sin(radians(this.angle)) * this.speed;

        }

        if(keyIsDown(83)){

            this.x -= cos(radians(this.angle)) * this.speed;
            this.y -= sin(radians(this.angle)) * this.speed;

        }

        if(keyIsDown(65)){

            this.angle -= this.rotateSpeed;

        }

        if(keyIsDown(68)){

            this.angle += this.rotateSpeed;

        }

        

    }



}