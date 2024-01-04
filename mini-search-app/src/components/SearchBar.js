import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState('stackoverflow');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSiteChange = (e) => {
    setSelectedSite(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query, selectedSite);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
      />
      <Select value={selectedSite} onChange={handleSiteChange} style={{ marginLeft: 10 }}>
        <MenuItem value="stackoverflow">Stack Overflow</MenuItem>
        <MenuItem value="spotify">Spotify</MenuItem>
        <MenuItem value="google">Google</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: 10 }}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
