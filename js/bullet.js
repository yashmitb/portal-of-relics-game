class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 16;
    this.bull;
  }
  createbull() {
    this.bull = createSprite(this.x, this.y, 15, 15);
    this.bull.shapeColor = "yellow";
    this.bull.dept = 234890230;
    this.bull.rotation = this.angle;
    // this.bull.addImage("img", bulletIMG);
    // this.bull.scale = 0.1;
    // console.log("created bullet");
  }

  draw() {
    push();

    this.bull.position.x = this.x;
    this.bull.position.y = this.y;
    pop();
  }

  update() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }
  removeDisplay() {
    this.bull.addImage("blank", zombieDead);
    this.bull.changeImage("blank");
  }
}
