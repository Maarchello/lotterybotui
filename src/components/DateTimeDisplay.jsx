import React from 'react';

const DateTimeDisplay = ({ value, type }) => {
    return (
        <div className="countdown">
            <p>{value < 10 ? '0' + value : value}</p>
            <span>{type}</span>
        </div>
    );
};

export default DateTimeDisplay;
