class Player{

    constructor(image, x, y, playerInput){
        this.color = color(0);
        this.x = x;
        this.y = y;
        this.angle = random(0,360);
        this.speed = 1;
        this.rotateSpeed = 2;
        this.score;
        this.img = image;

        this.size = 20;

        this.extraSize = 1.3;
        this.collider = new PlayerCollider(this.size, this.size, this.extraSize, this.x, this.y);


        this.playerInput = playerInput;

        this.pressedFire = true;

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
        this.show();
        
    }

    move(){

        if(keyIsDown(this.playerInput.bevægFremAd)){

            //bevæg frem ad

            if(this.collider.checkForCollitionForNewMove(this.x + cos(radians(this.angle)) * this.speed, this.y + sin(radians(this.angle)) * this.speed, this.angle + 45) == false) {
                
                this.x += cos(radians(this.angle)) * this.speed;
                this.y += sin(radians(this.angle)) * this.speed;

            }
            

        }

        if(keyIsDown(this.playerInput.bevægBagUd)){

            //bevæg bag ud

            if(this.collider.isColliding != true) {

                if(this.collider.checkForCollitionForNewMove(this.x - cos(radians(this.angle)) * this.speed, this.y - sin(radians(this.angle)) * this.speed, this.angle + 45) == false) {
                    
                    this.x -= cos(radians(this.angle)) * this.speed;
                    this.y -= sin(radians(this.angle)) * this.speed;
    
                }

            }

            

        }

        if(keyIsDown(this.playerInput.rotereModVenstre)){

            //rotere mod venstre

            if(this.collider.checkForCollitionForNewMove(this.x, this.y, this.angle + 45 - this.rotateSpeed) == false) {
                    
                this.angle -= this.rotateSpeed;

            }

            

        }

        if(keyIsDown(this.playerInput.rotereModHøjere)){

            //rotere mod højere

            if(this.collider.checkForCollitionForNewMove(this.x, this.y, this.angle + 45 + this.rotateSpeed) == false) {
                    
                this.angle += this.rotateSpeed;

            }

        }

        if(keyIsDown(this.playerInput.fire) && this.pressedFire == false) {

            //Tilføj et nyt skud til spillet

            bullets.push(new Bullet(this.x, this.y, this.angle));

            this.pressedFire = true;

        } else if(keyIsDown(this.playerInput.fire) == false) {

            this.pressedFire = false;

        }
        

    }



}