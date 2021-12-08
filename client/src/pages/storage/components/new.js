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
  Stack,
  Input,
  FormHelperText,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import CloseIcon from '@mui/icons-material/Close';

import useStyles from './styles';
import StandardInput from '../../../components/StandardInput';

import { createSpart, createConveyor } from '../../../api';

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
    machineName: "",
    width: 0,
    height: 0,
    costIn: 0,
    priceOut: 0,
    note: "",
  });

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    switch (tab) {
      case 'conveyor':
        createConveyor(conv);
        break;
      default:
        createSpart(spart);
        break;
    }
    setOpen(false);
  };

  const moneyTextField = (required, name, value, setValue, label) => {
    return (
      <Box sx={{ width: '300px' }}>
        <TextField
          required={required} id={name} margin="normal"
          variant="outlined" size="medium" fullWidth
          value={value} label={label}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onChange={(e) => {
            setValue((prev) => ({ ...prev, [name]: e.target.value }));
          }}
        />
      </Box>
    );
  }

  const dimensionTextField = (required, name, value, setValue, label) => {
    return (
      <Box >
        <Input
          required={required}
          id={name}
          value={value}
          label={label}
          endAdornment={<InputAdornment position="end">m</InputAdornment>}
          onChange={(e) => {
            setValue((prev) => ({ ...prev, [name]: e.target.value }));
          }}
        />
        <FormHelperText id={name}>{label}</FormHelperText>
      </Box>
    );
  }

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
              {moneyTextField(false, "price", spart.price, setSpart, "Price")}
            </TabPanel>
            <TabPanel value="conveyor">

              {/* NEW CONVEYOR BELT */}
              <Typography className={classes.titleStyle} align='center'> NEW CONVEYOR BELT </Typography>
              <StandardInput
                id="machineName" label="Machine Name" name="machineName" value={conv.machineName}
                setValue={setConv} required={true}
              />
              {/* Width x Height */}
              <Box sx={{ width: '300px', mb: '8px', mt: '10px' }}>
                <Typography className={classes.textFieldTitle} align='center'> Dimension </Typography>
                <Stack direction="row" spacing={2}>
                  {dimensionTextField(true, "width", conv.width, setConv, "Width")}
                  <Typography className={classes.textFieldTitle} > x </Typography>
                  {dimensionTextField(true, "height", conv.height, setConv, "Height")}
                </Stack>
              </Box>
              {/* Cost/Price */}
              {moneyTextField(false, "costIn", conv.costIn, setConv, "Imported Cost")}
              {moneyTextField(false, "priceOut", conv.priceOut, setConv, "Exported Price")}
              <StandardInput
                id="note" label="Note" name="note" value={conv.note}
                setValue={setConv} required={false} multiline={true}
              />
            </TabPanel>
          </TabContext>
          <Button sx={{ mb: '30px', width: '150px' }} variant="contained" onClick={handleAdd}>Add</Button>
        </Box>
      </Dialog>
    </div>
  );
}

export default New;