import { useState, useEffect } from "react";
import { fetchSongs } from "../services/api.js";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) {
      setSongs([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchSongs(query).then(setSongs);
    }, 300); // debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Canciones disponibles</h2>

      <input
        type="text"
        placeholder="Buscar canción, artista o álbum..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <ul className="space-y-2">
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-2 border rounded bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-gray-600">
                {song.artist} - {song.album}
              </p>
            </div>
            {song.preview && (
              <audio controls className="w-32">
                <source src={song.preview} type="audio/mpeg" />
                Tu navegador no soporta audio.
              </audio>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
