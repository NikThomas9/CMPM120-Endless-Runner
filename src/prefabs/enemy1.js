class enemy1 extends Enemy
{
    constructor(scene, x, y, texture, frame, enemyGroup){
        super(scene, x, y, texture, frame, enemyGroup);
        this.body.gravity.y = -150;

    }

    update(){
        super.update();

    }

    reset() {
        super.reset();
        
    }

    setSpeed()
    {
        this.body.setVelocityX(-500);
        this.body.setVelocityY(0);

    }
}