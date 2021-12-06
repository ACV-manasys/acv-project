import React, { useState, useEffect } from 'react';
import {
  Toolbar,
  Drawer,
  Typography,
  Popover,
  Button,
  AppBar,
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

function Navbar({ active, buttons }) {

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
    },
    {
      text: 'Storage',
      content: '🍀 SPARE PART STORAGE 🍀',
    },
    {
      text: 'Contracts',
      content: '🍀 MANAGE CONTRACTS 🍀',
    },
    {
      text: 'Access',
      content: '🍀 MANAGE ACCESS 🍀',
    },
    {
      text: 'Settings',
      content: '🍀 SETTINGS 🍀',
    },
  ];

  const goToLogOut = () => {
    window.location.href = '/log-out';
  }

  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color="darkin">
        <Toolbar >
          <Grid container justifyContent="flex-end">
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
        </Toolbar>
      </AppBar>
      {titles.map((title) => (
        active === title.text ? (
          <Box
            sx={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
              height: '10vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingLeft: '120px',
            }}
          >
            <Container maxWidth="sm" sx={{ mt: '27px' }}>
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
    </div>
  );
}

export default Navbar;
