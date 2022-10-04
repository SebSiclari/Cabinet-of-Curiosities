import axios from 'axios';
//import { BASE_URL, API_KEY } from '@env';
const BASE_URL = 'https://api.harvardartmuseums.org/exhibition';
const API_KEY = 'e08d59a9-df44-4fea-a4fb-34e9addc0de2';

export async function getExhibitions() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        status: 'current',
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
