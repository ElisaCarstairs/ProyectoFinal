// src/components/SongCard.jsx
import React, { useState, useMemo } from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";
import { usePlayer } from "../context/PlayerContext.jsx";

export default function SongCard({ song }) {
  const { state, dispatch } = usePlaylist();
  const { playTrack, addToQueue } = usePlayer();
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const isInAnyPlaylist = useMemo(() => {
    return state.playlists.some((pl) => pl.songs.some((s) => s.trackId === song.trackId));
  }, [state.playlists, song.trackId]);

  const handleAddToExisting = (playlistId) => {
    dispatch({ type: "ADD_SONG", payload: { playlistId, song } });
    setConfirmText(`Añadida a "${state.playlists.find((p) => p.id === playlistId)?.name}"`);
    setTimeout(() => setConfirmText(""), 2500);
    setShowModal(false);
  };

  const handleCreateAndAdd = () => {
    const name = newPlaylistName.trim();
    if (!name) return;
    const id = Date.now().toString();
    dispatch({ type: "ADD_PLAYLIST", payload: { id, name, songs: [song] } });
    setConfirmText(`Playlist "${name}" creada`);
    setTimeout(() => setConfirmText(""), 2500);
    setNewPlaylistName("");
    setShowModal(false);
  };

  return (
    <div className="flex gap-4 p-4 border rounded bg-white shadow-sm items-center w-full">
      <img src={song.artworkUrl100} alt={song.trackName} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{song.trackName}</h3>
        <p className="text-sm text-gray-600 truncate">{song.artistName}</p>
        <p className="text-xs text-gray-500 truncate">{song.collectionName}</p>

        <div className="mt-2 flex gap-2">
          <button onClick={() => playTrack(song)} className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700">
            ▶ Reproducir
          </button>
          <button onClick={() => addToQueue(song)} className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700">
            ➕ Añadir a cola
          </button>
          <button
            onClick={() => setShowModal(true)}
            className={`px-4 py-1 rounded text-white ${confirmText || isInAnyPlaylist ? "bg-green-500" : "bg-blue-500"} hover:opacity-90`}
          >
            {confirmText || (isInAnyPlaylist ? "En playlists" : "Añadir a playlist")}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
            <h4 className="text-lg font-semibold mb-3">Selecciona o crea una playlist</h4>
            {state.playlists.length > 0 ? (
              <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-auto">
                {state.playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => handleAddToExisting(pl.id)}
                    className="text-left border rounded p-2 hover:bg-gray-100"
                  >
                    {pl.name} ({pl.songs.length})
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-4">No hay playlists. Crea una ahora:</p>
            )}
            <div className="flex gap-2">
              <input
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Nombre de la playlist"
                className="flex-1 border rounded p-2"
              />
              <button onClick={handleCreateAndAdd} className="bg-green-500 text-white px-4 py-2 rounded">
                Crear & Añadir
              </button>
            </div>
            <button onClick={() => setShowModal(false)} className="mt-4 text-sm text-gray-500 hover:underline">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
