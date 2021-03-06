class Form {
  constructor() {
    this.input = createInput("").attribute(
      "placeholder",
      "Enter your username"
    );
    this.playButton = createButton("Play");
    this.aboutButton = createButton("About");
    this.creditsButton = createButton("Credits");
    this.titleImg = createImg("./assets/title_db.png", "game title");
    this.greeting = createElement("h2");
    this.message;
  }

  setElementsPosition() {
    this.titleImg.position(230, height / 2 - 300);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 10);
    this.aboutButton.position(width / 2 - 90, height / 2 + 60);
    this.creditsButton.position(width / 2 - 90, height / 2 + 130);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.aboutButton.class("customButton");
    this.creditsButton.class("customButton");
    this.greeting.class("greeting");
  }
  //use

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.aboutButton.hide();
    this.creditsButton.hide();
    this.input.hide();
    this.titleImg.hide();
  }

  handleMousePressed() {
    this.playButton.mousePressed(() => {
      print("worked");
      this.hide();
      this.titleImg.class("gameTitleAfterEffect");
      this.message = `${this.input.value()}`;
      createCanvas(windowWidth, windowHeight);
      gameState = "play";
    });

    this.aboutButton.mousePressed(() => {
      swal({
        icon: "info",
        title: "About",
        text: "Welcome to Portal Of Relics! This is a Top-Down shooter game! Use WASD or Arrow keys to move, click to shoot, and use number keys to buy upgrades. Press Q to open the shop at anytime!",
        confirmButtonText: "Got it!",
      });
    });
    this.creditsButton.mousePressed(() => {
      swal({
        title: "Credits",
        text: "Game made by Yashmit Bhaverisetti (AKA Yoshi)",
      });
    });
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
  showText() {
    textSize(50);
    textAlign(CENTER);
    if (this.message === "") {
      text("Sir", player.position.x, player.position.y - 100);
    } else {
      text(this.message, player.position.x, player.position.y - 100);
    }
    // text(this.message, windowWidth/2, player.position.y);
    // console.log(this.message);
  }
}
