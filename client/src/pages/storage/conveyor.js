import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import CustomTabs from '../../components/CustomTabs';
import storageRoutes from './components/routes';
import StandardTable from '../../components/StandardTable';
import View from './components/view';
import ChooseDate from '../../components/ChooseDate';

import {
  getallConvStgByDate,
  createConvStg,
  updateConvStg,
  deleteConvStg,
} from '../../api';
import * as dayjs from 'dayjs';

//TABLE HEADS =====
const headerCells = [
  { id: 'machineName', label: 'Name', required: true, type: 'text', default: true, },
  { id: 'width', label: 'Width', required: true, type: 'number', default: true, },
  { id: 'height', label: 'Height', required: true, type: 'number', default: true, },
  { id: 'quantity', label: 'Periodical Quantity', required: true, type: 'number', default: true, },
  { id: 'impQuantity', label: 'Import Quantity', required: true, type: 'number' },
  { id: 'expQuantity', label: 'Export Quantity', required: true, type: 'number' },
  { id: 'note', label: 'Note', required: false, type: 'text' },
];

/*
const headerCells = [
  { id: 'machineName', label: 'Name', type: 'text' },
  { id: 'width', label: 'Width', type: 'number' },
  { id: 'height', label: 'Height', type: 'number' },
  { id: 'quantity', label: 'Periodical Quantity', type: 'number' },
  { id: 'impQuantity', label: 'Import Quantity', type: 'number' },
  { id: 'expQuantity', label: 'Export Quantity', type: 'number' },
  { id: 'finalExistence', label: 'Final Quantity', type: 'number' },
  { id: 'note', label: 'Note', type: 'text' },
];
*/


function Conveyor() {
  const [convs, setConvs] = useState([]);
  const [chosenDate, setChosenDate] = useState(dayjs());

  useEffect(() => {
    if (chosenDate !== undefined) {
      //console.log(chosenDate.toISOString());
      getallConvStgByDate({
        date: chosenDate.toISOString(),
      }).then((data) => {
        setConvs(data);
      });
    }
  }, [chosenDate, convs]);

  return (
    <Box >
      <CustomTabs active='Storage' tab="conveyor" title='CONVEYOR BELTS' routes={storageRoutes} />
      {/* SITE CONTENT */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '110px',
          paddingRight: '10px',
          mt: '20px',
        }}
      >
        <View tableHeaders={headerCells} actionFunc={createConvStg}
          itemType='conveyor' storageType='storage' functionType='Add' />
        <ChooseDate chosenDate={chosenDate} setChosenDate={setChosenDate} />

        {/* TABLE CONTENT */}
        <Box >
          <StandardTable
            headCells={headerCells} data={convs}
            deleteFunction={deleteConvStg} updateFunction={updateConvStg}
            type='spart' storageType='storage' />
        </Box>
      </Box>
    </Box>
  );
}

export default Conveyor;