import axios from 'axios';

const BASE_URL = 'https://api.stackexchange.com/2.3';
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
const GOOGLE_BASE_URL = 'https://www.googleapis.com/customsearch/v1';
const WIKIPEDIA_BASE_URL = 'https://en.wikipedia.org/w/api.php';
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

// Stack Overflow API function
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

// Spotify API function
export const searchSpotify = async (query, token) => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'track',
      },
    });

    return response.data.tracks.items;
  } catch (error) {
    console.error('Spotify API Error:', error);
    return [];
  }
};

// Google Search API function
export const searchGoogle = async (query, apiKey) => {
  try {
    const response = await axios.get(`${GOOGLE_BASE_URL}`, {
      params: {
        q: query,
        key: apiKey,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('Google API Error:', error);
    return [];
  }
};

// Wikipedia API function
export const searchWikipedia = async (query) => {
  try {
    const response = await axios.get(`${WIKIPEDIA_BASE_URL}`, {
      params: {
        action: 'opensearch',
        search: query,
        format: 'json',
      },
    });

    return response.data[1];
  } catch (error) {
    console.error('Wikipedia API Error:', error);
    return [];
  }
};

// Giphy API function
export const searchGiphy = async (query, apiKey) => {
  try {
    const response = await axios.get(`${GIPHY_BASE_URL}/search`, {
      params: {
        q: query,
        api_key: apiKey,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Giphy API Error:', error);
    return [];
  }
};
