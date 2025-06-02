import React, { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";
const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fetchDefaultLocaton = async () => {
      const defaultLocation = "India";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=matric&appid=bcf9b8a824cdc3462ffabe5ceb48889a`;
      const response = await axios.get(url);
      setData(response.data);
    };
    fetchDefaultLocaton();
  }, []);
  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=matric&appid=bcf9b8a824cdc3462ffabe5ceb48889a`;
    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation("");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.error("An unexpected err occured", err);
      }
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };
  const handleKeyDown = (e)=>{
    if(e.key  === 'Enter'){
      search()
    }
  }
  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Snow":
        return <i cleassName="bx bxs-cloud-snow"></i>;
      case "Haze":
      case "Mist":
        return <i cleassName="bx bxs-cloud"></i>;
      default:
        return <i cleassName="bx bxs-cloud"></i>;
    }
  };
  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Locations..."
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {data.notFound ? (
        <div className="not-found">Data Not Found 😥</div>
      ) : (
        <div className="weather-data">
          {data.weather &&
            data.weather[0] &&
            getWeatherIcon(data.weather[0].main)}
          <div className="weather-type">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="temp">
            {data.main ? `${Math.floor(data.main.temp)}°` : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
