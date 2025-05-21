// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  ob
}

function draw() {
  background(220);
}


class Ball{
  constructor(){
    this.pos=createVector(x , y);
    this.vel = createVector(3,-3);
    this.grav = createVector(0,0);
  }

  calMouse(){
    //mouse vector calculation
  }
  move(){
    this.vel.add(this.vel);
    this.grav.add(this.grav);
  }

  display(){
    //display Ball
    circle(this.pos.x, this.pos.y,20);

    stroke(255,0,0);
    line(this.pos.x,this.pos.y);

  }
}