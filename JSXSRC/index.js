import React      from 'react';
import ReactDOM   from 'react-dom';
import Button     from '@material-ui/core/Button';
import CustomGrid from './CustomGrid.js';

ReactDOM.render(
  <h1> Hello world! </h1>,
  document.getElementById("root")
);

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
ReactDOM.render(<CustomGrid />, document.querySelector('#root'));
