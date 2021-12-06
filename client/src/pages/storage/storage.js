import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import Navbar from '../../components/Navbar';

import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import InventoryIcon from '@mui/icons-material/Inventory';

import Inventory from './inventory/inventory';
import Conveyor from './conveyor';
import Sparepart from './sparepart';


function Storage() {

  const [tab, setTab] = useState('spart');

  return (
    <Box >
      <Navbar active="Storage" />
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
        <TabContext value={tab}>
          <Tabs
            //orientation="vertical"
            sx={{
              minHeight: '50px',
              background: '#ECECEC',
              borderRadius: '10px',
            }}
            TabIndicatorProps={{
              style: {
                margin: '10px 0px',
                borderRadius: '10px',
                background: '#3B7E7E',
                boxShadow: '6px 6px 10px rgba(223, 120, 97, 0.25)',
                zIndex: 0,
              },
            }}
            value={tab}
            onChange={(e, newVal) => setTab(newVal)}
          >
            <Tab label={<HandymanIcon />} value="spart" />
            <Tab label={<LayersIcon />} value="conveyor" />
            <Tab label={<InventoryIcon />} value="default" />
          </Tabs>
          <TabPanel value="spart">
            {/* SPART CURRENTLY IN STORAGE */}
            <Sparepart />
          </TabPanel>
          <TabPanel value="conveyor">
            {/* CONVEYOR BELT CURRENTLY IN STORAGE */}
            <Conveyor />
          </TabPanel>
          <TabPanel value="default">
            {/* DEFAULT SPART LIST */}
            <Inventory />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Storage;
