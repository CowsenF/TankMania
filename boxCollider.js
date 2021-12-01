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

        rect(this.x, this.y, this.xSize * this.extraSize * 1.3, this.ySize * this.extraSize * 1.3);

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

    }

    show(){

        strokeWeight(5);

        for (let i = 0; i < this.points.length; i++) {
            
            point(this.points[i][0], this.points[i][1])

        }
    }



}

class PlayerCollider extends Collider {

    constructor(xSize, ySize, extraSize, x, y){

        super(xSize, ySize, extraSize, x, y);

        this.size = (xSize + ySize) / 2 / 2;

        this.angle;

        this.points = [[0, 0], [0, 0], [0, 0], [0, 0]];

    }

    updatePosition(x, y, angle){

        this.x = x;
        this.y = y;
        this.angle = angle;

        for (let i = 0; i < this.points.length; i++) {
            
            this.points[i][0] = this.extraSize * this.size * -sin(radians(this.angle + i * 90)) + this.x;
            this.points[i][1] = this.extraSize * this.size * cos(radians(this.angle + i * 90)) + this.y;

        }

        this.checkForCollition();

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
        let check = 0;
        for (let i = 0; i < this.points.length; i++) {
            if(i === 3){
                if(this.isLeft(this.points[i][0], this.points[i][1], this.points[i-3][0], this.points[i-3][1])){

                    check++;

                }
            } else{                
                if(this.isLeft(this.points[i][0], this.points[i][1], this.points[i+1][0], this.points[i+1][1])){

                    check++;

                }
            }            
        }
    }

    isLeft(x1,y1,x2,y2){

        //Her fåes krys productet af de tre punkter

        return ((x2 - x1)*(mouseY - y1) - (y2 - y1)*(mouseX - x1)) > 0;
    }

}