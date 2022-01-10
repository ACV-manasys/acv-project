import makeStyles from '@mui/styles/makeStyles';
import heroImage from './bg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#E0F2F1',
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
    background: '#3B7E7E', // === 'darkin' in theme.js
  },
  toolbarButton: {
    marginRight: 12,
    borderRadius: '20px',
  },
  footerSectionBox: {
    padding: 10,
    color: 'white',
    background: '#3B7E7E', // === 'darkin' in theme.js
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
