import { useState, useRef } from 'react';

function App() {

  const [cityName, setCityName]  = useState();
  const [climate, setClimate] = useState();
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [windSpeed, setWindSpeed] = useState();

  const search = async () => {
    const latAndLonOfCity = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${import.meta.env.VITE_weather_API_KEY}`);
    const jsonResponse = await latAndLonOfCity.json();

    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${jsonResponse[0].lat}&lon=${jsonResponse[0].lon}&appid=${import.meta.env.VITE_weather_API_KEY}&lang=pt_br`);
    const weatherResponse = await weather.json();

    setClimate(weatherResponse.weather[0].description);
    setTemperature((weatherResponse.main.temp - 273).toFixed(0)); 
    setHumidity(weatherResponse.main.humidity);
    setWindSpeed((weatherResponse.wind.speed * 3.6).toFixed(0));
  };

  return (
    <>
      <div>Digite o nome da cidade que deseja saber o clima:</div>
      <input type="text" onChange={e => setCityName(e.target.value)} />
      <button onClick={search}>Procurar</button>
      <p>Cidade: {cityName}</p>
      <p>Clima: {climate}</p>
      <p>Temperatura atual: {temperature}°C</p>
      <p>Umidade: {humidity}%</p>
      <p>Velocidade do ar: {windSpeed} Km/h</p>
    </>
  );
}

export default App
