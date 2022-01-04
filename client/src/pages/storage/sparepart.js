import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

//import StandardTable from '../../components/StandardTable';
import CustomTabs from '../../components/CustomTabs';
import storageRoutes from './components/routes';
import StandardTable from '../../components/StandardTable';
import View from './components/view';

import { getallSpartStgByDate, deleteSpartStg, updateSpartStg } from '../../api';
import * as dayjs from 'dayjs';

//TABLE HEADS =====
const headerCells = [
  { id: 'vieName', label: 'Name', required: true, type: 'text' },
  { id: 'spec', label: 'Spec', required: true, type: 'text' },
  { id: 'periodicalExistence', label: 'Periodical Quantity', required: true, type: 'number' },
  { id: 'impQuantity', label: 'Import Quantity', required: true, type: 'number' },
  { id: 'expQuantity', label: 'Export Quantity', required: true, type: 'number' },
  { id: 'finalExistence', label: 'Final Quantity', required: true, type: 'number' },
];

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
  }, [chosenDate]);

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
        <View tableHeaders={headerCells} createFunc={headerCells}
          itemType='spart' storageType='storage' functionType='Add' />
        <Grid container justifyContent="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['year', 'month']}
              label="Choose time"
              value={chosenDate}
              onChange={(newValue) => {
                setChosenDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} helperText={null} />}
            />
          </LocalizationProvider>
        </Grid>

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