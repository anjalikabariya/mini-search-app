import React from 'react';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2 style={{ marginTop: 20, marginBottom: 10 }}>Search Results</h2>
      <List>
        {results.map((item) => (
          <Card key={item.cacheId || item.id || item.title} sx={{ maxWidth: '100%', margin: '16px' }}>
          {item.pagemap?.cse_thumbnail && (
            <CardMedia component="img" height="140" image={item.pagemap.cse_thumbnail[0].src} alt={item.title} />
          )}
          {item.album?.images[0] && (
            <CardMedia component="img" height="140" image={item.album.images[0].url} alt={item.name} />
          )}
          
          <CardContent>
            <Typography variant="h6">{item.title || item.name}</Typography>
            <Typography variant="body2">{item.description}</Typography>
            <a href={item.link || item.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              Go to result...
            </a>
          </CardContent>
        </Card>
        ))}
      </List>
    </div>
  );
};

export default SearchResults;
