import Phaser, { Curves } from 'phaser';
import SpriteSheet from './assets/v_0.1.png'

class AfterImage extends Phaser.Scene{

    constructor(gameState, path){
        super()
        const cordinatesX = path.x
        const cordinatesY = path.y
        let pathCreate = new Phaser.Curves.MoveTo(
            new Phaser.Math.Vector2(cordinatesX, cordinatesY)
        )
        new Phaser.GameObjects.PathFollower(this,pathCreate,100, 100,'masterSprite', 0  )
        console.log(path)

    }
    update(){
        this.enemy.x = path.x[this.starting]
        this.enemy.y = path.y[this.starting]
    }

}


class MyGame extends Phaser.Scene
{


    createImage(){
        new AfterImage(this, this.locations)
        
    }

    movement(){
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown)
{
    this.player.setVelocityX(-160);

}
else if (cursors.right.isDown)
{
    this.player.setVelocityX(160);

}
else
{
    this.player.setVelocityX(0);

}

if (cursors.up.isDown && this.player.body.touching.down)
{
    this.player.setVelocityY(-330);
    this.createImage()
}
    }

    constructor ()
    {
        super();
    }

     preload ()
    {
        this.load.spritesheet('masterSprite',SpriteSheet, {
            frameWidth: 16,
            frameHeight: 16,
        })

    }
      
     create ()
    {      


        this.locations = {
            x: [],
            y: []
        }
        this.platform = this.physics.add.staticGroup()
        for(let i = 0; i < 816; i+= 16){
            this.platform.create(i,590 , 'masterSprite', 11)
        }

        this.platform.create(400, 590, 'masterSprite', 11).setScale(1).refreshBody()
        
        this.player = this.physics.add.sprite(100, 100, 'masterSprite', 0)
        this.player.setCollideWorldBounds(true)
        
        this.physics.add.collider(this.player, this.platform)
        

    }
    
    update(){
        this.locations.x.push(this.player.x)
        this.locations.y.push(this.player.y)
        this.movement()
    
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
