import React from 'react';

import { Link, Route } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import { Visibility, Edit, Delete } from '@material-ui/icons';

function Actions({ routeView, idProject }) {
  const route = `${routeView}/${idProject}`;

  return (
    <>
      <Link to={routeView ? route : '/'}>
        <IconButton>
          <Visibility />
        </IconButton>
      </Link>

      <IconButton>
        <Edit />
      </IconButton>

      <IconButton>
        <Delete />
      </IconButton>
    </>
  );
}

export default Actions;