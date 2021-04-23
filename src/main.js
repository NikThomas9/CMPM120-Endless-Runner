let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene:  [Play],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    }
};


let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUP;

let gameOver;