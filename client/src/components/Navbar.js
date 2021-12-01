import React, { useState } from 'react';
import {
  Toolbar,
  Drawer,
  Divider,
  List,
  Button,
} from '@mui/material';

import StandardDrawer from './StandardDrawer';

const drawerWidth = 125;

function Navbar({ active, buttons }) {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
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
          open={open}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Drawer>
      {/* 
        <StandardDrawer
        active={active}
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
      */}
    </div>
  );
}

export default Navbar;
