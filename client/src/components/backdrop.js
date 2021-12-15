// LOADING UPON PAGES RENDERING
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

export function CustomBackdrop({ open }) {

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="darkin" />
      </Backdrop>
    </div>
  );
}

export function Loading({ paddingLeft }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: paddingLeft ? paddingLeft : '0px',
        mt: '20px',
      }}
    >
      <CircularProgress color="darkin" />
    </Box>
  );
}