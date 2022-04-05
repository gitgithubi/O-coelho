var garden,rabbit,apple,orangeL,redL;
var gardenImg,rabbitImg,carrotImg,orangeImg,redImg;
var folhared, folhaorange, maca;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var pontuacao = "Pontuação: ";
var pontos = 1;

function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  orangeImg = loadImage("orangeLeaf.png");
  redImg = loadImage("redImage.png");
}

function setup() {
 createCanvas(400,400);

 garden = createSprite(200,200);
 garden.addImage(gardenImg);

 rabbit = createSprite(160,340,20,20);
 rabbit.scale = 0.09;
 rabbit.addImage(rabbitImg);

 folhared = new Group(); 

 folhaorange = new Group();

 maca = new Group();
}

function draw() {
  background(0);

  edges = createEdgeSprites();
   
  if (gameState === PLAY) {
    createObstacles();
    rabbit.x = World.mouseX;
    rabbit.collide(edges);
  } else if (gameState === END) {
    rabbit.remove();
    reiniciar();
  }

  if (folhared.isTouching(rabbit)) {
    redL.remove();
    pontos = pontos -1;
    gameState = END;
  } else if (folhaorange.isTouching(rabbit)) {
    orangeL.remove();
    pontos = pontos -1;
    gameState = END;
    } else if (maca.isTouching(rabbit)) {
    apple.remove();
    pontos = pontos +1;
  }

  drawSprites();

  fill("green");
  textFont("Arial");
  textSize(14);
  text(pontuacao + pontos,153,160);

  if (pontos <= 0) {
    gameState = END;
  } 
}

function createObstacles() {
  var select_sprites = Math.round(random(1,3));

  if (frameCount % 80 === 0) {
    if (select_sprites === 1) {
      createApples();
    } else if (select_sprites === 2) {
      createOrange();
    } else if (select_sprites === 3) {
      createRed();
    }
 }
}

function createApples() {
 apple = createSprite(random(50, 350),40, 10, 10);
 apple.addImage(appleImg);
 apple.scale = 0.07;
 apple.velocityY = 3;
 apple.lifetime = 150;
 maca.add(apple);
}

function createOrange() {
 orangeL = createSprite(random(50, 350),40, 10, 10);
 orangeL.addImage(orangeImg);
 orangeL.scale = 0.08;
 orangeL.velocityY = 3;
 orangeL.lifetime = 150;
 folhaorange.add(orangeL);
}

function createRed() {
 redL = createSprite(random(50, 350),40, 10, 10);
 redL.addImage(redImg);
 redL.scale = 0.06;
 redL.velocityY = 3;
 redL.lifetime = 150;
 folhared.add(redL);
}

function reiniciar() {
  if (keyDown("space")) {
    gameState = PLAY;
    rabbit = createSprite(160,340,20,20);
    rabbit.scale = 0.09;
    rabbit.addImage(rabbitImg);
    pontos = pontos +1;
  }
}