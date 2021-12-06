import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  titleStyle: {
    color: "#555555",
    fontWeight: 600,
    fontSize: '25px',
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
}));

export default useStyles;