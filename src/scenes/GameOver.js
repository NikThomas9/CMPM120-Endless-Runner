class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }
            
    preload(){
        this.load.image('cityscapeNight', 'assets/CityBG_night.png');
    }

    create(){

        this.cover = this.add.image(game.config.width / 2, game.config.height / 2, 'cityscapeNight');
        this.cover.setDisplaySize(game.config.width, game.config.height);

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
        
        this.add.text(game.config.width/2, game.config.height/2 - 15, 'You were late to work!',gameoverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 30, 'Press (R) to Try Again!',gameoverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 75, 'HIGH SCORE: ' + highScore,gameoverConfig).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('menuScene');
        }
    }
}
    


