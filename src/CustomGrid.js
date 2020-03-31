var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
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
    _this.state = { page_type: PAGE_TYPES.PAGE_HOME, language: language, items: [] };
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
    key: 'render_home_page',
    value: function render_home_page() {
      {// clear any existing state. The home page structure is fixed
      }
      this.state.items = [];

      var idCtr = 0;
      this.state.items = this.state.items.concat(this.new_find_card(idCtr, CARD_TYPES.CARD_FIND_GENERAL, image_find, strings.IDS_FIND_ALL));

      idCtr++;
      this.state.items = this.state.items.concat(this.new_find_card(idCtr, CARD_TYPES.CARD_FIND_MEDICINE, image_medicine, strings.IDS_FIND_MEDICINES));

      idCtr++;
      this.state.items = this.state.items.concat(this.new_find_card(idCtr, CARD_TYPES.CARD_FIND_FOOD, image_cooked_food, strings.IDS_FIND_FOOD));

      idCtr++;
      this.state.items = this.state.items.concat(this.new_find_card(idCtr, CARD_TYPES.CARD_FIND_GROCERIES, image_grocery, strings.IDS_FIND_GROCERIES));

      var classes = this.props.classes;


      return React.createElement(
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
                React.createElement(CardHeader, {
                  titleTypographyProps: { variant: 'h1', align: 'left' },
                  avatar: React.createElement(Avatar, { className: classes.cardAvatar2, src: item.image, 'aria-label': item.text }),

                  title: item.text
                })
              )
            );
          }
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      switch (this.state.page_type) {
        case PAGE_TYPES.PAGE_HOME:
          return this.render_home_page();
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
    key: 'handleSubmit',
    value: function handleSubmit(e) {}
  }]);

  return CustomGrid;
}(React.Component);

export default withStyles(styles)(CustomGrid);