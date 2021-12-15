import GroupsIcon from '@mui/icons-material/Groups';
import NotesIcon from '@mui/icons-material/Notes';

const noteRoutes = [
  {
    text: 'default',
    path: '/note',
    exact: true,
    icon: <NotesIcon sx={{ fontSize: '30px' }} />,
  },
  {
    text: 'shared',
    path: '/note/shared',
    exact: true,
    icon: <GroupsIcon sx={{ fontSize: '30px' }} />,
  },
];

export default noteRoutes;