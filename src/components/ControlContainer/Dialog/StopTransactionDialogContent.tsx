import React, { useContext, useEffect } from 'react';
import { DialogContent, DialogContentText, TextField } from '@material-ui/core';
import { OperationContext } from '../../../context/OperationContext';

const StopTransactionDialogContent: React.FC = () => {
  const {
    state: { requestPayload },
    setRequestPayload,
  } = useContext(OperationContext);

  const initialData = {
    transactionId: 0,
  };

  useEffect(() => {
    setRequestPayload(initialData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeText: ChangeTextEventFunc = ({ target: { name, value } }) => {
    setRequestPayload({ ...requestPayload, [name]: value });
  };

  return (
    <DialogContent>
      <DialogContentText>Please enter transactionId</DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="transactionId"
        onChange={onChangeText}
        value={requestPayload?.transactionId ?? initialData.transactionId}
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
