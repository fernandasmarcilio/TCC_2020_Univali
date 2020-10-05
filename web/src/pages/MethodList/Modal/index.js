import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function Modal({ open, handleClickOpenModal, handleOnChangeInput, form, handleOnSubmit }) {
    return (
        <>
            <Dialog 
                open={open} 
                onClose={handleClickOpenModal} 
                aria-labelledby="form-dialog-title"
                disableBackdropClick
                fullWidth={true}
                maxWidth="md"
                >
                <DialogTitle id="form-dialog-title">Adicionar método de usabilidade</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={form.name}
                        onChange={handleOnChangeInput}
                    />
                    <TextField
                        margin="dense"
                        label="Descrição"
                        variant="outlined"
                        fullWidth
                        name="description"
                        value={form.description}
                        onChange={handleOnChangeInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickOpenModal} color="secondary" variant="contained">
                        Cancelar
          </Button>
                    <Button onClick={handleOnSubmit} color="primary" variant="contained">
                        Adicionar
          </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Modal;