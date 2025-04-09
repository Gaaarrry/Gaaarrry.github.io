// CARS CARS CARS
// Gary Wang
// March, 29th, 2025
// Tow lanes of traffic, one going east and one going west

//Global variables
let eastbound = [];
let westbound = [];
let rectwidth = 35;
let trafficLight;


function setup() {//in order to let classes be used
  createCanvas(800, 400);
  trafficLight = new TrafficLight();
  for (let i = 0; i <= 20; i++) {// create 20 vehicles
    // Eastbound (moving right)
    let y = random(height / 3 + 10, height / 2 - 30);
    eastbound.push(new Vehicle(int(random(2)),color(random(255), random(255), random(255)),random(width),y,1,random(1, 5)));

    // Westbound (moving left)
    y = random(height / 2 + 10, height * 2 / 3 - 30);
    westbound.push(new Vehicle(int(random(2)),color(random(255), random(255), random(255)),random(width),y,0,random(-5, -1)));
  }
}
function draw() {//in order to let classes be used
  background(220);
  drawRoad();
  trafficLight.update();
  for (let v of eastbound) {
    v.action();
  }
  for (let v of westbound) {
    v.action();
  }
}

function mousePressed() {//the cars will be increased or decreased by 1 every time the specific key is pressed
  if (keyIsDown(SHIFT)) {//when mouse key and shift key are pressed, a car will be added to the westbound lane
    let y = random(height / 3 + 10, height / 2 - 30);
    westbound.push(new Vehicle(int(random(2)),color(random(255), random(255), random(255)),random(width),y,1,random(1, 5)));
  } 
  else {//when just the mouse key is pressed, a car will be added to the eastbound lane
    y = random(height / 2 + 10, height * 2 / 3 - 30);
    eastbound.push(new Vehicle(int(random(2)),color(random(255), random(255), random(255)),random(width),y,0,random(-5, -1)));
  }
}
function keyPressed() {//all motion will be stopped for 120 frames when the space key is pressed
  if (key === ' ') {
    if (!trafficLight.isRed) { 
      trafficLight.isRed = true;
      trafficLight.frameCount = 0; 
    }
  }
}


function drawRoad(){//draw the road
  fill(0);
  rect(0,height/4,width,height/2);
  
  for (i=0; i<=width; i+=rectwidth){
    fill(255);
    
    rect(i,height/2,rectwidth-15,3);
  }
}

class Vehicle{//create the vehicle class to draw the cars, move them, change their color, speed up and slow down, and the action to show the motion
  //1.constructor:
  constructor(car, color, x, y, dire, xSpeed){
    this.car = car; this.color = color; this.x = x; this.y = y; this.dire = dire; this.xSpeed = xSpeed;
    
  }
  display(){//show the cars
    fill(this.color);
    if(this.car === 0){ //small car
      rect(this.x, this.y, 30, 20);
      fill(255);
      rect(this.x, this.y-3,8,-3);
      rect(this.x+20, this.y-3,8,-3);
      rect(this.x,this.y+20,8,3);
      rect(this.x+20,this.y+20,8,3);
    }
    else{//truck
      rect(this.x, this.y, 50,20);
      rect(this.x-10, this.y+3,10,15);
      fill(255);
      rect(this.x-8, this.y+1, 4,2);
      rect(this.x-8, this.y+18,4,2);
    }
  }
  move(){//let the cars move 
    if (trafficLight.isRed){ 
      return;
    }
    this.x += this.xSpeed;
    if(this.x > width){//if the car is out of the screen, it will be back to the other side of the screen
      this.x = 0;
    }
    if(this.x < 0){
      this.x = width;
    }
  }
  speedUp(){//let the cars speed up
    if(this.dire === 1 && this.xSpeed <= 15){//if the car is going to the right and its speed is less than 15, it will speed up by 0.5
      this.xSpeed += 0.5;
      if (this.xSpeed >= 15){//if the speed is more than 15, it will be set to 15
        this.xSpeed = 15;
      }
    }
    if(this.dire === 0 && this.xSpeed >=-15){//if the car is going to the left and its speed is more than -15, it will speed up by 0.5
      this.xSpeed -= 0.5;
      if (this.xSpeed <= -15){//if the speed is less than -15, it will be set to -15
        this.xSpeed = -15;
      }
    }
    
  }

  speedDown() {//let the cars slow down
    if (this.dire === 1 && this.xSpeed >= 0) {//if the car is going to the right and its speed is more than 0, it will slow down by 0.5
      this.xSpeed -= 0.5;
      if (this.xSpeed <= 0) {//if the speed is less than 0, it will be set to 0
        this.xSpeed = 0;  
      }
    }
    if (this.dire === 0 && this.xSpeed <= 0) {//if the car is going to the left and its speed is less than 0, it will slow down by 0.5
      this.xSpeed += 0.5;
      if (this.xSpeed >= 0) {//if the speed is more than 0, it will be set to 0
        this.xSpeed = 0;
      }
    }
  }
  changeColor() {//random color for the cars
    this.color = color(random(255), random(255), random(255));
  }

  action() {//ACTION! let the cars move, change color, speed up and slow down
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
class TrafficLight {//create the traffic light class to show the red light and stop the cars
  ///1.constructor:
  constructor() {
    this.isRed = false; 
    this.frameCount = 0;//the (timer)frame count will be 0
  }
  
  update() {//update the traffic light check the variables
    if (this.isRed) {
      this.frameCount++;
      if (this.frameCount >= 120) {//if the frame count is more than 120, the light will be return green(all cars go...) 
        this.isRed = false; 
        this.frameCount = 0;
      }
    }
  }
}