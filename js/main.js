window.onload = () => {

    let display = new Display(document.querySelector('canvas'));
    let controller = new Controller();
    let engine = new Engine();

    function onKeyDown (keycode){
        controller.onkeydown(keycode)
    }

    window.addEventListener('resize', () => {
        display.resize();
        display.render();
    });

    let render = function() {
        display.fill(game)
    }

    window.addEventListener('keydown', e => {
        onKeyDown(e.keyCode);
    });

    engine.start();
}