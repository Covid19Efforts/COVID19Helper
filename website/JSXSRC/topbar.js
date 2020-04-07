import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {IconButton, Button, Typography, Toolbar, AppBar, Select, MenuItem, InputLabel, Icon} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {data} from './localizedStrings.js';
import LocalizedStrings from 'react-localization';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const strings = new LocalizedStrings(data);

const styles = (theme) => ({
menuButton: {
  marginRight: theme.spacing(2),
},
languageSelect: {
  marginRight: theme.spacing(2),
  '&:hover' : {
    backgroundColor : 'rgba(0,0,0,0.08)'
  }
},
languageSelectInput : {
  color:'#ffffff'
},
title: {
  flexGrow: 1,
},
});

function WhiteDropDownIcon()
{
  return (
    <Icon style={{color:"#ffffff"}}>
      <ExpandMoreIcon  />
    </Icon>
  );
}

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  
  }

  render() {
    const { classes } = this.props;
    strings.setLanguage('lang_marathi');
    
    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title}>
              {strings.IDS_HELP_NEARBY}
            </Typography>
            <FormControl className={classes.languageSelect} >
              <Select value="english" IconComponent={WhiteDropDownIcon } disableUnderline inputProps={{className:classes.languageSelectInput}}>
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="marathi">Marathi</MenuItem>
                <MenuItem value="hindi">Hindi</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
    );
  }
};

export default withStyles(styles)(TopBar);
