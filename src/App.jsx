import { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './WeatherCard';
const url = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_API_KEY;

const App = () => {
  const [temperature, setTemperature] = useState('');
  const [cityName, setCityName] = useState('');
  const [fetchCityName, setFetchCityName] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState('01d');
  const [desc, setDesc] = useState('Weather Description');
  const [unit, setUnit] = useState("metric");

  const getWeatherData = async() => {
    try{
      setLoading(true);
      const response = await fetch(`${url}${cityName}&units=${unit}&appid=${key}`);
      const data = await response.json();
      setTemperature(data.main.temp);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setLoading(false);
      setFetchCityName(cityName);
      setIcon(data.weather[0].icon);
      setDesc(data.weather[0].description);
      setError("");
    } catch(error) {
      setLoading(true);
      setTemperature("");
      setHumidity("--");
      setWindSpeed("--");
      setFetchCityName("");
      setDesc("Weather Description");
      if (cityName !== ""){
      setError("City not found. Please try again");
      } else {
      setError("");
      }
      setLoading(false);
    }};

    useEffect(() => {
      getWeatherData();
    }, [cityName, unit]);

  return (
    <WeatherCard
      temperature={temperature}
      setCityName={setCityName}
      cityName={fetchCityName}
      humidity={humidity}
      windSpeed={windSpeed}
      loading={loading}
      error={error}
      icon={icon}
      desc={desc} 
      setUnit={setUnit}/> 
  )
}

export default App