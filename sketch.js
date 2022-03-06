let map = null;
let noiseScale = 1 / 190;
let ocean = "#008dc4";
let shore = "#00a9cc";
let sand = "#eecda3";
let grass = "#7ec850";
let stone = "#676767";
let snow = "#fffafa";
let k = 0,
  t = 0,
  m = 0;

let timer = 0;

let a;
let tileGrass = "#7ec850";
let tileDarkGrass = "#6dad45";
let tileBrick = "#aa5544";

let tileGrassImg;
let tileGrassImg2;
let tileBrickText;

var gameState = "form";

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

var playerX = 40;
var playerY = 350;
var playerSpeedX = 0;
var playerSpeedY = 0;

var player;
var bg;
var bo1;
var grassTileGroup, brickTileGroup;
var random123 = 0;

var lifeRect1, lifeRect2;
var currentLife = 185;
var currentStamina = 185;
var armourType;

var staminaRect2, staminaRect1;

var coinsNum = 15,
  coinGroup,
  coin; //ASJKLBDNDFKLNSDFKL:MNSDLFKNLSKDNMFLKJMSDLFK
var keysNumMNM = 5,
  keysGroup,
  keys,
  totalKeys = 0;

var shopSprite;
var shopSpriteVisible = false;

var swordShopButton, arrowShopButton, armourShopButton, buyRelicButton;

var handSprite, portalImg;

var arrowG = [];

var fistUnlocked = false;
var gunUnlocked = false;
var healthMult = 1;
var relicUnlocked = false;

var setgunUnlocked = false;

var setDamage = 1;
var priceMult = 1;
let frame = 0;
let zombieSpawnTime = 300;
let zombieMaxSpeed = 2;
let zombies = [];
var maxZoms = 30;
var deptOfT = 0;
var currentLevel = 1;
var keysNeeded = 3;
var score = 0;

var playerStanding, playerMoving, zombie, playerGun, tile1, tile2;

var coinIMG, keyIMG;
var bulletIMG;
var zombieDead;

function preload() {
  tileGrassImg = loadImage("assets/grassTileTexture.jpg");
  tileGrassImg2 = loadImage("assets/sGrassTile.png");
  tileBrickText = loadImage("assets/brickTexture.png");
  lifeImage = loadImage("./assets/life.png");
  lifeImage = loadImage("./assets/life.png");
  portalImg = loadImage("./assets/port.png");

  playerStanding = loadImage("./assets/manBlue_stand.png");
  playerMoving = loadImage("./assets/manBlue_hold.png");
  playerGun = loadImage("./assets/manBlue_silencer.png");
  zombie = loadImage("./assets/zombie.png");
  zombieDead = loadImage("./assets/trans1.png");
  tile1 = loadImage("./assets/tile_01.png");
  tile2 = loadImage("./assets/tile_02.png");
  coinIMG = loadImage("./assets/coin1.png");
  keyIMG = loadImage("./assets/key.png");
  bulletIMG = loadImage("./assets/bullet.png");
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
  player = createSprite(windowWidth / 2, windowHeight / 2, 50, 50);
  player.depth = 1000;

  player.visible = false;
  player.shapeColor = color(255, 0, 0);
  player.scale = 1.1;
  bg = loadImage("assets/bg.jpg");

  fill("red");
  armourType = createSprite(
    player.position.x + 1900,
    player.position.y + 400,
    50,
    50
  );
  armourType.visible = false;
  lifeRect1 = createSprite(
    width / 2 - 100,
    height - player.positionY - 400,
    185,
    20
  );
  lifeRect2 = createSprite(
    width / 2 - 100,
    height - player.positionY - 400,
    185,
    20
  );
  staminaRect1 = createSprite(
    width / 2 - 100,
    height - player.positionY - 400,
    185,
    20
  );
  staminaRect2 = createSprite(
    width / 2 - 100,
    height - player.positionY - 400,
    185,
    20
  );

  shopSprite = createSprite(player.position.x, player.position.y, 400, 800);
  shopSprite.shapeColor = "#747982";
  shopSprite.visible = false;

  swordShopButton = createSprite(
    player.position.x,
    player.position.y,
    400,
    100
  );
  arrowShopButton = createSprite(
    player.position.x,
    player.position.y,
    400,
    100
  );
  armourShopButton = createSprite(
    player.position.x,
    player.position.y,
    400,
    100
  );
  buyRelicButton = createSprite(player.position.x, player.position.y, 400, 100);
  arrowShopButton.visible = false;
  buyRelicButton.visible = false;
  swordShopButton.visible = false;
  armourShopButton.visible = false;
  handSprite = createSprite(100, 100, 120, 30);
  handSprite.shapeColor = "purple";
  handSprite.scale = 0.5;
  handSprite.dept = player.dept + 1;
  handSprite.visible = false;

  //assets
  player.addImage("standing", playerStanding);
  player.addImage("moving", playerMoving);
  player.addImage("gunHold", playerGun);
}

