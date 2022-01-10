import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import {
  Button,
  Dialog, DialogTitle, DialogContent,
  DialogActions,
  FormControl, Select, InputLabel,
  MenuItem,
  Stack,
  TextField,
  Box,
  IconButton,
} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { createEngr, updateEngr } from '../../../api';
import StandardInput from '../../../components/StandardInput';

const alignFormCell = {
  mt: '15px',
  mb: '10px',
}

const respList = ['Rice', 'Cashew', 'Mixed'];

function Form({ type, rawData, iconCol }) {
  const [engr, setEngr] = useState({});
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [dob, setDob] = useState();
  const [joinedDate, setJoinedDate] = useState();

  useEffect(() => {
    switch (type) {
      case 'Add':
        setEngr({
          name: '',
          dob: dayjs(),
          joinedDate: dayjs(),
          phoneNumber: '',
          email: '',
          resp: '',
        });
        setTitle('NEW ENGR INFO');
        break;

      default:
        setEngr(rawData);
        setTitle('EDIT ENGR INFO');
        setDob(rawData.dob);
        setJoinedDate(rawData.joinedDate);
        break;
    }
  }, [rawData, type]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    switch (type) {
      case 'Add':
        createEngr(engr);
        break;
      default:
        updateEngr(engr);
        break;
    }
    setOpen(false);
    window.location.reload();
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '110px',
      }}
    >
      {type === 'Add' ? (
        <Button
          sx={{ borderRadius: '20px', mt: '15px' }}
          color="darkin"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}>
          Add
        </Button>
      ) : (
        <IconButton aria-label="update" onClick={handleClickOpen}>
          <EditIcon sx={{ color: iconCol }} />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: '25px', fontWeight: 600, alignSelf: 'center' }}>
          {title}
        </DialogTitle>
        <DialogContent>
          {/*TEXT-FIELD*/}
          <StandardInput
            label="Full Name" name="name" value={engr.name}
            setValue={setEngr} required={true}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={alignFormCell}>
              <DesktopDatePicker
                disableFuture
                label="Date of Birth"
                inputFormat="dd/MM/yyyy"
                value={dob}
                onChange={(newValue) => {
                  setEngr((prev) => ({ ...prev, dob: newValue }));
                  setDob(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                disableFuture
                label="Date joined"
                inputFormat="dd/MM/yyyy"
                value={joinedDate}
                onChange={(newValue) => {
                  setEngr((prev) => ({ ...prev, joinedDate: newValue }));
                  setJoinedDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <StandardInput
            id="phoneNumber" label="Phone Number" name="phoneNumber" value={engr.phoneNumber}
            setValue={setEngr} required={false}
          />
          <StandardInput
            id="email" label="Email" name="email" value={engr.email}
            setValue={setEngr} required={false}
          />
          <FormControl fullWidth sx={alignFormCell}>
            <InputLabel id="resp">Responsible</InputLabel>
            <Select
              id="resp"
              value={engr.resp}
              label="Responsible"
              onChange={(event) => {
                setEngr((prev) => ({ ...prev, resp: event.target.value }));
              }}
            >
              {respList.map((i) => (
                <MenuItem key={i} value={i}>{i}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ mb: '8px', mr: '10px' }}>
          <Button onClick={handleClose} sx={{ borderRadius: '20px', }}>Cancel</Button>
          <Button onClick={handleSubmit} variant='contained' sx={{ borderRadius: '20px', }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Form;