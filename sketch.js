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

let a;
let tileGrass = "#7ec850";
let tileDarkGrass = "#6dad45";
let tileBrick = "#aa5544";

let tileGrassImg;
let tileGrassImg2;
let tileBrickText;

var gameState = 'form';

var form;
var randomCounter;

var grassTileCreated = 0;

var left_key = false;
var up_key = false;
var right_key = false;
var down_key = false;


var one_key = false;
var two_key = false;
var three_key = false;
var four_key = false;

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

var coinsNum = 200, coinGroup, coin;//ASJKLBDNDFKLNSDFKL:MNSDLFKNLSKDNMFLKJMSDLFK
var keysNumMNM = 5, keysGroup, keys, totalKeys = 0;

var shopSprite;
var shopSpriteVisible = false;

var swordShopButton, arrowShopButton, armourShopButton, buyRelicButton;

var handSprite, portalImg;

var arrowG = [];

var fistUnlocked = false;
var bowUnlocked = false;
var healthMult = 1;
var relicUnlocked = false;;





var setBowUnlocked = false;

var setDamage = 1;
var priceMult = 1;
let frame = 0;
let zombieSpawnTime = 300;
let zombieMaxSpeed = 2;
let zombies = [];
var maxZoms = 30;




function preload() {
  tileGrassImg = loadImage('assets/grassTileTexture.jpg');
  tileGrassImg2 = loadImage('assets/sGrassTile.png');
  tileBrickText = loadImage('assets/brickTexture.png');
  lifeImage = loadImage("./assets/life.png");
  lifeImage = loadImage("./assets/life.png");
  portalImg = loadImage("./assets/port.png");
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
  keysGroup = new Group();
  form = new Form();
  form.display();
  fill("gray");
  box = createSprite(windowWidth / 2, windowHeight / 2, 50, 50);
  box.depth = 1000;

  box.visible = false;
  box.shapeColor = color(255, 0, 0);
  bg = loadImage('assets/bg.jpg');

  fill("red");
  armourType = createSprite(box.position.x + 1900, box.position.y + 400, 50, 50);
  armourType.visible = false;
  lifeRect1 = createSprite(width / 2 - 100, height - box.positionY - 400, 185, 20);
  lifeRect2 = createSprite(width / 2 - 100, height - box.positionY - 400, 185, 20);
  staminaRect1 = createSprite(width / 2 - 100, height - box.positionY - 400, 185, 20);
  staminaRect2 = createSprite(width / 2 - 100, height - box.positionY - 400, 185, 20);



  shopSprite = createSprite(box.position.x, box.position.y, 400, 800);
  shopSprite.shapeColor = '#747982';
  shopSprite.visible = false;


  swordShopButton = createSprite(box.position.x, box.position.y, 400, 100);
  arrowShopButton = createSprite(box.position.x, box.position.y, 400, 100);
  armourShopButton = createSprite(box.position.x, box.position.y, 400, 100);
  buyRelicButton = createSprite(box.position.x, box.position.y, 400, 100);
  arrowShopButton.visible = false;
  buyRelicButton.visible = false;
  swordShopButton.visible = false;
  armourShopButton.visible = false;
  handSprite = createSprite(100, 100, 120, 30);
  handSprite.shapeColor = 'purple';
  handSprite.addImage('asd', portalImg);
  handSprite.scale = 0.5;
  handSprite.dept = box.dept + 1;
  handSprite.visible = false;




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
    for (let bullet of arrowG) {
      bullet.update();
      bullet.draw();
    }
    // armourType.visible = true; ///asdhjaksdjaskldjasjkdjnaskjmdaskjmdhjkajsdhk
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
    cursor(CROSS);
    handSprite.dept = 1000000;

    // handSprite.position.x = mouseX-windowWidth/2;
    // handSprite.position.y = mouseY-windowHeight/2 + 350;

    MapCreater();
    if (box.collide(brickTileGroup) === true) {
      // console.log("asd");
      boxSpeedX = boxSpeedX * -1;
      boxSpeedY = boxSpeedY * -1;
      console.log(boxSpeedX);
      console.log(boxSpeedY);
      currentLife -= 10;
    }
    // MapCreater();


  }
  // form.showText();
  createArmour();

  if (gameState === 'play') {
    var randum = Math.round(random(0, 100));
    if (frameCount % 60 && randum === 10 && maxZoms <= 60) {
      var z = new Zombie(1);
      z.createZom();
      zombies.push(z);
      maxZoms += 1;

    }

    for (let i = zombies.length - 1; i >= 0; i--) {
      zombies[i].draw();
      zombies[i].update();

      if (zombies[i].ateYou()) {
        currentLife -= 30 / healthMult;
        zombies.splice(i, 1);
      }

      if (hasShot(zombies[i])) {
        zombies.splice(i, 1);
        coinsNum += 3;
      }
    }
  }

  drawSprites();

  // console.log(coinGroup.leght);

  box.collide(coinGroup, removeBlocks);
  box.collide(keysGroup, removeKeys);


  form.showText();
  if (gameState === 'play') {
    allText();
  }
  shop();
}

