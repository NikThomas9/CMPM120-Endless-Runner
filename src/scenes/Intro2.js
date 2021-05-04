class Intro2 extends Phaser.Scene{
    constructor(){
        super("intro2");
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
        borderPadding, 'You look at your alarm clock.', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding + 50, 'You were supposed to be at work 10 minutes ago!', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding + 100, 'You have a class to teach!', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding + 150, '(Press S to Continue)', menuConfig).setOrigin(0.5);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    } 
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.start('intro3');
        }
    }
}
    


