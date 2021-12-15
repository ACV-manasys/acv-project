// ADD NEW SPART/CONVEYOR BELT IN INVENROTY
import React, { useState } from 'react';

import {
  Box, Typography,
  Dialog,
  Tabs, Tab,
  Button,
  Grid, IconButton,
  Stack,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import CloseIcon from '@mui/icons-material/Close';

import StandardInput from '../../../components/StandardInput';

import { createSpart, createConveyor, createLog, } from '../../../api';

// STYLING =====
const tabStyle = {
  minWidth: '50px',
  maxWidth: '50px',
  height: '50px',
  margin: '10px 10px',
  '&.Mui-selected': {
    color: 'white',
    zIndex: 1,
  },
};

const childTitleStyle = {
  color: "#555555",
  fontWeight: 600,
  fontSize: '25px',
};

const textFieldTitle = {
  color: "#444444",
  fontWeight: 500,
  fontSize: '18px',
};

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    var recordLog = {};
    switch (tab) {
      case 'conveyor':
        createConveyor(conv);
        recordLog = {
          activity: 'Added conveyor for machine: ' + conv.machineName + ' to inventory',
          code: 0,
        };
        break;
      default:
        createSpart(spart);
        recordLog = {
          activity: 'Added spare part commodity: ' + spart.commodity + ' to inventory',
          code: 0,
        };
        break;
    }

    // Update Log
    createLog(recordLog);

    // Others
    setOpen(false);
    window.location.reload();
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
              <Tab sx={tabStyle} icon={<HandymanIcon />} value="spart" />
              <Tab sx={tabStyle} icon={<LayersIcon />} value="conveyor" />
            </Tabs>
            <TabPanel value="spart">

              {/* NEW SPART */}
              <Typography sx={childTitleStyle} align='center' > NEW SPARE PART </Typography>
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
              <StandardInput
                id="price" label="Price" name="price" value={spart.price}
                setValue={setSpart} required={false} type='money' moneySign='$'
              />
            </TabPanel>
            <TabPanel value="conveyor">

              {/* NEW CONVEYOR BELT */}
              <Typography sx={childTitleStyle} align='center'> NEW CONVEYOR BELT </Typography>
              <StandardInput
                id="machineName" label="Machine Name" name="machineName" value={conv.machineName}
                setValue={setConv} required={true}
              />
              {/* Width x Height */}
              <Box sx={{ width: '300px', mb: '8px', mt: '10px' }}>
                <Typography sx={textFieldTitle} align='center'> Dimension </Typography>
                <Stack direction="row" spacing={2}>
                  <StandardInput
                    id="width" label="Width" name="width" value={conv.width}
                    setValue={setConv} required={false} type='dimension'
                  />
                  <Typography sx={textFieldTitle} > x </Typography>
                  <StandardInput
                    id="height" label="Height" name="height" value={conv.height}
                    setValue={setConv} required={false} type='dimension'
                  />
                </Stack>
              </Box>
              {/* Cost/Price */}
              <StandardInput
                id="costIn" label="Imported Cost" name="costIn" value={conv.costIn}
                setValue={setConv} required={false} type='money' moneySign='VNĐ'
              />
              <StandardInput
                id="priceOut" label="Exported Price" name="priceOut" value={conv.priceOut}
                setValue={setConv} required={false} type='money' moneySign='VNĐ'
              />
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