import React from 'react';

const AirQuality = ({ airQualityData, airQualityDescription }) => {
    const airQualityIndex = airQualityData.list[0].main.aqi;

    return (
        <h4 className="weather__header header-m"><label>Air Quality:</label> {airQualityDescription(airQualityIndex)}</h4>
    );
};

export default AirQuality;