function draw() {
  if (gameState === "form") {
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

  if (
    gameState === "play" ||
    gameState === "secondLevel" ||
    gameState === "bossLevel"
  ) {
    for (let bullet of arrowG) {
      bullet.update();
      bullet.draw();
    }
    // armourType.visible = true; ///asdhjaksdjaskldjasjkdjnaskjmdaskjmdhjkajsdhk
    // console.log("asd");
    canvas.style.filter = "none";
    showLife();
    showStamina();
    background(200);
    moveplayer();
    player.visible = true;
    player.position.x = playerX;
    player.position.y = playerY;
    camera.position.x = player.position.x;
    camera.position.y = playerY;
    cursor(CROSS);
    handSprite.dept = 1000000;

    // handSprite.position.x = mouseX-windowWidth/2;
    // handSprite.position.y = mouseY-windowHeight/2 + 350;

    MapCreater(deptOfT);
    if (player.collide(brickTileGroup) === true) {
      // console.log("asd");
      playerSpeedX = playerSpeedX * -1;
      playerSpeedY = playerSpeedY * -1;
      // console.log(playerSpeedX);
      // console.log(playerSpeedY);
      currentLife -= 10;
    }
    // MapCreater();
  }
  // form.showText();
  createArmour();

  // grassTileCreated = 0;
  if (gameState === "secondLevel") {
    // zombies=[];
    if (grassTileCreated === 1) {
      var random123 = 0;
      grassTileCreated = 0;
      if (grassTileCreated === 0) {
        for (var u = 0; u < 40; u++) {
          for (var i = 0; i < 40; i++) {
            createTiles(windowWidth - i * 100, random123, deptOfT + 1);
          }
          random123 = random123 + 100;
        }
        genKeys(keysNeeded + 2);
        grassTileCreated = 1;
      }
      // console.log("one time only?");
      grassTileCreated = 2;
    }
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
      // console.log(zombies[i].state);
      // console.log(dist(zombies[i].position.x, zombies[i].position.y, player.position.x, player.position.y) < 20);

      if (zombies[i].ateYou()) {
        if (zombies[i].state === "no") {
          currentLife -= 30 / healthMult;
          zombies[i].removeDisplay();
          zombies.splice(i, 1);
        }
      }

      if (hasShot(zombies[i])) {
        // zombies.splice(i, 1); //sdnjkj
        zombies[i].timeout(5);
        // coinsNum += 3;
      }
    }

    for (let i = zombies.length - 1; i >= 0; i--) {
      if (
        zombies[i].state === "eatable" &&
        dist(
          zombies[i].pos.x,
          zombies[i].pos.y,
          player.position.x,
          player.position.y
        ) <
          20 ===
          true
      ) {
        // console.log("eat now");
        zombies[i].removeDisplay();
        zombies.splice(i, 1);
        currentStamina -= 5;
      }
    }
  }

  if (gameState === "bossLevel") {
    if (grassTileCreated === 2) {
      zombies = [];
      var random123 = 0;
      grassTileCreated = 0;
      if (grassTileCreated === 0) {
        for (var u = 0; u < 40; u++) {
          for (var i = 0; i < 40; i++) {
            createTiles(windowWidth - i * 100, random123, deptOfT + 1);
          }
          random123 = random123 + 100;
        }
        genKeys(keysNeeded + 2);
        grassTileCreated = 1;
      }
      // console.log("one time only?");
      grassTileCreated = 1;
    }
    var randum = Math.round(random(0, 100));
    if (frameCount % 60 && randum === 10 && maxZoms <= 60) {
      var z = new Zombie(1);
      z.createZom();
      zombies.push(z);
      maxZoms += 1;
    }
  }

  drawSprites();

  player.collide(coinGroup, removeBlocks);
  player.collide(keysGroup, removeKeys);

  form.showText();
  if (
    gameState === "play" ||
    gameState === "secondLevel" ||
    gameState === "bossLevel"
  ) {
    allText();
  }
  shop();

  if (
    gameState === "play" ||
    gameState === "secondLevel" ||
    gameState === "bossLevel"
  ) {
    if (currentLife <= 0) {
      // text("Game over", player.position.x - 150, player.position.y);
      // await new Promise((r) => setTimeout(r, 2000));
      // location.reload();
      currentLife = 180;
      gameOver();
    }
  }
}
function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      icon: "success",
      imageUrl: "http://cdn.onlinewebfonts.com/svg/img_491435.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again?",
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function hasShot(zombie) {
  for (let i = 0; i < this.arrowG.length; i++) {
    if (
      dist(this.arrowG[i].x, this.arrowG[i].y, zombie.pos.x, zombie.pos.y) < 15
    ) {
      this.arrowG[i].removeDisplay();
      this.arrowG.splice(i, 1);
      // maxZoms -= 1;
      return true;
    }
  }
  return false;
}

