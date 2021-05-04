class Intro1 extends Phaser.Scene{
    constructor(){
        super("intro1");
    }
    
//     create(){
//         text = this.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
//         nextLine();
//     }
//     nextLine(){
//         if (lineIndex === content.length)
//         {
//             //  We're finished
//             return;
//         }
    
//         //  Split the current line on spaces, so one word per array element
//         line = content[lineIndex].split(' ');
    
//         //  Reset the word index to zero (the first word in the line)
//         wordIndex = 0;
    
//         //  Call the 'nextWord' function once for each word in the line (line.length)
//         game.time.events.repeat(wordDelay, line.length, nextWord, this);
    
//         //  Advance to the next line
//         lineIndex++;
//     }
//     nextWord(){
//          //  Add the next word onto the text string, followed by a space
//     text.text = text.text.concat(line[wordIndex] + " ");

//     //  Advance the word index to the next word in the line
//     wordIndex++;

//     //  Last word?
//     if (wordIndex === line.length)
//     {
//         //  Add a carriage return
//         text.text = text.text.concat("\n");

//         //  Get the next line after the lineDelay amount of ms has elapsed
//         game.time.events.add(lineDelay, nextLine, this);
//     }
//     }

    
// }
create(){
    let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '19px',
        backgroundColor: '#FFC0CB',
        color: '#843605',
        align: 'right',
        padding: {
            top: 10,
            bottom: 10,
        },
        fixedWidth: 0
    }
 
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
     borderPadding, 'You are a professor who works at an elementary School.', menuConfig).setOrigin(0.5);
     keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

     
    
} 
update() {
 if (Phaser.Input.Keyboard.JustDown(keyRight)) {
   // easy mode
   this.scene.start('intro2');
   
 }
}
}
    


