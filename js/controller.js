const Controller = function() {

    this.onkeydown = function(keycode) {
        switch(keycode) {
            case 37:
                console.log('arrow right');
                break;
            case 38:
                console.log('arrow up');
                break;
            case 39:
                console.log('arrow left');
                break;
        }
    }
}