function shoot() {
  var b = new Bullet(player.position.x, player.position.y, a);
  b.createbull();
  arrowG.push(b);
  currentStamina -= 5;
}

function mouseClicked() {
  if (gunUnlocked === true) {
    shoot();
    // console.log("wo");
  }
}

function shop() {
  if (shopSpriteVisible == true) {
    shopSprite.position.x = player.position.x - windowWidth / 4.7;
    shopSprite.position.y = player.position.y;

    swordShopButton.position.x = player.position.x - windowWidth / 4.7;
    swordShopButton.position.y = player.position.y - 300;

    arrowShopButton.position.x = player.position.x - windowWidth / 4.7;
    arrowShopButton.position.y = player.position.y - 180;

    armourShopButton.position.x = player.position.x - windowWidth / 4.7;
    armourShopButton.position.y = player.position.y - 60;

    buyRelicButton.position.x = player.position.x - windowWidth / 4.7;
    buyRelicButton.position.y = player.position.y + 60;

    var price = 20 * priceMult;
    // text("Unlock your Fist for 20 coins(Press '1')", player.position.x - windowWidth / 4.7, player.position.y - 300);
    if (fistUnlocked === false) {
      text(
        "Unlock your Fist for 20 coins(Press '1')",
        player.position.x - windowWidth / 4.7,
        player.position.y - 300
      );
    } else if (fistUnlocked === true) {
      text(
        "Fist Unlocked!",
        player.position.x - windowWidth / 4.7,
        player.position.y - 300
      );
    }

    if (gunUnlocked === false) {
      text(
        "Unlock your gun for 50 coins(Press '2')",
        player.position.x - windowWidth / 4.7,
        player.position.y - 180
      );
    } else if (gunUnlocked === true) {
      text(
        "gun Unlocked",
        player.position.x - windowWidth / 4.7,
        player.position.y - 180
      );
    }

    if (gunUnlocked === false) {
      text(
        "Unlock your gun for 50 coins(Press '2')",
        player.position.x - windowWidth / 4.7,
        player.position.y - 180
      );
    } else if (gunUnlocked === true) {
      text(
        "gun Unlocked",
        player.position.x - windowWidth / 4.7,
        player.position.y - 180
      );
    }

    if (relicUnlocked === false) {
      text(
        "Go to Next Level for " + keysNeeded + " (Press '4')",
        player.position.x - windowWidth / 4.7,
        player.position.y + 60
      );
    } else if (relicUnlocked === true) {
      text(
        "Relic has been unlocked, head to the portal!",
        player.position.x - windowWidth / 4.7,
        player.position.y + 60
      );
    }
    if (relicUnlocked === true) {
      if (gameState === "secondLevel") {
        // gameState = "bossLevel";
        // grassTileCreated = 1;
        gameState = "bossLevel";
        // console.log(gameState);
      } else {
        gameState = "secondLevel";
        // console.log(gameState);
      }
      grassTileGroup.removeSprites();
      brickTileGroup.removeSprites();
      coinGroup.removeSprites();
      keysGroup.removeSprites();
      relicUnlocked = false;
    }

    text(
      "Upgrade your Armour for " + price + " coins(Press '3')",
      player.position.x - windowWidth / 4.7,
      player.position.y - 60
    );

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
      // console.log("fist up");
      one_key = false;
      text(
        "Fist Unlocked!",
        player.position.x - windowWidth / 4.7,
        player.position.y - 300
      );
    }

    if (two_key === true && coinsNum >= 50 && gunUnlocked === false) {
      gunUnlocked = true;
      coinsNum -= 50;
      // console.log("gun up");
      two_key = false;
    }
    if (three_key === true && coinsNum >= price) {
      healthMult += 1;
      priceMult += 1;
      // console.log(price);
      coinsNum -= price;
      // console.log("armour up");
      three_key = false;
    }

    if (four_key === true && totalKeys >= keysNeeded) {
      //come back here
      // console.log("relic");
      relicUnlocked = true;
      totalKeys = 0;
      four_key = false;
      currentLevel += 1;
      keysNeeded += 2;
      player.position.x = 0;
      player.position.y = 0;
    }
  } else {
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
  score = currentLevel * keysNeeded;
  textSize(20);
  text("Coins: " + coinsNum, player.position.x - 150, player.position.y - 100);
  text("Keys: " + totalKeys, player.position.x - 150, player.position.y - 130);
  text("Level: " + currentLevel, player.position.x, player.position.y - 400);
  text(
    "Keys needed: " + keysNeeded,
    player.position.x,
    player.position.y - 370
  );
  text("Score: " + score, player.position.x, player.position.y - 340);
  if (currentLife <= 0) {
    text("Game over", player.position.x - 150, player.position.y);
  }
}

