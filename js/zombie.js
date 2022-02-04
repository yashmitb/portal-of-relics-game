class Zombie {

  constructor(speed) {
    this.speed = speed;
    let y;
    if (random(1) < 0.5) {
      // from the top
      y = random(-300, 0);
    } else {
      // from the bottom
      y = random(height, height + 300);
    }

    let x = random(-300, width + 300);
    this.pos = createVector(x, y);
    this.zom;
  }


  createZom() {
    this.zom = createSprite(this.pos.x, this.pos.y, 40, 40);
    this.zom.shapeColor = '#1e522c';
    this.zom.dept = 234890230;
    this.zom.rotation = this.angle;
    this.zom.lifeTime = 1;
    // console.log("created zpmbie");
  }
  draw() {
    push();
    let angle = atan2(box.position.y - this.pos.y, box.position.x - this.pos.x);
    this.zom.position.x = this.pos.x;
    this.zom.position.y = this.pos.y;
    this.zom.rotation = angle;
    pop();
  }


  update() {
    let difference = p5.Vector.sub(box.position, this.pos);
    difference.limit(this.speed);
    this.pos.add(difference);
  }

  ateYou() {
    return dist(this.pos.x, this.pos.y, box.position.x, box.position.y) < 20;
  }
}