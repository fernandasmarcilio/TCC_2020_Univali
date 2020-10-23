import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import './styles.css';

function Header({ title, handleClickOnButtonAdd }) {
  return (
    <>
      <header className="title">
        <h1>{title}</h1>
        {handleClickOnButtonAdd &&
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOnButtonAdd}
            startIcon={<Add />}
          >
            Adicionar
          </Button>
        }
      </header>
    </>
  );
}

export default Header;