import React, { useState, useEffect } from 'react';
import {
  Box, Tabs, Tab, Typography,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';

import StandardTable from '../../components/StandardTable';
import New from './components/newItem';
import CustomTabs from '../../components/CustomTabs';
import storageRoutes from './components/routes';

import {
  getallSpart, deleteSpart, updateSpart, createSpart,
  getallConveyor, deleteConveyor, updateConveyor, createConveyor,
} from '../../api';

//TABLE HEADS =====
const spartHeadCells = [
  { id: 'partNo', label: 'Part No', required: false, type: 'text' },
  { id: 'commodity', label: 'Commodity', required: false, type: 'text' },
  { id: 'specification', label: 'Specification', required: false, type: 'text' },
  { id: 'vieName', label: 'Vietnamese', required: true, type: 'text' },
  { id: 'price', label: 'price ($)', required: false, type: 'money', moneySign: '$' },
  { id: 'quantity', label: 'Quantity', required: false, type: 'number' },
];

const convHeadCells = [
  { id: 'machineName', label: 'Machine Name', required: true, type: 'text' },
  { id: 'width', label: 'Width', required: true, type: 'dimension' },
  { id: 'height', label: 'Height', required: true, type: 'dimension' },
  { id: 'costIn', label: 'Imported Cost (Đ)', required: false, type: 'money', moneySign: 'VNĐ' },
  { id: 'priceOut', label: 'Exported Price (Đ)', required: false, type: 'money', moneySign: 'VNĐ' },
  { id: 'quantity', label: 'Quantity', required: true, type: 'number' },
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
function Inventory() {
  const [sparts, setSparts] = useState([]);
  const [convs, setConvs] = useState([]);
  const [tab, setTab] = useState('spart');

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
            <New tableHeaders={spartHeadCells} createFunc={createSpart}
              itemType='spart' storageType='inventory' />
            <StandardTable headCells={spartHeadCells} data={sparts} deleteFunction={deleteSpart} updateFunction={updateSpart} type='spart' storageType='inventory' />
          </TabPanel>
          <TabPanel value="conveyor">
            {/* CONVEYOR BELT CURRENTLY IN STORAGE */}
            <Typography sx={childTitleStyle} align='center'> CONVEYOR BELTS </Typography>
            <New tableHeaders={convHeadCells} createFunc={createConveyor}
              itemType='conveyor' storageType='inventory' />
            <StandardTable headCells={convHeadCells} data={convs} deleteFunction={deleteConveyor} updateFunction={updateConveyor} type='conveyor' storageType='inventory' />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Inventory;
