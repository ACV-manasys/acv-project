import React, { useState, useEffect } from 'react';
import {
  Box,
} from '@mui/material';

import Navbar from '../../components/Navbar';

function Settings() {

  return (
    <Box >
      <Navbar active="Settings" />
    </Box>
  );
}

export default Settings;
