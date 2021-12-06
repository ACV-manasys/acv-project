import React, { useState } from 'react';
import {
  Box,
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

import FileUploadIcon from '@mui/icons-material/FileUpload'; //EXPORT
import FileDownloadIcon from '@mui/icons-material/FileDownload'; //IMPORT
import EditIcon from '@mui/icons-material/Edit'; //EDIT DOC
import DescriptionIcon from '@mui/icons-material/Description'; //BILL/DOC
import FilterListIcon from '@mui/icons-material/FilterList'; //FILTER BUTTON


import { } from '../../api';

function HistoryLog() {

  const [log, setLog] = useState(testLogs);
  const [open, setOpen] = useState(false); // DIALOG CONTROL FOR FILTER
  const [field, setField] = useState(false);

  /*
  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);*/

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

  function setIcon(activity) {
    switch (activity) {
      case 'export sparts':
        return (<FileUploadIcon />);
      case 'update contract no.58':
        return (<EditIcon />);
      case 'import sparts':
        return (<FileDownloadIcon />);

      default:
        return (<DescriptionIcon />);
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
                  <MenuItem value={false}>false</MenuItem>
                  {logFields.map((i) => (
                    <MenuItem value={i}>{i}</MenuItem>
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
        <List sx={{ width: '100%', minWidth: 400 }}>
          {log.map((i) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {setIcon(i.activity)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={i.user} secondary={i.activity} />
              <Typography color="#222222" style={{ fontSize: '17px', fontWeight: 480 }}>{i.createdAt}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

// THIS LOG LIST IS FOR DISPLAY TESTING
const testLogs = [
  { user: 'Hai Ha', activity: 'export sparts', createdAt: '20-10-2021' },
  { user: 'nsask', activity: 'export sparts', createdAt: '19-10-2021' },
  { user: 'sdfsdf', activity: 'export bill', createdAt: '18-10-2021' },
  { user: 'nsask', activity: 'import sparts', createdAt: '18-10-2021' },
  { user: 'nsask', activity: 'update contract no.58', createdAt: '17-10-2021' },
  { user: 'sdfsdf', activity: 'export bill', createdAt: '16-10-2021' },
  { user: 'nsask', activity: 'export sparts', createdAt: '16-10-2021' },
];

const logFields = ['import sparts', 'export sparts', 'update contract no.58', 'export bill'];
export default HistoryLog;