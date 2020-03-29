import React      from 'react';
import ReactDOM   from 'react-dom';
import { makeStyles } from "@material-ui/core/styles";
import Grid     from '@material-ui/core/Grid';
import Card     from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

// export default function CustomGrid()
// {
//    const classes = useStyles();
//
//   return (
//     <div className={classes.root}>
//     <Grid container spacing={2}>
//       <Grid item sm={12}>
//       <Card className={classes.card}>card</Card>
//       </Grid>
//     </Grid>
//     </div>
//   );
// }

//class CustomGrid extends React.Component {
  export default class CustomGrid extends React.Component
  {
  constructor(props)
  {
    super(props);
    this.state = {items : []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.classes = useStyles();
  }

  render()
  {
return (
    <div className={this.classes.root}>
    //<Grid container spacing={2}>
    // {this.state.items.map(item => (
    //
    //   <Grid item sm={12}>
    //   <Card className={this.classes.card}>card</Card>
    //   </Grid>
    //
    // ))
    // }

          // <Grid item sm={12}>
          // <Card className={this.classes.card}>card</Card>
          // </Grid>
    //</Grid>
    </div>
  );
  }

  //this.SetState(state => )
  handleChange(e)
  {

  }

  handleSubmit(e)
  {

  }
};
