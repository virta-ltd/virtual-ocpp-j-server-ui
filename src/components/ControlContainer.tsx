import { CardHeader, makeStyles, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import { StationContext } from '../context/StationContext';
import ControlTabs from './ControlTabs';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    marginLeft: 1,
  },
  header: {
    padding: theme.spacing(1),
  },
}));

const ControlContainer = () => {
  const classes = useStyles();

  const {
    state: { selectedStation },
  } = useContext(StationContext);

  return (
    <Paper className={classes.root} elevation={0}>
      <CardHeader
        className={classes.header}
        title={selectedStation?.identity ?? 'Please select station'}
        text="true"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <ControlTabs />
    </Paper>
  );
};

export default ControlContainer;
