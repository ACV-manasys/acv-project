import React from 'react';
import {
  Typography,
  IconButton,
  Popover,
  Grid,
  Button,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

// BASIC DELETE POP-UP
function DeletePopUp({ iconCol, itemId, delFunction, item }) {

  const handleDel = () => {
    delFunction(itemId);
    window.location.reload();
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton aria-label="delete" {...bindTrigger(popupState)}>
            <DeleteIcon sx={{ color: iconCol }} />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>
              Are you sure to delete this {item}?
            </Typography>
            <Grid container justifyContent="flex-end">
              <Button
                onClick={() => {
                  handleDel();
                  popupState.close();
                }}
                variant='contained' color='alertStyle'
                sx={{ right: '15px', bottom: '10px' }}>
                Yes
              </Button>
            </Grid>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default DeletePopUp;