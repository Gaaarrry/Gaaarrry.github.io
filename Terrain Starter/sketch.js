// Project Title
// Gary Wang
// March, 4th, 2025
//
//Starter Code for our
//Terrain Generation Project
let rectWidth = 0;



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  background(220);
  if (keyIsDown(LEFT_ARROW)) {
    rectWidth -=0.25;
    if(rectWidth < 0){
      rectWidth = 0;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    rectWidth += 0.25;
    if(rectWidth > 40){
      rectWidth = 40;
    }
  }

  generateTerrain();

 
}

function generateTerrain(){
  let peak = frameCount*0.03;
  let peaky = height;
  let peakx;
  for (let x = 1; x < width; x++) {
    x += rectWidth;
    let y = noise(peak) * height; //noise(peak-1 height increase through noise value decrease
   
    peak += 0.01;
    fill(0);
    rect(x, y, rectWidth, height - y);
    if(y < peaky){//find the highest point
      peaky = y;
      peakx = x;
    }
   
  }
  drawflag(peakx,peaky);
}
function drawflag(x,y){
  fill(255);
  line(x,y,x,y-20);
  fill(225,0,0);
  triangle(x,y-15,x,y-25,x+10,y-20);

 
}


