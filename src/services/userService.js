import http from './httpService';
import { apiURL } from '../config.json'

const apiEndPoint = apiURL + "/users";


export function register(user) {
  return http.post(apiEndPoint, {
      email: user.username,
      password: user.password,
      name: user.name
  });
}