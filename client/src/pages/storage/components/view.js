// ADD NEW SPART/CONVEYOR BELT IN INVENROTY
import React, { useState, useEffect } from 'react';

import {
  Box, Typography,
  Dialog,
  Button,
  Grid, IconButton,
  Autocomplete,
  TextField,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';

import StandardInput from '../../../components/StandardInput';

import { createLog, getallSpart } from '../../../api';

const childTitleStyle = {
  color: "#555555",
  fontWeight: 600,
  fontSize: '25px',
};

function View({ tableHeaders, createFunc, itemType, storageType, functionType }) {
  const [item, setItem] = useState({});
  const [open, setOpen] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [chosen, setChosen] = useState();

  useEffect(() => {
    getallSpart().then((spartData) => {
      setInventory(spartData);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    var recordLog = {};
    createFunc(item);

    let linker = '';
    if (functionType === 'Add') {
      linker = ' to ';
    }
    else {
      linker = ' in ';
    }

    switch (itemType) {
      case 'conveyor':
        recordLog = {
          activity: functionType + 'ed conveyor for machine: ' + item.machineName + linker + storageType,
          code: 0,
        };
        break;
      default:
        recordLog = {
          activity: functionType + 'ed spare part commodity: ' + item.commodity + linker + storageType,
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

  const setTabContent = (element) => {
    switch (element.type) {
      case 'money':
        return (
          <StandardInput key={element.id}
            label={element.label} name={element.id} value={item[element.id]}
            setValue={setItem} required={element.required} type='money' moneySign={element.moneySign}
          />
        );

      case 'dimension':
        return (
          <StandardInput key={element.id}
            label={element.label} name={element.id} value={item[element.id]}
            setValue={setItem} required={element.required} type='dimension'
          />
        );
      default:
        return (
          <StandardInput key={element.id}
            label={element.label} name={element.id} value={item[element.id]}
            setValue={setItem} required={element.required} type={element.type}
          />
        );
    }
  }

  return (
    <div>
      {functionType === 'Add' ? (
        <Grid container justifyContent="center" sx={{ mb: '20px' }}>
          <Button sx={{ borderRadius: '20px' }} variant="contained" startIcon={<AddBoxIcon />} onClick={() => setOpen(true)}>
            add
          </Button>
        </Grid>
      ) : (
        <Grid container justifyContent="flex-end">
          <IconButton aria-label="delete" size="medium" onClick={handleClose} sx={{ mr: '20px' }}>
            <CloseIcon />
          </IconButton>
        </Grid>
      )}
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
          {
            functionType === 'Add' ? (
              <Typography sx={childTitleStyle} align='center' > NEW </Typography>
            ) : (
              <Typography sx={childTitleStyle} align='center' > EDIT </Typography>
            )
          }
          {/*
            tableHeaders.map((element) => (
              setTabContent(element)
            ))
            */}

          <Autocomplete
            disablePortal
            id="spartId"
            options={inventory}
            getOptionLabel={(option) => option.vieName + ', ' + option.specification}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            sx={{ width: 300, mt: '10px' }}
            renderInput={(params) => <TextField {...params} label="Choose spare part" />}
            onChange={(e, newVal) => setChosen(newVal)}
          />
          <Button sx={{ mb: '20px', mt: '20px', width: '150px' }} variant="contained" onClick={handleAdd}>Save</Button>
        </Box>
      </Dialog>
    </div>
  );
}

export default View;