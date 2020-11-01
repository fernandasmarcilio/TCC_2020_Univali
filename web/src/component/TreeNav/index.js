import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  container: {
    margin: '10px 0'
  },
  link: {
    color: '#9b9fad',
    fontSize: '12px'
  },
  linkActived: {
    fontSize: '12px'
  }
}));

function TreeNav({nav}) {
  const classes = useStyles();

  return (
    <Breadcrumbs className={classes.container}>
    {nav.tree.map(link => (
      <Link key={link.name} className={classes.link} to={link.to}>
        {link.name}
      </Link>
    ))}
      <Typography className={classes.linkActived} color="textPrimary" >{nav.name}</Typography>
    </Breadcrumbs>
  );
}

export default TreeNav;