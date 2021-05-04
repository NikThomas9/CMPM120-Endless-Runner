class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.image('cityscapeDay', 'assets/CityBG_day.png');
    }

    create(){
       let menuConfig = {
           fontFamily: 'Courier',
           fontSize: '25px',
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
        borderPadding, 'Running Late!', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2, 'Press S to start'
        , menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, 'Press ↑ to jump over obstacles and'
        , menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 80, '↓ to slide under flying birds!'
        , menuConfig).setOrigin(0.5);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        
       
   } 

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.start('intro1');      
        }
    }
}