function MapCreater(dept) {
  if (grassTileCreated === 0) {
    for (var u = 0; u < 40; u++) {
      for (var i = 0; i < 40; i++) {
        createTiles(windowWidth - i * 100, random123, dept);
      }
      random123 = random123 + 100;
    }
    genKeys(keysNeeded + 2);
    grassTileCreated = 1;
  }
}

function createTiles(x, y, dept) {
  bo1 = createSprite(x, y, 100, 100);
  // console.log(Math.random(0, 5));
  //grass most common 0,1,2
  //darkgrass little less common 3,4
  //brick least common 5
  var randomNum = Math.round(random(0, 5));
  if (randomNum === 0 || randomNum === 1 || randomNum === 2) {
    bo1.shapeColor = color(tileGrass);
    bo1.depth = dept;
    // bo1.addImage('grass', tileGrassImg);
    grassTileGroup.add(bo1);

    var randomNum1 = Math.round(random(0, 30));
    if (randomNum1 === 10) {
      coin = createSprite(x, y, 20, 20);
      coin.rotation = Math.round(random(0, 90));
      coin.shapeColor = "yellow";
      coin.addImage("coin", coinIMG);
      coin.scale = 0.13;
      coinGroup.add(coin);
    }
  }
  if (randomNum === 3) {
    bo1.shapeColor = color(tileDarkGrass);
    bo1.depth = dept;
    // bo1.addImage('grass', tileGrassImg2);
    grassTileGroup.add(bo1);
  } else {
    bo1.shapeColor = color(tileGrass);
    bo1.depth = dept;
    // bo1.addImage('grass', tileGrassImg);
    grassTileGroup.add(bo1);
  }
  if (randomNum === 5) {
    var randomNum = Math.round(random(0, 10));
    if (randomNum === 3) {
      bo1.shapeColor = color(tileBrick);
      // bo1.addImage('grass', tileBrickText);
      bo1.depth = dept;
      brickTileGroup.add(bo1);
    } else {
      bo1.shapeColor = color(tileGrass);
      bo1.depth = 0;
      // bo1.addImage('grass', tileGrassImg);
      grassTileGroup.add(bo1);
    }
  }
}
function genKeys(minValKeys) {
  var randomNum1 = Math.round(random(minValKeys, minValKeys + 2));
  for (var i = 0; i <= randomNum1; i++) {
    var xR = Math.round(random(-windowWidth, windowWidth * 2));
    var yR = Math.round(random(-windowHeight, windowHeight * 2));
    keys = createSprite(xR, yR, 20, 40);
    keys.rotation = Math.round(random(0, 90));
    keys.shapeColor = "grey";
    keys.addImage("keyIMG", keyIMG);
    keys.scale = 0.1;
    keysGroup.add(keys);
    randomCounter += 1;
    // console.log(randomCounter);
  }
}

function createArmour() {
  armourType.position.x = player.position.x + 900;
  armourType.position.y = player.position.y - 100;
  armourType.dept = 400;
  armourType.shapeColor = "gray";
}

function showLife() {
  // console.log("worked");
  push();
  if (currentLife <= 185) {
    lifeRect1.visible = true;
    lifeRect2.visible = true;
    image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
    lifeRect1.position.x = player.position.x;
    lifeRect1.position.y = player.position.y - 80;
    lifeRect1.shapeColor = "white";
    lifeRect1.dept = 59;
    fill("#f50057");
    // lifeRect2 = createSprite( width / 2 - 100, height - player.positionY - 400, 185, 20);//chnage positions
    lifeRect2.position.x = player.position.x;
    lifeRect2.position.y = player.position.y - 80;
    // console.log();
    lifeRect2.shapeColor = "red";
    lifeRect2.dept = 60;
    noStroke();
  } else {
    lifeRect1.visible = false;
    lifeRect2.visible = false;
  }
  if (currentLife >= 185) {
    lifeRect2.width = 185;
  } else if (currentLife <= 0) {
    currentLife = 0;
  } else {
    lifeRect2.width = currentLife;
  }
  pop();
}

