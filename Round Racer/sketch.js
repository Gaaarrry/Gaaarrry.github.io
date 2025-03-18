// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circle1; let circle2; let circle3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circle1 = new RR(50,red);
}

function draw() {
  background(220);
}

class RR{
  constructor(yPos, color){
    this.yPos = yPos;
    this.color = color;
    this.xPos = 0;
  }
}