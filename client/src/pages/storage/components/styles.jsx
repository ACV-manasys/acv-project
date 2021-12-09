import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  chileTitleStyle: {
    color: "#555555",
    fontWeight: 600,
    fontSize: '25px',
  },
  textFieldTitle: {
    color: "#444444",
    fontWeight: 500,
    fontSize: '18px',
  },
  tabStyle: {
    minWidth: '50px',
    maxWidth: '50px',
    height: '50px',
    margin: '10px 10px',
    '&.Mui-selected': {
      color: 'white',
      zIndex: 1,
    },
  },
});

export default useStyles;