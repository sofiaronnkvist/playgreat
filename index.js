const app = new PIXI.Application({
  width: 800,
  height: window.innerHeight,
  backgroundColor: 0x2980b9,
  antialias: true,
});

document.body.appendChild(app.view);

let sceneWidth = app.screen.width / 30;

//Start page
const startPage = new PIXI.Container();
app.stage.addChild(startPage);

const introscene = new PIXI.Sprite.from('/images/introscene.png');
startPage.addChild(introscene);
introscene.width = 800;
introscene.height = 800;
introscene.buttonMode = true;
introscene.interactive = true;
introscene.on('click', startClick);

function startClick() {
  gameOverScreen.visible = false;
  startPage.visible = false;
  stage.visible = true;
  gameLoop();
  startPins();
}

//Game page
const stage = new PIXI.Container();
stage.visible = false;
app.stage.addChild(stage);

const sewingMachineBackground = new PIXI.Sprite.from(
  '/images/sewing-machine.png'
);
sewingMachineBackground.width = app.screen.width;
sewingMachineBackground.height = 510;
sewingMachineBackground.width = 670;
sewingMachineBackground.position.x = 113;
stage.addChild(sewingMachineBackground);

//The left hand
const lefthand = new PIXI.Sprite.from('/images/lefthand.svg');
lefthand.scale.x = 1.5;
lefthand.scale.y = 1.5;

//The right hand
const righthand = new PIXI.Sprite.from('/images/righthand.svg');
righthand.scale.x = 1.5;
righthand.scale.y = 1.5;
righthand.position.x = stage.width / 1.45;

//The needle
const needle = new PIXI.Sprite.from('/images/needle.svg');
needle.scale.x = 0.1;
needle.scale.y = 0.1;
needle.position.x = stage.width / 1.96;

//Animating the needle
app.ticker.add(animate);
let delta = 0;

function animate() {
  delta += 0.1;

  needle.y = 380 + Math.sin(delta) * 8;
}

//The fabric
const fabric = new PIXI.Sprite.from('/images/textile.png');
fabric.width = 520;
fabric.height = 440;
fabric.anchor.x = 0.002;
fabric.position.y = 420;

stage.addChild(fabric);
stage.addChild(lefthand);
stage.addChild(righthand);
stage.addChild(needle);

// GameLoop
let pins = [];

function gameLoop() {
  app.render(stage);

  if (rectsIntersect(lefthand, needle) || rectsIntersect(righthand, needle)) {
    gameOverScreen.visible = true;
    stage.visible = false;
    startPage.visible = false;
  }
  pins.forEach((element) => {
    if (rectsIntersect(element, needle)) {
      gameOverScreen.visible = true;
      stage.visible = false;
      startPage.visible = false;
    }
  });
  requestAnimationFrame(gameLoop);
  timePlayed();
}

//Interval to create a new pin
function startPins() {
  setInterval(() => {
    const aNewPin = createPin();
    pins.push(aNewPin);
  }, 1000);
}

//Interval to remove a pin if it gets to the top
setInterval(() => {
  pins.forEach((el) => {
    if (el.y < 420) {
      const oldPin = pins.shift();
      stage.removeChild(oldPin);
    }
    el.y -= 12;
  });
}, 100);

//Function to create a new pin
let pinImage;

function createPin() {
  let xNum = randomInt(260, 450);

  let y = 660;

  pinImage = new PIXI.Sprite.from('/images/pins.png');
  pinImage.anchor.x = 0.5;
  pinImage.anchor.y = 0.5;
  pinImage.width = 50;
  pinImage.height = 50;

  pinImage.position.x = xNum;
  pinImage.position.y = y;

  stage.addChild(pinImage);

  return pinImage;
}

//Function to create a random number
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Winning the game scene
const finalScene = new PIXI.Container();
const winningScene = new PIXI.Sprite.from('/images/finalscene.png');
winningScene.width = 800;
winningScene.height = 800;
finalScene.visible = false;
winningScene.buttonMode = true;
winningScene.interactive = true;
finalScene.addChild(winningScene);
app.stage.addChild(finalScene);
winningScene.on('click', onClick);

function timePlayed() {
  setTimeout(() => {
    finalScene.visible = true;
    gameOverScreen.visible = false;
    stage.visible = false;
    startPage.visible = false;
  }, 60000);
}

// Game over screen
const gameOverScreen = new PIXI.Container();
gameOverScreen.visible = false;
app.stage.addChild(gameOverScreen);

const gameover = new PIXI.Sprite.from('/images/gameoverscene.png');
gameover.width = 800;
gameover.height = 800;
gameover.buttonMode = true;
gameover.interactive = true;
gameOverScreen.addChild(gameover);
gameover.on('click', onClick);

function onClick() {
  location.reload();
}

//Function to check if the needle and pins or hands collide
function rectsIntersect(a, b) {
  let aBox = a.getBounds();
  let bBox = b.getBounds();

  return (
    aBox.x + aBox.width > bBox.x &&
    aBox.x < bBox.x + bBox.width &&
    aBox.y + aBox.height > bBox.y &&
    aBox.y < bBox.y + bBox.height
  );
}

//Function to move the hands, fabric and pins
// 37 is left, 39 is right
document.addEventListener('keydown', keystroke);
lefthand.position.y = 400;
righthand.position.y = 400;
function keystroke(key) {
  if (key.keyCode === 37) {
    if (lefthand.position.x != 0) {
      lefthand.position.x -= sceneWidth;
      righthand.position.x -= sceneWidth;
      fabric.position.x -= sceneWidth;
      pins.forEach((el) => {
        el.position.x -= sceneWidth;
      });
    }
  }
  if (key.keyCode === 39) {
    if (lefthand.position.x != app.screen.Width - sceneWidth) {
      lefthand.position.x += sceneWidth;
      righthand.position.x += sceneWidth;
      fabric.position.x += sceneWidth;
      pins.forEach((el) => {
        el.position.x += sceneWidth;
      });
    }
  }
}
