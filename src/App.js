import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import useSpotifyToken from "./hooks/useSpotifyToken";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./index.css";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  searchStackOverflow,
  searchSpotify,
  searchGoogle,
} from "./components/Api";

const YOUR_SPOTIFY_CLIENT_ID = process.env.REACT_APP_YOUR_SPOTIFY_CLIENT_ID;
const YOUR_SPOTIFY_CLIENT_SECRET =
  process.env.REACT_APP_YOUR_SPOTIFY_CLIENT_SECRET;
const YOUR_GOOGLE_API_KEY = process.env.REACT_APP_YOUR_GOOGLE_API_KEY;
const YOUR_GOOGLE_CX_KEY = process.env.REACT_APP_YOUR_GOOGLE_CX_KEY;
const App = () => {
  const [results, setResults] = useState([]);
  const { token, error } = useSpotifyToken(
    YOUR_SPOTIFY_CLIENT_ID,
    YOUR_SPOTIFY_CLIENT_SECRET
  );
  const [googleApiKey, setGoogleApiKey] = useState(YOUR_GOOGLE_API_KEY); // Add your Google API key
  const [googleCxKey, setGoogleCxKey] = useState(YOUR_GOOGLE_CX_KEY); // Add your Google API key

  // Theme state
  const [theme, setTheme] = useState("light"); // Default theme

  // Theme change handler
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // Create a dynamic theme based on the selected theme
  const customTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching Spotify token:", error);
    }
  }, [error]);

  const handleSearch = async (query, selectedSite) => {
    let searchResults = [];

    switch (selectedSite) {
      case "stackoverflow":
        searchResults = await searchStackOverflow(query);
        break;
      case "spotify":
        searchResults = await searchSpotify(query, token);
        break;
      case "google":
        searchResults = await searchGoogle(query, googleApiKey, googleCxKey);
        break;
      default:
        break;
    }
    setResults(searchResults);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <ToggleButtonGroup style={{ display: "flex", justifyContent: "center" }}>
        <ToggleButton value="light" onClick={() => handleThemeChange("light")}>
          <LightModeIcon />
        </ToggleButton>
        <ToggleButton onClick={() => handleThemeChange("dark")} value="dark">
          <DarkModeIcon />
        </ToggleButton>
      </ToggleButtonGroup>

      <Container component="main" style={{ marginTop: 30 }}>
        <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Search App
          </Typography>
          <SearchBar onSearch={handleSearch} />
          <SearchResults results={results} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
