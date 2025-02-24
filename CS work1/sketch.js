// Project Title
// Gary Wang
// Feb. 12th, 2025
// Interactive Scene
// Gary Wang
// Feb, 18th, 2025
//
//Different views at outdoors. (mountains, hills, the Sun, the Moon, clouds...)

let currentBack=0;//the view starts in the morning
function setup() {
  createCanvas(600, 400);//display size
}

function draw() {// codes are all in functions
  background(200);
  drawbackground();
  drawCloud();
}
function mousePressed(){
  currentBack = currentBack+1;// when the left mouse is clicked
  if (currentBack >3){        //the "currentBack" variable changes
    currentBack = 0;         //the "currentBack"will not count to 4,it will reset to 0
  }
}


function drawbackground(){
  //no stroke for these shapes
  noStroke();
  if (currentBack=== 0){ //what is the view looks like when it's in the morning?(currentBack 0)
    background(135, 206, 250);//blue sky(great view)
    //mountains
    fill(50, 100, 180);
    triangle(100, 30, 0, 250, 200, 250);
    fill(30, 80, 160);
    triangle(500, 50, 600, 250, 400, 250);
    fill(40, 90, 170);
    triangle(330, 150, 400, 250, 250, 300);
    //some hills
    fill(100, 200, 120);
    circle(500, 600, 800);
    fill(90, 190, 110);
    circle(100, 600, 800);
    fill(80, 180, 100);
    circle(350, 700, 800);
    //sun in the morning
    fill(255, 255, 0);
    circle(300,100, 50);
  }
  else if(currentBack === 1){//what is the view looks like when it's at noon?(currentBack 1)
    background(255, 165, 0); //orange sky at noon, (hot and sunny)
    //mountains
    fill(30, 90, 200);
    triangle(100, 30, 0, 250, 200, 250);
    fill(20, 80, 180);
    triangle(500, 50, 600, 250, 400, 250);
    fill(25, 85, 190);
    triangle(330, 150, 400, 250, 250, 300);
    //some hills
    fill(50, 255, 50);
    circle(500, 600, 800);
    fill(40, 245, 40);
    circle(100, 600, 800);
    fill(30, 235, 30);
    circle(350, 700, 800);
    //sun at noon
    fill(255, 94, 77);
    circle(450,40, 50);
  }
  else if(currentBack === 2){//what is the view looks like when it's at night?(currentBack 2)
    background(50, 50, 50);//dark sky at night
    //mountains
    fill(20, 60, 120);
    triangle(100, 30, 0, 250, 200, 250);
    fill(10, 50, 100);
    triangle(500, 50, 600, 250, 400, 250);
    fill(15, 55, 110);
    triangle(330, 150, 400, 250, 250, 300);
    //some hills
    fill(10, 120, 50);
    circle(500, 600, 800);
    fill(10, 110, 40);
    circle(100, 600, 800);
    fill(5, 100, 30);
    circle(350, 700, 800);
    //Moon
    fill(200,200,225)
    circle(150,40, 50);
  }
  else if(currentBack === 3){//what is the view looks like when it's in the early morning?(currentBack 3)
    background(0, 255, 127);//green-yellow sky
    //sun in the very early moring
    fill(255, 223, 186);
    circle(200,200, 50);
    //mountains
    fill(40, 70, 140);
    triangle(100, 30, 0, 250, 200, 250);
    fill(30, 60, 120);
    triangle(500, 50, 600, 250, 400, 250);
    fill(35, 65, 130);
    triangle(330, 150, 400, 250, 250, 300);
    //some hills
    fill(80, 150, 90);
    circle(500, 600, 800);
    fill(70, 140, 80);
    circle(100, 600, 800);
    fill(60, 130, 70);
    circle(350, 700, 800);
  }
}
function drawCloud(){
  if (currentBack===0){//different colors in different situations
    fill(255,255,255);
  }
  else if (currentBack===1){
    fill(230,230,230);
  }
  else if (currentBack===2){
    fill(150,150,150);
  }
  else if (currentBack===3){
    fill(100,100,120);
  }
  //first cloud
  circle(mouseX-60, 30, 40);//"mouseX" allow the clouds follow the mouse's X axis change
  circle(mouseX-20, 30, 40);
  circle(mouseX-40, 30, 40);
  circle(mouseX-65, 40, 20);
  circle(mouseX-58, 25, 40);
  circle(mouseX-22, 25, 40);
  //second cloud
  circle(mouseX+50, 80, 40);
  circle(mouseX+70, 80, 40);
  circle(mouseX+50, 80, 40);
  circle(mouseX+40, 90, 20);
  circle(mouseX+42, 75, 40);
  circle(mouseX+58, 75, 40);
}