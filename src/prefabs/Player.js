class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.gravity.y = 1200;
        this.isSliding = false;
    }

    update() {
        
    }

    reset() {
        console.log("hit");
        this.alive = true;
        this.alpha = 0;
    }

    slide(animation)
    {
        //Enter Slide State
        this.isSliding = true;
        this.anims.play(animation);
        this.setOrigin(0, -1);
        this.body.setSize(this.width, this.height, true);

        this.slideTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: () =>
            {
                if (this.isSliding)
                {
                    this.exitSlide();
                }
            },
            callbackScope: this,
            loop: false
        });
    }

    exitSlide()
    {
        //Exit Slide State
        this.isSliding = false;
        this.anims.play('playerRun');
        this.setOrigin(0, 0);
        this.body.setSize(this.width, this.height, true);
    }

    
}