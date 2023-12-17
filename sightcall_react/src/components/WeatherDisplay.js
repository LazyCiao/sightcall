import React, { useState, useEffect } from 'react';
import './WeatherDisplay.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

// WeatherDisplay component
const WeatherDisplay = ({ city }) => {
  // State variables
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState(null);

  // Function to format time based on timestamp and temperature unit
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: !isCelsius, 
    };
    return date.toLocaleTimeString(undefined, options);
  };

  // Function to get the background image based on weather description
  const getImageForDescription = (description) => {
    const lowerCaseDescription = (description || '').toLowerCase();

    // Determine the background image based on weather description
    if (lowerCaseDescription.includes('clear sky')) {
      return 'clear_skies.jpg';
    } else if (lowerCaseDescription.includes('fog') || lowerCaseDescription.includes('mist') || lowerCaseDescription.includes('haze')) {
      return 'fog.jpg';
    } else if (lowerCaseDescription.includes('thunderstorm')) {
      return 'thunderstorm.jpg';
    } else if (lowerCaseDescription.includes('rain')) {
      return 'rain1.jpg';
    } else if (lowerCaseDescription.includes('cloud')) {
      return 'cloudy1.jpg';
    } else if (lowerCaseDescription.includes('snow')) {
      return 'snow1.jpg';
    } else {
      return '14.jpg';
    }
  };

  // Effect to set background image when weather data changes
  useEffect(() => {
    const body = document.body;
    const backgroundImage = getImageForDescription(weatherData?.[0]?.description);
    body.style.backgroundImage = `url(/${backgroundImage})`;

    return () => {
      // Clean up: Reset background image when the component is unmounted
      body.style.backgroundImage = '';
    };
  }, [weatherData]);

  // Effect to fetch weather data when the city changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://sightcall-django-e79763a0e8db.herokuapp.com/api/weather/${city}`);
        const data = await response.json();

        if (!response.ok) {
          console.error('Error fetching weather data:', data);
          setError('City not found. Please try again.');
          return;
        }

        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('An error occurred. Please try again.');
      }
    };

    fetchWeatherData();
  }, [city]);

  // Function to handle temperature unit toggle
  const handleToggle = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  // Display error message if there is an error
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Display message if weather data is not available
  if (!weatherData || !weatherData[0]) {
    return <div className="message">City not found. Please try again.</div>;
  }

  // Calculate temperature based on the selected unit
  const temperature = isCelsius
    ? (weatherData[0]?.temperature - 273.15)?.toFixed(2)
    : ((weatherData[0]?.temperature - 273.15) * 1.8 + 32)?.toFixed(2);

  // Display error message if temperature is not a number
  if (isNaN(temperature)) {
    return <div>Error: Invalid temperature data.</div>;
  }

  // Function to capitalize the first letter of each word
  const capitalizeEveryWord = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Determine the temperature unit based on the selected unit
  const temperatureUnit = isCelsius ? '°C' : '°F';

  // Render the WeatherDisplay component
  return (
    <div className="weather-container text-center">
      {/* Display city name with each word capitalized */}
      <h2 className="mb-4">{capitalizeEveryWord(weatherData[0].city)}</h2>
      {/* Display weather information in a row */}
      <div className="row justify-content-center">
        {/* Temperature */}
        <div className="desk col-md-1 col-6">
          <div>{`Temperature:`}</div>
          <div><strong>{`${temperature} ${temperatureUnit}`}</strong></div>
        </div>

        {/* Description */}
        <div className="desk col-md-1 col-6">
          <div>{`Description:`}</div>
          <div><strong>{weatherData[0].description}</strong></div>
        </div>

        {/* Humidity */}
        <div className="desk col-md-1 col-6">
          <div>{`Humidity:`}</div>
          <div><strong>{weatherData[0].humidity}%</strong></div>
        </div>

        {/* Wind Speed */}
        <div className="desk col-md-1 col-6">
          <div>{`Wind Speed:`}</div>
          <div><strong>{weatherData[0].wind_speed} m/s</strong></div>
        </div>

        {/* Cloudiness */}
        <div className="desk col-md-1 col-6">
          <div>{`Cloudiness:`}</div>
          <div><strong>{weatherData[0].cloudiness}%</strong></div>
        </div>

        {/* Sunrise */}
        <div className="desk col-md-1 col-6">
          <div>{`Sunrise:`}</div>
          <div><strong>{formatTime(weatherData[0].sunrise)}</strong></div>
        </div>

        {/* Sunset */}
        <div className="desk col-md-1 col-6">
          <div>{`Sunset:`}</div>
          <div><strong>{formatTime(weatherData[0].sunset)}</strong></div>
        </div>

        {/* Temperature Unit Toggle */}
        <div className="desk col-md-1 col-6">
          {/* Toggle switch for temperature unit */}
          <label className="switch">
            <input type="checkbox" checked={isCelsius} onChange={handleToggle} />
            <span className="slider round"></span>
          </label>
          {/* Display the selected temperature unit */}
          <div><strong>{isCelsius ? '°C' : '°F'}</strong></div>
        </div>
      </div>
    </div>
  );
};

// Export the WeatherDisplay component
export default WeatherDisplay;
