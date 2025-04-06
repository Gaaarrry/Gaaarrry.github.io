// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// let eastbound = [];
// let westbound = []; 
// let rectwidth = 45;
// function setup() {    
//   createCanvas(windowWidth, windowHeight);
//   for(let i = 0; i< 20; i++){}
// }
let eastbound = [];
let westbound = [];
let rectwidth = 35;
let trafficLight;


function setup() {
  createCanvas(800, 400);
  trafficLight = new TrafficLight();
  for (let i = 0; i < 20; i++) {
    // Eastbound (moving right)
    let y = random(height / 3 + 10, height / 2 - 30);
    eastbound.push(new Vehicle(int(random(2)),color(random(255), random(255), random(255)),random(width),y,1,random(1, 5)));

    // Westbound (moving left)
    y = random(height / 2 + 10, height * 2 / 3 - 30);
    westbound.push(new Vehicle(int(random(2)),color(random(255), random(255), random(255)),random(width),y,0,random(-5, -1)));
  }
}
function draw() {
  background(220);
  drawRoad();
  for (let v of eastbound) {
    v.action();
  }
  for (let v of westbound) {
    v.action();
  }
}

function mousePressed() {
  if (keyIsDown(SHIFT)) {
    let y = random(height / 3 + 10, height / 2 - 30);
    westbound.push(new Vehicle(int(random(2)),color(random(255), random(255), random(255)),random(width),y,1,random(1, 5)));
  } 
  else {
    y = random(height / 2 + 10, height * 2 / 3 - 30);
    eastbound.push(new Vehicle(int(random(2)),color(random(255), random(255), random(255)),random(width),y,0,random(-5, -1)));
  }
}
function keyPressed() {
  if (key === ' ') {
    trafficLight.isRed = !trafficLight.isRed;
  }
}

function drawRoad(){
  fill(0);
  rect(0,height/4,width,height/2);
  
  for (i=0; i<=width; i+=rectwidth){
    fill(255);
    
    rect(i,height/2,rectwidth-15,3);
  }
}

class Vehicle{
  constructor(car, color, x, y, dire, xSpeed){
    this.car = car; this.color = color; this.x = x; this.y = y; this.dire = dire; this.xSpeed = xSpeed;
    
  }
  display(){
    fill(this.color);
    if(this.car === 0){ 
      rect(this.x, this.y, 30, 20);
      fill(255);
      rect(this.x, this.y-3,8,-3);
      rect(this.x+20, this.y-3,8,-3);
      rect(this.x,this.y+20,8,3);
      rect(this.x+20,this.y+20,8,3);
    }
    else{
      rect(this.x, this.y, 50,20);
      rect(this.x-10, this.y+3,10,15);
      fill(255);
      rect(this.x-8, this.y+1, 4,2);
      rect(this.x-8, this.y+18,4,2);
    }
  }
  move(){
    if (trafficLight.isRed){ 
      return;
    }
    this.x += this.xSpeed;
    if(this.x > width){
      this.x = 0;
    }
    if(this.x < 0){
      this.x = width;
    }
  }
  speedUp(){
    if(this.dire === 1 && this.xSpeed <= 15){
      this.xSpeed += 0.5;
      if (this.xSpeed >= 15){
        this.xSpeed = 15;
      }
    }
    if(this.dire === 0 && this.xSpeed >=-15){
      this.xSpeed -= 0.5;
      if (this.xSpeed <= -15){
        this.xSpeed = -15;
      }
    }
    
  }

  speedDown() {
    if (this.direction === 1 && this.xSpeed >= 0) {
      this.xSpeed -= 0.5;
      if (this.xSpeed <= 0) {
        this.xSpeed = 0;
      }
    }
    if (this.direction === 0 && this.xSpeed <= 0) {
      this.xSpeed += 0.5;
      if (this.xSpeed >= 0) {
        this.xSpeed = 0;
      }
    }
  }
  changeColor() {
    this.col = color(random(255), random(255), random(255));
  }

  action() {
    this.move();
    if (random(1) < 0.01){
      this.speedUp();
    }
    if (random(1) < 0.01){
      this.speedDown();
    }
    if (random(1) < 0.01){
      this.changeColor();
    }
    this.display();
  }
}
  class TrafficLight {
    constructor() {
      this.isRed = false; 
    }
  }