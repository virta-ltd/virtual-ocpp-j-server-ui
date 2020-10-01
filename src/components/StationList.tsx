import { Button, CardHeader, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { StationContext } from '../context/StationContext';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1),
  },
  listElement: {
    listStyle: 'none',
    marginBottom: '0.5rem',
  },
  listParent: {
    paddingLeft: '1rem',
  },
}));

const StationList = () => {
  const classes = useStyles();

  const {
    selectStation,
    getStations,
    state: { stations, error },
  } = useContext(StationContext);

  useEffect(() => {
    getStations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stationsList = stations.map((station: any) => (
    <li className={classes.listElement} key={station.id}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => selectStation(station.id)}
      >
        {station.identity}
      </Button>
    </li>
  ));

  if (error) {
    alert(error);
  }

  return (
    <div>
      <CardHeader
        className={classes.header}
        title="Select station"
        text="true"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <ul className={classes.listParent}>{stationsList}</ul>
    </div>
  );
};

export default StationList;
