//////////////////////////////////////
//SONS                              //
//////////////////////////////////////
class shokumotsu extends Phaser.Scene{
    constructor(){
        super("shokumotsu");
    }
    init(data){
    }

create ()
{  
    this.Ambiance = this.sound.add('Ambiance')
    var musicConfig = {
        mute : false,
        volume : 0.01,
        rate : 1,
        deturne : 0,
        seek : 0,
        loop : false,
        delay : 0,

    }
    this.Ambiance.play(musicConfig)

    this.cameras.main.fadeIn(1000);
    this.add.image(-500, 0, 'bg').setOrigin(0,-1.08).setScale(0.7);
    this.add.image(903.5,0, 'bg').setOrigin(0,-1.08).setScale(0.7);
    this.add.image(2303.5,0, 'bg').setOrigin(0,-1.08).setScale(0.7);
    
    const map = this.make.tilemap({key : 'map'});
    const tileset = map.addTilesetImage('tiles','tiles');

    ground = map.createDynamicLayer('Ville',tileset);
    ground.setCollisionByExclusion(-1,true);
    background = map.createDynamicLayer('Faux_Murs',tileset);
    this.death_zone = map.createDynamicLayer('Death_Zone',tileset);
    this.death_zone.setCollisionByExclusion(-1,true);
    this.death_zone_2 = map.createDynamicLayer('Death_Zone_2',tileset);
    this.death_zone_2.setCollisionByExclusion(-1,true);
    this.death_zone_3 = map.createDynamicLayer('Death_Zone_3',tileset);
    this.death_zone_3.setCollisionByExclusion(-1,true);

   
    player = this.physics.add.sprite(200,1450, 'sprite_buta_normal').setScale(0.06);
    //player = this.physics.add.sprite(2300,1100, 'sprite_buta_normal').setScale(0.06);
    //player = this.physics.add.sprite(1400, 1500, 'sprite_buta_normal').setScale(0.06);
    //player = this.physics.add.sprite(1300,100, 'sprite_buta_normal').setScale(0.06);
    //player = this.physics.add.sprite(1250, 500, 'sprite_buta_normal').setScale(0.06);

    full_heart_1 = this.add.sprite(50,30, 'full_heart').setScrollFactor(0).setScale(0.1);
    full_heart_2 = this.add.sprite(100,30, 'full_heart').setScrollFactor(0).setScale(0.1);
    full_heart_3 = this.add.sprite(150,30, 'full_heart').setScrollFactor(0).setScale(0.1);
    full_heart_4 = this.add.sprite(200,30, 'full_heart').setScrollFactor(0).setScale(0.1);
    full_heart_5 = this.add.sprite(250,30, 'full_heart').setScrollFactor(0).setScale(0.1);
        
    empty_heart_1 = this.add.sprite(50,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);
    empty_heart_2 = this.add.sprite(100,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);
    empty_heart_3 = this.add.sprite(150,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);
    empty_heart_4 = this.add.sprite(200,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);
    empty_heart_5 = this.add.sprite(250,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);

    jauge2 = this.add.sprite(105,75, 'sprite').setScale(0.4).setScrollFactor(0);
 /*    player = this.add.sprite(200,1550, 'sprite_buta').setScale(0.1); */

    this.cameras.main.setBounds(0, 0, 2950,1600);

    this.cameras.main.startFollow(player, false, 1, 1, 0, 0);
    
    player.setBounce(0.0);
    player.setCollideWorldBounds(false);

    cursors = this.input.keyboard.createCursorKeys(); 
    Jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  
    Competence_Speciale = this.input.keyboard.addKey('F');
    Roulade = this.input.keyboard.addKey('E');
    cursors.left.reset();
    cursors.right.reset();
    cursors.up.reset();
    cursors.down.reset();
    Roulade.reset();
    Competence_Speciale.reset()
    Jump.reset(); 
    
    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, this.death_zone, death_Zone_Spawnpoint, null, this);
    this.physics.add.collider(player, this.death_zone_2, death_Zone_Spawnpoint_2, null, this);
    this.physics.add.collider(player, this.death_zone_3, death_Zone_Spawnpoint_3, null, this);

//CAISSE
    const CaisseObjects = map.getObjectLayer('Caisse').objects;

    this.caisses = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for (const caisse of CaisseObjects){
            this.caisses.create(caisse.x, caisse.y, 'box')
                .setScale(0.1)
        }

    for (const caisse of this.caisses.children.entries) {
        this.physics.add.collider(caisse, ground);
        this.physics.add.collider(caisse, ennemi);
        this.physics.add.collider(player, caisse, hitByPlayer, null, this);        
    }       
        this.physics.add.collider(this.caisses, this.caisses);


//PIMENT
    const PimentObjects = map.getObjectLayer('Piment').objects;

    this.piments = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });
    
    for (const piment of PimentObjects){
            this.piments.create(piment.x, piment.y, 'chilli_pepper')
                .setScale(0.15)
        }

    for (const piment of this.piments.children.entries) {
        this.physics.add.collider(piment, ground);
        this.physics.add.overlap(player, piment, Recolte_Piment, null, this);
        
    }       
    
//GLACE
    const GlaceObjects = map.getObjectLayer('Glace').objects;

    this.glaces = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const glace of GlaceObjects){
            this.glaces.create(glace.x, glace.y, 'ice_cream')
                .setScale(0.07)
    }

    for (const glace of this.glaces.children.entries){
        this.physics.add.collider(glace, ground);
        this.physics.add.overlap(player, glace, Recolte_Glace, null, this);
    }

//POULET
    const PouletObjects = map.getObjectLayer('Poulet').objects;

    this.poulets = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const poulet of PouletObjects){
            this.poulets.create(poulet.x, poulet.y, 'chicken')
                .setScale(0.1)
    }

    for (const poulet of this.poulets.children.entries){
        this.physics.add.collider(poulet, ground);
        this.physics.add.overlap(player, poulet, Recolte_Poulet, null, this);
    }
    
//ALIMENT 

    const AlimentObjects = map.getObjectLayer('Aliment').objects;

    this.aliments = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const aliment of AlimentObjects){
        this.aliments.create(aliment.x, aliment.y,'food')
            .setScale(0.1)
    }

    for(const aliment of this.aliments.children.entries){
        this.physics.add.collider(aliment,ground);
        this.physics.add.overlap(player, aliment, Recolte_Aliment, null, this);
    }

//GAMELLE 

    const GamelleObjects = map.getObjectLayer('Gamelle').objects;

    this.gamelles = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const gamelle of GamelleObjects){
        this.gamelles.create(gamelle.x, gamelle.y,'gamelle')
            .setScale(0.1)
    }

    for(const gamelle of this.gamelles.children.entries){
        this.physics.add.collider(gamelle,ground);
        this.physics.add.overlap(player, gamelle, Recolte_Gamelle, null, this);
    }

//ENNEMIS 

    this.EnnemiObjects = map.getObjectLayer('Ennemi').objects;

    this.ennemis = this.physics.add.group({
        immovable:false,
        allowGravity:true,
    });

    for(const ennemi of this.EnnemiObjects){
        this.ennemis.create(ennemi.x, ennemi.y-50,'ennemi_epeiste')
            .setScale(0.25)
            .setGravityY(300)
            .setSize(200,275)
            .setOffset(100,50);
    }

    for(const ennemi of this.ennemis.children.entries){
        this.physics.add.collider(ennemi, ground);
        this.physics.add.collider(ennemi, this.caisses);
        this.physics.add.collider(player, ennemi, Fonction_Ennemi, null, this);
        ennemi.direction = 'RIGHT';
    }

//MAGE 

    this.MageObjects = map.getObjectLayer('Mage').objects;

    this.mages = this.physics.add.group({
        immovable:true,
        allowGravity:true,
    });

    for(const mage of this.MageObjects){
        this.mages.create(mage.x, mage.y-50,'mage')
            .setScale(0.25)
            .setGravityY(300)
            .setSize(200,275)
            .setOffset(100,50);
    }

    for(const mage of this.mages.children.entries){
        this.physics.add.collider(mage, ground);
        this.physics.add.collider(mage, this.caisses);
        this.physics.add.collider(player, mage, Fonction_Mage, null, this);
    }

