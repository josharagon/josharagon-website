import React, { useState } from 'react';
import './Dashboard.css'; // Import CSS for styling

const Dashboard = () => {
    const [temperature, setTemperature] = useState(70); // Initial temperature state

    const handleTemperatureChange = (event) => {
        // Update temperature state when slider value changes
        setTemperature(event.target.value);
    };

    const handleRadioClick = () => {
        // Handle radio button click event
        console.log('Radio button clicked');
    };

    return (
        <div className="dashboard">
            <button className="button" onClick={handleRadioClick}>Radio</button>
            <input type="range" className="slider" min="60" max="80" value={temperature} onChange={handleTemperatureChange} />
            <p>Temperature: {temperature}°F</p>
        </div>
    );
};

export default Dashboard;
