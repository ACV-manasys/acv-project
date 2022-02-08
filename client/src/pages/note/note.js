import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import CustomTabs from '../../components/CustomTabs';
import noteRoutes from './components/routes';
import Layout from './components/layout';
import View from './components/view';
import { Loading } from '../../components/backdrop';
import { getPrivateNote, } from '../../api';

function Note({ type }) {

  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPrivateNote().then((data) => {
      setNotes(data);
      setLoading(false);
    });
  }, [notes]);

  return (
    <Box >
      <CustomTabs tab="default" title='MY NOTES' routes={noteRoutes} active='Note' tabWidth='160px' />
      {/* SITE CONTENT */}
      <View type='new' />
      {
        isLoading ? (<Loading paddingLeft='120px' />) : (<Layout type='private' noteList={notes} />)
      }
    </Box>
  );
}

export default Note;
