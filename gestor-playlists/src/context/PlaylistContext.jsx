import { createContext, useReducer, useContext, useEffect } from "react";
import { songs as initialSongs } from "../data/songs.js";

const initialState = {
  songs: [],
  playlists: [], // agregamos playlists aquí
};

function playlistReducer(state, action) {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload };

    case "ADD_PLAYLIST":
      return { ...state, playlists: [...state.playlists, action.payload] };

    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter((p) => p.id !== action.payload),
      };

    default:
      return state;
  }
}

// Crear contexto
const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [state, dispatch] = useReducer(playlistReducer, initialState);

  useEffect(() => {
    const storedPlaylists = localStorage.getItem("playlists");
    if (storedPlaylists) {
      dispatch({ type: "SET_PLAYLISTS", payload: JSON.parse(storedPlaylists) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(state.playlists));
  }, [state.playlists]);

  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
}

// Hook para consumir contexto
export function usePlaylist() {
  return useContext(PlaylistContext);
}
