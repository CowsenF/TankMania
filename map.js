class Map {

    constructor(size){

        this.size = size;
        this.gap = 60;
        this.points = [];
        for (let i = 0; i < this.size; i++) {
            
            this.points[i] = [];
            
        }
        this.wallHolder = [];
        this.wallConstructor()

        
    }

    wallConstructor(){

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                
                if(Math.random() > 0.8){

                    this.wallHolder.push(new Wall(i * this.gap, j * this.gap, (i + 1) * this.gap, j * this.gap, "xSide", this.gap));
                    this.wallHolder.push(new Wall(i * this.gap, j * this.gap, i * this.gap, (j + 1) * this.gap, "ySide", this.gap));

                } else if(Math.random() > 0.6){

                    if(Math.random() > 0.5) {

                        this.wallHolder.push(new Wall(i * this.gap, j * this.gap, (i + 1) * this.gap, j * this.gap, "xSide", this.gap));

                    } else{

                        this.wallHolder.push(new Wall(i * this.gap, j * this.gap, i * this.gap, (j + 1) * this.gap, "ySide", this.gap));

                    }
                } 
            }
        }
    }

    update(){

        this.show();

        for (let i = 0; i < this.wallHolder.length; i++) {
            this.wallHolder[i].update();
        }

    }

    show(){

        stroke('purple');
        strokeWeight(6);
        line(0, 0, this.size * this.gap, 0);
        line(this.size * this.gap, 0, this.size * this.gap, this.size * this.gap);
        line(this.size * this.gap, this.size * this.gap, 0, this.size * this.gap);
        line(0, this.size * this.gap, 0, 0);

        

    }



}