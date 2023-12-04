import React, { useState } from 'react';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const App = () => {
  const [searchedCity, setSearchedCity] = useState('');

  const handleSearch = (city) => {
    setSearchedCity(city);
  };

  return (
    <div className="container">
      <CitySearch onSearch={handleSearch} />
      {searchedCity && <WeatherDisplay city={searchedCity} />}
    </div>
  );
};

export default App;