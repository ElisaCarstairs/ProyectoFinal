import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Playlists from "./pages/Playlists.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white p-4 text-center font-bold text-xl">
        🎧 Gestor de Playlists
      </header>
      <main className="p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />   {/* Aquí está Parte 4 */}
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;
