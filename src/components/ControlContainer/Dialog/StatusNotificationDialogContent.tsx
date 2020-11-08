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
import { StatusNotificationErrorCodeEnum } from '../../../model/StatusNotificationErrorCodeEnum';
import { StatusNotificationStatusEnum } from '../../../model/StatusNotificationStatusEnum';

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
          {Object.values(StatusNotificationStatusEnum).map((value) => (
            <option value={value}>{value}</option>
          ))}
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
          {Object.values(StatusNotificationErrorCodeEnum).map((value) => (
            <option value={value}>{value}</option>
          ))}
        </Select>
      </div>
    </DialogContent>
  );
};

export default StatusNotificationDialogContent;
