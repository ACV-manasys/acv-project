import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Stack, ButtonBase, Typography,
} from '@mui/material';

import Navbar from './Navbar';

const activeDesktopButtonStyle = {
  display: 'flex',
  width: '50px',
  height: '50px',
  justifyContent: 'center',
  background: '#3B7E7E',
  color: 'white',
  borderRadius: '20px',
};

function CustomTabs({ tab, title, routes, tabWidth, active, titleCol }) {

  return (
    <Box >
      <Navbar active={active} />
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
            minWidth: tabWidth ? (tabWidth) : '240px', //3 tabs
            minHeight: '70px',
            borderRadius: '25px',
            backgroundColor: '#ECECEC',
            mb: '10px'
          }}
        >
          {routes.map((route) => (
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
          color={titleCol ? titleCol : "#222222"}
          style={{ fontWeight: 600, fontSize: '30px' }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

export default CustomTabs;
