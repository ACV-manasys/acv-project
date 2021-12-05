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

import { } from '../api';

function HistoryLog() {

  const [log, setLog] = useState([]);

  /*
  useEffect(() => {
    getAllAccounts().then((data) => {
      setAccounts(data);
    })
  }, [accounts]);*/

  return (
    <Container maxWidth="sm">
      <Typography
        component="h4"
        variant="h4"
        align="center"
        color="#222222"
        style={{ fontWeight: 600 }}>
        History Log
      </Typography>
      {/* LOG CONTENT */}
      {/* 
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
      */}
    </Container>
  );
}

export default HistoryLog;