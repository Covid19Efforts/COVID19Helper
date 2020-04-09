var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Fragment } from 'react';
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

import DataBase from './DataBase.js';
import Util from './Util.js';

import LocalizedStrings from 'react-localization';

import { data } from './localizedStrings.js';

import image_find from './assets/find.png';
import image_medicine from './assets/medicine.png';
import image_cooked_food from './assets/cookedFood.png';
import image_grocery from './assets/grocery.png';

var strings = new LocalizedStrings(data);

function getAvatarSizeWrtSpacing() {
  return 13;
}

function getAvatarSizeWrtSpacingSmall() {
  return 3;
}

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    card: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    cardAvatar1: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    cardAvatar2: {
      width: theme.spacing(getAvatarSizeWrtSpacing()),
      height: theme.spacing(getAvatarSizeWrtSpacing())
    },
    cardAvatar3: {
      margin: theme.spacing(1),
      width: theme.spacing(getAvatarSizeWrtSpacingSmall()),
      height: theme.spacing(getAvatarSizeWrtSpacingSmall())
    },
    cardAvatar3Parent: {
      flex: 1,
      alignItems: 'center',
      justifyContents: 'center'

    },
    expansionPanelSummary: {
      marginTop: 0,
      marginBottom: 0
    }
  };
};

var CARD_TYPES = {
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
  CARD_FIND_RESULT_END: 56
};

var PAGE_TYPES = {
  PAGE_INVALID: -1,
  PAGE_HOME: 0,
  PAGE_SEARCH_RESULTS: 1
};

{/*
  items
  - type : CARD_TYPES
      - if CARD_FIND_*
          - FIND ICON
          - use cards
      - if CARD_FIND_RESULT_*
          - show in expandable box
  */}

function Alert(props) {
  return React.createElement(MuiAlert, Object.assign({ elevation: 6, variant: 'filled' }, props));
}

