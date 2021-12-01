class Wall {

    constructor(point1X, point1Y, point2X, point2Y, direction, size){

        this.x = point1X / 2 + point2X / 2;
        this.y = point1Y / 2 + point2Y / 2;

        this.direction = direction;
        this.size = size;


        if(this.direction === "xSide") {

            this.collider = new WallCollider(1 * this.size, 2, 1, this.x, this.y);

        } else if(this.direction === "ySide"){

            this.collider = new WallCollider(2, 1 * this.size, 1, this.x, this.y);

        }

    }

    update() {

        this.show();
        this.collider.update();

    }

    show() {

        strokeWeight(2);
        rectMode(CENTER)
        if(this.direction === "xSide"){

            rect(this.x, this.y, 1 * this.size, 2);

        } else if(this.direction === "ySide"){

            rect(this.x, this.y, 2, 1 * this.size);

        }
    }




}