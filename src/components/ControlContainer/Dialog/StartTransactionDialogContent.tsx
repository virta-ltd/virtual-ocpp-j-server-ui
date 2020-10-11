import React from 'react';
import { DialogContent, DialogContentText, TextField } from '@material-ui/core';
import { DiaglogContentProps } from './DialogContentProps';

const StartTransactionDialogContent: React.FC<DiaglogContentProps> = ({
  setPayloadData,
}) => (
  <DialogContent>
    <DialogContentText>
      Please enter idTag to send to Central System
    </DialogContentText>
    <TextField autoFocus margin="dense" id="idTag" label="idTag" type="text" />
  </DialogContent>
);

export default StartTransactionDialogContent;
