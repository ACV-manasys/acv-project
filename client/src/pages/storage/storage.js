import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Button,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import AddBoxIcon from '@mui/icons-material/AddBox';

import StandardTable from '../../components/StandardTable';
import New from './components/new';
import CustomTabs from '../../components/CustomTabs';
import storageRoutes from './components/routes';

import {
  getallSpart, deleteSpart, updateSpart,
  getallConveyor, deleteConveyor, updateConveyor,
} from '../../api';

//TABLE HEADS =====
const spartHeadCells = [
  { id: 'partNo', label: 'Part No', },
  { id: 'commodity', label: 'Commodity', },
  { id: 'specification', label: 'Specification', },
  { id: 'vieName', label: 'Vietnamese', },
  { id: 'price', label: 'price ($)', },
];

const convHeadCells = [
  { id: 'machineName', label: 'Machine Name', },
  { id: 'width', label: 'Width', },
  { id: 'height', label: 'Height', },
  { id: 'costIn', label: 'Imported Cost (Đ)', },
  { id: 'priceOut', label: 'Exported Price (Đ)', },
  { id: 'note', label: 'Note', },
];

// STYLING =====
const tabStyle = {
  minWidth: '50px',
  maxWidth: '50px',
  height: '50px',
  margin: '10px 10px',
  '&.Mui-selected': {
    color: 'white',
    zIndex: 1,
  },
};

const childTitleStyle = {
  color: "#555555",
  fontWeight: 600,
  fontSize: '25px',
};

// SPARE PART PAGE AS DEFAULT
function Storage() {
  const [sparts, setSparts] = useState([]);
  const [convs, setConvs] = useState([]);
  const [tab, setTab] = useState('spart');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    getallSpart().then((spartData) => {
      setSparts(spartData);
    });
    getallConveyor().then((convData) => {
      setConvs(convData);
    });
  }, []);

  return (
    <Box >
      <CustomTabs active='Storage' tab="default" title='INVENTORY' routes={storageRoutes} />
      {/* SITE CONTENT */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '110px',
          paddingRight: '10px',
        }}
      >
        <Grid container justifyContent="center" sx={{ mt: '10px', mb: '15px' }}>
          <Button variant="contained" endIcon={<AddBoxIcon />} onClick={() => setOpenAddDialog(true)}>
            add
          </Button>
          <New open={openAddDialog} setOpen={setOpenAddDialog} />
        </Grid>
        <TabContext value={tab}>
          <Tabs
            //orientation="vertical"
            sx={{
              minHeight: '50px',
              background: '#ECECEC',
              borderRadius: '30px',
            }}
            TabIndicatorProps={{
              style: {
                width: '50px',
                height: '50px',
                margin: '10px 0px',
                borderRadius: '30px',
                background: '#3B7E7E',
                zIndex: 0,
              },
            }}
            value={tab}
            onChange={(e, newVal) => setTab(newVal)}
          >
            <Tab sx={tabStyle} icon={<HandymanIcon />} value="spart" />
            <Tab sx={tabStyle} icon={<LayersIcon />} value="conveyor" />
          </Tabs>
          <TabPanel value="spart">
            {/* SPART CURRENTLY IN STORAGE */}
            <Typography sx={childTitleStyle} align='center'> SPARE PARTS </Typography>
            <StandardTable headCells={spartHeadCells} data={sparts} deleteFunction={deleteSpart} updateFunction={updateSpart} type='spart' />
          </TabPanel>
          <TabPanel value="conveyor">
            {/* CONVEYOR BELT CURRENTLY IN STORAGE */}
            <Typography sx={childTitleStyle} align='center'> CONVEYOR BELTS </Typography>
            <StandardTable headCells={convHeadCells} data={convs} deleteFunction={deleteConveyor} updateFunction={updateConveyor} type='conv' />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Storage;
