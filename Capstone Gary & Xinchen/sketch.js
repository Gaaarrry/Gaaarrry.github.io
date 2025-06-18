// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let inwater = false// whether hook id in the water or not
let rectWidth = 10;// width of each rectangle in the terrain
let currentScene = 6;// hwo many scenes
let clouds = [];// cloud array
// scene 0: night, 1: morning, 2: noon, 3: afternoon, 4: evening, 5: sunset 6: night again
let particles = [];// particles for the fish explosion effect
let scene = 60; // how many frames for each scene,60 is like change slowly
let backgroundColor = [[0, 0, 40], [60, 100, 150], [135, 206, 250], [255, 165, 0], [255, 100, 50], [20, 20, 30]];// background color for each scene for shifting color

let mountainTargets = [// mountain color targets
  [20, 30, 30],// night
  [60, 90, 80], // morning
  [90, 150, 120], // noon
  [120, 180, 140],    // afternoon  
  [100, 130, 120],  // evening
  [15, 20, 20]  // sunset
];




let waterTargets = [// water color targets
  [0, 20, 40],
  [30, 80, 130],
  [50, 150, 200],
  [70, 180, 255],
  [50, 130, 180],
  [0, 15, 30]
];




let cloudTargets = [// cloud color targets
  [80, 80, 100],
  [180, 180, 220],
  [255, 255, 255],
  [255, 240, 200],
  [220, 200, 200],
  [100, 100, 120]
];

// Initialize current colors
let curBg = backgroundColor[0];
let curMountain = mountainTargets[0];
let curWater = waterTargets[0];
let curCloud = cloudTargets[0];

let colorDelay = 600;// how many frames to change color
let boatCost = 200;// boat upgrade cost
let hookCost = 100;// hook upgrade cost
let lineCost = 150;// line length upgrade cost

// Calculate color shifts for smooth transitions
let redShift = (backgroundColor[1][0] - backgroundColor[0][0]) / colorDelay;
let greenShift = (backgroundColor[1][1] - backgroundColor[0][1]) / colorDelay;
let blueShift = (backgroundColor[1][2] - backgroundColor[0][2]) / colorDelay;

// Mountain color shifts
let redMountainShift = (mountainTargets[1][0] - mountainTargets[0][0]) / colorDelay;
let greenMountainShift = (mountainTargets[1][1] - mountainTargets[0][1]) / colorDelay;
let blueMountainShift = (mountainTargets[1][2] - mountainTargets[0][2]) / colorDelay;


// Water color shifts
let redWaterShift = (waterTargets[1][0] - waterTargets[0][0]) / colorDelay;
let greenWaterShift = (waterTargets[1][1] - waterTargets[0][1]) / colorDelay;
let blueWaterShift = (waterTargets[1][2] - waterTargets[0][2]) / colorDelay;
let redCloudShift = (cloudTargets[1][0] - cloudTargets[0][0]) / colorDelay;
let greenCloudShift = (cloudTargets[1][1] - cloudTargets[0][1]) / colorDelay;
let blueCloudShift = (cloudTargets[1][2] - cloudTargets[0][2]) / colorDelay;

//the variables for the hook,position and other stuff about the hook
let ballx;
let bally;
let fishWirex, fishWirey, fishWirevx, fishWirevy;

let isFired = false;// whether the hook is fired or not
let baseWireLength = 200;
let fishWireLength = baseWireLength;

const gravity = { x: 0, y: 0.1 };// gravity for the hook
let myshop; 
let myBoat;
let vis = 0;
let boatlv = 1;
let fishes = [];
let smallLayer, mediumLayer, bigLayer;
let hookedFishes = [];
let maxhooked = 1;
let money = 0;
let imgBoat, imgHook, imgRuler;





function setup() {
  createCanvas(windowWidth, windowHeight);

  //the clouds will appear randomly in the top of the screen on y-axis
  clouds = [{ x: 100, y: random(height / 10, height / 3 - 40) },
  { x: 500, y: random(height / 10, height / 3 - 40) },
  { x: 830, y: random(height / 10, height / 3 - 40) },
  { x: 1100, y: random(height / 10, height / 3 - 40) }]


  ballx = width / 2;
  bally = height / 2 - 220;

  fishWirex = ballx;
  fishWirey = bally;
  fishWirevx = 0;
  fishWirevy = 0;

  
  myshop = new shop(100, 0);

  myBoat = new boat(ballx, bally, boatlv);


// generate fishes small medium and big
  smallLayer = [height/3, height];
  mediumLayer = [height * 1/2, height];
  bigLayer = [height * 2/3, height];


//
  for (let i = 0; i < 20; i++) {
    let type = int(random(0, 3));
    let x = random(width);
    let y;
    if (type === 0) y = random(smallLayer[0], smallLayer[1]);
    else if (type === 1) y = random(mediumLayer[0], mediumLayer[1]);
    else y = random(bigLayer[0], bigLayer[1]);
    fishes.push(new Fish(type, x, y, int(random(0, 2))));
  }
}



