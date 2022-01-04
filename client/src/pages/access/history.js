import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import {
  Box, Stack,
  List, ListItemAvatar,
  Avatar,
  ListItemText, ListItem,
  Typography,
  Grid,
  Button,
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  FormControl, Select, InputLabel,
  MenuItem,
} from '@mui/material';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

import { getallLogs } from '../../api';
import { Loading } from '../../components/backdrop';
import accessRoutes from './components/routes';
import CustomTabs from '../../components/CustomTabs';

const dateTimeStyle = {
  color: "#222222",
  fontSize: '16px',
  fontWeight: 480,
};

function HistoryLog() {

  const [log, setLog] = useState([]);
  const [open, setOpen] = useState(false); // DIALOG CONTROL FOR FILTER
  const [field, setField] = useState(false);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    getallLogs().then((data) => {
      setLog(data);
      setLoading(false);
    })
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setField(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const filterLog = () => {
    // do something

    setOpen(false);
  };

  function setIcon(activityCode) {
    switch (activityCode) {
      // INVENTORY ACTIVITIES
      case 0:
        return (<AddCircleIcon />); //ADD NEW SPART/CONV IN INVENTORY
      case 1:
        return (<RemoveCircleIcon />); //DELETE SPART/CONV FROM INVENTORY

      // // SPART/CONV STORAGE ACTIVITIES
      case 2:
        return (<FileDownloadIcon />); //IMPORT SPART/CONV INTO STORAGE
      case 3:
        return (<FileUploadIcon />); //EXPORT SPART/CONV FROM STORAGE
      case 4:
        return (<EditIcon />); //EDIT

      // ACCESS PAGE 
      case 5:
        return (<ToggleOnIcon />); //ACTIVATE AN ACCOUNT
      case 6:
        return (<ToggleOffIcon />); //DEACTIVATE AN ACCOUNT

      default:
        return (<DescriptionIcon />); //IMPORT CONVEYOR IN STORAGE
    }
  }

  return (
    <Box>
      <CustomTabs tab="default" title='HISTORY LOGS' routes={accessRoutes} active='Access' />
      <Grid container justifyContent="center" sx={{ mt: '15px' }} paddingLeft='100px'>
        <Button
          sx={{ borderRadius: '20px' }}
          color="darkin"
          variant="contained"
          startIcon={<FilterListIcon />}
          onClick={handleClickOpen}>
          filter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>History Log Filter</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select log field that you want to view.
            </DialogContentText>
            <Box
              noValidate
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: 'fit-content',
              }}
            >
              <FormControl sx={{ mt: 2, minWidth: 300 }}>
                <InputLabel htmlFor="max-width">Field</InputLabel>
                <Select
                  autoFocus
                  value={field}
                  onChange={handleChange}
                  label="maxWidth"
                  inputProps={{
                    name: 'max-width',
                    id: 'max-width',
                  }}
                >
                  <MenuItem key="Defaults" value={false}>Defaults</MenuItem>
                  {logFields.map((i) => (
                    <MenuItem key={i} value={i}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={filterLog}>OK</Button>
          </DialogActions>
        </Dialog>
      </Grid>
      {/* LOG CONTENT */}
      <Box
        noValidate
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 'auto',
          width: 'fit-content',
          paddingLeft: '100px',
        }}
      >
        <List sx={{ width: '100%', minWidth: 450 }}>
          {isLoading ? (<Loading />) : null}
          {log.map((i) => (
            <ListItem key={i._id}>
              <ListItemAvatar>
                <Avatar>
                  {setIcon(i.code)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText sx={{ maxWidth: '350px' }} primary={i.user} secondary={i.activity} />
              <Stack sx={{ alignItems: 'center', ml: '20px' }}>
                <Typography sx={dateTimeStyle}>
                  {dayjs(i.createdAt).format('DD-MM-YYYY')}
                </Typography>
                <Typography sx={dateTimeStyle}>
                  {dayjs(i.createdAt).format('HH:mm')}
                </Typography>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

const logFields = [
  'Add/Remove in inventory',
  'Import',
  'Export',
  'Edit',
  'Access Management',
];

export default HistoryLog;