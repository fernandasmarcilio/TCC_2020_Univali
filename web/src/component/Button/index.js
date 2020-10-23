import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  button: {
    width: '100%',
    height: '40px',
    fontSize: '1.6rem',
    backgroundColor: '#079B8D',
    '&:hover': {
      background: '#078276',
    }
  }
}))

function ButtonComponent({ children, onClick }) {
  const classes = useStyle();

  return (
    <Button
      className={classes.button}
      onClick={onClick}
      color="primary"
      variant="contained"
      size="large"
    >
      {children}
    </Button>
  );
}

export default ButtonComponent;