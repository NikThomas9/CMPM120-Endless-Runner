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
            successConfig.backgroundColor = "#00FF00";
            successConfig.color = '#000';
            


            this.add.text(game.config.width/2, game.config.height/2, 
            'Press S to move to Level ' + levelNumber + '!', 
            successConfig).setOrigin(0.5);
            keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            }
    
       
        


    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            // easy mode
            this.scene.start('playScene');
            if(levelNumber!= 1 && levelNumber % 2 == 0 ){
                alert("WAKE UP YOU ARE RUNNING LATE FOR WORK");
            }
            else if(levelNumber!= 1 && levelNumber % 2 != 0){
                alert('NIGHTY NIGHT YOU ARE ALMOST THERE !');

            }
            
        }
    }
}
