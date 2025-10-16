import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MainWeather = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || 'N/A';
  const weatherDescription = weatherData?.weather?.[0]?.description || 'N/A';
  const cityName = weatherData?.name || 'City not available';
  const countryName = weatherData?.sys?.country || 'Country not available';
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : 'Date not available';

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 24) return <WbSunnyIcon className="weather-icon-large" />;
    if (temperatureCelsius < 10) return <AcUnitIcon className="weather-icon-large" />;
    return <CloudIcon className="weather-icon-large" />;
  };

  return (
    <div className="main-weather">
      <div className="location-info">
        <h1 className="city-name">
          <LocationOnIcon />
          {cityName}, {countryName}
        </h1>
        <div className="date-info">
          <CalendarMonthIcon />
          {currentDate}
        </div>
      </div>

      <div className="weather-icon-large">
        {renderTemperatureIcon()}
      </div>

      <div className="current-temp">
        {Math.round(temperatureCelsius)}°C
      </div>

      <div className="weather-description">
        {weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
      </div>
    </div>
  );
};

export default MainWeather;