import React, { useState } from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";

export default function SongCard({ song }) {
  const { state, dispatch } = usePlaylist();
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [addedMessage, setAddedMessage] = useState(""); // ✨ estado dinámico
  const [audio] = useState(new Audio(song.previewUrl));

  const handlePlay = () => audio.play();
  const handlePause = () => audio.pause();

  const handleAdd = (playlistId) => {
    if (!playlistId) return;
    dispatch({ type: "ADD_SONG", payload: { playlistId, song } });

    // Cambiar texto del botón
    setAddedMessage(`Agregada a "${state.playlists.find(pl => pl.id === playlistId)?.name}"`);
    setTimeout(() => setAddedMessage(""), 3000); // vuelve al estado original
    setShowModal(false);
    setNewPlaylistName("");
  };

  const handleCreateAndAdd = () => {
    if (!newPlaylistName.trim()) return;
    const id = Date.now().toString();
    dispatch({
      type: "ADD_PLAYLIST",
      payload: { id, name: newPlaylistName, songs: [song] },
    });

    setAddedMessage(`Agregada a "${newPlaylistName}"`);
    setTimeout(() => setAddedMessage(""), 3000);
    setShowModal(false);
    setNewPlaylistName("");
  };

  return (
    <div className="flex gap-4 p-4 border rounded bg-white shadow-sm">
      <img src={song.artworkUrl100} alt={song.trackName} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-bold">{song.trackName}</h3>
        <p className="text-gray-600">{song.artistName}</p>
        <p className="text-gray-500 text-sm">{song.collectionName}</p>
        {song.previewUrl && (
          <div className="mt-2 flex gap-2">
            <button onClick={handlePlay} className="bg-green-500 text-white px-2 py-1 rounded">▶️</button>
            <button onClick={handlePause} className="bg-red-500 text-white px-2 py-1 rounded">⏸️</button>
          </div>
        )}
      </div>
      
      <button
        onClick={() => setShowModal(true)}
        className={`px-4 py-2 rounded ${addedMessage ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
      >
        {addedMessage || "Añadir a playlist"}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h4 className="text-xl font-bold mb-4">Selecciona o crea una playlist</h4>

            {state.playlists.length > 0 && (
              <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-y-auto">
                {state.playlists.map(pl => (
                  <button
                    key={pl.id}
                    onClick={() => handleAdd(pl.id)}
                    className="border p-2 rounded hover:bg-gray-100 text-left"
                  >
                    {pl.name}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nueva playlist"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <button
                onClick={handleCreateAndAdd}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Crear & Añadir
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
