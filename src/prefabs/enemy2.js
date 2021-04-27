class enemy2 extends Enemy
{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        this.body.setVelocityX(-300);
    }

    update(){
        super.update();
    }

    reset() {
        super.reset();
    }
}