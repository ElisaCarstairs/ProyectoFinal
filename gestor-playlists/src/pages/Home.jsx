import { usePlaylist } from "../context/PlaylistContext.jsx"

export default function Home() {
  const { state } = usePlaylist()

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Canciones disponibles</h2>
      <ul className="space-y-2">
        {state.songs.map((song) => (
          <li key={song.id} className="p-2 border rounded bg-white shadow-sm">
            <p className="font-medium">{song.title}</p>
            <p className="text-sm text-gray-600">{song.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
