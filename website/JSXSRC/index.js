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
      this.state = {language:'lang_en_us'};
      this.childCustomGrid1 = React.createRef();
  }

  SetLanguage(newLanguage)
  {
    console.log("SetLanguage", newLanguage);
    this.childCustomGrid1.current.OnLanguageChange();
  }

  render()
  {
  return (
    <Fragment>
      <TopBar SetLaguageFunction={this.SetLanguage.bind(this)} />
      <CustomGrid ref={this.childCustomGrid1} language={this.state.language} />
    </Fragment>
  );
}
};

ReactDOM.render(<App />, document.querySelector('#root'));
