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
  background(220);
  circleLine();
}

function circleLine(){
  let d = 30;
  let y = height;
  let xStart = 0;
  let xEnd = width;
  for(let x = xStart; x <= xEnd; x+=(d*2)){
    //x: 0  40  80  120  160  200  240
    circle(x,y,d);
  }
}
