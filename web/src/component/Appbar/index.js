import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip, Fade, Button} from '@material-ui/core';
import { FolderOpen, Subject, BarChart, PlaylistAddCheck, Menu, ChevronRight, ChevronLeft } from '@material-ui/icons';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonSingOut: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
  }
}));

const listItemMenu = [
  { id: 0, name: 'Projetos', route: '/projects', icon: <FolderOpen /> },
  { id: 1, name: 'Requisitos de Usabilidade', route: '/requirements', icon: <Subject /> },
  { id: 2, name: 'Métricas de Usabilidade', route: '/metrics', icon: <BarChart /> },
  { id: 3, name: 'Métodos de Avaliação de Usabilidade', route: '/methods', icon: <PlaylistAddCheck /> },
]

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function Appbar({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <div className={classes.iconButton}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <Menu />
            </IconButton>
          </div>
          <div className={classes.buttonSingOut}>
            <Button color="inherit" component={Link} to="/">Sair</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {listItemMenu.map((item) => (
            <LightTooltip title={item.name} placement="top-end" key={item.id} TransitionComponent={Fade}>
              <ListItem button key={item.name} component={Link} to={item.route}>
                <ListItemIcon fontSize="large">{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </LightTooltip >
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default Appbar;