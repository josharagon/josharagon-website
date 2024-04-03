import React, { useState, useRef } from 'react';
import './MusicPlayer.scss'; // Import CSS for styling

import { Play, Pause, Stop, SkipForward, SkipBack, Volume, Volume1, Volume2, VolumeX } from 'lucide-react';

const playlists = {
    lofi: '37i9dQZF1DWWQRwui0ExPn',
    deepHouse: '37i9dQZF1DWWQRwui0ExPn',
    rap: '37i9dQZF1DWWQRwui0ExPn'
};


const MusicPlayer = (props) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVolumeOpen, setIsVolumeOpen] = useState(false);
    const [volume, setVolume] = useState(0); // Initial volume value
    const [currentPlaylist, setCurrentPlaylist] = useState(playlists.lofi); // Set initial playlist
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);



    const changePlaylist = (playlistName) => {
        setCurrentPlaylist(playlists[playlistName]);
        setCurrentTrackIndex(0);
        setIsPlaying(false); // Stop playback when changing playlists
    };

    const skipBackward = () => {
        const newIndex = currentTrackIndex - 1;
        if (newIndex >= 0) {
            setCurrentTrackIndex(newIndex);
        }
    };

    const skipForward = () => {
        const newIndex = currentTrackIndex + 1;
        if (newIndex < currentPlaylist.length) {
            setCurrentTrackIndex(newIndex);
        }
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


    // Update the source and reset playback state when the track changes
    useState(() => {
        if (audioRef.current) {
            audioRef.current.src = currentPlaylist[currentTrackIndex].url;
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [currentTrackIndex, currentPlaylist]);

    return (
        <div className="music-player-container">
            <div className={`playlist-selector ${props.isDarkMode ? 'dark' : 'light'}`}>
                <select onChange={(e) => changePlaylist(e.target.value)}>
                    <option value="lofi">Lofi</option>
                    <option value="deepHouse">Deep House</option>
                    <option value="rap">Rap</option>
                </select>
            </div>
            <div className="music-player">
                <audio ref={audioRef} src="https://soundcloud.com/morenightmusic/morenight-head-shoulders-knee-toes-refix" />
                <div className="player-controls">
                    <SkipBack size={24} onClick={skipBackward} />
                    {isPlaying ? <Pause size={24} onClick={togglePlay} /> : <Play size={24} onClick={togglePlay} />}
                    <SkipForward size={24} onClick={skipForward} />
                    <div className="volume-icon" onClick={toggleVolume}>
                        {renderVolumeIcon()}
                    </div>
                </div>
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
            <div>
                <ScrollingText />
            </div>
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