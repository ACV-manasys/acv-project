// ADD NEW SPART/CONVEYOR BELT IN INVENROTY
import React, { useState } from 'react';

import {
  Box,
  Typography,
  Dialog,
  TextField,
  Tabs,
  Tab,
  Button,
  InputAdornment,
  Grid,
  IconButton,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import CloseIcon from '@mui/icons-material/Close';

import useStyles from './styles';
import StandardInput from '../../../components/StandardInput';

import { createSpart } from '../../../api';

function New({ open, setOpen }) {

  const [tab, setTab] = useState('spart');
  const [spart, setSpart] = useState({
    partNo: '',
    commodity: '',
    specification: '',
    vieName: '',
    price: 0,
  });
  const [conv, setConv] = useState({
    partNo: '',
    commodity: '',
    specification: '',
    vieName: '',
    price: 0,
  });

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    //TODO: ADD
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box
          minHeight='600px'
          sx={{
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '10px',
            paddingRight: '10px',
            mt: '20px',
          }}
        >
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="delete" size="medium" onClick={handleClose} sx={{ mr: '20px' }}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <TabContext value={tab}>
            <Tabs
              sx={{
                minHeight: '50px',
                background: '#ECECEC',
                borderRadius: '10px',
              }}
              TabIndicatorProps={{
                style: {
                  width: '50px',
                  height: '50px',
                  margin: '10px 0px',
                  borderRadius: '10px',
                  background: '#3B7E7E',
                  zIndex: 0,
                },
              }}
              value={tab}
              onChange={(e, newVal) => setTab(newVal)}
            >
              <Tab className={classes.tabStyle} icon={<HandymanIcon />} value="spart" />
              <Tab className={classes.tabStyle} icon={<LayersIcon />} value="conveyor" />
            </Tabs>
            <TabPanel value="spart">
              {/* NEW SPART */}
              <Typography className={classes.titleStyle} align='center' > NEW SPARE PART </Typography>
              <StandardInput
                id="partNo" label="Part No" name="partNo" value={spart.partNo}
                setValue={setSpart} required={true}
              />
              <StandardInput
                id="commodity" label="Commodity" name="commodity" value={spart.commodity}
                setValue={setSpart} required={true}
              />
              <StandardInput
                id="specification" label="Specification" name="specification" value={spart.specification}
                setValue={setSpart} required={true}
              />
              <StandardInput
                id="vieName" label="Vietnamese" name="vieName" value={spart.vieName}
                setValue={setSpart} required={true}
              />
              <Box sx={{ width: '300px' }}>
                <TextField
                  required={true} id="price" margin="normal"
                  variant="outlined" size="medium" fullWidth
                  value={spart.price} label="Price"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  onChange={(e) => {
                    setSpart((prev) => ({ ...prev, [spart.price]: e.target.value }));
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel value="conveyor">
              {/* NEW CONVEYOR BELT */}
              <Typography className={classes.titleStyle} align='center'> NEW CONVEYOR BELT </Typography>
            </TabPanel>
          </TabContext>
          <Button sx={{ mb: '20px' }} variant="contained" onClick={handleAdd}>Add</Button>
        </Box>
      </Dialog>
    </div>
  );
}

export default New;