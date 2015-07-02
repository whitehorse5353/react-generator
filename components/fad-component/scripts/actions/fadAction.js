import flux from '../flux.js';

class AddMessage {
    constructor(options) {
        this.options = options;
    }

    publishMsg() {
        var fl = new flux();
        fl.dispatch('addMsg', 'bar');
    }
}

export default AddMessage;

