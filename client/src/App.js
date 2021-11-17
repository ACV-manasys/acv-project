import React from 'react';
import theme from './theme';

import Frontpage from './pages/frontpage/frontpage';
import { ThemeProvider } from '@mui/material/styles';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Frontpage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
