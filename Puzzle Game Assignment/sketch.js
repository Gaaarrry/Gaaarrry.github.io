//Puzzle Game
//Gary Wang
//April 3, 2025
//Purpose: Working with 2D Arrays. A 2d puzzle game. Use mouse to interact with the squares to make it all same color.

let pattern = 3;//when it's 3 the pattern is the "cross" pattern
                //when it's 4 the pattern is the "diagonal" pattern
let grid = [
  [0,  0,   255, 255, 0],
  [255, 255, 0,   255, 0],
  [0,   0,   0,   255, 0]
  ];

let squareSize = 60;//size of each square
const NUM_ROWS = 3; const NUM_COLS = 5;//number of rows and columns

function setup() {//to set up the grid
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
  ranGrid();//put in setup so it only runs once when you refresh
}

function renderGrid() {
  // interpret the information in the 2D array, and draw
  // a grid of colors on the screen to reflect it.
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x * squareSize, y * squareSize, squareSize);
    }
  }
}

function ranGrid(){//create random grid and fill with white or black randomly in thge grid
  for(let y = 0; y < NUM_ROWS; y++){//create a new row
    grid[y] = [];
    for(let x = 0; x < NUM_COLS;x++){//create a new column
      grid[y][x] = random([0, 255]);//random white or black
    }
  }
}

function getCurrentY() {
  //determine current row of the mouse position
  let constrainedY = constrain(mouseY, 0, height - 1);
  return floor(constrainedY / squareSize);
}

function getCurrentX() {
  //determine current col of the mouse position
  let constrainedX = constrain(mouseX, 0, width - 1);

  return floor(constrainedX / squareSize);
}
function keyPressed() {//change the pattern when the space bar is pressed
  if (key === ' ') {
    if(pattern === 3){//if the pattern is 3, change it to 4
      pattern = 4;
    }
    else{//but if the pattern is 4 or other number(although we do not use other number), change it to 3
      pattern = 3;
    }
  }
}

function mousePressed() {
  //flip current tile to a random greyscale value
  //only do something if mouseX/mouseY are on the canvas...
  
  let x = getCurrentX();
  let y = getCurrentY();
  if (keyIsDown(SHIFT)) {

  //always: flip the "current" tile
  flip(x,y);
  }

  //sometimes: (depending on position) flip the neighbours
  else{
    if(pattern === 3){
      flip(x,y)//MIDDLE
      if(y > 0) flip(x, y-1);  //NORTH 
      if(x > 0) flip(x-1, y);  //WEST
      if(x < NUM_COLS-1) flip(x+1, y); //EAST
      if(y < NUM_ROWS-1) flip(x, y+1); //SOUTH
    }
    if(pattern === 4){
      flip(x,y)//MIDDLE
      if(x < NUM_COLS-1) flip(x+1, y); //EAST
      if(y < NUM_ROWS-1) flip(x, y+1); //SOUTH
      if(x< NUM_COLS-1 && y < NUM_ROWS-1) flip(x+1, y+1); //SOUTH EAST
    }

  }
}

function highlight(){//hightlight different patterns use some green light
  let x = getCurrentX();
  let y = getCurrentY();
  fill(0, 255, 0, 70);

  if(pattern === 3){
    square(x * squareSize, y * squareSize, squareSize);//MIDDLE
    if(y > 0) square(x * squareSize, (y-1)*squareSize, squareSize);  //NORTH 
    if(x > 0) square((x-1)*squareSize, y*squareSize, squareSize);  //WEST
    if(x < NUM_COLS-1) square((x+1)*squareSize, y*squareSize, squareSize); //EAST
    if(y < NUM_ROWS-1) square(x * squareSize, (y+1)*squareSize, squareSize); //SOUTH
  }
  if(pattern === 4){
    square(x * squareSize, y * squareSize, squareSize);//MIDDLE
    if(x < NUM_COLS-1) square((x+1) * squareSize, y*squareSize, squareSize); //EAST
    if(y < NUM_ROWS-1) square(x * squareSize, (y+1)*squareSize, squareSize); //SOUTH
    if(x< NUM_COLS-1 && y < NUM_ROWS-1) square((x+1)*squareSize, (y+1) * squareSize, squareSize); //SOUTH-EAST
  }
}
function flip(x, y){
  //take a tile and invert its value
  if (grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function draw() {//the place where the functions run
  background(220);
  renderGrid();
  highlight();
  if(ifWin()===1){//show the "win" text when the player wins the puzzle and check in the ifWin funtiom
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(125, 255, 0);
    text("You Win!", width/2, height/2);
  }

}
function ifWin(){//ti check if all the squares are white otr black
    let noWin = grid[0][0]; 
    for (let y = 0; y < NUM_ROWS; y++) {
      for (let x = 0; x < NUM_COLS; x++) {
        if (grid[y][x] !== noWin){
          return 0;//if not all the squares are the same color
        }
      }
    }
    return 1;//all squares are the same color
} 