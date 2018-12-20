// proxy set to http://localhost:3001 in package.json
import axios from 'axios';
const PRESCRIPTIONS_URL = '/prescriptions';

function getSuggestions() {
  return axios.get(`${PRESCRIPTIONS_URL}/suggestions`);
}

function createPrescription(params) {
  return axios.post(`${PRESCRIPTIONS_URL}`, params);
}

function getPrescription(id) {
  return axios.get(`${PRESCRIPTIONS_URL}/${id}`);
}

export const API = {
  getSuggestions: getSuggestions,
  createPrescription: createPrescription,
  getPrescription: getPrescription
}