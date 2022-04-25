import Phaser from 'phaser';
import Sky from './assets/sky.png'
import Star from './assets/star.png'
import Platform from './assets/platform.png'
import Bomb from './assets/bomb.png'
import Player from './assets/dude.png'




class MyGame extends Phaser.Scene
{



    constructor ()
    {
        super();
    }

     preload ()
    {
        this.load.image('sky', Sky)
        this.load.image('platform', Platform)
        this.load.image('star', Star)
        this.load.image('bomb', Bomb)
        this.load.spritesheet('player', Player, {
            frameWidth: 32,
            frameHeight: 48
        })
    }
      
     create ()
    {
        this.stars = this.physics.add.group({
            key:'star',
            repeat: 11,
            setXY: {x:12, y:0 ,stepX: 70}
        })
        let stars = this.stars
        stars.children.iterate(function (child){
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })
        this.add.image(400,300, 'sky')
        this.platforms = this.physics.add.staticGroup();
        let platforms = this.platforms
        platforms.create(400,568, 'platform').setScale(4).refreshBody();

        platforms.create(600, 400, 'platform');
        platforms.create(50, 250, 'platform');
        platforms.create(750, 220, 'platform');
        this.player = this.physics.add.sprite(100,450, 'player');
        let player = this.player
        player.setBounce(.2)
        //Check if this collides with outer ring of world
        player.setCollideWorldBounds(true)

        this.physics.add.collider(player, platforms)
        this.physics.add.collider(stars, platforms)
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat : -1
        });
        this.anims.create({
            key:  'turn',
            frames: [{
                key:'player',
                frame: 4
            }],
            frameRate: 20,
        });
        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'player',
                frame: 4,
            }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        function collectStar (player, stars)
        {
            stars.disableBody(true, true);
        }
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this)


    }
    
         update(){
            const cursors = this.input.keyboard.createCursorKeys();

            if (cursors.left.isDown)
{
    this.player.setVelocityX(-160);

    this.player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    this.player.setVelocityX(160);

    this.player.anims.play('right', true);
}
else
{
    this.player.setVelocityX(0);

    this.player.anims.play('turn');
}

if (cursors.up.isDown && this.player.body.touching.down)
{
    this.player.setVelocityY(-330);
}
        }
    
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: true,
        }
    },
};

const game = new Phaser.Game(config);
