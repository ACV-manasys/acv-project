import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,

} from '@mui/material';

//import StandardTable from '../../components/StandardTable';
import CustomTabs from '../../components/CustomTabs';
import storageRoutes from './components/routes';
import StandardTable from '../../components/StandardTable';
import New from './components/newItem';

import { } from '../../api';

//TABLE HEADS =====
const headerCells = [
  { id: 'partNo', label: 'Part No', required: true, type: 'text' },
  { id: 'commodity', label: 'Commodity', required: true, type: 'text' },
  { id: 'specification', label: 'Specification', required: true, type: 'text' },
  { id: 'vieName', label: 'Vietnamese', required: false, type: 'text' },
  { id: 'price', label: 'price ($)', required: false, type: 'money', moneySign: '$' },
];

function Sparepart() {
  const [sparts, setSparts] = useState([]);

  /*
  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);*/

  return (
    <Box >
      <CustomTabs active='Storage' tab="spart" title='SPARE PARTS' routes={storageRoutes} />
      {/* SITE CONTENT */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '110px',
          paddingRight: '10px',
          mt: '20px',
        }}
      >

      </Box>
    </Box>
  );
}

export default Sparepart;