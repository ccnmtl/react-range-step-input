import React from 'react';
import ReactDOM from 'react-dom';
import { RangeStepInput } from '../lib/index';

const App = () => (
  <div>
    <h2>Button</h2>
    <p>Here's an example RangeStepInput:</p>
    <RangeStepInput />
  </div>
);

ReactDOM.render(<App />, document.getElementById('react-container'));
