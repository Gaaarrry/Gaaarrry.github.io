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
  background(0);
  gradientBackground()
  circleLine();

  //screen gets updated here.
}

function gradientBackground(){
  //create a gardient to use as background
  let h = 30;
  //use a loop to draw vertical stack of rectangles
  for(let y = 0; y < height; y +=h){
    noStroke();
    let mappedY = map(y,0,height,0,255);
    let reversedY = map(y,0,height,225,0);
    fill(mappedY, reversedY, mouseX/3);
    rect(0,y,width,h);
  }
}

function circleLine(){
  //use a loop (for or while) to draw a line
  //of circles side by side.
  let d = 30; //diameter of each circle
  let y = height/2;
  let xStart = 0;
  let xEnd = mouseX;   //width*0.75;

  //use a loop to do the drawing
  //RESULTS IN A SINGLE IMAGE, NO ANIMATION!!
  for(let x = xStart; x <= xEnd; x+=d){
    //x: 0  40  80  120  160  200  240
    circle(x,y,d);
  }
}