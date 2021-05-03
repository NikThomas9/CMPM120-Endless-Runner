

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    fps: {
        target: 60,
        forceSetTimeOut: true,
    },
    scene:  [Menu, Play, Success],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true,
            fps: 60,
        },
    }
};

let game = new Phaser.Game(config);

game.settings = {
    enemySpeed: 1,
  }

let pointsToWin = 5;
let startingPoints = 5;

let levelNumber = 1;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUP, keyR, keyS, keyDown;

let score = 0;
let highScore = 0;