var CustomGrid = function (_React$Component) {
  _inherits(CustomGrid, _React$Component);

  function CustomGrid(props) {
    _classCallCheck(this, CustomGrid);

    var _this = _possibleConstructorReturn(this, (CustomGrid.__proto__ || Object.getPrototypeOf(CustomGrid)).call(this, props));

    var lang = props.language;

    // const langKey = 'config_user_langauge';
    // let lang = window.localStorage.getItem(langKey);
    // if( lang == null )
    // {
    //   switch(navigator.language)
    //   {
    //     // case 'en-US':
    //     // case 'en':
    //     //   lang = 'lang_en_us';
    //     //   break;
    //     case 'hi-IN':
    //     case 'hi':
    //       lang = 'lang_hindi';
    //       break;
    //     case 'mr-IN':
    //     case 'mr':
    //       lang = 'lang_marathi';
    //       break;
    //     default:
    //       lang = 'lang_marathi';
    //       break;
    //   }
    // }

    if (typeof lang === 'undefined') {
      console.error("lang should be passed as parameter and must be valid", lang);
    }

    _this.props = props;
    _this.state = { page_type: PAGE_TYPES.PAGE_HOME,
      searchResults: null,
      geoLocation: null,
      geoLocationTime: Date.now(), /*time at which last geolocation was fetched*/
      geoLocationStatus: "prompt", /*agree, disagree, prompt*/
      locationPromptOpen: false,
      locationPromptCounter: 0, /*Do not show the prompt more than once*/
      lastButtonPress: null,
      snackbarOpen: false,
      snackbarSeverity: "info",
      snackbarText: " ",
      language: lang, items: []
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.SetLanguage(lang, false);
    return _this;
  }

  _createClass(CustomGrid, [{
    key: 'SetLanguage',
    value: function SetLanguage(newLang) {
      var bDoSetState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (bDoSetState) {
        this.setState({ language: newLang });
      } else {
        this.state.language = newLang;
      }
      strings.setLanguage(newLang);
      console.log("CustomGrid.js SetLanguage ", newLang, bDoSetState);
    }
  }, {
    key: 'OnLanguageChange',
    value: function OnLanguageChange() {
      var langKey = 'config_user_langauge';
      var lang = window.localStorage.getItem(langKey);
      if (lang) {
        console.log("customgrid lang change", lang);
        this.SetLanguage(lang);
      }
    }
  }, {
    key: 'new_find_card',
    value: function new_find_card(id, type, image, text) {
      return {
        id: id,
        type: type,
        image: image,
        text: text
      };
    }
  }, {
    key: 'locationPromptClose',
    value: function locationPromptClose(e, str) {
      this.setState({ locationPromptOpen: false });
      if (str == "agree") {
        this.getGeoLocation();
      } else if (str == "disagree" || str == "close") {
        this.state.locationPromptCounter = 0; //keep asking till user says yes. Here user has not declined from browser, so we still have hope of getting geolocation
        this.state.lastButtonPress = null;
        this.showLocationErrorSnackBar();
      } else {
        this.state.lastButtonPress = null;
      }
    }
  }, {
    key: 'DataObtainedCallback',
    value: function DataObtainedCallback(data1, data2) {
      this.setState({ searchResults: data2 });
    }
  }, {
    key: 'getGeoLocation',
    value: function getGeoLocation() {
      var _this2 = this;

      //console.log("getGeoLocation", this.state.lastButtonPress);

      var options = {
        enableHighAccuracy: true,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(function (pos) {
        _this2.state.geoLocation = pos;
        if (_this2.state.lastButtonPress) {
          var lastPage = _this2.state.lastButtonPress;
          _this2.state.lastButtonPress = null;
          _this2.setState({ page_type: PAGE_TYPES.PAGE_SEARCH_RESULTS });
          DataBase.getLocations(_this2.state.geoLocation.latitude, _this2.state.geoLocation.longitude, 5000, _this2.DataObtainedCallback.bind(_this2));
        }
      }, function (err) {
        _this2.state.lastButtonPress = null;
        if (err.PERMISSION_DENIED) {
          _this2.geoLocationStatus = "denied";
        }

        console.error("getCurrentPosition failed");
        _this2.setState({ snackbarText: strings.IDS_LOCATION_PERMISSION_ERROR });
        _this2.setState({ snackbarSeverity: "error" });
        _this2.setState({ snackbarOpen: true });
      }, options);
    }
  }, {
    key: 'showLocationErrorSnackBar',
    value: function showLocationErrorSnackBar() {
      this.state.lastButtonPress = null;
      this.setState({ snackbarText: strings.IDS_LOCATION_PERMISSION_ERROR });
      this.setState({ snackbarSeverity: "error" });
      this.setState({ snackbarOpen: true });
      console.error("did not get user permission for geolocation");
    }
  }, {
    key: 'snackBarClose',
    value: function snackBarClose(e) {
      this.setState({ snackbarOpen: false });
      this.setState({ snackbarText: " " });
      this.setState({ snackbarSeverity: "info" });
    }
  }, {
    key: 'DBTypeToJSType',
    value: function DBTypeToJSType(DBType) {
      switch (DBType.S) {
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
  }, {
    key: 'process_search_results',
    value: function process_search_results() {
      var _this3 = this;

      var items = {};
      items[CARD_TYPES.CARD_FIND_RESULT_MAP] = { id: CARD_TYPES.CARD_FIND_RESULT_MAP, type: CARD_TYPES.CARD_FIND_RESULT_MAP, image: image_find, text: strings.IDS_MAP, children: [] };
      items[CARD_TYPES.CARD_FIND_RESULT_MEDICINE] = { id: CARD_TYPES.CARD_FIND_RESULT_MEDICINE, type: CARD_TYPES.CARD_FIND_RESULT_MEDICINE, image: image_medicine, text: strings.IDS_MEDICINE, children: [] };
      items[CARD_TYPES.CARD_FIND_RESULT_FOOD] = { id: CARD_TYPES.CARD_FIND_RESULT_FOOD, type: CARD_TYPES.CARD_FIND_RESULT_FOOD, image: image_cooked_food, text: strings.IDS_FOOD, children: [] };
      items[CARD_TYPES.CARD_FIND_RESULT_GROCERIES] = { id: CARD_TYPES.CARD_FIND_RESULT_GROCERIES, type: CARD_TYPES.CARD_FIND_RESULT_GROCERIES, image: image_grocery, text: strings.IDS_GROCERIES, children: [] };
      items[CARD_TYPES.CARD_FIND_RESULT_OTHER] = { id: CARD_TYPES.CARD_FIND_RESULT_OTHER, type: CARD_TYPES.CARD_FIND_RESULT_OTHER, image: image_find, text: strings.IDS_OTHERS, children: [] };

      if (this.state.searchResults) {
        this.state.searchResults.map(function (result) {
          var item = {};
          item.type = _this3.DBTypeToJSType(result.type);
          item.id = item.type;
          item.name = result.name.S;

          try {
            item.coords = JSON.parse(result.geoJson.S).coordinates;
          } catch (e) {
            console.error("json parse error", result, result.geoJson);
          }

          items[item.type].children.push(item);
        });

        this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_MAP]);
        this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_MEDICINE]);
        this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_FOOD]);
        this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_GROCERIES]);
        this.state.items = this.state.items.concat(items[CARD_TYPES.CARD_FIND_RESULT_OTHER]);
      } else {
        this.state.items = this.state.items.concat({ type: CARD_TYPES.CARD_FIND_RESULT_OTHER, id: CARD_TYPES.CARD_FIND_RESULT_OTHER });
      }
    }
  }, {
    key: 'RangeSliderCallback',
    value: function RangeSliderCallback(e, value) {
      console.log(e, value);
    }
  }, {
    key: 'render_home_page',
    value: function render_home_page() {
      var _this4 = this;

      {// clear any existing state. The home page structure is fixed
      }
      this.state.items = [];

      if (this.state.page_type == PAGE_TYPES.PAGE_HOME) {
        this.state.items = this.state.items.concat(this.new_find_card(CARD_TYPES.CARD_FIND_GENERAL, CARD_TYPES.CARD_FIND_GENERAL, image_find, strings.IDS_FIND_ALL));

        this.state.items = this.state.items.concat(this.new_find_card(CARD_TYPES.CARD_FIND_MEDICINE, CARD_TYPES.CARD_FIND_MEDICINE, image_medicine, strings.IDS_FIND_MEDICINES));

        this.state.items = this.state.items.concat(this.new_find_card(CARD_TYPES.CARD_FIND_FOOD, CARD_TYPES.CARD_FIND_FOOD, image_cooked_food, strings.IDS_FIND_FOOD));

        this.state.items = this.state.items.concat(this.new_find_card(CARD_TYPES.CARD_FIND_GROCERIES, CARD_TYPES.CARD_FIND_GROCERIES, image_grocery, strings.IDS_FIND_GROCERIES));
      } else if (this.state.page_type == PAGE_TYPES.PAGE_SEARCH_RESULTS) {
        this.process_search_results();
      }

      var classes = this.props.classes;

      var itemCtr = 0;

      return React.createElement(
        Fragment,
        null,
        React.createElement(
          Dialog,
          { open: this.state.locationPromptOpen, onClose: function onClose(e) {
              return _this4.locationPromptClose(e, "close").bind(_this4);
            } },
          React.createElement(
            DialogTitle,
            { id: 'location-prompt-dialog-title' },
            strings.IDS_LOCATION_PROMPT_TITLE
          ),
          React.createElement(
            DialogContent,
            null,
            React.createElement(
              DialogContentText,
              { id: 'location-prompt-dialog-message' },
              strings.IDS_LOCATION_PROMPT_MESSAGE
            )
          ),
          React.createElement(
            DialogActions,
            null,
            React.createElement(
              Button,
              { onClick: function onClick(e) {
                  return _this4.locationPromptClose(e, "disagree");
                }, color: 'primary' },
              strings.IDS_LOCATION_PROMPT_DISAGREE
            ),
            React.createElement(
              Button,
              { onClick: function onClick(e) {
                  return _this4.locationPromptClose(e, "agree");
                }, color: 'primary' },
              strings.IDS_LOCATION_PROMPT_AGREE
            )
          )
        ),
        React.createElement(
          Snackbar,
          { open: this.state.snackbarOpen, autoHideDuration: 5000, onClose: this.snackBarClose.bind(this) },
          React.createElement(
            Alert,
            { onClose: this.snackBarClose.bind(this), severity: this.state.snackbarSeverity },
            this.state.snackbarText
          )
        ),
        React.createElement(
          Grid,
          { container: true, spacing: 2 },
          this.state.items.map(function (item) {
            return function () {
              if (item.type > CARD_TYPES.CARD_FIND_START && item.type < CARD_TYPES.CARD_FIND_END) {
                return React.createElement(
                  Grid,
                  { item: true, sm: 12, key: item.id },
                  React.createElement(
                    Card,
                    { className: classes.card, key: item.id },
                    React.createElement(
                      CardActionArea,
                      { onClick: function onClick(e) {
                          return _this4.CheckLocationOnFind(e, item.id);
                        } },
                      React.createElement(CardHeader, {
                        titleTypographyProps: { variant: 'h1', align: 'left' },
                        avatar: React.createElement(Avatar, { className: classes.cardAvatar2, src: item.image, 'aria-label': item.text }),

                        title: item.text
                      })
                    )
                  )
                );
              } else if (item.type > CARD_TYPES.CARD_FIND_RESULT_START && item.type < CARD_TYPES.CARD_FIND_RESULT_END) {
                if (_this4.state.searchResults) {
                  if (item.children.length > 0) {
                    itemCtr = itemCtr + 1;
                    var filterControl = void 0;
                    if (itemCtr == 1) {
                      filterControl = React.createElement(
                        Grid,
                        { item: true, sm: 12, key: item.id },
                        React.createElement(
                          ExpansioPanel,
                          { defaultExpanded: true },
                          React.createElement(
                            ExpansioPanelSummary,
                            {
                              expandIcon: React.createElement(ExpandModreIcon, null),
                              id: item.id
                            },
                            React.createElement(
                              Avatar,
                              { className: classes.cardAvatar3, 'aria-label': item.text },
                              React.createElement(FilterListRoundedIcon, null)
                            ),
                            React.createElement(
                              Typography,
                              { variant: 'h5' },
                              strings.IDS_FILTER
                            )
                          ),
                          React.createElement(
                            ExpansioPanelDetails,
                            null,
                            React.createElement(Slider, { defaultValue: 50, step: 10, min: 10, max: 100, valueLabelDisplay: 'on', onChangeCommitted: _this4.RangeSliderCallback.bind(_this4), marks: [{ value: 10, label: '10 km' }, { value: 100, label: '100 km' }] })
                          )
                        )
                      );
                    }
                    return React.createElement(
                      Fragment,
                      { key: item.id },
                      filterControl,
                      React.createElement(
                        Grid,
                        { item: true, sm: 12 },
                        React.createElement(
                          ExpansioPanel,
                          { defaultExpanded: true },
                          React.createElement(
                            ExpansioPanelSummary,
                            {
                              expandIcon: React.createElement(ExpandModreIcon, null),
                              id: item.id
                            },
                            React.createElement(Avatar, { className: classes.cardAvatar3, src: item.image, 'aria-label': item.text }),
                            React.createElement(
                              Typography,
                              { variant: 'h5' },
                              item.text
                            )
                          ),
                          React.createElement(
                            ExpansioPanelDetails,
                            null,
                            React.createElement(
                              List,
                              { component: 'nav', style: { flex: 1 } },
                              item.children.map(function (child) {
                                return React.createElement(
                                  ListItem,
                                  { button: true, key: child.name },
                                  React.createElement(
                                    ListItemIcon,
                                    null,
                                    React.createElement(LaunchIcon, null)
                                  ),
                                  React.createElement(ListItemText, { primary: child.name, secondary: Util.GetGeoDistance(child.coords, [_this4.state.geoLocation.coords.latitude, _this4.state.geoLocation.coords.longitude]).toFixed(1) + " " + strings.IDS_KM })
                                );
                              })
                            )
                          )
                        )
                      )
                    );
                  }
                } else {
                  return React.createElement(
                    Grid,
                    { item: true, sm: 12, key: item.id },
                    React.createElement(
                      Fragment,
                      { key: item.id },
                      React.createElement(Skeleton, { variant: 'text', width: 240, animation: 'wave' }),
                      React.createElement(Skeleton, { variant: 'circle', width: 40, height: 50, animation: 'wave' }),
                      React.createElement(
                        Skeleton,
                        { variant: 'rect', width: 240, height: 118, animation: 'wave' },
                        React.createElement(CircularProgress, { color: 'inherit' })
                      )
                    )
                  );
                }
              }
            }();
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.render_home_page();

      return React.createElement(
        'h1',
        null,
        'something went wrong'
      );
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {}
  }, {
    key: 'QueryLocationPermission',
    value: function QueryLocationPermission(card_id) {
      var _this5 = this;

      navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        _this5.state.geoLocationStatus = result.state;

        if (_this5.state.geoLocationStatus == "granted") {
          _this5.getGeoLocation();
        } else if (_this5.state.geoLocationStatus == "prompt") {
          if (_this5.state.locationPromptCounter < 1) {
            _this5.state.locationPromptCounter += 1;
            _this5.setState({ locationPromptOpen: true });
          } else if (_this5.state.locationPromptCounter >= 1) {
            _this5.getGeoLocation();
          }
        } else if (_this5.state.geoLocationStatus == "denied") {
          _this5.state.lastButtonPress = null;
          _this5.showLocationErrorSnackBar();
          console.error("QueryLocationPermission. geoLocation permission denied");
        } else {
          _this5.state.lastButtonPress = null;
          console.error("unexpected permission", _this5.state.geoLocationStatus);
        }
      });
    }
  }, {
    key: 'CheckLocationOnFind',
    value: function CheckLocationOnFind(e, id) {
      this.state.lastButtonPress = id;
      this.state.searchResults = null;
      this.QueryLocationPermission(id);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {}
  }]);

  return CustomGrid;
}(React.Component);

export default withStyles(styles)(CustomGrid);