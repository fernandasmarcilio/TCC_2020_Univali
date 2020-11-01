import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Add } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    fontSize: theme.spacing(1.5),
  }, 
  buttonFullWidth :{
    padding: theme.spacing(1),
    fontSize: theme.spacing(1.5),
    width: '100%'
  }
}))

function ButtonComponent({ name, startIcon, onClick, fullWidth }) {
  const classes = useStyle();

  return (
    <Button 
      variant="contained" 
      color="primary" 
      className={fullWidth ? classes.buttonFullWidth : classes.button}
      startIcon={startIcon && <Add />}
      onClick={onClick}
    >
      {name}
    </Button>
  );
}

export default ButtonComponent;