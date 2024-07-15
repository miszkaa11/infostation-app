import React from 'react';
// Sass
import './Clock.scss';
// Time
import Time from "./Time/Time";

const Clock = () => {
    return (
        <div className="clock">
            <div className="title">
                <h2 className="title__header header-xl">Current time</h2>
            </div>
            <Time/>
        </div>
    );
};

export default Clock;
