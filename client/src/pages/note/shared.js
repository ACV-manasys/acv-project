import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import CustomTabs from '../../components/CustomTabs';
import noteRoutes from './components/routes';
import Layout from './components/layout';
import View from './components/view';
import { Loading } from '../../components/backdrop';
import { getSharedNote } from '../../api';

function Shared() {

  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    getSharedNote().then((data) => {
      setNotes(data);
      setLoading(false);
    });
  }, [notes]);

  return (
    <Box >
      <CustomTabs tab="shared" title='SHARED NOTES' routes={noteRoutes} active='Note' tabWidth='160px' />
      {/* SITE CONTENT */}
      <View type='new' />
      {
        isLoading ? (<Loading paddingLeft='120px' />) : (<Layout type='shared' noteList={notes} />)
      }
    </Box>
  );
}

export default Shared;
