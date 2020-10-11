import React, { useContext, useState } from 'react';
import { Button, IconButton, makeStyles, Theme } from '@material-ui/core';
import { ChargePointOperations } from '../../model/ChargePointOperations';
import EditIcon from '@material-ui/icons/Edit';
import { StationContext } from '../../context/StationContext';
import FormDialog from './Dialog/FormDiaglog';
import { UIOperation } from '../../model/UIOperation';

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
  const [currentOperation, setCurrentOperation] = useState<UIOperation | null>(
    null
  );

  const classes = useStyles();
  const {
    state: { selectedStation },
  } = useContext(StationContext);

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

  const requestOperation = async (operation: string, payloadData: any = {}) => {
    console.log(operation);
    const url = `${
      process.env.REACT_APP_SERVER_URL
    }/station/operations/${operation.toLowerCase()}`;
    setActionResponse(null);
    const requestPayload = {
      ...payloadData,
      stationId: selectedStation?.id,
    };

    setPendingRequest(true);
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });
    setPendingRequest(false);

    if (!data.ok) {
      return console.log('error');
    }
    const response = await data.json();

    setActionResponse(response);

    return response;
  };

  const onOperationClick = (operation: UIOperation, edit = false) => {
    setCurrentOperation(operation);

    if (operation?.requiredInput) {
      return setOpen(true);
    }

    if (edit === true) {
      return setOpen(true);
    }

    requestOperation(operation?.name ?? '');
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

      <FormDialog
        open={open}
        setOpen={setOpen}
        currentOperation={currentOperation}
        requestOperation={requestOperation}
      />

      {pendingRequest ? 'Pending request' : null}
      {actionResponse?.status ? (
        <div>
          <p>Result: {actionResponse.status}</p>

          <p>
            Request: <br></br>
          </p>
          <pre>
            {JSON.stringify(JSON.parse(actionResponse.request), null, 2)}
          </pre>
          <p>
            Response: <br></br>
          </p>
          <pre>
            {JSON.stringify(JSON.parse(actionResponse.response), null, 2)}
          </pre>
        </div>
      ) : null}
    </>
  );
};

export default ControlCenter;
