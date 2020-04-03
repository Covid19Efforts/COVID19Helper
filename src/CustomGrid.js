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

    var language = props.language;


    if (typeof language === 'undefined') {
      language = 'lang_en_us';
    }

    _this.props = props;
    _this.state = { page_type: PAGE_TYPES.PAGE_HOME,
      geoLocation: null,
      geoLocationTime: Date.now(), /*time at which last geolocation was fetched*/
      geoLocationStatus: "prompt", /*agree, disagree, prompt*/
      locationPromptOpen: false,
      locationPromptCounter: 0, /*Do not show the prompt more than once*/
      lastButtonPress: null,
      snackbarOpen: false,
      snackbarSeverity: "info",
      snackbarText: " ",
      language: language, items: []
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    strings.setLanguage(_this.state.language);
    return _this;
  }

  _createClass(CustomGrid, [{
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
      console.log("locationPromptClose");
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
    key: 'getGeoLocation',
    value: function getGeoLocation() {
      var _this2 = this;

      console.log("getGeoLocation", this.state.lastButtonPress);

      var options = {
        enableHighAccuracy: true,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(function (pos) {
        _this2.geoLocation = pos;
        if (_this2.state.lastButtonPress) {
          console.log("opening search page", _this2.state.lastButtonPress, pos);
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
    key: 'render_home_page',
    value: function render_home_page() {
      var _this3 = this;

      {// clear any existing state. The home page structure is fixed
      }
      this.state.items = [];

      this.state.items = this.state.items.concat(this.new_find_card(CARD_TYPES.CARD_FIND_GENERAL, CARD_TYPES.CARD_FIND_GENERAL, image_find, strings.IDS_FIND_ALL));

      this.state.items = this.state.items.concat(this.new_find_card(CARD_TYPES.CARD_FIND_MEDICINE, CARD_TYPES.CARD_FIND_MEDICINE, image_medicine, strings.IDS_FIND_MEDICINES));

      this.state.items = this.state.items.concat(this.new_find_card(CARD_TYPES.CARD_FIND_FOOD, CARD_TYPES.CARD_FIND_FOOD, image_cooked_food, strings.IDS_FIND_FOOD));

      this.state.items = this.state.items.concat(this.new_find_card(CARD_TYPES.CARD_FIND_GROCERIES, CARD_TYPES.CARD_FIND_GROCERIES, image_grocery, strings.IDS_FIND_GROCERIES));

      var classes = this.props.classes;


      console.log(this.state.locationPromptOpen);
      return React.createElement(
        Fragment,
        null,
        React.createElement(
          Dialog,
          { open: this.state.locationPromptOpen, onClose: function onClose(e) {
              return _this3.locationPromptClose(e, "close").bind(_this3);
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
                  return _this3.locationPromptClose(e, "disagree");
                }, color: 'primary' },
              strings.IDS_LOCATION_PROMPT_DISAGREE
            ),
            React.createElement(
              Button,
              { onClick: function onClick(e) {
                  return _this3.locationPromptClose(e, "agree");
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
                        return _this3.CheckLocationOnFind(e, item.id);
                      } },
                    React.createElement(CardHeader, {
                      titleTypographyProps: { variant: 'h1', align: 'left' },
                      avatar: React.createElement(Avatar, { className: classes.cardAvatar2, src: item.image, 'aria-label': item.text }),

                      title: item.text
                    })
                  )
                )
              );
            }
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      switch (this.state.page_type) {
        case PAGE_TYPES.PAGE_HOME:
          return this.render_home_page();
          break;
        default:
          console.error('unexpected type');
          break;
      }

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
      var _this4 = this;

      navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        _this4.state.geoLocationStatus = result.state;

        if (_this4.state.geoLocationStatus == "granted") {
          _this4.getGeoLocation();
        } else if (_this4.state.geoLocationStatus == "prompt") {
          if (_this4.state.locationPromptCounter < 1) {
            _this4.state.locationPromptCounter += 1;
            _this4.setState({ locationPromptOpen: true });
          } else if (_this4.state.locationPromptCounter >= 1) {
            _this4.getGeoLocation();
          }
        } else if (_this4.state.geoLocationStatus == "denied") {
          _this4.state.lastButtonPress = null;
          _this4.showLocationErrorSnackBar();
          console.error("QueryLocationPermission. geoLocation permission denied");
        } else {
          _this4.state.lastButtonPress = null;
          console.error("unexpected permission", _this4.state.geoLocationStatus);
        }
      });
    }
  }, {
    key: 'CheckLocationOnFind',
    value: function CheckLocationOnFind(e, id) {
      this.state.lastButtonPress = id;
      this.QueryLocationPermission(id);
    }
  }, {
    key: 'handleSearchButtonPress',
    value: function handleSearchButtonPress(e, id) {

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
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {}
  }]);

  return CustomGrid;
}(React.Component);

export default withStyles(styles)(CustomGrid);