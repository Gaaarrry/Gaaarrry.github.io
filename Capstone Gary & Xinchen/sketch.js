// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let inwater = false
let rectWidth = 10;
let currentScene = 6;
let clouds = [];
let scene = 60;
let backgroundColor = [[0, 0, 40], [60, 100, 150], [135, 206, 250], [255, 165, 0], [255, 100, 50], [20, 20, 30]];
let mountainTargets = [
  [20, 30, 30],    // 深夜：深灰绿
  [60, 90, 80],    // 清晨：暗绿色
  [90, 150, 120],  // 上午：中绿
  [120, 180, 140], // 中午：亮绿
  [100, 130, 120], // 傍晚：暗一点
  [15, 20, 20]     // 午夜：极暗
];




let waterTargets = [
  [0, 20, 40],     // 深夜：蓝黑
  [30, 80, 130],   // 清晨：冷蓝
  [50, 150, 200],  // 上午：清澈蓝
  [70, 180, 255],  // 中午：亮蓝
  [50, 130, 180],  // 傍晚：带一点橘光
  [0, 15, 30]      // 午夜：深蓝
];




let cloudTargets = [
  [80, 80, 100],   // 深夜：暗灰蓝
  [180, 180, 220], // 清晨：淡灰白
  [255, 255, 255], // 上午：纯白
  [255, 240, 200], // 中午：日光偏橘
  [220, 200, 200], // 傍晚：微红云
  [100, 100, 120]  // 午夜：低亮灰
];


let curBg = backgroundColor[0];
let curMountain = mountainTargets[0];
let curWater = waterTargets[0];
let curCloud = cloudTargets[0];
let colorDelay = 600;
let redShift = (backgroundColor[1][0] - backgroundColor[0][0]) / colorDelay;
let greenShift = (backgroundColor[1][1] - backgroundColor[0][1]) / colorDelay;
let blueShift = (backgroundColor[1][2] - backgroundColor[0][2]) / colorDelay;
let redMountainShift = (mountainTargets[1][0] - mountainTargets[0][0]) / colorDelay;
let greenMountainShift = (mountainTargets[1][1] - mountainTargets[0][1]) / colorDelay;
let blueMountainShift = (mountainTargets[1][2] - mountainTargets[0][2]) / colorDelay;
let redWaterShift = (waterTargets[1][0] - waterTargets[0][0]) / colorDelay;
let greenWaterShift = (waterTargets[1][1] - waterTargets[0][1]) / colorDelay;
let blueWaterShift = (waterTargets[1][2] - waterTargets[0][2]) / colorDelay;
let redCloudShift = (cloudTargets[1][0] - cloudTargets[0][0]) / colorDelay;
let greenCloudShift = (cloudTargets[1][1] - cloudTargets[0][1]) / colorDelay;
let blueCloudShift = (cloudTargets[1][2] - cloudTargets[0][2]) / colorDelay;


let ballx;
let bally;
let fishWirex,fishWirey,fishWirevx,fishWirevy;
let isFired = false;
let fishWireLength = 300;
const gravity = {x: 0, y: 0.1};
let myshop;
let myBoat;
let vis = 0;
let boatlv =5 ;//boat upgrade
//make group of fish
let fishes = [];
let smallLayer, mediumLayer, bigLayer;


//hook the fish
let hookedFishes = [];  // stored the fishes that been hooked.
let maxhooked = 3;


//money system
let money = 0;






