import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const API_KEY = "48b08206c0de3c36e6260542fdbde846";

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const result = await res.json();

      if (result.cod !== 200) {
        alert("City not found ❌");
        return;
      }

      setData(result);
    } catch {
      alert("Error fetching data ❌");
    }
  };

  return (
    <div className="app">
      <div className="weather-card">

        <h1>🌦 Weather</h1>

        <div className="search">
          <input
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>🔍</button>
        </div>

        {data && (
          <div className="weather-info">
            <h2>{data.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt="icon"
            />

            <h1>{data.main.temp}°C</h1>
            <p>{data.weather[0].main}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
