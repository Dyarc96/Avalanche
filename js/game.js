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
    this.player = new Game.World.Player(100, 100);
    this.collider = new Game.World.Collider();
    this.columns = 12;
    this.rows = 9;

    this.tile_size = 16;
    this.map = [01,01,01,01,01,01,01,01,01,01,01,01,
                01,02,02,02,02,02,02,02,02,02,02,01,
                01,01,01,17,02,02,02,02,10,02,02,01,
                01,02,02,02,02,18,02,02,02,02,02,03,
                01,02,02,02,02,02,02,01,09,01,01,01,
                01,02,02,18,02,01,02,02,02,18,02,01,
                01,02,17,02,02,02,02,02,02,02,02,01,
                01,02,01,02,02,02,02,26,02,02,02,01,
                01,01,01,01,01,01,01,01,01,09,01,01];
              
    this.collisionMap = [13,08,08,08,08,08,08,08,08,08,08,08,
                         02,00,00,00,00,00,00,00,00,00,00,04,
                         02,09,09,13,00,00,00,00,00,00,00,04,
                         02,00,00,00,00,00,00,00,00,00,00,04,
                         02,00,00,00,00,00,00,11,08,08,09,04,
                         02,00,00,00,00,00,00,00,00,00,00,04,
                         02,00,07,00,00,00,00,00,00,00,00,04,
                         02,00,06,00,00,00,00,00,00,00,00,04,
                         13,01,01,01,01,01,01,01,01,01,01,03];
    
    this.height = this.tile_size * this.rows;
    this.width = this.tile_size * this.columns;
  
  
    this.update = function() {
      this.player.velocity_y += this.gravity;
      this.player.update();
      this.player.velocity_x *= this.friction;
      this.player.velocity_y *= this.friction;
      this.collideWorld(this.player);
      this.getPosition()
    }
  
  }
  
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

    getPosition: function(object) {
      let playerBottom = this.player.getBottom();
      let playerTop = this.player.getTop();
      let playerLeft = this.player.getLeft();
      let playerRight = this.player.getLeft() + this.player.width;
      let bottomTile = playerBottom / this.tile_size;
      let leftTile = playerLeft / this.tile_size;
      let rightTile = playerRight / this.tile_size;
      let topTile = playerTop / this.tile_size;

      let top, right, bottom, left, value;


      top = Math.floor(this.player.getTop() / this.tile_size);
      right = Math.floor(this.player.getRight() / this.tile_size);
      value = this.collisionMap[top * this.columns + right];
      this.collider.collide(value, this.player, top * this.tile_size, right * this.tile_size, this.tile_size);

      top = Math.floor(topTile);
      left = Math.floor(leftTile);
      value = this.collisionMap[top * this.columns + left];
      this.collider.collide(value, this.player, top * this.tile_size, left * this.tile_size, this.tile_size);

      bottom = Math.floor(bottomTile);
      right = Math.floor(rightTile);
      value = this.collisionMap[bottom * this.columns + right];
      this.collider.collide(value, this.player, bottom * this.tile_size, right * this.tile_size, this.tile_size);

      bottom = Math.floor(bottomTile);
      left = Math.floor(leftTile);
      value = this.collisionMap[(bottom * this.columns + left)];
      this.collider.collide(value, this.player, bottom * this.tile_size, left * this.tile_size, this.tile_size);
    },


    update: function() {
      this.world.update();
    }
  }
    
  Game.World.Player = function(x, y) {
      this.color1 = '#404040';
      this.color2 = '#f0f0f0';
      this.height = 16;
      this.jumping = true;
      this.velocity_x = 0;
      this.velocity_y = 0;
      this.width = 16;
      this.x = x;
      this.y = y;
      this.oldX = x;
      this.oldY = y;
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

  Game.World.Collider = function() {
    this.collide = function(collision, object, tile_y, tile_x, tile_size) {
      switch(collision) {
        case 01:
            this.collidePlatformTop(object, tile_y);
            break;
        case 02:
            this.collidePlatformRight(object, tile_x + tile_size);
            break;
        case 03:
            if(this.collidePlatformTop(object, tile_y )) return;
            this.collidePlatformRight(object, tile_x + tile_size);
            break;
        case 04:
            this.collidePlatformLeft(object, tile_x);
            break;
        case 05:
            if(this.collidePlatformTop(object, tile_y)) return;
            this.collidePlatformLeft(object, tile_x);
            break;
        case 06:
          if(this.collidePlatformRight(object, tile_x + tile_size))
            this.collidePlatformLeft(object, tile_x);
            break;
        case 07:
            if(this.collidePlatformTop(object, tile_y)) return;
            if(this.collidePlatformLeft(object, tile_x)) return
            this.collidePlatformRight(object, tile_x + tile_size)
            break;
        case 08:
            this.collidePlatformBottom(object, tile_y + tile_size);
            break;
        case 09:
            if(this.collidePlatformBottom(object, tile_y + tile_size)) return;
            this.collidePlatformTop(object, tile_y + tile_size);
            break;
        case 10:
            if(this.collidePlatformBottom(object, tile_y + tile_size)) returnl
            this.collidePlatformLeft(object, tile_x);
            break;
        case 11:
            if(this.collidePlatformLeft(object, tile_x)) return;
            if(this.collidePlatformRight(object, tile_x + tile_size)) return;
              this.collidePlatformBottom(object, tile_t);
            break;
        case 12:
            if(this.collidePlatformRight(object, tile_x + tile_size)) return;
            this.collidePlatformBottom(object, tile_y + tile_size);
            break;
        case 13:
            if(this.collidePlatformTop(object, tile_y)) return;
            if(this.collidePlatformRight(object, tile_x + tile_size)) return;
            this.collidePlatformBottom(object, tile_y + tile_size);
          break;
        case 14:
            if(this.collidePlatformRight(object, tile_x + tile_size)) return;
            if(this.collidePlatformLeft(object, tile_x)) return;
            this.collidePlatformBottom(object, tile_y + tile_size);
          break;
        case 15:
            if(this.collidePlatformRight(object, tile_x + tile_size)) return;
            if(this.collidePlatformLeft(object, tile_x)) return;
            if(this.collidePlatformBottom(object, tile_y + tile_size)) return;
            this.collidePlatformTop(object, tile_y + tile_size);
          break;
        default: 
          break;
      }
    }

  }

  Game.World.Collider.prototype = {
    constructor: Game.World.Collider,
    collidePlatformTop: function(object, tile_y) {
      if(object.getBottom() > tile_y && object.getOldBottom() <= tile_y) {
        object.setBottom(tile_y - 0.01);
        return true;
      }
      return false;
    },
    collidePlatformRight: function(object, tile_x) {
      if(object.getLeft() < tile_x  && object.getOldLeft() <= tile_x) {
        object.setLeft(tile_x - 0.01);
        object.velocity_x = 0;
        object.jumping = 0;
        return true;
      }
      return false;
    },
    collidePlatformLeft: function(object, tile_x) {
      if(object.getRight() > tile_x && object.getOldRight() <= tile_x) {
        object.setRight(tile_x - 0.01);
        return true;
      }
      return false
    },
    collidePlatformBottom: function(object, tile_y) {
      if(object.getTop() < tile_y && object.getOldBottom() >= tile_y) {
        object.setTop(tile_y - 0.01);
        return true;
      }
      return false
    }
  }
    
  Game.World.Player.prototype = {
    
      constructor : Game.Player,
      jump:function() {
    
        if (!this.jumping) {
    
          this.jumping     = true;
          this.velocity_y -= 20;
        }
    
      },
    
      moveLeft: function()  { 
        this.velocity_x -= 0.7; 
      },
      moveRight: function() { 
        this.velocity_x += 0.7; 
      },
      getPosition: function() {
        console.log(this.x, this.y);
      },
      setBottom: function(tile_y) {
        this.y = Math.round(tile_y) - this.height;
        this.velocity_y = 0;
        this.jumping = false;
      },
      setRight: function(tile_x) {
        this.x = Math.round(tile_x) - this.width;
        this.velocity_x = 0;
      },
      setLeft: function(tile_x) {
        this.x = Math.round(tile_x);
        this.velocity_x = 0;
      },
      setTop: function(tile_y) {
        this.y = Math.round(tile_y);
        this.velocity_y = 0;
        this.jumping = false;
      },
      getLeft: function() { 
        return this.x;
      },
      getRight: function() { 
        return this.x + this.width;
      },
      getBottom: function() {
        return this.y + this.height;
      },
      getTop: function() {
        return this.y;
      },
      getOldLeft: function() {
        return this.oldX;
      },
      getOldRight: function() {
        return this.oldX + this.width;
      },
      getOldBottom: function() {
        return this.oldY + this.height;
      },
      getOldTop: function(){
        return this.oldY;
      },
      setOldLeft: function(x) {
        this.oldX = x;
      },
      setOldRight: function(x) {
        this.oldX = x - this.width;
      },
      setOldBottom: function(y) {
        this.oldY = y - this.height;
      },
      setOldTop: function(y) {
        this.oldY = y;
      },
      update:function() {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
      }
  };