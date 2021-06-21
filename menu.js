var player;
var death_zone=false;
var gel=false;
var ejection=false;
var contact=false;
var animation;
var Buta_normal=true;
var playerBlockedDown = false;
var inContactCaisse = false;
var cursors;
var cursor_menu;
var caisses
var caisse;
var choice=0;
var box;
var wallsLayer;
var gameOver = false;
var death;
var ground;
var Touche_Caisse=false;
var playerDirection="RIGHT";
var destroyBox;
var jumpCount=0;
var doublesaut=true;
var jump;
var background;
var jauge2;
var Jump;
var Competence_Speciale;
var death_Zone_Spawnpoint;
var hitByPlayer; 
var Recolte_Aliment;
var Recolte_Glace;
var Recolte_Piment;
var Recolte_Poulet;
var Fonction_Ennemi;
var onGround;
var image_menu = this.image_menu;
var spawnpoint=0;
//FEU
var Buta_Feu;
var piment;
var piments;
var respawn_chilli_pepper;
var lancer_boule_de_feu;
var boules_de_feu;
var destroyFireball;
var BDF_reload = true;
var count_bdf_masse = 0;
var count_bdf_mage = 0;
//GLACE
var Buta_Glace;
var glace;
var glaces;
var respawn_icecream;
var lancer_boule_de_glace;
var boules_de_glace;
var BDG_reload = true;
var timeoutResetSkill=1000;
//AILE
var Buta_Aile;
var poulet;
var poulets;
var respawn_chicken;
var flying_mode;
var Aile_reload = true;
var undefined_jauge=100;
var competence=false;
//ALIMENTS
var aliment;
var aliments;
//var jauge=0;
var jauge=0;
var jaugeText;
//ENNEMI
var ennemi;
var ennemis;
var movement=true;
var timeoutDelayMovementEnnemi=5000;
var BDG_Touch=false;
var onEnnemis=false;
var bool_hide_ennemi=false;
var epeiste_death=false;
var fleche;
var fleches;
var tir_fleche;
var Fleche_reload=true;
var immobile_ennemi;
var invincible_ennemi=false;
//HP
var player_hp = 5;
var invincible = false;
var full_heart_1;
var full_heart_2;
var full_heart_3;
var full_heart_4;
var full_heart_5;
var empty_heart_1;
var empty_heart_2;
var empty_heart_3;
var empty_heart_4;
var empty_heart_5;
var damageOff=false;
//////////////
//CONTROLES
var Haut;
var Bas;
var Gauche;
var Droite;
var Roulade;
var roulade = false;

////
var vitesseFlecheEnnemi=400
var cooldownTirSniperEnnemi=200
var cooldownTirSniperEnnemiBeforeShoot =cooldownTirSniperEnnemi
var ballesSniper;

var vitesseBouleMageEnnemi=200
var cooldownBouleMageEnnemi=200
var cooldownBouleMageEnnemiBeforeShoot =cooldownBouleMageEnnemi
var bouleMage;
var cooldownRecalculationOrbeDirection = 100
var cooldownRecalculationOrbeDirectionReset = cooldownRecalculationOrbeDirection

var timeoutDelayScreen=50;

var music;

var commandeMobile = false;

var Touche_droite;
var Touche_gauche;
var Touche_haut;
var Touche_bas;

