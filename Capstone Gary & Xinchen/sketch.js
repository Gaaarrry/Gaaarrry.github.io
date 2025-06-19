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
let gamestate = 0;
let isFired = false;// whether the hook is fired or not
let baseWireLength = 250;
let fishWireLength = baseWireLength;
let flashAlpha = 0;
let starting = false;

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
let startFrame = 0;
let endFrame = 0;
let gameFinished = false;
let coinParticles = [];
let showVictory = false;






function setup() {
  createCanvas(windowWidth, windowHeight);
  gamebodysetup();


}


// Preload images for the shop
function preload() {
  imgBoat = loadImage("assets/boat.jpg");
  imgHook = loadImage("assets/hook.jpg");
  imgRuler = loadImage("assets/length.jpg");

}

function gamebodysetup() {
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
  smallLayer = [(height / 3) + 20, height * 4 / 7];
  mediumLayer = [height * 1 / 2, height];
  bigLayer = [height * 2 / 3, height];


  //20 fishes will be in the water
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

function draw() {
  if (gamestate === 0) {
    drawcover();
  } else {
    gamebodydraw();
  }

}

function gamebodydraw() {
  drawBackground();
  generateTerrain();
  myshop.display();
  if (keyIsDown(65)) {// A key for left
    ballx -= 3;
    myBoat.move(-3)
  }
  if (keyIsDown(68)) {// D key for right
    myBoat.move(3);
    ballx += 3;
  }
  myBoat.display();


  // draw hook
    if (isFired) {
    // simulate hook drop by gravity
    fishWirevx += gravity.x;//apply gravity to the hook’s velocity
    fishWirevy += gravity.y;//
    fishWirex += fishWirevx;//update position by add velocity
    fishWirey += fishWirevy;//




    let dx = fishWirex - ballx; //distance hook to boat(ballx = boat’x)
    let dy = fishWirey - bally; //distance hook to boat(bally = boat’y)
    let dist = sqrt(dx * dx + dy * dy);//calculate fish wire’s distance(pythagorean theorem)a2+b2 =c2


    // If the hook is too far from the ball, it will be pulled back
    if (dist > fishWireLength) {
      let angle = atan2(dy, dx);//arctangent calculate the angle from the boat to the hook(radians not angle)
	//boat is the circle center, fishwirelength is the radius of this circle. Use trigonometry to calculate the position of the hook.
      fishWirex = ballx + cos(angle) * fishWireLength;
      fishWirey = bally + sin(angle) * fishWireLength;


      // Calculate the velocity along the line and adjust the velocity
      let velAlongLine = fishWirevx * cos(angle) + fishWirevy * sin(angle);


	// Subtract the velocity along the wire direction to simulate tension
      fishWirevx -= velAlongLine * cos(angle);
      fishWirevy -= velAlongLine * sin(angle);
    }



    stroke(0);
    strokeWeight(2);
    line(ballx, bally, fishWirex, fishWirey);
    fill(255, 100, 100);
    noStroke();
    circle(fishWirex, fishWirey, 20);

    // Check if the hook is in the water and it will slow down because of the water resistance!!!
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


  for (let fish of fishes) {// check if the fish is hooked
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


  // draw hooked fishes, and check if they are close to the boat
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

      //right here is when the fish is caught, the fish will be removed from the hookedFishes array and the fishes array
      hookedFishes.splice(i, 1);
      let index = fishes.indexOf(fish);
      if (index !== -1) {
        fishes.splice(index, 1);
      }
      if (fishes.length === 0 && !gameFinished) {
        gameFinished = true;
        endFrame = frameCount;

        for (let i = 0; i < 200; i++) {
          let angle = random(TWO_PI);
          let speed = random(2, 6);
          coinParticles.push({
            x: width / 2,
            y: height / 2,
            vx: cos(angle) * speed,
            vy: sin(angle) * speed,
            r: random(5, 8),
            life: 100,
            color: color(255, 215, 0)
          });
        }
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

    }
  }


  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("💰Money: $" + money, 10, 10);

  //use for loops to draw the particles and update their position
  for (let p of particles) {
    noStroke();
    fill(100, 180, 255);
    circle(p.x, p.y, p.r);
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2;
    p.life--;
  }


  let newParticles = [];//create a new array to store particles that are still alive

  // filter out particles that are still alive
  for (let p of particles) {
    if (p.life > 0) {
      newParticles.push(p);
    }
  }
  particles = newParticles;//so that the particles array only contains alive particles
  for (let p of coinParticles) {
    fill(p.color);
    noStroke();
    circle(p.x, p.y, p.r);
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1;
    p.life--;
  }
  coinParticles = coinParticles.filter(p => p.life > 0);



  let coinCap = 400 * myBoat.level;
  if (money > coinCap) {
    money = coinCap;
    alert("Upgrade your boat to save more money!");
  }
  if (starting) {
    noStroke();
    fill(255, flashAlpha);
    rect(0, 0, width, height);
    flashAlpha -= 5;
    if (flashAlpha <= 0) {
      starting = false;
    }

  }
  if (fishes.length === 0 && gameFinished === false) {
    endFrame = frameCount;
    gameFinished = true;
  }
  if (gameFinished === true) {
    let timeUsed = (endFrame - startFrame) / 60;
    timeUsed = int(timeUsed * 10) / 10;  // 保留一位小数
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You caught all the fish!", width / 2, height * 0.4);
    text("Time used: " + timeUsed + " seconds! Press i to restart", width / 2, height * 0.45);
  }


}

function mousePressed() {
  if (vis === 1) {
    if (mouseX > myshop.x && mouseX < myshop.x + 160 && mouseY > myshop.y && mouseY < myshop.y + 260) {

      if (mouseY > myshop.y + 20 && mouseY < myshop.y + 70) { //for boat upgrade
        if (money >= boatCost) {// check if enough money for boat upgrade
          money -= boatCost;// deduct money
          myBoat.level++;// increase boat level
          boatCost = int(boatCost * 1.5);//the boat's cost will increase by 50% each time 
        } else {
          alert("Not enough money for boat upgrade!");// alert block if not enough money
        }

      } else if (mouseY > myshop.y + 100 && mouseY < myshop.y + 150) {// for hook upgrade
        if (money >= hookCost) {
          money -= hookCost;
          maxhooked++;
          hookCost = int(hookCost * 1.7);
        } else {
          alert("Not enough money for hook upgrade!");
        }

      } else if (mouseY > myshop.y + 180 && mouseY < myshop.y + 230) { // for line length upgrade
        if (money >= lineCost) {
          money -= lineCost;
          baseWireLength += 85;
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
  if (gamestate === 0) {
    gamestate = 1;
    starting = true;
    flashAlpha = 255;
    startFrame = frameCount;
    gameFinished = false;
  }


  if (key === ' ') {// space key to fire the hook
    if (!isFired) {
      isFired = true;


	// Calculate the horizontal and vertical distances from the boat to the mouse position (direction vector)
      let dirX = mouseX - ballx;
      let dirY = mouseY - bally;
	// Calculate the magnitude (length) of the direction vector
      let mag = sqrt(dirX * dirX + dirY * dirY);
	//normalize(set length to 1 only keep vector)
	//for example v(3,4) its length should be 3^2+4^2 =5 but we cannot use 5 to time 300(fishwirelength) to get the real value we want therefore we normalize it. v(⅗,⅘)=v(0.6,0.8) now the length is 1.
      if (mag != 0) {
        dirX /= mag;
        dirY /= mag;
      }
	// Set the initial position of the hook at a distance fishWireLength away from the boat along the direction
      fishWirex = ballx + dirX * fishWireLength;
      fishWirey = bally + dirY * fishWireLength;
	
	// Set the initial velocity of the hook along the direction vector with a speed of 10
      fishWirevx = dirX * 10;
      fishWirevy = dirY * 10;
    }
  }

  if (key === 'p') {
    vis = vis === 0 ? 1 : 0; // 0 ? 1 : 0 means toggle visibility
  }

  if (key === 'i' && gameFinished) {

    fishes = [];
    hookedFishes = [];
    coinParticles = [];
    particles = [];
    money = 0;
    boatlv = 1;
    maxhooked = 1;
    baseWireLength = 250;
    fishWireLength = baseWireLength;
    boatCost = 200;
    hookCost = 100;
    lineCost = 150;
    gameFinished = false;
    startFrame = frameCount;
    myBoat = new boat(ballx, bally, boatlv);
    gamebodysetup(); 
  }


}
function drawBackground() {

  if (frameCount % colorDelay === 0) {
    currentScene++;
    if (currentScene > 5) {
      currentScene = 0;
    }
    // Update color shifts for the next scene of the vackground
    redShift = (backgroundColor[currentScene][0] - curBg[0]) / colorDelay;
    greenShift = (backgroundColor[currentScene][1] - curBg[1]) / colorDelay;
    blueShift = (backgroundColor[currentScene][2] - curBg[2]) / colorDelay;

    // Update color shifts for the mountains
    redMountainShift = (mountainTargets[currentScene][0] - curMountain[0]) / colorDelay;
    greenMountainShift = (mountainTargets[currentScene][1] - curMountain[1]) / colorDelay;
    blueMountainShift = (mountainTargets[currentScene][2] - curMountain[2]) / colorDelay;


    // Update color shifts for the water and clouds
    redWaterShift = (waterTargets[currentScene][0] - curWater[0]) / colorDelay;
    greenWaterShift = (waterTargets[currentScene][1] - curWater[1]) / colorDelay;
    blueWaterShift = (waterTargets[currentScene][2] - curWater[2]) / colorDelay;

    redCloudShift = (cloudTargets[currentScene][0] - curCloud[0]) / colorDelay;
    greenCloudShift = (cloudTargets[currentScene][1] - curCloud[1]) / colorDelay;
    blueCloudShift = (cloudTargets[currentScene][2] - curCloud[2]) / colorDelay;


  }

  //when in current background array is [0],then it will + redShift same as greenShift and blueShift
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



  // Draw mountains, use * and / so that it can fit any screen size
  triangle(width * 0.15, height * 0.05, width * 0.05, height * 0.55, width * 0.25, height * 0.55);
  triangle(width * 0.35, height * 0.15, width * 0.25, height * 0.55, width * 0.45, height * 0.55);
  triangle(width * 0.55, height * 0.25, width * 0.45, height * 0.55, width * 0.65, height * 0.55);
  triangle(width * 0.75, height * 0.15, width * 0.65, height * 0.55, width * 0.85, height * 0.55);
  triangle(width * 0.95, height * 0.25, width * 0.85, height * 0.55, width * 1.05, height * 0.55);


  noStroke();
  fill(curWater[0], curWater[1], curWater[2]);
  rect(0, height / 3, width, height - height / 3);




  //draw clound randomly in the top of the screen
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].x += random(0.1, 0.5);

    cloud(clouds[i].x, clouds[i].y);
    if (clouds[i].x > width + 60) {
      clouds[i].x = -60;
      clouds[i].y = random(0, height / 6 - 40);
    }


  }


}


function cloud(x, y) {// draw cloud iuse circles
  fill(curCloud[0], curCloud[1], curCloud[2]);
  circle(x, y, 40);
  circle(x + 25, y - 5, 42);
  circle(x + 50, y, 40);
  circle(x + 20, y + 10, 35);
  circle(x + 30, y - 15, 35);
}


function generateTerrain() {//same as the terrain but change the color and the height of the terrain,make it like a wave
  let peak = frameCount * 0.01;
  let peakY = height;
  let peakX;
  let allHeight = 0;
  let allRect = 0;
  for (let x = 0; x <= width; x += rectWidth) {// draw rectangles to make the terrain
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


class shop {// shop class for the shop
  // constructor for the shop
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.s = 100;
  }
  display() {//this can display the shop
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
  //1. constructor(x, y, level) {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.level = level;
    this.facing = 1; // 1=right -1 =left
  }


  display() {// display the boat
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


  move(dx) {// move the boat
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

    // flip fish based on direction
    if (this.direction != 1) {
      scale(-1, 1);
    }


    noStroke();
    fill(this.color);
    ellipse(0, 0, this.size * 1.5, this.size);
    triangle(-this.size * 0.75, 0, -this.size, -this.size / 3, -this.size, this.size / 3);


    pop();
  }


  move() {// move the fish
    if (!this.hooked) { // cant move if been hooked
      if (this.direction === 1) {// move right
        this.x += this.speed;
        if (this.x > width) this.x = 0;
      } else {// move left
        this.x -= this.speed;
        if (this.x < 0) this.x = width;
      }
    }
  }
}


function drawcover() {
  drawBackground();

  //use mouseX and mouseY to change the color of the text
  //based on 05 class work on Github
  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseX, 0, width, 255, 0);
  let b = map(mouseY, 0, height, 100, 255);
  fill(r, g, b);

  textAlign(CENTER, CENTER);
  textSize(200);
  textFont("Comic Sans MS");
  text("Fishing Life", width / 2, height * 0.4);

  textSize(64);
  text("Press any key to start", width / 2, height * 0.6);
}