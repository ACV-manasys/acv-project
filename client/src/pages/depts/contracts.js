import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import Navbar from '../../components/Navbar';
//import ChooseDate from '../../components/ChooseDate';
import MakeAutoComplete from '../../components/autocomplete';

//import * as dayjs from 'dayjs';
import { DropzoneArea } from 'material-ui-dropzone';

function Contracts() {
  const [open, setOpen] = useState(false);
  //const [chosenDate, setChosenDate] = useState(dayjs());
  const [file, setFile] = useState();
  const [dept, setDept] = useState({
    unit: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImport = () => {
    setOpen(false);
  };

  const handleChange = (uploadFile) => {
    // do somthing
    setFile(uploadFile);
  }

  return (
    <Box >
      <Navbar active="Contracts" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '110px',
          paddingRight: '10px',
          mt: '30px',
        }}
      >

        {/* FIELD TO IMPORT XLSX FILE */}
        <Button sx={{ mb: '30px' }} variant="contained" onClick={handleClickOpen} endIcon={<ArrowDropDownIcon />}>
          Import excel file
        </Button>
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Drag or browse excel file"}
          </DialogTitle>
          <DialogContent>
            <DropzoneArea
              Icon={AttachFileIcon}
              filesLimit={1}
              onChange={(file) => handleChange(file)}
              dropzoneProps={{ sx: { backgroundColor: '#EEEEEE' } }}
              showPreviews={true}
              showPreviewsInDropzone={false}
              useChipsForPreview
              previewChipProps={{ sx: { minWidth: 180, maxWidth: 250 } }}
              previewText="Selected:"
              acceptedFiles={['.xlsx']} />
            {/* ADD UNIT TITLES */}
            <MakeAutoComplete
              label='Lable Units' name='unit' textColBlack={true}
              value={dept.unit} setValue={setDept}
              type='dept' placeholder='Name dept columns as ...'
            />
          </DialogContent>
          <DialogActions sx={{ mr: '20px', mb: '15px' }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleImport} variant='contained'>
              Import
            </Button>
          </DialogActions>
        </Dialog>

        {/* CHOOSING DATE BUTTON 
        <ChooseDate chosenDate={chosenDate} setChosenDate={setChosenDate} />
        */}
      </Box>
    </Box>
  );
}

export default Contracts;
