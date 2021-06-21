class victoire extends Phaser.Scene{
    constructor(){
        super("victoire");
    }
    init(data){
    }
    create(){
        this.cameras.main.fadeIn(3000);
        
        let victory_screen = this.add.image(0, 0, 'victory_screen').setOrigin(0).setScale(1);

        victory_screen.setInteractive()

        victory_screen.on("pointerdown", ()=>{
            let victory_screen_text1 = this.add.image(0, 0, 'victory_screen_text1').setOrigin(0).setScale(1);
            victory_screen_text1.setInteractive();
            victory_screen_text1.on("pointerdown", ()=>{
                let victory_screen_text2 = this.add.image(0, 0, 'victory_screen_text2').setOrigin(0).setScale(1);
                victory_screen_text2.setInteractive();
                victory_screen_text2.on("pointerdown", ()=>{
                    let victory_screen_text3 = this.add.image(0, 0, 'victory_screen_text3').setOrigin(0).setScale(1);
                    victory_screen_text3.setInteractive();
                    victory_screen_text3.on("pointerdown", ()=>{
                        this.cameras.main.fadeOut(1000);                   
                })
                
            })
        })
    })
}
}

