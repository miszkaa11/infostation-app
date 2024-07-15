import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.scss';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import Forecast from './Forecast/Forecast';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [cityName, setCityName] = useState('Krakow');
    const [inputCity, setInputCity] = useState('Krakow');

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = '6692162fdde9a2aee7171f8124be924d';
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

    if (!weatherData || !forecastData || !airQualityData) {
        return (
            <div className="container-m">
                <p className="text">Loading...</p>
            </div>
        );
    }

    return (
        <div className="weather">
            <div className="divider"></div>
            <CurrentWeather
                weatherData={weatherData}
                airQualityData={airQualityData}
                airQualityDescription={airQualityDescription}
            />
            <div className="divider"></div>
            <Forecast
                forecastData={forecastData}
                formatDate={formatDate}
            />
            <form onSubmit={handleSubmit}>
                <input type="text" className="search__btn" placeholder="Enter city name" value={inputCity}
                       onChange={handleInputChange}/>
                <button type="submit" className="search__btn btn margined">Get Weather</button>
            </form>
            <div className="divider"></div>
        </div>
    );
};

export default Weather;
