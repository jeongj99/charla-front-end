import axios from 'axios';
import constructBackendURL from '../backendUtils';

export default axios.create({
  baseURL: constructBackendURL(),
  withCredentials: true,
});
