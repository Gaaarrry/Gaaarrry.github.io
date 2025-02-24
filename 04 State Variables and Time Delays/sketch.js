// State Variables amd Timing
// Gary Wang
// Feb 13, 2025
//State Variables, Switch, Frames/Time
// Global Variable Declarations
// Global Variable Declarations
let shapeState = 1;    // 1-Circle 2-Square 3-Tri 4-Transit
let startTime, elapsedTime;


function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis(); // should roughly 0
}




function manageTime(){
  // update elapsedTime variable
  // and display
  elapsedTime = millis() - startTime;
  text(elapsedTime/1000, width*0.3, height*0.75);
}


function drawShape(){
  switch(shapeState){
  case 1:
    circle(width/2, height/2, 150);
    break;
  case 2:
    square(width/2, height/2, 150);
    break;
  case 3:
    let x = width / 2;   let y = height / 2;
    triangle(x-50,y+50, x+50, y-50, x, y-25);
    break;
  case 4:
    for(let i = 0; i < 20; i++){
      let x = random(width*0.4, width*0.6);
      let y = random(width*0.4, width*0.6);
      line(x, y, x + 25, y);
    }


  }
}


function keyPressed(){
  // on each keyboard
  if (shapeState < 4){
    shapeState++;
    if (shapeState === 4){
      startTime = millis();
    }
  }


}


function draw() {
  background(220);
  drawShape();
  manageTime();
  if(shapeState===4 && elapsedTime > 2000){
    shapeState=1;
  }
}


