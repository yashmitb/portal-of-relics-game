let map = null;
let noiseScale = 1 / 190;
let ocean = "#008dc4";
let shore = "#00a9cc";
let sand = "#eecda3";
let grass = "#7ec850";
let stone = "#676767";
let snow = "#fffafa";
let k = 0, t = 0, m = 0;

let timer = 0;


let tileGrass = "#7ec850";
let tileDarkGrass = "#6dad45";
let tileBrick = "#aa5544";

let tileGrassImg;
let tileGrassImg2;
let tileBrickText;

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

var lifeRect1, lifeRect2;
var currentLife = 185;
var currentStamina = 185;
var armourType;

var staminaRect2, staminaRect1;

var coinsNum = 60, coinGroup, coin;
var keysNum = 5, keysGroup, keys;




function preload() {
  tileGrassImg = loadImage('assets/grassTileTexture.jpg');
  tileGrassImg2 = loadImage('assets/sGrassTile.png');
  tileBrickText = loadImage('assets/brickTexture.png');
  lifeImage = loadImage("./assets/life.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  background(0);

  noiseDetail(5, 0.5);

  makeMap();

  drawMap();

  grassTileGroup = new Group();
  brickTileGroup = new Group();
  coinGroup = new Group();
  form = new Form();
  form.display();
  fill("gray");
  box = createSprite(windowWidth / 2, windowHeight / 2, 50, 50);
  box.depth = 10000000;

  box.visible = false;
  box.shapeColor = color(255, 0, 0);
  bg = loadImage('assets/bg.jpg');

  fill("red");
  armourType = createSprite(box.position.x + 1900, box.position.y + 400, 50, 50);
  lifeRect1 = createSprite(width / 2 - 100, height - box.positionY - 400, 185, 20);
  lifeRect2 = createSprite(width / 2 - 100, height - box.positionY - 400, 185, 20);
  staminaRect1 = createSprite(width / 2 - 100, height - box.positionY - 400, 185, 20);
  staminaRect2 = createSprite(width / 2 - 100, height - box.positionY - 400, 185, 20);

}

function draw() {
  if (gameState === 'form') {
    form.display();
  }

  if (millis() >= 800 + timer && currentStamina <= 185) {
    currentStamina += 3;
    timer = millis();
  }

  if (currentStamina >= 140 && currentLife <= 185) {
    currentLife += 0.1;
  }

  if (currentStamina <= 0) {
    currentLife -= 0.1;
  }

  if (gameState === 'play') {
    // console.log("asd");
    showLife();
    showStamina();
    background(200);
    movebox();
    box.visible = true;
    box.position.x = boxX;
    box.position.y = boxY;
    camera.position.x = box.position.x;
    camera.position.y = boxY;

    MapCreater();
    if (box.collide(brickTileGroup) === true) {
      // console.log("asd");
      boxSpeedX = boxSpeedX * -1;
      boxSpeedY = boxSpeedY * -1;
      console.log(boxSpeedX);
      console.log(boxSpeedY);
      currentLife -= 10;
    }
    MapCreater();


  }
  // form.showText();
  createArmour();


  drawSprites();

  // console.log(coinGroup.leght);

  box.collide(coinGroup, removeBlocks);


  form.showText();
  if(gameState === 'play'){
    allText();
  }
}

function removeBlocks(sprite, coin) {
  coin.remove();
  coinsNum += 2;
  // console.log(coinsNum);
}

function allText() {
  textSize(20);
  text('Coins: '+coinsNum,box.position.x - 850, box.position.y - 100);
}


function MapCreater() {
  if (grassTileCreated === 0) {
    for (var u = 0; u < 40; u++) {
      for (var i = 0; i < 40; i++) {
        createTiles(windowWidth - i * 100, random123);
      }
      random123 = random123 + 100;
    }
    grassTileCreated = 1;

  }





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
    bo1.depth = -1;
    // bo1.addImage('grass', tileGrassImg);
    grassTileGroup.add(bo1);

    var randomNum1 = Math.round(random(0, 30));
    if (randomNum1 === 10) {
      coin = createSprite(x, y, 20, 20);
      coin.rotation = Math.round(random(0, 90));
      coin.shapeColor = "yellow";
      coinGroup.add(coin);
    }



  }
  if (randomNum === 3) {
    bo1.shapeColor = color(tileDarkGrass);
    bo1.depth = -1;
    // bo1.addImage('grass', tileGrassImg2);
    grassTileGroup.add(bo1);
  }
  else {
    bo1.shapeColor = color(tileGrass);
    bo1.depth = -1;
    // bo1.addImage('grass', tileGrassImg);
    grassTileGroup.add(bo1);
  }
  if (randomNum === 5) {
    var randomNum = Math.round(random(0, 10));
    if (randomNum === 3) {
      bo1.shapeColor = color(tileBrick);
      // bo1.addImage('grass', tileBrickText);
      bo1.depth = 0;
      brickTileGroup.add(bo1);
    }
    else {
      bo1.shapeColor = color(tileGrass);
      bo1.depth = -1;
      // bo1.addImage('grass', tileGrassImg);
      grassTileGroup.add(bo1);
    }
  }

}


