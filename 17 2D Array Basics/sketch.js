// 2D Array Basics
// Gary Wang
// April 3, 2025
//Working with 2d Arrays, Visualizations

let grid =
[ [0, 0, 255, 255, 0],
  [255, 255, 0, 255, 0],
  [0, 0, 0, 255, 0]
];

let squareSize = 60;
const NUMS_ROWS = 3;  const NUM_COLS = 5;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUMS_ROWS*squareSize);
}

function getCurrentY(){
  //determine current row of the mouse position
  let constrainY = constrain(mouseY, 0, height-1);
  return floor (constrainY / squareSize);

}

function getCurrentX(){
  //determine current col of the mouse position 
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / squareSize);

}

function checkForMouse(){
  //flip current tile to a random greyscale 
  if(mouseIsPressed){
    let x = getCurrentX();
    let y = getCurrentY();
    grid[y][x] = floor(random(255));
  }

}

function renderGrid(){
  //interpret the imformation in the 2D array, and draw
  // a grid of colors on the screen to reflect it.
  for(let y = 0; y < NUMS_ROWS; y++){
    for(let x = 0; x < NUM_COLS; x++){
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x*squareSize, y*squareSize, squareSize);
    }
  }
}

function mousePressed(){

  let x = getCurrentX();
  let y = getCurrentY();

  //always:flip the "current" tile
  flip(x,y);

  if(y>0) flip(x,y-1); //North
  if(x >0) flip(x-1,y);
  if(x<NUMS_ROWS-1) flip(x+1, y);
  if(y < NUM_COLS-1) flip(x,y+1);
}

function flip(x,y){
  //take a tile and invert its value
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}
function draw() {
  background(220);
  renderGrid();

}
