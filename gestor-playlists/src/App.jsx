import React from 'react'
import Home from './pages/Home.jsx'


function App() {
return (
<div className="min-h-screen bg-gray-100 text-gray-800">
<header className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white p-4 text-center font-bold text-xl">
🎧 Gestor de Playlists
</header>
<main className="p-6 max-w-4xl mx-auto">
<Home />
</main>
</div>
)
}


export default App