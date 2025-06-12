// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectWidth = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  drawBackground();
  generateTerrain();


 
}


function drawBackground() {
  // sky
  background(135, 206, 250);


  // sun (responsive)
  noStroke();
  fill(255, 255, 0);
  circle(width * 0.85, height * 0.1, width * 0.05);


  // mountains (3–5, responsive and evenly spaced)
  fill(102, 181, 106);
  triangle(width * 0.15, height * 0.05, width * 0.05, height * 0.55, width * 0.25, height * 0.55);
  triangle(width * 0.35, height * 0.15, width * 0.25, height * 0.55, width * 0.45, height * 0.55);
  fill(89, 168, 93);
  triangle(width * 0.55, height * 0.25, width * 0.45, height * 0.55, width * 0.65, height * 0.55);
  fill(81, 157, 88);
  triangle(width * 0.75, height * 0.15, width * 0.65, height * 0.55, width * 0.85, height * 0.55);
  triangle(width * 0.95, height * 0.25, width * 0.85, height * 0.55, width * 1.05, height * 0.55);


  // clouds (fixed position, tight clusters)
  fill(255);
  drawCloud(240, 80);
  drawCloud(510, 60);
  drawCloud(700, 100);
  drawCloud(900, 75);


  // water
  noStroke();
  fill(0, 20, 255);
  rect(0, height / 3, width, height - height / 3);
}


function drawCloud(x, y) {
  circle(x, y, 40);
  circle(x + 25, y - 5, 42);
  circle(x + 50, y, 40);
  circle(x + 20, y + 10, 35);
  circle(x + 30, y - 15, 35);
}






function generateTerrain(){
  let peak = frameCount * 0.01;
  let peakY = height;
  let peakX;
  let allHeight = 0;
  let allRect = 0;
  for (let x = 0; x <= width; x += rectWidth) {
    let y = height / 3 + noise(peak) * (height / 50); // limit wave range within lake
    peak += 0.01;
    noStroke();
    fill(0, 120, 200, 160);
    rect(x, y, rectWidth, height - y);


    allHeight += y;
    allRect += 1;
    if (y < peakY) {
      peakY = y;
      peakX = x;
    }
  }
}





function generateTerrain(){
  let peak = frameCount * 0.01;
  let peakY = height;
  let peakX;
  let allHeight = 0;
  let allRect = 0;
  for (let x = 0; x <= width; x += rectWidth) {
    let y = height / 3 + noise(peak) * (height / 50); // limit wave range within lake
    peak += 0.01;
    noStroke();
    fill(0, 120, 200, 160);
    rect(x, y, rectWidth, height - y);


    allHeight += y;
    allRect += 1;
    if (y < peakY) {
      peakY = y;
      peakX = x;
    }
  }
}


function keyPressed() {
  if (key === ' ') {
    if (!isFired) {
      isFired = true;
      let dirX = mouseX - ball.x;
      let dirY = mouseY - ball.y;
      let mag = sqrt(dirX * dirX + dirY * dirY);
      if (mag != 0) {
        dirX /= mag;
        dirY /= mag;
      }
      fishWire.x = ball.x + dirX * fishWireLength;
      fishWire.y = ball.y + dirY * fishWireLength;
      fishWire.vx = dirX * 10;
      fishWire.vy = dirY * 10;
    }
  }
  if (key === 'p') {
    vis = vis === 0 ? 1 : 0;
  }
}


class shop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.s = 1000;
  }
  display() {
    if (vis === 1) {
      square(this.x, this.y, this.s);
    }
  }
}
