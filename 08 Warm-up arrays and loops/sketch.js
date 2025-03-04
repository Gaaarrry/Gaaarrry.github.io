// Warm-up Exercise
// 1. Summaring an Array
// 2. Drawing with Loops Practice
let a = [22,11,5,5,90,80,70,60];
        //1, 2, 3, 4, 5, 6, 7
//a.length is 8


function setup() {
  createCanvas(400,400);
  background(200);
  // TASK 1: Add up all the values in our array
  //         and display the total in the console
  let total = 0;
  //for(let x = 0; y = 0; x <= 400; y <= 400; x+(400/10); y+(400/10)){
    //circle(x, y, 40);
    //print(a[i]);
    //total = total + a[i];
  }
  print(total);
  drawX();


function draw() {
  background(220);
  drawX();
}

function drawX(){
  for( let x = 0; x <= width; x += width/10){
    circle(x,x,20);
    circle(x, 400-x,20);

  }
}