class Form {
    constructor() {
        this.input = createInput("").attribute("placeholder", "Enter your username");
        this.playButton = createButton("Play");
        this.aboutButton = createButton("About");
        this.creditsButton = createButton("Credits");
        this.titleImg = createImg("./assets/title_db.png", "game title");
        this.greeting = createElement("h2");
    }

    setElementsPosition() {
        this.titleImg.position(230, height/2 -300);
        this.input.position(width / 2 - 110, height / 2 - 80);
        this.playButton.position(width / 2-90, height / 2 - 10);
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
            createCanvas(windowWidth, windowHeight);
            gameState = 'play';
        });

        this.aboutButton.mousePressed(()=>{
            swal({
                icon: "info",
                title: 'About',
                text: 'Welcome to Portal Of Relics! Your objective is to collect all 3 relics from different dimentions which are unlocked by keys around the main island! Once you collect all the relcics, prepare for the bossfight by gearing up using the coins found around the map! Still do not understand? Do not fret, there will be a tutorial in game!',
                confirmButtonText: "Got it!"
            });
        })
        this.creditsButton.mousePressed(()=>{
            swal({
                title: "Credits",
                text: "Game made by Yashmit Bhaverisetti (AKA Yoshi)" 
            })
        })
    }

    display() {
        this.setElementsPosition();
        this.setElementsStyle();
        this.handleMousePressed();
    }
}
