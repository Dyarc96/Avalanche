const Game = function() {

    this.world = {

      background_color:"rgba(40,48,56,0.25)",
      friction:0.9,
      gravity:3,
      player: new Game.Player(),
      obstacle: new Game.Obstacle(),
      height:72,
      width:128,
      collideWorld:function(object) {
  
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

      collideObject: function(player, obstacle) {
        // Left side
        if(player.x <= obstacle.x + obstacle.width
          && player.y === 56 && player.x + player.width >= obstacle.x ) {
          player.x = player.x + player.width;
          player.velocity_x = 0;
        }
        if(player.x + player.width >= obstacle.x && player.y === 56 && player.x <= obstacle.x + obstacle.width) {
        }
        // if && player.y === 56) {
        //   player.velocity_x = 0;
        // }
      },


      update:function() {
        this.player.velocity_y += this.gravity;
        this.player.update();
        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;
        this.collideWorld(this.player);
        this.collideWorld(this.obstacle);
        this.collideObject(this.player, this.obstacle);
      }
  
    };
  
    this.update = function() {
      this.world.update();
    };
};
  
Game.prototype = { 
    constructor : Game 
};
  
Game.Player = function(x, y) {
    this.color      = "#ff0000";
    this.height     = 16;
    this.jumping    = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width      = 16;
    this.x          = 0;
    this.y          = 100;
};

Game.Obstacle = function(x, y) {
  this.color = '#5c045c';
  this.height = 10;
  this.width = 10;
  this.velocity_x = 0;
  this.velocity_y = 0
  this.x = 50;
  this.y = 100;
}

Game.Obstacle.prototype = {
  constructor: Game.Obstacle,
  collide: () => {
    // console.log(tame);
  }
}
  
Game.Player.prototype = {
  
    constructor : Game.Player,
    jump:function() {
  
      if (!this.jumping) {
  
        this.color = "#" + Math.floor(Math.random() * 16777216).toString(16);
        if (this.color.length != 7) {
          this.color = this.color.slice(0, 1) + "0" + this.color.slice(1, 6);
        }
  
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