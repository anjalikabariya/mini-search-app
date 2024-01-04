import { useState, useEffect } from 'react';
import axios from 'axios';

const SPOTIFY_API_URL = 'https://accounts.spotify.com/api/token';

const useSpotifyToken = (clientId, clientSecret) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [expiresIn, setExpiresIn] = useState(0);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          SPOTIFY_API_URL,
          null,
          {
            params: {
              grant_type: 'client_credentials',
            },
            headers: {
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
          }
        );

        setToken(response.data.access_token);
        setExpiresIn(response.data.expires_in);

        // Schedule automatic refresh before the token expires
        const refreshTimeout = setTimeout(() => {
          refreshAccessToken();
        }, (response.data.expires_in - 60) * 1000); // Refresh 1 minute before expiration

        // Cleanup the timeout on component unmount
        return () => clearTimeout(refreshTimeout);
      } catch (error) {
        setError(error);
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await axios.post(
          SPOTIFY_API_URL,
          null,
          {
            params: {
              grant_type: 'client_credentials',
            },
            headers: {
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
          }
        );

        setToken(response.data.access_token);
        setExpiresIn(response.data.expires_in);

        // Schedule the next automatic refresh
        const refreshTimeout = setTimeout(() => {
          refreshAccessToken();
        }, (response.data.expires_in - 60) * 1000); // Refresh 1 minute before expiration

        // Cleanup the timeout on component unmount
        return () => clearTimeout(refreshTimeout);
      } catch (error) {
        setError(error);
      }
    };

    fetchToken();
  }, [clientId, clientSecret]);

  return { token, error };
};

export default useSpotifyToken;
