class Bullet {

    constructor(x, y, angle) {

        this.angle = angle;
        this.x = x + cos(radians(this.angle));
        this.y = y + sin(radians(this.angle));

        this.size = 5;

        this.speed = 2;

        this.time = 15000;

        this.collider = new BulletCollider(this.size, this.size, 1, this.x, this.y);

    }

    update() {

        this.timer();
        this.move();
        
        this.collider.update();
        this.collider.updatePosition(this.x, this.y, this.angle);

        this.draw();

    }

    timer() {

        this.time -= deltaTime;

        if(this.time < 0) {

            for (let i = 0; i < bullets.length; i++) {
                
                if(bullets[i] == this) {

                    bullets.splice(i, 1)

                }

            }

        }

    }

    draw() {
        
        stroke('black');
        strokeWeight(this.size);
        point(this.x, this.y);
        

    }

    move() {

        this.x += cos(radians(this.angle)) * this.speed;
        this.y += sin(radians(this.angle)) * this.speed;

    }

}