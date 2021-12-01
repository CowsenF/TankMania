let player1;
let blackTankImg;

let map;
let allWallColliders = [];

let hitboxes = [];

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

  //For at spare på plas i "sketch" så er der blevet brugt generalle "update" methods som bliver kladt i stedet for alle andre methods som skal blive updated hver frame.
  player1.update();
  map.update();
}