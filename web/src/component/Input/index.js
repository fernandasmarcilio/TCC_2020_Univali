import React from 'react';

import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#079B8D',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#079B8D',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#079B8D',
      },
    },
  },
})(TextField);


function InputComponent({ onChange, value, name, label }) {

  return (
    <CssTextField
      autoFocus
      margin="dense"
      label={label}
      variant="outlined"
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputComponent;