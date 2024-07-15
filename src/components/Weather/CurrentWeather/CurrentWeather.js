import React from 'react';
// Scss
import "./CurrentWeather.scss"

const CurrentWeather = ({ weatherData, airQualityData, airQualityDescription }) => {
    const { main, weather, wind, rain } = weatherData;
    const pressure = main.pressure;
    const windSpeed = wind.speed;
    const rainVolume = rain ? rain['1h'] : 0;
    const airQualityIndex = airQualityData.list[0].main.aqi;

    return (
        <div className="current-weather">
            <div className="title">
                <h2 className="title__header header-xl">Current weather</h2>
            </div>
            <div className="current-weather__inner">
                <h3 className="current-weather__header header-l current-city">{weatherData.name}</h3>
                <h4 className="current-weather__header header-m"><label>Temperature:</label> {main.temp.toFixed(1)}°C</h4>
                <h4 className="current-weather__header header-m"><label>Weather:</label> {weather[0].main}</h4>
                <h4 className="current-weather__header header-m"><label>Pressure:</label> {pressure} hPa</h4>
                <h4 className="current-weather__header header-m"><label>Wind:</label> {windSpeed} m/s</h4>
                <h4 className="current-weather__header header-m"><label>Rain:</label> {rainVolume} mm</h4>
                <h4 className="current-weather__header header-m"><label>Air Quality:</label> {airQualityDescription(airQualityIndex)}</h4>
            </div>
        </div>
    );
};

export default CurrentWeather;
