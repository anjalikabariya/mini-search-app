import axios from 'axios';

const BASE_URL = 'https://api.stackexchange.com/2.3';

export const searchStackOverflow = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        site: 'stackoverflow',
        intitle: query,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};
