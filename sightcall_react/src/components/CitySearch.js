import React, { useState } from 'react';
import './CitySearch.css';

const CitySearch = ({ onSearch }) => {
  // State to manage the input value
  const [city, setCity] = useState('');

  // Handle input change
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSearch prop with the entered city
    onSearch(city);
  };

  return (
    <div className="city-search-container">
      <form className="city-search-form" onSubmit={handleSubmit}>
        {/* Input for city search */}
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
          className="city-search-input"
        />
        {/* Button for submitting the form */}
        <button type="submit" className="city-btn">
          <strong>Search</strong>
        </button>
      </form>
    </div>
  );
};

export default CitySearch;
