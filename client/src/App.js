import React from 'react';
import theme from './theme';

import Frontpage from './pages/frontpage/frontpage';
import Home from './pages/home/home';
import Note from './pages/note/note';
import Storage from './pages/storage/storage';
import Contracts from './pages/contracts/contracts';
import Settings from './pages/settings/settings';
import Access from './pages/access/access';
import Unauthorized from './pages/unauthorized/unauthorized';
import Logout from './pages/unauthorized/logout';
import { ThemeProvider } from '@mui/material/styles';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* NONE-PROTECTED ROUTES */}
          <Route exact path="/" element={<Frontpage />} />
          <Route exact path="/unauthorized-access" element={<Unauthorized />} />
          <Route exact path="/log-out" element={<Logout />} />

          {/* PROTECTED ROUTES */}
          {/* FROM DRAWER */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/storage/spart" element={<Storage />} />
            <Route path="/storage/conveyor" element={<Storage />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/access" element={<Access />} />
            <Route path="/note" element={<Note />} />
          </Route>

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

function PrivateRoute({ children, ...rest }) {
  let auth = localStorage.getItem('token-myapp');

  if (!auth) {
    return (
      <Navigate
        to="/unauthorized-access" />
    );
  };

  return <Outlet />;
  //auth ? children : <Navigate to="/unauthorized-access" />;
}

export default App;
