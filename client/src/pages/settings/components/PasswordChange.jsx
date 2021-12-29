import React, { useEffect, useState } from 'react';

import { Box, Button, Alert, TextField } from '@mui/material';

import { updateUserPassword } from '../../../api';

function PasswordChange({ setCurrent }) {
  const [content, setContent] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
  const [disableSumbit, setDisableSubmit] = useState(true);
  const [alert, setAlert] = useState('');
  const [showpass, setShowpass] = useState({
    text: 'show password',
    shown: false,
  });

  function changePassword() {
    updateUserPassword(content).then((res) => {
      setAlert(
        <Alert severity='success'>
          Password changed successfully!
        </Alert>
      )
    })
      .catch((err) => {
        setAlert(
          <Alert severity='error'>
            {err}
          </Alert>
        );
      });
  };

  const passwordBox = (name, label) => {
    return (
      <TextField
        id={name}
        margin="normal"
        variant="outlined"
        type={showpass.shown ? 'text' : 'password'}
        size="medium"
        fullWidth
        label={label}
        onChange={(e) => setContent((prev) => ({ ...prev, [name]: e.target.value }))}
      />
    );
  }

  useEffect(() => {
    if (content.confirmNewPassword !== '' && content.confirmNewPassword !== content.newPassword) {
      setAlert(<Alert severity="error">New password do not match</Alert>);
    } else {
      setAlert();
    }

    if (content.oldPassword && content.newPassword && content.confirmNewPassword) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [content]);

  const handleClickShowPassword = () => {
    if (showpass.shown) {
      setShowpass({
        text: 'show password',
        shown: false,
      });
    }
    else {
      setShowpass({
        text: 'hide password',
        shown: true,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', width: { xs: '100vw', md: 'auto' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
      {alert}
      <Box sx={{ display: 'flex', width: '100%', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: { xs: 'center', md: 'initial' } }}>
        <Box sx={{ mr: { md: '20px' } }}>
          {passwordBox("oldPassword", "Old password")}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
          {passwordBox("newPassword", "New password")}
          {passwordBox("confirmNewPassword", "Confirm password")}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: { xs: 'center', md: 'end' } }}>
        <Button
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}>
          {showpass.text}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: { xs: 'center', md: 'end' }, mt: '20px' }}>
        <Button sx={{ width: '150px', height: '40px', background: 'gray', mr: '10px' }} variant="contained" onClick={e => setCurrent()}>
          Cancel
        </Button>
        <Button sx={{ width: '150px', height: '40px', }} variant="contained" disabled={disableSumbit} onClick={changePassword}>
          Confirm
        </Button>
      </Box>
    </Box>
  )
}

export default PasswordChange