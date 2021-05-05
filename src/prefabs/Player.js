class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.gravity.y = 1200;
        this.isSliding = false;
        this.isRunning = true;
        this.canSlide = true;
    }

    update() {
        if (this.body.touching.down && !this.isRunning && !this.isSliding)
        {
            this.run();
        }
    }

    reset() {
        this.alive = true;
        this.alpha = 0;
    }

    slide()
    {
        //Enter Slide State
        this.isSliding = true;
        this.isRunning = false;
        this.anims.play('playerSlide');
        this.setOrigin(0, -1);
        this.body.setSize(this.width, this.height, true);

        this.slideTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: () =>
            {
                if (this.isSliding)
                {
                    this.exitSlide(this.slideTimer);
                }
            },
            callbackScope: this,
            loop: false
        });
    }

    jump()
    {
        this.body.setVelocityY(-700);
        this.isRunning = false;

        if (this.isSliding)
        {
            this.exitSlide();
        }

        this.anims.play('playerJump');
        this.setOrigin(0, 0);
        this.body.setSize(this.width, this.height, true);
    }

    exitSlide(slideTimer)
    {
        //Exit Slide State
        if (slideTimer != null)
        {        
            this.slideTimer.remove();
        }

        this.isSliding = false;
        this.canSlide = false;

        this.noSlide = this.scene.time.addEvent({
            delay: 300,
            callback: () =>
            {
                this.canSlide = true;
            },
            callbackScope: this,
            loop: false
        });
    }

    run()
    {
        this.isRunning = true;
        this.isSliding = false;
        this.anims.play('playerRun');
        this.setOrigin(0, 0);
        this.body.setSize(this.width, this.height, true);
    }    
}