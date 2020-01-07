import http from './httpService';
import { apiURL } from '../config.json'
import jwtDecode from 'jwt-decode';

const apiEndPoint = apiURL + "/auth";
const tokenKey = "token";

export async function login(email, password) {
  const {data: jwt} = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt){
  localStorage.setItem(tokenKey, jwt);

}
export function getCurrentUser(){
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch(ex){
    return null;
  }
}

export function logout(){
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  getCurrentUser,
  logout
}