class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('cover', 'assets/CityBG.png');
    }
   create(){
       let menuConfig = {
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
       this.cover = this.add.image(game.config.width / 2, game.config.height / 2, 'cover');
        this.cover.setDisplaySize(game.config.width, game.config.height);
       this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding, 'ENDLESS RUNNER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use S to start'
        , menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = '#000';
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        
       
   } 
   update() {
    if (Phaser.Input.Keyboard.JustDown(keyS)) {
      // easy mode
      this.scene.start('playScene');
      
    }
}
}