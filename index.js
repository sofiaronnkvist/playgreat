// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
  backgroundColor: 0x2980b9,
  width: window.innerWidth,
  height: window.innerHeight,
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader
  .add('sewingMachine', 'images/sewing-machine.png')
  .add('lefthand', 'images/lefthand.svg')
  .add('righthand', 'images/righthand.svg')
  .add('container', 'images/righthand.svg')
  .add('pin', 'images/pins.png')
  .load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const sewingMachine = new PIXI.Sprite(resources.sewingMachine.texture);
    const lefthand = new PIXI.Sprite(resources.lefthand.texture);
    const righthand = new PIXI.Sprite(resources.righthand.texture);
    const container = new PIXI.Container();
    const pin = new PIXI.Sprite(resources.pin.texture);

    pin.width = 50;
    pin.height = 50;
    container.width = 250;
    container.height = 250;
    /*  container.style.backgroundColor = 0xff0000; */

    container.addChild(pin);
    app.stage.addChild(container);

    sewingMachine.scale.x = 0.7;
    sewingMachine.scale.y = 0.7;

    lefthand.scale.x = 1.5;
    lefthand.scale.y = 1.5;

    righthand.scale.x = 1.5;
    righthand.scale.y = 1.5;

    pin.scale.x = 0.07;
    pin.scale.y = 0.07;

    // Setup the position of the sewingMachine
    sewingMachine.x = app.renderer.width / 2;
    sewingMachine.y = app.renderer.height / 4;

    lefthand.x = app.renderer.width / 4;
    lefthand.y = app.renderer.height / 2.5;

    righthand.x = app.renderer.width / 1.7;
    righthand.y = app.renderer.height / 2.5;

    /*   pin.x = app.renderer.width / 2.5;
    pin.y = app.renderer.width / 2.5; */

    container.x = app.renderer.width / 3;
    container.y = app.renderer.width / 3;

    // Rotate around the center
    sewingMachine.anchor.x = 0.5;
    sewingMachine.anchor.y = 0.4;

    // Add the sewingMachine to the scene we are building
    app.stage.addChild(sewingMachine);
    app.stage.addChild(lefthand);
    app.stage.addChild(righthand);
    /* app.stage.addChild(pin); */

    // Listen for frame updates
    app.ticker.add(() => {
      // each frame we spin the heart around a bit
      // heart.rotation += 0.01;
    });
    /*    let container = new PIXI.Container();
    let pin = new PIXI.Sprite.from('images/pins.png'); */
    function gameLoop() {
      requestAnimationFrame(gameLoop);
      pin.y += 1;

      renderer.render(stage);
    }
    gameLoop();
  });

// function setup() {

//   lefthand = new Sprite(id["images/lefthand.svg"]);
//   gameScene.addChild(lefthand);

//   gameScene = new Container();
//   stage.addChild(gameScene);
//   gameOverScene = new Container();
//   stage.addChild(gameOverScene);

//   gameOverScene.visible = false;

//   state = play;

// }

// function play() {
//   //All the game logic goes here
// }
// function end() {
//   //All the code that should run at the end of the game goes here
// }
