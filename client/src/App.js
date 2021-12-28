import React from 'react';
import theme from './theme';

import Frontpage from './pages/frontpage/frontpage';
import Home from './pages/home/home';
import Note from './pages/note/note';
import Shared from './pages/note/shared';
import Storage from './pages/storage/storage';
import Sparepart from './pages/storage/sparepart';
import Conveyor from './pages/storage/conveyor';
import Contracts from './pages/depts/contracts';
import Settings from './pages/settings/settings';
import HistoryLog from './pages/access/history';
import AccountsDisplay from './pages/access/accounts';
import EngineerList from './pages/access/engineers';
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
            <Route path="/storage/spart" element={<Sparepart />} />
            <Route path="/storage/conveyor" element={<Conveyor />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/access" element={<HistoryLog />} />
            <Route path="/access/accounts" element={<AccountsDisplay />} />
            <Route path="/access/engr" element={<EngineerList />} />
            <Route path="/note" element={<Note />} />
            <Route path="/note/shared" element={<Shared />} />
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
