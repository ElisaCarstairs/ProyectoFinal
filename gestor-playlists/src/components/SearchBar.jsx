export default function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSearch(); }}
      className="flex gap-2 mb-4"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar canción o artista..."
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
