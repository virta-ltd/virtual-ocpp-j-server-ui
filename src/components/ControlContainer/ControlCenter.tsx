import React, { useContext, useState } from 'react';
import { Button, IconButton, makeStyles, Theme } from '@material-ui/core';
import { ChargePointOperations } from '../../context/ChargePointOperations';
import EditIcon from '@material-ui/icons/Edit';
import { StationContext } from '../../context/StationContext';
import FormDialog from './FormDiaglog';

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    display: 'flex',
    marginTop: theme.spacing(2),
    width: 250,
    justifyContent: 'space-between',
  },
  button: {
    width: 200,
    height: 48,
    textTransform: 'none',
  },
}));

const ControlCenter = () => {
  const [actionResponse, setActionResponse] = useState<{
    status: string;
    request: string;
    response: string;
  } | null>(null);
  const [pendingRequest, setPendingRequest] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const {
    state: { selectedStation },
  } = useContext(StationContext);

  const operations = [
    {
      name: ChargePointOperations.BootNotificationn,
      requiredInput: false,
      editable: true,
    },
    {
      name: ChargePointOperations.Heartbeat,
      requiredInput: false,
      editable: false,
    },
    {
      name: ChargePointOperations.Authorize,
      requiredInput: true,
      editable: true,
    },
    {
      name: ChargePointOperations.StartTransaction,
      requiredInput: true,
      editable: true,
    },
    {
      name: ChargePointOperations.StopTransaction,
      requiredInput: true,
      editable: true,
    },
    {
      name: ChargePointOperations.StatusNotification,
      requiredInput: true,
      editable: true,
    },
  ];

  // type simple => 1 click
  // type required to enter something
  // type mixed? it can be both with 1 click or dialog with info?
  // or maybe just start with the same

  const requestOperation = async (operation: string) => {
    const url = `${
      process.env.REACT_APP_SERVER_URL
    }/station/operations/${operation.toLowerCase()}`;
    setActionResponse(null);
    const requestPayload = {
      stationId: selectedStation?.id,
    };

    setPendingRequest(true);
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestPayload),
    });
    setPendingRequest(false);

    if (!data.ok) {
      return console.log('error');
    }
    const response = await data.json();

    setActionResponse(response);
  };

  const operationButtons = operations.map((operation) => {
    const { name, requiredInput, editable } = operation;
    return (
      <div key={name} className={classes.buttonContainer}>
        <Button
          onClick={() =>
            requiredInput ? setOpen(true) : requestOperation(name)
          }
          className={classes.button}
          variant="outlined"
          color="primary"
        >
          {name}
        </Button>
        {editable ? (
          <IconButton
            aria-label="send customized message"
            color="primary"
            onClick={() => setOpen(true)}
          >
            <EditIcon />
          </IconButton>
        ) : null}
      </div>
    );
  });

  return (
    <>
      <ul>{operationButtons}</ul>

      <FormDialog open={open} setOpen={setOpen} />

      {pendingRequest ? 'Pending request' : null}
      {actionResponse?.status ? (
        <div>
          <p>Result: {actionResponse.status}</p>
          <p>Request: {actionResponse.request}</p>
          <p>Response: {actionResponse.response}</p>
        </div>
      ) : null}
    </>
  );
};

export default ControlCenter;
