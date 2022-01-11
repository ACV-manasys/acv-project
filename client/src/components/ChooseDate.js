// SELECT DATE BOX
import React from 'react';
import { Grid, TextField, } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function ChooseDate({ chosenDate, setChosenDate }) {

  return (
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
  );
}