var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

var styles = function styles(theme) {
  return {
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  };
};

var TopBar = function (_React$Component) {
  _inherits(TopBar, _React$Component);

  function TopBar(props) {
    _classCallCheck(this, TopBar);

    return _possibleConstructorReturn(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).call(this, props));
  }

  _createClass(TopBar, [{
    key: 'render',
    value: function render() {
      var classes = this.props.classes;

      return React.createElement(
        AppBar,
        { position: 'static' },
        React.createElement(
          Toolbar,
          null,
          React.createElement(
            IconButton,
            { edge: 'start', className: classes.menuButton, color: 'inherit', 'aria-label': 'menu' },
            React.createElement(MenuIcon, null)
          ),
          React.createElement(
            Typography,
            { variant: 'subtitle1', className: classes.title },
            'COVID19 Help is around you ...'
          ),
          React.createElement(
            Button,
            { color: 'inherit' },
            'Login'
          )
        )
      );
    }
  }]);

  return TopBar;
}(React.Component);

;

export default withStyles(styles)(TopBar);