window.onload = () => {
    "use strict"

    const AssetManager = function() {
        this.tile_set_image = undefined;
    } 

    AssetManager.prototype = {
        
        constructor: Game.AssetManager,

        loadTileSetImage: function(url, callback) {
            
            this.tile_set_image = new Image();

            this.tile_set_image.addEventListener('load', e => {
                callback();
            }, { once: true});
            this.tile_set_image.src = url;
        }
    }
    
    var onKeyDown = function(keytype, keycode){
        controller.onkeydown(keytype, keycode);
    }

    var resize = function(event) {
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();
    }

    var render = function() {
        let frame = game.world.tileset.frames[game.world.player.frame_value];
        let crate = game.world.tileset.frames[game.world.collectable.frame_value];
        display.drawMap(game.world.map, game.world.columns, assetmanager.tile_set_image);
        display.drawObject(assetmanager.tile_set_image,
            frame.x, frame.y,
            game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offsetX,
            game.world.player.y + frame.offsetY, frame.width, frame.height);
        display.drawObject(assetmanager.tile_set_image,
            crate.x, crate.y, game.world.collectable.x, game.world.collectable.y, crate.height, crate.width
            )
        display.render();
    }

    var update = function() {
        if(controller.left.active) {
            game.world.player.moveLeft();
        }
        if(controller.right.active) {
            game.world.player.moveRight();
        }
        if(controller.up.active) {
            game.world.player.jump();
            controller.up.active = false;
        }
        game.update();
    }

    var display = new Display(document.querySelector('canvas'));
    var controller = new Controller();
    var engine = new Engine(1000/30, render, update);
    var game = new Game();
    var assetmanager = new AssetManager();

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    assetmanager.loadTileSetImage('tile_map1.png', () => {
        resize();
        engine.start();
    })

    window.addEventListener('keydown', e => {
        onKeyDown(e.type, e.keyCode);
    });

    window.addEventListener('keyup', e => {
        onKeyDown(e.type, e.keyCode);
    });

    window.addEventListener('resize', () => {
        resize();
    });

    render();
}