function setup() {
  createCanvas(windowWidth, windowHeight);
  clouds = [{ x: 100, y: random(height / 10, height / 3 - 40) },
  { x: 500, y: random(height / 10, height / 3 - 40) },
  { x: 830, y: random(height / 10, height / 3 - 40) },
  { x: 1100, y: random(height / 10, height / 3 - 40) }]
 
 
  ballx = width/2;
  bally = height/2-220;
 
  fishWirex = ballx;
  fishWirey = bally;
  fishWirevx = 0;
  fishWirevy =0;
  myshop = new shop(100, 0);
 
  myBoat = new boat(ballx, bally,boatlv);


  //draw fish
  //area of water
  smallLayer = [height * 0.4, height * 0.5];
  mediumLayer = [height * 0.6, height * 0.7];
  bigLayer = [height * 0.8, height * 0.9];


 
  for (let i = 0; i < 15; i++) {
    let type = int(random(0, 3)); // 0 = small, 1 = medium, 2 = big
    let x = random(width);
    let y;
    if (type === 0) y = random(smallLayer[0], smallLayer[1]);
    else if (type === 1) y = random(mediumLayer[0], mediumLayer[1]);
    else y = random(bigLayer[0], bigLayer[1]);


    fishes.push(new Fish(type, x, y, int(random(0,2)))); // 1 = facing right
  }
}




function draw() {
  drawBackground();
  generateTerrain();


  //gravity and shop
  myshop.display();




  if (keyIsDown(65)){
    ballx -= 3;
    myBoat.move(-3)


  }
  if (keyIsDown(68)){
    myBoat.move(3);
    ballx += 3;


  }




  myBoat.display();


  if (isFired) {
    fishWirevx += gravity.x;
    fishWirevy += gravity.y;
    fishWirex += fishWirevx;
    fishWirey += fishWirevy;




    let dx = fishWirex - ballx;
    let dy = fishWirey - bally;
    let dist = sqrt(dx*dx + dy*dy);




    if (dist > fishWireLength) {
      let angle = atan2(dy, dx);
      fishWirex = ballx + cos(angle) * fishWireLength;
      fishWirey = bally + sin(angle) * fishWireLength;




      let velAlongLine = fishWirevx * cos(angle) + fishWirevy * sin(angle);
      fishWirevx -= velAlongLine * cos(angle);
      fishWirevy -= velAlongLine * sin(angle);
    }




    stroke(0);
    strokeWeight(2);
    line(ballx, bally, fishWirex, fishWirey);




    fill(255, 100, 100);
    noStroke();
    circle(fishWirex, fishWirey, 20);


    if (fishWirey > height/3){//determine whether hook in the water
      inwater = true;
    }
    else{
      inwater = false;
    }
  }
  if(inwater){
    fishWirevx *=0.98
    fishWirevy *=0.98
    fishWirevy -= 0.02;


  }


 


  //draw fish


  for (let fish of fishes) {
    fish.display();
    fish.move();
  }


  //control fish wire
  if (keyIsDown(82)) {
    if (fishWireLength > 0) {
      fishWireLength--;    
    }
  }


  if (fishWireLength === 0){
    isFired = false;
    fishWireLength = 300;
  }


  //hook fish


  for(let fish of fishes){
  if(!fish.hooked){
    let d = dist(fish.x, fish.y, fishWirex, fishWirey);
    if (d < fish.size / 2 + 10){
      if(hookedFishes.length < maxhooked){  // hookedFishes是数组，maxhooked是最大挂钩数量
        fish.hooked = true;
        hookedFishes.push(fish);
      }
    }
  }
}




  for(let fish of hookedFishes){
    fish.x = fishWirex;
    fish.y =fishWirey;
  }


  // 检查钓到的鱼是否被拉出水面，并奖励金币
for (let i = hookedFishes.length - 1; i >= 0; i--) {
  let fish = hookedFishes[i];
  if (fishWirey < height / 3) {  // 鱼被拉回到水面以上
    // 奖励金币
    if (fish.type === 0) {
      money += 50;
    } else if (fish.type === 1) {
      money += 150;
    } else if (fish.type === 2) {
      money += 800;
    }


    // 删除该鱼
    hookedFishes.splice(i, 1);
    let index = fishes.indexOf(fish);
    if (index !== -1) {
      fishes.splice(index,1);
    }
    
    fish.hooked = false;
    fish.x = random(width);

    if (fish.type === 0) {
      fish.y = random(smallLayer[0], smallLayer[1]);
    } else if (fish.type === 1) {
      fish.y = random(mediumLayer[0], mediumLayer[1]);
    } else {
      fish.y = random(bigLayer[0], bigLayer[1]);
    }

    fishes.push(fish);
  }
}


fill(255);
textSize(24);
textAlign(LEFT, TOP);
text("💰Money: $" + money, 10, 10);




 
 


 


 
}


