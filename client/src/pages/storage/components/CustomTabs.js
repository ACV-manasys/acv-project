import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Stack, ButtonBase, Typography,
} from '@mui/material';

import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import InventoryIcon from '@mui/icons-material/Inventory';

import Navbar from '../../../components/Navbar';

const activeDesktopButtonStyle = {
  display: 'flex',
  width: '50px',
  height: '50px',
  justifyContent: 'center',
  background: '#3B7E7E',
  color: 'white',
  borderRadius: '20px',
};

const storageRoutes = [
  {
    text: 'default',
    path: '/storage',
    exact: true,
    icon: <InventoryIcon sx={{ fontSize: '30px' }} />,
  },
  {
    text: 'spart',
    path: '/storage/spart',
    icon: <HandymanIcon sx={{ fontSize: '30px' }} />,
  },
  {
    text: 'conveyor',
    path: '/storage/conveyor',
    icon: <LayersIcon sx={{ fontSize: '30px' }} />,
  },
];

function CustomTabs({ tab }) {

  const getTitle = () => {
    switch (tab) {
      case 'spart':
        return 'SPARE PARTS';
      case 'conveyor':
        return 'CONVEYOR BELTS';
      default:
        return 'INVENTORY';
    }
  };

  return (
    <Box >
      <Navbar active="Storage" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '120px',
          paddingRight: '10px',
          mt: '20px',
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{
            minWidth: '240px',
            minHeight: '70px',
            borderRadius: '20px',
            backgroundColor: '#ECECEC',
            mb: '10px'
          }}
        >
          {storageRoutes.map((route) => (
            <Link key={route.text} to={route.path}>
              {tab === route.text ? (
                <ButtonBase
                  key={route.text}
                  sx={activeDesktopButtonStyle}
                  disableTouchRipple
                >
                  {route.icon}
                </ButtonBase>
              ) : (
                <ButtonBase
                  key={route.text}
                  sx={{
                    display: 'flex',
                    width: '50px',
                    height: '50px',
                    justifyContent: 'center',
                    color: '#C4C4C4',
                  }}
                  disableTouchRipple
                >
                  {route.icon}
                </ButtonBase>
              )}
            </Link>
          ))}
        </Stack>
        <Typography
          align="center"
          color="#222222"
          style={{ fontWeight: 600, fontSize: '30px' }}>
          {getTitle()}
        </Typography>
      </Box>
    </Box>
  );
}

export default CustomTabs;
