import * as React from 'react';
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
  placeHolder: {
    "& input::placeholder": {
      color: colorBoard.textCol,
      fontStyle: 'italic'
    },
    width: '518px',
  },
}));

const menuGrid = {
  noteTags: [
    { name: 'Import', _id: 'Import', },
    { name: 'Export', _id: 'Export', },
    { name: 'Conveyor belts', _id: 'Conveyor belts', },
    { name: 'Spare parts', _id: 'Spare parts', },
    { name: 'Dept', _id: 'Dept', },
  ]
}

export default function MakeAutoComplete({ label, name, value, setValue, type, placeholder, freeSolo }) {
  const [data, setData] = React.useState([]);
  const [menu, setMenu] = React.useState([]);

  const classes = useStyles();

  React.useEffect(() => {
    switch (type) {
      case 'visible':
        getAllOtherAccounts().then((data) => {
          setMenu(data);
        });
        // SET DATA LIST TO SHOW:
        var dataList = [];
        menu.map((each) => {
          if (value.includes(each._id)) {
            dataList.push(each);
          }
        });
        setData(dataList);
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
        // eslint-disable-next-line array-callback-return
        menu.map((option) => {
          if (newVal.includes(option.name, 0)) {
            idList.push(option._id);
          }
        });
        console.log(idList);
        setValue((prev) => ({ ...prev, [name]: idList }));
        break;

      default:
        setValue((prev) => ({ ...prev, [name]: newVal }));
        break;
    }
  };

  return (
    <FormControl margin="dense" variant="filled" sx={{ mt: '10px' }}>
      <Typography className={classes.titleInput}>
        • {label}
      </Typography>
      <Stack spacing={3} sx={{ width: 300 }}>
        <Autocomplete
          multiple
          id={name}
          value={data}
          options={menu.map((option) => option.name)}
          freeSolo={freeSolo}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                sx={{ bgcolor: colorBoard.textCol, fontWeight: 550 }}
                label={option}
                {...getTagProps({ index })} // FIX HERE PLEASEEEEEEE!!!
                onDelete={() => {
                  setValue((prev) => ({
                    ...prev,
                    [name]: data.filter((elem) => elem !== option),
                  }));
                  setData(data.filter((elem) => elem !== option));
                }}
              />
            ))
          }
          renderInput={(params) =>
            <TextField
              {...params}
              placeholder={placeholder}
              color="lightText"
              classes={{ root: classes.placeHolder }}
              sx={{ input: { color: colorBoard.textCol } }} />}
          onChange={(e, newVal) => {
            setData(newVal);
            handleChange(newVal);
          }}
        />
      </Stack>
    </FormControl>
  );
}