import axios from 'axios';

const instance = axios.create({baseURL: 'https://salon-prauge-admin-server.herokuapp.com/'});
export default instance
