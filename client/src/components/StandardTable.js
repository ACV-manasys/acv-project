import React, { useState } from 'react';

import {
  Box, Paper,
  TableContainer, TableHead,
  Table, TableBody,
  TableRow, TableCell,
  IconButton, Button,
  Dialog, DialogTitle,
  DialogContent, DialogActions,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Edit from '../pages/storage/components/editItem';
//import View from '../pages/storage/components/view';

import { createLog } from '../api';

function StandardTable({ headCells, data, style, deleteFunction, updateFunction, type, storageType }) {

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const getDataOnRow = (datarow) => {

    let returnRow = headCells.map((col) => {
      return (<TableCell key={col.label} align="center">
        {typeof col.type === 'number'
          ? (formatData(col, datarow[col.id])) : datarow[col.id]}
      </TableCell>)
    });

    return returnRow;
  }

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  }

  const handleOpenEditTab = (row) => {
    setSelectedRow(row);
    setOpenEdit(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDel = () => {
    var recordLog = {};
    switch (type) {
      case 'spart':
        recordLog = {
          activity: 'Removed spare part commodity: ' + selectedRow.commodity + ' from inventory',
          code: 1,
        };
        break;

      default:
        recordLog = {
          activity: 'Removed conveyor for machine: ' + selectedRow.machineName + ' from inventory',
          code: 1,
        };
        break;
    }

    deleteFunction(selectedRow._id);
    // Update Log
    createLog(recordLog);
    setOpen(false);
    window.location.reload();
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
        <DialogTitle>Please confirm the data row before deleting:</DialogTitle>
        <DialogContent>
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
                  {getDataOnRow(selectedRow)}
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleDel} color='alertStyle' variant="contained">Delete</Button>
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
                    {getDataOnRow(row)}
                    <TableCell key="edit" align="center" >
                      {storageType === 'inventory' ? (
                        <IconButton onClick={() => handleOpenEditTab(row)}>
                          <EditIcon />
                        </IconButton>
                      ) : (
                        <IconButton disabled>
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell key="delete" align="center">
                      <IconButton onClick={() => handleOpen(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <Edit open={openEdit} setOpen={setOpenEdit}
                  tableHeaders={headCells} updateFunction={updateFunction}
                  rawitem={selectedRow} itemType={type} storageType={storageType} />
                {showDeleteDataRow()}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
  }
}

export default StandardTable;