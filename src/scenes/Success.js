class Success extends Phaser.Scene {
    constructor() {
        super("successScene");
    }

    preload(){
        this.load.image('cityscapeDay', 'assets/CityBG_day.png');
        this.load.image('cityscapeNight', 'assets/CityBG_night.png');
    }

        create(){
            let successConfig = {
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

            this.cover = this.add.image(game.config.width / 2, game.config.height / 2, citySprite);
            this.cover.setDisplaySize(game.config.width, game.config.height);
            this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding, 'Success!', successConfig).setOrigin(0.5);

            let offset = 0;

            if(levelNumber % 2 != 0){
             this.add.text(game.config.width/2, game.config.height/2, 
                    'Time to prep for your ', 
                    successConfig).setOrigin(0.5);

            this.add.text(game.config.width/2, game.config.height/2 + 50, 
                'morning class again...', 
                successConfig).setOrigin(0.5);

                offset += 50;

             }
             else{
                this.add.text(game.config.width/2, game.config.height/2, 
                    'You have a night class to teach, too!', 
                    successConfig).setOrigin(0.5);
            }

            this.add.text(game.config.width/2, game.config.height/2 + 50 + offset, 
            'Press S to move to Level ' + levelNumber + '!', 
            successConfig).setOrigin(0.5);
            
            keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            }
        
    
       
        


    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            // easy mode
            this.scene.start('playScene');
           
            
        }
    }
}
