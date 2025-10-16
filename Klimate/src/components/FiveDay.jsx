import React from "react";

const FiveDay = ({ forecastData, loading, error }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('sun') || desc.includes('clear')) return '☀️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder')) return '⛈️';
    return '🌤️';
  };

  if (loading) {
    return (
      <div className="forecast-container">
        <h2>5 Days Forecast</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading forecast...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forecast-container">
        <h2>5 Days Forecast</h2>
        <div className="error-container">
          <p className="error-message">Error: {error}</p>
          <p>Unable to load forecast data</p>
        </div>
      </div>
    );
  }

  if (!forecastData || !forecastData.list || forecastData.list.length < 5) {
    return (
      <div className="forecast-container">
        <h2>5 Days Forecast</h2>
        <div className="error-container">
          <p>No forecast data available.</p>
        </div>
      </div>
    );
  }

  // Filter to get one forecast per day (around noon)
  const dailyForecasts = [];
  const processedDates = new Set();
  
  for (const item of forecastData.list) {
    const date = new Date(item.dt_txt).toDateString();
    const hour = new Date(item.dt_txt).getHours();
    
    // Get forecast around noon (12:00) for each day
    if (!processedDates.has(date) && (hour >= 11 && hour <= 14)) {
      dailyForecasts.push(item);
      processedDates.add(date);
    }
    
    if (dailyForecasts.length >= 5) break;
  }

  // If we don't have enough noon forecasts, take the first forecast of each day
  if (dailyForecasts.length < 5) {
    dailyForecasts.length = 0;
    processedDates.clear();
    
    for (const item of forecastData.list) {
      const date = new Date(item.dt_txt).toDateString();
      
      if (!processedDates.has(date)) {
        dailyForecasts.push(item);
        processedDates.add(date);
      }
      
      if (dailyForecasts.length >= 5) break;
    }
  }

  return (
    <div className="forecast-container">
      <h2>5 Days Forecast</h2>
      <div className="forecast-grid">
        {dailyForecasts.map((item, index) => (
          <div key={item.dt_txt} className="forecast-item">
            <div className="forecast-date">
              {formatDate(item.dt_txt)}
            </div>
            <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
              {getWeatherIcon(item.weather[0].description)}
            </div>
            <div className="forecast-temp">
              {Math.round(item.main.temp)}°C
            </div>
            <div className="forecast-desc">
              {item.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDay;