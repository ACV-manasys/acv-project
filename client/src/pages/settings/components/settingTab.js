import React, { useState, useEffect } from 'react'
import { Box, Stack, Button } from '@mui/material';

//import { getMySettings } from '../../../api'

function SettingTab({ setCurrent }) {
  const [settings, setSettings] = useState();

  /*
  useEffect(() => {
    getMySettings().then((data) => {
      setSettings(data)
    })
  }, []);
  */

  return (
    <Box sx={{ display: 'flex', width: { xs: '100vw', md: 'auto' }, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Stack direction='row' spacing={2} sx={{ mt: '20px' }}>
        <Button sx={{ width: '150px', height: '40px', background: 'gray' }} variant="contained" onClick={e => setCurrent()}>
          Reset
        </Button>
        <Button sx={{ width: '150px', height: '40px' }} variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
}

export default SettingTab;
