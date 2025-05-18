// Fractal Project
// Gary Wang
// April 29th,2025
function setup() {//in order to set the rectangle's mode and make it run
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(RADIANS);
  noStroke();
}
function draw() {//to draw out the square that regulate by the functions
  background(0);
  randomSeed(1);
  let topDepth = int(map(mouseX, 0, width, 1, 5));
  squareFractal(width/2, height/2, height/2, 0, topDepth);
}
function squareFractal(x, y, sideL, depth, topDepth) {//draw a single square first
  push();
  translate(x, y);
  rotate(radians(frameCount)); 
  fill(random(255), random(255), random(255));//random color for the triangle
  rect(0, 0, sideL); 
  pop();
  if (depth < topDepth) {
    let addS = sideL / 2;
    squareFractal(x - sideL/2, y -sideL/2,addS, depth+1, topDepth);
    squareFractal(x + sideL/2, y - sideL/2, addS, depth+1, topDepth);
    squareFractal(x -sideL/2, y + sideL/2, addS, depth+1, topDepth);
    squareFractal(x+sideL/2, y +sideL/2, addS, depth+1, topDepth);
  }
}
