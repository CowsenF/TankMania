//Map class bruges til at holde styr på murene i spillet
//Den spawnere murene og updatere dem

class Map {

    constructor(size){

        this.size = size;
        this.gap = 60;
        this.points = [];
        for (let i = 0; i < this.size; i++) {
            
            this.points[i] = [];
            
        }
        this.wallHolder = [];
        this.wallConstructor();

        
    }

    wallConstructor(){

        this.wallHolder.push(new Wall(0, 0, width, 0, "xSide", width))
        this.wallHolder.push(new Wall(width, 0, width, height, "ySide", height))
        this.wallHolder.push(new Wall(width, height, 0, height, "xSide", width))
        this.wallHolder.push(new Wall(0, height, 0, 0, "ySide", height))

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

        for (let i = 0; i < this.wallHolder.length; i++) {
            this.wallHolder[i].update();
        }

    }

}