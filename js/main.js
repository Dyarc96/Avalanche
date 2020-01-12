window.onload = () => {

    let display = new Display(document.querySelector('canvas'));
    let controller = new Controller();
    
    display.fillScreen();

    window.addEventListener('resize', () => {
        display.resize();
    });

    window.addEventListener('keydown', e => {
        controller.onkeydown(e);
    })
}