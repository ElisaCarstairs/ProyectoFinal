import { Routes, Route, Link } from "react-router-dom";
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
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 w-full">
          {/* Header */}
          <header className="flex items-center justify-between bg-white shadow-md p-6 px-12 w-full">
            <div className="flex items-center gap-4">
              <h1 className="text-[clamp(1rem,3vw,3rem)] text-gray-800">
                Replica iTunes
              </h1>
            </div>
            <nav className="flex gap-8 font-medium text-[clamp(1rem,2vw,1.5rem)] text-gray-600">
              <Link to="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link
                to="/playlists"
                className="hover:text-gray-900 transition-colors"
              >
                Playlists
              </Link>
              <Link
                to="/about"
                className="hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <button className="text-red-500 hover:text-red-700 transition-colors">
                Logout
              </button>
            </nav>
          </header>

          {/* Main */}
          <main className="flex-grow p-12 w-full">
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

          {/* Footer */}
          <footer className="bg-white shadow-inner p-6 text-center text-gray-500 text-[clamp(0.8rem,1vw,1rem)] w-full">
            © 2025 Gestor de Playlists — Inspirado en iTunes
          </footer>
        </div>
      </PlaylistProvider>
    </AuthProvider>
  );
}
