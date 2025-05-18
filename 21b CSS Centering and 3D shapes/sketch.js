// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let angle = 60;

function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  
}

function draw() {
  orbitControl();
  background(220);  //WEBGL has 0,0 at the center
  lights();
  rotateX(-20);
  rotateY(frameCount);
  
  fill(100,240,100);
  angle = map(mouseX, 0, width, -120, 120);
  for(let i = 0; i < 360; i+=20){
    push();
    rotateY(i);
    drawBox(20);
    pop();
  }
  
}

function drawBox(size){
  if(size > 3){
    let long = map(size, 20, 0, 0, 100);
    push();
    translate(0, -long / 2, 0);
    box(size / 4, long, size / 4);
    pop();

    let longg = map(size, 20, 0, 0, 100);
    push();
    translate(0, longg / 2, 0);
    box(-size / 4, -longg, size / 4);
    pop();

    rotateZ(angle);
    translate(size*2,0);
    box(size);

    drawBox(size*0.8);
  }
}