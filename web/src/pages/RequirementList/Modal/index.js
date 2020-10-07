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
  form, 
  handleOnChangeInput, 
  metricsSelected,
  metrics, 
  handleChangeSelect,
  handleOnSubmit
 }) {
  const classes = useStyles();

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
        <DialogTitle id="form-dialog-title">Adicionar requisitos de usabilidade</DialogTitle>
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

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Métricas</InputLabel>
            <Select
              multiple
              value={metricsSelected}
              onChange={handleChangeSelect}
            >
              {metrics.map((metric) => (
                <MenuItem key={metric.id} value={metric.id} name={metric.nome}>
                  {metric.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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