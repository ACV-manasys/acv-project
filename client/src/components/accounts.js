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
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { getAllAccounts } from '../api';

function AccountsDialog({ open, setOpen }) {

  const [accounts, setAllAccounts] = useState([]);

  useEffect(() => {
    getAllAccounts().then((data) => {
      setAllAccounts(data);
    })
  }, [accounts]);

  const handleClose = () => {
    setOpen(false);
  };

  const fireNotiPanel = () => {
    //Fire the noti panel to confirm the action
  };

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
          <List>
            {accounts.map((i) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={accounts[i]} secondary={accounts[i]} />
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