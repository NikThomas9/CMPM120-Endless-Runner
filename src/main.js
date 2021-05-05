// Running Late! //
//
// Completed on 5/4/21
//
//
// CREDITS //
//
// Created by: 
// Niklas Thomas - Programming
// Stevie Rodriguez - Art, Sound
// Sreevani Suvarna - Sound, Programming
//
// Music by:
// Autumn Moulios 
// Link: https://soundcloud.com/strawberry-moondae/neverending
//
// Sound Effects:
// Jumping Sound Effect
// Stevie Rodriguez
//
// Collision Sound Effect
// Daniel Lucas
// Link: https://freesound.org/people/danlucaz/sounds/500283/
//
//
// CREATIVE TILT //
//
// Technical Aspects:
//
// Probably the most impressive technical system in our game is the enemy spawning system.
// By using a group collider and a small update() per enemy instance, the system is
// efficient and has good performance.
//
// In addition to that, the enemy class uses inheritance to spawn three different enemy types:
// the hydrant, bird and vending machine. Despite being very different types of obstacles,
// this system uses overriding and superclass inheritance to keep enemy functionality
// organized and similar yet unique for each class.
//
// Finally, due to randomization and a procedural way to track the background and level length,
// the game works well in the endless format. The constantly changing background and random enemy 
// patterns prevent stagnation, and the levels get slightly harder to beat each time, making
// later levels more difficult to beat due to their length.
//
// Style and Creative Goals:
//
// The creative intent of Running Late! was to provide a fun backstory
// to justify the mechanics of the endless runner genre. Rather than
// simply avoiding enemies, the goal of Running Late! is to reach
// your workplace on time while avoiding the many everyday obstacles on your route.
// 
// The mechanics of this game are simplistic and easy to pick up to ensure that the game
// is accessible. The game is based around procedurally generated obstacles, with both
// the timer and enemy type being random every spawn. To add more variety to these random spawns,
// a bird obstacle was created that must be slid under using the slide mechanic.
// To make sure the game didn't feel too repetitive, we also added a level system with different backgrounds
// as well as a goal (reaching the building). This helped strengthen our narrative and give a conclusion
// while still keeping the game theoretically endless.
//
// Overall, Running Late! is simplistic and on the easier side, but its intended draw is the
// unique narrative, cute and colorful scenery, and simplistic but responsive controls.

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    fps: {
        target: 60,
        forceSetTimeOut: true,
    },
    scene:  [Menu, Intro1, Intro2, Intro3, Play, Success, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false,
            fps: 60,
        },
    }
};

let game = new Phaser.Game(config);

let music;

let pointsToWin = 5;
let startingPoints = 5;

let levelNumber = 1;


let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUP, keyR, keyS, keyDown, keyRight;

let score = 0;
let highScore = 0;

let citySprite;
