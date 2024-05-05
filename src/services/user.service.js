import axios from 'axios';
import authHeader from './auth-header';
import API_URL from './api';

const URL = API_URL + "/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(URL + 'all');
  }

  getUserBoard() {
    return axios.get(URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
