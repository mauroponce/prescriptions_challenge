// proxy set to http://localhost:3001 in package.json
import axios from 'axios';
const PRESCRIPTIONS_URL = '/prescriptions';

function getSuggestions() {
  return axios.get(`${PRESCRIPTIONS_URL}/suggestions`);
}

export const API = {
  getSuggestions: getSuggestions
}