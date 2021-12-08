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


// SPARE PART PAGE AS DEFAULT
function Storage() {

  const [tab, setTab] = useState('default');

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
            <Tab label={<InventoryIcon />} value="default" />
            <Tab label={<HandymanIcon />} value="spart" />
            <Tab label={<LayersIcon />} value="conveyor" />
          </Tabs>
          <TabPanel value="default">
            {/* DEFAULT SPART LIST */}
            <Inventory />
          </TabPanel>

          <TabPanel value="spart">
            <Sparepart />
          </TabPanel>
          <TabPanel value="conveyor">
            <Conveyor />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Storage;
