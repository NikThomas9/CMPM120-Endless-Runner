class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()
    {
        //Load Sprites
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/obstacle1.png');
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
        this.enemy = new Enemy(this, game.config.width/10, borderUISize*6.89, 'enemy', 0).setOrigin(-3, 0.2);

        // Enable Physics
        this.add.existing(this.player);
        this.add.existing(this.ground);
        this.add.existing(this.enemy);

        this.physics.add.existing(this.ground);
        this.physics.add.existing(this.player);
        this.physics.add.existing(this.enemy);

        // Set world bounds 
        this.ground.body.setCollideWorldBounds(true);
        this.player.body.setCollideWorldBounds(true);        
        
        // Collision between objects with the ground
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.ground,this.enemy);

        // Set game over flag
        this.gameOver = false;

        //collision between player & enemy
        this.physics.add.collider(
            this.player,
            this.enemy, 
            () =>
            {
                this.gameOver = true;
            });

        // Initialize Keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);  
    }

    update()
    {
        if (!this.gameOver)
        {
            // Jump
            if (Phaser.Input.Keyboard.JustDown(keyUP) && this.player.body.touching.down)
            {
                this.player.body.setVelocityY(-400);
            }

            this.enemy.body.setVelocityX(-400);
        }
        else
        {
            this.player.reset();
            this.enemy.body.setVelocityX(0);
        }
    }

    /*checkCollision(player,enemy){
        if (player.x < enemy.x + enemy.width && 
            player.x + player.width > enemy.x && 
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y) {
                return true;
        } else {
            return false;
        }
    }*/
}