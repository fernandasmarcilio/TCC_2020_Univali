import React from 'react';

import { IconButton , Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1, 1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  input: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: theme.spacing(1),
    '&:focus': {
      background: '#ddd',
    }
  },
}))

function TitleListBoard({ title, creatable }) {
  const classes = useStyle();

  return (
    <>
      <div className={classes.editableTitleContainer}>
        <Typography 
          className={classes.editableTitle}
        >
          {title}
        </Typography>
        {creatable && (
          <IconButton  size="small" color="primary">
            <Add />
          </IconButton >
        )}
      </div>
    </>
  );
}

export default TitleListBoard;