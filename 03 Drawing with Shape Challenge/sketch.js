// Drawing with Shape Challenge
// Gary Wang
// Feb. 10th, 2025

//Global Variable Declarations
let boxX = 200, boxY = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(220);
  drawCharacter();
  //drawBox();
}

function drawCharacter(){
  noStroke();
  fill(0,225,0);
  rect(200, 200, 50, 50 ,30, 30, 0, 0);
  rect(200, 250,5,30);
  rect(245, 250,5,30);
  fill(0);
  circle(212, 225,6);
  circle(238, 225,6);
  rect(215, 235, 20,2);
}

function drawBox(){
  //draw a box on the screen
  noStroke();
  fill(225,155,55);
  rect(boxX, boxY, 50, 30, 5, 5, 0, 0);
  rect(boxX, boxY - 50, 30);
}

function keyPressed(){
  if(key === "a"){
    boxX = 0;
  }
  if(key === "b"){
    boxY = 400;
  }
  if(keyCode===ESCAPE){
    boxX = width * 0.85; //85%
    boxY = height * 0.6; //60%
  }
}