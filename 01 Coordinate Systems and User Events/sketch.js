// Coodrdinate system and User Evemts 
// Gary Wang
// Feb. 6th, 2025
// Not run-to-completion, but interactive programs...


function setup() {
  // runs ONCE, at the very beginning....
  createCanvas(500, 500);
  //
}

function draw() {
  // draw LOOP, repeats over and over forever...
  // - target of 60 frames per second
  // A new image is drawn at the botton of the loop
  background(220);
  twoCircles();
}

function twoCircles(){
  //draw two circles, one at a fixed location
  //and one at the mouse location
  fill(0,225,0);//green fill
  stroke(0,0,225);//blue outline
  strokeWeight(5); //thickness of line:5
  circle(250,250,50);

  fill(0,225,0);//green fill
  stroke(0,0,225);//blue outline
  strokeWeight(5); //thickness of line:5
  circle(0,0,50);

  fill(0,225,0);//green fill
  stroke(0,0,225);//blue outline
  strokeWeight(5); //thickness of line:5
  circle(500,0,50);

  fill(0,225,0);//green fill
  stroke(0,0,225);//blue outline
  strokeWeight(5); //thickness of line:5
  circle(0,500,50);

  fill(0,225,0);//green fill
  stroke(0,0,225);//blue outline
  strokeWeight(5); //thickness of line:5
  circle(500,500,50);

  noStroke();//turns off outlines
  fill(255,0,0); //red fill
  circle(mouseX, mouseY, 30);
  //secret calculate delay()
  //screen updates at the end of loop
}