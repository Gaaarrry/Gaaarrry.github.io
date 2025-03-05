// Find the Smallest Circle
// Gary Wang
// March 6th, 2025

const NUM_CIRCLES= 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawCircles();
}

function drawCircles(){
  //draw NUM_CIRCLES circles with no fill
  //the smallest one will be filled with a color
  noFill();
  //variables to track smallest so far 
  let smallestDiameter = Infinity;
  let smallX, smallY;

  for(let i = 0; i <NUM_CIRCLES; i++){
    let x = random(0,width);
    let y = random(0, height);
    let d = random(20,80);
    circle(x,y,d);
    //"is this the smallest circle so far"
    if(d < smallestDiameter){
      smallestDiameter = d;
      smallX = x; smallY = y;
    }
  }
  fill(255,255,0);
  circle(smallX, smallY,smallestDiameter);
}
function draw() {
  //background(220);
}
