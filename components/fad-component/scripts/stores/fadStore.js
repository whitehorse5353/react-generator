import React from 'react';
import Nuclear from 'nuclear-js';
import {toImmutable} from 'nuclear-js';

class FadStore extends Nuclear.Store {

    constructor() {
        super();
        toImmutable({});
        this.on('addMsg', payload);
    }

    initialize() {
        this.on('addMsg', payload)
    }
}

function payload() {
    console.log(this);
}

export default FadStore;