function hasShot(zombie) {
  for (let i = 0; i < this.arrowG.length; i++) {
    if (dist(this.arrowG[i].x, this.arrowG[i].y, zombie.pos.x, zombie.pos.y) < 15) {
      this.arrowG.splice(i, 1);
      return true;
    }
  }
  return false;
}

function shoot() {
  var b = new Bullet(box.position.x, box.position.y, a);
  b.createbull();
  arrowG.push(b);
  currentStamina -= 5;
}

function mouseClicked() {
  if (gameState === "play" && bowUnlocked === true) {
    shoot();
    // console.log("wo");
  }
}

function shop() {
  if (shopSpriteVisible == true) {
    shopSprite.position.x = box.position.x - windowWidth / 4.7;
    shopSprite.position.y = box.position.y;

    swordShopButton.position.x = box.position.x - windowWidth / 4.7;
    swordShopButton.position.y = box.position.y - 300;

    arrowShopButton.position.x = box.position.x - windowWidth / 4.7;
    arrowShopButton.position.y = box.position.y - 180;

    armourShopButton.position.x = box.position.x - windowWidth / 4.7;
    armourShopButton.position.y = box.position.y - 60;

    buyRelicButton.position.x = box.position.x - windowWidth / 4.7;
    buyRelicButton.position.y = box.position.y + 60;


    var price = 20 * priceMult;
    // text("Unlock your Fist for 20 coins(Press '1')", box.position.x - windowWidth / 4.7, box.position.y - 300);
    if (fistUnlocked === false) {
      text("Unlock your Fist for 20 coins(Press '1')", box.position.x - windowWidth / 4.7, box.position.y - 300);
    }
    else if (fistUnlocked === true) {
      text("Fist Unlocked!", box.position.x - windowWidth / 4.7, box.position.y - 300);

    }

    if (bowUnlocked === false) {
      text("Unlock your Bow for 20 coins(Press '2')", box.position.x - windowWidth / 4.7, box.position.y - 180);
    }
    else if (bowUnlocked === true) {
      text("Bow Unlocked", box.position.x - windowWidth / 4.7, box.position.y - 180);
    }

    if (bowUnlocked === false) {
      text("Unlock your Bow for 20 coins(Press '2')", box.position.x - windowWidth / 4.7, box.position.y - 180);
    }
    else if (bowUnlocked === true) {
      text("Bow Unlocked", box.position.x - windowWidth / 4.7, box.position.y - 180);
    }

    if (relicUnlocked === false) {
      text("Get 3 keys to unlock the Relic(Press '4')", box.position.x - windowWidth / 4.7, box.position.y + 60);
    }
    else if (relicUnlocked === true) {
      text("Relic has been unlocked, head to the portal!", box.position.x - windowWidth / 4.7, box.position.y + 60);
    }


    text("Upgrade your Armour for " + price + " coins(Press '3')", box.position.x - windowWidth / 4.7, box.position.y - 60);

    swordShopButton.shapeColor = "#303338";
    arrowShopButton.shapeColor = "#303338";
    armourShopButton.shapeColor = "#303338";
    buyRelicButton.shapeColor = "#303338";
    swordShopButton.dept = shopSprite.dept + 1;
    arrowShopButton.dept = shopSprite.dept + 1;
    armourShopButton.dept = shopSprite.dept + 1;
    buyRelicButton.dept = shopSprite.dept + 1;
    swordShopButton.visible = true;
    arrowShopButton.visible = true;
    armourShopButton.visible = true;
    buyRelicButton.visible = true;

    if (one_key === true && coinsNum >= 20 && fistUnlocked === false) {
      fistUnlocked = true;
      coinsNum -= 20;
      console.log("fist up");
      one_key = false;
      text("Fist Unlocked!", box.position.x - windowWidth / 4.7, box.position.y - 300);

    }

    if (two_key === true && coinsNum >= 20 && bowUnlocked === false) {
      bowUnlocked = true;
      coinsNum -= 20;
      console.log("bow up");
      two_key = false;
    }
    if (three_key === true && coinsNum >= price) {
      healthMult += 1;
      priceMult += 1;
      console.log(price);
      coinsNum -= price;
      console.log("armour up");
      three_key = false;
    }

    if (four_key === true && totalKeys >= 1) {
      console.log("relic");
      relicUnlocked = true;
      totalKeys = 0;
      four_key = false;
    }


  }
  else {
    arrowShopButton.visible = false;
    swordShopButton.visible = false;
    armourShopButton.visible = false;
    buyRelicButton.visible = false;
  }
}


