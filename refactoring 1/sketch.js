let rectX, rectY, speedX, speedY;
function setup() {
  createCanvas(windowWidth, windowHeight);
  //set the rect length and width and the speed of the rect.
  rectX = 200;
  rectY = 300;
  speedX = random(3, 8); 
  speedY = random(3, 8);
}
function draw() {
  bounceWall(); //call the bounceWall function
  background(80, 80, 80);//set the background color
  rect(rectX, rectY, 250, 75);//draw the rect
}
function bounceWall() {//function to make the rect bounce off the wall
  rectX += speedX; rectY += speedY; //set the speed of the rect
  if (rectY >= height - 75 || rectY <= 0) { 
    speedY = speedY * -1; 
  }//if the rect hits the top or bottom of the screen, change the up and down direction
  if (rectX >= width - 250 || rectX <= 0) { 
    speedX = speedX * -1; 
  }//if the rect hits the left or right of the screen, change the left and right direction
}
