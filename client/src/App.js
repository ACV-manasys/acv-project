import React from 'react';
import theme from './theme';

import Frontpage from './pages/frontpage/frontpage';
import Home from './pages/home/home';
import Unauthorized from './pages/unauthorized/unauthorized';
import Logout from './pages/unauthorized/logout';
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
          {/*NONE-PROTECTED ROUTES*/}
          <Route exact path="/" element={<Frontpage />} />
          <Route exact path="/unauthorized-access" element={<Unauthorized />} />
          <Route exact path="/log-out" element={<Logout />} />

          {/*PROTECTED ROUTES*/}
          <Route exact path='/home' element={<PrivateRoute />}>
            <Route exact path='/home' element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

function PrivateRoute({ children, ...rest }) {
  let auth = localStorage.getItem('token-myapp');

  return (
    <Routes>
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Navigate
              to={{
                pathname: '/unauthorized-access',
                state: { from: location },
              }}
            />
          )
        }
      />
    </Routes>
  );
  //auth ? children : <Navigate to="/unauthorized-access" />;
}

export default App;
