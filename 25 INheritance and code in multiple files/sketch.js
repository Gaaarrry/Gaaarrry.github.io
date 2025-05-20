// Project Title
// Your Name
// Date


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let  i = 0; i<)
}

function draw() {
  background(220);
}

//parent class ("super"class)
class AnimatedObject{
  conturctor(x,y){
    this.x=x; this.y=y;
    this.size = 1;
  }
  move(){
    this.x += random(-2,2);
    this.y += random(-2,2);

  }

}
