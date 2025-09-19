import React from "react"
import { usePlaylist } from "../context/PlaylistContext.jsx"

export default function Home() {
  const { state, dispatch } = usePlaylist()

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Mis Playlists</h2>
      <button
        onClick={() => dispatch({ type: "ADD_PLAYLIST", payload: { name: "Nueva Playlist" } })}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Añadir Playlist
      </button>

      <ul className="mt-4 list-disc list-inside">
        {state.playlists.map((p, index) => (
          <li key={index}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}

