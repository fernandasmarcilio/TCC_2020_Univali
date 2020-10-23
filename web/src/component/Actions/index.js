import React from 'react';

import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import { Visibility, Edit, Delete } from '@material-ui/icons';

function Actions({ routeView, idItem, handleClickOnButtonDelete, handleClickOnButtonEdit }) {
  const route = `${routeView}/${idItem}`;

  return (
    <>
      <Link to={routeView ? route : '/'}>
        <IconButton>
          <Visibility  style={{ color: '#E89923' }}/>
        </IconButton>
      </Link>

      <IconButton onClick={() => handleClickOnButtonEdit(idItem)}>
        <Edit style={{ color: '#1F82CF'}}/>
      </IconButton>

      <IconButton onClick={() => handleClickOnButtonDelete(idItem)}>
        <Delete color="secondary" />
      </IconButton>
    </>
  );
}

export default Actions;