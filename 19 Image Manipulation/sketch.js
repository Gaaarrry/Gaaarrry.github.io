// 19 Image Manipulation
// Gary Wang
// 9th April 2025


let pilot; // p5.Image     .width . height


function preload(){
  pilot = loadImage("assets/aviator.png");
}


function setup() {
  createCanvas(pilot.width, pilot.height);
}


function setPixelColor(pos, r, g, b){
  // assume pos points at a RED component
  pixels[pos] =r;
  pixels[pos+1] =g;
  pixels[pos+2] =b;
}


function draw() {
  image(pilot, 0, 0);
  loadPixels(); //fills pixels array
  background(0);

  drawCharacter();
  
  // greyscale();
  // boostImage();
  // updatePixels();
}

function drawCharacter(){
  //render an image using characters
  fill(255);

  for(let x = 0; x <width; x += 10){
    for(let y = 0; y < height; y += 10){
      let loc = (y*pilot.width +x) * 4;
      let avg = avgPixel(loc);//0-255
      if (avg > 200)            text("&",x,y);
      else if (avg > 150)       text("*",x,y);
      else if (avg > 100)       text("-",x,y);
      else if (avg > 50)        text(",",x,y);

    }
  }
}

function avgPixel(i){
  // i → index of the red component
  let r = pixels[i];
  let g = pixels[i+1];
  let b = pixels[i+2];
  return (r+g+b)/3;
}


function greyscale(){
 
  // a desaturation filter
  for(let i = 0; i < pixels.length ; i +=4){
    let avg = avgPixel(i);
    setPixelColor(i, avg, avg,avg);
  }
}


function boostImage(){
  // a brightening filter; make each pixel brighter
  let boost = map(mouseX, 0, width, -100, 100);
  for(let i = 0; i < pixels.length ; i +=4){
    let r = pixels[i] + boost;
    let g = pixels[i+1] + boost;
    let b = pixels[i+2] + boost;
    setPixelColor(i, r, g, b);
  }
}
