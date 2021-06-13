var PLAY = 1;
var END = 0;
var gameState = 1;

var chk = [];
var score = 0;
var basket, egg, stick, Brokenegg, eggGrp, gameOverImg, retry, gameOver, egg;

function preload(){
  chkImg = loadImage("images/chk3.png");
  bg = loadImage("images/bg.png");
  stickImg = loadImage("images/log1.jpg");
  eggImg = loadImage("images/egg.png");
  basketImg = loadImage("images/basket.png");
  basket2 = loadImage("images/image.png");
  basket3 = loadImage("images/image1.png");
  basket4 = loadImage("images/image2.png");
  basket5 = loadImage("images/image3.png");
  basket6 = loadImage("images/image4.png");
  basket7 = loadImage("images/image5.png");
  basket8 = loadImage("images/image6.png");
  basket9 = loadImage("images/image7.png");
  basket10 = loadImage("images/image8.png");
  loseImg = loadImage("images/lose.png");
  winImg = loadImage("images/win.png");
  tryAgainImg = loadImage("images/retry.png");
  gameOSound = loadSound("gameOver.mp3");
  BrokenEgg = loadImage("images/eggBroken.png");
  goldEggImg = loadImage("images/goldenEgg.png");
  missileImg = loadImage("images/missile.png");
  explosion = loadSound("explosion.mp3");
}

function setup() {
  createCanvas(800,650);
  stick = createSprite(400, 100);
  stick.addImage("sticks", stickImg);
  stick.scale = 2;

  basket = createSprite(400, 550);
  basket.addImage("baskets",basketImg);
  basket.scale = 0.35
  basket.debug = true;

  retry = createSprite(400, 450);
  retry.addImage("retrys", tryAgainImg);
  retry.scale = 0.3;

  gameOver = createSprite(400, 300);
  gameOver.scale =1.5;

  invi = createSprite(400, 590, 800, 1);
  invi.visible = false;

  // createEdgesSprite()
  eggGrp = new Group();
  GeggGrp = new Group();
  MisG = new Group();
}

function draw() {
  background(bg); 

  if(gameState === PLAY){
  spawnEggs();
  spawnGEggs();
  spawnMissiles();

  eggGrp.collide(invi, eggBreak);
  eggGrp.isTouching(basket, collides);
  
  if(MisG.isTouching(basket)){
    gameState = END;
    eggGrp.destroyEach();
    GeggGrp.destroyEach();
    MisG.destroyEach();
    explosion.play();
  }
setTimeout(() =>{
  gameState = END;
    // gameOSound.play();
    eggGrp.destroyEach();
    GeggGrp.destroyEach();
    console.log(gameState);
},30000)

  if(eggGrp.isTouching(invi)){
  // eggGrp.addImage(BrokenEgg);
    score -=0.5;
  }

  if(GeggGrp.isTouching(invi)){
    // eggGrp.addImage(BrokenEgg);
      score -=1;
    }

  // if(eggGrp.y >= 540){
  //   egg.addImage("egg2", BrokenEgg);
  //   score -=2;
  // }

  retry.visible = false;
  gameOver.visible = false;

  pos = 110;
  for(i=0; i<4; i++){
    chk[i] = createSprite(pos, 60);
    chk[i].addImage("chks", chkImg);
    chk[i].scale = 0.9;
    pos = pos+190;
  }

  if(eggGrp.isTouching(basket)){
    score += 1;  
    eggGrp.destroyEach();
     eggGrp.collide(basket, collides);
  }

  if(GeggGrp.isTouching(basket)){
    score += 3;  
    GeggGrp.destroyEach();
  }  
  // if(frameCount%200===0){//30sec 510
  //   // gameState = END;
  //   // // gameOSound.play();
  //   // eggGrp.destroyEach();
  //   // console.log(gameState);
  // }

  basket.x = mouseX;
  // switch(score){
  //   case 1: basket.addImage("basket", basket2);
  //   break;
  //   case 2: basket.addImage("basket",basket3);
  //   break;
  //   case 3: basket.addImage("basket",basket4);
  //   break;
  //   case 4: basket.addImage("basket",basket5);
  //   break;
  //   case 5: basket.addImage("basket",basket6);
  //   break;
  //   case 6: basket.addImage("basket",basket7);
  //   break;
  //   case 7: basket.addImage("basket",basket8);
  //   break;
  //   case 8: basket.addImage("basket",basket9);
  //   break;
  //   case 9: basket.addImage("basket",basket10);
  //   break;
  //   default: basket.addImage("basket",basket10);
  //   break;
  // }
  // if(score === 1){
  //   basket.addImage(basket2);
  // }else if(score === 2){
  //   basket.addImage(basket3);
  // }else if(score === 3){
  //   basket.addImage(basket4);
  // }else if(score === 4){
  //   basket.addImage(basket5);
  // }else if(score === 5){
  //   basket.addImage(basket6);
  // }else if(score === 6){
  //   basket.addImage(basket7);
  // }else if(score === 7){
  //   basket.addImage(basket8);
  // }else if(score === 8){
  //   basket.addImage(basket9);
  // }else if(score > 8){
  //   basket.addImage(basket10);
  // }
  }

  if(gameState === END){
    retry.visible = true;
    gameOver.visible = true;
    eggGrp.setVelocityYEach(0);
    GeggGrp.setVelocityYEach(0);
    if(score >= 22){// increase it
      gameOver.addImage("wins", winImg);
    } else{
      gameOver.addImage("lose", loseImg);
    }
    if(mousePressedOver(retry)){
      reset();
    }
  }

  stroke("blue");
  strokeWeight(3)
  textSize(30);
  fill("turquoise");
  text("Score: "+ score, 10, 180);

  drawSprites();
}

function collides(egg, basket){
   egg.collide(basket);
   changeImage("br", BrokenEgg)
  console.log("egg")
 }

function eggBreak(egg, invi){
  egg.addImage("sdcd", BrokenEgg);
  console.log("break")
  // egg.velocityY = 0;
}

function reset(){
  clear();
  console.log("retry");
  gameState = PLAY;
  score = 0;
  retry.visible = false;
  gameOver.visible = false;
  eggGrp.destroyEach();
  GeggGrp.destroyEach();
}

function spawnEggs(){
  if(frameCount%50===0){
    egg = createSprite(random(100, 780), 70);
    egg.addImage("eggs", eggImg);
    egg.scale = 0.15;
    egg.velocityY = (15+(score/2));
    basket.depth = egg.depth;
    egg.depth = egg.depth+1;
    eggGrp.add(egg);
  }
}

function spawnGEggs(){
  if(frameCount%110===0){
    var Gegg = createSprite(random(100, 780), 70);
    Gegg.addImage("gEggs", goldEggImg);
    Gegg.scale = 0.15;
    Gegg.velocityY = (15+(score/2));
    GeggGrp.add(Gegg);
  }
}

function spawnMissiles(){
  if(frameCount%80===0){
    var mis = createSprite(random(100, 780), 70);
    mis.addImage("mis", missileImg);
    mis.scale = 0.2;
    mis.velocityY = (15+(score/2));
    MisG.add(mis);
  }
}