function createArmour() {
  armourType.position.x = box.position.x + 900;
  armourType.position.y = box.position.y - 100;
  armourType.dept = 400;
  armourType.shapeColor = "gray";
}

function showLife() {
  // console.log("worked");
  push();
  image(lifeImage, width / 2 - 130, height - box.positionY - 400, 20, 20);
  lifeRect1.position.x = box.position.x;
  lifeRect1.position.y = box.position.y - 80;
  lifeRect1.shapeColor = "white";
  lifeRect1.dept = 59;
  fill("#f50057");
  // lifeRect2 = createSprite( width / 2 - 100, height - box.positionY - 400, 185, 20);//chnage positions
  lifeRect2.position.x = box.position.x;
  lifeRect2.position.y = box.position.y - 80;
  // console.log();
  if (currentLife >= 185) {
    lifeRect2.width = 185;
  }
  else if (currentLife <= 0) {
    currentLife = 0;
  }
  else {
    lifeRect2.width = currentLife;
  }
  lifeRect2.shapeColor = "red";
  lifeRect2.dept = 60;
  noStroke();
  pop();
}

function showStamina() {
  // console.log("worked");
  push();
  image(lifeImage, width / 2 - 130, height - box.positionY - 400, 20, 20);
  staminaRect1.position.x = box.position.x;
  staminaRect1.position.y = box.position.y - 50;
  staminaRect1.shapeColor = "white";
  staminaRect1.dept = 59;
  fill("#f50057");
  // lifeRect2 = createSprite( width / 2 - 100, height - box.positionY - 400, 185, 20);//chnage positions
  staminaRect2.position.x = box.position.x;
  staminaRect2.position.y = box.position.y - 50;
  // console.log();
  if (currentStamina >= 185) {
    staminaRect2.width = 185;
  }//no reason
  else if (currentStamina <= 0) {
    currentLife -= 3;
    currentStamina = 0;
  }
  else {
    staminaRect2.width = currentStamina;
  }
  staminaRect2.shapeColor = "yellow";
  staminaRect2.dept = 60;
  noStroke();
  pop();
}




function movebox() {
  boxX += boxSpeedX;
  boxY += boxSpeedY;
  boxSpeedX *= 0.95;
  boxSpeedY *= 0.95;
  let a = atan2(mouseY - windowHeight / 2, mouseX - windowWidth / 2);
  box.rotation = a * (180 / 3.14);
  // console.log(mouseX);

  if (left_key && box.position.x > -1890) {
    boxSpeedX -= 0.3
    currentStamina -= 0.1;
  }
  if (right_key && box.position.x < 1830) {
    boxSpeedX += 0.3
    currentStamina -= 0.1;
  }
  if (up_key && box.position.y > 90) {
    boxSpeedY -= 0.3
    currentStamina -= 0.1;
  }
  if (down_key && box.position.y < 3810) {
    boxSpeedY += 0.3
    currentStamina -= 0.1;
  }



}

function keyPressed() {
  if (keyCode == LEFT_ARROW || keyCode == 65) {
    left_key = true;
  }
  if (keyCode == UP_ARROW || keyCode == 87) {
    up_key = true;
  }
  if (keyCode == RIGHT_ARROW || keyCode == 68) {
    right_key = true;
  }
  if (keyCode == DOWN_ARROW || keyCode == 83) {
    down_key = true;
  }
}

function keyReleased() {
  // currentStamina+=5;
  if (keyCode == LEFT_ARROW || keyCode == 65) {
    left_key = false;
  }
  if (keyCode == UP_ARROW || keyCode == 87) {
    up_key = false;
  }
  if (keyCode == RIGHT_ARROW || keyCode == 68) {
    right_key = false;
  }
  if (keyCode == DOWN_ARROW || keyCode == 83) {
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