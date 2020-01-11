window.onload = () => {

    let display = new Display(document.querySelector('canvas'));
    
    display.fillScreen();

    window.addEventListener('resize', () => {
        console.log(window.innerWidth, window.innerHeight);
        display.resize();
    });
}