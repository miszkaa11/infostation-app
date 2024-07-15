import React, {useEffect, useState} from "react";

const Time = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

        return `${weekday}, ${day}.${month}.${year}`;
    };

    const formatTimeZone = (date) => {
        const options = {
            timeZoneName: 'long',
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(date);
        const timeZone = parts.find(part => part.type === 'timeZoneName');
        return timeZone ? timeZone.value : '';
    };

    const formattedDate = formatDate(time);
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedTimeZone = formatTimeZone(time);

    return (
        <>
            <h1 className="clock__time header-xxl">{formattedTime}</h1>
            <h3 className="clock__date header-l">{formattedDate}</h3>
            <h3 className="clock__timezone header-m">{formattedTimeZone}</h3>
        </>
    );
}

export default Time;
