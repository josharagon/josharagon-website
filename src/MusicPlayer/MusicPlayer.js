import React, { useState, useRef } from 'react';
import './MusicPlayer.scss'; // Import CSS for styling

import { Play, Pause, Stop, SkipForward, SkipBack, Volume, Volume1, Volume2, VolumeX } from 'lucide-react';



const MusicPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVolumeOpen, setIsVolumeOpen] = useState(false);
    const [volume, setVolume] = useState(50); // Initial volume value


    const skipBackward = () => {
        // Adjust the current playback position backward
        // audioRef.current.currentTime -= 10; // For example, skip 10 seconds backward
    };

    const skipForward = () => {
        // Adjust the current playback position forward
        // audioRef.current.currentTime += 10; // For example, skip 10 seconds forward
    };
    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        audioRef.current.volume = newVolume / 100; // Set the volume of the audio element
    };
    const toggleVolume = () => {
        setIsVolumeOpen(prevState => !prevState);
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const renderVolumeIcon = () => {
        if (volume > 0 && volume <= 50) {
            return <Volume1 size={24} />;
        } else if (volume > 50) {
            return <Volume2 size={24} />;
        } else {
            return <Volume size={24} />;
        }
    };


    return (
        <div className="music-player">
            <audio ref={audioRef} src="/path/to/audio/file.mp3" />
            <div className="player-controls">
                <SkipBack size={24} onClick={skipBackward} />
                {isPlaying ? <Pause size={24} onClick={togglePlay} /> : <Play size={24} onClick={togglePlay} />}
                <SkipForward size={24} onClick={skipForward} />
                <div className="volume-icon" onClick={toggleVolume}>
                    {renderVolumeIcon()}
                </div>
                {isPlaying && <ScrollingText />}
            </div>
            {isPlaying && <div className="artist-name">{'blah'}</div>}
            {isVolumeOpen && (
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
            )}
        </div>

    );
};

export default MusicPlayer;

const ScrollingText = () => {
    return (
        <div className="scroll-container">
            <div className="scrolling-text">
                Now Playing: Song Title - Artist Name
            </div>
        </div>
    );
};