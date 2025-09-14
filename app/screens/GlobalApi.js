import axios from 'axios';

const BASE_URL='http://192.168.1.100:3000/api/bardapi'

const getBardApi = (userMsg) =>
  axios.post(BASE_URL, { question: userMsg }); 

export default {
  getBardApi,
};