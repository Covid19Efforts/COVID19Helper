import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import LocalizedStrings from 'react-localization';

import {data} from './localizedStrings.js';

import image_find from './assets/find.png';
import image_medicine from './assets/medicine.png';
import image_cooked_food from './assets/cookedFood.png';
import image_grocery from './assets/grocery.png';


const strings = new LocalizedStrings(data);

function getAvatarSizeWrtSpacing() {
  return 13;
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardAvatar1: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  cardAvatar2: {
    width: theme.spacing(getAvatarSizeWrtSpacing()),
    height: theme.spacing(getAvatarSizeWrtSpacing()),
  },
});


const CARD_TYPES = {
  CARD_INVALID: -1,

  CARD_FIND_START: 10,
  CARD_FIND_GENERAL: 11,
  CARD_FIND_MEDICINE: 12,
  CARD_FIND_FOOD: 13,
  CARD_FIND_GROCERIES: 14,
  CARD_FIND_END: 15,

  CARD_FIND_RESULT_START: 50,
  CARD_FIND_RESULT_MEDICINE: 51,
  CARD_FIND_RESULT_FOOD: 52,
  CARD_FIND_RESULT_GROCERIES: 53,
  CARD_FIND_RESULT_OTHER: 54,
  CARD_FIND_RESULT_MAP: 55,
  CARD_FIND_RESULT_END: 56,
};

const PAGE_TYPES = {
  PAGE_INVALID: -1,
  PAGE_HOME: 0,
  PAGE_SEARCH_RESULTS: 1,
};

{ /*
items
  - type : CARD_TYPES
      - if CARD_FIND_*
          - FIND ICON
          - use cards
      - if CARD_FIND_RESULT_*
          - show in expandable box

*/ }

