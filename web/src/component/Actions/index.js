import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, Edit, Delete } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function Actions({ idItem, handleClickOnButtonDelete, handleClickOnButtonEdit, handleClickOnButtonView }) {
  return (
    <>
      <LightTooltip title="Visualizar" placement="top-end" TransitionComponent={Fade}>
        <IconButton onClick={() => handleClickOnButtonView(idItem)}>
          <Visibility style={{ color: '#E89923' }} />
        </IconButton>
      </LightTooltip>

      <LightTooltip title="Editar" placement="top-end" TransitionComponent={Fade}>
        <IconButton onClick={() => handleClickOnButtonEdit(idItem)}>
          <Edit style={{ color: '#1F82CF' }} />
        </IconButton>
      </LightTooltip>
      <LightTooltip title="Excluir" placement="top-end" TransitionComponent={Fade}>
        <IconButton onClick={() => handleClickOnButtonDelete(idItem)}>
          <Delete color="secondary" />
        </IconButton>
      </LightTooltip>
    </>
  );
}

export default Actions;