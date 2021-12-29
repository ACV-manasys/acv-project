import React, { useState, useEffect } from 'react';
import {
  Box,
  List, ListItem, ListItemIcon, ListItemText,
  Typography,
} from '@mui/material';

import Navbar from '../../components/Navbar';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PasswordIcon from '@mui/icons-material/Password';
import ProfileEdit from './components/Profile-Edit';
import PasswordChange from './components/PasswordChange';

const titleStyle = {
  fontWeight: 600,
  fontSize: '28px',
  color: '#333333'
};

function Settings() {

  const [current, setCurrent] = useState();

  const list = [
    { label: 'Edit Profile', icon: <AccountBoxIcon />, fragment: <ProfileEdit setCurrent={setCurrent} /> },
    { label: 'Change Password', icon: <PasswordIcon />, fragment: <PasswordChange setCurrent={setCurrent} /> },
  ]

  useEffect(() => {

  }, [current])

  return (
    <Box >
      <Navbar active="Settings" />
      {/* SETTING TABS */}
      <Box
        sx={{
          mt: '20px',
          display: 'flex',
          flexDirection: 'row',
          height: { md: '60vh' },
          paddingLeft: '100px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <List sx={{ zIndex: { xs: 0, md: 0 }, position: { xs: 'absolute', md: 'static' }, width: { xs: '100vw', md: 'auto' }, mx: { md: '20px' }, }}>
          {
            list.map((element) => (
              current !== undefined && current.label === element.label ?
                <ListItem key={element.label} sx={{ background: '#3B7E7E', color: 'white', fontWeight: 500, borderRadius: '10px', boxShadow: '4px 4px 8px rgba(59, 126, 126, 0.3)' }} onClick={e => setCurrent(element)}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    {element.icon}
                  </ListItemIcon>
                  <ListItemText>
                    {element.label}
                  </ListItemText>
                </ListItem>
                :
                <ListItem key={element.label} sx={{ fontWeight: 500, }} onClick={e => setCurrent(element)}>
                  <ListItemIcon>
                    {element.icon}
                  </ListItemIcon>
                  <ListItemText>
                    {element.label}
                  </ListItemText>
                </ListItem>
            ))
          }
        </List>
        <Box sx={{ display: 'flex', zIndex: { xs: 1, md: 0 }, position: { xs: 'relative', md: 'static' }, background: 'white', borderRadius: { sm: '20px' }, width: { md: '700px' }, height: { md: '60vh' }, justifyContent: 'center', alignItems: 'center', boxShadow: { xs: 'none', sm: '0px 4px 4px rgba(0, 0, 0, 0.25)' }, }}>
          {
            current !== undefined ?
              (<Box sx={{ flexDirection: 'column', justifyContent: 'center', mb: '20px' }}>
                <Typography sx={titleStyle} textAlign='center'>
                  {current.label}
                </Typography>
                {current.fragment}
              </Box>
              )
              :
              <Typography sx={{ fontWeight: 500, display: { xs: 'none', md: 'initial' } }}>
                Please select one of the options on the left
              </Typography>
          }
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
