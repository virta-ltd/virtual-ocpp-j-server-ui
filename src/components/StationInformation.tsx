import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { StationContext } from '../context/StationContext';
import { Station } from '../model/Station';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '60ch',
      },
    },
    buttonContainer: {
      margin: '8px',
    },
  })
);

type ChangeTextEventFunc = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

const StationInformation = () => {
  const classes = useStyles();

  const {
    state: { selectedStation },
  } = useContext(StationContext);

  const [station, setStation] = useState<Station | null>(selectedStation);

  useEffect(() => {
    setStation(selectedStation);
  }, [selectedStation]);

  if (!selectedStation) {
    return <h4>Please select a station first</h4>;
  }

  const onChangeUrl: ChangeTextEventFunc = ({ target: { value } }) => {
    if (station === null) {
      return;
    }
    setStation({ ...station, centralSystemUrl: value });
  };

  const onChangeCurrentChargingPower: ChangeTextEventFunc = ({
    target: { value },
  }) => {
    if (station === null) {
      return;
    }
    setStation({ ...station, currentChargingPower: parseInt(value) });
  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          disabled
          label="Identity"
          id="identity"
          value={station?.identity}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          disabled
          label="Meter Value"
          id="meterValue"
          value={station?.meterValue}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          disabled
          label="Charge In Progress?"
          id="chargeInProgress"
          value={station?.chargeInProgress ? 'yes' : 'no'}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          disabled
          label="Current Transaction Id"
          id="currentTransactionId"
          value={station?.currentTransactionId ?? 'Not Available'}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Central System URL"
          id="centralSystemUrl"
          value={station?.centralSystemUrl}
          onChange={onChangeUrl}
          variant="outlined"
        />
        <TextField
          label="Current Charging Power"
          id="currentChargingPower"
          value={station?.currentChargingPower}
          onChange={onChangeCurrentChargingPower}
          variant="outlined"
        />
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StationInformation;
