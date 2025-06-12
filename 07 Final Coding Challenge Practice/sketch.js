// Practice for Final Coding Challenge

// Classes and Objects
// Working with images/animations
// Keyboard and mouse interactions


// ----- Global Variables ------
let gorillaIdle = [];
let gorillaSwipe = [];
let spiralImages = [];


let idleIndex=0; let swipeIndex = 0;
let gorillaState = 0; //0 -> 6
let gorillaX = 200

//spiral related
let spiralObjects =[];
function preload(){  //fill arrays with gorilla and spiral images
  //Gorilla Images First   1-6
  for (let i = 1; i <= 6; i++) {
    gorillaIdle.push(loadImage("assets/Gorilla/idle" + i + ".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe" + i + ".png"));
  }

  //Load Circle Next:   circle00.png  00-15
  for (let i = 0; i <= 15; i++) {
    if (i < 10) {
      spiralImages.push(loadImage("assets/Circle/circle0" + i + ".png"));
    }
    else {
      spiralImages.push(loadImage("assets/Circle/circle" + i + ".png"));
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(220);
  moveGorilla();
  drawGorilla()
  //Spiral code
  for(let i=0; i< spiralObjects.length; i++){
    let s = spiralObjects[i];
    s.display();
    if(s.active === false){
      spiralObjects.splice(i,1);
    }
  }
}
function mousePressed(){
  spiralObjects.push(new Spiral(mouseX,mouseY));
  //mySprial = new.Sprial(0,0);
}
function moveGorilla(){
  if(keyPressed&&key ==="m"){
    if(mouseX > gorillaX){
      gorillaX += 5;

    }
    else if (mouseX <gorillaX){
      gorillaX -= 5;
    }
    //x:200               m:500
  }
}

function keyPressed(){
  //function keyPressed is c
  if(key === " "){
    if (gorillaState === 0) gorillaState = 1;
    else gorillaState = 0;
  }
}

function drawGorilla(){
  //render the gorilla at it's position , choosing the 
  //correct image for animation playback
  if (gorillaState === 0){//idle state(0,1,2,3,4,5)
    image(gorillaIdle[idleIndex], gorillaX,height/2)
    if(frameCount % 6 === 0){
    
      idleIndex ++;
      if(idleIndex > 5 ) idleIndex = 0;
    }
  }
  else if(gorillaState === 1 ){//swipe state
    image(gorillaSwipe[swipeIndex],gorillaX,height/2);
    if(frameCount % 6 === 0){
      swipeIndex++;
      if(swipeIndex > 5) swipeIndex = 0;
    }
  }
}

class Spiral{
  constructor(x,y){//run once, each time an object is made 
    this.x =x; this.y=y;
    this.currentFrame=0;
    this.active = true; //used to mark for deletion
  }
  //class methods
  display(){ //0-15
    if(this.currentFrame > 15){
      this.active = false;
    }
    else{
      image(spiralImages[this.currentFrame],this.x, this.y);
      if(frameCount%3 ===0)this.currentFrame++;
    }
  }
}