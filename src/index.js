import Phaser from 'phaser';
import SpriteSheet from './assets/v_0.1.png'



class AfterImage extends Phaser.Scene{

    constructor(game, path){
        super()
        this.xCordinates = [...path.x];
        this.yCordinates = [...path.y];
        this.enemyAfterImage = game.physics.add.sprite(100, 100, 'masterSprite', 0).setGravity(0,0).refreshBody()
        game.physics.add.overlap(this.enemyAfterImage, game.player, () => {
            console.log('overlapped')
        })
    }
    

    move(){
        if(this.xCordinates.length == 0){
            this.enemyAfterImage.destroy();
            return false
        }
        this.enemyAfterImage.x = this.xCordinates.shift()
        this.enemyAfterImage.y = this.yCordinates.shift()
        return true
    }


}


class MyGame extends Phaser.Scene
{
    afterImageMovement(){
        this.pastTravler.forEach((enemyAfterImage, index, object) =>{
            if(!enemyAfterImage.move()){
                this.pastTravler.splice(index, 1)
            }

        })
    }


    createImage(){
        this.pastTravler.push(new AfterImage(this, this.locations))
        
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
        this.pastTravler = []
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
        this.afterImageMovement()
    
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
