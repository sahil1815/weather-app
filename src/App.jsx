import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import MainWeather from "./components/MainWeather";
import TodayHighlights from "./components/TodayHighlights";
import FiveDay from "./components/FiveDay";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Dhaka");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "4d377cd8f8259ee2babf10888edcba51";

  // Fetch weather data when city changes
  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  // Fetch air quality data
  const fetchAirQualityData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirQualityData(response.data.list[0]);
    } catch (err) {
      console.error("Error fetching the air quality data:", err);
    }
  };

  // Fetch all weather data (current + forecast)
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const weatherJson = await weatherResponse.json();

      if (weatherJson.cod !== 200) {
        throw new Error(weatherJson.message || "City not found");
      }

      setWeatherData(weatherJson);
      fetchAirQualityData(weatherJson.coord.lat, weatherJson.coord.lon);

      // Fetch 5-day / 3-hour forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setFiveDayForecast(forecastResponse.data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input from Navbar
  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div className="background">
      <div className="overlay">
        <Navbar onSearch={handleSearch} />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <h2>Loading weather data...</h2>
          </div>
        ) : error ? (
          <div className="error-container">
            <h2 className="error-message">Error: {error}</h2>
            <p>Please try searching for a different city.</p>
          </div>
        ) : (
          <>
            <div className="main-content two-col-desktop">
              <section className="main-weather weather-card">
                <MainWeather weatherData={weatherData} />
              </section>

              <aside className="highlights-container ">
                <TodayHighlights
                  weatherData={weatherData}
                  airQualityData={airQualityData}
                />
              </aside>

              <section className="forecast-container">
                <FiveDay
                  forecastData={fiveDayForecast}
                  loading={loading}
                  error={error}
                />
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
