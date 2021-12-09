import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button
} from '@mui/material';

//import StandardTable from '../../components/StandardTable';
import New from './components/new';
import CustomTabs from './components/CustomTabs';
//import useStyles from './components/styles';

import AddBoxIcon from '@mui/icons-material/AddBox';


import { } from '../../api';

function Sparepart() {

  const [openAddDialog, setOpenAddDialog] = useState(false);
  /*
  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);*/

  return (
    <Box >
      <CustomTabs tab="spart" />
      {/* CONTENT */}
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
        <Container maxWidth="sm">
          <Typography
            align="center"
            color="#222222"
            style={{ fontWeight: 600, fontSize: '30px' }}>
            SPARE PART
          </Typography>
          <Grid container justifyContent="center" sx={{ mt: '10px' }}>
            <Button variant="contained" endIcon={<AddBoxIcon />} onClick={() => setOpenAddDialog(true)}>
              add
            </Button>
            <New open={openAddDialog} setOpen={setOpenAddDialog} />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Sparepart;