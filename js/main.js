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
        display.fill(game.world.background_color);
        display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
        display.drawRectangle(game.world.obstacle.x, game.world.obstacle.y, game.world.obstacle.width, game.world.obstacle.height, game.world.obstacle.color)
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
        // game.world.obstacle.collide();

        game.update();
    }

    var display = new Display(document.querySelector('canvas'));
    var controller = new Controller();
    var engine = new Engine(1000/30, render, update);
    var game = new Game();

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

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