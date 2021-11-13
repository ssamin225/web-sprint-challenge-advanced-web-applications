import axios from 'axios';
import { API_URL_Base } from './../constants';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: API_URL_Base,
        headers: {
          authorization: token
        }
    })
}

export default axiosWithAuth;

//Task List:
//1. Complete axiosWithAuth