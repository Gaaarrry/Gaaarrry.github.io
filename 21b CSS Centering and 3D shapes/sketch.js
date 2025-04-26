// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let angle = 10;
function setup() {
  createCanvas(500,500,WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(220); //WEGAL has 0,0 at the center
  rotateX(-20);
  rotateY(frameCount);
  fill(100,240,100);
  angle =map(mouseX,0,width,-120,120);
  for(let i = 0; i< 360; i+=45){
    push();
    rotateY(i);
    drawBox(30);
    pop();
  }
  
}

function drawBox(size){
  if(size>3){
    rotateZ(angle);
    translate(size*1.5,0);
    box(size);
    drawBox(size*0.8);
  }
}