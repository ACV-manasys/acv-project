import { Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: ' #E0F2F1',
  },
}));

function Logout() {

  const classes = useStyles();

  useEffect(() => {
    localStorage.removeItem('token-myapp');
    window.location.href = '/';
  }, []);

  return (
    <div className={classes.root}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 20,
        }}
        maxWidth="xs"
      >
        <Typography
          align="center"
          color="#3B7E7E"
          style={{ fontWeight: 600, fontSize: '30px' }}
        >Logging out...</Typography>
      </Container>
    </div>
  );
}

export default Logout;
