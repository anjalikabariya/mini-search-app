import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2 style={{ marginTop: 20, marginBottom: 10 }}>Search Results</h2>
      <List>
        {results.map((item) => (
          <ListItem key={item.title} style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <ListItemText primary={item.title || item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SearchResults;