function removeBlocks(sprite, coin) {
  coin.remove();
  coinsNum += 2;
  // console.log(coinsNum);
}

function removeKeys(sprite, key) {
  key.remove();
  totalKeys += 1;
  // console.log(coinsNum);
}



function allText() {
  textSize(20);
  text('Coins: ' + coinsNum, box.position.x - 150, box.position.y - 100);
  text('Keys: ' + totalKeys, box.position.x - 150, box.position.y - 130);
}

function MapCreater() {
  if (grassTileCreated === 0) {
    for (var u = 0; u < 40; u++) {
      for (var i = 0; i < 40; i++) {
        createTiles(windowWidth - i * 100, random123);
      }
      random123 = random123 + 100;
    }
    genKeys(5);
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
function genKeys(minValKeys) {
  var randomNum1 = Math.round(random(minValKeys, minValKeys + 2));
  for (var i = 0; i <= randomNum1; i++) {
    var xR = Math.round(random(-windowWidth, windowWidth * 2))
    var yR = Math.round(random(-windowHeight, windowHeight * 2))
    keys = createSprite(xR, yR, 20, 40);
    keys.rotation = Math.round(random(0, 90));
    keys.shapeColor = "grey";
    keysGroup.add(keys);
    randomCounter += 1;
    console.log(randomCounter);
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
  a = atan2(mouseY - windowHeight / 2, mouseX - windowWidth / 2);
  box.rotation = a * (180 / 3.14);
  // handSprite.rotation = a * (180 / 3.14);

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

  if (keyCode == 49) {
    one_key = true;
  }

  if (keyCode == 50) {
    two_key = true;
  }
  if (keyCode == 51) {
    three_key = true;
  }
  if (keyCode == 52) {
    four_key = true;
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

  if (keyCode == 49) {
    one_key = false;
  }

  if (keyCode == 50) {
    two_key = false;
  }
  if (keyCode == 51) {
    three_key = false;
  }
  if (keyCode == 52) {
    four_key = false;
  }

  if (keyCode == 81 && shopSpriteVisible == false && gameState == 'play') {
    shopSprite.visible = true;
    shopSpriteVisible = true;

  }
  else if (keyCode == 81 && shopSpriteVisible == true) {
    shopSprite.visible = false;
    shopSpriteVisible = false;
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