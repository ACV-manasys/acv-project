import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Button,
  Grid,
} from '@mui/material';

import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import AddBoxIcon from '@mui/icons-material/AddBox';

import StandardTable from '../../../components/StandardTable';
import New from './new';
import useStyles from './styles';

import {
  getallSpart, deleteSpart,
  getallConveyor, deleteConveyor
} from '../../../api';

function Inventory() {

  const [sparts, setSparts] = useState([]);
  const [convs, setConvs] = useState([]);
  const [tab, setTab] = useState('spart');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    getallSpart().then((spartData) => {
      setSparts(spartData);
    });
    getallConveyor().then((convData) => {
      setConvs(convData);
    });
  }, []);

  const spartHeadCells = [
    {
      id: 'partNo',
      numeric: false,
      disablePadding: true,
      label: 'Part No',
    },
    {
      id: 'commodity',
      numeric: false,
      disablePadding: true,
      label: 'Commodity',
    },
    {
      id: 'specification',
      numeric: false,
      disablePadding: true,
      label: 'Specification',
    },
    {
      id: 'vieName',
      numeric: false,
      disablePadding: true,
      label: 'Vietnamese',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'price ($)',
    },
  ];

  const convHeadCells = [
    {
      id: 'machineName',
      numeric: false,
      disablePadding: true,
      label: 'Machine Name',
    },
    {
      id: 'width',
      numeric: true,
      disablePadding: true,
      label: 'Width',
    },
    {
      id: 'height',
      numeric: true,
      disablePadding: true,
      label: 'Height',
    },
    {
      id: 'costIn',
      numeric: true,
      disablePadding: true,
      label: 'Imported Cost (Đ)',
    },
    {
      id: 'priceOut',
      numeric: true,
      disablePadding: true,
      label: 'Exported Price (Đ)',
    },
    {
      id: 'note',
      numeric: false,
      disablePadding: false,
      label: 'Note',
    },
  ];

  return (
    <Container maxWidth="sm">
      <Typography
        align="center"
        color="#222222"
        style={{ fontWeight: 600, fontSize: '30px' }}>
        INVENTORY
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: '10px' }}>
        <Button variant="contained" endIcon={<AddBoxIcon />} onClick={() => setOpenAddDialog(true)}>
          add
        </Button>
        <New open={openAddDialog} setOpen={setOpenAddDialog} />
      </Grid>

      {/* INVENTORY CONTENT */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '10px',
        }}
      >
        <TabContext value={tab}>
          <Tabs
            //orientation="vertical"
            sx={{
              minHeight: '50px',
              background: '#ECECEC',
              borderRadius: '10px',
            }}
            TabIndicatorProps={{
              style: {
                width: '50px',
                height: '50px',
                margin: '10px 0px',
                borderRadius: '10px',
                background: '#3B7E7E',
                zIndex: 0,
              },
            }}
            value={tab}
            onChange={(e, newVal) => setTab(newVal)}
          >
            <Tab className={classes.tabStyle} icon={<HandymanIcon />} value="spart" />
            <Tab className={classes.tabStyle} icon={<LayersIcon />} value="conveyor" />
          </Tabs>
          <TabPanel value="spart">
            {/* SPART CURRENTLY IN STORAGE */}
            <Typography className={classes.titleStyle} align='center'> SPARE PARTS </Typography>
            <StandardTable headCells={spartHeadCells} data={sparts} deleteFunction={deleteSpart} />
          </TabPanel>
          <TabPanel value="conveyor">
            {/* CONVEYOR BELT CURRENTLY IN STORAGE */}
            <Typography className={classes.titleStyle} align='center'> CONVEYOR BELTS </Typography>
            <StandardTable headCells={convHeadCells} data={convs} deleteFunction={deleteConveyor} />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}

export default Inventory;