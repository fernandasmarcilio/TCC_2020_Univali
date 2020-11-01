import React from 'react';

import Button from '../Button';
import { Typography } from '@material-ui/core';

import './styles.css';

function Header({ title, nameButton, onClick, startIcon }) {
  return (
    <>
      <header className="title">
        <Typography variant="h3" >{title}</Typography>
        {onClick &&
          <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            startIcon={startIcon}
            name={nameButton}
          />
        }
      </header>
    </>
  );
}

export default Header;