import React, { useRef, useState } from 'react';
import logo from './drawnLogo.png';
import {
  Button,
  Typography,
  Box,
  Container,
  AppBar,
  Toolbar,
  Grid,
  Stack,
  Slide,
  Dialog,
  Tab, Tabs,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import useStyles from './styles';
import Login from '../../components/login';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Frontpage() {

  const contactRef = useRef(null);
  const classes = useStyles();

  // DIALOG ******
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = useState('Sign in');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const wrapperBoxStyle = {
    display: 'flex',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center',
    mt: '15px'
  };

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
            <Button
              href="https://ancoviet.com/"
              color="inherit"
              className={classes.toolbarButton}
              variant="outlined"
            >
              official website
            </Button>
          </Box>
          <Button
            color="inherit"
            className={classes.toolbarButton}
            variant="outlined"
            onClick={handleClickOpen}
          >
            sign in/ sign up
          </Button>
          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative', boxShadow: 'none' }} position="static" color="darkin">
              <Toolbar>
                <Button color="inherit"
                  className={classes.toolbarButton}
                  variant="outlined"
                  onClick={handleClose}>
                  close
                </Button>
              </Toolbar>
            </AppBar>
            <Box sx={wrapperBoxStyle}>
              <TabContext value={tab}>
                <Tabs
                  sx={{
                    minHeight: '50px',
                    background: '#ECECEC',
                    borderRadius: '10px',
                  }}
                  TabIndicatorProps={{
                    style: {
                      margin: '0px 0px',
                      borderRadius: '10px',
                      background: '#3B7E7E',
                      zIndex: 0,
                    },
                  }}
                  value={tab}
                  onChange={(e, newVal) => setTab(newVal)}
                >
                  <Tab label="SIGN IN" value="Sign in" />
                  <Tab label="SIGN UP" value="Sign up" />
                </Tabs>
                <TabPanel value="Sign in">
                  <Login tab={tab} />
                </TabPanel>
                <TabPanel value="Sign up">
                  <Login tab={tab} />
                </TabPanel>
              </TabContext>
            </Box>
          </Dialog>
        </Toolbar>
      </AppBar>

      {/* Hero unit */}
      <Box className={classes.hero}>
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img className={classes.logoHero} src={logo} alt="Logo" />
          </Box>
          <Stack>
            <Typography variant="button" align="center" sx={{ fontSize: '50px', fontWeight: 600 }}>ANCOVIET</Typography>
            <Typography variant="button" align="center" sx={{ fontSize: '35px', fontWeight: 530 }}>MANAGEMENT SYSTEM</Typography>
          </Stack>
        </Container>
      </Box>
      {/* End Hero unit */}


      {/* About us section */}
      <Box sx={{ gap: 2, mr: "20px", ml: "20px", mt: "20px", mb: "20px" }}>
        <Typography
          variant="h4"
          align="center"
          color="#3B7E7E"
          gutterBottom
          sx={{ fontWeight: 'medium' }}
        >
          CONTACT INFORMATION
        </Typography>
        <Container>
          {styleLine("ANCOVIET ELECTRONIC CO LTD - TAX NO. 0309366264", "")}
          {styleLine("Address:", "195/22, Binh Thoi Str., Ward 09, District 11, HCMc")}
          {styleLine("REPRESENTATIVE OFFICE:", "01, Chanh Hung Str., Hamlet 04, Phuoc Loc Village, Nha Be District, HCMc")}
          {styleLine("Hotline:", "0989 920 022 - 0903 012 950")}
          {styleLine("Tel:", "(028) 3636 6089 - (028) 3636 6189")}
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
