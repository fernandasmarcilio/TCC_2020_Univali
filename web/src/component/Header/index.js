import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import './styles.css';

function Header({title, children}) {
  return (
      <>
        <header className="header">
            <Button variant="contained" color="primary" component={Link} to="/">
            Sair
            </Button>
        </header>


        <section className="title">
            <h1>{title}</h1>
            {children ? children : (
                <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                >
                Adicionar
                </Button>
            )}
        </section>
    </>
  );
}

export default Header;