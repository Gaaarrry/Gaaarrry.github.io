// Block Pusher Starter
// Your Name
// Date


let tiles = [];  //0 → grass  1 → chicken   2 → cow  3 → star
let level = [
  [0, 1, 0, 3, 0],
  [1, 0, 0, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0]
]
const COLUMNS = 5; const ROWS = 5; let TILE_SIZE = 100;
let playerX = 3; let playerY = 4;

function preload() {
  for (let i = 0; i < 4; i++) {
    tiles.push(loadImage("assets/" + i + ".png"));
  }
}

function renderBoard() {
  // interpret data in our 2D array (level), place images
  // on canvas.
  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      let type = level[y][x];
      let currentImage = tiles[type];
      image(currentImage, x * TILE_SIZE, y * TILE_SIZE);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  renderBoard();
}
