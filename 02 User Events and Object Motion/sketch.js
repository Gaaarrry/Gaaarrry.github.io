// User Events
// Gary Wang
// Feb. 7th, 2025

// Global Variable Declarations
//Define your globals here.
// You can only store simple/primitive data
// at the point. (no system variables)
let tSize = 10;
let x; //declaration only

function setup() {
  //run once
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  rectMode(CENTER);
}

function draw() {
  background(220);
  //print("Current Frame: " + frameCount);   //console.log()

  fill("green")//fill/stroke 
  textSize(tSize);
  text(mouseX + ", " + mouseY + " "+ mouseButton, mouseX, mouseY);

  //--------Keyboard Section-------------
  fill(255,200,100);
  square(x, 200, 50, 5);

  if(keyIsDown(LEFT_ARROW)){
    x = x - 5;
    if (x<0){ //off left edge
      x = width;//create a wrap-around effect
    }
  }
  if(keyIsDown(RIGHT_ARROW)){
    x = x + 5;
    if(x>width){
      x=0;
    }
  }
}

function mousePressed(){
  //this is called Automatically...do NOT call it
  //yourself.
  //This is called ONCE PER MOUSE BUTTON PRESS
  tSize = random(5,100);
}