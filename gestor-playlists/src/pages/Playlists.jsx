import { useState } from "react"
import { usePlaylist } from "../context/PlaylistContext.jsx"

export default function Playlists() {
  const { state, dispatch } = usePlaylist()
  const [name, setName] = useState("")

  const handleAdd = () => {
    if (!name.trim()) return
    dispatch({ type: "ADD_PLAYLIST", payload: { id: Date.now().toString(), name, songs: [] } })
    setName("")
  }

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_PLAYLIST", payload: id })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tus Playlists</h2>

      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nombre de la playlist"
          className="border p-2 rounded w-full"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {state.playlists.map(pl => (
          <li key={pl.id} className="flex justify-between items-center border p-3 rounded bg-white shadow-sm">
            <span>{pl.name}</span>
            <button onClick={() => handleRemove(pl.id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
