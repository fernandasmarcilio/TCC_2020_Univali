import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
    marginTop: 10
  }
}));

function Modal({
  open,
  handleClickOpenModal,
  handleOnChangeInput,
  form,
  handleOnSubmit,
  title,
  haveInputSelect,
  items,
  itemsSelected,
  handleChangeSelect,
  titleSelectLabel
}) {

  const classes = useStyles();

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClickOpenModal}
        disableBackdropClick
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>{title}</DialogTitle>
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
          {haveInputSelect && (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>{titleSelectLabel}</InputLabel>
              <Select
                multiple
                value={itemsSelected}
                onChange={handleChangeSelect}
              >
                {items.map((item) => (
                  <MenuItem key={item.id} value={item.id} name={item.nome}>
                    {item.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpenModal} color="secondary" variant="outlined">
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