import React, { useState, useEffect } from 'react';
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogContentText,
  Button,
  Switch,
  Box,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  Popover,
  Typography,
} from '@mui/material';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { getAllAccounts, updateUserAccess } from '../api';

function AccountsDialog({ open, setOpen }) {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);

  const handleClose = () => {
    setOpen(false);
  };

  const updateAccessment = (id) => {
    updateUserAccess(id);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Manage accounts</DialogTitle>
      <DialogContent>
        <DialogContentText>
          View and manage access of people
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
          <List sx={{ width: '100%', minWidth: 300 }}>
            {accounts.map((i) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={i.name} secondary={i.username} />
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <div>
                      <Switch
                        edge="end"
                        checked={i.activated}
                        {...bindTrigger(popupState)}
                      />
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
                          Are you sure to {i.activated ? 'de-activate' : 'activate'} this account?
                        </Typography>
                        <Button
                          onClick={() => {
                            updateAccessment(i._id);
                            popupState.close();
                          }}
                          variant='contained'
                          sx={{ left: '15px', bottom: '10px' }}>
                          Yes
                        </Button>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>

    </Dialog>
  );
}

export default AccountsDialog;