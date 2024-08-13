import React, { createContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import WeatherInput from "./components/WeatherInput";
import TodayConditions from "./components/TodayConditions";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import clearSkyIcon from "./assets/clear-sky.png";
import moonCloudIcon from "./assets/moon_cloud.png";
import cloudIcon from "./assets/cloud.png";
import cloudyIcon from "./assets/cloudy.png";
import drizzleIcon from "./assets/drizzle.png";
import mistIcon from "./assets/mist.png";
import rainIcon from "./assets/rain.png";
import moonRainIcon from "./assets/moon_rain.png";
import snowIcon from "./assets/snow.png";
import sunIcon from "./assets/sun.png";
import moonIcon from "./assets/moon.png";
import thunderIcon from "./assets/thunder.png";

export const DataContext = createContext();

const App = () => {
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState();
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [query, setQuery] = useState({ q: "Chennai" });
  const [units, setUnits] = useState("metric");
  const weatherIconMap = {
    "01d": sunIcon,
    "01n": moonIcon,
    "02d": clearSkyIcon,
    "02n": moonCloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": cloudyIcon,
    "04n": cloudyIcon,
    "09d": drizzleIcon,
    "09n": drizzleIcon,
    "10d": rainIcon,
    "10n": moonRainIcon,
    "11d": thunderIcon,
    "11n": thunderIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": mistIcon,
    "50n": mistIcon,
  };

  const API_KEY = "1b22107d8cd2e68689754975bbc07a11";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/";
  const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({
      ...searchParams,
      appid: API_KEY,
      units,
    });
    return url;
  };

  const formatToLocalTime = (
    secs,
    offset,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

  useEffect(() => {
    const search = async () => {
      const WEATHERURL = getWeatherData("weather", { ...query, units });
      try {
        const weatherData = (await axios.get(WEATHERURL)).data;
        if (weatherData.cod === "404") {
          console.error("City not found");
          return;
        }
        const lon = weatherData.coord.lon;
        const lat = weatherData.coord.lat;
        const FORECASTURL = getWeatherData("forecast", {
          lon,
          lat,
          units,
        });
        try {
          const forecastData = (await axios.get(FORECASTURL)).data;
          setHourly(
            forecastData.list
              .filter((f) => f.dt > weatherData.dt)
              .map((f) => ({
                date: formatToLocalTime(f.dt, weatherData.timezone, "dd/LL"),
                time: formatToLocalTime(f.dt, weatherData.timezone, "hh:mm a"),
                icon: weatherIconMap[f.weather[0].icon],
                description: f.weather[0].description,
                temp: f.main.temp.toFixed(),
              }))
              .slice(0, 8)
          );
          setDaily(
            forecastData.list
              .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
              .map((f) => ({
                day: formatToLocalTime(f.dt, weatherData.timezone, "ccc"),
                date: formatToLocalTime(f.dt, weatherData.timezone, "dd/LL"),
                icon: weatherIconMap[f.weather[0].icon],
                description: f.weather[0].description,
                low: f.main.temp_min.toFixed(),
                high: f.main.temp_max.toFixed(),
                wind: f.wind.speed.toFixed(),
                humidity: f.main.humidity,
              }))
          );
        } catch (error) {
          console.error("An error occurred : ", error.message);
        }
        setCity(weatherData.name);
        setCountry(weatherData.sys.country);
        setDate(formatToLocalTime(weatherData.dt, weatherData.timezone));
        const weatherIconCode = weatherData.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode]);
        setTemp(weatherData.main.temp.toFixed());
        setDescription(weatherData.weather[0].description);
        setHigh(weatherData.main.temp_max.toFixed());
        setLow(weatherData.main.temp_min.toFixed());
        setWind(weatherData.wind.speed.toFixed());
        setHumidity(weatherData.main.humidity);
        setSunrise(
          formatToLocalTime(
            weatherData.sys.sunrise,
            weatherData.timezone,
            "hh:mm a"
          )
        );
        setSunset(
          formatToLocalTime(
            weatherData.sys.sunset,
            weatherData.timezone,
            "hh:mm a"
          )
        );
      } catch (error) {
        console.error("An error occurred : ", error.message);
      }
    };
    search();
  }, [query, units]);

  return (
    <>
      <DataContext.Provider
        value={{
          setQuery,
          units,
          setUnits,
          text,
          setText,
          city,
          country,
          date,
          icon,
          weatherIconMap,
          temp,
          description,
          high,
          low,
          wind,
          humidity,
          sunrise,
          sunset,
          hourly,
          daily,
        }}
      >
        <WeatherInput />
        <TodayConditions />
        <HourlyForecast />
        <DailyForecast />
      </DataContext.Provider>
    </>
  );
};

export default App;
