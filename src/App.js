import React, { useState } from 'react';
import './App.css';

const api = {
  key: 'bc1dfe4a91dee1c2c13000b622f71f6a',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchPressed = () => {
    if (!search) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.cod === "404") {
          alert("City not found. Please try again.");
          setWeather(null);
        } else {
          setWeather(data);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("Error fetching data. Please try again later.");
      });
  };

  return (
    <div className="weather-card">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-icon" onClick={searchPressed}>🔍</span>
      </div>

      {/* Weather Information */}
      {loading ? (
        <p>Loading...</p>
      ) : weather ? (
        <>
          <div className="weather-icon">⛅</div>
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="city">{weather.name}</div>

          {/* Weather Condition */}
          <div className="weather-condition">{weather.weather[0].main}</div>

          {/* Additional Info */}
          <div className="details">
            <div>
              <img src="https://cdn-icons-png.flaticon.com/512/4814/4814268.png" alt="Humidity" />
              {weather.main.humidity}% Humidity
            </div>
            <div>
              <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="Wind" />
              {weather.wind.speed} km/h Wind
            </div>
          </div>
        </>
      ) : (
        <p>Enter a city to get the weather forecast.</p>
      )}
    </div>
  );
}

export default App;
