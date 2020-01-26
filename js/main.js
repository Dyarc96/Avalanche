window.onload = () => {
    "use strict"
    
    var onKeyDown = function(keytype, keycode){
        controller.onkeydown(keytype, keycode);
    }

    var resize = function(event) {
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();
    }

    var render = function() {
        display.fill('#202830');
        display.drawMap(game.world.map, game.world.columns);
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
        }
        game.update();
    }

    var display = new Display(document.querySelector('canvas'));
    var controller = new Controller();
    var engine = new Engine(1000/30, render, update);
    var game = new Game();

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    display.tile_sheet.image.addEventListener('load', function(event) {
        resize();
        engine.start();
    }, { once: true });

    // display.background.addEventListener('load', function(event) {
    //     resize();
    //     engine.start();
    // }, { once: true });

    display.tile_sheet.image.src = "RoguelikeDungeonTileset.png";
    // display.background.src = 'SkyBG.png';

    window.addEventListener('keydown', e => {
        onKeyDown(e.type, e.keyCode);
    });

    window.addEventListener('keyup', e => {
        onKeyDown(e.type, e.keyCode);
    });

    window.addEventListener('resize', () => {
        resize();
    });

    resize();

    engine.start();
}