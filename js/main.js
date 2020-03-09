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
        // Here we are doinh important thingsa
        display.fill('#202830');
        display.drawMap(game.world.map, game.world.columns, assetmanager.tile_set_image);
        display.drawPlayer(game.world.player, game.world.player.color1, game.world.player.color2);
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
        console.log('eoeoe');
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
        console.log('soos');
        resize();
    });

    render();
}