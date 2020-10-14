import React, { useContext, useState } from 'react';
import { Button, IconButton, makeStyles, Theme } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { OperationContext } from '../../context/OperationContext';
import { StationContext } from '../../context/StationContext';
import { ChargePointOperations } from '../../model/ChargePointOperations';
import { UIOperation } from '../../model/UIOperation';
import FormDialog from './Dialog/FormDiaglog';

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
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const {
    state: { selectedStation },
  } = useContext(StationContext);

  const {
    state: { responsePayload },
    setCurrentOperation,
    sendOperationRequest,
  } = useContext(OperationContext);

  const operations = [
    {
      name: ChargePointOperations.BootNotification,
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

  const onOperationClick = (operation: UIOperation, edit = false) => {
    setCurrentOperation(operation.name);

    if (operation?.requiredInput) {
      return setOpen(true);
    }

    if (edit === true) {
      return setOpen(true);
    }

    if (selectedStation?.id) {
      sendOperationRequest(selectedStation.id);
    }
  };

  const operationButtons = operations.map((operation) => {
    const { name, editable } = operation;
    return (
      <div key={name} className={classes.buttonContainer}>
        <Button
          onClick={() => onOperationClick(operation)}
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
            onClick={() => onOperationClick(operation, true)}
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

      {responsePayload.status === 'pending' ? 'Pending request' : null}
      {responsePayload?.status === 'success' ? (
        <div>
          <p>Result: {responsePayload.status}</p>

          <p>
            Request: <br></br>
          </p>
          <pre>
            {JSON.stringify(JSON.parse(responsePayload.request), null, 2)}
          </pre>
          <p>
            Response: <br></br>
          </p>
          <pre>
            {JSON.stringify(JSON.parse(responsePayload.response), null, 2)}
          </pre>
        </div>
      ) : null}
    </>
  );
};

export default ControlCenter;
