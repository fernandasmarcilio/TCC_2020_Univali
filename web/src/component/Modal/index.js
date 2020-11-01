import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

function Modal({
  open,
  handleClickOpenModal,
  handleOnSubmit,
  title,
  handleClickOnCancel,
  children,
}) {

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClickOpenModal}
        disableBackdropClick
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOnCancel} color="secondary" variant="outlined">
            Cancelar
          </Button>
          {handleOnSubmit &&
            <Button onClick={handleOnSubmit} color="primary" variant="contained">
              Adicionar
            </Button>
            }
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Modal;