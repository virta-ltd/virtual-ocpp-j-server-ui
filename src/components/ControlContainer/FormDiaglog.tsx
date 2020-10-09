import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog: React.FC<FormDiaglogProps> = ({
  open,
  setOpen,
}: FormDiaglogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    console.log('Message sent');
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter idTag to send to Central System
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="idTag"
            label="idTag"
            type="text"
            fullWidth
          />
        </DialogContent>
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
