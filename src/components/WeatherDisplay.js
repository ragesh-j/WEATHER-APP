import React from 'react';

const WeatherDisplay = ({ weatherData, unit, setUnit }) => {
  if (!weatherData) {
    return <div>No data available</div>;
  }
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
   
  };

  return (
    
    <div className="weather-display">
      <h2>Current Weather in {weatherData.name}</h2>
      <p>Temperature:{unit==='metric' ? weatherData.main.temp: (weatherData.main.temp*1.8)+32} °{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Condition: {weatherData.weather[0].description}</p>
      <button  className="toggle-units"onClick={toggleUnit}>Toggle °C/°F</button>
    </div>
  );
};

export default WeatherDisplay;