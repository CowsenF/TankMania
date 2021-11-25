let player1;
let blackTankImg;

let map;
let allWallColliders = [];

function preload() {
  
  blackTankImg = loadImage("black_tank.png");

}

function setup() {
  createCanvas(60 * 10, 60 * 10);

  map = new Map(10);
  player1 = new Player(blackTankImg);

}

function draw() {
  background(220);
  player1.update();

  map.show();
}