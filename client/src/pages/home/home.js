// HOMEPAGE
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';

import Navbar from '../../components/Navbar';

import { me } from '../../api';


function Home() {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    me().then((res) => {
      setUserData(res);
    });
  }, []);


  return (
    <Box >
      <Navbar active="Home" />
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