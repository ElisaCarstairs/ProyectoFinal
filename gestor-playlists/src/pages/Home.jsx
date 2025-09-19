import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import SongCard from "../components/SongCard.jsx";
import { fetchSongs } from "../services/api.js";

export default function Home() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const results = await fetchSongs(query);
      setSongs(results);
    } catch (err) {
      setError("Ocurrió un error al buscar canciones.");
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Canciones disponibles</h2>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} loading={loading} />

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!error && songs.length === 0 && !loading && (
        <p className="text-gray-500 mb-4">No hay canciones para mostrar.</p>
      )}

      <div className="space-y-2">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
