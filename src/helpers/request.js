import axios from 'axios';

const request = axios.create({
  baseURL:'https://kjosk-sample-api.azurewebsites.net/api',
  // validateStatus: false,
});

export default request