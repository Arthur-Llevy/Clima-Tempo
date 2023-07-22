import { useState, useRef, useEffect } from 'react';
import { ClimateStatusContainer } from './ClimateStatusStyles.js';

export const ClimateStatus = () => {
	const [cityName, setCityName]  = useState();
	const [stateOfCity, setStateOfCity] = useState();
	const [countryOfCity, setCountryOfCity] = useState();
	const form = useRef();
	const [climate, setClimate] = useState();
	const [temperature, setTemperature] = useState();
	const [humidity, setHumidity] = useState();
	const [windSpeed, setWindSpeed] = useState();

	useEffect(() => {
		form.current.addEventListener('submit', e => e.preventDefault());
	}, []);

	const search = async () => {

		if(cityName !== ''){			
			const latAndLonOfCity = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${import.meta.env.VITE_weather_API_KEY}`);
			const jsonResponse = await latAndLonOfCity.json();

			if(jsonResponse[0] === undefined){
				return alert('Por favor, insira o nome de uma cidade válida');
			};

			setStateOfCity(jsonResponse[0].state);
			setCountryOfCity(jsonResponse[0].country);

			const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${jsonResponse[0].lat}&lon=${jsonResponse[0].lon}&appid=${import.meta.env.VITE_weather_API_KEY}&lang=pt_br`);
			const weatherResponse = await weather.json();
			console.log(weatherResponse)

			setClimate(weatherResponse.weather[0].description);
			setTemperature((weatherResponse.main.temp - 273).toFixed(0)); 
			setHumidity(weatherResponse.main.humidity);
			setWindSpeed((weatherResponse.wind.speed * 3.6).toFixed(0));
		}else {
			alert('Para a pesquisa ser realizada é preciso o nome de uma cidade.')
		};

	};

	return(
		<>
			<ClimateStatusContainer>
				<div>
					<h1>Clima Tempo</h1>
					<h3>Digite o nome da cidade que deseja saber o clima: </h3>
					<form ref={form}>
						<input 
							type="text"
							onChange={e => setCityName(e.target.value)} 
							required
						/>
						<button onClick={search}>Procurar</button>
					</form>
					<fieldset>
						<legend>Dados da cidade</legend>						
						<p>Nome da cidade: {cityName}</p>
						<p>País onde se localiza: {countryOfCity}</p>
						<p>Estado da cidade: {stateOfCity}</p>
					</fieldset>
					<fieldset>
						<legend>Dados Climáticos</legend>						
						<p>Clima: {climate}</p>
						<p>Temperatura atual: {temperature}°C</p>
						<p>Umidade: {humidity}%</p>
						<p>Velocidade do ar: {windSpeed} Km/h</p>	
					</fieldset>
				</div>
			</ClimateStatusContainer>
		</>
	);
}