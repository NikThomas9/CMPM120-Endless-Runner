class Building extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(this.width - 150, this.height, true);
        this.body.setVelocityX(-500);
    }

    update(){
    }

    reset() {

    }

    setSpeed()
    {

    }

    setBody()
    {
    }
}
