import axios from 'axios';

const API_KEY = "tpsg-0yBa3HrigYmYh9PqstVmaFr8nrSZVg6";
const BASE_URL = "https://api.metisai.ir/api/v1/wrapper/openai";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export default api;


