import React, { useState, useEffect } from 'react';
import {
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
  Container,
  Grid,
} from '@mui/material';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import { getAllAccounts, updateUserAccess } from '../../api';

function AccountsDisplay() {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);

  const updateAccessment = (id) => {
    updateUserAccess(id);
  }

  function stringAvatar(name, activated) {
    return {
      sx: {
        bgcolor: activated ? '#3B7E7E' : '#555555',
      },
      children: `${name[0]}`,
    };
  }

  return (
    <Container maxWidth="sm">
      <Typography
        component="h4"
        variant="h4"
        align="center"
        color="#222222"
        style={{ fontWeight: 600 }}>
        MANAGE ACCOUNTS
      </Typography>
      <Typography
        component="h4"
        variant="h5"
        align="center"
        color="#333333"
        style={{ fontWeight: 500 }}>
        View and manage access of people
      </Typography>
      {/* ACCOUNT LIST*/}
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
        <List sx={{ width: '100%', minWidth: 350 }}>
          {accounts.map((i) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar {...stringAvatar(i.name, i.activated)} />
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
                      <Grid container justifyContent="flex-end">
                        <Button
                          onClick={() => {
                            updateAccessment(i._id);
                            popupState.close();
                          }}
                          variant='contained'
                          sx={{ right: '15px', bottom: '10px' }}>
                          Yes
                        </Button>
                      </Grid>
                    </Popover>
                  </div>
                )}
              </PopupState>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default AccountsDisplay;