//HIDE_ENNEMIS 

    this.Hide_EnnemiObjects = map.getObjectLayer('Hide_Ennemi').objects;

    this.hide_ennemis = this.physics.add.group({
        immovable:true,
        allowGravity:true,
    });

    for(const hide_ennemi of this.Hide_EnnemiObjects){
        this.hide_ennemis.create(hide_ennemi.x, hide_ennemi.y-50,'ennemi_epeiste')
            .setScale(0.25)
            .setGravityY(300)
            .setSize(200,275)
            .setOffset(100,50);
    }

    for(const hide_ennemi of this.hide_ennemis.children.entries){
        this.physics.add.collider(hide_ennemi, ground);
        this.physics.add.collider(hide_ennemi, this.caisses);
        this.physics.add.collider(player, hide_ennemi, Fonction_Hide_Ennemi, null, this);
    }

//IMMOBILE_ENNEMIS 
    const immobile_ennemiObjects = map.getObjectLayer('Arba_Ennemi').objects;

    this.arbas = this.physics.add.group({
        immovable:true,
        allowGravity:true,
    });

    for(const arba of immobile_ennemiObjects){
        this.arbas.create(arba.x, arba.y-50,'ennemi_arba')
            .setScale(0.25)
            .setGravityY(300)
            .setFlipX(true);
    }

    for(const arba of this.arbas.children.entries){
        arba.direction='LEFT';
        this.physics.add.collider(arba, ground);
        this.physics.add.collider(arba, this.caisses);
        this.physics.add.collider(player, arba, Fonction_Immobile_Ennemi, null, this);
    }

//IMMOBILE_ENNEMIS_SENSIBLE_GLACE

this.Immobile_Ennemi_Sensible_GlaceObjects = map.getObjectLayer('Immobile_Ennemi_Sensible_Glace').objects;

this.immobile_ennemis_sensible_glace = this.physics.add.group({
    immovable:true,
    allowGravity:true,
});

for(const immobile_ennemi_sensible_glace of this.Immobile_Ennemi_Sensible_GlaceObjects){
    this.immobile_ennemis_sensible_glace.create(immobile_ennemi_sensible_glace.x, immobile_ennemi_sensible_glace.y-50,'ennemi_epeiste')
    .setScale(0.25)
    .setGravityY(300)
    .setSize(200,275)
    .setOffset(100,50);
}

for(const immobile_ennemi_sensible_glace of this.immobile_ennemis_sensible_glace.children.entries){
    this.physics.add.collider(immobile_ennemi_sensible_glace, ground);
    this.physics.add.collider(immobile_ennemi_sensible_glace, this.caisses);
    this.physics.add.collider(player, immobile_ennemi_sensible_glace, Fonction_Immobile_Ennemi_Sensible_Glace, null, this);
}

//MASSE_ENNEMIS 

this.Masse_EnnemiObjects = map.getObjectLayer('Masse_Ennemi').objects;

this.masse_ennemis = this.physics.add.group({
    immovable:true,
    allowGravity:true,
});

for(const masse_ennemi of this.Masse_EnnemiObjects){
    this.masse_ennemis.create(masse_ennemi.x, masse_ennemi.y-50,'ennemi_masse')
        .setScale(0.25)
        .setGravityY(300)
        .setSize(200,275)
        .setOffset(100,50);
}

for(const masse_ennemi of this.masse_ennemis.children.entries){
    this.physics.add.collider(masse_ennemi, ground);
    this.physics.add.collider(masse_ennemi, this.caisses);
    this.physics.add.collider(player, masse_ennemi, Fonction_Ennemi_Masse, null, this);
    masse_ennemi.direction = 'RIGHT';
}

//RESPAWNING_POULET
    const Respawn_PouletObjects = map.getObjectLayer('Respawn_Poulet').objects;

        this.respawn_poulets = this.physics.add.group({
            immovable:true,
            allowGravity:false,
        });

        for(const respawn_poulet of Respawn_PouletObjects){
                this.respawn_poulets.create(respawn_poulet.x, respawn_poulet.y, 'chicken')
                    .setScale(0.1)
        }

        for (const respawn_poulet of this.respawn_poulets.children.entries){
            this.physics.add.collider(respawn_poulet, ground);
            this.physics.add.overlap(player, respawn_poulet, Recolte_Respawn_Poulet, null, this);
        }

//RESPAWNING_PIMENT
const Respawn_PimentObjects = map.getObjectLayer('Respawn_Piment').objects;

    this.respawn_piments = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const respawn_piment of Respawn_PimentObjects){
            this.respawn_piments.create(respawn_piment.x, respawn_piment.y, 'chilli_pepper')
                .setScale(0.1)
    }

    for (const respawn_piment of this.respawn_piments.children.entries){
        this.physics.add.collider(respawn_piment, ground);
        this.physics.add.overlap(player, respawn_piment, Recolte_Respawn_Piment, null, this);
    }

//RESPAWNING_GLACE
const Respawn_GlaceObjects = map.getObjectLayer('Respawn_Glace').objects;

    this.respawn_glaces = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const respawn_glace of Respawn_GlaceObjects){
            this.respawn_glaces.create(respawn_glace.x, respawn_glace.y, 'ice_cream')
                .setScale(0.07)
    }

    for (const respawn_glace of this.respawn_glaces.children.entries){
        this.physics.add.collider(respawn_glace, ground);
        this.physics.add.overlap(player, respawn_glace, Recolte_Respawn_Glace, null, this);
    }

//BOULE DE FEU
    boules_de_feu = this.physics.add.group({
        allowGravity:true,
    });  

//BOULE DE GLACE 
    boules_de_glace = this.physics.add.group({
        allowGravity:true,
    });

//FLECHES 
    this.fleches = this.physics.add.group({
        allowGravity:true,
    });

//ORBES
    this.orbes = this.physics.add.group({
        allowGravity:true,
    });

//Anim_JAUGE
    this.anims.create({
            key: 'jauge_0',
            frames: this.anims.generateFrameNumbers('sprite', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
            });
    this.anims.create({
            key: 'jauge_10',
            frames: this.anims.generateFrameNumbers('sprite', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
            });
    this.anims.create({
            key: 'jauge_25',
            frames: this.anims.generateFrameNumbers('sprite', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
            });
    this.anims.create({
            key: 'jauge_40',
            frames: this.anims.generateFrameNumbers('sprite', { start: 3, end: 3 }),
            frameRate: 10,
            repeat: -1
            });      
    this.anims.create({
            key: 'jauge_55',
            frames: this.anims.generateFrameNumbers('sprite', { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1
            });      
    this.anims.create({
            key: 'jauge_70',
            frames: this.anims.generateFrameNumbers('sprite', { start: 5, end: 5 }),
            frameRate: 10,
            repeat: -1
            });  
    this.anims.create({
            key: 'jauge_85',
            frames: this.anims.generateFrameNumbers('sprite', { start: 6, end: 6 }),
            frameRate: 10,
            repeat: -1
            });     
    this.anims.create({
            key: 'jauge_100',
            frames: this.anims.generateFrameNumbers('sprite', { start: 7, end: 7 }),
            frameRate: 10,
            repeat: -1
            }); 

//SPRITE NORMAL
    this.anims.create({
            key: 'buta_normal_static',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 4, end: 4}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
        key: 'buta_normal_static_gauche',
        frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
});    
    this.anims.create({
        key: 'buta_normal_left',
        frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    }); 
    this.anims.create({
            key: 'buta_normal_saut_droit',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 6, end: 6}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_normal_saut_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 2, end: 2}),
            frameRate: 10,
            repeat: -1
    });

//SPRITE FEU
    this.anims.create({
            key: 'buta_feu_static',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 4, end: 4}),
            frameRate: 10,
            repeat: -1
    });  
    this.anims.create({
        key: 'buta_feu_static_gauche',
        frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    });      
    this.anims.create({
            key: 'buta_feu_left',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_right',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_saut_droit',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 6, end: 6}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_saut_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 2, end: 2}),
            frameRate: 10,
            repeat: -1
    }); 

