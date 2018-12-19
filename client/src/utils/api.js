// proxy set to http://localhost:3001 in package.json
import axios from 'axios';
const PRESCRIPTIONS_URL = '/prescriptions';

function getSuggestions() {
  return axios.get(`${PRESCRIPTIONS_URL}/suggestions`);
}

function createSuggestion(params) {
  return axios.post(`${PRESCRIPTIONS_URL}`, params);
}

export const API = {
  getSuggestions: getSuggestions,
  createSuggestion: createSuggestion
}