
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var spaceShip;
var backImg, spacei, rock1Img, rock2Img, laserImg, Ufo, ufo2, bullet;
var ufo,obstaclegroup,shoot;
var score;
var laser;
var obstacle;
var END = 3;
var START = 1;
var Direction = 0.1;
var BEGIN = 0;
var gameState = 0;
var fillForm;
var sButton, dButton,ButtonImg;
var GameTitle;
var shootgroup, lasergroup, leaderboard;
var database;
var backgM, Backbutton;
var blastImg;
var EASY, MEDIUM, HARD;
var ufo3, ufo4, obstaclegroup2;

function preload(){
  backImg = loadImage("assets/backg.jpg");
  spacei = loadImage("assets/fighter2.png");
  rock1Img = loadImage("assets/rock1.png");
  rock2Img = loadImage("assets/rock2.png");
  laserImg = loadImage("assets/laser.png");
  Ufo = loadImage("assets/ufo1.png");
  ufo2 = loadImage("assets/ufo2.png")
  bullet = loadImage("assets/bullet.png");
  ButtonImg = loadImage("assets/start.png");
  tBgI = loadImage("assets/backg2.jpg");
  backgM = loadSound("laai.mp3");
  blastImg = loadImage("assets/blast.png");
  ufo3 = loadImage("assets/ufo3.png");
  ufo4 = loadImage("assets/ufo4.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

 database = firebase.database();
   
  backgM.play();
  backgM.setVolume(0.6);

  sButton = createSprite(950,450,200,60);
  sButton.addImage("Image",ButtonImg);
  sButton.scale = 0.5;
  sButton.visible = true;

  dButton = createSprite(300,450,50,10);
  dButton.addImage("Image",ButtonImg);
  dButton.scale = 0.55;
  dButton.visible = true;

  spaceShip = createSprite(500,500,50,100);
  spaceShip.addAnimation("Image",spacei);
  spaceShip.addAnimation("Blimage",blastImg);
  spaceShip.visible = false;

  Backbutton = createSprite(1250,460,50,50);
  Backbutton.addImage("image", ButtonImg);
  Backbutton.scale = 0.5;
  Backbutton.visible = false;

  GameTitle = new title();
  GameTitle.display();

  fillForm = new Form();

  obstaclegroup = new Group();
  obstaclegroup2 = new Group();
  lasergroup = new Group();
  shootgroup = new Group();
  score = 0;

}


function draw() 
{
  background( backImg); 
  //Engine.update(engine);
  if (gameState === 0.1){
    background(tBgI);
    Backbutton.visible = true;
    textSize(35);
    fill("white");
    text("Back", 1250,460);
    if(mousePressedOver(Backbutton)){
      gameState = 0;
    }
      direction();
    }
  drawSprites();
  if(gameState === 0){
    Backbutton.visible = false;
    sButton.visible = true;
    dButton.visible = true;
    textSize(50);
    fill("white");
    textFont("Bradley Hand ITC");
    text("Do you want to be the great Space Fighter just like the X-Wing?",30,350);

    textSize(35);
    fill("white");
    textFont("Bradley Hand ITC");
    text("Yes!", 915,460);

    textSize(35);
    fill("white");
    textFont("Bradley Hand ITC");
    text("Directions", 230,460);
    
    if(mousePressedOver(sButton)){
      gameState = 1;
      sButton.visible = false;
      dButton.visible = false;
    }

    if(mousePressedOver(dButton)){
      sButton.visible = false;
      dButton.visible = false;
      gameState = 0.1;
    }

  }
  
  else if(gameState === 1){
    Backbutton.visible = false;
    fillForm.display();
    
  }
  else if(gameState === EASY){
     fillForm.hide();
     GameTitle.hide();
     textSize(30);
     fill("white");
     textFont("Bradley Hand ITC");
     text("Let's save the UNIVERSE", 20, 20);

    if(keyDown("RIGHT_ARROW")){
      spaceShip.x += 5;
    }
  
    if(keyDown("LEFT_ARROW")){
      spaceShip.x -= 5;
    }
  
    if(keyDown("space")){
      laserBeam();
    }
  
    if(keyDown("B")) {
      shooting();
    }
    spaceShip.visible = true;
    textSize(30);
    fill("white");
    text("Score:"+score,1200,50);

    if(obstaclegroup.isTouching(lasergroup)){
     
     for(var i =0;i<obstaclegroup.length;i++){
       if(obstaclegroup[i].isTouching(lasergroup))
      obstaclegroup[i].destroy();
      lasergroup[i].destroy();
      score += 2;
     } 
    }

   if(shootgroup.isTouching(obstaclegroup)){
    for(var i = 0;i<obstaclegroup.length;i++){
      if(obstaclegroup[i].isTouching(shootgroup)){
        obstaclegroup.destroyEach();
       shootgroup.destroyEach();
       score += 1;
      }
    }
  }
   
    metioriods();

    /*if(obstaclegroup.isTouching(spaceShip)){
      obstaclegroup.destroyEach();
      spaceShip.changeAnimation("Blimage");
    //  spaceShip.destroy();
      score -= 2;

    }*/
    
  }else if(gameState === MEDIUM){
      
    fillForm.hide();
    GameTitle.hide();
    textSize(30);
    fill("white");
    textFont("Bradley Hand ITC");
    text("Let's save the UNIVERSE", 20, 20);

   if(keyDown("RIGHT_ARROW")){
     spaceShip.x += 5;
   }
 
   if(keyDown("LEFT_ARROW")){
     spaceShip.x -= 5;
   }
 
   if(keyDown("space")){
     laserBeam();
   }
 
   if(keyDown("B")) {
     shooting();
   }
   spaceShip.visible = true;
   textSize(30);
   fill("white");
   text("Score:"+score,1200,50);

   mediumMeteriod();

   if(obstaclegroup2.isTouching(lasergroup)){
    
    for(var i =0;i<obstaclegroup2.length;i++){
      if(obstaclegroup2[i].isTouching(lasergroup))
     obstaclegroup2[i].destroy();
     lasergroup[i].destroy();
     score += 2;
    } 
   }

  if(shootgroup.isTouching(obstaclegroup2)){
   for(var i = 0;i<obstaclegroup2.length;i++){
     if(obstaclegroup2[i].isTouching(shootgroup)){
       obstaclegroup2.destroyEach();
      shootgroup.destroyEach();
      score += 1;
     }
   }
 }
      
      gameState = 2;
      }
     
       

 
  
}

function laserBeam(){
  laser = createSprite(200, 200, 50,100);
  lasergroup.add(laser);
  laser.addImage(laserImg);
  laser.scale = 0.2
  laser.x = spaceShip.x;
  laser.y = spaceShip.y;
  laser.velocityY -= 5;
  laser.lifeTime = 900;
  lasergroup.add(laser);
}


function shooting(){
  shoot = createSprite(200, 300, 100, 50);
  shootgroup.add(shoot);
  shoot.addImage(bullet);
  shoot.scale = 0.2;
  shoot.x = spaceShip.x;
  shoot.y = spaceShip.y;
  shoot.velocityY -= 5;
  shoot.lifeTime = 1000;
  shootgroup.add(shoot);
}



function metioriods(){
  if(frameCount %60 === 0){
    obstacle = createSprite(150, 150, 50, 50);
    obstaclegroup.add(obstacle);
    obstacle.x = Math.round(random(250, 1000));
    obstacle.lifetime = 120;

    obstaclegroup.add(obstacle);

  var rand = Math.round(random(0,3));
  //console.log(rand)
  if(rand === 0){
    obstacle.addImage(rock1Img);
    obstacle.scale = 0.4;
    obstacle.velocityY = 5;
  }
  else if(rand === 1){
    obstacle.addImage(rock2Img);
    obstacle.scale = 0.3;
    obstacle.velocityY = 5;
  }
  else if(rand === 2){
    obstacle.x = 250;
    obstacle.y = Math.round(random(200, 350));
    obstacle.lifetime = 220;
     obstacle.addImage(Ufo);
     obstacle.scale = 0.4;
     obstacle.velocityX = 5;
  }
  else if(rand === 3){
    obstacle.x = 250;
    obstacle.y = Math.round(random(200, 350));
    obstacle.lifetime = 220;
     obstacle.addImage(ufo2);
     obstacle.scale = 0.4;
     obstacle.velocityX = 5;
  }
  else if(rand === 4){
    obstacle.x = 250;
    obstacle.y = Math.round(random(200, 350));
    obstacle.lifetime = 220;
     obstacle.addImage(ufo2);
     obstacle.scale = 0.4;
     obstacle.velocityX = 5;
  }

  }
  
}

function form(){
  fillForm.display();
}

function direction(){
  textSize(30);
  fill("white");
  text("*press the left arrow to move left ", 200,100);
  text("*press the right arrow to move right",200,150);
  text("*press the B for the bullets",200,200);
  text("*press the space for the laser",200,250);
  text("*be careful from the metioriods and ufos to survive",200,300);
  text("*before the life gets over collect them",200,350);
  text("*whenever you shoot or kill or destroy any ufo or metiorids your score gets increased ",200,400);
  text("to 1",210,430);
  
}

function mediumMeteriod(){
  obstaclegroup2.velocityX = 7;
  obstaclegroup2.velocityY = 9;
  
   var obstacle = createSprite(150, 150, 50, 50);
    obstaclegroup2.add(obstacle);
    obstacle.x = Math.round(random(250, 1000));
    obstacle.lifetime = 120;

    obstaclegroup2.add(obstacle);

  var rand = Math.round(random(0,3));
  if(rand === 0){
    obstacle.addImage(ufo3);
    obstacle.scale = 0.5;
    obstacle.velocityY = 8;
  }
  else if(rand === 1){
    obstacle.addImage(ufo4);
    obstacle.scale = 0.5;
    obstacle.velocityY = 8;
  }
  else if(rand === 2){
    obstacle.x = 250;
    obstacle.y = Math.round(random(200, 350));
    obstacle.lifetime = 220;
     obstacle.addImage(Ufo);
     obstacle.scale = 0.5;
     obstacle.velocityX = 8;
  }
  else if(rand === 3){
    obstacle.x = 250;
    obstacle.y = Math.round(random(200, 350));
    obstacle.lifetime = 220;
     obstacle.addImage(ufo2);
     obstacle.scale = 0.5;
     obstacle.velocityX = 8;
  }
}