class Form {
    constructor() {
        this.input = createInput("").attribute("placeholder", "Enter your username");
        this.playButton = createButton("Play");
        this.aboutButton = createButton("About");
        this.aboutButton = createButton("About");
        this.creditsButton = createButton("Credits");
        this.titleImg = createImg("./assets/title_db.png", "game title");
        this.greeting = createElement("h2");
    }

    setElementsPosition() {
        this.titleImg.position(width / 2 - 720, height/2 -300);
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
    }

    handleMousePressed() {
        this.playButton.mousePressed(() => {
            print("worked");
        });

        this.aboutButton.mousePressed(()=>{
            swal({
                title: 'About',
                text: 'Add text',
                confirmButtonText: "Got it!"
            });
        })
    }

    display() {
        this.setElementsPosition();
        this.setElementsStyle();
        this.handleMousePressed();
    }
}
