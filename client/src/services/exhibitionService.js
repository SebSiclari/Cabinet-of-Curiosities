import axios from 'axios';
// import { BASE_URL, API_KEY } from '@env';
const BASE_URL = 'https://api.harvardartmuseums.org/exhibition'
const API_KEY = 'd245bee6-0335-4f96-be25-1a81832090b9'

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
