const axios = require('axios').default;

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token-myapp'),
  },
});


const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token-myapp'),
  },
};

// LOGIN // REGISTER =====================================================

export async function login(username, password) {
  await instance
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
  await instance
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

// USERS ===========================================================

export function me() {
  let endpoint = '/profile';

  return instance.get(endpoint).then((res) => res.data);
}

export function getAllAccounts() {
  let endpoint = '/user';

  return instance.get(endpoint, config).then((res) => res.data);
}

export function updateUserAccess(id) {
  let endpoint = '/user/changeAccessment/' + id;

  return instance
    .put(endpoint, {}, config)
    .then((res) => res.data)
    .catch((e) => console.log(e.response));
}

// HISTORY LOGS ===================================================

export function getallLogs() {
  let endpoint = '/log';

  return instance.get(endpoint, config).then((res) => res.data);
}

export function createLog(histLog) {
  let endpoint = '/log';

  return instance.post(endpoint, histLog, config).then((res) => res.data);
}

// SPART // STORAGE ===============================================

export function getallSpart() {
  let endpoint = '/spart';

  return instance.get(endpoint, config).then((res) => res.data);
}

export function createSpart(spart) {
  let endpoint = '/spart';

  return instance.post(endpoint, spart, config).then((res) => res.data);
}

export function updateSpart(spart) {
  let endpoint = '/spart/' + spart._id;

  return instance.put(endpoint, spart, config).then((res) => res.data);
}

export function deleteSpart(id) {
  let endpoint = '/spart/' + id;

  return instance.delete(endpoint, config).then((res) => res.data);
}
