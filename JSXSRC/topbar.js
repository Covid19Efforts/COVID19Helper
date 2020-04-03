import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {IconButton, Button, Typography, Toolbar, AppBar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = (theme) => ({
menuButton: {
  marginRight: theme.spacing(2),
},
title: {
  flexGrow: 1,
},
});

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  
  }

  render() {
    const { classes } = this.props;
    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title}>
              COVID19 Help is around you ...
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
    );
  }
};

export default withStyles(styles)(TopBar);
