class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()
    {
        //Load Sprites
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/obstacle1new.png');
    }

    create()
    {
        //Debug BG Asset
        this.add.rectangle(
            0,
            0,
            game.config.width,
            game.config.height,
            0xc3e2eb,
            ).setOrigin(0,0);

        //Debug Ground Asset
        this.ground = this.add.rectangle(
            0,
            borderUISize * 10,
            game.config.width,
            borderUISize * 5,
            0x917dd4,
            ).setOrigin(0,0);

        this.player = new Player(
            this,
            game.config.width/10,
            borderUISize*6.89,
            'player',
        ).setOrigin(0.5, 0);

        // Enable Physics for ground instance
        this.add.existing(this.ground);
        this.physics.add.existing(this.ground);

        // Set world bounds 
        this.ground.body.setCollideWorldBounds(true);
        this.player.body.setCollideWorldBounds(true);        
        
        // Collision between objects with the ground
        this.physics.add.collider(this.player, this.ground);

        // Set game over flag
        this.gameOver = false;

        // Initialize Keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);  
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //Init enemy array
        this.enemyArray = [];

        this.spawnClock = this.time.addEvent({
            delay: 3000,
            callback: () =>
            {
                //Spawn enemy if the game is still active
                if (!this.gameOver)
                {
                    //create a new enemy
                    this.spawn = new Enemy(this, game.config.width - 10, borderUISize*8, 'enemy', 0).setOrigin(0, 0.0);

                    //add local physics colliders to the new object
                    console.log("spawn");
                    this.physics.add.collider(this.ground,this.spawn);
                    this.physics.add.collider(
                        this.player,
                        this.spawn, 
                        () =>
                        {
                            this.gameOver = true;
                            this.player.alive = false;
                        });

                    this.enemyArray.push(this.spawn);
                } 
            },
            callbackScope: this,
            loop: true
        });
    }

    update()
    {
        //If game over, check input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (!this.gameOver)
        {
            // Jump
            if (Phaser.Input.Keyboard.JustDown(keyUP) && this.player.body.touching.down)
            {
                this.player.body.setVelocityY(-650);
            }
            
            if (this.enemyArray.length != 0)
            {
                this.enemyArray.forEach(enemy => enemy.update());
            }
        }
        else
        {
            if (this.player.alive == false)
            {
                this.player.reset();
            }

            this.enemyArray.forEach(enemy => enemy.destroy());
        }
    }
}