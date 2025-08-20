import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [expiry, setExpiry] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/shorten', {
        originalUrl: url,
        customExpiry: expiry || null
      });
      
      const fullUrl = `${window.location.origin}/${response.data.shortUrl}`;
      setShortUrl(fullUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>URL Shortener</h1>
        
        <form onSubmit={handleSubmit} className="url-form">
          <div className="form-group">
            <label htmlFor="url">Enter URL to shorten:</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="expiry">Expiration (optional):</label>
            <input
              type="datetime-local"
              id="expiry"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
            <small>Leave empty for default (30 minutes)</small>
          </div>
          
          <button type="submit" className="btn">Shorten URL</button>
          
          {error && <div className="error">{error}</div>}
          
          {shortUrl && (
            <div className="result">
              <p>Your shortened URL:</p>
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="short-url"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;