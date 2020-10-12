import React, { useContext, useEffect } from 'react';
import { DialogContent, DialogContentText, TextField } from '@material-ui/core';
import { OperationContext } from '../../../context/OperationContext';
import { ChangeTextEventFunc } from '../../../model/Helper';

const StartTransactionDialogContent: React.FC = () => {
  const {
    state: { requestPayload },
    setRequestPayload,
  } = useContext(OperationContext);

  const initialData = {
    idTag: 'idTag',
  };

  useEffect(() => {
    setRequestPayload(initialData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeText: ChangeTextEventFunc = ({ target: { name, value } }) => {
    setRequestPayload({ ...requestPayload, [name]: value });
  };

  return (
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
        name="idTag"
        onChange={onChangeText}
        value={requestPayload?.idTag ?? initialData.idTag}
      />
    </DialogContent>
  );
};

export default StartTransactionDialogContent;
