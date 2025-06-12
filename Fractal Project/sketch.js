// Fractal Project
// Gary Wang
// April 29th,2025
// To create a fractal pattern using recursion and random colors, also squares will rotate
function setup(){//in order to set the rectangle's mode and make it run
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(RADIANS);
  noStroke();
}
function draw(){//to draw out the square that regulate by the functions
  background(0);
  randomSeed(1);
  let times = int(map(mouseX, 0, width, 0, 7));
                    //value  //start end start end
  squareFractal(width/2, height/2, height/2, 0, times);
}
function squareFractal(x, y, sideL, depth, times){//to draw out the squares
                     //x and y are the center of the square, sideL is the length of the square, depth is the depth, and topDepth is the maximum depth
  push();//push will store the current state
  translate(x, y);//translate the square to the center of the screen because in draw function we say width/2 and height/2
  rotate(radians(frameCount)); //each square will rotate by themself
  fill(random(255), random(255),random(255));//random color for the each little square
  rect(0,0,sideL);//draw the square at the middle.
  pop();//pop will restore the state to the previous state
  if(depth < times){//if the depth is less than side, it will draw the square
    //these codes will draw the squares in the four corners of the bigger square
    squareFractal(x - sideL/2, y - sideL/2, sideL/2, depth+1, times);
    squareFractal(x + sideL/2, y - sideL/2, sideL/2, depth+1, times);
    squareFractal(x - sideL/2, y + sideL/2, sideL/2, depth+1, times);
    squareFractal(x + sideL/2, y + sideL/2, sideL/2, depth+1, times);
  }
}
