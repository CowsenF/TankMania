let player1;
let blackTankImg;

function preload() {
  
  blackTankImg = loadImage("black_tank.png");

}

function setup() {
  createCanvas(400, 400);
  player1 = new Player(blackTankImg);
}

function draw() {
  background(220);
  player1.show();
  player1.move();
}