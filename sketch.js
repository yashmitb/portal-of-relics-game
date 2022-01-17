let map = null;
let noiseScale = 1 / 190;
let ocean = "#008dc4";
let shore = "#00a9cc";
let sand = "#eecda3";
let grass = "#7ec850";
let stone = "#676767";
let snow = "#fffafa";
let k = 0, t = 0, m = 0;



let tileGrass = "#7ec850";
let tileDarkGrass = "#6dad45";
let tileBrick = "#aa5544";


var gameState = 'form';

var form;

var grassTileCreated = 0;

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
var grassTileGroup, brickTileGroup;
var random123 = 0;

var edge1, edge2, edge3, edge4;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  background(0);

  noiseDetail(5, 0.5);

  makeMap();

  drawMap();

  grassTileGroup = new Group();
  brickTileGroup = new Group();
  form = new Form();
  form.display();
  fill("gray");
  box = createSprite(windowWidth / 2, windowHeight / 2, 50, 50);
  box.depth = 10000000;

  box.visible = false;
  box.shapeColor = color(255, 0, 0);
  bg = loadImage('assets/bg.jpg');

  fill("red");

}

function draw() {
  if (gameState === 'form') {
    form.display();
  }
  if (gameState === 'play') {
    // console.log("asd");

    background(200);
    movebox();
    box.visible = true;
    box.position.x = boxX;
    box.position.y = boxY;
    camera.position.x = box.position.x;
    camera.position.y = boxY;

    if (grassTileCreated === 0) {
      for (var u = 0; u < 40; u++) {
        for (var i = 0; i < 40; i++) {
          createTiles(windowWidth - i * 100, random123);
        }
        random123 = random123 + 100;
      }
      grassTileCreated = 1;


    }

    if (box.collide(brickTileGroup) === true) {
      console.log("asd");
      boxSpeedX = boxSpeedX * -1;
      boxSpeedY = boxSpeedY * -1;
      console.log(boxSpeedX);
      console.log(boxSpeedY);
    }

  }

  // console.log(box.position);


  drawSprites();
}

function createTiles(x, y) {
  bo1 = createSprite(x, y, 100, 100);
  // console.log(Math.random(0, 5));
  //grass most common 0,1,2
  //darkgrass little less common 3,4
  //brick least common 5
  var randomNum = Math.round(random(0, 5));
  if (randomNum === 0 || randomNum === 1 || randomNum === 2) {
    bo1.shapeColor = color(tileGrass);
    bo1.depth = 0;
    grassTileGroup.add(bo1);
  }
  if (randomNum === 3) {
    bo1.shapeColor = color(tileDarkGrass);
    bo1.depth = 0;
    grassTileGroup.add(bo1);
  }
  else{
    bo1.shapeColor = color(tileGrass);
    bo1.depth = 0;
    grassTileGroup.add(bo1);
  }
  if (randomNum === 5) {
    var randomNum = Math.round(random(0, 10));
    if(randomNum === 3){
      bo1.shapeColor = color(tileBrick);
      bo1.depth = 0;
      brickTileGroup.add(bo1);
    }
    else{
      bo1.shapeColor = color(tileGrass);
      bo1.depth = 0;
      grassTileGroup.add(bo1);
    }
  }

}

function createTile(x, y) {
  var randomNum = Math.round(random(0, 1));
  if (randomNum === 1) {
    fill("green");
  }
  if (randomNum === 0) {
    fill("darkgreen");
  }
  rect(x, y, 40, 40);
  // grassTileGroup.add(bo1);
}


function movebox() {
  boxX += boxSpeedX;
  boxY += boxSpeedY;
  boxSpeedX *= 0.95;
  boxSpeedY *= 0.95;

  if (left_key && box.position.x > -1890) {
    boxSpeedX -= 0.3
  }
  if (right_key && box.position.x < 1830) {
    boxSpeedX += 0.3
  }
  if (up_key && box.position.y > 90) {
    boxSpeedY -= 0.3
  }
  if (down_key && box.position.y < 3810) {
    boxSpeedY += 0.3
  }



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

function spritesTouching(x1, y1, img1, x2, y2, img2) {
  if (x1 >= x2 + img2.width || x1 + img1.width <= x2) {
    return false;   // too far to the side
  }
  if (y1 >= y2 + img2.height || y1 + img1.height <= y2) {
    return false; // too far above/below
  }
  return true;                                                    // otherwise, overlap   
}