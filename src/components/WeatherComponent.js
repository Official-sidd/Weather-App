import React from "react";
import clearDay from "../weather-icons/clear-day.png";
import clearNight from "../weather-icons/clear-night.png";
import cloudy from "../weather-icons/cloudy.png";
import fog from "../weather-icons/fog.png";
import hail from "../weather-icons/hail.png";
import partlyCloudyDay from "../weather-icons/partly-cloudy-day.png";
import partlyCloudyNight from "../weather-icons/partly-cloudy-night.png";
import rainSnowShowersDay from "../weather-icons/rain-snow-showers-day.png";
import rainSnowShowersNight from "../weather-icons/rain-snow-showers-night.png";
import rainSnow from "../weather-icons/rain-snow.png";
import rain from "../weather-icons/rain.png";
import showersDay from "../weather-icons/showers-day.png";
import showersNight from "../weather-icons/showers-night.png";
import sleet from "../weather-icons/sleet.png";
import snowShowersDay from "../weather-icons/snow-showers-day.png";
import snowShowersNight from "../weather-icons/snow-showers-night.png";
import snow from "../weather-icons/snow.png";
import thunderRain from "../weather-icons/thunder-rain.png";
import thunderShowersDay from "../weather-icons/thunder-showers-day.png";
import thunderShowersNight from "../weather-icons/thunder-showers-night.png";
import thunder from "../weather-icons/thunder.png";
import wind from "../weather-icons/wind.png";

const WeatherIcon = (weatherType) => {
  const iconMap = {
    "clear-day": clearDay,
    "clear-night": clearNight,
    cloudy: cloudy,
    fog: fog,
    hail: hail,
    "partly-cloudy-day": partlyCloudyDay,
    "partly-cloudy-night": partlyCloudyNight,
    "rain-snow-showers-day": rainSnowShowersDay,
    "rain-snow-showers-night": rainSnowShowersNight,
    "rain-snow": rainSnow,
    rain: rain,
    "showers-day": showersDay,
    "showers-night": showersNight,
    sleet: sleet,
    "snow-showers-day": snowShowersDay,
    "snow-showers-night": snowShowersNight,
    snow: snow,
    "thunder-rain": thunderRain,
    "thunder-showers-day": thunderShowersDay,
    "thunder-shower-night": thunderShowersNight,
    thunder: thunder,
    wind: wind,
  };

  return iconMap[weatherType] || clearDay;
};

const WeatherComponent = (props) => {
  return <img src={WeatherIcon(props?.weatherType)} style={{filter: "invert(100%)"}} alt="icon" />;
};

export default WeatherComponent;
