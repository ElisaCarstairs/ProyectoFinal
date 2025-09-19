// src/services/api.js
const BASE_URL = "https://itunes.apple.com/search";

export async function fetchSongs(query = "") {
  if (!query) return [];
  try {
    const res = await fetch(`${BASE_URL}?term=${encodeURIComponent(query)}&entity=song&limit=20`);
    const data = await res.json();
    return data.results.map(song => ({
      id: song.trackId,
      title: song.trackName,
      artist: song.artistName,
      album: song.collectionName,
      preview: song.previewUrl
    }));
  } catch (error) {
    console.error("Error al obtener canciones:", error);
    return [];
  }
}
