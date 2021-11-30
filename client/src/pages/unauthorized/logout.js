import { Typography } from '@mui/material';
import { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    localStorage.removeItem('token-myapp');
    window.location.href = '/';
  }, []);

  return (
    <div>
      <Typography>Logging out...</Typography>
    </div>
  );
}

export default Logout;
