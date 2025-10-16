import React from "react";

const WeatherForm = ({ city, setCity, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        placeholder="Enter city name (e.g., London)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Get Weather"}
      </button>
    </form>
  );
};

export default WeatherForm;
