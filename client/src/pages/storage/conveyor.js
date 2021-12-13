import React, { } from 'react';
import {
  Box,
} from '@mui/material';

//import StandardTable from '../../components/StandardTable';
import CustomTabs from './components/CustomTabs';
//import useStyles from './components/styles';

import { } from '../../api';

function Conveyor() {
  /*
  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);*/

  return (
    <Box >
      <CustomTabs tab="conveyor" />
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

export default Conveyor;