function keyPressed(){
  //hook and shop display
  if (key === ' ') {
    if (!isFired) {
      isFired = true;
      let dirX = mouseX - ballx;
      let dirY = mouseY - bally;
      let mag = sqrt(dirX * dirX + dirY * dirY);
      if (mag != 0) {
        dirX /= mag;
        dirY /= mag;
      }
      fishWirex = ballx + dirX * fishWireLength;
      fishWirey = bally + dirY * fishWireLength;
      fishWirevx = dirX * 10;
      fishWirevy = dirY * 10;
    }
  }
  if (key === 'p') {
    vis = vis === 0 ? 1 : 0;
  }


 
}
function drawBackground() {
  // currentScene = floor(frameCount / scene) % 6;


  // if (currentScene === 0) {
  //   background(0, 0, 40);
  // }
  // else if (currentScene === 1) {
  //   background(60, 100, 150);
  // }
  // else if (currentScene === 2) {
  //   background(135, 206, 250);
  // }
  // else if (currentScene === 3) {
  //   background(255, 165, 0);
  // }
  // else if (currentScene === 4) {
  //   background(255, 100, 50);
  // }
  // else if (currentScene === 5) {
  //   background(20, 20, 30);
  // }
  if (frameCount % colorDelay === 0) {
    currentScene++;
    if (currentScene > 5) {
      currentScene = 0;
    }
    redShift = (backgroundColor[currentScene][0] - curBg[0]) / colorDelay;
    greenShift = (backgroundColor[currentScene][1] - curBg[1]) / colorDelay;
    blueShift = (backgroundColor[currentScene][2] - curBg[2]) / colorDelay;
    redMountainShift = (mountainTargets[currentScene][0] - curMountain[0]) / colorDelay;
    greenMountainShift = (mountainTargets[currentScene][1] - curMountain[1]) / colorDelay;
    blueMountainShift = (mountainTargets[currentScene][2] - curMountain[2]) / colorDelay;
    redWaterShift = (waterTargets[currentScene][0] - curWater[0]) / colorDelay;
    greenWaterShift = (waterTargets[currentScene][1] - curWater[1]) / colorDelay;
    blueWaterShift = (waterTargets[currentScene][2] - curWater[2]) / colorDelay;
    redCloudShift = (cloudTargets[currentScene][0] - curCloud[0]) / colorDelay;
    greenCloudShift = (cloudTargets[currentScene][1] - curCloud[1]) / colorDelay;
    blueCloudShift = (cloudTargets[currentScene][2] - curCloud[2]) / colorDelay;


  }
  curBg[0] += redShift;
  curBg[1] += greenShift;
  curBg[2] += blueShift;


  curWater[0] += redWaterShift;
  curWater[1] += greenWaterShift;
  curWater[2] += blueWaterShift;


  curCloud[0] += redCloudShift;
  curCloud[1] += greenCloudShift;
  curCloud[2] += blueCloudShift;
  background(curBg[0], curBg[1], curBg[2]);




  // sun (responsive)
  noStroke();
  fill(255, 255, 0);
  circle(width * 0.85, height * 0.1, width * 0.05);




  // mountains (3–5, responsive and evenly spaced)
  curMountain[0] += redMountainShift;
  curMountain[1] += greenMountainShift;
  curMountain[2] += blueMountainShift;
  fill(curMountain[0], curMountain[1], curMountain[2]);


  triangle(width * 0.15, height * 0.05, width * 0.05, height * 0.55, width * 0.25, height * 0.55);
  triangle(width * 0.35, height * 0.15, width * 0.25, height * 0.55, width * 0.45, height * 0.55);
  triangle(width * 0.55, height * 0.25, width * 0.45, height * 0.55, width * 0.65, height * 0.55);
  triangle(width * 0.75, height * 0.15, width * 0.65, height * 0.55, width * 0.85, height * 0.55);
  triangle(width * 0.95, height * 0.25, width * 0.85, height * 0.55, width * 1.05, height * 0.55);


  noStroke();
  fill(curWater[0], curWater[1], curWater[2]);
  rect(0, height / 3, width, height - height / 3);


  // clouds (fixed position, tight clusters)


  for (let i = 0; i < clouds.length; i++) {
    clouds[i].x += random(0.1,0.5);
   
    cloud(clouds[i].x, clouds[i].y);
    if (clouds[i].x > width + 60) {
      clouds[i].x = -60;
      clouds[i].y = random(0, height / 6 - 40);
    }


  }


}


