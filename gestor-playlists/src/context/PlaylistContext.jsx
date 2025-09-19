import { createContext, useReducer, useContext } from "react"

// Estado inicial
const initialState = {
  playlists: [],
  songs: [],
  filter: "",
  selectedSong: null,
}

// Reducer para manejar acciones
function playlistReducer(state, action) {
  switch (action.type) {
    case "ADD_PLAYLIST":
      return { ...state, playlists: [...state.playlists, action.payload] }

    case "SET_FILTER":
      return { ...state, filter: action.payload }

    case "SET_SONGS":
      return { ...state, songs: action.payload }

    case "SELECT_SONG":
      return { ...state, selectedSong: action.payload }

    default:
      return state
  }
}

// Crear contexto
const PlaylistContext = createContext()

export function PlaylistProvider({ children }) {
  const [state, dispatch] = useReducer(playlistReducer, initialState)

  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  )
}

// Hook para usar el contexto más fácil
export function usePlaylist() {
  return useContext(PlaylistContext)
}
