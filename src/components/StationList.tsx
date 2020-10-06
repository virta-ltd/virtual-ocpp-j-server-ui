import { Button, CardHeader, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { StationContext } from '../context/StationContext';
import { Station } from '../model/Station';

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
  button: {
    textTransform: 'none',
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
    getStations()
      .then((stations) => {
        if (stations.length > 0) {
          selectStation(stations[0].id);
        }
      })
      .catch(() => console.log('Error fetching stations'));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stationsList = stations.map((station: Station) => (
    <li className={classes.listElement} key={station.id}>
      <Button
        className={classes.button}
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
