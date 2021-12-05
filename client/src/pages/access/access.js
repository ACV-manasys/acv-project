import React, { useState, useEffect } from 'react';

import {
  Box,
  Tab, Tabs,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import Navbar from '../../components/Navbar';
import AccountsDisplay from '../../components/accounts';
import HistoryLog from '../../components/history';
import EngineeringIcon from '@mui/icons-material/Engineering';

import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';

function Access() {

  const [tab, setTab] = useState('history');

  return (
    <Box >
      <Navbar active="Access" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '120px',
          paddingRight: '20px',
          mt: '20px',
        }}
      >
        <TabContext value={tab}>
          <Tabs
            //orientation="vertical"
            sx={{
              minHeight: '50px',
              background: '#BEBEBE',
              borderRadius: '5px',
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
            <Tab label={<HistoryIcon />} value="history" />
            <Tab label={<GroupIcon />} value="accounts" />
            <Tab label={<EngineeringIcon />} value="engr" />
          </Tabs>
          <TabPanel value="history">
            {/* HISTORY LOG */}
            <HistoryLog />
          </TabPanel>
          <TabPanel value="accounts">
            {/* ACCOUNT MANAGE */}
            <AccountsDisplay />
          </TabPanel>
          <TabPanel value="engr">
            {/* ENGINEERS */}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Access;
