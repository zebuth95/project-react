import axios from 'axios';

// this base url will be change based on
// if you need to point to production.
const BASE_URL = "http://localhost:8000/"
const ACCESS_TOKEN = 'token'

const axiosLogin = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 5000,
  headers: {
    'Content-Type': "application/json",
    'accept': "application/json",
  },
});

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 5000,
  headers: {
    'Authorization': `Token ${window.localStorage.getItem(ACCESS_TOKEN)}`,
    'Content-Type': "application/json",
    'accept': "application/json",
  },
});


const loginUser = (username, password) => {
    const body = {username: username, password: password}
  return axiosLogin.post('login/', body)
  .then((response)=> {
    localStorage.setItem(ACCESS_TOKEN, response.data.token);
    return Promise.resolve(response.data);
  }).catch((error)=>{
    return Promise.reject(error);
  });
}

const loadProject = () => {
  return axiosInstance.get('api/project/')
  .then((response)=>{
    return Promise.resolve(response.data);
  }).catch((error)=>{
    return Promise.reject(error);
  });
}

const CreateUser = (username, email, password) => {
  const CreateBody = {username: username,email: email, password: password}
  return axiosInstance.post(`api/user/`, CreateBody)
    .then((response)=> {
      return Promise.resolve(response.data);
    }).catch((error)=>{
      return Promise.reject(error);
    });
}

const logoutUser = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
  axiosInstance.defaults.headers['Authorization'] = "";
}

export { loginUser, logoutUser, CreateUser, axiosInstance, BASE_URL, ACCESS_TOKEN }
