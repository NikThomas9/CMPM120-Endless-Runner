class enemy1 extends Enemy
{
    constructor(scene, x, y, texture, frame, enemyGroup){
        super(scene, x, y, texture, frame, enemyGroup);
    }

    update(){
        super.update();
    }

    reset() {
        super.reset();
        
    }

    setSpeed()
    {
        this.body.setVelocityX(-700);
    }
}