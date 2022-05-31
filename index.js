// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// // and the root stage PIXI.Container
// const app = new PIXI.Application({
//   backgroundColor: 0x2980b9,
//   width: window.innerWidth - 4,
//   height: window.innerHeight - 4,
// });

// The application will create a canvas element for you that you
// can then insert into the DOM
// document.body.appendChild(app.view);

//Alias for PIXI-functions
let Container = PIXI.Container,
  application = PIXI.Application,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  TextureCache = PIXI.utils.TextureCache,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  Loader = PIXI.Loader.shared,
  resources = PIXI.loader.resources;

const app = new application({
  backgroundColor: 0x2980b9,
  width: window.innerWidth - 4,
  height: window.innerHeight - 4,
});

document.body.appendChild(app.view);

const loader = Loader;

let pin;
let needle;
let container;
let pinImage;
let state = play;

setup();

function setup() {
  loader
    .add('sewingMachine', 'images/sewing-machine.png')
    .add('needle', 'images/needle.svg')
    .add('lefthand', 'images/lefthand.svg')
    .add('righthand', 'images/righthand.svg')
    .add('pin', 'images/pins.png')
    .load((loader, resources) => {
      const sewingMachine = new Sprite(resources.sewingMachine.texture);
      const needle = new Sprite(resources.needle.texture);
      const lefthand = new Sprite(resources.lefthand.texture);
      const righthand = new Sprite(resources.righthand.texture);
      const pin = new Sprite(resources.pin.texture);

      container = new Container();
      let gameScene = new Container();
      app.stage.addChild(gameScene);
      let gameOverScene = new Container();
      app.stage.addChild(gameOverScene);

      gameOverScene.visible = false;

      gameScene.addChild(sewingMachine);
      gameScene.addChild(needle);
      gameScene.addChild(lefthand);
      gameScene.addChild(righthand);

      //Hur ta bort den stora nålen!!
      container.addChild(pin);
      gameScene.addChild(container);

      sewingMachine.scale.x = 0.7;
      sewingMachine.scale.y = 0.7;

      //animate the needle
      needle.scale.x = 0.08;
      needle.scale.y = 0.08;
      app.ticker.add(animate);
      let delta = 0;

      function animate() {
        delta += 0.8;

        needle.y = 555 + Math.sin(delta) * 8;
      }

      lefthand.scale.x = 1.5;
      lefthand.scale.y = 1.5;

      righthand.scale.x = 1.5;
      righthand.scale.y = 1.5;

      pin.scale.x = 0.07;
      pin.scale.y = 0.07;

      container.width = 250;
      container.height = 250;

      sewingMachine.x = gameScene.width / 4;
      sewingMachine.y = gameScene.height / 2;

      needle.x = gameScene.width / 2.07;
      needle.y = gameScene.height / 1.2;

      lefthand.x = gameScene.width / 4;
      lefthand.y = gameScene.height / 2.5;

      righthand.x = gameScene.width / 1.7;
      righthand.y = gameScene.height / 2.5;

      container.x = gameScene.width / 3;
      container.y = gameScene.width / 3;

      state = play;
      gameLoop();
    });
}

const fps = 12;

//setinterval-finction här istället
function draw() {
  setTimeout(function () {
    requestAnimationFrame(gameLoop);
  }, 4000 / fps);
}

function gameLoop() {
  draw();

  // requestAnimationFrame(gameLoop);
  state();
}
let pins = [];

function play() {
  //All the game logic goes here
  /*   document.addEventListener('keypress', function (e) {

  };


} */

  // renderer.render(stage);

  const pin = createPin();
  pins.push(pin);

  pins.forEach((el) => {
    el.y -= 8;
  });

  if (rectsIntersect(pin, needle)) {
    state = end();
  } else if (rectsIntersect(needle, lefthand)) {
    state = end();
  } else if (rectsIntersect(needle, righthand)) {
    state = end();
  }
}

function end() {
  //All the code that should run at the end of the game goes here
  gameScene.visible = false;
  gameOverScene.visible = true;
}
/* app.stage.addChild(gameOverScene);

const style = new PIXI.Text({
  fontFamily: '',
  fill: ['#'],
  fontSize: ,
});

const text = 'Game over';
const textStyle = new PIXI.Text(text, style);
gameOverScene.addChild(textStyle);
textStyle.x = 200;
textStyle.y = 150;


function onClick() {
  gameOverScene.visible = false;
  stage.visible = true;
  
} */

// function rectsIntersect(a, b) {
//   //A function that checks if sprites intersect
//   let aBox = a.getBounds();
//   let bBox = b.getBounds();

//   return aBox.x + aBox.width > bBox.x &&
//   aBox.x < bBox.x + bBox.width &&
//   aBox.y + aBox.height > bBox.y &&
//   aBox.y < bBox.y + bBox.height;
// }

function createPin() {
  let xNum = randomInt(50, 150);
  console.log(xNum);

  let y = 120;

  pinImage = new Sprite(resources.pin.texture);
  pinImage.anchor.x = 0.5;
  pinImage.anchor.y = 0.5;
  pinImage.width = 15;
  pinImage.height = 15;

  pinImage.x = xNum;
  pinImage.y = y;

  container.addChild(pinImage);

  return pinImage;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//sprite1.mask = sprite2 overlapping pins över symaskin??
