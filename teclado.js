function Keyboard(document){
    this.document = document;

    this.pressed = [];
    this.keysShooted = [];
    this.triggeredFunctions = [];

    let keyboard = this;
    document.addEventListener('keydown', function(event) {
        keyboard.pressed[event.keyCode] = true;

        if (keyboard.triggeredFunctions[event.keyCode] && !keyboard.keysShooted[event.keyCode]){
            keyboard.keysShooted[event.keyCode] = true;
            keyboard.triggeredFunctions[event.keyCode]();

        };
    });
    document.addEventListener('keyup', function(event) {
        keyboard.pressed[event.keyCode] = false;
        keyboard.keysShooted[event.keyCode] = false;
    });
}
Keyboard.prototype = {
    press: function(key) {
        return this.pressed[key];
    },
    shooted: function(key, callback) {
        return this.triggeredFunctions[key] = callback;
    },
}