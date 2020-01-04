import http from './httpService'
import { apiURL } from '../config.json'

const apiEndPoint = apiURL + "/genres"

export function getGenres() {
  return http.get(apiEndPoint);
}
