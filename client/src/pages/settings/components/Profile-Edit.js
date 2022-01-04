import React, { useState, useEffect } from 'react'
import { Box, Stack, Button, Alert } from '@mui/material';

import StandardInput from '../../../components/StandardInput';

import { me, updateUserData } from '../../../api'

const input = {
  width: '320px',
  height: '40px',
  borderRadius: '5px',
  '&.Mui-error': {
    background: '#FBB5B1',
    border: '1px solid #F9202B',
  },
  '& input:not(:placeholder-shown)': {
    height: '0px',
  },
};

function ProfileEdit({ setCurrent }) {
  const [user, setUser] = useState();
  const [alert, setAlert] = useState('');

  useEffect(() => {
    me().then(res => {
      setUser({
        name: res.name,
        email: res.email,
      })
    })
  }, [])


  function doUpdate() {
    console.log(user);
    updateUserData(user).then(res => {
      setAlert(
        <Alert severity='success'>
          Infor changed successfully!
        </Alert>
      )
    }).catch((err) => {
      setAlert(
        <Alert severity='error'>
          Fail to change the infor!
        </Alert>
      );
    });
  };

  return (
    user !== undefined &&
    <Box sx={{ display: 'flex', width: { xs: '100vw', md: 'auto' }, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {alert}
      <StandardInput sx={input} label="Name" value={user.name} setValue={setUser} name='name' />
      <StandardInput sx={input} label="Email" value={user.email} setValue={setUser} name='email' />
      <Stack direction='row' spacing={2} sx={{ mt: '20px' }}>
        <Button sx={{ width: '150px', height: '40px', background: 'gray', borderRadius: '20px' }} variant="contained" onClick={e => setCurrent()}>
          Cancel
        </Button>
        <Button sx={{ width: '150px', height: '40px', borderRadius: '20px' }} variant="contained" onClick={doUpdate}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}

export default ProfileEdit;
