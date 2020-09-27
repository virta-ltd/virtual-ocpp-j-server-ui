import React from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideContainer from './SideContainer';
import ControlContainer from './ControlContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  body: {
    flexGrow: 1,
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className={classes.body}>
        <Grid container spacing={0}>
          <Grid item xs={6} sm={4} md={3}>
            <SideContainer />
          </Grid>
          <Grid item xs={6} sm={8} md={9}>
            <ControlContainer />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
