import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Drawer,
  Typography,
  Popover,
  Button,
  Grid,
  Box,
  Container,
} from '@mui/material';

import StandardDrawer from './StandardDrawer';
import useStyles from '../pages/frontpage/styles';
import { me } from '../api';

import LogoutIcon from '@mui/icons-material/Logout';
import heroImage from '../pages/frontpage/bg.jpg';

const drawerWidth = 125;

function Navbar({ active }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    me().then((res) => {
      setUserData(res);
    });
  }, []);

  const titles = [
    {
      text: 'Home',
      content: '🍀 WELCOME BACK, ' + userData.name + ' 🍀',
      helmetTitle: 'myACV | Home',
    },
    {
      text: 'Storage',
      content: '🍀 MANAGE STORAGE 🍀',
      helmetTitle: 'myACV | Storage',
    },
    {
      text: 'Contracts',
      content: '🍀 MANAGE DEBTS 🍀',
      helmetTitle: 'myACV | Depts',
    },
    {
      text: 'Note',
      content: '🍀 NOTES 🍀',
      helmetTitle: 'myACV | Notes',
    },
    {
      text: 'Access',
      content: '🍀 MANAGE ACCESS 🍀',
      helmetTitle: 'myACV | Access',
    },
    {
      text: 'Settings',
      content: '🍀 SETTINGS 🍀',
      helmetTitle: 'myACV | Settings',
    },
  ];

  const goToLogOut = () => {
    window.location.href = '/log-out';
  }

  const helmetContext = {};

  const classes = useStyles();

  return (
    <div>
      <HelmetProvider context={helmetContext}>
        {titles.map((title) => (
          active === title.text ? (
            <Box key={active}
              sx={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
                height: '14vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingLeft: '120px',
              }}
            >
              <Helmet>
                <title>{title.helmetTitle}</title>
              </Helmet>
              <Grid container justifyContent="flex-end" sx={{ mt: '20px', mr: '50px' }}>
                <Button
                  color="greyBorder"
                  className={classes.toolbarButton}
                  variant="outlined"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  endIcon={<LogoutIcon />}
                >
                  log out
                </Button>
              </Grid>
              <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                onClose={() => setAnchorEl(null)}
              >
                <Typography sx={{ p: 2 }}>Do you want to log-out?</Typography>
                <Grid container justifyContent="flex-end">
                  <Button variant='contained' onClick={goToLogOut} sx={{ mr: '15px', mb: '10px' }}>
                    Yes
                  </Button>
                </Grid>
              </Popover>
              <Container maxWidth="sm" sx={{ mt: '14px' }}>
                <Typography
                  component="h5"
                  variant="h4"
                  align="center"
                  color="#ECEFF1"
                  style={{ fontWeight: 600 }}>
                  {title.content}
                </Typography>
              </Container>
            </Box>)
            : (null)
        ))}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <StandardDrawer
            active={active}
          />
        </Drawer>
      </HelmetProvider>
    </div>
  );
}

export default Navbar;
