// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //background(220);
  //cantor(width*0.1, height*0.3, width*0.8,9);
}

function circleFractal(x,y,d){
noFill();
if(d>1){
  circle(x,y,d);
  //recursive calls
  circleFractal(x-d/2,y,d/2);
  circleFractal(x+d/2,y,d/2);
  circleFra
}
}

function cantor(x,y,len,depth){
  if(depth > 1){
    line(x,y,x+len,y);
    y += 20;

    cantor(x,y, len/3, depth - 1);//left third
    cantor(x+len*2/3,y, len/3, depth-1);
  }
  //otherwise, BASE CASE unravel
}

function reCircle(x,y,d){
  //recersively draw circles as long as
  //diameter > 5

  circle(x,y,d);
  if (d >= 10){
    reCircle(x,y,d*0.9);
  }

}