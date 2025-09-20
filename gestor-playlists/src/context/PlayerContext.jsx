// src/context/PlayerContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState([]); // lista de canciones en cola
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const currentTrack = queue[currentIndex] || null;

  // reproducir track actual
  useEffect(() => {
    const audio = audioRef.current;
    if (currentTrack) {
      audio.src = currentTrack.previewUrl;
      if (isPlaying) audio.play();
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => nextTrack();
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentIndex, queue]);

  const playTrack = (track) => {
    const idx = queue.findIndex((t) => t.trackId === track.trackId);
    if (idx >= 0) {
      setCurrentIndex(idx);
    } else {
      setQueue([...queue, track]);
      setCurrentIndex(queue.length);
    }
    setIsPlaying(true);
  };

  const stopTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    if (isPlaying) stopTrack();
    else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (currentIndex < queue.length - 1) setCurrentIndex(currentIndex + 1);
    else setIsPlaying(false);
  };

  const prevTrack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const addToQueue = (track) => {
    setQueue((q) => [...q, track]);
  };

  return (
    <PlayerContext.Provider
      value={{
        queue,
        currentTrack,
        currentIndex,
        isPlaying,
        playTrack,
        stopTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        addToQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