//SPRITE GLACE
    this.anims.create({
            key: 'buta_glace_static',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 4, end: 4}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
        key: 'buta_glace_static_gauche',
        frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    });   
    this.anims.create({
            key: 'buta_glace_left',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_right',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_saut_droit',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 6, end: 6}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_saut_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 2, end: 2}),
            frameRate: 10,
            repeat: -1
    }); 

//SPRITE AILE
    this.anims.create({
            key: 'buta_aile_static',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 4, end: 4}),
            frameRate: 10,
            repeat: -1
    });   
    this.anims.create({
        key: 'buta_aile_static_gauche',
        frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    });  
    this.anims.create({
            key: 'buta_aile_left',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_right',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_saut_droit',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 6, end: 6}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_saut_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile_vole', {start: 2, end: 2}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_aile_vole_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile_vole', {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_aile_vole_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile_vole', {start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
    });

//ROULADE
    this.anims.create({
            key: 'buta_normal_roulade_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 12, end: 12}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_normal_roulade_gauche_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_normal_roulade_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 9, end: 9}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_normal_roulade_droite_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 10, end: 10}),
            frameRate: 10,
            repeat: -1
    });

    this.anims.create({
            key: 'buta_feu_roulade_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 12, end: 12}),
            frameRate: 10,
            repeat: -1
    });this.anims.create({
            key: 'buta_feu_roulade_gauche_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_roulade_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 9, end: 9}),
            frameRate: 60,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_roulade_droite_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 10, end: 10}),
            frameRate: 10,
            repeat: -1
    }); 

    this.anims.create({
            key: 'buta_glace_roulade_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 12, end: 12}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_roulade_gauche_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_roulade_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 9, end: 9}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_glace_roulade_droite_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 10, end: 10}),
            frameRate: 10,
            repeat: -1
    });

    this.anims.create({
            key: 'buta_aile_roulade_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 12, end: 12}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_roulade_gauche_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_roulade_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 9, end: 9 }),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_aile_roulade_droite_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 10, end: 10}),
            frameRate: 10,
            repeat: -1
    });

    this.anims.create({
            key: 'Freeze',
            frames: this.anims.generateFrameNumbers('ennemi_freeze', {start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
    });  

    

///////////
//EPEISTE//  
/////////// 
    this.anims.create({
            key: 'epeiste_move',
            frames: this.anims.generateFrameNumbers('ennemi_epeiste', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
    });
    this.anims.create({
            key: 'epeiste_static',
            frames: this.anims.generateFrameNumbers('ennemi_epeiste', {start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'epeiste_attack',
            frames: this.anims.generateFrameNumbers('ennemi_epeiste', {start: 4, end: 6}),
            frameRate: 5,
            repeat: -1
    });
    this.anims.create({
            key: 'epeiste_death',
            frames: this.anims.generateFrameNumbers('ennemi_epeiste', {start: 7, end: 8}),
            frameRate: 5,
            repeat: -1
    });  


    this.anims.create({
            key: 'ennemi_shield',
            frames: this.anims.generateFrameNumbers('ennemi_bouclier', {start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
}); 

///////////
///MASSE///
/////////// 
this.anims.create({
    key: 'masse_move',
    frames: this.anims.generateFrameNumbers('ennemi_masse', {start: 0, end: 3}),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: 'masse_static',
    frames: this.anims.generateFrameNumbers('ennemi_masse', {start: 0, end: 0}),
    frameRate: 10,
    repeat: -1
});
this.anims.create({
    key: 'masse_attack',
    frames: this.anims.generateFrameNumbers('ennemi_masse', {start: 4, end: 6}),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: 'masse_death',
    frames: this.anims.generateFrameNumbers('ennemi_masse', {start: 7, end: 8}),
    frameRate: 5,
    repeat: -1
});  


this.anims.create({
    key: 'ennemi_shield',
    frames: this.anims.generateFrameNumbers('ennemi_bouclier', {start: 0, end: 0}),
    frameRate: 10,
    repeat: -1
}); 

///////////
///Arba////
/////////// 
this.anims.create({
    key: 'arba_move',
    frames: this.anims.generateFrameNumbers('ennemi_arba', {start: 0, end: 3}),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: 'arba_static',
    frames: this.anims.generateFrameNumbers('ennemi_arba', {start: 0, end: 0}),
    frameRate: 10,
    repeat: -1
});
this.anims.create({
    key: 'arba_attack',
    frames: this.anims.generateFrameNumbers('ennemi_arba', {start: 4, end: 6}),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: 'arba_death',
    frames: this.anims.generateFrameNumbers('ennemi_arba', {start: 7, end: 8}),
    frameRate: 5,
    repeat: -1
});  


this.anims.create({
    key: 'ennemi_shield',
    frames: this.anims.generateFrameNumbers('ennemi_bouclier', {start: 0, end: 0}),
    frameRate: 10,
    repeat: -1
}); 

///////////
///Mage////
/////////// 
this.anims.create({
    key: 'mage_move',
    frames: this.anims.generateFrameNumbers('mage', {start: 0, end: 3}),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: 'mage_static',
    frames: this.anims.generateFrameNumbers('mage', {start: 0, end: 0}),
    frameRate: 10,
    repeat: -1
});
this.anims.create({
    key: 'mage_attack',
    frames: this.anims.generateFrameNumbers('mage', {start: 4, end: 6}),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: 'mage_death',
    frames: this.anims.generateFrameNumbers('mage', {start: 7, end: 10}),
    frameRate: 5,
    repeat: -1
});  


this.anims.create({
    key: 'ennemi_shield',
    frames: this.anims.generateFrameNumbers('ennemi_bouclier', {start: 0, end: 0}),
    frameRate: 10,
    repeat: -1
}); 
}
//CONTROLE
//GOUPDATE 
update ()
{
    player.update();
    onGround = player.body.blocked.down;
    roulade=false;
    player.setGravityY(300);

    if(commandeMobile==true){
        let Droite2 = this.add.sprite(90, 418, 'Touche_droite').setScrollFactor(0).setScale(0.1);
        let Gauche2 = this.add.sprite(30, 418, 'Touche_gauche').setScrollFactor(0).setScale(0.1);
        let Haut2 = this.add.sprite(775, 350, 'Touche_haut').setScrollFactor(0).setScale(0.1);
        let Bas2 = this.add.sprite(775, 418, 'Touche_bas').setScrollFactor(0).setScale(0.1);
        let Competence_Speciale2 = this.add.sprite(700, 418, 'Competence_Speciale').setScrollFactor(0).setScale(0.10);
        let Roulade2 = this.add.sprite(850, 418, 'Roulade').setScrollFactor(0).setScale(0.10);

        Droite2.on("pointerdown", ()=>{
            cursors.right.isDown
        })
        Gauche2.on("pointerdown", ()=>{
            cursors.left.isDown
        })
        Haut2.on("pointerdown", ()=>{
            cursors.up.isDown
        })
        Bas2.on("pointerdown", ()=>{
            cursors.down.isDown
        })
        Competence_Speciale2.on("pointerdown", ()=>{
            Competence_Speciale.isDown
        })
        Roulade2.on("pointerdown", ()=>{
            Roulade.isDown
        })
    }

    if(cursors.right.isDown){
        playerDirection='RIGHT'
        }
    if(cursors.left.isDown){
            playerDirection='LEFT'
        }
    //BUTA_NORMAL
    if(ejection==false){
        if(cursors.left.isDown && Roulade.isUp && Buta_normal == true){
                player.anims.play('buta_normal_right', true).setFlipX(true);
                playerDirection='LEFT';
            }
            if(cursors.right.isDown && Roulade.isUp && Buta_normal == true ){
                player.anims.play('buta_normal_right', true).setFlipX(false);
                playerDirection='RIGHT';
            }
            if(cursors.right.isUp && Roulade.isUp && cursors.left.isUp && Buta_normal == true){
                if(playerDirection=='RIGHT'){
                    player.anims.play('buta_normal_static', true).setFlipX(false);
                }
                if(playerDirection=='LEFT'){
                    player.anims.play('buta_normal_static', true).setFlipX(true);
                }
            }
            if(cursors.right.isDown && Roulade.isUp && cursors.up.isDown && Buta_normal == true|| cursors.right.isDown && onGround==false&& Buta_normal == true){
                player.anims.play('buta_normal_saut_droit', true).setFlipX(false);
            }
            if(cursors.left.isDown && Roulade.isUp && cursors.up.isDown && Buta_normal == true|| cursors.left.isDown && onGround==false && Buta_normal == true){
                player.anims.play('buta_normal_saut_droit', true).setFlipX(true);
            }
    //BUTA_FEU
        if(cursors.left.isDown && Roulade.isUp && Buta_Feu == true){
                player.anims.play('buta_feu_right', true).setFlipX(true);
                playerDirection='LEFT';
            }
            if(cursors.right.isDown && Roulade.isUp && Buta_Feu == true){
                player.anims.play('buta_feu_right', true).setFlipX(false);
                playerDirection='RIGHT';
            }
            if(cursors.right.isUp && Roulade.isUp && cursors.left.isUp && Buta_Feu == true){
                if(playerDirection=='RIGHT'){
                    player.anims.play('buta_feu_static', true).setFlipX(false);
                }
                if(playerDirection=='LEFT'){
                    player.anims.play('buta_feu_static', true).setFlipX(true);
                }

            }
            if(cursors.right.isDown && Roulade.isUp && cursors.up.isDown && Buta_Feu == true|| cursors.right.isDown && onGround==false&& Buta_Feu == true){
                player.anims.play('buta_feu_saut_droit', true).setFlipX(false);
            }
            if(cursors.left.isDown && Roulade.isUp && cursors.up.isDown && Buta_Feu == true|| cursors.left.isDown && onGround==false && Buta_Feu == true){
                player.anims.play('buta_feu_saut_droit', true).setFlipX(true);
            }
    //BUTA_GLACE
        if(cursors.left.isDown && Roulade.isUp && Buta_Glace == true){
            player.anims.play('buta_glace_right', true).setFlipX(true);
                playerDirection='LEFT';
            }
            if(cursors.right.isDown && Roulade.isUp && Buta_Glace == true ){
                player.anims.play('buta_glace_right', true).setFlipX(false);
                playerDirection='RIGHT';
            }
            if(cursors.right.isUp && Roulade.isUp && cursors.left.isUp && Buta_Glace == true){
                if(playerDirection=='RIGHT'){
                    player.anims.play('buta_glace_static', true).setFlipX(false);
                }
                if(playerDirection=='LEFT'){
                    player.anims.play('buta_glace_static', true).setFlipX(true);
                }
            }
            if(cursors.right.isDown && Roulade.isUp && cursors.up.isDown && Buta_Glace == true|| cursors.right.isDown && onGround==false&& Buta_Glace == true){
                player.anims.play('buta_glace_saut_droit', true).setFlipX(false);
            }
            if(cursors.left.isDown && Roulade.isUp && cursors.up.isDown && Buta_Glace == true|| cursors.left.isDown && onGround==false && Buta_Glace == true){
                player.anims.play('buta_glace_saut_droit', true).setFlipX(true);
            }
    //BUTA_AILE
            if(cursors.left.isDown && cursors.up.isUp && Roulade.isUp && Buta_Aile == true && onGround==true){
                player.anims.play('buta_aile_right', true).setFlipX(true);
                playerDirection='LEFT';
            }
            if(cursors.right.isDown && cursors.up.isUp && Roulade.isUp && Buta_Aile == true && onGround==true ){
                player.anims.play('buta_aile_right', true).setFlipX(false);
                playerDirection='RIGHT';
            }
            if(cursors.right.isUp && Roulade.isUp && cursors.left.isUp && Buta_Aile == true && onGround==true){
                if(playerDirection=='RIGHT'){
                    player.anims.play('buta_aile_static', true).setFlipX(false);
                }
                if(playerDirection=='LEFT'){
                    player.anims.play('buta_aile_static', true).setFlipX(true);
                }
            }
            if(Buta_Aile == true && onGround == false){
                if(playerDirection=='RIGHT'){
                    player.anims.play('buta_aile_vole_droite', true).setFlipX(false);
                    console.log("Droite")
                }   
                if(playerDirection=='LEFT'){
                    player.anims.play('buta_aile_vole_droite', true).setFlipX(true);
                    console.log("gauche")
                }
            }
    //ROULADE BUTA NORMAL
    if (cursors.left.isDown && Roulade.isDown && jauge>0 && Buta_normal == true)
    {
        player.anims.play('buta_normal_roulade_droite_charge', true).setFlipX(true);
        roulade=true;
        player.setVelocityX(-500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(-170);
        }    
    }
    if(cursors.right.isDown && Roulade.isDown && jauge>0 && Buta_normal == true)
    {
        player.anims.play('buta_normal_roulade_droite_charge', true).setFlipX(false);
        roulade=true;
        player.setVelocityX(500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(170);
        }
    }

    //ROULADE BUTA FEU

    if (cursors.left.isDown && Roulade.isDown && jauge>0 && Buta_Feu == true)
    {
        player.anims.play('buta_feu_roulade_droite_charge', true).setFlipX(true);
        roulade=true;
        player.setVelocityX(-500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(-170);
        }    
    }
    if(cursors.right.isDown && Roulade.isDown && jauge>0 && Buta_Feu == true)
    {
        player.anims.play('buta_feu_roulade_droite_charge', true).setFlipX(false);
        roulade=true;
        player.setVelocityX(500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(170);
        }
    }
    //ROULADE BUTA GLACE

    if (cursors.left.isDown && Roulade.isDown && jauge>0 && Buta_Glace == true)
    {
        player.anims.play('buta_glace_roulade_droite_charge', true).setFlipX(true);
        roulade=true;
        player.setVelocityX(-500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(-170);
        }    
    }
    if(cursors.right.isDown && Roulade.isDown && jauge>0 && Buta_Glace == true)
    {
        player.anims.play('buta_glace_roulade_droite_charge', true).setFlipX(false);
        roulade=true;
        player.setVelocityX(500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(170);
        }
    }
    //ROULADE BUTA AILE

    if (cursors.left.isDown && Roulade.isDown && jauge>0 && Buta_Aile == true)
    {
        player.anims.play('buta_aile_roulade_droite_charge', true).setFlipX(true);
        roulade=true;
        player.setVelocityX(-500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(-170);
        }    
    }
    if(cursors.right.isDown && Roulade.isDown && jauge>0 && Buta_Aile == true)
    {
        player.anims.play('buta_aile_roulade_droite_charge', true).setFlipX(false);
        roulade=true;
        player.setVelocityX(500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(170);
        }
    }

////////////////////

    if(player.body.blocked.down==true || inContactCaisse == true){
        playerBlockedDown=true;
        jumpCount=0;
    }

    if (gameOver)
    {
        return;
    }

    if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp)
    {
        player.setVelocityX(0);
    }
    
    if (cursors.left.isDown && Roulade.isUp)
    {
        player.setVelocityX(-170);
    }
    if(cursors.right.isDown && Roulade.isUp)
    {
        player.setVelocityX(170);
    }
    if (cursors.up.isDown && onGround==true || Jump.isDown && onGround==true)
    {
        player.setVelocityY(-170);
        inContactCaisse = false;
    }
    if (cursors.up.isDown && Touche_Caisse==true || Jump.isDown && Touche_Caisse==true)
    {
        Touche_Caisse=false;
        player.setVelocityY(-170);
        inContactCaisse = false;
    }

    if(cursors.down.isDown)
    {
        player.setVelocityY(170);  
        inContactCaisse = false;
  
    }

    if (Competence_Speciale.isDown)
    {
        if(Buta_Feu==true && BDF_reload==true)
        {
            lancer_boule_de_feu(player);
            this.physics.add.collider(boules_de_feu, ground, destroyFireball, null, this);
            this.physics.add.overlap(boules_de_feu, this.ennemis, Kill_Ennemi, null, this);
            this.physics.add.overlap(boules_de_feu, this.masse_ennemis, Kill_Masse_Ennemi, null, this);
            this.physics.add.overlap(boules_de_feu, this.hide_ennemis, Hide_Ennemi, null, this);
            this.physics.add.overlap(boules_de_feu, this.arbas, Kill_Ennemi_Arba, null, this);
            this.physics.add.overlap(boules_de_feu, this.caisses, destroyBox, null, this);
            this.physics.add.overlap(boules_de_feu, this.mages, Kill_Mage, null, this);  
            this.BDF_SFX = this.sound.add('sound_bdf')
            var BDF_Config = {
                mute : false,
                volume : 0.01,
                rate : 1,
                deturne : 0,
                seek : 0,
                loop : false,
                delay : 0,
    
                }
            this.BDF_SFX.play(BDF_Config)

        }       
    }

    if (Competence_Speciale.isDown)
    {
        if(Buta_Glace==true && BDG_reload==true)
        {
            lancer_boule_de_glace(player);
            this.physics.add.collider(boules_de_glace, ground, destroyIceball, null, this);
            this.physics.add.overlap(boules_de_glace, this.ennemis, Gele_Ennemi, null, this);
            this.physics.add.overlap(boules_de_glace, this.hide_ennemis, Gele_Ennemi, null, this);
            this.physics.add.overlap(boules_de_glace, this.immobile_ennemis_sensible_glace, Gele_Ennemi, null, this);
            this.BDG_SFX = this.sound.add('sound_bdg')
            var BDG_Config = {
            mute : false,
            volume : 0.01,
            rate : 1,
            deturne : 0,
            seek : 0,
            loop : false,
            delay : 0,

            }
            this.BDG_SFX.play(BDG_Config)
        }       
    }
    if (Competence_Speciale.isDown)
    {
        if(Buta_Aile==true && undefined_jauge>0)
        {
            competence=true;
            player.setGravity(0);
            if(cursors.down.isDown)
            {
                player.setVelocityY(170);
                undefined_jauge-=1;   
            }
            if (cursors.up.isDown)
            {
                player.setVelocityY(-170);
                undefined_jauge-=1; 
            }
        }       
    }
    if(player_hp==5){
                full_heart_5.setVisible(true);
                empty_heart_5.setVisible(false);
                full_heart_4.setVisible(true);
                empty_heart_4.setVisible(false);
                full_heart_3.setVisible(true);
                empty_heart_3.setVisible(false);
                full_heart_2.setVisible(true);
                empty_heart_2.setVisible(false);
                full_heart_1.setVisible(true);
                empty_heart_1.setVisible(false);
            }
            else if (player_hp == 4){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
            }
            else if (player_hp == 3){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
            }
            else if (player_hp == 2){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
            }
            else if (player_hp == 1){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
                full_heart_2.setVisible(false);
                empty_heart_2.setVisible(true);
            }
            else if (player_hp == 0){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
                full_heart_2.setVisible(false);
                empty_heart_2.setVisible(true);
                full_heart_1.setVisible(false);
                empty_heart_1.setVisible(true);
            }    
            
            for (const ennemi of this.ennemis.children.entries) {
            if(ennemi.direction=='Stop'){
                ennemi.setVelocityX(0);
                
            }
            else if(ennemi.direction!=='Stop' && contact!=true && epeiste_death!==true){
                if (player.x - ennemi.x < 0) {
                    ennemi.direction = 'LEFT';
                    ennemi.anims.play("epeiste_move", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(200,275)
                    .setOffset(100,50)
                    .setFlipX(false);
                    
                }

                if (player.x - ennemi.x > 0) {
                    ennemi.direction = 'RIGHT';
                    ennemi.anims.play("epeiste_move", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(200,275)
                    .setOffset(100,50)
                    .setFlipX(true);
                }

                if (ennemi.direction === 'RIGHT') {
                    ennemi.setVelocityX(150);
                } 
                else if(ennemi.direction === 'LEFT') {
                    ennemi.setVelocityX(-150);
                }  
            }
                    
        }
        
        for (const hide_ennemi of this.hide_ennemis.children.entries) {
            if(hide_ennemi.direction=='Stop'){
                hide_ennemi.setVelocityX(0);
                
            }
            else if(hide_ennemi.direction!=='Stop' && contact!=true && epeiste_death!==true){
                if (player.x - hide_ennemi.x < 0) {
                    hide_ennemi.direction = 'LEFT';
                    hide_ennemi.anims.play("epeiste_static", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(200,275)
                    .setOffset(100,50)
                    .setFlipX(false);
                    
                }

                if (player.x - hide_ennemi.x > 0) {
                    hide_ennemi.direction = 'RIGHT';
                    hide_ennemi.anims.play("epeiste_static", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(200,275)
                    .setOffset(100,50)
                    .setFlipX(true);
                }
            }
                    
        }
        
        for (const immobile_ennemi_sensible_glace of this.immobile_ennemis_sensible_glace.children.entries) {
            if(immobile_ennemi_sensible_glace.direction=='Stop'){
                immobile_ennemi_sensible_glace.setVelocityX(0);
                
            }
            else if(immobile_ennemi_sensible_glace.direction!=='Stop' && contact!=true && epeiste_death!==true){
                if (player.x - immobile_ennemi_sensible_glace.x < 0) {
                    immobile_ennemi_sensible_glace.direction = 'LEFT';
                    immobile_ennemi_sensible_glace.anims.play("epeiste_static", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(200,275)
                    .setOffset(100,50)
                    .setFlipX(false);
                    
                }

                if (player.x - immobile_ennemi_sensible_glace.x > 0) {
                    immobile_ennemi_sensible_glace.direction = 'RIGHT';
                    immobile_ennemi_sensible_glace.anims.play("epeiste_static", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(200,275)
                    .setOffset(100,50)
                    .setFlipX(true);
                }
            }
                    
        }

        for (const masse_ennemi of this.masse_ennemis.children.entries) {
            if(masse_ennemi.direction=='Stop'){
                masse_ennemi.setVelocityX(0);
                
            }
            else if(masse_ennemi.direction!=='Stop' && contact!=true && epeiste_death!==true){
                if (player.x - masse_ennemi.x < 0) {
                    masse_ennemi.direction = 'LEFT';
                    masse_ennemi.anims.play("masse_static", true)
                    .setScale(0.3)
                    .setGravityY(300)
                    .setSize(250,260)
                    .setOffset(50,0)
                    .setFlipX(false); 
                }

                if (player.x - masse_ennemi.x > 0) {
                    masse_ennemi.direction = 'RIGHT';
                    masse_ennemi.anims.play("masse_static", true)
                    .setScale(0.3)
                    .setGravityY(300)
                    .setSize(250,260)
                    .setOffset(30,0)
                    .setFlipX(true);
                }
            }
                    
        }
        
        cooldownTirSniperEnnemiBeforeShoot--
        if(cooldownTirSniperEnnemiBeforeShoot<=0){
        cooldownTirSniperEnnemiBeforeShoot=cooldownTirSniperEnnemi

        for (const arba of this.arbas.children.entries) {
            
            if (player.x - arba.x < 0) {
                arba.anims.play("arba_attack", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(200,240)
                    .setOffset(30,0)
                    .setFlipX(false);
                var fleche = this.fleches.create(arba.x, arba.y, 'fleches').setFlipX(false).setScale(0.4);
                fleche.setVelocity(-400,0);
                fleche.body.setAllowGravity(false);
                this.physics.add.overlap(player, fleche, Fonction_Fleche, null, this);
                setTimeout(function(){arba.anims.play("arba_static", true)
                .setScale(0.25)
                .setGravityY(300)
                .setSize(200,240)
                .setOffset(30,0)
                .setFlipX(false);}, 750);
            }
            if (player.x - arba.x > 0) {
                arba.anims.play("arba_attack", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(200,240)
                    .setOffset(30,0)
                    .setFlipX(true);
                var fleche = this.fleches.create(arba.x, arba.y, 'fleches').setFlipX(true).setScale(0.4);
                fleche.setVelocity(400,0);
                fleche.body.setAllowGravity(false);
                this.physics.add.overlap(player, fleche, Fonction_Fleche, null, this);
                setTimeout(function(){arba.anims.play("arba_static", true)
                .setScale(0.25)
                .setGravityY(300)
                .setSize(200,240)
                .setOffset(30,0)
                .setFlipX(true);}, 750);
                }
            this.physics.add.collider(fleche,ground, destroyFleches, null, this);
        }
    }

    if(player.x>=1250 && player.y<=600){
            cooldownBouleMageEnnemiBeforeShoot--
            if(cooldownBouleMageEnnemiBeforeShoot<=0){
            cooldownBouleMageEnnemiBeforeShoot=cooldownBouleMageEnnemi

        for (const mage of this.mages.children.entries) {
            
            if (player.x - mage.x < 0 && cooldownRecalculationOrbeDirection==cooldownRecalculationOrbeDirectionReset) {
                mage.anims.play("mage_attack", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(240,340)
                    .setOffset(50,0)
                    .setFlipX(false);
                var orbe = this.orbes.create(mage.x, mage.y, 'orbe').setFlipX(false).setScale(0.4);
                orbe.setVelocity(-400,0);
                orbe.body.setAllowGravity(true);
                this.physics.add.overlap(player, orbe, Fonction_Boule_Mage, null, this);
                for (const orbe of this.orbes.children.entries) {
                this.physics.moveTo(orbe, player.x,player.y, vitesseBouleMageEnnemi);
                this.Orbe_Mage = this.sound.add('attaque_mage')
                var Mage_Config = {
                    mute : false,
                    volume : 0.01,
                    rate : 1,
                    deturne : 0,
                    seek : 0,
                    loop : false,
                    delay : 0,
    
                }
                this.Orbe_Mage.play(Mage_Config)
                setTimeout(function(){mage.anims.play("mage_static", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(240,340)
                    .setOffset(30,0)
                    .setFlipX(false);}, 750);
            }
        }
            if (player.x - mage.x > 0 && cooldownRecalculationOrbeDirection==cooldownRecalculationOrbeDirectionReset) {
                mage.anims.play("mage_attack", true)
                    .setScale(0.25)
                    .setGravityY(300)
                    .setSize(240,340)
                    .setOffset(30,0)
                    .setFlipX(true);
                    var orbe = this.orbes.create(mage.x, mage.y, 'orbe').setFlipX(false).setScale(0.4);
                    orbe.setVelocity(400,0);
                    orbe.body.setAllowGravity(true);
                    this.physics.add.overlap(player, orbe, Fonction_Boule_Mage, null, this);
                    for (const orbe of this.orbes.children.entries) {
                    this.physics.moveTo(orbe, player.x,player.y, vitesseBouleMageEnnemi);
                    setTimeout(function(){mage.anims.play("mage_static", true)
                        .setScale(0.25)
                        .setGravityY(300)
                        .setSize(240,340)
                        .setOffset(30,0)
                        .setFlipX(true);}, 750);
                }
            }
            setTimeout(function(){orbe.destroy();}, 10000);
        }
    }
    }

        if(doublesaut===true)
        {
        const isJumpJustDownup = Phaser.Input.Keyboard.JustDown(cursors.up)         
        //DOUBLE SAUT SI HAUT DE CAISSE
        if (isJumpJustDownup && (onGround || jumpCount < 2 || onEnnemis==true && jumpCount < 2 || inContactCaisse==true && jumpCount < 2)) 
        {
            player.setVelocityY(-170);
            jumpCount++;
        }

        if (onGround && !isJumpJustDownup)
        {
            jumpCount = 0;
        }     
    }
        if(jauge>=0 && jauge < 1)
        {
            jauge2.anims.play('jauge_0',true);        
        }
        if(jauge>=1 && jauge < 25)
        {
            jauge2.anims.play('jauge_10',true);   
        }
        if(jauge>=25 && jauge < 40)
        {
            jauge2.anims.play('jauge_25',true);  
        }
        if(jauge>=40 && jauge < 55)
        {
            jauge2.anims.play('jauge_40',true); 
        }
        if(jauge>=55 && jauge < 70)
        {
            jauge2.anims.play('jauge_55',true); 
        }
        if(jauge>=70 && jauge < 85)
        {
            jauge2.anims.play('jauge_70',true); 
        }
        if(jauge>=85 && jauge < 100)
        {
            jauge2.anims.play('jauge_85',true); 
        }
        if(jauge >= 100)
        {
            jauge2.anims.play('jauge_100',true); 
        }
      
}
}
}
///////////////////////////////////////
///////FONCTIONS SPECIALS SKILLS///////
///////////////////////////////////////
    function lancer_boule_de_feu(player){ 
        var boule_de_feu_gauche = boules_de_feu.create(player.x, player.y-15, 'boule_de_feu_gauche')
        .setGravityY(0)
        .setScale(0.1)
        var boule_de_feu_droit = boules_de_feu.create(player.x, player.y-15, 'boule_de_feu_droit')
        .setGravityY(0)
        .setScale(0.1)
        var directionFireballPlayer = Math.round(Phaser.Math.Between(0,1))

        if(cursors.left.isDown){
            directionFireballPlayer=-400;
            playerDirection='LEFT';
        }
        else if(cursors.right.isDown){
            directionFireballPlayer=400;
            playerDirection='RIGHT';
        }
        else if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && directionFireballPlayer==1){
            directionFireballPlayer=400;
        }
        else if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && directionFireballPlayer==0){
            directionFireballPlayer=-400;
        }

        if(playerDirection=='RIGHT'){
            boule_de_feu_gauche.destroy();
            boule_de_feu_droit.setVelocity(400, 0);   
        }

        else if(playerDirection=='LEFT'){
            boule_de_feu_droit.destroy();
            boule_de_feu_gauche.setVelocity(-400, 0);
        }  
        Competence_Speciale.reset();
        BDF_reload=false;   
    }

    function lancer_boule_de_glace(player){
        var boule_de_glace_gauche = boules_de_glace.create(player.x, player.y-15, 'boule_de_glace_gauche')
        .setGravityY(0)
        .setScale(0.1)
        var boule_de_glace_droit = boules_de_glace.create(player.x, player.y-15, 'boule_de_glace_droit')
        .setGravityY(0)
        .setScale(0.1)

        var directionIceBallPlayer = Math.round(Phaser.Math.Between(0,1))
        
        if(cursors.left.isDown){
            directionIceBallPlayer=-400;
            playerDirection='LEFT';
            
        }
        else if(cursors.right.isDown){
            directionIceBallPlayer=400;
            playerDirection='RIGHT';
            
        }
        else if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && directionIceBallPlayer==1){
            directionIceBallPlayer=400;
        }
        else if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && directionIceBallPlayer==0){
            directionIceBallPlayer=-400;
        }

        if(playerDirection=='RIGHT'){
            boule_de_glace_gauche.destroy();
            boule_de_glace_droit.setVelocity(400, 0);
        }

        else if(playerDirection=='LEFT'){
            boule_de_glace_droit.destroy();
            boule_de_glace_gauche.setVelocity(-400, 0);
        }
        BDG_reload=false;
    }

    function destroyFleches(fleche, ground){
        fleche.destroy();
        } 

    function destroyOrbe(orbe, ground){
        orbe.destroy();
        } 
    function destroyFireball(boules_de_feu, ground){
        boules_de_feu.destroy();
        BDF_reload=true;
        } 

    function destroyIceball(boules_de_glace, ground){
        boules_de_glace.destroy();
        BDG_reload=true;
        }
///////////////////////////////////////
/////FIN FONCTIONS SPECIALS SKILLS/////
///////////////////////////////////////

    function hitByPlayer(player, caisse)
{
    if(playerBlockedDown==true)
    {
        inContactCaisse = true;
        playerBlockedDown=false;
        Touche_Caisse=true;
    }
    if(roulade==true){
        caisse.destroy();
    }
}

    function destroyBox(boules_de_feu, caisse)
{
    caisse.destroy();
    boules_de_feu.destroy();
    BDF_reload=true;
}
///////////////////////////////////////
//////FONCTIONS RECOLTES ELEMENTS//////
///////////////////////////////////////

function Recolte_Piment(player, piment)
{
    piment.destroy();
    Buta_normal=false;
    Buta_Feu=true;
    Buta_Glace=false;
    Buta_Aile=false;
}

function Recolte_Glace(player, glace)
{
    glace.destroy();
    Buta_normal=false;
    Buta_Glace=true;
    Buta_Feu=false;
    Buta_Aile=false;
}

function Recolte_Poulet(player,poulet)
{
    poulet.destroy();
    Buta_normal=false;
    Buta_Aile=true;
    Buta_Feu=false;
    Buta_Glace=false;
    undefined_jauge=100;
}

function Recolte_Aliment(player,aliment)
{
    aliment.destroy();
    jauge += 10;
}

function Recolte_Gamelle(player,gamelle)
{
    gamelle.destroy();
    player_hp=5;
}

function Recolte_Respawn_Poulet(player,t_poulet)
{
    Buta_normal=false;
    Buta_Aile=true;
    Buta_Feu=false;
    Buta_Glace=false;
    undefined_jauge=100;
}

function Recolte_Respawn_Glace(player, respawn_glace)
{
    Buta_normal=false;
    Buta_Glace=true;
    Buta_Feu=false;
    Buta_Aile=false;
}
function Recolte_Respawn_Piment(player, respawn_piment)
{
    Buta_normal=false;
    Buta_Feu=true;
    Buta_Glace=false;
    Buta_Aile=false;
}

///////////////////////////////////////
////FIN FONCTIONS RECOLTES ELEMENTS////
///////////////////////////////////////

function Fonction_Ennemi(player,ennemi)
{
    if(ennemi.direction!=='Stop')
    {
    contact=true;
    if(player.x - ennemi.x > 0){
        ennemi.anims.play("epeiste_attack", true).setScale(0.25).setFlipX(true);
        setTimeout(function(){ennemi.anims.play("epeiste_static", true).setScale(0.25)
        .setGravityY(300)
        .setSize(200,275)
        .setOffset(100,50)
        .setFlipX(true);}, 650);
    }
    else if(player.x - ennemi.x < 0){
        ennemi.anims.play("epeiste_attack", true).setScale(0.25).setFlipX(false);
        setTimeout(function(){ennemi.anims.play("epeiste_static", true).setScale(0.25)
        .setGravityY(300)
        .setSize(200,275)
        .setOffset(100,50)
        .setFlipX(false);}, 650);
    }
    setTimeout(function(){contact = false}, 500);
    }
    if(ennemi.direction=='Stop')
    {
        doublesaut=true;
        onEnnemis=true;
        jumpCount=0;
        contact=false;
    }
    else if (invincible == false){
        player_hp = player_hp - 1;
        invincible = true;
        if (player_hp<=0){
            player_hp=0;
            this.physics.pause();
            this.scene.start("defaite");
        }   
        setTimeout(function(){invincible = false}, 650);
    }
}

function Fonction_Mage(player,mage){
    if (invincible == false){
        player.x=1250;
        player.y=500;  
        player_hp = player_hp - 2;
        invincible = true;
        if (player_hp<=0){
            player_hp=0;
            this.physics.pause();
        }   
        setTimeout(function(){invincible = false}, 650);
    }
}

function Fonction_Boule_Mage(player,orbe){
    orbe.destroy();
    if (invincible == false){
        player.x=1250;
        player.y=500;
         player_hp = player_hp - 1;
         invincible = true;
    if (player_hp<=0){
        player_hp=0;
        this.physics.pause();
        this.scene.start("defaite");
    }   
    setTimeout(function(){invincible = false}, 650);
}
}

function Fonction_Fleche(player,fleche){
    fleche.destroy();
    if (invincible == false){ 
    player_hp = player_hp - 1;
    invincible = true;
    if (player_hp<=0){
        player_hp=0;
        this.physics.pause();
        this.scene.start("defaite");
    }   
    setTimeout(function(){invincible = false}, 650);
}
}

function Fonction_Ennemi_Masse(player,masse_ennemi)
{
    if(masse_ennemi.direction!=='Stop')
    {
    contact=true;
    ejection=true;
        if(player.x - masse_ennemi.x > 0 && ejection==true){
                masse_ennemi.anims.play("masse_attack", true).setScale(0.3).setSize(250,260).setFlipX(true);
                setTimeout(function(){player.setVelocityX(500);}, 400);
                setTimeout(function(){ejection = false}, 500);
                setTimeout(function(){masse_ennemi.anims.play("masse_static", true).setScale(0.3).setSize(250,260).setFlipX(true);}, 650);
            }
        else if(player.x - masse_ennemi.x < 0 && ejection==true){
                masse_ennemi.anims.play("masse_attack", true).setScale(0.3).setSize(250,260).setFlipX(false);
                setTimeout(function(){player.setVelocityX(-500);}, 400);
                setTimeout(function(){ejection = false}, 500);
                setTimeout(function(){masse_ennemi.anims.play("masse_static", true).setScale(0.3).setSize(250,260).setFlipX(false);}, 650);
            }
    }
    setTimeout(function(){contact = false}, 500);
    if(masse_ennemi.direction=='Stop')
    {
        doublesaut=true;
        onEnnemis=true;
        jumpCount=0;
        contact=false;
    }
    else if (invincible == false){
        player_hp = player_hp - 1;
        invincible = true;
        if (player_hp<=0){
            player_hp=0;
            this.physics.pause();
            this.scene.start("defaite");
        }   
        setTimeout(function(){invincible = false}, 650);
    }
}

function Fonction_Hide_Ennemi(player, hide_ennemi){
    if(hide_ennemi.direction!=='Stop')
    {
    contact=true;
        if(player.x - hide_ennemi.x > 0){
            console.log("b")
            hide_ennemi.anims.play("epeiste_attack", true).setScale(0.25).setFlipX(true);
            setTimeout(function(){hide_ennemi.anims.play("epeiste_static", true).setScale(0.25)
                .setGravityY(300)
                .setSize(200,275)
                .setOffset(100,50)
                .setFlipX(true);}, 650);
        }
        else if(player.x - hide_ennemi.x < 0){
            console.log("c")
            hide_ennemi.anims.play("epeiste_attack", true).setScale(0.25).setFlipX(false);
            setTimeout(function(){hide_ennemi.anims.play("epeiste_static", true).setScale(0.25)
                .setGravityY(300)
                .setSize(200,275)
                .setOffset(100,50)
                .setFlipX(false);}, 650);
        }
    }
    setTimeout(function(){contact = false}, 500);
    if(hide_ennemi.direction=='Stop')
    {
        doublesaut=true;
        onEnnemis=true;
        jumpCount=0; 
    }
    else if (invincible == false && bool_hide_ennemi==false ){
        player_hp = player_hp - 1;
        invincible = true;
        if (player_hp<=0){
            player_hp=0;
            this.physics.pause();
            this.scene.start("defaite");
        }   
        setTimeout(function(){invincible = false}, 650);
    }
}

function Fonction_Immobile_Ennemi(player, immobile_ennemi){
    if(immobile_ennemi.direction=='Stop')
    {
        doublesaut=true;
        onEnnemis=true;
        jumpCount=0; 
    }
    else if (invincible == false){
        player_hp = player_hp - 1;
        invincible = true;
        if (player_hp<=0){
            player_hp=0;
            this.physics.pause();
            this.scene.start("defaite");
        }   
        setTimeout(function(){invincible = false}, 650);
    }
}

function Fonction_Immobile_Ennemi_Sensible_Glace(player, immobile_ennemi_sensible_glace){


    if(immobile_ennemi_sensible_glace.direction!=='Stop')
    {
    contact=true;
        if(player.x - immobile_ennemi_sensible_glace.x > 0){
            immobile_ennemi_sensible_glace.anims.play("epeiste_attack", true).setScale(0.25).setFlipX(true);
            setTimeout(function(){immobile_ennemi_sensible_glace.anims.play("epeiste_static", true).setScale(0.25)
        .setGravityY(300)
        .setSize(200,275)
        .setOffset(100,50)
        .setFlipX(true);}, 650);
        }
        else if(player.x - immobile_ennemi_sensible_glace.x < 0){
            immobile_ennemi_sensible_glace.anims.play("epeiste_attack", true).setScale(0.25).setFlipX(false);
            setTimeout(function(){immobile_ennemi_sensible_glace.anims.play("epeiste_static", true).setScale(0.25)
        .setGravityY(300)
        .setSize(200,275)
        .setOffset(100,50)
        .setFlipX(false);}, 650);
        }
        setTimeout(function(){contact = false}, 5000);
    }   
    if(immobile_ennemi_sensible_glace.direction=='Stop')
    {
        doublesaut=true;
        onEnnemis=true;
        jumpCount=0; 
        contact=false;
    }
    else if (invincible == false){
        player_hp = player_hp - 1;
        invincible = true;
        if (player_hp<=0){
            player_hp=0;
            this.physics.pause();
            this.scene.start("defaite");
        }   
        setTimeout(function(){invincible = false}, 650);
    }
}


function Kill_Ennemi(boules_de_feu,ennemi)
{
    epeiste_death=true;
    ennemi.anims.play("epeiste_death", true);
    boules_de_feu.destroy();
    BDF_reload=true;
    setTimeout(function(){ennemi.destroy();}, 250);
    setTimeout(function(){epeiste_death=false;}, 250);
}

function Kill_Ennemi_Arba(boules_de_feu,immobile_ennemi){
    epeiste_death=true;
    immobile_ennemi.anims.play("arba_death", true);
    boules_de_feu.destroy();
    BDF_reload=true;
    setTimeout(function(){immobile_ennemi.destroy();}, 250);
    setTimeout(function(){epeiste_death=false;}, 250);
}

function Kill_Masse_Ennemi(boules_de_feu,masse_ennemi)
{
    boules_de_feu.destroy();
    count_bdf_masse+=1
    BDF_reload=true;
    if(count_bdf_masse==2){
        epeiste_death=true;
        masse_ennemi.anims.play("masse_death", true);
        count_bdf_masse=0;
        
        setTimeout(function(){masse_ennemi.destroy();}, 250);
        setTimeout(function(){epeiste_death=false;}, 250);
    }
}

function Kill_Mage(boules_de_feu,mage)
{
    boules_de_feu.destroy();
    BDF_reload=true;
    if(invincible_ennemi==false){
        console.log("touché");
        count_bdf_mage+=1
        invincible_ennemi=true;
        setTimeout(function(){invincible_ennemi = false}, 650);
    }
    if(count_bdf_mage==5){
        epeiste_death=true;
        mage.anims.play("mage_death", true);
        
        setTimeout(function(){mage.destroy();}, 675);
        setTimeout(function(){epeiste_death=false;}, 250);
        this.scene.start("victoire");
    }
    
}

function Hide_Ennemi(boules_de_feu,hide_ennemi)
{
    for(const hide_ennemi of this.hide_ennemis.children.entries){
        hide_ennemi.destroy()
    }
    boules_de_feu.destroy();
    BDF_reload=true;
    bool_hide_ennemi=true;
}

function Gele_Ennemi(boules_de_glace,hide_ennemi,immobile_ennemi_sensible_glace, ennemi)
{
    boules_de_glace.destroy();
    BDG_reload=true;
    BDG_Touch=true;
    gel+=1;  
    if(hide_ennemi.movement!== 'Stop' && BDG_Touch==true){
        gel = true
        hide_ennemi.direction='Stop';
        movement=false;
        damageOff=true;
        hide_ennemi.anims.play('Freeze',true)
        .setScale(0.15)
        .setSize(300,450)
        .setOffset(50,-40);
        this.physics.add.collider(hide_ennemi, ground);
        this.physics.add.collider(hide_ennemi, caisses);
        this.time.delayedCall(timeoutDelayMovementEnnemi, endStopMovement, [hide_ennemi], this);
        if(death_zone==true && gel==true){
        setTimeout(function(){hide_ennemi.destroy();},5000)
        }
    }
    else if(immobile_ennemi_sensible_glace.movement!== 'Stop' && BDG_Touch==true){
        immobile_ennemi_sensible_glace.direction='Stop';
        movement=false;
        damageOff=true;
        immobile_ennemi_sensible_glace.anims.play('Freeze',true)
        .setScale(0.15)
        .setSize(300,450)
        .setOffset(50,-40);
        this.physics.add.collider(immobile_ennemi_sensible_glace, ground);
        this.physics.add.collider(immobile_ennemi_sensible_glace, caisses);
        this.time.delayedCall(timeoutDelayMovementEnnemi, endStopMovement, [immobile_ennemi_sensible_glace], this);
    }
    else if(ennemi.movement!== 'Stop' && BDG_Touch==true){
        ennemi.direction='Stop';
        movement=false;
        damageOff=true;
        ennemi.anims.play('Freeze',true)
        .setScale(0.15)
        .setSize(300,450)
        .setOffset(50,-40);
        this.physics.add.collider(ennemi, ground);
        this.physics.add.collider(ennemi, caisses);
        this.time.delayedCall(timeoutDelayMovementEnnemi, endStopMovement, [ennemi], this);
    }
    
}

function tirEnnemi(arba){ 
        for (const arba of this.arbas.children.entries) {
        var fleche = this.fleches.create(arba.x, arba.y, 'fleches').setFlipX(true).setScale(0.80);
        fleche.setVelocity(100,0);
        fleche.body.setAllowGravity(false);
  }
}


function Gele_Ennemi(boules_de_glace,hide_ennemi)
{
    boules_de_glace.destroy();
    BDG_reload=true;
    BDG_Touch=true;
    gel=1;  
    if(hide_ennemi.movement!== 'Stop' && BDG_Touch==true){
        hide_ennemi.direction='Stop';
        movement=false;
        damageOff=true;
        hide_ennemi.anims.play('Freeze',true)
        .setScale(0.15)
        .setSize(300,450)
        .setOffset(50,-40);
        this.physics.add.collider(hide_ennemi, ground);
        this.physics.add.collider(hide_ennemi, caisses);
        this.time.delayedCall(timeoutDelayMovementEnnemi, endStopMovement, [hide_ennemi], this);
    }
}


function endStopMovement(ennemi){ 
    ennemi.direction='RIGHT';
    damageOff=false;
}

function endStopMovement(immobile_ennemi_sensible_glace){ 
    immobile_ennemi_sensible_glace.direction='RIGHT';
    damageOff=false;
}

function endStopMovement(hide_ennemi){ 
    if(gel==1 && death_zone==true){
        hide_ennemi.destroy();
        gel=0;
        death_zone=false;
    }
    hide_ennemi.direction='RIGHT';
    damageOff=false;
}

function Reload_fleche(fleche){
    Fleche_reload=true;
}

function death_Zone_Spawnpoint(){
    this.cameras.main.fadeIn(1000);
            player_hp = player_hp - 1;
            if (player_hp<=0){
                player_hp=0;
                this.physics.pause();
                this.scene.start("defaite");
            }
            player.x=1850;
            player.y=1350;  
}

function death_Zone_Spawnpoint_2(player,hide_ennemi){
    this.cameras.main.fadeIn(1000);
            death_zone=true;
            hide_ennemi.destroy();
            player_hp = player_hp - 1;
            if (player_hp<=0){
                player_hp=0;
                this.physics.pause();
                this.scene.start("defaite");
            }   
            Buta_normal=true;
            Buta_Feu=false;
            Buta_Glace=false;
            Buta_Aile=false;
            player.x=2925;
            player.y=1100;  

            for(const hide_ennemi of this.Hide_EnnemiObjects){
                this.hide_ennemis.create(hide_ennemi.x, hide_ennemi.y-50,'ennemi_epeiste')
                .setScale(0.25)
                .setGravityY(300)
                .setSize(200,275)
                .setOffset(100,50);
            }
        
            for(const hide_ennemi of this.hide_ennemis.children.entries){
                this.physics.add.collider(hide_ennemi, ground);
                this.physics.add.collider(hide_ennemi, this.caisses);
                this.physics.add.collider(player, hide_ennemi, Fonction_Hide_Ennemi, null, this);
            }
            hide_ennemi.direction='RIGHT';
        }

function death_Zone_Spawnpoint_3(){
    this.cameras.main.fadeIn(1000);
    player_hp = player_hp - 1;
    if (player_hp<=0){
        player_hp=0;
        this.physics.pause();
        this.scene.start("defaite");
    }
    player.x=1250;
    player.y=500;  
}
