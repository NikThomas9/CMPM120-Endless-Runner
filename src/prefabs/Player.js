  
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.alive = true;
    }

    update() {
        
    }

    reset() {
        this.alpha = 0;
        this.alive = false;
    }
}