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
    this.player = new Game.World.Object.Player(100, 100);
    this.collider = new Game.World.Collider();
    this.tileset = new Game.World.TileSet(8, 16);
    this.collectable = new Game.World.Object.Collectable(16, 16);
    this.columns = 14;
    this.rows = 9;

    this.tile_size = 16;
    
    this.map =          [09,09,09,09,09,09,09,09,09,09,09,09,09,09,
                         09,10,10,10,10,10,10,10,10,10,10,10,10,09,
                         09,09,09,17,10,13,10,10,10,14,10,10,10,09,
                         09,10,10,10,10,10,10,10,10,10,10,10,10,11,
                         09,10,22,10,10,10,10,09,09,17,09,09,17,09,
                         09,10,10,18,10,09,10,10,10,18,10,10,10,09,
                         09,10,17,10,10,10,10,10,10,10,22,10,10,09,
                         09,10,09,10,10,10,10,10,10,10,10,10,10,09,
                         09,09,09,09,09,09,09,09,09,09,09,09,09,09];
              
    this.collisionMap = [13,08,08,08,08,08,08,08,08,08,08,08,08,08,
                         04,00,00,00,00,00,00,00,00,00,00,00,00,02,
                         04,09,09,13,00,15,00,00,00,00,00,00,00,02,
                         04,00,00,00,00,00,00,00,00,00,00,00,00,02,
                         04,00,00,00,00,00,00,11,09,09,09,09,09,02,
                         04,00,00,00,00,15,00,00,00,00,00,00,00,02,
                         04,00,07,00,00,00,00,00,00,00,00,00,00,02,
                         04,00,06,00,00,00,00,00,00,00,00,00,00,02,
                         13,01,01,01,01,01,01,01,01,01,01,03,03,08];
    
    this.height = this.tile_size * this.rows;
    this.width = this.tile_size * this.columns;
  
  }
  
  Game.World.prototype = {
  
    constructor: Game.World,
  
    collideWorld: function(object) {
      let playerBottom = object.getBottom();
      let playerTop = object.getTop();
      let playerLeft = object.getLeft();
      let playerRight = object.getRight();
      let bottomTile = playerBottom / this.tile_size;
      let leftTile = playerLeft / this.tile_size;
      let rightTile = playerRight / this.tile_size;
      let topTile = playerTop / this.tile_size;


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

      let top, right, bottom, left, value;

      top = Math.floor(topTile);
      right = Math.floor(rightTile);
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
      this.player.updatePosition(this.gravity, this.friction);
      this.collideWorld(this.player);
      this.player.updateAnimation();
      this.collectable.getCollision(this.player.x, this.player.y);
    }
  }

  Game.World.Collider = function() {
    this.collide = function(collision, object, tile_y, tile_x, tile_size) {
      switch(collision) {
        case 01:
            this.collidePlatformTop(object, tile_y);
            break;
        case 02:
            this.collidePlatformLeft(object, tile_x);
            break;
        case 03:
            if(this.collidePlatformTop(object, tile_y)) return;
            this.collidePlatformLeft(object, tile_x)
            break;
        case 04:
            this.collidePlatformRight(object, tile_x + tile_size);
            break;
        case 05:
            if(this.collidePlatformTop(object, tile_y)) return;
            this.collidePlatformRight(object, tile_x + tile_size);
            break;
        case 06:
            if(this.collidePlatformRight(object, tile_x + tile_size)) return;
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
            this.collidePlatformTop(object, tile_y);
            break;
        case 10:
            if(this.collidePlatformBottom(object, tile_y + tile_size)) return;
            this.collidePlatformLeft(object, tile_x);
            break;
        case 11:
            if(this.collidePlatformTop(object, tile_y)) return;
            if(this.collidePlatformLeft(object, tile_x)) return;
              this.collidePlatformBottom(object, tile_y + tile_size);
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
          if(this.collidePlatformTop(object, tile_y)) return;
          if(this.collidePlatformLeft(object, tile_x)) return;
          if(this.collidePlatformRight(object, tile_x + tile_size)) return;
            this.collidePlatformBottom(object, tile_y + tile_size)
          break;
      }
    }

  }

  Game.World.Collider.prototype = {
    constructor: Game.World.Collider,
    collidePlatformTop: function(object, tile_y) {
      if(object.getBottom() > tile_y && object.getOldBottom() <= tile_y) {
        object.setBottom(tile_y - 0.01);
        object.velocity_y = 0;
        object.jumping    = false;
        return true;
      }
      return false;
    },
    collidePlatformRight: function(object, tile_x) {
      if(object.getLeft() < tile_x  && object.getOldLeft() >= tile_x) {
        object.setLeft(tile_x);
        object.velocity_x = 0;
        return true;
      }
      return false;
    },
    collidePlatformLeft: function(object, tile_x) {
      if(object.getRight() > tile_x && object.getOldRight() <= tile_x) {
        object.setRight(tile_x - 0.01);
        this.velocity_x = 0;
        return true;
      }
      return false
    },
    collidePlatformBottom: function(object, tile_y) {
      if(object.getTop() < tile_y && object.getOldTop() >= tile_y) {
        object.setTop(tile_y);
        object.velocity_y = 0;
        return true;
      }
      return false
    }
  }

  Game.World.Object = function(x, y, height, width) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
  }

  Game.World.Object.prototype = {
    constructor: Game.World.Object,

    setBottom: function(tile_y) {
      this.y = Math.round(tile_y) - this.height;
    },
    setRight: function(tile_x) {
      this.x = Math.round(tile_x) - this.width;
    },
    setLeft: function(tile_x) {
      this.x = Math.round(tile_x);
    },
    setTop: function(tile_y) {
      this.y = Math.round(tile_y);
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
  }

  Game.World.Object.Animator = function(frame_set, delay) {
    this.count = 0;
    this.delay = (delay >= 1) ? delay : 1;
    this.frame_set = frame_set;
    this.frame_index = 0;
    this.frame_value = frame_set[0];
    this.mode = "loop";
  }

  Game.World.Object.Animator.prototype = {
    constructor: Game.World.Object.Animator,
    loop: function() {
      this.count ++;
      while(this.count > this.delay) {
        this.count -= this.delay;
        this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;
        this.frame_value = this.frame_set[this.frame_index];
      }
    },
    changeFrameSet: function(frame_set, mode, delay = 10, frame_index = 0) {
      if (this.frame_set === frame_set) { return ;}
      this.count = 0;
      this.delay = delay;
      this.frame_set = frame_set;
      this.frame_index = frame_index;
      this.frame_value = frame_set[frame_index];
      this.mode = mode;
    },
    animate: function() {
      switch(this.mode) {
        case "loop" : this.loop(); break;
        case "pause" : break;
      }
    }
  }
      
  Game.World.Object.Player = function(x, y) {
    Game.World.Object.call(this, 100, 100, 12, 12);
    let frame = Game.World.Object.Player.prototype.frame_sets["idle_right"];
    Game.World.Object.Animator.call(this, frame, 10);

    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.direction = 1;
    this.collection = 0;
};
    
  Game.World.Object.Player.prototype = {
    
      constructor : Game.World.Object.Player,

      frame_sets: {
        "idle_right": [0, 1], 
        "walk_right": [2, 3, 4],
        "jump_right": [5, 6, 7, 8],
        "idle_left": [9, 10],
        "walk_left": [11, 12, 13],
        "jump_left": [14, 15, 16, 17]
      },

      jump:function() {
        if (!this.jumping) {
          this.jumping     = true;
          this.velocity_y -= 18;
        }
    
      },

      moveLeft: function()  { 
        this.velocity_x -= 0.5; 
        this.direction_x = -1;
      },
      moveRight: function() { 
        this.velocity_x += 0.5;
        this.direction_x = 1;
      },
      
      updateAnimation() {
        if (this.velocity_y < 0) {
          if (this.direction_x < 0.1) this.changeFrameSet(this.frame_sets["jump_left"], "loop", 5);
          else this.changeFrameSet(this.frame_sets["jump_right"], "loop", 5);

        } else if (this.direction_x < 0) {
          if (this.velocity_x < -0.1) this.changeFrameSet(this.frame_sets["walk_left"], "loop", 5);
          else this.changeFrameSet(this.frame_sets["idle_left"], "loop");
    
        } else if (this.direction_x > 0) {
    
          if (this.velocity_x > 0.1) this.changeFrameSet(this.frame_sets["walk_right"], "loop", 5);
          else this.changeFrameSet(this.frame_sets["idle_right"], "loop");
    
        }
        this.animate();
      },
    
      updatePosition:function(gravity, friction) {
        this.oldX = this.x;
        this.oldY = this.y;
        this.velocity_y += gravity;
        this.x    += this.velocity_x;
        this.y    += this.velocity_y;
    
        this.velocity_x *= friction;
        this.velocity_y *= friction;
      }
  };

  Game.World.TileSet = function(tile_size, columns) {
    this.tile_size = tile_size;
    this.columns = columns;

    let f = Game.World.TileSet.Frameset;

    this.frames = [new f(0, 0, 16, 16, 0, -4), new f(48, 0, 16, 16, 0, -4), // 'idle_right'
      new f(0, 96, 16, 16, 0, -4), new f(16, 96, 16, 16, 0, -4), new f(32, 96, 16, 16, 0, -4), // 'walk_right'
      new f(0, 0, 16, 16, 0, -4), new f(16, 0, 16, 16, 0, -4), new f(32, 0, 16, 16, 0, -4),  new f(48, 0, 16, 16, 0, -4),// 'jump_right' 
      new f(48, 112, 16, 16, 0, -4), new f(0, 112, 16, 16, 0, -4), // 'idle_left'
      new f(48, 16, 16, 16, 0, -4), new f(32, 16, 16, 16, 0, -4), new f(16, 16, 16, 16, 0, -4), // 'walk_left'
      new f(48, 112, 16, 16, 0, -4), new f(32, 112, 16, 16, 0, -4), new f(16, 112, 16, 16, 0, -4), new f(0, 112, 16, 16, 0, -4), // 'jump_left'
      new f(32, 48, 16, 16, 0, -4), // 'crate_opened'
      new f(48, 48, 16, 16, 0, -4)] // 'crate_closed' 
    }
    
  Game.World.TileSet.prototype = {
    constructor: Game.World.TileSet
  }

  Game.World.TileSet.Frameset = function(x, y, width, height, offsetX, offsetY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  Game.World.TileSet.Frameset.prototype = {
    constructor: Game.World.TileSet.Frameset
  }

  // Super object for making crates - specyfing number and placement

  Game.World.Collectables = function(num, placement) {
    this.num = num;
    this.placement = placement;
  }

  Game.World.Collectables.prototype = {
    constructor: Game.World.Collectables
  }

  Game.World.Object.Collectable = function(x, y) {
    let frame = Game.World.Object.Collectable.prototype.frame_sets["open"];
    Game.World.Object.Animator.call(this, frame, 10);

    this.x = x;
    this.y = y;
    this.opened = false;
  }

  // Check for collision inside collectable
  // How to make multiple objects like it

  Game.World.Object.Collectable.prototype = {
    constructor: Game.World.Object.Collectable,

    frame_sets: {
      "idle": [18],
      "open": [19]
    },

    getCollision: function(playerX, playerY) {
      if(playerX <= this.x + 16 && playerY < this.y + 20) {
        this.changeFrameSet(this.frame_sets["open"], "pause");
        this.opened = true;
      } else {
        if(!this.opened) {
          this.changeFrameSet(this.frame_sets["idle"], "pause");
        }
      }
    }
  }

  Object.assign(Game.World.Object.Player.prototype, Game.World.Object.prototype);
  Object.assign(Game.World.Object.Player.prototype, Game.World.Object.Animator.prototype);
  Object.assign(Game.World.Object.Collectable.prototype, Game.World.Object.Animator.prototype);
  Game.World.Object.Player.prototype.constructor = Game.World.Object.Player;