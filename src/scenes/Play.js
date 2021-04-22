class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()
    {
        //Load Sprites
        this.load.image('player', 'assets/player.png');
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
        var ground = this.add.rectangle(
            0,
            borderUISize * 10,
            game.config.width,
            borderUISize * 5,
            0x917dd4,
            ).setOrigin(0,0);

        player = new Player(
            this,
            game.config.width/10,
            borderUISize*6.89,
            'player',
        ).setOrigin(0.5, 0);


        // Enable Physics
        this.physics.add.existing(ground);
        this.physics.add.existing(player);

        // Set world bounds 
        ground.body.setCollideWorldBounds(true);
        player.body.setCollideWorldBounds(true);

        // Collision between player & ground
        this.physics.add.collider(player, ground);

        // Initialize Keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);  
    }

    update()
    {
        // Jump
        if (Phaser.Input.Keyboard.JustDown(keyUP) && player.body.touching.down)
        {
            player.body.setVelocityY(-400);
        }
    }
}