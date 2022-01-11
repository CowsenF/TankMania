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

    constructor(xSize, ySize, extraSize, x, y) {

        super(xSize, ySize, extraSize, x, y);

        this.points = [[0, 0], [0, 0], [0, 0], [0, 0]];

        this.setPoints()

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

        this.show();
        this.boundingBox();

    }

    show(){

        strokeWeight(5);
        stroke('purple');

        for (let i = 0; i < this.points.length; i++) {
            
            point(this.points[i][0], this.points[i][1]);

        }
    }

    boundingBox() {
        //Her vil der blive checket for om der er andre hitboxes i nærheden
        //Hvis der er så vil den lave klad for at begynde at renge for om den rammer noget

        fill("green");
        noStroke();
        rectMode(CORNER)
        rect(this.x - this.xSize * this.extraSize * 1.3 / 2, this.y  - this.ySize * this.extraSize * 1.3 / 2, this.xSize * this.extraSize * 1.3, this.ySize * this.extraSize * 1.3);

        

    }


    



}

class bulletCollider extends Collider {

    constructor(xSize, ySize, extraSize, x, y){

        super(xSize, ySize, extraSize, x, y);

        

    }


}

class PlayerCollider extends Collider {

    constructor(xSize, ySize, extraSize, x, y){

        super(xSize, ySize, extraSize, x, y);

        this.size = (xSize + ySize) / 2 / 2;

        this.angle;

        this.points = [[0, 0], [0, 0], [0, 0], [0, 0]];

        this.insideBoundingBox;

    }

    update() {

        this.boundingBox();
        this.checkForCollition();
        
    }

    updateShow() {

        this.show();

    }

    boundingBox() {

        this.insideBoundingBox = [];

        for (let i = 0; i < hitboxes.length; i++) {

            
            
            if(hitboxes[i] != this) {

                
                let hitbox = hitboxes[i];

                if(this.x  - this.xSize * this.extraSize * 1.3 / 2 > hitbox.x - hitbox.xSize * hitbox.extraSize * 1.3 / 2 + hitbox.xSize * hitbox.extraSize 
                    || hitbox.x - hitbox.xSize * hitbox.extraSize * 1.3 / 2 > this.x - this.xSize * this.extraSize * 1.3 / 2 + this.xSize * this.extraSize 
                    || this.y - this.ySize * this.extraSize * 1.3 / 2 > hitbox.y - hitbox.ySize * hitbox.extraSize * 1.3 / 2 + hitbox.ySize * hitbox.extraSize 
                    || hitbox.y - hitbox.ySize * hitbox.extraSize * 1.3 / 2 > this.y - this.ySize * this.extraSize * 1.3 / 2 + this.ySize * this.extraSize) { 
                    
                    continue;

                } 

                else {

                    this.insideBoundingBox.push(hitboxes[i]);

                }
                
            }

        }

        fill("green");
        noStroke();
        rectMode(CORNER)
        rect(this.x - this.xSize * this.extraSize * 1.3 / 2, this.y - this.xSize * this.extraSize * 1.3  / 2, this.xSize * this.extraSize * 1.3, this.ySize * this.extraSize * 1.3);

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

    show(){

        stroke('purple');
        strokeWeight(2);

        for (let i = 0; i < this.points.length; i++) {
            point(this.points[i][0], this.points[i][1]);
            if(i === 3){

                line(this.points[i][0], this.points[i][1], this.points[i-3][0], this.points[i-3][1])

            } else{                

                line(this.points[i][0], this.points[i][1], this.points[i+1][0], this.points[i+1][1]);

            }
        }
    }

    

    checkForCollition(){

        

        //https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
        //forklaring
        //Determinant = det

        

        if(this.insideBoundingBox.length > 0) {

            for (let i = 0; i < this.insideBoundingBox.length; i++) {
                
                let hitboxPoints = hitboxes[i].points;
                
                for (let i = 0; i < this.points.length - 1; i++) {
                    
                    for (let i = 0; i < hitboxPoints.length - 1; i++) {
                        
                        let c = this.points[i][0];
                        let a = this.points[i][1];
                        let s = this.points[i + 1][0];
                        let q = this.points[i + 1][1];
                        let r = hitboxPoints[i][0];
                        let p = hitboxPoints[i][1];
                        let d = hitboxPoints[i][0];
                        let b = hitboxPoints[i][1];

                        let det, gamma, lambda;

                        det = (c - a) * (s - q) - (r - p) * (d - b);

                        if (det === 0) {

                            //return false;

                        } else {

                           

                            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
                            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;



                            if(0 <  lambda < 1 && 0 <  gamma < 1) {

                               print("hegh")

                            }
                            
                            //return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);

                        }
                        
                    }
                    
                }
                
            }




        }
        
        






    }

}