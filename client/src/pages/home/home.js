// HOMEPAGE
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';

import Navbar from '../../components/Navbar';
import AccountsDialog from '../../components/accounts';
import useStyles from '../frontpage/styles';

import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

import { me } from '../../api';


function Home() {

  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    me().then((res) => {
      setUserData(res);
    });
  }, []);

  const goToLogOut = () => {

  }

  const classes = useStyles();

  return (
    <Box >
      <Navbar active="Home" />
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
            onClick={goToLogOut}
            endIcon={<LogoutIcon />}
          >
            log out
          </Button>
        </Toolbar>
      </AppBar>
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
        {/* Hero Unit */}

        {/*<img src={logo} alt="Logo" width="120px" style={{ padding: 10 }} />*/}

        <Container maxWidth="sm">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="#222222"
            style={{ fontWeight: 600 }}
          >
            Welcome back
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="#3B7E7E"
            style={{ fontWeight: 600 }}
          >
            🍀 {userData.name} 🍀
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;