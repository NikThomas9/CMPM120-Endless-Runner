class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()
    {
        //Load Sprites
        this.load.image('player', 'assets/PlayerTest.png');
        this.load.image('enemy1', 'assets/obstacle1.png');
        this.load.image('enemy2', 'assets/obstacle2.png');
        this.load.image('enemy3', 'assets/obstacle3.png');
        this.load.image('cityscape', 'assets/CityBG.png');
    }

    create()
    {
        //Debug BG Asset
        this.cityscape = this.add.tileSprite(
            0,
            0,
            game.config.width,
            game.config.height,
            'cityscape',
            ).setOrigin(0,0);

        //Ground Physics Collider
        this.ground = this.add.rectangle(
            0,
            borderUISize * 15,
            game.config.width,
            borderUISize * 2.5,
            0x917dd4,
            0
            ).setOrigin(0,0);     
            
        //Set starting score to 0
        score = 0;

        //Display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#917dd4',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreText = this.add.text(borderUISize + borderPadding/2, borderUISize + borderPadding/2, score, scoreConfig);

        this.player = new Player(
            this,
            game.config.width/10,
            borderUISize*10,
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

        //Create Enemy Group
        this.enemyGroup = this.physics.add.group();
        this.physics.add.collider(this.enemyGroup, this.ground);
        this.physics.add.collider(
            this.player,
            this.enemyGroup, 
            () =>
            {
                this.gameOver = true;
                this.player.alive = false;
            });

        this.enemyTypes = ["enemy1", "enemy2", "enemy3"];


        //Main Spawn System
        this.spawnClock = this.time.addEvent({

            delay: Phaser.Math.Between(2000, 3000),
            callback: () =>
            {
                //Spawn enemy if the game is still active
                if (!this.gameOver)
                {
                    //create a new enemy
                    switch (this.enemyTypes[Phaser.Math.Between(0, 2)]) {
                        case "enemy1":
                            this.spawn = new enemy1(this, game.config.width - 10, borderUISize*10.5, 'enemy1', null, this.enemyGroup).setOrigin(0, 0.0);
                            break;
                            
                        case "enemy2":
                            this.spawn = new enemy2(this, game.config.width - 10, borderUISize*10.5, 'enemy2', null, this.enemyGroup).setOrigin(0, 0.0);
                            break;

                        case "enemy3":
                            this.spawn = new enemy3(this, game.config.width - 10, borderUISize*10.5, 'enemy3', null, this.enemyGroup).setOrigin(0, 0.0);
                            break;
                    }

                    //Update delay 
                    this.spawnClock.delay = Phaser.Math.Between(2000, 3000);
                } 
            },
            callbackScope: this,
            loop: true
        });
    }

    update()
    {
        this.scoreText.text = score;

        //If game over, check input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {  
            this.scene.restart();
        }

        if (!this.gameOver)
        {
            //Update scroll BG
            this.cityscape.tilePositionX += 3;

            // Jump
            if (Phaser.Input.Keyboard.JustDown(keyUP) && this.player.body.touching.down)
            {
                this.player.body.setVelocityY(-650);
            }
            
            if (this.enemyGroup.getLength() != 0)
            {
                this.enemyGroup.getChildren().forEach(enemy => enemy.update());
            }

            //Advance to Next Level
            if (score >= pointsToWin)
            {
                this.scene.start("successScene");
                pointsToWin += 5;
                levelNumber++;
            }
        }
        else
        {
            //Update high score
            if (score > highScore)
            {
                 highScore = score;
            }

            if (this.player.alive == false)
            {
                let gameoverConfig = {
                    fontFamily: 'Courier',
                    fontSize: '28px',
                    backgroundColor: '#FFC0CB',
                    color: '#843605',
                    align: 'right',
                    padding: {
                        top: 5,
                        bottom: 5,
                    },
                    fixedWidth: 0
                }
                this.add.text(game.config.width/2, game.config.height/2 - 15, 'Game Over!',gameoverConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 30, 'Press (R) to Restart',gameoverConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 75, 'HIGH SCORE: ' + highScore,gameoverConfig).setOrigin(0.5);
                
                this.player.reset();
                this.enemyGroup.getChildren().forEach(enemy => enemy.reset());

                levelNumber = 1;
                pointsToWin = startingPoints;
            }

        }
    }
}