import React from 'react';

import { Paper, Typography } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  addCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: '#ebecf0',
    '&:hover': {
      backgroundColor: fade('#000', 0.25),
      color: '#333',
    },
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    color: '#9b9fad',
    cursor: 'pointer',
  },
}));

function InputCardBoard() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
    <Paper className={classes.addCard} elevation={0}>
      <Add /> 
      <Typography>Adicionar requisitos</Typography>
    </Paper>
    </div>
  );
}

export default InputCardBoard;