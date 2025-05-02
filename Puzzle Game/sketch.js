//Insert your Comment Header here.

let NUM_ROWS= 4;
let NUM_COLS = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;
let gridData = [[0,0,0,0,0],
                [0,0,0,0,0],
                [0,255,0,0,0],
                [255,255,255,0,0]];

let fMode = "cross"; 

function setup() {
  // Determine the size of each square. Could use windowHeight,windowHeight  for Canvas to keep a square aspect ratio
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  

  for(let x = 0; x < NUM_COLS; x++){
    for(let y = 0; y < NUM_ROWS; y++){
      gridData[y][x] = random([0, 255]);
    }
  }
}

function draw(){
  background(220);
  determineActiveSquare();   //figure out which tile the mouse cursor is over
  drawGrid();                //render the current game board to the screen (and the overlay)
  previewSqur();             //render the preview of the flip pattern
  victory();           //check for a win condition

}

function mousePressed(){//you can press the shift key to flip a single square(cheat), or click to flip a cross or square
  if(keyIsDown(SHIFT)){
    flip(currentCol, currentRow); 
  } 
  else{
    if(fMode === "cross"){
      flip(currentCol, currentRow);
      flip(currentCol-1, currentRow);
      flip(currentCol+1, currentRow);
      flip(currentCol, currentRow-1);
      flip(currentCol, currentRow+1);
    } 
    else if(fMode === "square"){
      flip(currentCol, currentRow);
      flip(currentCol+1, currentRow);
      flip(currentCol, currentRow+1);
      flip(currentCol+1, currentRow+1);
    }
  }
}

function flip(col, row){// a function to flip the value of a square in the gridData array
  // given a column and row for the 2D array, flip its value from 0 to 255 or 255 to 0
  // conditions ensure that the col and row given are valid and exist for the array. If not, no operations take place.
  if(col >= 0 && col < NUM_COLS ){
    if(row >= 0 && row < NUM_ROWS){
      if(gridData[row][col] === 0){
        gridData[row][col] = 255;
      }
      else{
        gridData[row][col] = 0;
      }
    }
  }
}

function determineActiveSquare(){//to check which square the mouse is over, dividing the mouse position by the size of each square
  // An expression to run each frame to determine where the mouse currently is.
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function drawGrid(){//in order to draw the grid, looping through the gridData array and draw a rectangle for each square, using the fill color from the array
  // Render a grid of squares - fill color set according to data stored in the 2D array
  for(let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridData[y][x]); 
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}

function preview(col, row){// a function to highlight a square in the gridData array
  if(col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS){
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
  }
}


function keyPressed(){//use the space bar to change the flip mode between cross and square
  if(key === ' '){
    if(fMode === "cross"){
      fMode = "square";
    } 
    else{
      fMode = "cross";
    }
  }
}

function previewSqur(){//player can see the pattern of the flip before they click
  noStroke();
  fill(32,255,17,100);
  if(fMode === "cross"){//cross pattern
    preview(currentCol, currentRow);
    preview(currentCol-1, currentRow);
    preview(currentCol+1, currentRow);
    preview(currentCol, currentRow-1);
    preview(currentCol, currentRow+1);
  } 
  else if(fMode === "square"){//square pattern
    preview(currentCol, currentRow);
    preview(currentCol+1, currentRow);
    preview(currentCol, currentRow+1);
    preview(currentCol+1, currentRow+1);
  }
}

function victory(){//in order to check if the player has won or not
  let first = gridData[0][0];
  let win = true;
  for(let y = 0; y < NUM_ROWS; y++){
    for(let x = 0; x < NUM_COLS; x++){
      if(gridData[y][x] !== first){
        win = false;
      }
    }
  }
  if(win){//show the "win" text when the player wins the puzzle
    fill(0);
    textSize(100);
    textAlign(CENTER, CENTER);
    fill(125, 255, 0);
    text("You Win!", width/2, height/2);
  }
}