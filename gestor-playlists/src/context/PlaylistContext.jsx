import { createContext, useContext, useReducer } from "react";

const PlaylistContext = createContext();

const initialState = {
  playlists: [], // { id, name, songs: [] }
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
        ),
      };
    case "REMOVE_SONG":
      return {
        ...state,
        playlists: state.playlists.map(pl =>
          pl.id === action.payload.playlistId
            ? { ...pl, songs: pl.songs.filter(s => s.trackId !== action.payload.trackId) }
            : pl
        ),
      };
    default:
      return state;
  }
}

export const PlaylistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playlistReducer, initialState);
  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
