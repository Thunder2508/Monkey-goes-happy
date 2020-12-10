var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey,monkeyrunning,monkey_collided,monkeyImg;
var ground, invisibleGround, groundImg;

var bananasGroup,bananasImg;
var obstacle,obstacleImg;

var score;

function preload(){
  monkeyImg=loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  groundImg = loadImage("ground2.png");  
  obstacle = loadImage("obstacle.png");
  bananasImg=loadImage("banana.png");
}
function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,160,20,50);
  //monkey.addAnimation(monkey_0.png,monkey_1.png,monkey_2.png,monkey_3.png);
 // monkey.addAnimation(monkey_4.png,monkey_5.png,monkey_6.png,monkey_7.png,monkey_8.png);

monkey.addAnimation("running",monkeyImg);
  monkey.scale = 0.08;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImg);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnbananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        //trex.velocityY = -12;
        gameState = END;
      
    }
  }
   else if (gameState === END){
     
   
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0);    
     
   }
  
  monkey.collide(invisibleGround);
  
  

  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));      
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var bananas = createSprite(600,120,40,10);
    bananas.y = Math.round(random(80,120));
    bananas.addImage(bananasImg);
    bananas.scale = 0.05;
    bananas.velocityX = -3;
    
   bananas.lifetime = 200;
    
   
   bananas.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananasGroup.add(bananas);
  }
}






