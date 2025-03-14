// This example is adapted from Learning Processing Example 5-3 by Daniel Shiffman
// http://www.learningprocessing.com
// Refactor the following code. Be sure the refactored version:
//  - is readable
//  - is able to work easily with any canvas size

function setup() { 
  createCanvas(480, 270); // set the size of the screen
}
function draw() {
  background(255); 
  stroke(0); 
  line(240, 0, 240, 270);//draw a vertical line 
  line(0, 135, 480, 135);//draw a horizontal line
  noStroke(); 
  fill(0);
  //where will the black square be drawn when the mouse is at differen quadrants.
  if (mouseX < 240 && mouseY < 135) { 
    rect(0, 0, 240, 135); 
  }
  else if (mouseX > 240 && mouseY < 135) { 
    rect(240, 0, 240, 135); 
  }
  else if (mouseX < 240 && mouseY > 135) { 
    rect(0, 135, 240, 135); 
  }
  else if (mouseX > 240 && mouseY > 135) { 
    rect(240, 135, 240, 135); 
  }
}
