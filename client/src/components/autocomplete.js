import React, { useState, useEffect } from 'react';
import {
  FormControl, Typography, Stack, TextField, Autocomplete, Chip
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { getAllOtherAccounts } from '../api';
import colorBoard from '../pages/note/components/colorBoard';

const useStyles = makeStyles(theme => ({
  titleInput: {
    color: colorBoard.textCol,
    fontSize: '20px',
    fontWeight: 580,
    mb: '5px',
  },
  titleInputBlack: {
    color: colorBoard.darkGrey,
    fontSize: '20px',
    fontWeight: 580,
    mb: '5px',
  },
  placeHolderWhite: {
    "& input::placeholder": {
      color: colorBoard.textCol,
      fontStyle: 'italic'
    },
    width: '518px',
  },
  placeHolderBlack: {
    "& input::placeholder": {
      color: colorBoard.darkGrey,
      fontStyle: 'italic'
    },
    width: '518px',
  },
}));

const chipStyle = {
  bgcolor: colorBoard.textCol,
  fontWeight: 550,
}

const menuGrid = {
  noteTags: ['Import', 'Export', 'Conveyor belts', 'Spare parts', 'Dept'],
  unittags: [
    'January', 'Febuary', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ],
}

export default function MakeAutoComplete({ label, name, value, setValue, type, placeholder, textColBlack }) {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    switch (type) {
      case 'visible':
        getAllOtherAccounts().then((data) => {
          setMenu(data);

          // SET DATA LIST TO SHOW:
          let dataList = [];
          // eslint-disable-next-line array-callback-return
          data.map((elem) => {
            if (value.includes(elem._id)) {
              dataList.push(elem);
            }
          });
          setData(dataList);
          //console.log(dataList);
        });
        break;
      case 'dept':
        setMenu(menuGrid.unittags);
        break;
      // NOTE TAGS
      default:
        setMenu(menuGrid.noteTags);
        setData(value);
        break;
    }
  }, [type, value]);

  const handleChange = (newVal) => {

    switch (type) {
      case 'visible':
        let idList = [];
        let newData = [];
        // eslint-disable-next-line array-callback-return
        menu.map((option) => {
          if (newVal.includes(option, 0)) {
            idList.push(option._id);
            newData.push(option);
          }
        });
        setData(newData);
        setValue((prev) => ({ ...prev, [name]: idList }));
        break;

      default:
        setValue((prev) => ({ ...prev, [name]: newVal }));
        setData(newVal);
        break;
    }
  };

  return (
    <FormControl margin="dense" variant="filled" sx={{ mt: '10px' }}>
      <Typography className={textColBlack ? classes.titleInputBlack : classes.titleInput}>
        • {label}
      </Typography>
      <Stack spacing={3} sx={{ width: 300 }}>
        {
          type === 'visible' ? (
            <Autocomplete
              multiple
              id={name}
              value={data}
              options={menu}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    sx={chipStyle}
                    label={option.name}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) =>
                <TextField
                  {...params}
                  fullWidth
                  placeholder={placeholder}
                  color="lightText"
                  classes={{ root: classes.placeHolderWhite }}
                  sx={{ input: { color: colorBoard.textCol } }} />}
              onChange={(e, newVal) => handleChange(newVal)}
            />
          ) : (
            <Autocomplete
              multiple
              id={name}
              value={data}
              options={menu}
              isOptionEqualToValue={(option, value) => option === value}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    sx={chipStyle}
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) =>
                <TextField
                  {...params}
                  placeholder={placeholder}
                  color={textColBlack ? "darkgrey" : "lightText"}
                  classes={{ root: textColBlack ? classes.placeHolderBlack : classes.placeHolderWhite }}
                  sx={{ input: { color: colorBoard.textCol } }} />}
              onChange={(e, newVal) => handleChange(newVal)}
            />
          )}
      </Stack>
    </FormControl>
  );
}