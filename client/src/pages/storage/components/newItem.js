// ADD NEW SPART/CONVEYOR BELT IN INVENROTY
import React, { useState } from 'react';

import {
  Box, Typography,
  Dialog,
  Button,
  Grid, IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';

import StandardInput from '../../../components/StandardInput';

import { createLog, } from '../../../api';

const childTitleStyle = {
  color: "#555555",
  fontWeight: 600,
  fontSize: '25px',
};

function New({ tableHeaders, createFunc, itemType, storageType }) {
  const [item, setItem] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    var recordLog = {};
    createFunc(item);
    switch (itemType) {
      case 'conveyor':
        recordLog = {
          activity: 'Added conveyor for machine: ' + item.machineName + ' to ' + storageType,
          code: 0,
        };
        break;
      default:
        recordLog = {
          activity: 'Added spare part commodity: ' + item.commodity + ' to ' + storageType,
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
      <Grid container justifyContent="center" sx={{ mt: '10px', mb: '15px' }}>
        <Button sx={{ borderRadius: '20px' }} variant="contained" startIcon={<AddBoxIcon />} onClick={() => setOpen(true)}>
          add
        </Button>
      </Grid>
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
            itemType === 'conveyor' ? (
              <Typography sx={childTitleStyle} align='center' > NEW CONVEYOR </Typography>
            ) : (
              <Typography sx={childTitleStyle} align='center' > NEW SPARE PART </Typography>
            )
          }
          {
            tableHeaders.map((element) => (
              setTabContent(element)
            ))
          }
          <Button sx={{ mb: '20px', mt: '20px', width: '150px', borderRadius: '20px', }} variant="contained" onClick={handleAdd}>Add</Button>
        </Box>
      </Dialog>
    </div>
  );
}

export default New;