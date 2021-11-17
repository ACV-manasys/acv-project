import React, { useRef } from 'react';
import logo from './drawnLogo.png';
import {
  Button,
  Typography,
  Box,
  Container,
  AppBar,
  Toolbar,
  Grid,
  Link,
  Stack,
} from '@mui/material';

import useStyles from './styles';

function Frontpage() {
  const goToLogin = () => (window.location.href = '/login');
  const goToRegister = () => (window.location.href = '/register');

  const contactRef = useRef(null);
  const classes = useStyles();

  // Method to style the company info
  function styleLine(title, content) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Stack spacing={1} direction="row">
          <Typography variant="button" align="center" sx={{ fontSize: '22px', fontWeight: 500, color: 'black' }}>
            {title}
          </Typography>
          <Typography variant="button" align="center" sx={{ fontSize: '20px', fontWeight: 450, color: 'black' }}>
            {content}
          </Typography>
        </Stack>
      </Box>
    )
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}>
            <Link href="https://ancoviet.com/" color="inherit">
              <Typography variant="h6">AN CÔ VIỆT</Typography>
            </Link>
          </Box>
          <Stack direction="row" spacing={3}>
            <Button
              color="inherit"
              className={classes.toolbarButton}
              variant="outlined"
              onClick={goToLogin}
            >
              ĐĂNG NHẬP
            </Button>
            <Button
              color="inherit"
              className={classes.toolbarButton}
              variant="outlined"
              onClick={goToLogin}
            >
              ĐĂNG KÝ
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero unit */}
      <Box className={classes.hero}>
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: '20px' }}>
            <img className={classes.logoHero} src={logo} alt="Logo" />
          </Box>
          <Stack>
            <Typography variant="button" align="center" sx={{ fontSize: '30px', fontWeight: 550 }}>HỆ THỐNG QUẢN LÝ DỮ LIỆU</Typography>
            <Typography variant="button" align="center" sx={{ fontSize: '40px', fontWeight: 600 }}>CÔNG TY TNHH ĐIỆN TỬ AN CÔ VIỆT</Typography>
          </Stack>
        </Container>
      </Box>
      {/* End Hero unit */}


      {/* About us section */}
      <Box sx={{ gap: 2, mr: "20px", ml: "20px", mt: "20px", mb: "20px" }}>
        <Typography
          variant="h4"
          align="center"
          color="#2C868F"
          gutterBottom
          sx={{ fontWeight: 'medium' }}
        >
          THÔNG TIN LIÊN HỆ
        </Typography>
        <Container>
          {styleLine("CÔNG TY TNHH ĐIỆN TỬ AN CÔ VIỆT - 0309366264", "")}
          {styleLine("Địa chỉ:", "Số 195/22, Đường Bình Thới, Phường 09, Quận 11, TPHCM")}
          {styleLine("VPĐD:", "Số 01, Đường Chánh Hưng, Ấp 04, Xã Phước Lộc, Huyện Nhà Bè, TPHCM")}
          {styleLine("Hotline:", "0989 920 022 - 0903 012 950")}
          {styleLine("Điện thoại:", "(028) 3636 6089 - (028) 3636 6189")}
          {styleLine("Website:", "www.ancoviet.com")}
          {styleLine("Email:", "ancoviet@gmail.com - kinhdoanh@gmail.com")}
        </Container>
      </Box>
      {/* End About us section */}

      <footer ref={contactRef}>
        <Box className={classes.footerSectionBox}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs align="left">
              <Typography variant="h7" color="inherit" sx={{ fontWeight: 'medium' }}>
                Made by Hai Ha, 2021
              </Typography>
            </Grid>
            <Grid item xs align="right">
              <Typography variant="h6" color="inherit">
                Contact
              </Typography>
              <Typography variant="h7" color="inherit">
                Email: haihaangn@gmail.com
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </footer>
    </div>
  );
}

export default Frontpage;
