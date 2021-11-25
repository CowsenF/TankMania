class Map {

    constructor(size){

        this.size = size;
        this.gap = 60;
        this.points = [];
        for (let i = 0; i < this.size; i++) {
            
            this.points[i] = [];
            
        }
        this.boxConstructor()


    }

    boxConstructor(){


        
    }

    show(){

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                
                stroke('purple');
                strokeWeight(2);
                point(i * this.gap, j * this.gap);
                
            }
        }

        stroke('purple');
        strokeWeight(2);
        line(0, 0, this.size * this.gap, 0);
        line(this.size * this.gap, 0, this.size * this.gap, this.size * this.gap);
        line(this.size * this.gap, this.size * this.gap, 0, this.size * this.gap);
        line(0, this.size * this.gap, 0, 0);

    }



}