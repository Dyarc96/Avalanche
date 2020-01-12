window.onload = () => {

    let display = new Display(document.querySelector('canvas'));
    let controller = new Controller();
    
    display.fillScreen();

    window.addEventListener('resize', () => {
        console.log(window.innerWidth, window.innerHeight);
        display.resize();
    });

    window.addEventListener('keydown', e => {
        controller.onkeydown(e);
    })
}