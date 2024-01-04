import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState("stackoverflow");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSiteChange = (e) => {
    setSelectedSite(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query, selectedSite);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "inline-flex",
          margin: "auto",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Select
          value={selectedSite}
          name="selectedSite"
          onChange={handleSiteChange}
          input={<InputBase sx={{ ml: 1, flex: 1 }} />}
          sx={{ ml: 1, flex: 1 }}
          style={{ marginLeft: 10, flex: 1 }}
        >
          <MenuItem value="stackoverflow" selected>
            Stack Overflow
          </MenuItem>
          <MenuItem value="spotify">Spotify</MenuItem>
          <MenuItem value="google">Google</MenuItem>
        </Select>
        <InputBase
          placeholder="Search"
          name="search"
          inputProps={{ "aria-label": "search wikipedia" }}
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          sx={{ ml: 1, flex: 1 }}
        />
        <IconButton type="button" onClick={handleSearch} sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
        <Button variant="contained" onClick={handleSearch} sx={{ ml: 1 }}>
          Search
        </Button>
      </Paper>
    </div>
  );
};

export default SearchBar;
