import React, { useState } from 'react';
import {
  Typography,
  Container,
} from '@mui/material';

import { } from '../../api';

function EngineerList() {

  /*
  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);*/

  return (
    <Container maxWidth="sm">
      <Typography
        component="h4"
        variant="h4"
        align="center"
        color="#222222"
        style={{ fontWeight: 600 }}>
        ENGINEERS
      </Typography>
      {/* ENGINEERS LIST */}

    </Container>
  );
}

export default EngineerList;