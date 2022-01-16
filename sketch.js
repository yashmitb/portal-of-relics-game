let map = null;
let noiseScale = 1 / 190;
let ocean = "#008dc4";
let shore = "#00a9cc";
let sand = "#eecda3";
let grass = "#7ec850";
let stone = "#676767";
let snow = "#fffafa";
let k = 0, t = 0, m = 0;

var gameState = 'form';

var form;

var left_key = false;
var up_key = false;
var right_key = false;
var down_key = false;

var boxX = 40;
var boxY = 350;
var boxSpeedX = 0;
var boxSpeedY = 0;

var box;
var bg;
var bo1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  background(0);

  noiseDetail(5, 0.5);

  makeMap();

  drawMap();

  form = new Form();
  form.display();
  fill("gray");
  box = createSprite(windowWidth/2,windowHeight/2,windowWidth/2- 1000,windowWidth/2- 1000);
  bo1 = createSprite(300,300,300,300);
  box.visible = false;
  bg = loadImage('assets/bg.jpg');

}

function draw() {
  if (gameState === 'form') {
    form.display();
  }
  if (gameState === 'play') {
    // console.log("asd");
    
    background(200);
    movebox();
    fill('red');
    box.visible = true;
    box.position.x = boxX;
    box.position.y = boxY;
    camera.position.x = box.position.x;
    camera.position.y = boxY;

  }


  console.log(boxX);

  drawSprites();
}

function movebox() {
  boxX += boxSpeedX;
  boxY += boxSpeedY;
  boxSpeedX *= 0.95;
  boxSpeedY *= 0.95;
  if (left_key) {
    boxSpeedX -= 0.3
  }
  if (right_key) {
    boxSpeedX += 0.3
  }
  if (up_key) {
    boxSpeedY -= 0.3
  }
  if (down_key) {
    boxSpeedY += 0.3
  }

  //EDGES 
  if (boxX > width || boxX < 0) {
    // boxSpeedX *= -1
  }
  if (boxY > height || boxY < 0) {
    // boxSpeedY *= -1
  }
  //TRACK CENTRE
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    left_key = true;
  }
  if (keyCode == UP_ARROW) {
    up_key = true;
  }
  if (keyCode == RIGHT_ARROW) {
    right_key = true;
  }
  if (keyCode == DOWN_ARROW) {
    down_key = true;
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW) {
    left_key = false;
  }
  if (keyCode == UP_ARROW) {
    up_key = false;
  }
  if (keyCode == RIGHT_ARROW) {
    right_key = false;
  }
  if (keyCode == DOWN_ARROW) {
    down_key = false;
  }
}

function makeMap() {
  map = [];
  for (let i = 0; i < width; i++) {
    map[i] = [];
    for (let j = 0; j < height; j++) {
      map[i][j] = pickColor(i, j);
    }
  }
}

function pickColor(i, j) {
  let h = noise((i) * noiseScale,
    (j) * noiseScale);
  let c = "#facade";

  if (h < 0.2) {
    c = ocean;
  }
  else if (h < 0.3) {
    if (random() > pow(h - 0.2, 2) * 100) {
      c = ocean;
    }
    else {
      c = shore;
    }
  }
  else if (h < 0.4) {
    if (random() > pow(h - 0.3, 2) * 100) {
      c = shore;
    }
    else {
      c = sand;
    }
  }
  else if (h < 0.5) {
    if (random() > pow(h - 0.4, 2) * 100) {
      c = sand;
    }
    else {
      c = grass;
    }
  }
  else if (h < 0.6) {
    if (random() > pow(h - 0.5, 2) * 100) {
      c = grass;
    }
    else {
      c = stone;
    }
  }
  else if (h < 0.7) {
    if (random() > pow(h - 0.6, 2) * 100) {
      c = stone;
    }
    else {
      c = snow;
    }
  }
  else {
    c = snow;
  }

  return color(c);
}

function drawMap() {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      set(i, j, map[i][j])
    }
  }
  updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  background(0);

  noiseDetail(5, 0.5);

  makeMap();

  drawMap();
}

// -----------------------------------------------------------------------------------------------------------------------------------------
