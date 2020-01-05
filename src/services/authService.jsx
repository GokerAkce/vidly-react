import http from './httpService';
import { apiURL } from '../config.json'

const apiEndPoint = apiURL + "/auth";


export function login(email, password) {
  return http.post(apiEndPoint, { email, password });
}