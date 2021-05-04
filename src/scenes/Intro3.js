class Intro3 extends Phaser.Scene{
    constructor(){
        super("intro3");
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
    borderPadding, 'You need to get moving quick!', menuConfig).setOrigin(0.5);

    this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
    borderPadding + 50, 'Your students are waiting for you!', menuConfig).setOrigin(0.5);

    this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
    borderPadding + 100, '(Press S to Get Running!)', menuConfig).setOrigin(0.5);

    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
} 
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.start('playScene');

        }
    }
}
    


