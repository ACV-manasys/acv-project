import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Popover,
  Grid,
  Button,
  Stack,
  Chip,
} from '@mui/material';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteNote, updateNoteImportance } from '../../../api';
import colorBoard from './colorBoard';

function Layout({ type, noteList }) {
  const [notes, setNotes] = useState([]);
  //const [selected, setSelected] = useState({});

  useEffect(() => {
    setNotes(noteList);
  }, [noteList]);

  const handleMarkImportant = (id, index) => {
    updateNoteImportance(id);
    // Change the view
    let newData = [...notes]; //// copying the old datas array
    newData[index].important = !notes[index].important;

    setNotes(newData);
  }

  const handleDelete = (id) => {
    deleteNote(id);
    window.location.reload();
  }

  const showVisible = (names) => {
    switch (type) {
      case 'shared':
        return (
          <Box sx={{ mt: '20px' }}>
            <Typography sx={{ color: colorBoard.textCol, fontWeight: 480 }}>
              • Visible to:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: '5px' }}>
              {names.map((name, index) => (
                <Chip key={index} label={name} sx={{ bgcolor: colorBoard.textCol, fontWeight: 500 }} />
              ))}
            </Stack>
          </Box>
        );

      default:
        return;
    }
  }

  const showtags = (tags) => {
    return (
      <Box sx={{ mt: '20px' }}>
        <Typography sx={{ color: colorBoard.textCol, fontWeight: 480 }}>
          • Tags:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: '5px' }}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} sx={{ bgcolor: colorBoard.textCol, fontWeight: 500 }} />
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        paddingLeft: '180px',
        paddingRight: '10px',
        mt: '20px',
      }}
    >
      {notes.map((note, index) => (
        <Card key={index} sx={{ minWidth: 300, mr: '30px', mb: '30px' }}>
          <CardHeader
            sx={{ bgcolor: note.color }}
            titleTypographyProps={{
              color: colorBoard.textCol,
              fontWeight: 580,
              fontSize: '20px',
            }}
            title={note.title}
            action={
              <IconButton aria-label="edit">
                <EditIcon sx={{ color: colorBoard.textCol }} />
              </IconButton>
            }
          />
          <CardContent sx={{ maxHeight: '100%', bgcolor: colorBoard.darkGrey }}>
            <Typography variant="body" color="text.primary" sx={{ color: colorBoard.textCol }}>
              {note.content}
            </Typography>
            {showtags(note.tags)}
            {showVisible(note.names)}
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: 'flex-end', bgcolor: colorBoard.midnight }} >
            <IconButton aria-label="mark important" onClick={() => handleMarkImportant(note._id, index)}>
              {note.important ? <StarIcon sx={{ color: colorBoard.gold }} /> : <StarBorderIcon sx={{ color: colorBoard.textCol }} />}
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon sx={{ color: colorBoard.textCol }} />
            </IconButton>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <IconButton aria-label="delete" {...bindTrigger(popupState)}>
                    <DeleteIcon sx={{ color: colorBoard.textCol }} />
                  </IconButton>
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
                    <Typography sx={{ p: 2, width: '300px' }}>
                      This note will be permanently removed in other shared accounts as well (if any)!
                      Are you sure to delete this note?
                    </Typography>
                    <Grid container justifyContent="flex-end">
                      <Button
                        onClick={() => {
                          handleDelete(note._id);
                          popupState.close();
                        }}
                        variant='contained' color='alertStyle'
                        sx={{ right: '15px', bottom: '10px' }} >
                        Yes
                      </Button>
                    </Grid>
                  </Popover>
                </div>
              )}
            </PopupState>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default Layout;
