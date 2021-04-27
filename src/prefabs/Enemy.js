class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, enemyGroup){
        super(scene, x, y, texture, frame, enemyGroup);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.enemyGroup = enemyGroup
        this.enemyGroup.add(this);   

        this.alive = true;
        this.setSpeed();
    }

    update(){
        if(this.x <= 0 - this.width && this.alive)
        {
            this.reset();
            score++;
        }  
    }

    reset() {

        this.enemyGroup.remove(this);
        this.destroy();
        this.alive = false;
        
        //this.x = game.config.width + 50;
        //this.alpha = 1;
    }

    setSpeed()
    {
        this.body.setVelocityX(-500);
    }

}
