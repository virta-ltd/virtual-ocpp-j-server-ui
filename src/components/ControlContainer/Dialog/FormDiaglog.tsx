import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { OperationContext } from '../../../context/OperationContext';
import { StationContext } from '../../../context/StationContext';
import { ChargePointOperations } from '../../../model/ChargePointOperations';
import AuthorizeDialogContext from './AuthorizeDialogContext';
import StartTransactionDialogContent from './StartTransactionDialogContent';
import StatusNotificationDialogContent from './StatusNotificationDialogContent';
import StopTransactionDialogContent from './StopTransactionDialogContent';

const FormDialog: React.FC<FormDiaglogProps> = ({
  open,
  setOpen,
}: FormDiaglogProps) => {
  const {
    state: { operation },
    sendOperationRequest,
  } = useContext(OperationContext);
  const {
    state: { selectedStation },
  } = useContext(StationContext);

  if (operation === ChargePointOperations.Unknown) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    if (selectedStation === null) return;
    setOpen(false);
    await sendOperationRequest(selectedStation.id);
  };

  const getDialogContent = () => {
    let dialogContent;
    switch (operation) {
      case ChargePointOperations.StartTransaction:
        dialogContent = <StartTransactionDialogContent />;
        break;
      case ChargePointOperations.Authorize:
        dialogContent = <AuthorizeDialogContext />;
        break;
      case ChargePointOperations.StopTransaction:
        dialogContent = <StopTransactionDialogContent />;
        break;
      case ChargePointOperations.StatusNotification:
        dialogContent = <StatusNotificationDialogContent />;
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
        <DialogTitle id="form-dialog-title">{operation}</DialogTitle>
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
};

export default FormDialog;
