import { createContext, useReducer, useContext, useEffect } from "react"
import { songs as initialSongs } from "../data/songs.js"

// Estado inicial
const initialState = {
  songs: [],
  playlists: [],
}

// Reducer
function playlistReducer(state, action) {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload }
    default:
      return state
  }
}

// Crear contexto
const PlaylistContext = createContext()

export function PlaylistProvider({ children }) {
  const [state, dispatch] = useReducer(playlistReducer, initialState)

  // Cargar canciones de ejemplo al iniciar
  useEffect(() => {
    dispatch({ type: "SET_SONGS", payload: initialSongs })
  }, [])

  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  )
}

// Hook para consumir contexto
export function usePlaylist() {
  return useContext(PlaylistContext)
}
