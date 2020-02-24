const Controller = function() {
    this.left = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up = new Controller.ButtonInput();

    this.onkeydown = function(keytype, keycode) {
        let down = keytype === 'keydown' ? true : false;
        switch(keycode) {
            case 37:
                this.left.getInput(down);
                break;
            case 38:
                this.up.getInput(down);
                break;
            case 39:
                this.right.getInput(down);
                break;
        }
    };
};

Controller.prototype = {
    constructor: Controller
}

Controller.ButtonInput = function() {
    this.active = this.down = false;
}

Controller.ButtonInput.prototype = {
    constructor: Controller.ButtonInput,

    getInput: function(down) {
        if(this.down !== down)
            this.active = down;
        this.down = down;
    }
}; 