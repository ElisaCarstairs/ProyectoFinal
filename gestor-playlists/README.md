# Gestor de Playlists — Replica iTunes

## Descripción
Proyecto de **Gestor de Playlists tipo iTunes** construido con **React + Vite + Tailwind**, que permite:
- Buscar canciones usando la **API de iTunes**
- Crear y eliminar playlists
- Añadir y eliminar canciones de cada playlist
- Reproducir previews de canciones
- Gestionar usuarios con **autenticación básica** y **rutas privadas**

---

## Resumen por partes

### Parte 1 — Setup inicial
- Se creó el proyecto con `create-vite` y configuramos **Tailwind**.
- Archivos principales: `App.jsx`, `main.jsx`, `index.css`.
- Problemas: Tailwind no cargaba hasta ajustar `@import`.

### Parte 2 — Contexto y páginas
- Se creó `PlaylistContext.jsx`.
- Páginas: `Home.jsx`, `About.jsx`.
- Problema: rutas aún no existían, Home era estático.

### Parte 3 — Modelo de datos y canciones dummy
- Canciones de ejemplo en `src/data/songs.js`.
- Se probó estado global y creación de playlists locales.
- Error: keys duplicadas al renderizar listas.

### Parte 4 — Playlists funcionales
- Crear playlists y añadir canciones dummy.
- Error de JSX mal cerrado resuelto.
- Notificación al añadir canción.

### Parte 5 — Router y navegación
- Se añadió `react-router-dom` con rutas `/`, `/playlists`, `/about`, `/login`.
- Problema: `<Router>` dentro de `<Router>` resuelto.
- Mejora: menú responsive y estilizado.

### Parte 6 — API de canciones
- Inicialmente se intentó Deezer, luego **API de iTunes**.
- Mostrar preview de canciones.
- Problema: al principio no se veían las tarjetas de canciones.

### Parte 7 — Playlist mejorada
- Mostrar canciones dentro de cada playlist.
- Notificación “ya agregado” al añadir duplicadas.
- Error de keys duplicadas resuelto con IDs únicos.

### Parte 8 — UI estilo iTunes
- Header más ancho, tipografía y colores similares a iTunes.
- Layout responsive para desktop y mobile.
- Reproductor básico con preview de iTunes.

### Parte 9 — Consolidación y deploy
- Funcionalidades completas:
  - Crear playlists
  - Añadir y eliminar canciones
  - Mostrar canciones añadidas
  - Reproductor básico
  - Autenticación con rutas privadas
- Eliminado drag-and-drop (`react-beautiful-dnd`) por errores.
- Rama `parte-9` lista para merge a `main`.
- Preparación para deploy en **Vercel**.

---

## Errores conocidos
- Tailwind requería reiniciar `npm run dev` en algunas ocasiones.
- Keys duplicadas en playlists y canciones.
- 403 al usar Deezer.
- Layout muy pequeño en desktop al inicio.
- `<Router>` duplicado causaba errores.
- Alertas de canciones añadidas evolucionaron varias veces hasta “Agregado” tipo Amazon.

---

## Próximos pasos
- Persistencia real de usuarios con backend o Firebase/Supabase.
- Drag-and-drop para ordenar canciones en playlists.
- Ajustes responsive avanzados.
- Historial de reproducciones o favoritos.
- Animaciones y alertas tipo iTunes.

---

## Scripts importantes

```bash
npm install
npm run dev
npm run build
npm run preview


---

## Estructura considerada para el proeycto

gestor-playlists/
│
├─ src/
│ ├─ api/
│ │ └─ api.js # Funciones para buscar canciones en iTunes
│ │
│ ├─ context/
│ │ ├─ AuthContext.jsx # Manejo de usuario y rutas privadas
│ │ └─ PlaylistContext.jsx # Manejo de playlists y canciones
│ │
│ ├─ pages/
│ │ ├─ Home.jsx
│ │ ├─ Playlists.jsx
│ │ ├─ About.jsx
│ │ └─ Login.jsx
│ │
│ ├─ components/
│ │ └─ SongCard.jsx
│ │
│ ├─ data/
│ │ └─ songs.js # Opcional, para pruebas
│ │
│ ├─ App.jsx
│ └─ main.jsx
│
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ vite.config.js