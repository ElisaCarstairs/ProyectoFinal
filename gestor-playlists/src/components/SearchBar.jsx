import React, { useState } from "react";
import { fetchSongs } from "../services/api.js";
import SongCard from "./SongCard.jsx";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const songs = await fetchSongs(query);
    setResults(songs);
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca canciones en iTunes"
          className="flex-1 border p-3 rounded"
        />
        <button onClick={handleSearch} className="bg-green-500 text-white px-6 py-3 rounded font-semibold">
          Buscar
        </button>
      </div>

      {loading && <p>Cargando...</p>}

      <div className="flex flex-col gap-4">
        {results.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
