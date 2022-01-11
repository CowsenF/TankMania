class Player{

    constructor(image){
        this.color = color(0);
        this.x = 30;
        this.y = 30;
        this.angle = random(0,360);
        this.speed = 1;
        this.rotateSpeed = 2;
        this.score;
        this.img = image;

        this.size = 20;

        this.extraSize = 1.3;
        this.collider = new PlayerCollider(this.size, this.size, this.extraSize, this.x, this.y);

        this.lastPosition = [];
    }

    show(){
        
        push();
        translate((this.x), (this.y));
        rotate(radians(this.angle - 90));
        imageMode(CENTER);
        image(this.img, 0, 0, this.size, this.size)
        pop();

    }

    update(){
        this.move();
        this.collider.update();
        this.collider.updatePosition(this.x, this.y, this.angle + 45);
        this.lastPosition = [this.x, this.y, this.angle + 45];
        this.show();
        this.collider.updateShow();
        this.spawnBullet();
        
    }

    spawnBullet(){

        


    }

    move(){

        if(keyIsDown(87)){

            //bevæg frem ad

            this.x += cos(radians(this.angle)) * this.speed;
            this.y += sin(radians(this.angle)) * this.speed;

        }

        if(keyIsDown(83)){

            //bevæg bag ud

            this.x -= cos(radians(this.angle)) * this.speed;
            this.y -= sin(radians(this.angle)) * this.speed;

        }

        if(keyIsDown(65)){

            //rotere mod venstre

            this.angle -= this.rotateSpeed;

        }

        if(keyIsDown(68)){

            //rotere mod højere

            this.angle += this.rotateSpeed;

        }

        

    }



}