function Alert(props)
{
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

class CustomGrid extends React.Component {
  constructor(props) {
    super(props);
    let {language} = props;

    if (typeof language === 'undefined') {
      language = 'lang_en_us';
    }

    this.props = props;
    this.state = { page_type: PAGE_TYPES.PAGE_HOME,
      geoLocation:null,
      geoLocationTime: Date.now(),/*time at which last geolocation was fetched*/
      geoLocationStatus: "prompt", /*agree, disagree, prompt*/
      locationPromptOpen:false,
      locationPromptCounter:0, /*Do not show the prompt more than once*/
      lastButtonPress:null,
      snackbarOpen : false,
      snackbarSeverity:"info",
      snackbarText : " ",
      language, items: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    strings.setLanguage(this.state.language);
  }


  new_find_card(id, type, image, text) {
    return (
      {
        id,
        type,
        image,
        text,
      }
    );
  }

  locationPromptClose(e,str)
  {
    console.log("locationPromptClose");
      this.setState({locationPromptOpen: false});
      if(str=="agree")
      {
          this.getGeoLocation();
      }
      else if (str == "disagree" || str == "close")
      {
            this.state.locationPromptCounter = 0; //keep asking till user says yes. Here user has not declined from browser, so we still have hope of getting geolocation
            this.state.lastButtonPress = null;
            this.showLocationErrorSnackBar();
      }
      else
      {
          this.state.lastButtonPress = null;
      }
  }

  getGeoLocation()
  {
    console.log("getGeoLocation", this.state.lastButtonPress);

    let options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((pos) =>
  {
      this.geoLocation = pos;
      if(this.state.lastButtonPress)
      {
        let lastPage = this.state.lastButtonPress;
        this.state.lastButtonPress = null;
        this.setState({page_type:PAGE_TYPES.PAGE_SEARCH_RESULTS});
      }
  },
  (err) =>
  {
    this.state.lastButtonPress = null;
    if(err.PERMISSION_DENIED)
    {
      this.geoLocationStatus="denied";
    }

      console.error("getCurrentPosition failed");
      this.setState({snackbarText:strings.IDS_LOCATION_PERMISSION_ERROR});
      this.setState({snackbarSeverity:"error"});
      this.setState({snackbarOpen:true});
    },
    options
  );

  }

  showLocationErrorSnackBar(){
    this.state.lastButtonPress = null;
    this.setState({snackbarText:strings.IDS_LOCATION_PERMISSION_ERROR});
    this.setState({snackbarSeverity:"error"});
    this.setState({snackbarOpen:true});
    console.error("did not get user permission for geolocation");
  }
  snackBarClose(e)
  {
    this.setState({snackbarOpen:false});
    this.setState({snackbarText:" "});
    this.setState({snackbarSeverity:"info"});
  }

  render_home_page() {
    { // clear any existing state. The home page structure is fixed
    }
    this.state.items = [];

    this.state.items = this.state.items.concat(
      this.new_find_card(CARD_TYPES.CARD_FIND_GENERAL, CARD_TYPES.CARD_FIND_GENERAL, image_find, strings.IDS_FIND_ALL),
    );

    this.state.items = this.state.items.concat(
      this.new_find_card(CARD_TYPES.CARD_FIND_MEDICINE, CARD_TYPES.CARD_FIND_MEDICINE, image_medicine, strings.IDS_FIND_MEDICINES),
    );

    this.state.items = this.state.items.concat(
      this.new_find_card(CARD_TYPES.CARD_FIND_FOOD, CARD_TYPES.CARD_FIND_FOOD, image_cooked_food, strings.IDS_FIND_FOOD),
    );

    this.state.items = this.state.items.concat(
      this.new_find_card(CARD_TYPES.CARD_FIND_GROCERIES, CARD_TYPES.CARD_FIND_GROCERIES, image_grocery, strings.IDS_FIND_GROCERIES),
    );


    const { classes } = this.props;

    console.log(this.state.locationPromptOpen);
    return (
      <Fragment>
      <Dialog open={this.state.locationPromptOpen} onClose={(e)=>this.locationPromptClose(e,"close").bind(this)}>
      <DialogTitle id="location-prompt-dialog-title">
         {strings.IDS_LOCATION_PROMPT_TITLE}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="location-prompt-dialog-message">
            {strings.IDS_LOCATION_PROMPT_MESSAGE}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button onClick={(e)=>this.locationPromptClose(e,"disagree")} color="primary">
              {strings.IDS_LOCATION_PROMPT_DISAGREE}
          </Button>
          <Button onClick={(e)=>this.locationPromptClose(e,"agree")} color="primary">
              {strings.IDS_LOCATION_PROMPT_AGREE}
          </Button>
      </DialogActions>
      </Dialog>

      <Snackbar open={this.state.snackbarOpen} autoHideDuration={5000} onClose={this.snackBarClose.bind(this)}>
          <Alert onClose={this.snackBarClose.bind(this)} severity={this.state.snackbarSeverity}>
              {this.state.snackbarText}
          </Alert>
      </Snackbar>


      <Grid container spacing={2}>
        {this.state.items.map
          ((item) => 
            {
            
                return (
                  <Grid item sm={12} key={item.id}>
                  { (() =>
                    {
                      if ((item.type > CARD_TYPES.CARD_FIND_START)
                      && (item.type < CARD_TYPES.CARD_FIND_END))
                      {
                        return (
                          <Card className={classes.card} key={item.id}>
                          <CardActionArea onClick={(e) => this.CheckLocationOnFind(e, item.id)}>
                          <CardHeader
                          titleTypographyProps={{variant: 'h1', align: 'left'}}
                          avatar={
                            <Avatar className={classes.cardAvatar2} src={item.image} aria-label={item.text} />
                          }
                        
                          title={item.text}
                          />
                          </CardActionArea>
                          </Card>
                        );
                      }
                  }
                )()
                }
                  </Grid>
                );
            }
          )
        }
      </Grid>
      </Fragment>
    );
  }

  render() {
    switch (this.state.page_type) {
      case PAGE_TYPES.PAGE_HOME:
        return (this.render_home_page());
        break;
      default:
        console.error('unexpected type');
        break;
    }


    return (
      <h1>something went wrong</h1>
    );
  }

  handleChange(e) {

  }

  QueryLocationPermission(card_id)
  {
    navigator.permissions.query({name:'geolocation'}).then((result) => {
      this.state.geoLocationStatus = result.state;

      if(this.state.geoLocationStatus == "granted")
      {
        this.getGeoLocation();

      }else if(this.state.geoLocationStatus == "prompt")
      {
        if(this.state.locationPromptCounter < 1)
        {
            this.state.locationPromptCounter+= 1;
            this.setState({locationPromptOpen:true});
        }else if(this.state.locationPromptCounter >= 1)
        {
          this.getGeoLocation();
      }

      }else if(this.state.geoLocationStatus == "denied")
      {
        this.state.lastButtonPress = null;
          this.showLocationErrorSnackBar();
          console.error("QueryLocationPermission. geoLocation permission denied");
      }
      else {
        this.state.lastButtonPress = null;
        console.error("unexpected permission", this.state.geoLocationStatus);
      }
  });
  }

  CheckLocationOnFind(e,id)
  {
      this.state.lastButtonPress = id;
      this.QueryLocationPermission(id);
  }

  handleSearchButtonPress(e, id)
  {

    console.log(e, id);
    switch (id) {
      case CARD_TYPES.CARD_FIND_START:
        console.log("CARD_TYPES.CARD_FIND_START");
        break;
      case CARD_TYPES.CARD_FIND_GENERAL:
        console.log("CARD_TYPES.CARD_FIND_GENERAL");
        break;
      case CARD_TYPES.CARD_FIND_MEDICINE:
        console.log("CARD_TYPES.CARD_FIND_MEDICINE");
        break;
      case CARD_TYPES.CARD_FIND_FOOD:
        console.log("CARD_TYPES.CARD_FIND_FOOD");
        break;
      case CARD_TYPES.CARD_FIND_GROCERIES:
        console.log("CARD_TYPES.CARD_FIND_GROCERIES");
        break;
      case CARD_TYPES.CARD_FIND_END:
        console.log("CARD_TYPES.CARD_FIND_END");
        break;
      default:
        console.console.error("unexpected type");
      break;

    }
  }

  handleSubmit(e) {

  }
}

export default withStyles(styles)(CustomGrid);
