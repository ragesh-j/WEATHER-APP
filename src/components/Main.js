import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchCity from './SearchCity';
import WeatherDisplay from './WeatherDisplay';
import FavoriteCities from './FavoriteCities';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric'); 

  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      fetchWeather(savedCity);
    }
    fetchFavorites();
  }, []);

  const fetchWeather = async (city) => {
    try {
      const apiKey = "d370f712cdf82db75dc43e7c5b49f5d1";
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
      setWeatherData(response.data);
      setCity(city);
      localStorage.setItem('lastCity', city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorite cities:', error);
    }
  };

  const addFavorite = async (city) => {
    try {
      const response = await axios.post('http://localhost:5000/favorites', { city });
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error('Error adding favorite city:', error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Error removing favorite city:', error);
    }
  };

  return (
    <div className="weather-dashboard">
      <SearchCity onSearch={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} unit={unit} setUnit={setUnit} />
      <button onClick={() => addFavorite(city)}>Add to Favorites</button>
      <FavoriteCities favorites={favorites} onRemove={removeFavorite} onSelect={fetchWeather} />{ console.log(unit)}
    </div>
  );
};

export default WeatherDashboard;