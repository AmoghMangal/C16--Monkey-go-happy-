var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":12,"version":"_sa2ifFCzUoKu9j4FZbvL18maW_oxvmO","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"Eh3GCZSM65DbdVZJZapn3R1GfqkRGBqS","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"fwok02hmos7aLUob8ono1gxHIzILuLHd","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var PLAY=1;
var END=0;
var gamestate=1;
   
//creating the monkey sprite
var monkey=createSprite(30,342,20,50);
monkey.setAnimation("monkey");
monkey.scale=0.1;
monkey.x=50;

//create a ground sprite
var ground = createSprite(400,370,800,10);
ground.x = ground.width /2;

//create Obstacle 
var ObstaclesGroup = createGroup();
var bananaGroup = createGroup();

//score
var SurvivalTime=0;

var gameOver = createSprite(120,200);
gameOver.setAnimation("textGameOver_1");
gameOver.scale = 0.6;
gameOver.visible = false;


function draw() {  
background(255);
//display the survival time

console.log(gamestate);


if (gamestate===PLAY){
  
   stroke("black");
   textSize(20);
   fill("black");
    ground.velocityX = -(6 +3*SurvivalTime/100);
   SurvivalTime =SurvivalTime+ Math.ceil(World.frameRate/60);
    text("Survival Time:"+SurvivalTime,200,40);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && monkey.y>250 ){
      monkey.velocityY = -12 ;
      
    }
    //add gravity
  monkey.velocityY = monkey.velocityY + 01; 
}
 //monkey collide with the ground
 
   monkey.collide(ground);
  createObstacles();
  createBananas();
  
 if (bananaGroup.isTouching(monkey)){
 bananaGroup.destroyEach();
 }
 //End the game when trex is touching the obstacle
    if(ObstaclesGroup.collide(monkey)){
      gamestate = END;
     
    }
  
else if(gamestate === END) {
     //set velcity of each game object to 0
    gameOver.visible=true;
     ground.velocityX = 0;
    monkey.velocityX = 0;
    ObstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
   
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
 }

if(mousePressedOver(gameOver)) {
    reset();
  


}

drawSprites();    
  
}

function reset(){
 gamestate=PLAY;
 gameOver.visible=true;
 ObstaclesGroup.destroyEach();
bananaGroup.destroyEach();
 SurvivalTime=0;


 
}

function createObstacles() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,362,10,40);
    obstacle.velocityX = - (2+ 1*SurvivalTime/100);
    
    //generate random obstacles
    obstacle.setAnimation("Stone");
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function createBananas() {
 if (World.frameCount % 80 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = randomNumber(200,240);
    banana.setAnimation("Banana");
   banana.scale = 0.07;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
   
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}





  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
