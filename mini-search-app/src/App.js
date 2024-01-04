// App.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { searchStackOverflow } from './components/Api';

const App = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    const searchResults = await searchStackOverflow(query);
    setResults(searchResults);
  };

  return (
    <div>
      <h1>Search App</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
};

export default App;
