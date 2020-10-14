import React, { useContext, useEffect } from 'react';
import {
  DialogContent,
  DialogContentText,
  InputLabel,
  Select,
  makeStyles,
} from '@material-ui/core';
import { OperationContext } from '../../../context/OperationContext';
import { ChangeSelectEventFunc } from '../../../model/Helper';

const useStyles = makeStyles(() => ({
  selectContainer: {
    marginTop: 30,
  },
  select: {
    marginTop: 5,
  },
}));

const StatusNotificationDialogContent: React.FC = () => {
  const classes = useStyles();

  const {
    state: { requestPayload },
    setRequestPayload,
  } = useContext(OperationContext);

  const initialData = {
    status: 'Available',
    errorCode: 'NoError',
  };

  useEffect(() => {
    setRequestPayload(initialData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange: ChangeSelectEventFunc = ({ target: { name, value } }) => {
    if (!name) return;
    setRequestPayload({ ...requestPayload, [name]: value });
  };

  return (
    <DialogContent>
      <DialogContentText>
        Please select status to send to Central System
      </DialogContentText>
      <div className={classes.selectContainer}>
        <InputLabel htmlFor="status">Status</InputLabel>
        <Select
          className={classes.select}
          native
          value={requestPayload.status ?? initialData.status}
          onChange={onChange}
          inputProps={{
            name: 'status',
            id: 'status',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'Available'}>Available</option>
          <option value={'Charging'}>Charging</option>
        </Select>
      </div>
      <div className={classes.selectContainer}>
        <InputLabel htmlFor="errorCode">ErrorCode</InputLabel>
        <Select
          className={classes.select}
          native
          value={requestPayload.errorCode ?? initialData.status}
          onChange={onChange}
          inputProps={{
            name: 'errorCode',
            id: 'errorCode',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'NoError'}>NoError</option>
        </Select>
      </div>
    </DialogContent>
  );
};

export default StatusNotificationDialogContent;
