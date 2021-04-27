class enemy1 extends Enemy
{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setVelocityX(-700);
    }

    update(){
        super.update();
    }

    reset() {
        super.reset();
        
    }
}