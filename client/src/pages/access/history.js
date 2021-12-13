import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import {
  Box, Stack,
  List, ListItemAvatar,
  Avatar,
  ListItemText, ListItem,
  Typography,
  Container,
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

const dateTimeStyle = {
  color: "#222222",
  fontSize: '17px',
  fontWeight: 480,
};

function HistoryLog() {

  const [log, setLog] = useState([]);
  const [open, setOpen] = useState(false); // DIALOG CONTROL FOR FILTER
  const [field, setField] = useState(false);


  useEffect(() => {
    getallLogs().then((data) => {
      setLog(data);
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
        return (<RemoveCircleIcon />); //DELETE SPART/CONV IN INVENTORY

      // // SPART/CONV STORAGE ACTIVITIES
      case 2:
        return (<FileDownloadIcon />); //IMPORT SPART/CONV IN STORAGE
      case 3:
        return (<FileUploadIcon />); //EXPORT SPART/CONV IN STORAGE
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
    <Container maxWidth="sm">
      <Typography
        component="h4"
        variant="h4"
        align="center"
        color="#222222"
        style={{ fontWeight: 600 }}>
        HISTORY LOG
      </Typography>
      <Grid container justifyContent="flex-end" sx={{ mt: '15px' }}>
        <Button
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
        }}
      >
        <List sx={{ width: '100%', minWidth: 430 }}>
          {log.map((i) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {setIcon(i.code)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={i.user} secondary={i.activity} />
              <Stack sx={{ alignItems: 'center' }}>
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
    </Container>
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