// src/context/PlaylistContext.jsx
import React, { createContext, useContext, useEffect, useReducer } from "react";

const PlaylistContext = createContext();

const LOCAL_KEY = "gp_playlists_v1";

const initialState = {
  playlists: [], // { id, name, songs: [] }
};

function playlistReducer(state, action) {
  switch (action.type) {
    case "SET_PLAYLISTS":
      return { ...state, playlists: action.payload || [] };

    case "ADD_PLAYLIST":
      return { ...state, playlists: [...state.playlists, action.payload] };

    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter((p) => p.id !== action.payload),
      };

    case "ADD_SONG": {
      const { playlistId, song } = action.payload;
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p.id === playlistId
            ? // evita duplicados por trackId
              p.songs.some((s) => s.trackId === song.trackId)
              ? p
              : { ...p, songs: [...p.songs, song] }
            : p
        ),
      };
    }

    case "REMOVE_SONG": {
      const { playlistId, trackId } = action.payload;
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p.id === playlistId
            ? { ...p, songs: p.songs.filter((s) => s.trackId !== trackId) }
            : p
        ),
      };
    }

    default:
      return state;
  }
}

export function PlaylistProvider({ children }) {
  const [state, dispatch] = useReducer(playlistReducer, initialState);

  // load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) dispatch({ type: "SET_PLAYLISTS", payload: JSON.parse(raw) });
    } catch (e) {
      console.error("Error loading playlists from localStorage", e);
    }
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.playlists));
    } catch (e) {
      console.error("Error saving playlists to localStorage", e);
    }
  }, [state.playlists]);

  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}
