import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PlaylistProvider } from "./context/PlaylistContext.jsx";

import Home from "./pages/Home.jsx";
import Playlists from "./pages/Playlists.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <PlaylistProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <header className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 text-center font-bold text-xl">
            🎧 Gestor de Playlists
          </header>

          <main className="p-6 max-w-4xl mx-auto">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/playlists"
                element={
                  <PrivateRoute>
                    <Playlists />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </PlaylistProvider>
    </AuthProvider>
  );
}
