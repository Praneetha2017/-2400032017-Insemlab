import React, { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import "./app.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCoordinates = async (cityName) => {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;
    const response = await fetch(geoUrl);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        name: data.results[0].name,
      };
    }
    throw new Error("City not found.");
  };

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const { lat, lon, name } = await getCoordinates(cityName);
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius&forecast_days=1`;
      const response = await fetch(weatherUrl);
      const data = await response.json();
      if (response.ok && data.current_weather) {
        setWeatherData({
          name: name,
          temp: data.current_weather.temperature,
          condition: `Weather Code ${data.current_weather.weathercode}`,
          humidity: "N/A (Not available in this free endpoint)",
        });
      } else {
        setError("Could not fetch weather data.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="container">
      <h1>React Weather App (Open-Meteo)</h1>
      <WeatherForm
        city={city}
        setCity={setCity}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <hr />
      {error && <p className="error-message">Error: {error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default App;
