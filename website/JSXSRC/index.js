import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import CustomGrid from './CustomGrid.js';
import TopBar from './topbar.js';

class App extends React.Component
{
  constructor(props)
  {
      super(props);
      this.geoLocation = {permissionDenied:false};
  }

  render()
  {
  return (
    <Fragment>
      <TopBar />
      <CustomGrid language="lang_en_us" />
    </Fragment>
  );
}
};

ReactDOM.render(<App />, document.querySelector('#root'));
