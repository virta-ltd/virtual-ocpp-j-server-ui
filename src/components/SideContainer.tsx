import React from 'react';
import { Button, makeStyles, Paper, TextField } from '@material-ui/core';
import ChargeBoxList from './ChargeBoxList';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: '100vh',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: 0,
    width: '25ch',
  },
  buttonContainer: {
    width: '100%',
    marginLeft: '8px',
  },
  button: {
    backgroundColor: 'green',
  },
}));

const SideContainer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.buttonContainer}>
        <Button className={classes.button} variant="contained" color="primary">
          Create New
        </Button>
      </div>

      <TextField
        label="Search For Station"
        id="outlined-margin-dense"
        defaultValue=""
        className={classes.textField}
        margin="dense"
        variant="outlined"
      />

      <ChargeBoxList />
    </Paper>
  );
};

export default SideContainer;
