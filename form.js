class Form {

    constructor() {
      this.input = createInput("").attribute("placeholder", "Enter your name");
      this.button = createImg('assets/start.png',"image");
      //this.question = createElement('h1');
      this.message = createElement("h2")
      this.greeting=createElement("h2");
      this.buttonText= createElement("h1");
      this.easy = createImg('assets/start.png', "image");
      this.easytext = createElement("h1");
      this.medium = createImg('assets/start.png', "image");
      this.mediumtext = createElement("h1");
      this.hard = createImg('assets/start.png', "image");
      this.hardtext = createElement("h1");
      this.resetButton = createImg('assets/reset.png', "image");
    }
  
    hide(){
      this.input.hide();
      this.button.hide();
      this.buttonText.hide();
      this.easy.hide();
      this.easytext.hide();
      this.medium.hide();
      this.mediumtext.hide();
      this.hard.hide();
      this.hardtext.hide();
    // this.message.hide();
    }
  
    setElementsStyle() {
      this.input.class("customInput");
      this.easytext.class("gameTitle");
      this.mediumtext.class("gameTitle");
      this.hardtext.class("gameTitle");
    }

    handleMousePressed() {
     
      this.easy.mousePressed(() => {
        this.input.hide();
        this.button.hide();
        this.buttonText.hide();
        var message = 
        `Hello ${this.input.value()}`;
        this.message.html(message);
        this.message.position(20, 20);
        setTimeout(() => {
           this.message;
        } ,1000); 
        gameState = EASY;
      });

     
      
      this.medium.mousePressed(() =>{
        this.input.hide();
        this.button.hide();
        var message = 
        `Hello ${this.input.value()}`;
        this.message.html(message);
        this.message.position(20, 20);
        setTimeout(() => {
           this.message;
        } ,1000); 
        gameState = MEDIUM;
      })

      this.hard.mousePressed(() =>{
        this.input.hide();
        this.button.hide();
        var message = 
        `Hello ${this.input.value()}`;
        this.message.html(message);
        this.message.position(20, 20);
        setTimeout(() => {
           this.message;
        } ,1000); 
       gameState = HARD;
      })

      
    }

    display(){
      this.message.class("gameTitle")
      this.resetButton.position(1100, 30);
      this.resetButton.size(200,80);
      this.easytext.html("EASY!");
      this.easytext.position(360,440);
      this.easy.position(300, 450);
      this.easy.size(200, 60);
      this.mediumtext.html("MEDIUM!");
      this.mediumtext.position(610,440);
      this.medium.position(570, 450);
      this.medium.size(200, 60);
      this.hardtext.html("HARD!");
      this.hardtext.position(905,440);
      this.hard.position(850, 450);
      this.hard.size(200, 60);
      this.input.position(width / 2 - 110, height / 2 );
     this.handleMousePressed();
     this.setElementsStyle(); 
      
     }
  }
