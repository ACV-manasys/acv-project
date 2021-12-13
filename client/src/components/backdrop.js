// LOADING UPON PAGES RENDERING
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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

export function Loading({ open }) {
  return (
    <div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="darkin" />
      </Backdrop>
    </div>
  );
}