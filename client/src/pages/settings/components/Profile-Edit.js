import React, { useState, useEffect } from 'react'
import { Box, Stack, Button } from '@mui/material';

import StandardInput from '../../../components/StandardInput';

import { me } from '../../../api'

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
  const [user, setUser] = useState()

  useEffect(() => {
    me().then(res => {
      setUser({
        name: res.name,
        email: res.email,
      })
    })
  }, [])

  /*
  function saveChanges() {
      console.log(user)
      delete user.email
      updateUserDetail(user).then(res => {
          console.log(res)
          setUser({
          name: res.name,
        email: res.email,
          })
      }
      )
  }*/

  return (
    user !== undefined &&
    <Box sx={{ display: 'flex', width: { xs: '100vw', md: 'auto' }, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <StandardInput sx={input} label="Name" value={user.name} />
      <StandardInput sx={input} label="Email" value={user.email} disable={true} />
      <Stack direction='row' spacing={2} sx={{ mt: '20px' }}>
        <Button sx={{ width: '150px', height: '40px', background: 'gray' }} variant="contained" onClick={e => setCurrent()}>
          Cancel
        </Button>
        <Button sx={{ width: '150px', height: '40px' }} variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
}

export default ProfileEdit;
