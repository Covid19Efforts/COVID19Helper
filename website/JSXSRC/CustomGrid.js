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
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansioPanel from '@material-ui/core/ExpansionPanel';
import ExpansioPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansioPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandModreIcon from '@material-ui/icons/ExpandMore';
import LaunchIcon from '@material-ui/icons/Launch';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slider from '@material-ui/core/Slider';

import DataBase from './DataBase.js'
import Util from './Util.js'

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

function getAvatarSizeWrtSpacingSmall() {
  return 3;
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
  cardAvatar3: {
    margin: theme.spacing(1),
    width: theme.spacing(getAvatarSizeWrtSpacingSmall()),
    height: theme.spacing(getAvatarSizeWrtSpacingSmall()),
  },
  cardAvatar3Parent: {
    flex:1,
    alignItems:'center',
    justifyContents:'center'

  },
  expansionPanelSummary : {
    marginTop:0,
    marginBottom:0
  }
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
    language = 'lang_marathi';
    this.props = props;
    this.state = { page_type: PAGE_TYPES.PAGE_HOME,
      searchResults : null,
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

  DataObtainedCallback(data1, data2)
  {
    this.setState({searchResults:data2});
  }

  getGeoLocation()
  {
    //console.log("getGeoLocation", this.state.lastButtonPress);

    let options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((pos) =>
  {
      this.state.geoLocation = pos;
      if(this.state.lastButtonPress)
      {
        let lastPage = this.state.lastButtonPress;
        this.state.lastButtonPress = null;
        this.setState({page_type:PAGE_TYPES.PAGE_SEARCH_RESULTS});
        DataBase.getLocations(this.state.geoLocation.latitude, this.state.geoLocation.longitude, 5000, this.DataObtainedCallback.bind(this));
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

  DBTypeToJSType(DBType)
  {
    switch(DBType.S){
      case "food":
        return CARD_TYPES.CARD_FIND_RESULT_FOOD;
      case "medicine":
        return CARD_TYPES.CARD_FIND_RESULT_MEDICINE;
      case "groceries":
        return CARD_TYPES.CARD_FIND_RESULT_GROCERIES;
      default:
        return CARD_TYPES.CARD_FIND_RESULT_OTHER;
    }
  }

  process_search_results()
  {
   
   let items = { };
  items[CARD_TYPES.CARD_FIND_RESULT_MAP] =        {id:CARD_TYPES.CARD_FIND_RESULT_MAP,        type:CARD_TYPES.CARD_FIND_RESULT_MAP,       image:image_find,         text:strings.IDS_MAP,        children:[]};
  items[CARD_TYPES.CARD_FIND_RESULT_MEDICINE] =   {id:CARD_TYPES.CARD_FIND_RESULT_MEDICINE,   type:CARD_TYPES.CARD_FIND_RESULT_MEDICINE,  image:image_medicine,     text:strings.IDS_MEDICINE,   children:[]};
  items[CARD_TYPES.CARD_FIND_RESULT_FOOD] =       {id:CARD_TYPES.CARD_FIND_RESULT_FOOD,       type:CARD_TYPES.CARD_FIND_RESULT_FOOD,      image:image_cooked_food,  text:strings.IDS_FOOD,       children:[]};
  items[CARD_TYPES.CARD_FIND_RESULT_GROCERIES] =  {id:CARD_TYPES.CARD_FIND_RESULT_GROCERIES,  type:CARD_TYPES.CARD_FIND_RESULT_GROCERIES, image:image_grocery,      text:strings.IDS_GROCERIES,  children:[]};
  items[CARD_TYPES.CARD_FIND_RESULT_OTHER] =      {id:CARD_TYPES.CARD_FIND_RESULT_OTHER,      type:CARD_TYPES.CARD_FIND_RESULT_OTHER,     image:image_find,         text:strings.IDS_OTHERS,     children:[]};

    if(this.state.searchResults)
    {
      this.state.searchResults.map
      (
        (result) => {
          let item = {};
          item.type = this.DBTypeToJSType(result.type);
          item.id   = item.type;
          item.name = result.name.S;
          
          try{
            item.coords = JSON.parse(result.geoJson.S).coordinates;
          }
          catch(e)
          {
            console.error("json parse error",result,result.geoJson);
          }

          items[item.type].children.push(item);
        }

      );

      this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_MAP]);
      this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_MEDICINE]);
      this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_FOOD]);
      this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_GROCERIES]);
      this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_OTHER]);
    }
    else
    {
      this.state.items = this.state.items.concat({type:CARD_TYPES.CARD_FIND_RESULT_OTHER, id:CARD_TYPES.CARD_FIND_RESULT_OTHER});
    }
  }

  RangeSliderCallback(e, value)
  {
    console.log(e, value);
  }

  render_home_page() {
    { // clear any existing state. The home page structure is fixed
    }
    this.state.items = [];

    if(this.state.page_type == PAGE_TYPES.PAGE_HOME)
    {
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
    }
    else if(this.state.page_type == PAGE_TYPES.PAGE_SEARCH_RESULTS)
    {
      this.process_search_results();
    }


    const { classes } = this.props;
    let itemCtr = 0;

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
                  
                   (() =>
                    {
                      if ((item.type > CARD_TYPES.CARD_FIND_START)
                      && (item.type < CARD_TYPES.CARD_FIND_END))
                      {
                        return (
                          <Grid item sm={12} key={item.id}>
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
                          </Grid>
                        );
                      }
                      else if ((item.type > CARD_TYPES.CARD_FIND_RESULT_START)
                      && (item.type < CARD_TYPES.CARD_FIND_RESULT_END))
                      {
                        if(this.state.searchResults)
                          {
                           if(item.children.length > 0)
                           {
                            itemCtr = itemCtr + 1;
                             let filterControl;
                             if(itemCtr == 1)
                             {
                                filterControl = (
                                <Grid item sm={12} key={item.id}>
                                <ExpansioPanel defaultExpanded>
                                <ExpansioPanelSummary
                                        expandIcon={<ExpandModreIcon/>}
                                        id={item.id}
                                      >
                                  <Avatar className={classes.cardAvatar3} aria-label={item.text} >
                                    <FilterListRoundedIcon />
                                  </Avatar>
                                  <Typography variant="h5">
                                    {strings.IDS_FILTER}
                                  </Typography>
                                </ExpansioPanelSummary>
                                <ExpansioPanelDetails>
                                  <Slider defaultValue={50} step={10} min={10} max={100} valueLabelDisplay="on" onChangeCommitted={this.RangeSliderCallback.bind(this)} marks={[{value:10,label:'10 km'}, {value:100,label:'100 km'}]} />
                                </ExpansioPanelDetails>
                                </ExpansioPanel>
                                </Grid> );
                             }
                              return(
                                <Fragment key={item.id}>
                                {filterControl}
                                <Grid item sm={12}>
                                <ExpansioPanel defaultExpanded>
                                <ExpansioPanelSummary
                                        expandIcon={<ExpandModreIcon/>}
                                        id={item.id}
                                      >
                                  <Avatar className={classes.cardAvatar3} src={item.image} aria-label={item.text} />
                                  <Typography variant="h5">
                                    {item.text}
                                  </Typography>
                                </ExpansioPanelSummary>
                                <ExpansioPanelDetails>
                                <List component="nav" style={{flex:1}}>
                                        {
                                          item.children.map(
                                            (child) => {
                                              return (
                                                    <ListItem button key={child.name}>
                                                      <ListItemIcon>
                                                        <LaunchIcon />
                                                      </ListItemIcon>
                                                      <ListItemText primary={child.name} secondary={Util.GetGeoDistance(child.coords, [this.state.geoLocation.coords.latitude, this.state.geoLocation.coords.longitude]).toFixed(1) + " " + strings.IDS_KM}/>
                                                    </ListItem>
                                              );
                                            }
                                          )
                                        }
                                  </List>
                                  </ExpansioPanelDetails>
                              </ExpansioPanel>
                              </Grid>
                              </Fragment>
                              );
                            }
                          }
                          else
                          {
                            return (
                              <Grid item sm={12} key={item.id}>
                              <Fragment key={item.id}>
                                <Skeleton variant="text" width={240}  animation="wave" />
                                <Skeleton variant="circle" width={40} height={50} animation="wave" >
                                </Skeleton>
                                <Skeleton variant="rect" width={240} height={118} animation="wave" >
                                <CircularProgress color="inherit"/>
                                </Skeleton>
                              </Fragment>
                              </Grid>
                            );
                          }
                      }
                  }
                )()
                
                );
            }
          )
        }
      </Grid>
      </Fragment>
    );
  }

  render() {
    return this.render_home_page();

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
      this.state.searchResults = null;
      this.QueryLocationPermission(id);
  }

  handleSubmit(e) {

  }
}

export default withStyles(styles)(CustomGrid);
