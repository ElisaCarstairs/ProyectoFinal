import React, { useState } from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";

export default function Playlists() {
  const { state, dispatch } = usePlaylist();
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    dispatch({ type: "ADD_PLAYLIST", payload: { id: Date.now().toString(), name, songs: [] } });
    setName("");
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_PLAYLIST", payload: id });
  };

  const handleRemoveSong = (playlistId, songId) => {
    dispatch({ type: "REMOVE_SONG", payload: { playlistId, songId } });
  };

  return (
    <div className="w-full p-8 flex flex-col gap-8">
      <h2 className="text-3xl font-bold">Tus Playlists</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la playlist"
          className="border p-3 rounded flex-1"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-6 py-3 rounded font-semibold">
          Agregar
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {state.playlists.map(pl => (
          <div key={pl.id} className="border p-6 rounded bg-white shadow-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{pl.name} ({pl.songs.length})</h3>
              <button onClick={() => handleRemove(pl.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Eliminar
              </button>
            </div>

            {pl.songs.length === 0 && <p className="text-gray-500">No hay canciones</p>}

            <div className="flex flex-col gap-3">
              {pl.songs.map(song => (
                <div key={song.id} className="flex justify-between items-center border p-3 rounded bg-gray-50">
                  <div>
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-gray-600 text-sm">{song.artist}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveSong(pl.id, song.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
