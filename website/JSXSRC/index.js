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
      this.state = {language:'lang_marathi'};
      this.childCustomGrid1 = React.createRef();

    const langKey = 'config_user_langauge';
    let lang = window.localStorage.getItem(langKey);
    if( lang == null )
    {
      switch(navigator.language)
      {
        // case 'en-US':
        // case 'en':
        //   lang = 'lang_en_us';
        //   break;
        case 'hi-IN':
        case 'hi':
          lang = 'lang_hindi';
          break;
        case 'mr-IN':
        case 'mr':
          lang = 'lang_marathi';
          break;
        default:
          lang = 'lang_marathi';
          break;
      }
    }

    window.localStorage.setItem(langKey, lang);
    this.state.language = lang;

  }

  SetLanguage(newLanguage)
  {
    console.log("index.js SetLanguage ", newLanguage);
    if(this.childCustomGrid1.current)
    {
      this.childCustomGrid1.current.OnLanguageChange();
    }
    this.setState({language, newLanguage});
  }

  render()
  {
  return (
    <Fragment>
      <TopBar SetLaguageFunction={this.SetLanguage.bind(this)} language={this.state.language} />
      <CustomGrid ref={this.childCustomGrid1} language={this.state.language} />
    </Fragment>
  );
}
};

ReactDOM.render(<App />, document.querySelector('#root'));
