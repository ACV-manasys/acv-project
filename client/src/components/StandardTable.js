import React, { useState, useEffect } from 'react';

import {
  Box, Paper,
  TableContainer, TableHead,
  Table, TableBody,
  TableRow, TableCell,
  IconButton, Button,
  DialogContentText,
  Dialog, DialogTitle,
  DialogContent, DialogActions,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function StandardTable({ headCells, data, style, deleteFunction }) {

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const getDataOnRow = (col, dataElemment) => {
    switch (col) {
      case "_id":
        return null;
      case "__v":
        return null;
      default:
        return (
          <TableCell key={col} align="center">
            {typeof dataElemment === 'number'
              ? (formatData(col, dataElemment)) : dataElemment}
          </TableCell>
        )
    }
  }

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDel = () => {
    deleteFunction(selectedRow._id);
    setOpen(false);
  }

  const formatData = (col, dataElemment) => {
    switch (col) {
      case "costIn":
      case "priceOut":
      case "price":
        return dataElemment.toLocaleString('en-US', {
          minimumFractionDigits: 2,
        });
      default:
        return dataElemment.toLocaleString('en-US');
    }
  }

  const showDeleteDataRow = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirm to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm the data row before deleting:
          </DialogContentText>
          <Box
            sx={{
              minWidth: '300px',
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align="center">{headCell.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={selectedRow._id}>
                  {Object.keys(selectedRow).map((element) => (
                    getDataOnRow(element, selectedRow[element])
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleDel} variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    );
  }

  switch (style) {
    case 'collapse':

      break;
    case 'spanning':

      break;

    default:
      return (
        <Box sx={{ width: '100%', mt: '20px' }} >
          {/* TABLE TOOLBAR */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 880 }} aria-label="caption table">
              <caption> </caption>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align="center">{headCell.label}</TableCell>
                  ))}
                  <TableCell key="edit" align="center">
                    <EditIcon />
                  </TableCell>
                  <TableCell key="delete" align="center">
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row._id}>
                    {Object.keys(row).map((element) => (
                      getDataOnRow(element, row[element],)
                    ))}
                    <TableCell key="edit" align="center">
                      <IconButton >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell key="delete" align="center">
                      <IconButton onClick={() => handleOpen(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {showDeleteDataRow()}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
  }
}

export default StandardTable;