import React from 'react';
import ReactDOM from 'react-dom';
import {RangeStepInput} from '..';

const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 50
        };
    }
    render() {
        return <div>
            <p>Here's an example RangeStepInput:</p>
            <RangeStepInput
                min={0} max={100}
                value={this.state.value} step={1}
                onChange={this.onChange.bind(this)}
            />
        </div>;
    };
    onChange(e) {
        const newVal = forceNumber(e.target.value);
        this.setState({value: newVal});
    }
};


ReactDOM.render(<App />, document.getElementById('react-container'));
