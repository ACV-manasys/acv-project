import React, { } from 'react';
import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';

import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import InventoryIcon from '@mui/icons-material/Inventory';

import useStyles from './styles';
import Navbar from '../../../components/Navbar';

function CustomTabs({ tab }) {

  const classes = useStyles();

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
                width: '50px',
                height: '50px',
                margin: '10px 0px',
                borderRadius: '10px',
                background: '#3B7E7E',
                zIndex: 0,
              },
            }}
            value={tab}
          >
            <Tab className={classes.tabStyle} icon={<InventoryIcon />} value="default" href="/storage" />
            <Tab className={classes.tabStyle} icon={<HandymanIcon />} value="spart" href="/storage/spart" />
            <Tab className={classes.tabStyle} icon={<LayersIcon />} value="conveyor" href="/storage/conveyor" />
          </Tabs>
        </TabContext>
      </Box>
    </Box>
  );
}

export default CustomTabs;
