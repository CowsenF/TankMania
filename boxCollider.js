//I denne fill findes alle colliders.
//Der er en generel collider class som alle andre colliders stammer fra

class Collider {

    //Den her collider har kun de basale som alle colliders har.

    constructor(xSize, ySize, extraSize, x, y) {

        this.x = x;
        this.y = y;

        this.xSize = xSize;
        this.ySize = ySize;

        this.extraSize = extraSize;

        //Den bliver tilført en global liste over alle hitboxes
        hitboxes.push(this);

    }



    update() {
        this.boundingBox();
    }

    boundingBox() {
        //Her vil der blive checket for om der er andre hitboxes i nærheden
        //Hvis der er så vil den lave klad for at begynde at renge for om den rammer noget

        fill("green");
        noStroke();

        

    }


}

class WallCollider extends Collider {

    constructor(xSize, ySize, extraSize, x, y, direction) {

        super(xSize, ySize, extraSize, x, y);

        this.points = [[0, 0], [0, 0], [0, 0], [0, 0]];

        this.setPoints();

        this.direction = direction;

    }

    setPoints(){


        this.points[0][0] = this.x - this.xSize / 2;
        this.points[0][1] = this.y + this.ySize / 2;
        this.points[1][0] = this.x + this.xSize / 2;
        this.points[1][1] = this.y + this.ySize / 2;
        this.points[2][0] = this.x + this.xSize / 2;
        this.points[2][1] = this.y - this.ySize / 2;
        this.points[3][0] = this.x - this.xSize / 2;
        this.points[3][1] = this.y - this.ySize / 2;


    }

    update() {

        //this.show();
        this.boundingBox();

    }

    show(){

        strokeWeight(5);
        stroke('purple');

        for (let i = 0; i < this.points.length; i++) {
            
            point(this.points[i][0], this.points[i][1]);

        }
    }


    



}

class BulletCollider extends Collider {

    constructor(xSize, ySize, extraSize, x, y){

        super(xSize, ySize, extraSize, x, y);

        this.size = (xSize + ySize) / 2 / 2;

        this.angle;

        this.insideBoundingBox = [];

    }

    boundingBox() {

        this.insideBoundingBox = [];

        for (let i = 0; i < hitboxes.length; i++) {

            
            
            if(hitboxes[i] != this && hitboxes[i].constructor != BulletCollider) {

                let hitbox = hitboxes[i];

                if(this.x - this.xSize * this.extraSize * 1.3 / 2 > hitbox.x - hitbox.xSize * hitbox.extraSize * 1.3 / 2 + hitbox.xSize * hitbox.extraSize * 1.3 
                    || hitbox.x - hitbox.xSize * hitbox.extraSize * 1.3 / 2 > this.x - this.xSize * this.extraSize * 1.3 / 2 + this.xSize * this.extraSize * 1.3 
                    || this.y - this.ySize * this.extraSize * 1.3 / 2 > hitbox.y - hitbox.ySize * hitbox.extraSize * 1.3 / 2 + hitbox.ySize * hitbox.extraSize * 1.3 
                    || hitbox.y - hitbox.ySize * hitbox.extraSize * 1.3 / 2 > this.y - this.ySize * this.extraSize * 1.3 / 2 + this.ySize * this.extraSize * 1.3) { 
                    
                    continue;

                } 

                else {
                    
                    this.insideBoundingBox.push(hitboxes[i]);

                }
                
            }

        }
    }

    update() {

        this.boundingBox();
        
    }

    updatePosition(x, y, angle){

        this.x = x;
        this.y = y;
        this.angle = angle;

        

    }

    isLeft(x1,y1,x2,y2){

        //Her fåes krys productet af de tre punkter

        return ((x2 - x1)*(this.y - y1) - (y2 - y1)*(this.x - x1)) > 0;
    }

        
    


}

class PlayerCollider extends Collider {

    constructor(xSize, ySize, extraSize, x, y){

        super(xSize, ySize, extraSize, x, y);

        this.size = (xSize + ySize) / 2 / 2;

        this.angle;

        this.points = [[0, 0], [0, 0], [0, 0], [0, 0]];

        this.insideBoundingBox;

        this.setPoints();

    }

