class affichage_ctrl extends Phaser.Scene{
    constructor(){
        super("affichage_ctrl");
    }
    init(data){
    }

    create(){
        player_hp=5;
        Buta_normal=true;
        Buta_Feu=false;
        Buta_Glace=false;
        Buta_Aile=false;
        jauge=0;
        count_bdf_masse = 0;
        count_bdf_mage = 0;
        cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.fadeIn(1000);
        this.add.image(0,0, "bg").setOrigin(0).setScale(1);
        this.add.image(0,0,"Menu_controle_test").setOrigin(-0.5,0).setScale(0.45);
        let skip = this.add.image(0,0,"skip_repas_false").setOrigin(-1.8,-12.5).setScale(0.9);
        let skip_true = this.add.image(0,0,"skip_repas_true").setOrigin(-1.8,-12.5).setScale(0.9);

        skip.setInteractive();
        skip_true.setInteractive();

        skip_true.setVisible(false);

        skip.on("pointerover", ()=>{  
            skip_true.setVisible(true);
        })

        skip.on("pointerout", ()=>{
            skip_true.setVisible(false);
        })

        skip_true.on("pointerdown", ()=>{
            this.scene.start("shokumotsu");
            this.cameras.main.once('camerafadeincomplete', function (camera) {
                camera.fadeOut(1000);
            })
        })
    }

}