import React from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";

export default function Playlists() {
  const { state, dispatch } = usePlaylist();

  const handleRemove = (playlistId, songId) => {
    dispatch({ type: "REMOVE_SONG", payload: { playlistId, songId } });
  };

  const handleRemovePlaylist = (playlistId) => {
    dispatch({ type: "REMOVE_PLAYLIST", payload: playlistId });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tus Playlists</h2>

      {state.playlists.map((pl) => (
        <div key={pl.id} className="mb-6 border rounded bg-white shadow-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{pl.name} ({pl.songs.length})</h3>
            <button
              onClick={() => handleRemovePlaylist(pl.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Eliminar playlist
            </button>
          </div>

          {pl.songs.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay canciones en esta playlist.</p>
          ) : (
            <ul className="space-y-2">
              {pl.songs.map((song, index) => (
                <li
                  key={`${pl.id}-${song.trackId}-${index}`} // 🔑 key única combinando playlist y canción
                  className="flex justify-between items-center border p-2 rounded bg-gray-50"
                >
                  <span>{song.trackName} - {song.artistName}</span>
                  <button
                    onClick={() => handleRemove(pl.id, song.trackId)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
