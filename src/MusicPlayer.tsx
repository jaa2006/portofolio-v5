import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  darkMode: boolean;
  autoPlay?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ darkMode, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play effect when autoPlay prop changes
  useEffect(() => {
    if (autoPlay && audioRef.current && !isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Auto-play prevented:', error);
          });
      }
    }
  }, [autoPlay, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Play failed:', error);
          setIsPlaying(false);
        });
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        src="/v4.www-y2mate.blog - Lost Saga BGM - Wild West (64 KBps).mp3"
        preload="metadata"
        volume={volume}
      />
      
      {/* Music Player Button */}
      <button
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Expanded Controls - Dropdown */}
      <div className={`absolute top-full right-0 mt-2 transition-all duration-300 ${
        showControls ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className={`flex flex-col items-end space-y-2 p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${
          darkMode 
            ? 'bg-white/5 border border-white/5' 
            : 'bg-white/30 border border-black/5'
        }`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        >
          {/* Song Info */}
          <div className="text-right mb-2">
            <p className="text-xs font-medium opacity-80">Lost Saga BGM</p>
            <p className="text-xs opacity-60">Wild West</p>
          </div>

          {/* Progress Bar */}
          <div className="w-48 mb-2">
            <div className={`w-full h-1 rounded-full ${
              darkMode ? 'bg-white/20' : 'bg-black/20'
            }`}>
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  darkMode ? 'bg-white/60' : 'bg-black/60'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs opacity-60 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Volume Control */}
            <div className="flex items-center space-x-1">
              <button
                onClick={toggleMute}
                className={`p-1 rounded transition-all duration-200 hover:scale-105 ${
                  darkMode
                    ? 'hover:bg-white/10 text-white/70 hover:text-white'
                    : 'hover:bg-black/10 text-black/70 hover:text-black'
                }`}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className={`w-16 h-1 rounded-full appearance-none cursor-pointer ${
                  darkMode ? 'bg-white/20' : 'bg-black/20'
                }`}
                style={{
                  background: `linear-gradient(to right, ${
                    darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
                  } 0%, ${
                    darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
                  } ${volume * 100}%, ${
                    darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                  } ${volume * 100}%, ${
                    darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                  } 100%)`
                }}
              />
            </div>

            {/* Additional Play/Pause in dropdown for convenience */}
            <div className={`w-px h-4 ${darkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>
            <span className="text-xs opacity-60">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;