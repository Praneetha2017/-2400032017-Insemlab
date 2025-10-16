import React from "react";

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="weather-card">
      <h2>Weather in {weatherData.name}</h2>
      <p>
        <strong>Temperature:</strong> {weatherData.temp}°C
      </p>
      <p>
        <strong>Condition:</strong> {weatherData.condition}
      </p>
      <p>
        <strong>Humidity:</strong> {weatherData.humidity}
      </p>
      <p style={{ fontSize: "0.8em", color: "#666" }}>
        *Using Open-Meteo: Humidity not in current endpoint.
      </p>
    </div>
  );
};

export default WeatherCard;
