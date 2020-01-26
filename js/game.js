const Game = function() {

  this.world = new Game.World();
  this.update = function() {
    this.world.update();
  }
}
  
Game.prototype = { 
    constructor : Game 
};

Game.World = function(friction = 0.9, gravity = 3) {
  this.friction = friction;
  this.gravity = gravity;
  this.player = new Game.World.Player();
  this.columns = 12;
  this.rows = 9;
  // this.tile_size = 48;
  this.tile_size = 16;
  this.map =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];
  this.height = this.tile_size * this.rows;
  this.width = this.tile_size * this.columns;


  this.update = function() {
    this.player.velocity_y += this.gravity;
    this.player.update();
    this.player.velocity_x *= this.friction;
    this.player.velocity_y *= this.friction;
    this.collideWorld(this.player);
    // this.game.world.collideWorld(this.obstacle);
    // this.collideObject(this.player, this.obstacle);
  }

};

Game.World.prototype = {

  constructor: Game.World,

  collideWorld: function(object) {
  
    if (object.x < 0) { 
        object.x = 0;
        object.velocity_x = 0; 
    } else if (object.x + object.width > this.width) { 
        object.x = this.width - object.width; 
        object.velocity_x = 0; 
    };
    if (object.y < 0) {
        object.y = 0; 
        object.velocity_y = 0; 
    } else if (object.y + object.height > this.height) { 
        object.jumping = false;
         object.y = this.height - object.height; 
        object.velocity_y = 0;
    }
  },

  // collideObject: function(player, obstacle) {
  //   console.log(player.x + player.width, obstacle.x, player.y);
  //   // Left side
  //   // if(player.x <= obstacle.x + obstacle.width
  //   //   && player.y === 56 && player.x + player.width >= obstacle.x ) {
  //   //   player.x = obstacle.x + obstacle.width;
  //   //   player.velocity_x = 0;
  //   // }
  //   if(player.x + player.width >= obstacle.x &&
  //     player) {
  //     console.log('place spotted');
  //   }
  //   // if(player.x + player.width >= obstacle.x && player.y === 56
  //   //   && player.x + player.width <= obstacle.x + obstacle.width) {
  //   //   console.log('fire');
  //   //   player.x = 0;
  //   //   player.velocity_x = 0;
  //   // }
  //   // if && player.y === 56) {
  //   //   player.velocity_x = 0;
  //   // }
  // },

  update: function() {
    this.world.update();
  }
}
  
Game.World.Player = function(x, y) {
    this.color1     = '#404040';
    this.color2     = '#f0f0f0';
    this.height     = 16;
    this.jumping    = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width      = 16;
    this.x          = 100;
    this.y          = 100;
};

// Game.WorldObstacle = function(x, y) {
//   this.color = '#5c045c';
//   this.height = 10;
//   this.width = 10;
//   this.velocity_x = 0;
//   this.velocity_y = 0
//   this.x = 50;
//   this.y = 100;
// }

// Game.Obstacle.prototype = {
//   constructor: Game.Obstacle,
//   collide: () => {
//     // console.log(tame);
//   }
// }
  
Game.World.Player.prototype = {
  
    constructor : Game.Player,
    jump:function() {
  
      if (!this.jumping) {
  
        this.jumping     = true;
        this.velocity_y -= 20;
      }
  
    },
  
    moveLeft:function()  { this.velocity_x -= 0.7; },
    moveRight:function() { this.velocity_x += 0.7; },
    update:function() {
  
      this.x += this.velocity_x;
      this.y += this.velocity_y;
  
    }
};