import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import CustomGrid from './CustomGrid.js';

ReactDOM.render(
  <h1> Hello world! </h1>,
  document.getElementById('root'),
);

function App() {
  return (
    <CustomGrid language="lang_en_us" />
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
