import React from 'react';
import View from './views/fadView.jsx';
import Actions from './actions/fadAction.js';
import flux from './flux.js';
import FadStore from './stores/fadStore.js';
var fl = new flux();

React.render( <View {...fl.ReactMixin} />, document.getElementById("fad"));
