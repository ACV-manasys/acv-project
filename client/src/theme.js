import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#3B7E7E',
      contrastText: "#fff",
    },
    contained: {
      main: '#4AA49B',
    },
    emphasis: {
      main: '#5A7D9F',
    },
    darkin: {
      main: '#3B7E7E',
      contrastText: "#fff"
    },
    greyBorder: {
      main: '#ECEFF1'
    },
    lightBackground: {
      main: '#E0F2F1'
    },
    alertStyle: {
      main: '#B90E0A',
      contrastText: "#fff",
    },
    lightText: {
      main: '#EEEEEE'
    },
    darkgrey: {
      main: '#222222',
    }
  },
});

export default theme;
