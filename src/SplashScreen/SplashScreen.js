import React, { useEffect, useState } from 'react';
import './SplashScreen.scss'; // Make sure this points correctly to your CSS file

const pages = [
    {
        id: 1,
        title: "Midnight Code: The Developer's Drive",
        subtitle: "Navigate Through the Neon-Lit Streets of Code",
        tagline: "ONLINE PORTFOLIO INTERACTIONS NOT RATED. MAY CONTAIN CODE VIOLENCE AND DEBUGGING SCENES.",
        content: `2001-2024 Josh Aragon, Inc. All rights reserved. 
        This portfolio showcases my coding skills, professional journey, and projects in web development, artificial intelligence, and more, using technologies like React, Node.js, and Python under fair use for educational purposes. The content, including simulated project data, represents my skills and experiences and is intended for portfolio demonstration only.
        Viewing may be monitored to enhance user experience. Contact me at contact@josharagon.com for inquiries or feedback. Accessing this site indicates your agreement to respect the intellectual property herein and use the information responsibly.
        "Josh Aragon" and related trademarks are owned by Josh Aragon Web Solutions in the U.S.A. and elsewhere. Third-party trademarks do not imply endorsement by or affiliation with Josh Aragon. Details and specifications can change; for the latest, visit www.josharagon.com. Connect on LinkedIn and GitHub to see my open-source contributions.
        Engaging with this portfolio could open doors to collaboration and project partnerships. Discover more at www.josharagon.com/projects.`
    },
    { id: 2, content: 'Showcasing My Projects' },
    { id: 3, content: 'Thank You for Visiting' },
];

const SplashScreen = () => {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [fadeClass, setFadeClass] = useState('fade-in'); // Start with fade-in

    useEffect(() => {
        if (currentPageIndex < pages.length) {
            // Start with fade-in for the first page or after the fade-out of the previous page
            setFadeClass('fade-in');

            // Schedule fade-out after the current page has been visible for some time
            const fadeOutTimer = setTimeout(() => {
                setFadeClass('fade-out');
            }, 5000); // Time for current page to stay before fading out

            // Wait for the fade-out to complete, then change the page and fade it in
            const changePageTimer = setTimeout(() => {
                if (currentPageIndex + 1 < pages.length) {
                    setCurrentPageIndex(currentPageIndex + 1);
                    // Ensure fade-in starts after fade-out has completed for the next page
                    setTimeout(() => setFadeClass('fade-in'), 500); // Short delay to ensure fade-out completes
                } else {
                    console.log('running else')
                    // Start the fade-out process for the last piece of content
                    setFadeClass('fade-out');
                    // After the last page, hide the splash screen allowing the last page fade out to complete
                    setTimeout(() => setIsVisible(false), 5000); // Match this with your fade-out duration
                }
            }, 6000); // This accounts for both the visible time and fade-out time

            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(changePageTimer);
            };
        }
    }, [currentPageIndex, pages.length]);

    if (!isVisible) {
        return null;
    }

    const currentPage = pages[currentPageIndex] || pages[0]; // Fallback to first page

    return (
        <div className={`splash-screen ${currentPageIndex + 1 === pages.length ? fadeClass : ''}`}>
            {currentPageIndex === 0 ? ( // Check if it's the first page
                <div key={currentPage.id} className={`page ${fadeClass}`}>
                    <h1>{currentPage.title}</h1>
                    <h2>{currentPage.subtitle}</h2>
                    <p>{currentPage.tagline}</p>
                    <p>{currentPage.content}</p>
                </div>
            ) : (
                // Render other pages normally
                <div key={currentPage.id} className={`page ${fadeClass}`}>
                    <h1>{currentPage.content}</h1>
                </div>
            )}
        </div>
    );
};

export default SplashScreen;
