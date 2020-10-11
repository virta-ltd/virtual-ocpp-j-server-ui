import React, { useState } from 'react';
import { DialogContent, DialogContentText, TextField } from '@material-ui/core';
import { DiaglogContentProps } from './DialogContentProps';

const StopTransactionDialogContent: React.FC<DiaglogContentProps> = ({
  setPayloadData,
}) => {
  const [data, setData] = useState<any>({
    transactionId: 0,
  });

  const onChangeText: ChangeTextEventFunc = ({ target: { name, value } }) => {
    setData({
      ...data,
      [name]: value,
    });
    setPayloadData({
      ...data,
      [name]: value,
    });
  };

  return (
    <DialogContent>
      <DialogContentText>Please enter transactionId</DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="transactionId"
        onChange={onChangeText}
        value={data?.transactionId}
        name="transactionId"
        label="Transaction Id"
        type="text"
      />
    </DialogContent>
  );
};

type ChangeTextEventFunc = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export default StopTransactionDialogContent;
