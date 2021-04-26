class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update(){
        if(this.x <= 0 - this.width && this.alive)
        {
            this.reset();
            score++;
        }  
    }

    reset() {
        this.destroy();
        this.alive = false;
    }

    spawn()
    {
        this.alive = true;

        this.x = game.config.width - 10;
        this.y = borderUISize*10.5;

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(-500);
    }
}
