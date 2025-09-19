import React from "react";
import { usePlaylist } from "../context/PlaylistContext.jsx";

export default function SongCard({ song }) {
  const { state, dispatch } = usePlaylist();

  const handleAdd = (playlistId) => {
    dispatch({ type: "ADD_SONG", payload: { playlistId, song } });
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded bg-white shadow-sm w-full">
      <img src={song.cover} alt={song.title} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{song.title}</h3>
        <p className="text-gray-600">{song.artist}</p>
        <p className="text-gray-500 text-sm">{song.album}</p>
      </div>
      <div className="flex flex-col gap-2">
        {state.playlists.map(pl => (
          <button
            key={pl.id}
            onClick={() => handleAdd(pl.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            {pl.name}
          </button>
        ))}
      </div>
    </div>
  );
}
