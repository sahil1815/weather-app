import React from 'react';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const TodayHighlights = ({ weatherData, airQualityData }) => {
  if (!weatherData) return null;

  const { main, wind, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    const descriptions = {
      1: { 
        text: 'Good', 
        color: '#FFFFFF',
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50'
      },
      2: { 
        text: 'Fair', 
        color: '#FFFFFF',
        backgroundColor: '#8BC34A',
        borderColor: '#8BC34A'
      },
      3: { 
        text: 'Moderate', 
        color: '#FFFFFF',
        backgroundColor: '#FF9800',
        borderColor: '#FF9800'
      },
      4: { 
        text: 'Poor', 
        color: '#FFFFFF',
        backgroundColor: '#FF5722',
        borderColor: '#FF5722'
      },
      5: { 
        text: 'Very Poor', 
        color: '#FFFFFF',
        backgroundColor: '#F44336',
        borderColor: '#F44336'
      }
    };
    return descriptions[aqi] || { 
      text: 'Unknown', 
      color: '#FFFFFF',
      backgroundColor: '#9E9E9E',
      borderColor: '#9E9E9E'
    };
  };

  const highlights = [
    {
      title: 'Humidity',
      value: `${main.humidity}%`,
      Icon: InvertColorsIcon
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      Icon: CompressIcon
    },
    {
      title: 'Visibility',
      value: `${(visibility / 1000).toFixed(1)} km`,
      Icon: VisibilityIcon
    },
    {
      title: 'Feels Like',
      value: `${Math.round(main.feels_like)}°C`,
      Icon: DeviceThermostatIcon
    }
  ];

  const aqStatus = renderAirQualityDescription(airQualityIndex);

  return (
    <div className="weather-card highlights-container">
      <h2>Today's Highlights</h2>

      {/* Weather Highlights Grid */}
      <div className="highlights-grid">
        {highlights.map((item, index) => (
          <div key={index} className="highlight-item">
            <item.Icon className="highlight-icon" />
            <div className="highlight-value">{item.value}</div>
            <div className="highlight-label">{item.title}</div>
          </div>
        ))}
      </div>

      {/* Air Quality Section */}
      {airQualityData && (
        <div className="air-quality-section">
          <div className="air-quality-header">
            <AirIcon />
            <span className="air-quality-title">Air Quality Index</span>
            <span 
              className="air-quality-status" 
              style={{ 
                backgroundColor: aqStatus.backgroundColor,
                color: aqStatus.color,
                borderColor: aqStatus.borderColor,
                fontWeight: '600',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
            >
              {aqStatus.text}
            </span>
          </div>
          <div className="air-quality-grid">
            <div className="air-quality-item">
              <div className="air-quality-label">CO</div>
              <div className="air-quality-value">{co}</div>
            </div>
            <div className="air-quality-item">
              <div className="air-quality-label">NO</div>
              <div className="air-quality-value">{no}</div>
            </div>
            <div className="air-quality-item">
              <div className="air-quality-label">NO₂</div>
              <div className="air-quality-value">{no2}</div>
            </div>
            <div className="air-quality-item">
              <div className="air-quality-label">O₃</div>
              <div className="air-quality-value">{o3}</div>
            </div>
          </div>
        </div>
      )}

      {/* Sunrise and Sunset */}
      <div className="sun-times">
        <div className="sun-times-header">
          <WbSunnyIcon />
          <span className="sun-times-title">Sunrise And Sunset</span>
        </div>
        <div className="sun-times-grid">
          <div className="sun-time-item">
            <WbSunnyIcon className="sun-icon" style={{ color: '#FF9800' }} />
            <div className="sun-time-label">Sunrise</div>
            <div className="sun-time-value">
              {new Date(sys.sunrise * 1000).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
          <div className="sun-time-item">
            <NightsStayIcon className="sun-icon" style={{ color: '#3F51B5' }} />
            <div className="sun-time-label">Sunset</div>
            <div className="sun-time-value">
              {new Date(sys.sunset * 1000).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayHighlights;
