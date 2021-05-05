class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()
    {
        //Load Sprites
        this.load.image('cityscapeDay', 'assets/CityBG_day.png');
        this.load.image('cityscapeNight', 'assets/CityBG_night.png');
        this.load.image('building', 'assets/building.png');
        this.load.image('enemy1', 'assets/obstacle_pigeon_air.png');
        this.load.image('enemy2', 'assets/obstacle_vending.png');
        this.load.image('enemy3', 'assets/obstacle_hydrant.png');
    
        this.load.spritesheet('player', 
                              './assets/player_sheet.png', 
                              {frameWidth: 70, frameHeight: 100, startFrame: 0, endFrame: 3});

        this.load.spritesheet('player_jump', 
                              './assets/player_sheet.png', 
                              {frameWidth: 70, frameHeight: 100, startFrame: 0, endFrame: 0});
  

        this.load.spritesheet('player_slide', 
                              './assets/player_slide.png', 
                              {frameWidth: 90, frameHeight: 49, startFrame: 0, endFrame: 0})
        
        this.load.audio('music', 'assets/background.wav');
        this.load.audio('jump', 'assets/jump.wav');
        this.load.audio('collide', 'assets/collide.wav');
    }

    create()
    {
        if (music == null)
        {
            music = this.sound.add('music',
            {
                loop: true
            });
        }

        this.jumpSFX = this.sound.add('jump');
        this.collideSFX = this.sound.add('collide');


        if(!music.isPlaying)
        {
            music.play();
        }

        citySprite = (levelNumber % 2 == 1) ? 'cityscapeDay' : 'cityscapeNight';

        //Debug BG Asset
        this.cityscape = this.add.tileSprite(
            0,
            0,
            game.config.width,
            game.config.height,
            citySprite,
            ).setOrigin(0,0);

        //Ground Physics Collider
        this.ground = this.add.rectangle(
            0,
            borderUISize * 15,
            game.config.width * 2,
            borderUISize * 2.5,
            0x917dd4,
            0
            ).setOrigin(0,0);     
            

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
        ).setOrigin(0.0, 0);

        this.player.depth = 5;

        //Animation config//
        this.anims.create({
            key: 'playerRun',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3, first: 0}),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'playerSlide',
            frames: this.anims.generateFrameNumbers('player_slide', {start: 0, end: 0, first: 0}),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'playerJump',
            frames: this.anims.generateFrameNumbers('player_jump', {start: 0, end: 0, first: 0}),
            frameRate: 15,
            repeat: -1
        });

        this.player.anims.play('playerRun');

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
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        

        //Create Enemy Group
        this.enemyGroup = this.physics.add.group();
        this.physics.add.collider(this.enemyGroup, this.ground);
        this.physics.add.collider(
            this.player,
            this.enemyGroup, 
            () =>
            {
                this.collideSFX.play();
                this.gameOver = true;
                this.player.alive = false;
            });

        this.enemyTypes = ["enemy1", "enemy3"];
        
        if (levelNumber > 1)
        {
            this.enemyTypes.push("enemy2");
            console.log(this.enemyTypes.length);
        }

        //Main Spawn System
        this.spawnClock = this.time.addEvent({

            delay: Phaser.Math.Between(2000, 3000),
            callback: () =>
            {
                //Spawn enemy if the game is still active
                if (!this.gameOver)
                {
                    if (pointsToWin > score)
                    { 
                        //create a new enemy
                        switch (this.enemyTypes[Phaser.Math.Between(0, this.enemyTypes.length)]) {
                            case "enemy1":
                                this.spawn = new enemy1(this, game.config.width - 10, borderUISize*6.5, 'enemy1', null, this.enemyGroup).setOrigin(0, 0.0);
                                break;
                                
                            case "enemy2":
                                this.spawn = new enemy2(this, game.config.width - 10, borderUISize*8.6, 'enemy2', null, this.enemyGroup).setOrigin(0, 0.0);
                                break;

                            case "enemy3":
                                this.spawn = new enemy3(this, game.config.width - 10, borderUISize*9.5, 'enemy3', null, this.enemyGroup).setOrigin(0, 0.0);
                                break;
                        }

                        //Update delay 
                        this.spawnClock.delay = Phaser.Math.Between(2000, 3000);
                    }
                    else
                    {
                        this.building = new Building(this, game.config.width - 10, borderUISize - 33, 'building', null, this.enemyGroup).setOrigin(0, 0.0);
                        this.building.depth = 1;
                        this.physics.add.collider(this.building, this.ground);
                        this.physics.add.collider(
                            this.player,
                            this.building,
                            () => 
                            {
                                this.nextLevel(this);
                            }
                        );
                    }
                } 
            },
            callbackScope: this,
            loop: true
        });

    }

    update(time, delta)
    {
        this.scoreText.text = score;

        //If game over, check input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {  
            this.scene.restart();
        }

        if (!this.gameOver)
        {
            this.player.update();

            //Update scroll BG
            this.cityscape.tilePositionX += 8;

            // Jump
            if (Phaser.Input.Keyboard.JustDown(keyUP) && this.player.body.touching.down)
            {
                this.jumpSFX.play();
                this.player.jump('playerJump');
            }
            //slide down 
            if (Phaser.Input.Keyboard.JustDown(keyDown) && this.player.body.touching.down && this.player.canSlide && !this.player.isSliding)
            {
                this.player.slide('playerSlide');            
            }

            
            if (this.enemyGroup.getLength() != 0)
            {
                this.enemyGroup.getChildren().forEach(enemy => enemy.update());
            }
        }
        else
        {
            //Update high score
            if (score > highScore)
            {
                highScore = score;
            }

            music.stop();
                
            this.player.reset();
            this.enemyGroup.getChildren().forEach(enemy => enemy.reset());

            levelNumber = 1;
            pointsToWin = startingPoints;
            score = 0;

            this.scene.start("gameOverScene");
        }
    }

    nextLevel(currScene)
    {
        currScene.scene.start("successScene");
        levelNumber++;
        pointsToWin = score + (5 * levelNumber);
    }
}