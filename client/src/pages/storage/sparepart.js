import React, { } from 'react';
import {
  Box,
} from '@mui/material';

//import StandardTable from '../../components/StandardTable';
import CustomTabs from './components/CustomTabs';
//import useStyles from './components/styles';

//import AddBoxIcon from '@mui/icons-material/AddBox';


import { } from '../../api';

function Sparepart() {

  /*
  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);*/

  return (
    <Box >
      <CustomTabs tab="spart" />
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