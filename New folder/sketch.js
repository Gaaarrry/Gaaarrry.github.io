// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let boatX;
let hook;
let fishes = [];
let score = 0;
let highScore = 0;
let gameOver = false;
let gameDuration = 30000;
let startTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  boatX = width / 2;
  hook = new Hook(boatX);
  for (let i = 0; i < 8; i++) {
    fishes.push(new Fish());
  }
  if (localStorage.getItem("highScore") !== null) {
    highScore = int(localStorage.getItem("highScore"));
  }
  startTime = millis();
  textSize(24);
}

function draw() {
  background(100, 200, 255);
  drawWater();
  drawBoat();
  hook.update();
  hook.display();

  for (let f of fishes) {
    f.move();
    f.display();
    if (!hook.caught && !f.isHooked && dist(hook.pos.x, hook.pos.y, f.x, f.y) < f.size / 2) {
      hook.caught = true;
      hook.fishAttached = f;
      f.isHooked = true;
      f.hookX = hook.pos.x;
      f.hookY = hook.pos.y;
    }
  }

  drawScore();
  manageTimer();

  if (gameOver) {
    drawGameOver();
  } else {
    handleBoatControl();
  }
}

function drawBoat() {
  fill(139, 69, 19);
  rect(boatX - 40, height * 0.4 - 20, 80, 20, 10);
}

function drawWater() {
  noStroke();
  fill(0, 100, 200, 180);
  beginShape();
  let xoff = 0;
  vertex(0, height);
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, frameCount * 0.01), 0, 1, height * 0.38, height * 0.42);
    vertex(x, y);
    xoff += 0.05;
  }
  vertex(width, height);
  endShape(CLOSE);
}

function drawScore() {
  fill(0);
  textAlign(LEFT);
  text("Score: " + score, 20, 30);
  text("High Score: " + highScore, 20, 60);
}

function drawGameOver() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("🎣 Game Over 🎮", width / 2, height / 2 - 40);
  textSize(28);
  text("Final Score: " + score, width / 2, height / 2);
  text("Press R to Restart", width / 2, height / 2 + 50);
}

function manageTimer() {
  let elapsed = millis() - startTime;
  let remaining = max(0, floor((gameDuration - elapsed) / 1000));
  fill(0);
  textAlign(RIGHT);
  text("Time: " + remaining + "s", width - 20, 30);
  if (elapsed > gameDuration && !gameOver) {
    gameOver = true;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
  }
}

function handleBoatControl() {
  if (keyIsDown(LEFT_ARROW)) {
    boatX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    boatX += 5;
  }
}

function keyPressed() {
  if (key === ' ' && !hook.falling && !hook.caught && !gameOver) {
    hook.drop(boatX);
  }
  if (key === 'r' || key === 'R') {
    restartGame();
  }
}

function restartGame() {
  score = 0;
  startTime = millis();
  hook.reset();
  for (let f of fishes) {
    f.respawn();
  }
  gameOver = false;
}

class Hook {
  constructor(x) {
    this.pos = createVector(x, height * 0.4 - 20);
    this.vel = createVector(0, 0);
    this.falling = false;
    this.caught = false;
    this.fishAttached = null;
  }

  drop(x) {
    this.pos = createVector(x, height * 0.4 - 20);
    this.vel = createVector(0, 5);
    this.falling = true;
    this.caught = false;
    this.fishAttached = null;
  }

  update() {
    if (this.falling) {
      this.vel.add(createVector(0, 0.2));
      if (this.pos.y > height * 0.4) {
        this.vel.mult(0.94);
        this.vel.limit(3);
      }
      this.pos.add(this.vel);
      if (this.pos.y > height * 0.95) {
        this.reset();
      }
    } else if (this.caught) {
      this.pos.y = lerp(this.pos.y, height * 0.4 - 20, 0.05);
      if (abs(this.pos.y - (height * 0.4 - 20)) < 3 && this.fishAttached !== null) {
        this.fishAttached.finishPull();
        this.fishAttached = null;
        this.caught = false;
        this.reset();
        score++;
      }
    }
  }

  display() {
    stroke(0);
    strokeWeight(2);
    line(boatX, height * 0.4 - 20, this.pos.x, this.pos.y);
    fill(this.caught ? 'gold' : 'red');
    ellipse(this.pos.x, this.pos.y, 12);
  }

  reset() {
    this.falling = false;
    this.vel = createVector(0, 0);
    this.pos = createVector(boatX, height * 0.4 - 20);
  }
}

class Fish {
  constructor() {
    this.respawn();
  }

  respawn() {
    this.x = random(width);
    this.y = random(height * 0.5, height - 50);
    this.size = random(30, 60);
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.speed = random(1, 2) * (random() < 0.5 ? -1 : 1);
    this.isHooked = false;
    this.hookX = 0;
    this.hookY = 0;
  }

  move() {
    if (this.isHooked) {
      this.x = lerp(this.x, this.hookX, 0.1);
      this.y = lerp(this.y, this.hookY, 0.1);
    } else {
      this.x += this.speed;
      if (this.x < 0 || this.x > width) {
        this.speed *= -1;
      }
    }
  }

  finishPull() {
    this.isHooked = false;
    this.respawn();
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size / 2);
    let dir = this.speed > 0 ? -1 : 1;
    if (this.isHooked) dir = 1;
    triangle(
      this.x + (this.size / 2) * dir,
      this.y,
      this.x + this.size * dir,
      this.y - 10,
      this.x + this.size * dir,
      this.y + 10
    );
  }
}
