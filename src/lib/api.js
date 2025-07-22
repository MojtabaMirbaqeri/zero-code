import axios from 'axios';

const API_KEY = "tpsg-Gw0Un7qEXNNOanbl7TW2EnHgwAGmI3n";
const BASE_URL = "https://api.metisai.ir/openai/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export default api;


