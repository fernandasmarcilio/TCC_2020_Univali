import React from 'react';

import Modal from '../Modal';

import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';

function ModalDetails({
  open,
  handleClickOpenModal,
  handleClickOnCancel,
  items,
  form,
  titleItems
}) {
  return (
    <Modal
      open={open}
      handleClickOpenModal={handleClickOpenModal}
      title={form.name}
      handleClickOnCancel={handleClickOnCancel}
    >
      {items ? (
        <>
          <Typography variant="h6">{titleItems}</Typography>
          <List>
            {items.map(item => (
              <ListItem key={item.nome}>
                <ListItemIcon>
                  <FiberManualRecord />
                </ListItemIcon>
                <ListItemText primary={item.nome} />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography variant="p">{form.description}</Typography>
      )}

    </Modal>
  );
}

export default ModalDetails;