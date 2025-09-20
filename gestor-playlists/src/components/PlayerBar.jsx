// src/components/PlayerBar.jsx
import React, { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext.jsx";

export default function PlayerBar() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = usePlayer();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!currentTrack) return;
    const interval = setInterval(() => {
      const audio = document.querySelector("audio");
      if (audio && audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    }, 500);
    return () => clearInterval(interval);
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex items-center p-2 px-4 gap-4 z-50 shadow-lg">
      <img src={currentTrack.artworkUrl100} alt={currentTrack.trackName} className="w-12 h-12 object-cover rounded" />
      <div className="flex-1 min-w-0">
        <div className="truncate font-semibold">{currentTrack.trackName}</div>
        <div className="truncate text-sm text-gray-300">{currentTrack.artistName}</div>
        <div className="w-full h-1 bg-gray-600 mt-1 rounded">
          <div className="h-1 bg-indigo-500 rounded" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={prevTrack} className="p-2 hover:text-indigo-400">⏮</button>
        <button onClick={togglePlay} className="p-2 hover:text-indigo-400">
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <button onClick={nextTrack} className="p-2 hover:text-indigo-400">⏭</button>
      </div>
    </div>
  );
}
