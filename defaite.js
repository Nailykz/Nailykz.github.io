class defaite extends Phaser.Scene{
    constructor(){
        super("defaite");
    }
    init(data){
    }
    preload(){

    }
    create(){
        this.cameras.main.fadeIn(3000);

        let screen1 = this.add.image(0, 0, 'game_over').setOrigin(0).setScale(1);
        

        screen1.setInteractive();

        screen1.on("pointerdown", ()=>{
            let screen2 = this.add.image(0, 0, 'game_over_text1').setOrigin(0).setScale(1);
            screen2.setInteractive();
            screen2.on("pointerdown", ()=>{
                let screen3 = this.add.image(0, 0, 'game_over_text2').setOrigin(0).setScale(1);
                screen3.setInteractive();
                screen3.on("pointerdown", ()=>{
                    this.cameras.main.fadeOut(100);
                    this.cameras.main.fadeIn(1000);
                    let screen4 = this.add.image(0, 0, 'game_over_rejouer').setOrigin(0).setScale(1);
                    screen4.setInteractive();
                        let rejouer = this.add.image (75, 75, 'rejouer').setOrigin(0.25,-0.5).setScale(0.25);
                        let quitter2 = this.add.image (750, 75, 'quitter2').setOrigin(0.25,-0.5).setScale(0.25);
                        rejouer.setInteractive();
                        quitter2.setInteractive();
                        rejouer.on("pointerdown", ()=>{
                            this.scene.start("menu");
                            this.cameras.main.once('camerafadeincomplete', function (camera) {
                            camera.fadeOut(1000);
                            })
                        })
                
                        quitter2.on("pointerdown", ()=>{
                            game.destroy(true, false); 
                        })
                })
            })
        })
        
        
        
    }
}
