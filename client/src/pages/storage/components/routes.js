import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import InventoryIcon from '@mui/icons-material/Inventory';

const storageRoutes = [
  {
    text: 'default',
    path: '/storage',
    exact: true,
    icon: <InventoryIcon sx={{ fontSize: '30px' }} />,
  },
  {
    text: 'spart',
    path: '/storage/spart',
    exact: true,
    icon: <HandymanIcon sx={{ fontSize: '30px' }} />,
  },
  {
    text: 'conveyor',
    path: '/storage/conveyor',
    exact: true,
    icon: <LayersIcon sx={{ fontSize: '30px' }} />,
  },
];

export default storageRoutes;