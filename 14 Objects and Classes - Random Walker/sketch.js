// Classes and Objects (Random Walkers)
// Gary Wang
// Mar.14th, 2025
//

let singleWalker;
let walkers = [];
const NUM_WALKERS = 10000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  singleWalker = new Walker(100,150,"green");
  initwalkers();
}

function initwalkers(){
  //create a bunch of walker objects, put in array
  for(let i = 0; i < NUM_WALKERS; i++){
    let c = color(random(255),random(255),random(255));
    let w = new Walker(random(width),random(height),c);
    walkers.push(w);
}
}
function draw() {
  //background(220);
  //singleWalker.move();
 // singleWalker.display();
 //for(currentWalker of walkers){//loop by item
  //but doesn't let us remove any objects.

  //currentWalker.move();
  //currentWalker.display();
 //}
 fill(100,50,255,50);
 circle(mouseX,mouseY,60);
 for(let i = 0; i < walkers.length; i++){//loop by index
  //this allows us to delete
  let w = walkers[i];
  w.move();
  w.display();

}
//ask if the current objects is close to the mouse
if(dist(w.x,w.y,mouseX,mouseY) < 30){
  //to delete from an arbitary point in array: splice
  walkers.splice(i,1);
}
}
class Walker{
  //1. Constructor
  constructor(x,y,c){
    this.x = x; this.y = y; this.c = c
    this.speed = random(2,10);
    this.size = 5;
  }

  //2. class methods
  display(){
    rectMode(CENTER);
    fill(this.c);
    square(this.x, this.y, this.size);
  }
  move(){
    //equally likely chance of up down right left (alt-2)
    let choice = floor(random(4)); //0,1,2,3
    switch(choice){
      case 0: //Left
        this.x -= this.speed; break;
      case 1: //Right
        this.x += this.speed; break;
      case 2: //up
        this.y -= this.speed; break;
      case 3: //down
        this.y += this.speed; break;
    }
  }
}