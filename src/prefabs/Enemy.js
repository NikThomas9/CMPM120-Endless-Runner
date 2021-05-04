class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, enemyGroup){
        super(scene, x, y, texture, frame, enemyGroup);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBody();

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
        this.setVisible(false);
        this.destroy();
        this.alive = false;
    }

    setSpeed()
    {
        this.body.setVelocityX(-500);
    }

    setBody()
    {
        this.body.setSize(this.width, this.height, true);
    }

}
