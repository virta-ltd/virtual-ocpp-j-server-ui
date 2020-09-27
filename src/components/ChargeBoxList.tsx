import { Button, CardHeader, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

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

const ChargeBoxList = () => {
  const classes = useStyles();

  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3004/stations')
      .then((data) => data.json())
      .then((result) => setStations(result));
  }, []);

  const chargeboxes = stations.map((station: any) => (
    <li className={classes.listElement} key={station.id}>
      <Button variant="outlined" color="primary">
        {station.identity}
      </Button>
    </li>
  ));

  return (
    <div>
      <CardHeader
        className={classes.header}
        title="Select station"
        text="true"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <ul className={classes.listParent}>{chargeboxes}</ul>
    </div>
  );
};

export default ChargeBoxList;
