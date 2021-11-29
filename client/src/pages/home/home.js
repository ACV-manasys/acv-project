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
          paddingLeft: '20vw',
          paddingRight: '20vw',
          mt: '8px',
        }}
      >
        {/* Hero Unit */}

        {/*<img src={logo} alt="Logo" width="120px" style={{ padding: 10 }} />*/}

        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="black"
            gutterBottom
            style={{ fontWeight: 600 }}
          >
            Welcome Back {userData.username}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;