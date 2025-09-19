import { createContext, useContext, useReducer } from "react";

const PlaylistContext = createContext();

const initialState = {
  playlists: []
};

function playlistReducer(state, action) {
  switch (action.type) {
    case "ADD_PLAYLIST":
      return { ...state, playlists: [...state.playlists, action.payload] };

    case "REMOVE_PLAYLIST":
      return { ...state, playlists: state.playlists.filter(pl => pl.id !== action.payload) };

    case "ADD_SONG":
      return {
        ...state,
        playlists: state.playlists.map(pl =>
          pl.id === action.payload.playlistId
            ? { ...pl, songs: [...pl.songs, action.payload.song] }
            : pl
        )
      };

    case "REMOVE_SONG":
      return {
        ...state,
        playlists: state.playlists.map(pl =>
          pl.id === action.payload.playlistId
            ? { ...pl, songs: pl.songs.filter(s => s.id !== action.payload.songId) }
            : pl
        )
      };

    default:
      return state;
  }
}

export function PlaylistProvider({ children }) {
  const [state, dispatch] = useReducer(playlistReducer, initialState);
  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}
