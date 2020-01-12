const Display = function(canvas) {
    this.canvas = canvas;
    this.buffer = this.canvas.getContext('2d');

    this.fillScreen = function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.buffer.fillStyle = 'black';
        this.buffer.fillRect(0, 0, canvas.width, canvas.height);
        this.buffer.fill();
    }

    this.resize = function() {
        this.fillScreen();
    }

}

Display.prototype = {
    constructor : Display,
};