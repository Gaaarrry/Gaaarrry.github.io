// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectwidth = 45;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawRoad();
}

function drawRoad(){
  fill(0);
  rect(0,height/4,width,height/2);
  
  for (i=0; i<=width; i+=rectwidth){
    fill(255);
    
    rect(i,height/2,rectwidth-15,3);
  }
}