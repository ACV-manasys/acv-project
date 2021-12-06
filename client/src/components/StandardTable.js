import React, { useState, useEffect } from 'react';

import {
  Box,
  Typography,
  Container,
} from '@mui/material';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function StandardTable({ headCells, colNo, data, }) {
  return;
}

export default StandardTable;