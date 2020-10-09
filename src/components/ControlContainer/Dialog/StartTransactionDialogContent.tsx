import React from 'react';
import { DialogContent, DialogContentText, TextField } from '@material-ui/core';

const StartTransactionDialogContent = () => (
  <DialogContent>
    <DialogContentText>
      Please enter idTag to send to Central System
    </DialogContentText>
    <TextField autoFocus margin="dense" id="idTag" label="idTag" type="text" />
  </DialogContent>
);

export default StartTransactionDialogContent;
