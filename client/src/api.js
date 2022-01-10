const axios = require('axios');

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
      return Promise.resolve('Success');
    })
    .catch(function (error) {
      console.log(error.response.status);

      switch (error.response.status) {
        case 401:
        case 400:
          return Promise.reject('This username has been taken!');
        default:
          return Promise.reject('Authentication failed');
      }
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

export function getAllOtherAccounts() {
  let endpoint = '/user/findAllExcSelf';

  return instance.get(endpoint, config).then((res) => res.data);
}

export function updateUserAccess(id) {
  let endpoint = '/user/changeAccessment/' + id;

  return instance
    .put(endpoint, {}, config)
    .then((res) => res.data)
    .catch((e) => console.log(e.response));
}

export function getNames(idList) {
  let endpoint = '/user/getNames';

  return instance.post(endpoint, idList, config).then((res) => res.data);
}

export function updateUserPassword(body) {
  let endpoint = '/user/change-password';

  return instance
    .post(endpoint, body)
    .then(function (response) {
      return Promise.resolve('Success');
    })
    .catch(function (error) {
      console.log(error.response.status);

      switch (error.response.status) {
        case 401:
        case 400:
          return Promise.reject('Wrong password');
        default:
          return Promise.reject('Authentication failed');
      }
    });
}

export function updateUserData(user) {
  let endpoint = '/user';

  return instance
    .put(endpoint, user)
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

// SPART // INVENTORY ===============================================

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

// CONVEYOR // INVENTORY ===============================================

export function getallConveyor() {
  let endpoint = '/conveyor';

  return instance.get(endpoint, config).then((res) => res.data);
}

export function createConveyor(conveyor) {
  let endpoint = '/conveyor';

  return instance.post(endpoint, conveyor, config).then((res) => res.data);
}

export function updateConveyor(conveyor) {
  let endpoint = '/conveyor/' + conveyor._id;

  return instance.put(endpoint, conveyor, config).then((res) => res.data);
}

export function deleteConveyor(id) {
  let endpoint = '/conveyor/' + id;

  return instance.delete(endpoint, config).then((res) => res.data);
}

// SPART // STORAGE ===============================================

export function getallSpartStgByDate(date) {
  let endpoint = '/spartStg/findByDate';

  return instance.post(endpoint, date, config).then((res) => res.data);
}

export function createSpartStg(spartStg) {
  let endpoint = '/spartStg';

  return instance.post(endpoint, spartStg, config).then((res) => res.data);
}

export function updateSpartStg(spartStg) {
  let endpoint = '/spartStg/' + spartStg._id;

  return instance.put(endpoint, spartStg, config).then((res) => res.data);
}

export function deleteSpartStg(id) {
  let endpoint = '/spartStg/' + id;

  return instance.delete(endpoint, config).then((res) => res.data);
}

// CONVEYOR // STORAGE ===============================================

export function getallConvStgByDate(date) {
  let endpoint = '/convStg/findByDate';

  return instance.post(endpoint, date, config).then((res) => res.data);
}

export function createConvStg(convStg) {
  let endpoint = '/convStg';

  return instance.post(endpoint, convStg, config).then((res) => res.data);
}

export function updateConvStg(convStg) {
  let endpoint = '/convStg/' + convStg._id;

  return instance.put(endpoint, convStg, config).then((res) => res.data);
}

export function deleteConvStg(id) {
  let endpoint = '/convStg/' + id;

  return instance.delete(endpoint, config).then((res) => res.data);
}

// NOTES ===============================================================

export function createNote(note) {
  let endpoint = '/note';

  return instance.post(endpoint, note, config).then((res) => res.data);
}

export function getPrivateNote() {
  let endpoint = '/note/private';

  return instance.get(endpoint, config).then((res) => res.data);
}

export function getSharedNote() {
  let endpoint = '/note/shared';

  return instance.get(endpoint, config).then((res) => res.data);
}

export function deleteNote(id) {
  let endpoint = '/note/' + id;

  return instance.delete(endpoint, config).then((res) => res.data);
}

export function updateNote(note) {
  let endpoint = '/note/' + note._id;

  let setReqBody = note;
  delete setReqBody._id;
  console.log(setReqBody);
  return instance.put(endpoint, setReqBody, config).then((res) => res.data);
}

export function updateNoteImportance(id) {
  let endpoint = '/note/changeImportance/' + id;

  return instance
    .put(endpoint, {}, config)
    .then((res) => res.data)
    .catch((e) => console.log(e.response));
}

// ENGINEERS ===============================================

export function getallEngr() {
  let endpoint = '/engr';

  return instance.get(endpoint, config).then((res) => res.data);
}

export function createEngr(engr) {
  let endpoint = '/engr';

  return instance.post(endpoint, engr, config).then((res) => res.data);
}

export function updateEngr(engr) {
  let endpoint = '/engr/' + engr._id;

  return instance.put(endpoint, engr, config).then((res) => res.data);
}

export function deleteEngr(id) {
  let endpoint = '/engr/' + id;

  return instance.delete(endpoint, config).then((res) => res.data);
}