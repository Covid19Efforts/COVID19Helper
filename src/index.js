import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import CustomGrid from './CustomGrid.js';

ReactDOM.render(React.createElement(
  'h1',
  null,
  ' Hello world! '
), document.getElementById("root"));

function App() {
  return React.createElement(
    Button,
    { variant: 'contained', color: 'primary' },
    'Hello World'
  );
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));
ReactDOM.render(React.createElement(CustomGrid, null), document.querySelector('#root'));