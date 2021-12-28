// ADD NEW SPART/CONVEYOR BELT IN INVENROTY
import React, { useState, useEffect } from 'react';

import {
  Box,
  Typography,
  Dialog,
  Button,
  Grid, IconButton,
  Stack,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import StandardInput from '../../../components/StandardInput';
import { createLog } from '../../../api';

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

function EditTab({ open, setOpen, updateFunction, rawData, type }) {

  const [data, setData] = useState({});

  useEffect(() => {
    setData(rawData);
  }, [rawData]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    var recordLog = {};
    switch (type) {
      case 'spart':
        recordLog = {
          activity: 'Edited spare part commodity: ' + data.commodity + ' in inventory',
          code: 4,
        };
        break;

      default:
        recordLog = {
          activity: 'Edited conveyor for machine: ' + data.machineName + ' in inventory',
          code: 4,
        };
        break;
    }

    updateFunction(data);
    // Update Log
    createLog(recordLog);
    setOpen(false);
    window.location.reload();
  };

  const getBody = () => {
    switch (type) {
      case 'spart':
        return (
          <Box>
            {/* NEW SPART */}
            <Typography sx={childTitleStyle} align='center' > EDIT SPARE PART </Typography>
            <StandardInput
              label="Part No" name="partNo" value={data.partNo}
              setValue={setData} required={true}
            />
            <StandardInput
              label="Commodity" name="commodity" value={data.commodity}
              setValue={setData} required={true}
            />
            <StandardInput
              label="Specification" name="specification" value={data.specification}
              setValue={setData} required={true}
            />
            <StandardInput
              label="Vietnamese" name="vieName" value={data.vieName}
              setValue={setData} required={true}
            />
            <StandardInput
              label="Price" name="price" value={data.price}
              setValue={setData} required={false} type='money' moneySign='$'
            />
          </Box>
        );

      default:
        return (
          <Box>
            {/* NEW CONVEYOR BELT */}
            <Typography sx={childTitleStyle} align='center'> EDIT CONVEYOR BELT </Typography>
            <StandardInput
              label="Machine Name" name="machineName" value={data.machineName}
              setValue={setData} required={true}
            />
            {/* Width x Height */}
            <Box sx={{ width: '300px', mb: '8px', mt: '10px' }}>
              <Typography sx={textFieldTitle} align='center'> Dimension </Typography>
              <Stack direction="row" spacing={2}>
                <StandardInput
                  label="Width" name="width" value={data.width}
                  setValue={setData} required={false} type='dimension'
                />
                <Typography sx={textFieldTitle} > x </Typography>
                <StandardInput
                  label="Height" name="height" value={data.height}
                  setValue={setData} required={false} type='dimension'
                />
              </Stack>
            </Box>
            {/* Cost/Price */}
            <StandardInput
              label="Imported Cost" name="costIn" value={data.costIn}
              setValue={setData} required={false} type='money' moneySign='VNĐ'
            />
            <StandardInput
              label="Exported Price" name="priceOut" value={data.priceOut}
              setValue={setData} required={false} type='money' moneySign='VNĐ'
            />
            <StandardInput
              label="Note" name="note" value={data.note}
              setValue={setData} required={false} multiline={true}
            />
          </Box>
        );
    }
  }

  return (
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
        {getBody()}
        <Button sx={{ mb: '30px', width: '150px' }} variant="contained" onClick={handleUpdate}>Update</Button>
      </Box>
    </Dialog>
  );
}

export default EditTab;