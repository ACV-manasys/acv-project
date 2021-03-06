import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import CustomTabs from '../../components/CustomTabs';
import storageRoutes from './components/routes';
import StandardTable from '../../components/StandardTable';
import View from './components/view';
import ChooseDate from '../../components/ChooseDate';

import { getallSpartStgByDate, deleteSpartStg, updateSpartStg, createSpartStg } from '../../api';
import * as dayjs from 'dayjs';

//TABLE HEADS =====
const headerCells = [
  { id: 'vieName', label: 'Name', required: true, type: 'text', default: true, },
  { id: 'specification', label: 'Spec', required: true, type: 'text', default: true, },
  { id: 'quantity', label: 'Periodical Quantity', required: true, type: 'number', default: true, },
  { id: 'impQuantity', label: 'Import Quantity', required: true, type: 'number' },
  { id: 'expQuantity', label: 'Export Quantity', required: true, type: 'number' },
];

/*
const headerCells = [
  { id: 'vieName', label: 'Name', type: 'text' },
  { id: 'specification', label: 'Spec', type: 'text' },
  { id: 'quantity', label: 'Periodical Quantity', type: 'number' },
  { id: 'impQuantity', label: 'Import Quantity', type: 'number' },
  { id: 'expQuantity', label: 'Export Quantity', type: 'number' },
  { id: 'finalExistence', label: 'Final Quantity', type: 'number' },
];
*/

function Sparepart() {
  const [sparts, setSparts] = useState([]);
  const [chosenDate, setChosenDate] = useState(dayjs());

  useEffect(() => {
    if (chosenDate !== undefined) {
      //console.log(chosenDate.toISOString());
      getallSpartStgByDate({
        date: chosenDate.toISOString(),
      }).then((data) => {
        setSparts(data);
      });
    }
  }, [chosenDate, sparts]);

  return (
    <Box >
      <CustomTabs active='Storage' tab="spart" title='SPARE PARTS' routes={storageRoutes} />
      {/* SITE CONTENT */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '110px',
          paddingRight: '10px',
          mt: '10px',
        }}
      >
        <View tableHeaders={headerCells} actionFunc={createSpartStg}
          itemType='spart' storageType='storage' functionType='Add' />
        <ChooseDate chosenDate={chosenDate} setChosenDate={setChosenDate} />

        {/* TABLE CONTENT */}
        <Box >
          <StandardTable
            headCells={headerCells} data={sparts}
            deleteFunction={deleteSpartStg} updateFunction={updateSpartStg}
            type='spart' storageType='storage' />
        </Box>
      </Box>
    </Box>
  );
}

export default Sparepart;