class menu extends Phaser.Scene{
    constructor(){
        super("menu");
    }
    init(data){
    }

preload(){
    this.load.audio('Ambiance', 'assets/SFX/Note.mp3');
    this.load.audio('sound_bdf', 'assets/SFX/boule_de_feu.mp3');
    this.load.audio('sound_bdg', 'assets/SFX/boule_de_feu.mp3');
    this.load.audio('attaque_mage', 'assets/SFX/attaque_mage.mp3');
    this.load.image('menu', 'assets/Menu_Full_v2.png');
    this.load.image('jouer','assets/Jouer.png');
    this.load.image('quitter', 'assets/Quitter.png');
    this.load.image('Menu_controle', 'assets/Menu_controle.png');
    this.load.image('Menu_controle_test', 'assets/Menu_controle_test.png');
    this.load.image('skip_repas_false', 'assets/skip_repas_false.png');
    this.load.image('skip_repas_true', 'assets/skip_repas_true.png');
    this.load.image('bg', 'assets/decor2.jpg');
    this.load.image('game_over','assets/game_over.jpg');
    this.load.image('game_over_text1','assets/game_over_text1.png');
    this.load.image('game_over_text2','assets/game_over_text2.png');
    this.load.image('game_over_rejouer','assets/game_over_rejouer.png');
    this.load.image('victory_screen','assets/victory_screen.png');
    this.load.image('victory_screen_text1','assets/victory_screen_text1.png');
    this.load.image('victory_screen_text2','assets/victory_screen_text2.png');
    this.load.image('victory_screen_text3','assets/victory_screen_text3.png');
    this.load.image('rejouer','assets/Rejouer.png');
    this.load.image('quitter2','assets/Quitter2.png');
    this.load.image('mobile_off','assets/mobile_off.png');
    this.load.image('mobile_on','assets/mobile_on.png');
    this.load.image('Touche_droite','assets/Touche_droite.png');
    this.load.image('Touche_gauche','assets/Touche_gauche.png');
    this.load.image('Touche_haut','assets/Touche_haut.png');
    this.load.image('Touche_bas','assets/Touche_bas.png');
    this.load.image('Competence_Speciale','assets/Competence_Speciale.png');
    this.load.image('Roulade','assets/Roulade.png');

    //this.load.image('bg_menu', 'assets/decor.jpg');
    this.load.image('tiles','assets/tiles/tiles.png');
    this.load.image('box','assets/box.png');
    this.load.image('gamelle','assets/full_heart.png');
    this.load.image('chilli_pepper','assets/Piment.png');
    this.load.image('ice_cream','assets/Glace.png');
    this.load.image('boule_de_feu_droit','assets/boule_de_feu_droit.png');
    this.load.image('boule_de_feu_gauche','assets/boule_de_feu_gauche.png');
    this.load.image('boule_de_glace_droit','assets/boule_de_glace_droit.png');
    this.load.image('boule_de_glace_gauche','assets/boule_de_glace_gauche.png');
    this.load.image('chicken','assets/Poulet.png');
    this.load.image('food','assets/Aliment.png');
    //this.load.image('ennemi','assets/Perso_3.png');
    //this.load.tilemapTiledJSON('map','assets/tiles/RaionVille.json');
    this.load.tilemapTiledJSON('map','assets/tiles/Raion_Full.json');
    this.load.image('full_heart', 'assets/full_heart.png');
    this.load.image('empty_heart', 'assets/empty_heart.png');
    this.load.image('buta_menu', 'assets/buta.png');
    this.load.image('fleches', 'assets/fleches.png');
    this.load.image('orbe', 'assets/orbe.png');
    this.load.spritesheet('ennemi_freeze','assets/BG_FX_glace.png', {frameWidth:400, frameHeight:590});
    this.load.spritesheet('ennemi_bouclier','assets/BG_FX_Shield.png', {frameWidth:290, frameHeight:440});
    this.load.spritesheet('mage','assets/sprite_mage.png', {frameWidth:340, frameHeight:345});
    this.load.spritesheet('ennemi_arba','assets/sprite_ennemi_arba.png', {frameWidth:295, frameHeight:243});
    this.load.spritesheet('ennemi_masse','assets/sprite_ennemi_masse.png', {frameWidth:320, frameHeight:262});
    this.load.spritesheet('ennemi_epeiste','assets/sprite_epeiste.png', {frameWidth:390, frameHeight:350});
    this.load.spritesheet('ennemi_immobile_sensible_glace','assets/Perso_BG_3.png', {frameWidth:290, frameHeight:400});
    this.load.spritesheet('sprite', 'assets/spritesheet.png', { frameWidth:398, frameHeight:228});
    this.load.spritesheet('sprite_buta_normal', 'assets/sprite_buta_normal.png', { frameWidth:988, frameHeight:800});
    this.load.spritesheet('sprite_buta_feu', 'assets/sprite_buta_feu.png', { frameWidth:988, frameHeight:800});
    this.load.spritesheet('sprite_buta_aile', 'assets/sprite_buta_aile.png', { frameWidth:994, frameHeight:1600});
    this.load.spritesheet('sprite_buta_aile_vole', 'assets/sprite_buta_aile_vole.png', { frameWidth:951, frameHeight:1080});
    this.load.spritesheet('sprite_buta_glace', 'assets/sprite_buta_glace.png', { frameWidth:988, frameHeight:800});
}

create(){
    
    cursors = this.input.keyboard.createCursorKeys(); 

    this.anims.create({
        key: 'buta_normal_right',
        frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
}); 

    this.add.image(0, 0, 'menu').setOrigin(0).setScale(1);
    
    let playButton = this.add.image (400, 225, 'jouer').setOrigin(0.25,1.25).setScale(0.15);
    let quitter = this.add.image (400, 225, 'quitter').setOrigin(0.25,-0.5).setScale(0.15);
    let hoverSprite = this.add.sprite(0,0,"sprite_buta_normal").setScale(0.05).setVisible(false).setOrigin(-3,-1.7);
    let buttonChoixMobile = this.add.image(100, 400, 'mobile_off').setScrollFactor(0).setScale(0.1);


// PointerEvents:
//   pointerover - hovering
//   pointerout - not hovering
//   pointerup - click and releae
//   pointerdown - just click

    playButton.setInteractive();
    quitter.setInteractive();
    buttonChoixMobile.setInteractive();

    playButton.on("pointerover", ()=>{  
        hoverSprite.setVisible(true);
        hoverSprite.x = playButton.x - playButton.width/6;
        hoverSprite.y = playButton.y/3;
        hoverSprite.play("buta_normal_right");
    })

    playButton.on("pointerout", ()=>{
        hoverSprite.setVisible(false);
    })

    quitter.on("pointerover", ()=>{
        hoverSprite.setVisible(true);
        hoverSprite.x = quitter.x - quitter.width/6;
        hoverSprite.y = quitter.y/1.05;
        hoverSprite.play("buta_normal_right");
    })

    quitter.on("pointerout", ()=>{
        hoverSprite.setVisible(false);
    })

    playButton.on("pointerdown", ()=>{
        this.scene.start("affichage_ctrl");
        this.cameras.main.once('camerafadeincomplete', function (camera) {
            camera.fadeOut(1000);
        })
    })

    quitter.on("pointerdown", ()=>{
        game.destroy(true, false);
    })

    buttonChoixMobile.on('pointerdown', function(){
        if (commandeMobile == false){
            commandeMobile = true;
            this.add.image(100, 400, 'mobile_on').setScrollFactor(0).setScale(0.1);
        }
        else {
            commandeMobile = false;
            this.add.image(100, 400, 'mobile_off').setScrollFactor(0).setScale(0.1);
        }
    }, this)
}
}