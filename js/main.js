window.onload = () => {

    let display = new Display(document.querySelector('canvas'));
    let controller = new Controller();
    let engine = new Engine();

    function onKeyDown (keycode){
        controller.onkeydown(keycode)
    }
    
    display.fillScreen();

    window.addEventListener('resize', () => {
        display.resize();
    });

    window.addEventListener('keydown', e => {
        onKeyDown(e.keyCode);
    });

    engine.start();
}