function showStamina() {
  // console.log("worked");
  push();
  if (currentStamina >= 185) {
    staminaRect2.width = 185;
  } else if (currentStamina <= 0) {
    currentLife -= 3;
    currentStamina = 0;
  } else {
    staminaRect2.width = currentStamina;
  }
  if (currentStamina <= 185) {
    staminaRect1.visible = true;
    staminaRect2.visible = true;
    image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
    staminaRect1.position.x = player.position.x;
    staminaRect1.position.y = player.position.y - 50;
    staminaRect1.shapeColor = "white";
    staminaRect1.dept = 59;
    fill("#f50057");
    // lifeRect2 = createSprite( width / 2 - 100, height - player.positionY - 400, 185, 20);//chnage positions
    staminaRect2.position.x = player.position.x;
    staminaRect2.position.y = player.position.y - 50;
    // console.log();
    staminaRect2.shapeColor = "yellow";
    staminaRect2.dept = 60;
    noStroke();
  } else {
    // console.log("");
    staminaRect1.visible = false;
    staminaRect2.visible = false;
  }
  pop();
}

function moveplayer() {
  playerX += playerSpeedX;
  playerY += playerSpeedY;
  playerSpeedX *= 0.95;
  playerSpeedY *= 0.95;
  a = atan2(mouseY - windowHeight / 2, mouseX - windowWidth / 2);
  player.rotation = a * (180 / 3.14);
  // handSprite.rotation = a * (180 / 3.14);

  // console.log(mouseX);

  if (left_key && player.position.x > -1890) {
    playerSpeedX -= 0.3;
    currentStamina -= 0.1;
    if (gunUnlocked === true) {
      player.changeImage("gunHold");
      console.log("Its working");
    } else {
      player.changeImage("moving");
    }
  }
  if (right_key && player.position.x < 1830) {
    playerSpeedX += 0.3;
    currentStamina -= 0.1;
    // player.changeImage("moving");
    if (gunUnlocked === true) {
      player.changeImage("gunHold");
    } else {
      player.changeImage("moving");
    }
  }
  if (up_key && player.position.y > 90) {
    playerSpeedY -= 0.3;
    currentStamina -= 0.1;
    // player.changeImage("moving");
    if (gunUnlocked === true) {
      player.changeImage("gunHold");
    } else {
      player.changeImage("moving");
    }
  }
  if (down_key && player.position.y < 3810) {
    playerSpeedY += 0.3;
    currentStamina -= 0.1;
    // player.changeImage("moving");
    if (gunUnlocked === true) {
      player.changeImage("gunHold");
    } else {
      player.changeImage("moving");
    }
  }
  if (
    down_key === false &&
    up_key === false &&
    right_key === false &&
    left_key === false
  ) {
    player.changeImage("standing");
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

  if (keyCode == 81 && shopSpriteVisible == false) {
    shopSprite.visible = true;
    shopSpriteVisible = true;
  } else if (keyCode == 81 && shopSpriteVisible == true) {
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
  let h = noise(i * noiseScale, j * noiseScale);
  let c = "#facade";

  if (h < 0.2) {
    c = ocean;
  } else if (h < 0.3) {
    if (random() > pow(h - 0.2, 2) * 100) {
      c = ocean;
    } else {
      c = shore;
    }
  } else if (h < 0.4) {
    if (random() > pow(h - 0.3, 2) * 100) {
      c = shore;
    } else {
      c = sand;
    }
  } else if (h < 0.5) {
    if (random() > pow(h - 0.4, 2) * 100) {
      c = sand;
    } else {
      c = grass;
    }
  } else if (h < 0.6) {
    if (random() > pow(h - 0.5, 2) * 100) {
      c = grass;
    } else {
      c = stone;
    }
  } else if (h < 0.7) {
    if (random() > pow(h - 0.6, 2) * 100) {
      c = stone;
    } else {
      c = snow;
    }
  } else {
    c = snow;
  }

  return color(c);
}

function drawMap() {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      set(i, j, map[i][j]);
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
    return false; // too far to the side
  }
  if (y1 >= y2 + img2.height || y1 + img1.height <= y2) {
    return false; // too far above/below
  }
  return true; // otherwise, overlap
}