    setPoints(){


        this.points[0][0] = this.x - this.xSize / 2;
        this.points[0][1] = this.y + this.ySize / 2;
        this.points[1][0] = this.x + this.xSize / 2;
        this.points[1][1] = this.y + this.ySize / 2;
        this.points[2][0] = this.x + this.xSize / 2;
        this.points[2][1] = this.y - this.ySize / 2;
        this.points[3][0] = this.x - this.xSize / 2;
        this.points[3][1] = this.y - this.ySize / 2;


    }

    update() {

        this.boundingBox();
        
    }

    boundingBox() {

        this.insideBoundingBox = [];

        for (let i = 0; i < hitboxes.length; i++) {

            
            
            if(hitboxes[i] != this && hitboxes[i].constructor == WallCollider) {

                
                let hitbox = hitboxes[i];

                if(this.x - this.xSize * this.extraSize * 1.3 / 2 > hitbox.x - hitbox.xSize * hitbox.extraSize * 1.3 / 2 + hitbox.xSize * hitbox.extraSize * 1.3 
                    || hitbox.x - hitbox.xSize * hitbox.extraSize * 1.3 / 2 > this.x - this.xSize * this.extraSize * 1.3 / 2 + this.xSize * this.extraSize * 1.3 
                    || this.y - this.ySize * this.extraSize * 1.3 / 2 > hitbox.y - hitbox.ySize * hitbox.extraSize * 1.3 / 2 + hitbox.ySize * hitbox.extraSize * 1.3 
                    || hitbox.y - hitbox.ySize * hitbox.extraSize * 1.3 / 2 > this.y - this.ySize * this.extraSize * 1.3 / 2 + this.ySize * this.extraSize * 1.3) { 
                    
                    continue;

                } 

                else {

                    this.insideBoundingBox.push(hitboxes[i]);

                }
                
            }

        }
    }

    updatePosition(x, y, angle){

        this.x = x;
        this.y = y;
        this.angle = angle;

        for (let i = 0; i < this.points.length; i++) {
            
            this.points[i][0] = this.extraSize * this.size * -sin(radians(this.angle + i * 90)) + this.x;
            this.points[i][1] = this.extraSize * this.size * cos(radians(this.angle + i * 90)) + this.y;

        }

    }

    checkForCollitionForNewMove(x, y, angle){

        //https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
        //forklaring
        //Determinant = det

        this.x = x;
        this.y = y;
        this.angle = angle;

        for (let i = 0; i < this.points.length; i++) {
            
            this.points[i][0] = this.extraSize * this.size * -sin(radians(this.angle + i * 90)) + this.x;
            this.points[i][1] = this.extraSize * this.size * cos(radians(this.angle + i * 90)) + this.y;

        }

        if(this.insideBoundingBox.length > 0) {
            
            

            for (let i = 0; i < this.insideBoundingBox.length; i++) {
                
                let hitboxPoints = this.insideBoundingBox[i].points;
                
                for (let j = 0; j < this.points.length; j++) {
                    
                    
                    for (let h = 0; h < hitboxPoints.length; h++) {
                       
                        let a, b, c, d, p, q, r, s

                        if(h == 3) {

                            p = hitboxPoints[h][0];
                            q = hitboxPoints[h][1];
                            r = hitboxPoints[h-3][0];
                            s = hitboxPoints[h-3][1];

                        } else if (h < 3) {

                            p = hitboxPoints[h][0];
                            q = hitboxPoints[h][1];
                            r = hitboxPoints[h + 1][0];
                            s = hitboxPoints[h + 1][1];

                        }

                        if(j == 3) {
                            
                            a = this.points[j][0];
                            b = this.points[j][1];
                            c = this.points[j-3][0];
                            d = this.points[j-3][1];                            

                        } else if (j < 3) {

                            a = this.points[j][0];
                            b = this.points[j][1];
                            c = this.points[j + 1][0];
                            d = this.points[j + 1][1];

                        }

                        var det, gamma, lambda;
                        det = (c - a) * (s - q) - (r - p) * (d - b);
                        if (det === 0) {
                            continue
                        } else {
                            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
                            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
                            
                            if((0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)) {return true}
                            continue
                        }
                    }
                }   
            }
        }
        return false
    }

}