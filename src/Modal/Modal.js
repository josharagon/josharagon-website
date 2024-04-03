import React, { useState, useEffect } from 'react'; // Ensure useState is imported
import { lightTheme, darkTheme } from "../Themes.js";
import { ThemeProvider } from "styled-components";


import './Modal.scss'; // Make sure this path is correct.

const Modal = ({ isOpen, onClose, children }) => {
    // Use local state to control class addition for transitions
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Trigger the transition in when the modal is opened
        if (isOpen) {
            setShowModal(true);
        } else if (!isOpen && showModal) {
            // Begin the transition out, but keep modal "visible" until it completes
            const timer = setTimeout(() => setShowModal(false), 100); // Match your CSS transition time
            return () => clearTimeout(timer);
        }
    }, [isOpen, showModal]);

    const handleBackgroundClick = () => {
        // Start closing transition
        onClose();
    };

    return (
        <div className={`modal ${showModal ? 'show' : ''}`} onClick={handleBackgroundClick}>
            <div className={`modal-content ${showModal ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
                <span className="close" onClick={handleBackgroundClick}>&times;</span>
                {children}
            </div>
        </div>
    );
};

// Bio component definition using Modal
const Bio = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setModalOpen(true)}>Read More</button>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div>
                    <h2>Introduction</h2>
                    <p>As a Support Software Engineer at SearchSpring, I've dedicated myself to not just resolving technical challenges but also to the continuous pursuit of knowledge in the ever-evolving field of technology. My journey into coding began in my freshman year of high school, marking the start of a lifelong passion. Beyond the world of code, my heart beats to the rhythm of automobile engines and music decks, where I immerse myself in the automotive culture and the art of DJing.</p>

                    <h2>Professional Journey</h2>
                    <p>From the moment I wrote my first line of code in high school, I knew I had found my calling. This early love for programming propelled me into a career where problem-solving and technology go hand in hand. At SearchSpring, I tackle complex software challenges, always with the goal of improving user experiences and operational efficiencies. My commitment to learning is unwavering, pushing me to stay abreast of the latest in tech innovations, ensuring that our solutions remain cutting-edge.</p>

                    <h2>Personal Passions</h2>
                    <p>Outside of the digital realm, my world revolves around automobiles and music. The precision engineering and aesthetic beauty of cars mirror the meticulousness I bring to coding, while DJing offers a creative outlet that balances my analytical skills. Weekend car meets are my sanctuary, a place where passion meets engineering marvels. Similarly, DJing is not just a hobby; it's a pursuit of perfection through music, constantly discovering new sounds and blending them in unique ways. These pursuits enrich my professional life, fueling my creativity and problem-solving abilities.</p>

                    <h2>Conclusion</h2>
                    <p>In essence, my career as a Support Software Engineer and my passions for automobiles and DJing are not just parallel paths but are intertwined journeys. Each aspect of my life informs and enriches the other, driving me towards excellence. Whether solving complex technical issues, appreciating the craftsmanship of a classic car, or mixing the perfect track, I bring enthusiasm, creativity, and a relentless pursuit of knowledge to everything I do.</p>
                </div>
            </Modal>
        </div>
    );
};

export default Bio; // Export Bio as the main component
