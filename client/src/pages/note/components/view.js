import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Button, Box, IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Card, CardContent, CardHeader, Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';

import { createNote, updateNote } from '../../../api';
import colorBoard from './colorBoard';
import MakeAutoComplete from '../../../components/autocomplete';

const useStyles = makeStyles(theme => ({
  contentInput: {
    color: colorBoard.textCol,
  },
  titleInput: {
    color: colorBoard.textCol,
    fontSize: '20px',
    fontWeight: 580,
  },
}));

function View({ type, rawNote }) {

  const [note, setNote] = useState({});
  const [title, setTitle] = useState();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(colorBoard.themeColor);
  const [currImpt, setCurrImpt] = useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    switch (type) {
      case 'new':
        createNote(note);
        break;

      default:
        updateNote(note);
        break;
    }
    setOpen(false);
    window.location.reload();
  };

  const updateImportance = () => {
    // Change the view
    let newData = note; //// copying the old datas array
    newData.important = !note.important;

    setNote(newData);
    setCurrImpt(!currImpt);
  };

  const handleChangeColor = (col) => {
    // Change the view
    let newData = note; //// copying the old datas array
    newData.color = col;

    setNote(newData);
    setColor(col);
  }

  useEffect(() => {
    switch (type) {
      case 'new':
        setNote({
          visible: [],
          title: 'Title',
          content: '',
          color: colorBoard.themeColor,
          tags: [],
          important: false,
        });
        setTitle('NEW NOTE');
        break;
      case 'edit':
        setNote(rawNote);
        setTitle('EDIT');
        setCurrImpt(rawNote.important);
        setColor(rawNote.color);
        break;
      default:
        setNote(rawNote);
        setTitle('VIEW');
        break;
    }
  }, [rawNote, type]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '120px',
        paddingRight: '10px',
      }}
    >
      {type === 'new' ? (
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          New Note
        </Button>
      ) : (
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon sx={{ color: colorBoard.textCol }} />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: '25px', fontWeight: 600, alignSelf: 'center', color: colorBoard.darkGrey }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ justifyContent: 'center', width: '100%' }}>
            <Stack direction='row'
              sx={{
                justifyContent: 'center',
                bgcolor: colorBoard.palletebg,
                borderRadius: '20px',
                border: 6, gap: 1,
                borderColor: colorBoard.palletebg,
                mb: '5px',
              }}>
              {colorBoard.selectionBoard.map((col) => (
                col === color ?
                  (<IconButton key={col} id={col} sx={{ bgcolor: col }} size='small'>
                    <CheckIcon color='greyBorder' />
                  </IconButton>) :
                  (<IconButton key={col} id={col} style={{ width: 34, height: 34 }} sx={{ bgcolor: col }} onClick={() => handleChangeColor(col)} />)
              ))}
            </Stack>
          </Box>
          <Card sx={{ minWidth: 550 }}>
            <CardHeader
              style={{ backgroundColor: color ? color : colorBoard.themeColor }}
              title={<TextField p={2}
                id="title"
                variant="standard"
                color="lightText"
                defaultValue={note.title}
                sx={{ width: '100%' }}
                InputProps={{ className: classes.titleInput, }}
                onChange={(e) => {
                  setNote((prev) => ({ ...prev, title: e.target.value }));
                }}
              />}
            />

            <CardContent sx={{ minHeight: '100px', bgcolor: colorBoard.darkGrey }}>
              <TextField
                id="content"
                color="lightText"
                multiline
                rows={4}
                fullWidth
                defaultValue={note.content}
                InputProps={{
                  className: classes.contentInput,
                }}
                onChange={(e) => {
                  setNote((prev) => ({ ...prev, content: e.target.value }));
                }}
              />
              {/*AUTO-COMPLETE*/}
              <MakeAutoComplete
                label='Tags' name='tags'
                value={note.tags} setValue={setNote}
                type='tags' placeholder='Tag this note ...'
              />
              <MakeAutoComplete
                label='Share to' name='visible'
                value={note.visible} setValue={setNote}
                type='visible' placeholder='Share this note with ...'
              />
              <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography className={classes.titleInput}>
                  • Mark as important
                </Typography>
                <IconButton size='large' onClick={updateImportance}>
                  {currImpt ? <StarIcon sx={{ color: colorBoard.gold }} /> : <StarBorderIcon sx={{ color: colorBoard.textCol }} />}
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant='outlined'
            sx={{
              mr: '15px', mb: '10px',
              bgcolor: colorBoard.darkGrey,
              color: colorBoard.palletebg,
            }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default View;
