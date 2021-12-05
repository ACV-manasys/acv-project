import React, { useState } from 'react';
import {
  Toolbar,
  Drawer,
  Typography,
  Popover,
  Button,
  AppBar,
  Grid,
} from '@mui/material';

import StandardDrawer from './StandardDrawer';
import useStyles from '../pages/frontpage/styles';

import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 125;

function Navbar({ active, buttons }) {

  const [anchorEl, setAnchorEl] = useState(null);

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
