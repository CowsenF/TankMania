class BoxCollider {

    constructor(size, extraSize){

        this.size = size / 2;

        this.x;
        this.y;
        this.angle;

        this.extraSize = extraSize;

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