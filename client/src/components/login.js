import React, { useEffect, useState } from 'react';

function Login({ open, setOpen, setUsers, progressing }) {
  // FOR LOGIN TAB ********************************
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState();

  // FOR REGISTER TAB *****************************
  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
  });

  // GENERAL **************************************
  const handleClose = () => {
    setOpen(false);
  };

  return;
}

export default Login;
