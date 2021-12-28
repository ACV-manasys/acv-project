import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';
import EngineeringIcon from '@mui/icons-material/Engineering';

const accessRoutes = [
  {
    text: 'default',
    path: '/access',
    exact: true,
    icon: <HistoryIcon sx={{ fontSize: '30px' }} />,
  },
  {
    text: 'accounts',
    path: '/access/accounts',
    exact: true,
    icon: <GroupIcon sx={{ fontSize: '30px' }} />,
  },
  {
    text: 'engr',
    path: '/access/engr',
    exact: true,
    icon: <EngineeringIcon sx={{ fontSize: '30px' }} />,
  },
];

export default accessRoutes;