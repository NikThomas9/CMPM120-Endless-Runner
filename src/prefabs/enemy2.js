class enemy2 extends Enemy
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
        
        this.body.setVelocityX(-550);
    }

    setBody()
    {
        this.body.setSize(this.width - 50, this.height - 5, true);
    }
}