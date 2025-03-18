// Project Title
// Gary Wang
// March, 4th, 2025

//Terrain Generation Project
let rectWidth = 1;// set the width of the noise----1



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  background(220);
  //use Arrow key to interact with the terrain
  if (keyIsDown(LEFT_ARROW)) {//left arrow decrease...
    rectWidth -=0.25;
    if(rectWidth < 1){
      rectWidth = 1;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {//right arrow increase...
    rectWidth += 0.25;
    if(rectWidth > 40){
      rectWidth = 40;
    }
  }

  generateTerrain();

 
}

function generateTerrain(){
  let peak = frameCount*0.03;//set the speed of the noise
  let peakY = height;
  let peakX;
  let allHeight = 0;
  let allRect = 0;
  for (let x = 1; x < width; x++) {
    x += rectWidth;//add the width of the noise
    let y = noise(peak) * height; //noise(peak-1 height increase through noise value decrease
   
    peak += 0.01;
    fill(0);
    rect(x, y, rectWidth, height - y);//use this to draw the terrain one by one
    allHeight += y; //find all height of the terrain
    allRect +=1;
    if(y < peakY){//find the peak...
      peakY = y;
      peakX = x;
    }
   
  }
  drawflag(peakX,peakY);//use peakX and peakY to put the flag on the top of the highest peak
  averageHeight(allHeight/allRect);//the resault will be the average height
}
function drawflag(x,y){
  fill(255);
  line(x,y,x,y-20);
  fill(225,0,0);
  triangle(x,y-15,x,y-25,x+10,y-20);

 
}


function averageHeight(yValue){
  fill(255,0,0);
  rect(0,yValue,width, 5);//starts at 0, yValue(the average height)
                          //screen's width, and height   5
}