import React from 'react';
import AddMessage from '../actions/fadAction.js';

class View extends React.Component {
    render() {
        return (<p className="fad" onClick={this._handleClick.bind(this)}>fad... component</p>)
    }

    _handleClick(){
        console.log(this.props)
        var action = new AddMessage();
        action.publishMsg();
    }
}

console.log(React.propTypes);

View.contextTypes = {
    //ReactMixin : React.propTypes.func.isRequired
};

export default View;
