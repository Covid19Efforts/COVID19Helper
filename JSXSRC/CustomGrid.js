import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import LocalizedStrings from 'react-localization';
import {data} from './localizedStrings.js';
import image_find from './assets/find.png';
import image_medicine from './assets/medicine.png';


const strings = new LocalizedStrings(data);

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardAvatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
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

class CustomGrid extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { page_type: PAGE_TYPES.PAGE_HOME, language: 'lang_en_us', items: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    strings.setLanguage(this.state.language);
  }


  render_home_page() {
    { // clear any existing state. The home page structure is fixed
    }
    this.state.items = [];

    const idCtr = 0;
    this.state.items = this.state.items.concat(
      {
        id: idCtr,
        type: CARD_TYPES.CARD_FIND_GENERAL,
        image: image_find,
        text: strings.IDS_FIND,
      },
    );

    const { classes } = this.props;

    return (
      <Grid container spacing={2}>
        {this.state.items.map((item) => {
          console.log('here1', item, item.type);
          if ((item.type > CARD_TYPES.CARD_FIND_START)
            && (item.type < CARD_TYPES.CARD_FIND_END)) {

            return (
              <Grid item sm={12} key={item.id}>
                <Card className={classes.card} key={item.id}>
                  <CardHeader
                    avatar={
                      <Avatar src={item.image} aria-label={item.text} />
                    }

                    title={item.text}
                  />
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
    );
  }

  render() {
    switch (this.state.page_type) {
      case PAGE_TYPES.PAGE_HOME:
        return (this.render_home_page());
        break;
    }


    return (
      <h1>something went wrong</h1>
    );
  }

  handleChange(e) {

  }

  handleSubmit(e) {

  }
}

export default withStyles(styles)(CustomGrid);
