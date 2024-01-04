import axios from "axios";

const BASE_URL = "https://api.stackexchange.com/2.3";
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";
const GOOGLE_BASE_URL = "https://customsearch.googleapis.com/customsearch/v1";

// Stack Overflow API function
export const searchStackOverflow = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        site: "stackoverflow",
        intitle: query,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("API Error:", error);
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
        type: "track",
      },
    });

    return response.data.tracks.items;
  } catch (error) {
    console.error("Spotify API Error:", error);
    return [];
  }
};

// Google Search API function
export const searchGoogle = async (query, apiKey, searchEngineKey) => {
  try {
    const response = await axios.get(`${GOOGLE_BASE_URL}`, {
      params: {
        key: apiKey,
        cx: searchEngineKey,
        q: query,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error("Google API Error:", error);
    return [];
  }
};
