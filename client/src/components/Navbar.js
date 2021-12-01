import React, { useState } from 'react';
import {
  Toolbar,
  Drawer,
  Typography,
  Popover,
  Button,
  AppBar,
  Box,
} from '@mui/material';

import StandardDrawer from './StandardDrawer';
import AccountsDialog from './accounts';
import useStyles from '../pages/frontpage/styles';

import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 125;

function Navbar({ active, buttons }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const goToLogOut = () => {
    window.location.href = '/log-out';
  }

  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color="darkin">
        <Toolbar >
          <Box display="flex" flexGrow={1} sx={{ ml: '125px' }}>
            <Button
              color="greyBorder"
              className={classes.toolbarButton}
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              <GroupIcon />
            </Button>
            <AccountsDialog open={open} setOpen={setOpen} />
          </Box>
          <Button
            color="greyBorder"
            className={classes.toolbarButton}
            variant="outlined"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            endIcon={<LogoutIcon />}
          >
            log out
          </Button>
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
            <Button variant='contained' onClick={goToLogOut} sx={{ ml: '15px', mb: '10px' }}>
              Yes
            </Button>
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
