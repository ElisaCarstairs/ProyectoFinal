import { useState } from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";
import SearchBar from "../components/SearchBar.jsx";  // crea carpeta /components

export default function Home() {
  const { state } = usePlaylist();
  const [filteredSongs, setFilteredSongs] = useState(state.songs);

  const handleSearch = (query) => {
    const q = query.toLowerCase();
    setFilteredSongs(
      state.songs.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          s.album.toLowerCase().includes(q)
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Canciones disponibles</h2>
      <SearchBar onSearch={handleSearch} />

      <ul className="space-y-2">
        {filteredSongs.map((song) => (
          <li key={song.id} className="p-2 border rounded bg-white shadow-sm">
            <p className="font-medium">{song.title}</p>
            <p className="text-sm text-gray-600">{song.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
