import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
} from '@mui/material';


import { } from '../../api';

function Conveyor() {

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
        CONVEYOR BELTS
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

export default Conveyor;