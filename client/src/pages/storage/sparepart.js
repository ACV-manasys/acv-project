import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
} from '@mui/material';


import { } from '../../api';

function Sparepart() {

  /*
  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);*/

  return (
    <Container maxWidth="sm">
      <Typography
        align="center"
        color="#222222"
        style={{ fontWeight: 600, fontSize: '30px' }}>
        SPARE PARTS
      </Typography>

      {/* INVENTORY CONTENT */}
      <Box
        noValidate
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 'auto',
          width: 'fit-content',
        }}
      >

      </Box>
    </Container>
  );
}

export default Sparepart;