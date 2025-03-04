// Random vs. Noise 
// Gary Wang
// Feb. 8th,2025
//
// A look at different ways to use
// unpredictability in our programs

let mySeed;
let noiseStart = 5;
let noiseTime = 5;
let noiseSpeed = 0.1;


function setup() {
  createCanvas(600,600);
  textAlign(CENTER, CENTER);
  mySeed = random(1000);
  //randomNumbers();
}

function draw() {
  noiseTime = noiseStart;
  randomSeed(mySeed);
  background(220);
  randomNumbers();
  noiseNumbers();
  noiseStart += noiseSpeed;
}

function noiseNumbers(){
  //display a line of several numbers
  //generated with the noise()function 1- 100
  let x = 100
  while(x <= 500){
    let randomNum = noise(noiseTime);//0-1 (normalized)
    randomNum = map(randomNum,0,1,1,100);//1-100
    randomNum = round(randomNum);
    fill(140, 220, 140); noStroke();
    circle(x,400,randomNum);
    fill(0);
    text(randomNum,x,400);
    x += 50;
    noiseTime += noiseSpeed;

  }

}

function randomNumbers(){
  //display a line of several numbers generated 
  // with the random() funciton.   1 - 10
  // - these should be uniformly distributed.
  let x = 100; //100, 150, 200. 250...500  
  while(x <= 500){
    let randomNum = round(random(1,100));
    fill(230,140,140); noStroke();
    circle(x, 200, randomNum);
    fill(0);
    text(randomNum,x, 200); //
    x += 20;
  }
}
