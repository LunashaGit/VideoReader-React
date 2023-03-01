import React, { useState, useRef, ChangeEvent } from "react";

type Ref = {
  current: HTMLVideoElement;
};
export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<any>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);

    if (videoRef.current.currentTime === videoRef.current.duration) {
      setIsPlaying(false);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement !== null);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(event.target.value));

    videoRef.current.volume = event.target.value;
  };

  const handlePlaybackRateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPlaybackRate(parseInt(event.target.value));

    videoRef.current.playbackRate = event.target.value;
  };

  const handleProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseInt(event.target.value) / 100) * duration;
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  };

  const handleFullScreenClick = () => {
    if (!isFullScreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="video-player">
      <video
        className="video"
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay
      />
      <div className="controls">
        <Controls
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onVolumeChange={handleVolumeChange}
          volume={volume}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRateChange}
        />
        <Progress
          currentTime={currentTime}
          duration={duration}
          onProgressChange={handleProgressChange}
        />
        <FullscreenButton
          isFullScreen={isFullScreen}
          onClick={handleFullScreenClick}
        />
      </div>
    </div>
  );
}

function Controls({
  isPlaying,
  onTogglePlay,
  volume,
  onVolumeChange,
  playbackRate,
  onPlaybackRateChange,
}: {
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  playbackRate: number;
  onPlaybackRateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="buttons">
      <button className="video-player__play" onClick={onTogglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div className="volume">
        <label htmlFor="volume">Volume</label>
        <input
          className="input_volume"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={onVolumeChange}
          id="volume"
        />
      </div>
      <div className="div_playback">
        <label htmlFor="playback-rate">Speed</label>
        <select
          value={playbackRate}
          onChange={onPlaybackRateChange}
          id="playback-rate"
          className="playback"
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
}

function Progress({
  currentTime,
  duration,
  onProgressChange,
}: {
  currentTime: number;
  duration: number;
  onProgressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const progressPercent = (currentTime / duration) * 100;

  return (
    <>
      <input
        className="progress"
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={progressPercent}
        onChange={onProgressChange}
      />
    </>
  );
}

function FullscreenButton({
  isFullScreen,
  onClick,
}: {
  isFullScreen: boolean;
  onClick: () => void;
}) {
  return (
    <button className="video-player__fullscreen" onClick={onClick}>
      {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
    </button>
  );
}
