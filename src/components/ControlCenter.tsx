import { Button, IconButton, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { ChargePointOperations } from '../context/ChargePointOperations';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    display: 'flex',
    marginTop: theme.spacing(2),
    width: 250,
    justifyContent: 'space-between',
  },
  button: {
    width: 200,
    textTransform: 'none',
  },
}));

const ControlCenter = () => {
  const classes = useStyles();

  const supportedOperations = [
    ChargePointOperations.BootNotificationn,
    ChargePointOperations.Heartbeat,
    ChargePointOperations.StartTransaction,
    ChargePointOperations.StopTransaction,
    ChargePointOperations.StatusNotification,
    'Raw',
  ];

  const actionButtons = supportedOperations.map((operation) => (
    <div key={operation} className={classes.buttonContainer}>
      <Button className={classes.button} variant="outlined" color="primary">
        {operation}
      </Button>
      <IconButton aria-label="send customized message" color="primary">
        <EditIcon />
      </IconButton>
    </div>
  ));

  return <ul>{actionButtons}</ul>;
};

export default ControlCenter;
