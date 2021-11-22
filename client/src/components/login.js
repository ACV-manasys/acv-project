import React, { useState } from 'react';

import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  Button,
  Link,
  Stack,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import StandardInput from './StandardInput';

function Login({ tab }) {
  // FOR LOGIN TAB ********************************
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showpass, setShowpass] = useState({
    text: 'show password',
    shown: false,
  });
  const [alert, setAlert] = useState();

  // FOR REGISTER TAB *****************************
  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
    repassword: '',
    email: '',
  });

  const wrapperBoxStyle = {
    display: 'flex',
    width: '300px',
    flexDirection: 'column',
    alignItems: 'center',
    mt: '15px'
  };

  const handleClickShowPassword = () => {
    if (showpass.shown) {
      setShowpass({
        text: 'show password',
        shown: false,
      });
    }
    else {
      setShowpass({
        text: 'hide password',
        shown: true,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitLogin = (e) => {
    /*login(username, password).then(null, (reason) => {
      if (reason === 'Unauthorized') {
        setAlert(
          <Alert severity="error">Incorrect username or password</Alert>
        );
      } else {
        setAlert(
          <Alert severity="error">
            Authentication failed. Please retry again
          </Alert>
        );
      }
    });*/
  };

  const submitRegister = (e) => {

  };

  switch (tab) {
    case 'Sign in':
      return (
        <Box sx={wrapperBoxStyle}>
          <Box
            sx={{
              width: '300px',
              justifyContent: 'center',
              mt: '10px',
              mb: '20px',
            }}
          >
            <Typography sx={{ fontSize: '24px', fontWeight: 700 }} color="primary" align="center">
              Sign In
            </Typography>
          </Box>
          <Box >{alert}</Box>
          <TextField
            id="input_username"
            margin="normal"
            variant="outlined"
            size="medium"
            fullWidth
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="input_password"
            margin="normal"
            variant="outlined"
            type={showpass.shown ? 'text' : 'password'}
            size="medium"
            fullWidth
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}>
            {showpass.text}
          </Button>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              mb: 2,
              mt: 2,
            }}
          >
            <Link href="/forgot-password" underline="none">
              Forgot password?
            </Link>
          </Box>
          <Button
            id="submit_button"
            margin="normal"
            variant="contained"
            color="primary"
            fullWidth
            onClick={submitLogin}
          >
            Login
          </Button>
        </Box>
      );

    default:
      return (
        <Box sx={wrapperBoxStyle}>
          <Box
            sx={{
              width: '300px',
              justifyContent: 'center',
              mt: '10px',
              mb: '20px',
            }}
          >
            <Typography sx={{ fontSize: '24px', fontWeight: 700 }} color="primary" align="center">
              Register
            </Typography>
          </Box>
          <StandardInput
            id="name" label="Name" name="name" value={user.name}
            setValue={setUser} required={true}
          />
          <StandardInput
            id="username" label="Username" name="username" value={user.username}
            setValue={setUser} required={true}
          />
          <StandardInput
            id="password" label="Password" name="password" value={user.password}
            setValue={setUser} required={true}
          />
          <StandardInput
            id="repassword" label="Re-enter Password" name="repassword" value={user.repassword}
            setValue={setUser} required={true}
          />
          <StandardInput
            id="email" label="Email Address" name="email" value={user.repassword}
            setValue={setUser} required={true}
          />
          <Button
            sx={{ mt: '15px' }}
            id="submit"
            margin="normal"
            variant="contained"
            color="primary"
            fullWidth
            onClick={submitRegister}
          >
            Register
          </Button>
        </Box>
      );
  }
}

export default Login;
