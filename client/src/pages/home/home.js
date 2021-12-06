// HOMEPAGE
import React, { } from 'react';
import {
  Box,
} from '@mui/material';

import Navbar from '../../components/Navbar';


function Home() {


  return (
    <Box >
      <Navbar active="Home" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '120px',
          paddingRight: '20px',
          mt: '20px',
        }}
      >
      </Box>
    </Box>
  );
}

export default Home;