function preload() {
  imgBoat = loadImage("assets/boat.jpg");
  imgHook = loadImage("assets/hook.jpg");
  imgRuler = loadImage("assets/length.jpg");
}



function draw() {
  drawBackground();
  generateTerrain();
  myshop.display();
  if (keyIsDown(65)) {
    ballx -= 3;
    myBoat.move(-3)
  }
  if (keyIsDown(68)) {
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
    let dist = sqrt(dx * dx + dy * dy);


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


    if (fishWirey > height / 3) {//determine whether hook in the water
      inwater = true;
    }
    else {
      inwater = false;
    }
  }
  if (inwater) {
    fishWirevx *= 0.98
    fishWirevy *= 0.98
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


  if (fishWireLength <= 0) {
    isFired = false;
    fishWireLength = baseWireLength;
  }



  //hook fish


  for (let fish of fishes) {
    if (!fish.hooked) {
      let d = dist(fish.x, fish.y, fishWirex, fishWirey);
      if (d < fish.size / 2 + 10) {
        if (hookedFishes.length < maxhooked) {  // hookedFishes是数组，maxhooked是最大挂钩数量
          fish.hooked = true;
          hookedFishes.push(fish);
        }
      }
    }
  }




  for (let fish of hookedFishes) {
    fish.x = fishWirex;
    fish.y = fishWirey;
  }



  for (let i = hookedFishes.length - 1; i >= 0; i--) {
    let fish = hookedFishes[i];
    if (fishWirey < height / 3) {  

      if (fish.type === 0) {
        money += 50;
      } else if (fish.type === 1) {
        money += 150;
      } else if (fish.type === 2) {
        money += 800;
      }


      hookedFishes.splice(i, 1);
      let index = fishes.indexOf(fish);
      if (index !== -1) {
        fishes.splice(index, 1);
      }
      for (let j = 0; j < 100; j++) {
        let angle = random(TWO_PI);
        let speed = random(2, 5);
        particles.push({
          x: fish.x,
          y: fish.y,
          vx: cos(angle) * speed,
          vy: sin(angle) * speed,
          r: random(3, 6),
          life: 100  
        });
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
  for (let p of particles) {
    noStroke();
    fill(100, 180, 255);  
    circle(p.x, p.y, p.r);


    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2;
    p.life--;
  }


  let newParticles = [];
  for (let p of particles) {
    if (p.life > 0) {
      newParticles.push(p);
    }
  }
  particles = newParticles;



  let coinCap = 400 * myBoat.level;  
  if (money > coinCap) {
    money = coinCap;
    alert("Upgrade your boat to save more money!");
  }









}

function mousePressed() {
  if (vis === 1) {
    if (mouseX > myshop.x && mouseX < myshop.x + 160 && mouseY > myshop.y && mouseY < myshop.y + 260) {

      if (mouseY > myshop.y + 20 && mouseY < myshop.y + 70) { 
        if (money >= boatCost) {
          money -= boatCost;
          myBoat.level++;
          boatCost = int(boatCost * 1.5); 
        } else {
          alert("Not enough money for boat upgrade!");
        }

      } else if (mouseY > myshop.y + 100 && mouseY < myshop.y + 150) {
        if (money >= hookCost) {
          money -= hookCost;
          maxhooked++;
          hookCost = int(hookCost * 1.7);  
        } else {
          alert("Not enough money for hook upgrade!");
        }

      } else if (mouseY > myshop.y + 180 && mouseY < myshop.y + 230) { 
        if (money >= lineCost) {
          money -= lineCost;
          baseWireLength += 50;
          fishWireLength = baseWireLength;
          lineCost = int(lineCost * 1.5);  
        } else {
          alert("Not enough money for line length upgrade!");
        }
      }
    }
  }

}

function keyPressed() {

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





  noStroke();
  fill(255, 255, 0);
  circle(width * 0.85, height * 0.1, width * 0.05);





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





  for (let i = 0; i < clouds.length; i++) {
    clouds[i].x += random(0.1, 0.5);

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
    let y = height / 3 + noise(peak) * (height / 50); 
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
      fill(225, 225, 225, 200);
      rect(this.x, this.y, 160, 260, 10);
      image(imgBoat, this.x + 30, this.y + 20, 100, 50);
      image(imgHook, this.x + 30, this.y + 100, 100, 50);
      image(imgRuler, this.x + 30, this.y + 180, 100, 50);
      fill(0);
      textSize(14);
      textAlign(CENTER, CENTER);
      text("Boat ($" + boatCost + ")", this.x + 80, this.y + 10);
      text("Fish On Hook ($" + hookCost + ")", this.x + 80, this.y + 90);
      text("Line Length ($" + lineCost + ")", this.x + 80, this.y + 170);
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
