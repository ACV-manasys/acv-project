import makeStyles from '@mui/styles/makeStyles';
import heroImage from './bg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    background: ' #ECF5EC',
  },
  hero: {
    marginBottom: 10,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
    height: '50vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  logoHero: {
    maxWidth: 180,
    maxHeight: 180,
    animation: `$spin 20s linear infinite`,
    alignSelf: 'center',
  },
  toolbar: {
    minHeight: 48,
    background: '#2C868F',
  },
  toolbarButton: {
    marginRight: 12,
  },
  footerSectionBox: {
    padding: 10,
    color: 'white',
    background: '#2C868F',
  },
  footerGridItem: {
    alignItems: 'center',
    display: 'flex',
  },
  footerImage: {
    maxWidth: 60,
    maxHeight: 60,
    animation: `$spin 10s linear infinite`,
  },
}));

export default useStyles;
