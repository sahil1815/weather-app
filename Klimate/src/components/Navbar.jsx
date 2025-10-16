import React from 'react';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({ onSearch }) => {
  const [searchedCity, setSearchedCity] = React.useState('');

  const handleClick = () => {
    if (searchedCity.trim()) {
      onSearch(searchedCity);
      setSearchedCity('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <nav className="nav-bar">
      {/* Left Portion - Brand */}
      <div className="nav-brand">
        <FilterDramaIcon sx={{ fontSize: '2rem' }} />
        Klimate
      </div>

      {/* Middle Portion - Search */}
      <div className="nav-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a city..."
          value={searchedCity}
          onChange={(e) => setSearchedCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-btn" onClick={handleClick}>
          <SearchIcon />
          Search
        </button>
      </div>

      {/* Right Portion - Current Location */}
      <button className="location-btn">
        <GpsFixedIcon />
        Current Location
      </button>
    </nav>
  );
};

export default Navbar;