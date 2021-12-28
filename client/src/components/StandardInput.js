import React from 'react';

import {
  TextField,
  FormHelperText,
  Box,
  InputAdornment,
  Input,
} from '@mui/material';

function StandardInput({
  label,
  name,
  value,
  setValue,
  required,
  width,
  sx,
  setErrors,
  multiline,
  type,
  moneySign,
  dimensionSign,
}) {

  const invalidEmailErrorMessage = 'invalid email';
  const invalidTelErrorMessage = 'Must only contain numbers';

  function isError(val) {
    switch (name) {
      case 'email':
        if (setErrors !== undefined) {
          if (!/\S+@\S+\.\S+/.test(val)) {
            setErrors((prev) => ({ ...prev, email: true }));
          } else {
            setErrors((prev) => ({ ...prev, email: false }));
          }
        }
        return !/\S+@\S+\.\S+/.test(val);
      case 'tel':
        return isNaN(val);
      default:
    }
  }

  function generateHelperText(val) {
    if (val !== '') {
      switch (name) {
        case 'email':
          return (
            !/\S+@\S+\.\S+/.test(val) && (
              <FormHelperText error>{invalidEmailErrorMessage}</FormHelperText>
            )
          );
        case 'tel':
          return (
            isNaN(val) && (
              <FormHelperText error>{invalidTelErrorMessage}</FormHelperText>
            )
          );
        default:
      }
    }
  }

  switch (type) {
    case 'money':
      return (
        <Box sx={{ width: '300px' }}>
          <TextField
            required={required} id={name} margin="normal"
            variant="outlined" size="medium" fullWidth
            defaultValue={value} label={label}
            InputProps={{
              startAdornment: <InputAdornment position="start">{moneySign ? moneySign : '$'}</InputAdornment>,
            }}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, [name]: e.target.value }));
            }}
          />
        </Box>
      );

    case 'dimension':
      return (
        <Box >
          <Input
            required={required}
            id={name}
            defaultValue={value}
            label={label}
            endAdornment={<InputAdornment position="end">{dimensionSign ? dimensionSign : 'm'}</InputAdornment>}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, [name]: e.target.value }));
            }}
          />
          <FormHelperText id={name}>{label}</FormHelperText>
        </Box>
      );

    default:
      return (
        <Box sx={{ width: '300px' }}>
          <TextField
            required={required}
            id={name}
            margin="normal"
            variant="outlined"
            size="medium"
            fullWidth
            defaultValue={value}
            label={label}
            multiline={multiline}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, [name]: e.target.value }));
              isError(e.target.value);
            }}
          />
          {generateHelperText(value)}
        </Box>
      );
  }
}

export default StandardInput;
