import React from 'react';
// Scss
import './Forecast.scss';

const Forecast = ({ forecastData, formatDate }) => {
    const forecastTiles = forecastData.list
        .filter((forecast, index) => index % 8 === 0)
        .map((forecast, index) => {
            const date = new Date(forecast.dt * 1000);
            return (
                <div className="forecast__tile" key={index}>
                    <h5 className="header-s">{formatDate(date)}</h5>
                    <p className="forecast__tile--text text"><label>Temperature:</label> {forecast.main.temp.toFixed(1)}°C</p>
                    <p className="forecast__tile--text text"><label>Weather:</label> {forecast.weather[0].main}</p>
                    <p className="forecast__tile--text text"><label>Wind:</label> {forecast.wind.speed} m/s</p>
                    <p className="forecast__tile--text text"><label>Pressure:</label> {forecast.main.pressure} hPa</p>
                    <p className="forecast__tile--text text"><label>Rain:</label> {forecast.rain && forecast.rain['3h'] ? forecast.rain['3h'] : 0} mm</p>
                </div>
            );
        });

    return (
        <div className="forecast">
            <div className="forecast__title">
                <h3 className="forecast__header header-l">5-Day Forecast</h3>
            </div>
            <div className="forecast__tiles">
                {forecastTiles}
            </div>
        </div>
    );
};

export default Forecast;
