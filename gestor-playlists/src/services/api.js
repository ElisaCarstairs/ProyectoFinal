export async function fetchSongs(query) {
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=20`);
    const data = await res.json();
    return data.results.map(song => ({
      id: song.trackId,
      title: song.trackName,
      artist: song.artistName,
      album: song.collectionName,
      cover: song.artworkUrl100,
      preview: song.previewUrl
    }));
  } catch (error) {
    console.error("Error al obtener canciones:", error);
    return [];
  }
}
