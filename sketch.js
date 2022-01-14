let player1;
let blackTankImg;
let player1Input;

let player2;
let player2Input;

let map;

let hitboxes = [];

let bullets = [];

function preload() {
  //loader billeder ind fra mappen
  blackTankImg = loadImage("black_tank.png");

}

function setup() {

  bullets = []

  frameRate(60)

  createCanvas(60 * 10, 60 * 10);

  map = new Map(10);
  player1Input = new PlayerInput(87, 83, 65, 68, 32);
  player1 = new Player(blackTankImg, 30 + 60 * Math.floor(Math.random() * 9), 30 + 60 * Math.floor(Math.random() * 9), player1Input);
  
  player2Input = new PlayerInput(38, 40, 37, 39, 189);
  player2 = new Player(blackTankImg, 30 + 60 * Math.floor(Math.random() * 9), 30 + 60 * Math.floor(Math.random() * 9), player2Input);
  
}

function draw() {
  background(220);

  //For at spare på plas i "sketch" så er der blevet brugt generalle "update" methods som bliver kladt i stedet for alle andre methods som skal blive updated hver frame.
  player1.update();
  player2.update();
  map.update();

  for (let i = 0; i < bullets.length; i++) {
    
    bullets[i].update();
    
  }
}