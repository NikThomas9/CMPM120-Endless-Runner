class enemy3 extends Enemy
{
    constructor(scene, x, y, texture, frame, enemyGroup){
        super(scene, x, y, texture, frame, enemyGroup);

        this.body.setSize(this.width - 10, this.height - 5, true);
    }

    update(){
        super.update();
    }

    reset() {
        super.reset();
    }

    setSpeed()
    {
        this.body.setVelocityX(-400);
    }
}