function cloud(x, y) {
  fill(curCloud[0], curCloud[1], curCloud[2]);
  circle(x, y, 40);
  circle(x + 25, y - 5, 42);
  circle(x + 50, y, 40);
  circle(x + 20, y + 10, 35);
  circle(x + 30, y - 15, 35);
}


function generateTerrain() {
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


class shop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.s = 100;
  }
  display() {
    if (vis === 1) {
     
      fill(225,225,225,70)
      square(this.x, this.y, this.s);


    }
  }
}


class boat {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.level = level;
    this.facing = 1; // 1=right -1 =left
  }


  display() {
    push();
    translate(this.x, this.y);


    // magnification
    let scaleFactor = 1 + 0.1 * (this.level - 1);
    scale(scaleFactor);


    noStroke();


    // bot of boat
    fill(140, 70, 20);
    triangle(-60, 20, 60, 20, 0, 60);


    // body
    fill(160, 80, 45);
    rect(-60, 0, 120, 30, 5);


    // top
    fill(205, 133, 63);
    rect(-30, -20, 60, 20, 5);


    // mast count
    let mastCount = this.level
    let spacing = 30;


    stroke(80);
    strokeWeight(3);


    for (let i = 0; i < mastCount; i++) {
      let mastX = -spacing * (mastCount - 1) / 2 + i * spacing;
      let mastTopY = -60;


      // mast
      line(mastX, 0, mastX, mastTopY);


      //
      noStroke();
      fill(255);


      if (this.facing === 1) {
        // facing right
        triangle(
          mastX, mastTopY,    // top of mast      
          mastX - 20, mastTopY + 40, // left bot
          mastX, mastTopY + 40    // right bot  
        );
      } else {
        // inverted
        triangle(
          mastX, mastTopY,            
          mastX + 20, mastTopY + 40,  
          mastX, mastTopY + 40        
        );
      }
    }


    pop();
  }


  move(dx) {
    this.x += dx;
    // change facing
    if (dx > 0) {
      this.facing = 1;
    } else if (dx < 0) {
      this.facing = -1;
    }
  }
}


//draw fish
class Fish {
  constructor(type, x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.type = type;
    this.hooked = false; // whether been hooked


    if (type === 0) {
      this.size = 20;
      this.speed = 2;
      this.color = color(255, 200, 200); // small
    } else if (type === 1) {
      this.size = 35;
      this.speed = 1.5;
      this.color = color(200, 255, 200); // mid
    } else {
      this.size = 50;
      this.speed = 1;
      this.color = color(200, 200, 255); // big
    }
  }


  display() {
    push();
    translate(this.x, this.y);


    if (this.direction != 1) {
      scale(-1, 1);
    }


    noStroke();
    fill(this.color);
    ellipse(0, 0, this.size * 1.5, this.size);
    triangle(-this.size * 0.75, 0, -this.size, -this.size / 3, -this.size, this.size / 3);


    pop();
  }


  move() {
    if (!this.hooked) { // cant move if been hooked
      if (this.direction === 1) {
        this.x += this.speed;
        if (this.x > width) this.x = 0;
      } else {
        this.x -= this.speed;
        if (this.x < 0) this.x = width;
      }
    }
   
   
  }




 
}
