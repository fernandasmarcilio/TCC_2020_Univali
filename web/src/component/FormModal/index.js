import React from 'react';

import Modal from '../Modal';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
    marginTop: 10
  }
}));

function FormModal({
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
  titleSelectLabel,
  handleClickOnCancel,
  hasDescription
}) {
  
  const classes = useStyles();

  return (
    <Modal
      open={open}
      handleClickOpenModal={handleClickOpenModal}
      handleOnSubmit={handleOnSubmit}
      title={title}
      handleClickOnCancel={handleClickOnCancel}
    >
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
      {hasDescription &&
        <TextField
        margin="dense"
        label="Descrição"
        variant="outlined"
        fullWidth
        name="description"
        value={form.description}
        onChange={handleOnChangeInput}
        />
      }
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
    </Modal>
  )
}

export default FormModal;