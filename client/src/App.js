import React from 'react';
import theme from './theme';

import Frontpage from './pages/frontpage/frontpage';
import Home from './pages/home/home';
import { ThemeProvider } from '@mui/material/styles';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Frontpage />} />
          {/* TO DEL LATER */}
          <Route exact path="/home" element={<Home />} />
          {/*
          <Route exact path="/home" element={<PrivateRoute />}>
            <Route exact path='/home' element={<Home />} />
          </Route>
          */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

function PrivateRoute({ children, ...rest }) {
  let auth = localStorage.getItem('token-myapp');

  return auth ? children : <Navigate to="/" />;
}

export default App;
