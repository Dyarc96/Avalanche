const Game = function() {
    this.world = {
        background_color: 'rgba(231, 238, 222, 1)',
        friction: 0.9,
        gravity: 3,
        player: new Game.Player(),
        width: 72,
        height: 128,

        collideObject: function(object) {
            if(object.x < 0) {
                object.x = 0;
                object.velocity_x = 0;
            } else if(object.x + object.width > this.width) {
                object.x = object.x + object.width;
                object.velocity_x = 0;
            }
            if(object.y < 0) {
                object.y = 0;
                object.velocity_y = 0;
            } else if (object.y + object.height > this.height) {
                object.y = this.height - object.height;
                object.velocity_y = 0;
                object.jumping = false;
            }
        },

        update: function() {
            this.player.velocity_y += this.gravity;
            this.player.update();
            this.player.velocity_x *= this.friction;
            this.player.velocity_y *= this.friction;

            this.collideObject(this.player);
        }
    }

    this.update = function() {
        this.world.update();
    }
    
}