class Intro1 extends Phaser.Scene{
    constructor(){
        super("intro1");
    }
            
    preload(){
        this.load.image('cityscapeDay', 'assets/CityBG_day.png');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '19px',
            backgroundColor: '#FFC0CB',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
    
        this.cover = this.add.image(game.config.width / 2, game.config.height / 2, 'cityscapeDay');
        this.cover.setDisplaySize(game.config.width, game.config.height);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding, 'Oh no! You slept in again... What time is it?', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding + 100, '(Press S to Continue)', menuConfig).setOrigin(0.5);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.start('intro2');
        }
    }
}
    


