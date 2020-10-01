import { CardHeader, makeStyles, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import { StationContext } from '../context/StationContext';
import ControlTabs from './ControlTabs';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: '100vh',
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
    <Paper className={classes.root}>
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
