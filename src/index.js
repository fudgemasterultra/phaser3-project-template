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
        
    }
      
     create ()
    {

        

    }
    
         update(){
    
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
