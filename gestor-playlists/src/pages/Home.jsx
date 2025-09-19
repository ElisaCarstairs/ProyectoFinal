import React, { useState } from "react";
import SongCard from "../components/SongCard.jsx";

export default function Home() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=15`);
      const data = await response.json();
      setSongs(data.results);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Canciones disponibles</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar canciones..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={fetchSongs}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {songs.map(song => (
          <SongCard key={song.trackId} song={song} />
        ))}
      </div>
    </div>
  );
}
