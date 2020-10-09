import React from 'react';
import { DialogContent, DialogContentText, TextField } from '@material-ui/core';

const StopTransactionDialogContent = () => (
  <DialogContent>
    <DialogContentText>Please enter transactionId</DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="transactionId"
      label="Transaction Id"
      type="text"
    />
  </DialogContent>
);

export default StopTransactionDialogContent;
