import { CardHeader, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
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
  return (
    <Paper className={classes.root}>
      <CardHeader
        className={classes.header}
        title="VIRTUAL-OCPPJ-STATION-1"
        text="true"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <ControlTabs />
    </Paper>
  );
};

export default ControlContainer;
