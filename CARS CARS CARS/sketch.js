// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let eastbound = [];
let westbound = []; 
let rectwidth = 45;
function setup() {    
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i< 20; i++){}
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

class car{
  constructor(car, color, x, y, dire, xSpeed){
    this.car = car; this.color = color; this.x = x; this.y = y; this.dire = dire; this.xSpeed = xSpeed;
    
  }
  display(){
    fill(this.color);
    if(this.car === 0){
      rect(this.x, this.y, 30, 20);
    }
    else{
      rect(this.x, this.y, 60,20);
    }
  }
  move(){
    this.x += this.xSpeed;
    if(this.x > width){
      x = 0;
    }
    if(this.x < 0){
      x = width;
    }
  }
  speedUp(){
    if(this.dire === 1 && this.xSpeed < 15){
      this.xSpeed += 0.5;
    }
    if(this.dire === 1 && this.xSpeed >-15){
      this.xSpeed -= 0.5;
    }
    
  }
  speedDown(){
  }
}
