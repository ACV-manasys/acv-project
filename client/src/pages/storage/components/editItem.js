// ADD NEW SPART/CONVEYOR BELT IN INVENROTY
import React, { useState, useEffect } from 'react';

import {
  Box,
  Dialog,
  Button,
  Grid, IconButton, Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import StandardInput from '../../../components/StandardInput';
import { createLog } from '../../../api';

function EditTab({ open, setOpen, tableHeaders, updateFunction, rawitem, itemType, storageType }) {

  const [item, setItem] = useState();

  useEffect(() => {
    setItem(rawitem);
    //console.log(rawitem);
  }, [rawitem]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    var recordLog = {};
    switch (itemType) {
      case 'spart':
        recordLog = {
          activity: 'Edited spare part commodity: ' + item.commodity + ' in ' + storageType,
          code: 4,
        };
        break;

      default:
        recordLog = {
          activity: 'Edited conveyor for machine: ' + item.machineName + ' in ' + storageType,
          code: 4,
        };
        break;
    }

    updateFunction(item);
    // Update Log
    createLog(recordLog);
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
    <Dialog open={open} onClose={handleClose}>
      {item !== undefined &&
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
          <Typography sx={{ color: "#555555", fontWeight: 600, fontSize: '25px' }} align='center'>
            EDIT
          </Typography>
          {
            tableHeaders.map((element) => (
              setTabContent(element)
            ))
          }
          <Button sx={{ mt: '15px', mb: '30px', width: '150px', borderRadius: '20px' }} variant="contained" onClick={handleUpdate}>Update</Button>
        </Box>
      }
    </Dialog>
  );
}

export default EditTab;