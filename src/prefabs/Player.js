  
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.gravity.y = 1000;
    }

    update() {
        
    }

    reset() {
        this.alpha = 0;
        this.alive = false;
    }
}