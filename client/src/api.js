const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token-myapp'),
  },
});

/*
const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token-myapp'),
  },
};
*/

export async function login(username, password) {
  await axios
    .post('/login', {
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response);
      localStorage.setItem('token-myapp', response.data.token);
      instance.headers = { Authorization: `bearer ${response.data.token}` };
      window.location.href = '/home';
    })
    .catch(function (error) {
      //console.log(error.response.status);
      return Promise.reject(error.response.status);
    });
}

export async function registerUserdata(userdata) {
  await axios
    .post('/register', {
      name: userdata.name,
      username: userdata.username,
      password: userdata.password,
      email: userdata.email,
    })
    .then(function (response) {
      //localStorage.setItem('token-myapp', response.data.token);
      //instance.headers = { Authorization: `bearer ${response.data.token}` };
      //window.location.href = '/home';
      return Promise.resolve(response);
    })
    .catch(function (error) {
      console.log(error.response.status);
      //return Promise.reject(error.response.data.message);
      return Promise.reject(error.response);
    });
}

export function me() {
  let endpoint = '/profile';

  return instance.get(endpoint).then((res) => res.data);
}