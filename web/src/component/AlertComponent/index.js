import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

function AlertComponent({open, handleOpenAlertSucess, text, type}) {
  return (
    <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={() => handleOpenAlertSucess(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        TransitionComponent={(props) => (
          <Slide {...props} direction="left" />
        )
        }
      >
        <Alert onClose={() => handleOpenAlertSucess(false)} variant="filled" severity={type} elevation={6}>
          <Typography variant="h5" gutterBottom>
            {text}
          </Typography>
        </Alert>
      </Snackbar>
  );
}

export default AlertComponent;