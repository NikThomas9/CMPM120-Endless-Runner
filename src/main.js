

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene:  [Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    }
};
<<<<<<< HEAD
=======

>>>>>>> a97da50564c93e95745ced56593a069e0b73962d

let game = new Phaser.Game(config);



let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

<<<<<<< HEAD
let keyUP, keyR, keyS;
=======
let keyUP, keyR;
>>>>>>> a97da50564c93e95745ced56593a069e0b73962d

let score = 0;
let highScore = 0;