import React, { useEffect, useState } from 'react';
import './CustomScrollBar.scss';
import carImage from '../assets/img/2018-Ford-Focus-RS-Hatch-Race-Red.png';

const CustomScrollBar = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [isReversed, setIsReversed] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);


    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const currentScrollPercentage = (scrollTop / scrollHeight) * 100;
        setScrollPercentage(currentScrollPercentage);

        // Determine the direction of scrolling
        const isScrollingUp = scrollTop < lastScrollTop;
        setIsReversed(isScrollingUp);

        // Update lastScrollTop with the current scroll position
        setLastScrollTop(scrollTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);


    return (
        <div className="custom-scrollbar">
            <img src={carImage} alt="Car" className={`car-image ${isReversed ? 'reversed' : ''}`} style={{ left: `${scrollPercentage}%` }} />
        </div>
    );
};

export default CustomScrollBar;
