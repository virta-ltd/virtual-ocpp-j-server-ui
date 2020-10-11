import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UIOperation } from '../../../model/UIOperation';
import { ChargePointOperations } from '../../../model/ChargePointOperations';
import StartTransactionDialogContent from './StartTransactionDialogContent';
import StopTransactionDialogContent from './StopTransactionDialogContent';

const FormDialog: React.FC<FormDiaglogProps> = ({
  open,
  setOpen,
  currentOperation,
  requestOperation,
}: FormDiaglogProps) => {
  const [payloadData, setPayloadData] = useState({});
  if (currentOperation === null) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    setOpen(false);
    await requestOperation(currentOperation.name, payloadData);
  };

  const getDialogContent = () => {
    let dialogContent;
    switch (currentOperation.name) {
      case ChargePointOperations.StartTransaction:
        dialogContent = (
          <StartTransactionDialogContent setPayloadData={setPayloadData} />
        );
        break;
      case ChargePointOperations.StopTransaction:
        dialogContent = (
          <StopTransactionDialogContent setPayloadData={setPayloadData} />
        );
        break;
      default:
        dialogContent = null;
    }
    return dialogContent;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {currentOperation.name}
        </DialogTitle>
        {getDialogContent()}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

type FormDiaglogProps = {
  open: boolean;
  setOpen: Function;
  currentOperation: UIOperation | null;
  requestOperation: Function;
};

export default FormDialog;

// maybe a FormContext to update form???
