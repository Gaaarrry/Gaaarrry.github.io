// Fractal Project
// Gary Wang
// April 29th,2025
// To create a fractal pattern using recursion and random colors, also squares will rotate
function setup() {//in order to set the rectangle's mode and make it run
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(RADIANS);
  noStroke();
}
function draw() {//to draw out the square that regulate by the functions
  background(0);
  randomSeed(1);
<<<<<<< HEAD
  let topDepth = int(map(mouseX, 0, width, 1, 5));
  squareFractal(0,0, height/2, 0, topDepth);
=======
  let side = int(map(mouseX, 0, width, 1, 5));
  squareFractal(width/2, height/2, height/2, 0, side);
>>>>>>> de8932e9a9dd40e28eca1515c3f07c26ff019255
}
function squareFractal(x, y, sideL, depth, side) {//to draw out the squares
                     //x and y are the center of the square, sideL is the length of the square, depth is the depth, and topDepth is the maximum depth
  push();//push will store the current state
  translate(x, y);//translate the square to the center of the screen
  rotate(radians(frameCount)); //it will rotate
  fill(random(255), random(255),random(255));//random color for the square
  rect(0, 0,sideL);//draw the square
  pop();//pop will restore the state to the previous state
  if(depth < side){//if the depth is less than side, it will draw the square
    let addS = sideL / 2;
    squareFractal(x - sideL/2, y - sideL/2,addS, depth+1, side);
    squareFractal(x + sideL/2, y - sideL/2, addS, depth+1, side);
    squareFractal(x - sideL/2, y + sideL/2, addS, depth+1, side);
    squareFractal(x + sideL/2, y + sideL/2, addS, depth+1, side);
  }
}
