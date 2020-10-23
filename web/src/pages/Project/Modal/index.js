import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';


function Modal({
  open,
  handleClickOpenModal,
  title,
  requirements,
  checked,
  checkedAll,
  handleToggle,
  handleToggleAll,
  handleClickAddRequirement
}) {

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClickOpenModal}
        disableBackdropClick
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>

          <List>

            <ListItem dense button onClick={handleToggleAll}>
              <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checkedAll}
                    tabIndex={-1}
                    disableRipple
                />
              </ListItemIcon>
              <ListItemText primary="Selecionar todos" />
            </ListItem>
            <Divider />

            {requirements.map((requirement) => {
              const labelId = `checkbox-list-label-${requirement.id}`;
              return (
                <ListItem key={requirement.id} role={undefined} dense button onClick={() => handleToggle(requirement.id)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(requirement.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${requirement.nome}`} />
                </ListItem>
              );
            })}
          </List>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpenModal} color="secondary" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleClickAddRequirement} color="primary" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Modal;