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
  Grid,
} from '@mui/material';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import { getAllAccounts, updateUserAccess, createLog } from '../../api';
import { Loading } from '../../components/backdrop';
import accessRoutes from './components/routes';
import CustomTabs from '../../components/CustomTabs';

function AccountsDisplay() {

  const [accounts, setAccounts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
      setLoading(false);
    })
  }, [accounts]);

  const updateAccessment = (id, activated, username) => {
    var recordLog = {};
    switch (activated) {
      case false:
        recordLog = {
          activity: 'Activated account username: ' + username,
          code: 5,
        }
        break;

      default:
        recordLog = {
          activity: 'De-activated account username: ' + username,
          code: 6,
        }
        break;
    }
    updateUserAccess(id);
    createLog(recordLog);
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
    <Box>
      <CustomTabs tab="accounts" title='MANAGE ACCOUNTS' routes={accessRoutes} active='Access' />
      <Typography
        sx={{ paddingLeft: '100px', }}
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
          paddingLeft: '100px',
        }}
      >
        {isLoading ? (<Loading />) : null}
        <List sx={{ width: '100%', minWidth: 350 }}>
          {accounts.map((i) => (
            <ListItem key={i._id}>
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
                            updateAccessment(i._id, i.activated, i.username);
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
    </Box>
  );
}

export default AccountsDisplay;