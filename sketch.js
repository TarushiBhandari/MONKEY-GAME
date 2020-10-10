//creating global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;
var PLAY= 1;
var END= 0;
var gameState= 1;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  //creating groups
  bananaGroup= createGroup();
  obstacleGroup= createGroup();
  
  //creating sprite for the monkey
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale= 0.1;
  
  //creating sprite for the ground
  ground= createSprite(400,350,900,10);
  ground.velocityX= -4;
  ground.x= ground.width/2;
 
}

function draw() {

     //changing background color
     background("green");
  
     //if ground goes out of boundary reset it at half of canvas' width
     if (ground.x < 0){
         ground.x = ground.width/2;
     }
  
    //colliding monkey with the ground
    monkey.collide(ground);
  
    //if gameState= play, do the following
    if(gameState===PLAY){
       food();
       stones();
    
      
    //if space key is pressed and monkey is on the groundthen only jump the monkey
    if(keyDown("space")&&monkey.y>=314.3){
       monkey.velocityY= -18;
     }
   
    //adding gravity to the monkey
    monkey.velocityY= monkey.velocityY+1;
    
    //if minkey touches the banana group, it should be detroyed
    if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
     }
    
    //if monkey touches the obstacle group, gameState= END
    if(monkey.isTouching(obstacleGroup)){
      gameState= END;
    }
    
    //showing the survival time
    stroke("white");
    textSize (20);
    fill("white");
    text("score:"+score, 500,50);

    stroke("black");
    textSize (20);
    fill("black");
    survivalTime= Math.ceil(frameCount/frameRate());
    text("Survival Time:"+ survivalTime, 100,50);
  
  }
    //if gameState= end, do the following
    if(gameState===END){
    
    //destroy both groups and set their velocity 0
    bananaGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    
    //make the monkey and survival time invisible
    monkey.visible= false;
    survivalTime.visible= false;
    
    //display a game over message
    fill("yellow");
    text("GAME OVER", 170,200);
  }
  
  drawSprites();
}

function food(){
  
  //create bananas after every 80 frames
  if(frameCount%80===0){
    banana= createSprite(350,100,1,1);
    banana.addImage(bananaImage);
    
    //creating bananas at random y positions
    banana.y= Math.round(random(120,200));
    bananaGroup.add(banana);
    banana.velocityX= -5;
    banana.scale= 0.1;
    banana.lifetime= 120;
  }
}

function stones(){
  
  //create stones after every 300 frames
  if(frameCount%300===0){
    stone= createSprite(300,320,10,10);
    stone.addImage(obstacleImage);
    obstacleGroup.add(stone);
    stone.velocityX= -4;
    stone.scale= 0.13;
  }
}