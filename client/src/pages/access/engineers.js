import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import {
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from '@mui/material';

import EngineeringIcon from '@mui/icons-material/Engineering';

import { getallEngr, deleteEngr } from '../../api';
import { Loading } from '../../components/backdrop';
import Form from './components/form';
import accessRoutes from './components/routes';
import CustomTabs from '../../components/CustomTabs';
import DeletePopUp from '../../components/delPopup';


const textStyle = {
  color: "#222222",
  fontSize: '14px',
  fontWeight: 480,
};

function EngineerList() {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getallEngr().then((data) => {
      setData(data);
      setLoading(false);
    })
  }, [data]);

  return (
    <Box >
      <CustomTabs tab="engr" title='ENGINEERS' routes={accessRoutes} active='Access' />
      {/* ADD FUNCTIONALITY */}
      <Form type='Add' />
      {/*LIST CONTENT*/}
      <Box
        noValidate
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 'auto',
          width: 'fit-content',
          paddingLeft: '100px',
          mt: '20px',
        }}
      >
        <Stack sx={{ width: '100%', gap: 2 }}>
          {isLoading ? (<Loading />) : null}
          {data.map((i) => (
            <Card sx={{ width: '100%', borderRadius: '25px' }} key={i._id}>
              <CardHeader
                sx={{ bgcolor: '#333333', height: '35px' }}
                avatar={
                  <Avatar sx={{ bgcolor: '#EEEEEE' }} >
                    <EngineeringIcon color='darkgrey' />
                  </Avatar>
                }
                action={
                  <Stack direction='row'>
                    <Form type='Edit' rawData={i} iconCol='#EEEEEE' />
                    <DeletePopUp iconCol='#EEEEEE' item='engineer info' itemId={i._id} delFunction={deleteEngr} />
                  </Stack>
                }
                title={i.name}
                subheader={i.resp}
                titleTypographyProps={{ fontWeight: 580, fontSize: '18px', color: '#EEEEEE' }}
                subheaderTypographyProps={{ fontWeight: 550, fontSize: '15px', color: '#EEEEEE' }}
              />
              <CardContent>
                <Typography sx={textStyle}>
                  Phone Number: {i.phoneNumber} - Email: {i.email}
                </Typography>
                <Typography sx={textStyle}>
                  DOB: {dayjs(i.dob).format('DD-MM-YYYY')}
                </Typography>
                <Typography sx={textStyle}>
                  Date joined: {dayjs(i.joinedDate).format('DD-MM-YYYY')}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default EngineerList;