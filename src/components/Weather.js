import React, { useState, useEffect } from 'react';
import axios from 'axios';
// SASS
import './Weather.scss';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [cityName, setCityName] = useState('Krakow');
    const [inputCity, setInputCity] = useState('Krakow');

    // OpenWeather Api
    useEffect(() => {
        const fetchData = async () => {
            const apiKey = 'MY_API_KEY';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

            try {
                const weatherResponse = await axios.get(apiUrl);
                const forecastResponse = await axios.get(forecastUrl);

                const lat = weatherResponse.data.coord.lat;
                const lon = weatherResponse.data.coord.lon;
                const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

                const airQualityResponse = await axios.get(airQualityUrl);

                setWeatherData(weatherResponse.data);
                setForecastData(forecastResponse.data);
                setAirQualityData(airQualityResponse.data);
                setCityName(weatherResponse.data.name);
            } catch (error) {
                console.error('Error fetching weather or air quality data: ', error);
            }
        };

        fetchData();
    }, [cityName]);

    const handleInputChange = (event) => {
        setInputCity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCityName(inputCity);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);

        return `${weekday}, ${day}.${month}.${year}`;
    };

    if (!weatherData || !forecastData || !airQualityData) return <p>Loading...</p>;

    const { main, weather, wind, rain } = weatherData;
    const pressure = main.pressure;
    const windSpeed = wind.speed;
    const rainVolume = rain ? rain['1h'] : 0;

    const airQualityIndex = airQualityData.list[0].main.aqi;
    const airQualityDescription = (index) => {
        switch (index) {
            case 1:
                return 'Good';
            case 2:
                return 'Fair';
            case 3:
                return 'Moderate';
            case 4:
                return 'Poor';
            case 5:
                return 'Very Poor';
            default:
                return 'Unknown';
        }
    };

    const forecastTiles = forecastData.list
        .filter((forecast, index) => index % 8 === 0)
        .map((forecast, index) => {
            const date = new Date(forecast.dt * 1000);
            return (
                <div className="forecast__tile" key={index}>
                    <h5 className="header-s">{formatDate(date)}</h5>
                    <p className="text"><label>Temperature:</label> {forecast.main.temp.toFixed(1)}°C</p>
                    <p className="text"><label>Weather:</label> {forecast.weather[0].main}</p>
                    <p className="text"><label>Wind:</label> {forecast.wind.speed} m/s</p>
                </div>
            );
        });

    return (
        <div className="component p-2">
            <div className="container-m">
                <div className="weather bg-light">
                    <div className="title">
                        <h2 className="title__header header-xl">Current weather</h2>
                    </div>
                    <div className="weather__inner">
                        <h3 className="weather__header header-l current-city">{cityName}</h3>
                        <h4 className="weather__header header-m"><label>Temperature:</label> {main.temp.toFixed(1)}°C
                        </h4>
                        <h4 className="weather__header header-m"><label>Weather:</label> {weather[0].main}</h4>
                        <h4 className="weather__header header-m"><label>Pressure:</label> {pressure} hPa</h4>
                        <h4 className="weather__header header-m"><label>Wind:</label> {windSpeed} m/s</h4>
                        <h4 className="weather__header header-m"><label>Rain:</label> {rainVolume} mm</h4>
                        <h4 className="weather__header header-m"><label>Air
                            Quality:</label> {airQualityDescription(airQualityIndex)}</h4>
                        <div className="divider subtitle bg-gray"></div>
                        <div className="forecast">
                            <div className="forecast__title">
                                <h3 className="forecast__header header-l">5-Day Forecast</h3>
                            </div>
                            <div className="forecast__tiles">
                                {forecastTiles}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="search__btn"
                                placeholder="Enter city name"
                                value={inputCity}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className="search__btn btn margined">Get Weather</button>
                        </form>
                        <div className="divider title bg-gray"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
