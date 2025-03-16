let rectWidth = 5;
let offsetX = 0;
let noiseStep = 0.01;  
let terrainHeights = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  }

function draw() {
  background(220);
  generateTerrain();
  drawFlagAtPeak();
  drawAverageLine();
}

function generateTerrain() {
  terrainHeights = [];
  rectMode(CORNERS);

  // Loop through and generate the terrain with noise
  for (let x = 0; x < width; x += rectWidth) {
    let noiseVal = noise(offsetX);
    let rectHeight = map(noiseVal, 0, 1, 50, height - 50);  // Adjust noise to create variation
    terrainHeights.push(rectHeight);

    let x2 = x + rectWidth;
    let y2 = height - rectHeight;

    noStroke();
    fill(0);
    rect(x, height, x2, y2);

    offsetX += noiseStep;
  }
  rectMode(CORNER);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rectWidth = max(1, rectWidth - 1);
  } else if (keyCode === RIGHT_ARROW) {
    rectWidth = rectWidth + 1;
  }
}

function drawFlagAtPeak() {
  let highestPeakIndex = getHighestPeakIndex();  // Get the highest terrain peak index
  let peakX = highestPeakIndex * rectWidth;
  let peakY = height - terrainHeights[highestPeakIndex];
  drawFlag(peakX, peakY);  // Draw the flag on top of the highest peak
}

function drawFlag(x, y) {
  fill(255, 0, 0);  // Red flag color
  rect(x - 10, y - 20, x + 10, y);  // Flag rectangle
  stroke(0);
  line(x, y, x, y - 30);  // Flagpole
}

function getHighestPeakIndex() {
  let highest = 0;
  // Iterate through the terrain heights to find the highest peak
  for (let i = 1; i < terrainHeights.length; i++) {
    if (terrainHeights[i] > terrainHeights[highest]) {
      highest = i;
    }
  }
  return highest;
}

function drawAverageLine() {
  let totalHeight = 0;
  // Calculate the average height of the terrain
  for (let h of terrainHeights) {
    totalHeight += h;
  }
  let averageHeight = totalHeight / terrainHeights.length;
  stroke(0, 255, 0);
  line(0, height - averageHeight, width, height - averageHeight);  // Draw average height line
}
