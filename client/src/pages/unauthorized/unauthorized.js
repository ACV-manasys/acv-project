import {
  AppBar,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    background: ' #E0F2F1',
  },
  toolbar: {
    minHeight: 48,
    background: '#3B7E7E',
  },
}));

function Unauthorized() {
  const classes = useStyles();
  const goToLogin = () => (window.location.href = '/');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}>
            <Button
              href="https://ancoviet.com/"
              color="inherit"
              className={classes.toolbarButton}
              variant="outlined"
            >
              official website
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
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
        <Typography gutterBottom>
          Unauthorized Acess! Please login first!
        </Typography>
        <Button variant="contained" color="darkin" onClick={goToLogin} >
          Back to Front page to login
        </Button>
      </Container>
    </div>
  );
}

export default Unauthorized;
