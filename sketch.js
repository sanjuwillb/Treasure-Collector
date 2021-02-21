var path,boy,cash,diamonds,jwellery,sword,play,end,endg,res;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg, re, gamestate;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  re =loadImage("restart.png")
  endg = createSprite(200, 150, 1, 1)
  endg.addAnimation("end", endImg)
}

function setup(){
play = 1
end = 0
gamestate = play
createCanvas(400,400);
// Moving background
res = createSprite(200, 250)
res.addImage(re)
res.scale = 0.25
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.05;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
boy.setCollider("rectangle",0,0,1250,1250);
  res.depth = path.depth + 1
}

function draw() {
if (gamestate === play){
  res.visible = false
  endg.visible = false
  boy.x = World.mouseX;
  boy.visible = true
  path.visible = true
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 500
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 250
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gamestate = end
    }
  }
}
if (gamestate === end){
  endg.visible = true
  res.visible = true
  endg.scale = 0.75
  path.visible = false
  cashG.destroyEach();
  diamondsG.destroyEach();
  jwelleryG.destroyEach();
  swordGroup.destroyEach();
  boy.visible = false
  if(mousePressedOver(res)){
    reset();
  }
}
  background(0);
  drawSprites();
  stroke("cyan")
  strokeWeight(4)
  textSize(20);
  fill("lime");
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 4;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
function reset(){
  gamestate = play
  treasureCollection = 0
}