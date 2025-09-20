// src/pages/Playlists.jsx
import React from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";
import { usePlayer } from "../context/PlayerContext.jsx"; // si tienes PlayerContext

export default function Playlists() {
  const { state, dispatch } = usePlaylist();
  const { playTrack } = usePlayer?.() || {};

  const handleRemovePlaylist = (id) => {
    if (!confirm("Eliminar playlist y todas sus canciones?")) return;
    dispatch({ type: "REMOVE_PLAYLIST", payload: id });
  };

  const handleRemoveSong = (playlistId, trackId) => {
    dispatch({ type: "REMOVE_SONG", payload: { playlistId, trackId } });
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Tus Playlists</h2>

      {state.playlists.length === 0 ? (
        <p className="text-gray-500">Aún no tienes playlists. Crea una desde cualquier canción.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {state.playlists.map((pl) => (
            <div key={pl.id} className="border rounded bg-white shadow-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{pl.name} <span className="text-sm text-gray-500">({pl.songs.length})</span></h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemovePlaylist(pl.id)}
                    className="text-red-500 bg-red-50 border border-red-100 px-3 py-1 rounded"
                  >
                    Eliminar playlist
                  </button>
                </div>
              </div>

              {pl.songs.length === 0 ? (
                <p className="text-gray-500">No hay canciones en esta playlist.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {pl.songs.map((song, idx) => (
                    <div key={`${pl.id}-${song.trackId}-${idx}`} className="flex items-center justify-between p-2 rounded border bg-gray-50">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={song.artworkUrl100 || song.artworkUrl60} alt={song.trackName} className="w-12 h-12 rounded object-cover" />
                        <div className="min-w-0">
                          <div className="font-medium truncate">{song.trackName}</div>
                          <div className="text-sm text-gray-500 truncate">{song.artistName}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {playTrack && (
                          <button onClick={() => playTrack(song)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">
                            ▶️
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveSong(pl.id, song.trackId)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
