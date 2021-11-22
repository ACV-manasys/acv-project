import React from 'react';

import {
  TextField,
} from '@mui/material';

function StandardInput({
  label,
  name,
  value,
  setValue,
  required,
  width,
  sx,
}) {

  return (
    <TextField
      required={required}
      id={name}
      margin="normal"
      variant="outlined"
      size="medium"
      fullWidth
      value={value}
      label={label}
      onChange={(e) => {
        setValue((prev) => ({ ...prev, [name]: e.target.value }));
      }}
    />
  );
}

export default StandardInput;
